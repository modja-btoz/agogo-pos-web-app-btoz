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
<<<<<<< HEAD
import TransactionList from '../transaction/TransactionList';
import ReservationList from '../reservation/ReservationList';
import Refund from '../payments/Refund';
=======
>>>>>>> 900f054379670bed1524833a7ac06c01b1e3dd3c

class Kasir extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <Container fluid="true" className="kasir container-fluid h-100">
        <Row className="h-100">

          <Col xs="6" className="kasir-cart">
            <Row className="cart-header no-gutters">
              <Col xs="12">
                <Navbar expand="md">
                  <NavbarBrand href="/" className="ml-4"><i className="fas fa-user-alt mr-1"></i> Hapsa</NavbarBrand>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
<<<<<<< HEAD
                      <NavLink href="/pemesanan">Order #TK-1800000015</NavLink>
=======
                      <NavLink href="/pemesanan">Order #TK-1800000014</NavLink>
>>>>>>> 900f054379670bed1524833a7ac06c01b1e3dd3c
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
                <Cart cartStore={this.props.cartStore} modalStore={this.props.modalStore} />

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
                <FooterNavLeft cartStore={this.props.cartStore} />
              </Col>
            </Row>
            
            {this.props.cartStore.state.isPaymentCheckoutShow &&
              <aside className="SidebarComponentsWrapper">
<<<<<<< HEAD
                {/* PAYMENT COMPONENTS */}
=======
                {/* PAYEMNT COMPONENTS */}
>>>>>>> 900f054379670bed1524833a7ac06c01b1e3dd3c
                <PaymentCheckout cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
              </aside>
            }

<<<<<<< HEAD
            {this.props.cartStore.state.isTransactionListShow &&
              <aside className="SidebarComponentsWrapper">
                {/* TRANSACTION COMPONENTS */}
                <TransactionList cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
              </aside>
            }

            {this.props.cartStore.state.isReservationListShow &&
              <aside className="SidebarComponentsWrapper">
                {/* RESERVATION COMPONENTS */}
                <ReservationList cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
              </aside>
            }

            {this.props.cartStore.state.isRefundShow &&
              <aside className="SidebarComponentsWrapper">
                {/* REFUND COMPONENTS */}
                <Refund cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
              </aside>
            }

=======
>>>>>>> 900f054379670bed1524833a7ac06c01b1e3dd3c
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