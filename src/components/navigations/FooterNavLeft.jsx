import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Input } from 'reactstrap';

const FooterNavLeft = (props) => {
  for(var i=0; i<props.cartStore.state.items; i++){
    let index = i;
  }
  return (

    <Navbar expand="md">

      <NavbarBrand className="ml-4 mr-0">
        <Input className="cart-nav-input mr-2" type="input" name="qrcode" id="productQRCode" placeholder="QR Code ..." />
        <Input className="cart-nav-input" type="number" name="qrcodeQty" id="productQRCodeQty" placeholder="0" readonly />
      </NavbarBrand>

      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink active={props.cartStore.state.isOpenTransactionShow} onClick={() => props.cartStore.openTransaction()}><i className="fas fa-folder-open"></i><br />Buka Trx</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => props.transactionStore.addTransaction(props.userNow.id, props.cartStore.state.items, props.cartStore.state.totalAmount) || props.modalStore.toggleModal('saveTransaction', '')}><i className="fas fa-save"></i><br />Simpan</NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={props.cartStore.state.isPaymentCheckoutShow} onClick={() => props.cartStore.paymentCheckout()}><i className="fas fa-coins"></i><br/>Bayar</NavLink>
        </NavItem>
      </Nav>

    </Navbar>

  )
}

export default FooterNavLeft

