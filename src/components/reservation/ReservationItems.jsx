import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import ReservationItem from './Reservationtem';

class ReservationItems extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log("ETSTTTTTT", this.props.transactionStore)

  }
  componentWillUpdate(){
    this.props.transactionStore.fetchReservation()
  }

  render(){

    return (

      <Row className="TransactionItems row m-0">

      { this.props.transactionStore.state.reservationStore.map((transaction, i) => 
      <Col xs="12">
        <ReservationItem 
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

export default ReservationItems