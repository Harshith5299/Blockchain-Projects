let dashcore = require('@dashevo/dashcore-lib');
const got = require('got');
var sender = 'yTYZjnTuepHbVAcoWq4g7f5teXru4KSJMa'
var receiver = 'yNpEzKCvS2Vn3WYhXeG11it5wEWMButDvq'
var senderPrivatekey = 'adb27adb845cf776e49ba7f09e58cf53182fcdfd5c3c1ac919340117b41e1a7b'
let token = '8PGdgeEbzxm7SvMWdM4MBIJU5lvnL2w7'
let url = `https://api.chainrider.io/v1/dash/testnet/addr/${sender}/utxo?token=${token}`
let url1='https://api.chainrider.io/v1/dash/testnet/addr/yTYZjnTuepHbVAcoWq4g7f5teXru4KSJMa/utxo?token=8PGdgeEbzxm7SvMWdM4MBIJU5lvnL2w7'
//url2=https://api.chainrider.io/v1/dash/testnet/addr/yNpEzKCvS2Vn3WYhXeG11it5wEWMButDvq/utxo?token=8PGdgeEbzxm7SvMWdM4MBIJU5lvnL2w7
let send_amount = 20000

let dashtxn = async () => {
  try {
    const sender_result = await got(url1);
    
    var main = sender_result.body; 
    return main;
  } catch (error) {
    console.log(error.sender_result.main);
  }
};

  (async () => {
    try{
      let transaction = await dashtxn()
      console.log(transaction)
      let parsed_transaction = JSON.parse(transaction)
      for (j=0;j<parsed_transaction.length;j++){
        let element = parsed_transaction[j]
        if(send_amount < element.satoshis){
          let new_transaction = new dashcore.Transaction().from(element).to(receiver,send_amount).change(sender,element.satoshis-send_amount).sign(senderPrivatekey)
          var raw_id= new_transaction.serialize()
          console.log(raw_id)
          var temp = new Object()
          temp.rawtx = raw_id
          temp.token = token
          url_new = 'https://api.chainrider.io/v1/dash/testnet/tx/send'
          let transaction_result = new Object()
          transaction_result.json = temp
          transaction_result.responseType = "json"
          let res = await got.post(url_new,transaction_result)
          console.log(res.body) 
          break;
        }
      };
    } catch(error){
    console.log(error)    }
  })()
  // check for closure
  
// node sendMoney.js
//  GRADED FUNCTION
//  TASK-1: Write a function that sends {send_amount} of dash from {sender} to {receiver}.
//  Register on ChainRider to get a ChainRider token (instructions provided) and input its value as {token}
//  Create a transaction using the {dashcore} library, and send the transaction using ChainRider
//  Send Raw Transaction API - https://www.chainrider.io/docs/dash/#send-raw-transaction
//  The resulting transaction ID is needed to be supplied through the Assignment on Coursera

/*
Verify which of the following addresses has money use that address as sender and the other address as receiver
{
  pk: 'adb27adb845cf776e49ba7f09e58cf53182fcdfd5c3c1ac919340117b41e1a7b',
  address: 'yTYZjnTuepHbVAcoWq4g7f5teXru4KSJMa'
}

{
  pk: 'ce479af60e74653d9b8f0f09ec00dbd5ec0b60b8e4d0463d392e0dac60cf77f3',
  address: 'yNpEzKCvS2Vn3WYhXeG11it5wEWMButDvq'
}*/
 
//  txid: '0558c04b1a8073e236526f64cdba7731daebbc1b23a49f615413419a42a7f50d'
 


