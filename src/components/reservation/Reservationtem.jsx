import React from 'react'
import ReservationItems  from './ReservationItems';

import { Row, Col } from 'reactstrap'

const ReservationItem = (props) => {
  return (
    <div>
        <Row>
          <Col sm="6" className="transaction-list">
            <a className="open-booking" href="#" onClick={() => props.cartStore.addSelectedTransaction(props.trxID, props.trxIndex)}>
              {props.trxIndex} {props.trxName}</a>
          </Col>
          <Col sm="6" className="transaction-list">
            <a className="open-booking" href="#" onClick={() => props.cartStore.addSelectedTransaction(props.trxID, props.trxIndex)}>
              {props.trxDate}</a>
          </Col>
        </Row>
        <hr className="garis-pembatas"/>
          
    </div>
  )
}

export default ReservationItem