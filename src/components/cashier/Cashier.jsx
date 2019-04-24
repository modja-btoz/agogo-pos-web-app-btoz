import React, { Component } from 'react';
import { Navbar, NavbarBrand, Container, Row, Col, Nav, NavItem, NavLink, Input } from 'reactstrap';
import Products from '../products/Products'
import ProductCategories from '../products/ProductCategories'
import Cart from '../carts/Cart'
import CalcNumericCart from '../calcs/CalcNumericCart'
import CashierOverlay from './CashierOverlay'
import FooterNavLeft from '../navigations/FooterNavLeft'
import FooterNavRight from '../navigations/FooterNavRight'
import PaymentCheckout from '../payments/PaymentCheckout'

import './Cashier.scss';
import './SidebarComponentsWrapper.scss';
import TransactionList from '../transaction/TransactionList';
import ReservationList from '../reservation/ReservationList';
import Refund from '../payments/Refund';

class Kasir extends Component {

  constructor(props){
    super(props)
  }
  state = {
    userLoggedIn: [],
  }
  
  componentDidMount(){
    this.props.transactionStore.fetchTransaction()
    console.log("TRANS ~~~~~~~~~~~~~ ", this.props.transactionStore);
    console.log("CART ~~~~~~~~~~~~~ ", this.props.cartStore);
    console.log('A', sessionStorage);

    const user = JSON.parse(sessionStorage.getItem('usernow'))
    this.setState({userLoggedIn: user});

  }

  render() {
    return (
      <Container fluid="true" className="kasir container-fluid h-100">
        <Row className="h-100">

          <Col xs="6" className="kasir-cart">
            <Row className="cart-header no-gutters">
              <Col xs="12">
                <Navbar expand="md">
                  <NavbarBrand href="/" className="ml-4"><i className="fas fa-user-alt mr-1"></i> Welcome {this.state.userLoggedIn.username}</NavbarBrand>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/pemesanan">Order #TK-1800000015</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={() => this.props.modalStore.toggleModal('clearCart', '')} className="navbar-close"><i className="fas fa-times"></i></NavLink>
                    </NavItem>
                  </Nav>
                </Navbar>
              </Col>
            </Row>

            <Row className="cart-list no-gutters">
              <Col xs="12">
                <Cart cartStore={this.props.cartStore} modalStore={this.props.modalStore} transactionStore={this.props.transactionStore} />

                {this.props.cartStore.state.isCalcNumericCartOpen && (
                <div className="calc-container">
                  <CalcNumericCart
                    cartStore={this.props.cartStore}
                    onChange={this.props.cartStore.onChange} 
                    onChangeInput={this.props.cartStore.onChangeInput} 
                    onEnter={this.props.cartStore.onEnter} 
                    onChangeAll={inputs => this.props.cartStore.onChangeAll(inputs)}
                    inputName={this.props.cartStore.state.inputName}
                  />
                </div>
                )}
              </Col>
            </Row>


            <Row className="cart-nav no-gutters">
              <Col xs="12">
                <FooterNavLeft transactionStore={this.props.transactionStore} userNow={this.state.userLoggedIn} cartStore={this.props.cartStore} />
              </Col>
            </Row>
            
            {this.props.cartStore.state.isPaymentCheckoutShow &&
              <aside className="SidebarComponentsWrapper">
                {/* PAYMENT COMPONENTS */}
                <PaymentCheckout userNow={this.state.userLoggedIn} cartStore={this.props.cartStore} modalStore={this.props.modalStore} transactionStore={this.props.transactionStore}/>
              </aside>
            }

            {this.props.cartStore.state.isTransactionListShow &&
              <aside className="SidebarComponentsWrapper">
                {/* TRANSACTION COMPONENTS */}
                <TransactionList transactionStore={this.props.transactionStore} cartStore={this.props.cartStore} />
              </aside>
            }

            {this.props.cartStore.state.isReservationListShow &&
              <aside className="SidebarComponentsWrapper">
                {/* RESERVATION COMPONENTS */}
                <ReservationList transactionStore={this.props.transactionStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
              </aside>
            }

            {this.props.cartStore.state.isRefundShow &&
              <aside className="SidebarComponentsWrapper">
                {/* REFUND COMPONENTS */}
                <Refund cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
              </aside>
            }

          </Col>

          <Col xs="6" className="kasir-product">
            <Row className="no-gutters">
              <Col xs="9">
                <Products cartStore={this.props.cartStore} productStore={this.props.productStore} />
              </Col>
              <Col xs="3">
                <ProductCategories productStore={this.props.productStore} />
              </Col>
            </Row>

            <Row className="product-nav no-gutters">
              <Col xs="12">
                <FooterNavRight cartStore={this.props.cartStore} />
              </Col>
            </Row>

            <CashierOverlay isCashierOverlayShow={this.props.cartStore.state.isCashierOverlayShow} />
          </Col>

        </Row>
      </Container>
    );
  }
}

export default Kasir;