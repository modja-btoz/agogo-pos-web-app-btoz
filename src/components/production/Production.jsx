import React from 'react'
import { Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import Cart from '../carts/Cart'
import CalcNumericCart from '../calcs/CalcNumericCart'
import Products from '../products/Products'
import ProductCategories from '../products/ProductCategories'
import CartProduction from '../carts/cartsProduction/CartProduction'
import FooterNavRightBooking from '../navigations/FooterNavRightBooking'
import CartBooking from '../carts/cartsBooking/CartBooking'
import CartBookingTotal from '../carts/CartBookingTotal'
import CartTotal from '../carts/CartTotal'
import FooterNavRightProduction from '../navigations/FooterNavRightProduction';

class Production extends React.Component {
    render() {
        return (
            <Container fluid="true" className="kasir container-fluid h-100">
                <Row className="h-100">

                    <Col xs="6" className="booking-cart">
                        <Row className="cart-header no-gutters">
                            <Col xs="12">
                                <Navbar expand="md">
                                    <NavbarBrand href="/" className="ml-4"><i className="fas fa-user-alt mr-1"></i> Hapsa</NavbarBrand>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <NavLink href="/pemesanan">Order #TK-1800000014</NavLink>
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
                                <CartProduction cartStore={this.props.cartStore} modalStore={this.props.modalStore} />

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
                                <FooterNavRightProduction/>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Container>
        )
    }
}

export default Production