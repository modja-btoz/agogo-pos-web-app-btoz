import React from 'react'
import { Container, Row, Col, NavLink, Button, Input } from 'reactstrap'
import './CashierOverlay.css'
import CashierOverlayShow from './CashierOverlayShow'


const CashierOverlay = (props) => {
  return (
    
    <div className={props.isCashierOverlayShow ? "CashierOverlay d-block" : "CashierOverlay d-none"}><CashierOverlayShow/></div>
      
  )
}

export default CashierOverlay