import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Input } from 'reactstrap';

class FooterNavLeft  extends Component {

  constructor(props){
    super(props)
  }
  state = {
    showModal: this.props.transactionStore.state.showModal
  }

  componentDidUpdate() {
    let showModal = this.props.transactionStore.state.showModal
    if(showModal !== this.state.showModal){
        this.setState({
          showModal
        },()=>{
          this.props.modalStore.toggleModal('simpanKasir', '', '', 'Contoh Modal kirim state showModal dari TransactionContainer')
        });
    }
    console.log("SHOW MODAL ", this.state.showModal)

  }

  showModal(){
    let showModal = this.props.transactionStore.state.showModal
  
    console.log("SHOW MODAL ", showModal)
    if(showModal !== false){
      this.props.modalStore.toggleModal('clearCart', '')
      return
    }
  } 

  render() {
    
    // this.showModal()
    
    return (

      <Navbar expand="md">

        <NavbarBrand className="ml-4 mr-0">
          <Input className="cart-nav-input mr-2" type="input" name="qrcode" id="productQRCode" placeholder="QR Code ..." />
          <Input className="cart-nav-input" type="number" name="qrcodeQty" id="productQRCodeQty" placeholder="0" readonly />
        </NavbarBrand>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink active={this.props.cartStore.state.isTransactionListShow} onClick={() => this.props.cartStore.openTransaction()}><i className="fas fa-folder-open"></i><br />Buka Trx</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled={this.props.cartStore.state.isDisabled} onClick={() => this.props.transactionStore.addTransaction(this.props.userNow.id, this.props.cartStore.state.items, this.props.cartStore.state.totalAmount)}><i className="fas fa-save"></i><br />Simpan</NavLink>
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

