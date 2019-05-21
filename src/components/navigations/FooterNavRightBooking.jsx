import React from 'react'
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

const FooterNavRightBooking = (props) => {
    return (

        <Navbar expand="md">
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink disabled={props.cartStore.state.disabledOther} active={props.cartStore.state.isOrderBookingDeleteShow} onClick={() => props.cartStore.orderBookingDelete()}><i class="fas fa-trash-alt"></i><br />Hapus</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink disabled={props.cartStore.state.disabledOther} active={props.cartStore.state.isOrderBookingEditShow} onClick={() => props.cartStore.orderBookingEdit()}><i class="fas fa-pen"></i><br />Edit</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink disabled={props.cartStore.state.disabledOther} active={props.cartStore.state.isOrderBookingTakeShow} onClick={() => props.cartStore.orderBookingTake()}><i class="fas fa-check"></i><br />Ambil</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink disabled={props.cartStore.state.disabledOrder} active={props.cartStore.state.isOrderBookingShow} onClick={() => props.cartStore.orderBooking()}><i class="fas fa-edit"></i><br />Order</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/logout"><i class="fas fa-sign-out-alt"></i><br />Sign Out</NavLink>
                </NavItem>
            </Nav>
        </Navbar>

    )
}

export default FooterNavRightBooking

