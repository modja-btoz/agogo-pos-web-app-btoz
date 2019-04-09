import React from 'react'
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

const FooterNavRight = (props) => {
  return (

    <Navbar expand="md">
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/refund"><i className="fas fa-retweet"></i><br />Refund</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => props.cartStore.cashierOverlay()}><i className="fas fa-edit"></i> <br />Pemesanan</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/logout"><i className="fas fa-sign-out-alt"></i> <br />Sign Out</NavLink>
        </NavItem>
      </Nav>
    </Navbar>

  )
}

export default FooterNavRight

