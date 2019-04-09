import React from 'react'
import TransactionItem from './TransactionItem';

const TransactionItems = (props) => {
  return (
    <tbody>
      <a href="#">AAA</a>
      {/* {props.transactionStore.state.list.map((transaction, i) => (
        <TransactionItem
          idx={i}
          id={transaction.id}
          date={transaction.date}
          transactionStore={props.transactionStore}  
        />
      ))}  */}

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