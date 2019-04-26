import React from 'react'

const ReservationItem = (props) => {
  return (
    <div>
          <a href="#" style ={{color: "white"}}onClick={() => props.cartStore.addSelectedReservation(props.trxID, props.trxIndex, props.trxName) || props.cartStore.reservationCheckout()}>
          {props.trxIndex} {props.trxName} || {props.trxDate}</a>
          
    </div>
  )
}

export default ReservationItem