import React from 'react'
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

const FooterNavRightBooking = (props) => {
    return (

        <Navbar expand="md">
            <Nav className="ml-auto" navbar>
                <NavItem>
<<<<<<< HEAD
                    <NavLink active={props.cartStore.state.isDeleteBookingShow} onClick={() => props.cartStore.deleteBooking()}><i class="fas fa-trash-alt"></i><br />Hapus</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={props.cartStore.state.isEditBookingShow} onClick={() => props.cartStore.editBooking()}><i class="fas fa-pen"></i><br />Edit</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={props.cartStore.state.isTakeBookingShow} onClick={() => props.cartStore.takeBooking()}><i class="fas fa-check"></i><br />Ambil</NavLink>
=======
                    <NavLink active={props.cartStore.state.isOrderBookingDeleteShow} onClick={() => props.cartStore.orderBookingDelete()}><i class="fas fa-trash-alt"></i><br />Hapus</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={props.cartStore.state.isOrderBookingEditShow} onClick={() => props.cartStore.orderBookingEdit()}><i class="fas fa-pen"></i><br />Edit</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={props.cartStore.state.isOrderBookingTakeShow} onClick={() => props.cartStore.orderBookingTake()}><i class="fas fa-check"></i><br />Ambil</NavLink>
>>>>>>> c35b374eb8da81d155b9afba4014f5a1956ef1e8
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

