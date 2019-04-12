import React, { Component } from 'react'
import TransactionItem from './TransactionItem';

class TransactionItems extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log("ETSTTTTTT", this.props.transactionStore)
  }

  render(){

    return (
      <div>
        {this.props.transactionStore.state.transactionStore.map((transaction, i) => 
          <li>{transaction.username}</li>
        )}
      </div>
    )
  }
}

export default TransactionItems