import React from 'react';
import PhonePay from'./PhonePay';
import FastagBillBlock from './FastagBillBlock';
import ElectricityBillBlock from './ElectricityBillBlock';


const PayBillsPage = () => {
  return (
    <div className="pay-bills-page">
      <h1><u><b><i>Pay Bills</i></b></u></h1>
      
      <div className="bill-categories">
     
        <PhonePay />
        <FastagBillBlock />
        <ElectricityBillBlock />
        
      </div>
    </div>
  );
};

export default PayBillsPage;
