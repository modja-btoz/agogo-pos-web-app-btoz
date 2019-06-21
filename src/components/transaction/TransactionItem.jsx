import React from 'react'
import TransactionItems from './TransactionItems';
import { Row, Col } from 'reactstrap'

import './TransactionItem.scss'

const TransactionItem = (props) => {
  return (
    <div>
      <Row >
        <Col sm="4" className="row-trx" onClick={() => props.cartStore.addSelectedTransaction(props.trxID, props.trxName, props.trxIndex)}>
          <a className="open-transaction" href="#" style={{ color: "black" }} >
            {props.trxName}
          </a>
        </Col>
        <Col sm="6" className="transaction-list">
          <a className="open-transaction" href="#" style={{ color: "black" }} >
            {props.trxDate}</a>
        </Col>
        <Col sm="2" className="transaction-list">
          <a href="#"  onClick={() => props.cartStore.deleteSelectedOrder(props.trxID)}><i className="fas fa-backspace btn-delete-item" style={{ color: "black" }} /></a>
        </Col>
      </Row>
      
    <hr className="garis-pembatas" />
    </div>
  )
}

export default TransactionItem