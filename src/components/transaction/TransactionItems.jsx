import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import TransactionItem from './TransactionItem';

class TransactionItems extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.cartStore.fetchTransaction()
  }  

  render(){

    return (
    <div style={{height: "80%"}}>
      <Row className="TransactionItems row m-0">
      { this.props.cartStore.state.transaction.map((transaction, i) => 
      <Col xs="12" >
        <TransactionItem 
          trxIndex={i}
          trxID={transaction.id} 
          trxName={transaction.invoice}
          userID={transaction.user_id}
          trxPrice={transaction.total} 
          trxDate={transaction.created_at} 
          transactionStore={this.props.transactionStore} 
          cartStore={this.props.cartStore} 
          rootStore={this.props.rootStore}
        />
      </Col>
      )}    

    </Row>
    </div>


      // <div>
      //   {this.props.transactionStore.state.transactionStore.map((transaction, i) => 
      //     <li>{transaction.username}</li>
      //   )}
      // </div>
    )
  }
}

export default TransactionItems