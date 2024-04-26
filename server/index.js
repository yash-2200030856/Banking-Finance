const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { hash, compare } = require('bcrypt');
const { json } = require('express'); 
const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient('mongodb+srv://admin:admin@cluster0.vhy112j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

const db = client.db('YLBDB');
const usersCollection = db.collection('customerdb');

usersCollection.updateMany({}, { $set: { bankAccount: { accountNumber: '', balance: 0 }, hasMadeTransaction: false } })
  .then(() => {
    console.log('Initialization complete');
  })
  .catch(error => {
    console.error('Error initializing users:', error);
  });

app.post('/signup', async (req, res) => {
  const { username, email, password, phoneNumber, dateOfBirth } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    await usersCollection.insertOne({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      dateOfBirth,
      bankAccount: { accountNumber: '', balance: 0 }
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('Attempting to log in with username:', username);
    const user = await usersCollection.findOne({ username });
    console.log('User found:', user);
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const passwordMatch = await compare(password, user.password);
    console.log('Password match:', passwordMatch);
    if (passwordMatch) {
      await usersCollection.updateOne({ username }, { $set: { hasMadeTransaction: false } });
      console.log('Login successful');
      return res.status(200).json({ message: 'Login successful', username: user.username });
    } else {
      console.log('Passwords do not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/*
app.post('/linkBankAccount', async (req, res) => {
  const { username, accountNumber } = req.body;
  try {
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const existingUserWithAccountNumber = await usersCollection.findOne({ 'bankAccount.accountNumber': accountNumber });
    if (existingUserWithAccountNumber) {
      return res.status(400).json({ message: 'Account number is already linked to another user' });
    }

    if (user.bankAccount.accountNumber !== '') {
      return res.status(400).json({ message: 'User already has an account number linked' });
    }
    await usersCollection.updateOne({ username }, { $set: { 'bankAccount.accountNumber': accountNumber } });
    res.status(200).json({ message: 'Bank account linked successfully' });
  } catch (error) {
    console.error('Error linking bank account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
*/
app.post('/linkBankAccount', async (req, res) => {
  const { username, accountNumber } = req.body;
  try {
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the provided account number is already linked to another user
    const existingUserWithAccountNumber = await usersCollection.findOne({ 'bankAccount.accountNumber': accountNumber });
    if (existingUserWithAccountNumber) {
      return res.status(400).json({ message: 'Account number is already linked to another user' });
    }

    // Check if the user already has an account number linked
    if (user.bankAccount.accountNumber !== '') {
      return res.status(400).json({ message: 'User already has an account number linked' });
    }

    // Update the user's bank account with the provided account number
    await usersCollection.updateOne({ username }, { $set: { 'bankAccount.accountNumber': accountNumber } });
    
    // Respond with success message
    res.status(200).json({ message: 'Bank account linked successfully' });
  } catch (error) {
    console.error('Error linking bank account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/transaction', async (req, res) => {
  const { senderUsername, receiverAccountNumber, amount } = req.body;
  try {
    const sender = await usersCollection.findOne({ username: senderUsername });
    if (!sender) {
      return res.status(404).json({ message: 'Sender account not found' });
    }
    if (sender.hasMadeTransaction) {
      return res.status(400).json({ message: 'You can only make one transaction per login' });
    }
    if (sender.bankAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    const receiver = await usersCollection.findOne({ 'bankAccount.accountNumber': receiverAccountNumber });
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver account not found' });
    }
    const senderNewBalance = sender.bankAccount.balance - amount;
    const receiverNewBalance = receiver.bankAccount.balance + amount;
    await usersCollection.updateOne({ username: senderUsername }, { $set: { 'bankAccount.balance': senderNewBalance, hasMadeTransaction: true } });
    await usersCollection.updateOne({ 'bankAccount.accountNumber': receiverAccountNumber }, { $set: { 'bankAccount.balance': receiverNewBalance } });
    await usersCollection.updateOne(
      { username: senderUsername },
      { $push: { transactionHistory: { senderUsername, receiverAccountNumber, amount } } }
    );
    await usersCollection.updateOne(
      { 'bankAccount.accountNumber': receiverAccountNumber },
      { $push: { transactionHistory: { senderUsername, receiverAccountNumber, amount } } }
    );
    res.status(200).json({ message: 'Transaction successful' });
  } catch (error) {
    console.error('Error performing transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/History', async (req, res) => {
  const { username } = req.query;
  try {
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userInfo = {
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      accountNumber: user.bankAccount.accountNumber,
      balance: user.bankAccount.balance,
    };
    const transactionHistory = user.transactionHistory || [];
    res.status(200).json({ userInfo, transactionHistory });
  } catch (error) {
    console.error('Error fetching account info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = 8081;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

