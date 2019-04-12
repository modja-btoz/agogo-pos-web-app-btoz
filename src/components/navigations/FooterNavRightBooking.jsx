import React from 'react'
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

const FooterNavRightBooking = (props) => {
    return (

        <Navbar expand="md">
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/Hapus"><i class="fas fa-trash-alt"></i><br />Hapus</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/Edit"><i class="fas fa-pen"></i><br />Edit</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/Ambil"><i class="fas fa-check"></i><br />Ambil</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={props.cartStore.state.isOrderBookingShow} onClick={() => props.cartStore.orderBooking()}><i class="fas fa-edit"></i><br />Order</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/logout"><i class="fas fa-sign-out-alt"></i><br />Sign Out</NavLink>
                </NavItem>
            </Nav>
        </Navbar>

    )
}

export default FooterNavRightBooking

