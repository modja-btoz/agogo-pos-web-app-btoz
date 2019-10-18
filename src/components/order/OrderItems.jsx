import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import OrderItem from './OrderItem';


class OrderItems extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    // console.log("ETSTTTTTT", this.props.transactionStore)
    this.props.cartStore.fetchReservation()
  }

  render(){

    return (

      <Row className="TransactionItems row m-0">

      { this.props.cartStore.state.reservation.map((transaction, i) => 
      <Col xs="12">
        <OrderItem 
          trxIndex={i}
          trxID={transaction.id} 
          trxName={transaction.invoice}
          userID={transaction.user_id}
          trxPrice={transaction.total} 
          trxDate={transaction.created_at} 
          transactionStore={this.props.transactionStore} 
          cartStore={this.props.cartStore} 
        />
      </Col>
      )}   
    </Row>
    


      // <div>
      //   {this.props.transactionStore.state.transactionStore.map((transaction, i) => 
      //     <li>{transaction.username}</li>
      //   )}
      // </div>
    )
  }
}

export default OrderItems