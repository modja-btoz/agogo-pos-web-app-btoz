import React from 'react'

import { Row, Col } from 'reactstrap'

const ReservationItem = (props) => {
  return (
    <div>
        <Row>
          <Col sm="5" className="transaction-list">
            <a className="open-booking" href="#" onClick={() => props.cartStore.addSelectedReservation(props.trxID, props.trxName) || props.cartStore.reservationCheckout()}>
              {props.trxName}</a>
          </Col>
          <Col sm="5" className="transaction-list">
            <a className="open-booking" href="#" onClick={() => props.cartStore.addSelectedReservation(props.trxID, props.trxName) || props.cartStore.reservationCheckout()}>
              {props.trxDate}</a>
          </Col>
          <Col sm="2" className="transaction-list">
          <a href="#"  onClick={() => props.cartStore.deleteReservation(props.trxID)}><i className="fas fa-backspace btn-delete-item" style={{ color: "black" }} /></a>
        </Col>
        </Row>
        <hr className="garis-pembatas"/>
          
    </div>
  )
}

export default ReservationItem