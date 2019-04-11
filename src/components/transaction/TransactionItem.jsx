import React from 'react'
import TransactionItems from './TransactionItems';


const TransactionItem = (props) => {
  return (
    <div>
          <TransactionItems transactionStore= {props.transactionStore} />
    </div>
  )
}

export default TransactionItem