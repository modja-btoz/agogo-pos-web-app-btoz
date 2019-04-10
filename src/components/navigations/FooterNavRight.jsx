import React from 'react'
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

const FooterNavRight = (props) => {
  return (

    <Navbar expand="md">
      <Nav className="ml-auto" navbar>
        <NavItem>
<<<<<<< HEAD
          <NavLink active={props.cartStore.state.isOpenRefundShow} onClick={() => props.cartStore.openRefund()}><i className="fas fa-retweet"></i><br />Refund</NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={props.cartStore.state.isOpenReservationShow} onClick={() => props.cartStore.openReservation()}><i className="fas fa-edit"></i> <br />Pemesanan</NavLink>
=======
          <NavLink href="/refund"><i className="fas fa-retweet"></i><br />Refund</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/pemesanan"><i className="fas fa-edit"></i> <br />Pemesanan</NavLink>
>>>>>>> 900f054379670bed1524833a7ac06c01b1e3dd3c
        </NavItem>
        <NavItem>
          <NavLink href="/logout"><i className="fas fa-sign-out-alt"></i> <br />Sign Out</NavLink>
        </NavItem>
      </Nav>
    </Navbar>

  )
}

export default FooterNavRight

