import React from 'react'
import ReservationItems  from './ReservationItems';

const ReservationItem = (props) => {
  return (
    <div>
          <a href="#" style ={{color: "white"}}onClick={() => props.cartStore.addSelectedTransaction(props.trxID, props.trxIndex)}>
          {props.trxIndex} {props.trxName} || {props.trxDate}</a>
          
    </div>
  )
}

export default ReservationItem