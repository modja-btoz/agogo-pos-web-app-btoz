import React from 'react'
import OrderItems from './OrderItems';


const OrderItem = (props) => {
  return (
    <div>
          <a href="#" style ={{color: "white"}}onClick={() => props.cartStore.deleteOrder(props.trxID)}>
          {props.trxIndex} {props.trxName} || {props.trxDate}</a>
          
    </div>
  )
}

export default OrderItem