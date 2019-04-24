import React from 'react'
import TransactionItems from './TransactionItems';


const TransactionItem = (props) => {
  return (
    <div>
          <a href="#" style ={{color: "white"}} onClick={() => props.cartStore.addSelectedTransaction(props.trxID, props.trxIndex)}>
          {props.trxIndex} {props.trxName} || {props.trxDate}</a>
          
    </div>
  )
}

export default TransactionItem