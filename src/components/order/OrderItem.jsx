import React from 'react'
import { Row, Col } from 'reactstrap'
import './OrderItem.scss'

const OrderItem = (props) => {
  return (
    <div>
      <Row>
        <Col sm="6" className="row-trx" onClick={() => props.cartStore.doOrder(props.trxID)}>
          <a className="open-transaction" href="#" style={{ color: "black" }} >
            {props.trxName}</a>
        </Col>
        <Col sm="6" className="transaction-list">
          <a className="open-transaction" href="#" style={{ color: "black" }} >
            {props.trxDate}</a>
        </Col>
      </Row>
    <hr className="garis-pembatas" />
</div>
  )
}

export default OrderItem