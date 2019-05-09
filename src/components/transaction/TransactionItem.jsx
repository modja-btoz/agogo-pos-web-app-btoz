import React from 'react'
import TransactionItems from './TransactionItems';
import { Row, Col } from 'reactstrap'

import './TransactionItem.scss'

const TransactionItem = (props) => {
  return (
    <div>
      <Row>
        <Col sm="5" className="transaction-list">
          <a className="open-transaction" href="#" style={{ color: "black" }} onClick={() => props.cartStore.addSelectedTransaction(props.trxID, props.trxIndex)}>
            {props.trxName}</a>
        </Col>
        <Col sm="5" className="transaction-list">
          <a className="open-transaction" href="#" style={{ color: "black" }} onClick={() => props.cartStore.addSelectedTransaction(props.trxID, props.trxIndex)}>
            {props.trxDate}</a>
        </Col>
        <Col sm="2" className="transaction-list">
          <i className="fas fa-backspace btn-delete-item" style={{ color: "black" }} onClick={() => props.cartStore.deleteSelectedOrder(props.trxID)} />
        </Col>
      </Row>
      
    <hr className="garis-pembatas" />
    </div>
  )
}

export default TransactionItem