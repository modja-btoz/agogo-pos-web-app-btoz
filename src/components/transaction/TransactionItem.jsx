import React from 'react'
import TransactionItems from './TransactionItems';
import { Row, Col } from 'reactstrap'

import './TransactionItem.scss'

const TransactionItem = (props) => {
  return (
    <div>
        {/* <tbody> */}
          {/* <tr> */}
            {/* <a href="#" style={{ color: "black" }} onClick={() => props.cartStore.addSelectedTransaction(props.trxID, props.trxIndex)}>
            <td className="table-transaction"> {props.trxIndex} {props.trxName}</td>
            <td>{props.trxDate}</td> 
            </a>
            

            <hr className="garis-pembatas"/> */}
          {/* </tr> */}
        {/* </tbody>      */}

      <Row>
        <Col sm="6" className="transaction-list">
          <a className="open-transaction" href="#" style={{ color: "black" }} onClick={() => props.cartStore.addSelectedTransaction(props.trxID, props.trxIndex)}>
            {props.trxName}</a>
        </Col>
        <Col sm="6" className="transaction-list">
          <a className="open-transaction" href="#" style={{ color: "black" }} onClick={() => props.cartStore.addSelectedTransaction(props.trxID, props.trxIndex)}>
            {props.trxDate}</a>
        </Col>
      </Row>
      
    <hr className="garis-pembatas" />
    </div>
  )
}

export default TransactionItem