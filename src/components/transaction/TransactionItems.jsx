import React from 'react'
import TransactionItem from './TransactionItem';

const TransactionItems = (props) => {
  
  return (
    <tbody>
      <li><a href="#">AAA</a></li>
      {props.transactionStore.state.transaction.map((transaction, i) => (
        <TransactionItem
          idx={i}
          id={transaction.id}
          date={transaction.harga}
          transactionStore={props.transactionStore}  
        />
      ))} 

      {/* {props.transactionStore.props.transaction((transaction, i) =>  (
        <TransactionItem
          idx={i}
          id={transaction.title}
          date={transaction.date}
          transactions={props.transactions}
          transactionStore={props.transactionStore}  
        />
      ))}  */}

    </tbody>
  )
}

export default TransactionItems