import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Input } from 'reactstrap';

class FooterNavLeft  extends Component {

  constructor(props){
    super(props)
  }

  handleChange = (e) => {
    this.props.cartStore.setState({
      searchCode: e.target.value
    }, () => {
      this.buttonSetSearchCode(this.props.cartStore.state.searchCode)
    })
  }

  buttonSetSearchCode(code){
    this.props.cartStore.setSearchCode(code)
  }

  resetSearchCode(){
    this.props.cartStore.setState({
      searchCode: ''
    })
  }

  render() {
    
    return (

      <Navbar expand="md">

        <NavbarBrand className="ml-4 mr-0">
          <Input className="cart-nav-input mr-2" type="input" name="qrcode" id="productQRCode" placeholder="QR Code ..." 
            value={this.props.cartStore.state.searchCode}
            onChange={this.handleChange}
            ref={el => this.inputTitle = el}/>
        </NavbarBrand>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink active={this.props.cartStore.state.isTransactionListShow} onClick={() => this.props.cartStore.openTransaction()}><i className="fas fa-folder-open"></i><br />Buka Trx</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled={this.props.cartStore.state.isDisabled} onClick={() => this.props.cartStore.addTransaction(this.props.userNow.id, this.props.modalStore.toggleModal)}><i className="fas fa-save"></i><br />Simpan</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled={this.props.cartStore.state.isDisabled} active={this.props.cartStore.state.isPaymentCheckoutShow} onClick={() => this.props.cartStore.paymentCheckout()}><i className="fas fa-coins"></i><br/>Bayar</NavLink>
          </NavItem>
        </Nav>

      </Navbar>

    )
  }
}

export default FooterNavLeft

