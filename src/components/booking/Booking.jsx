    import React, { Component } from  'react'
    import { Navbar, NavbarBrand, Container, Row, Col, Nav, NavItem, NavLink, Input, Button, Popover, PopoverBody } from 'reactstrap'
    import Cart from '../carts/Cart'
    import CalcNumericCart from '../calcs/CalcNumericCart'
    import Products from '../products/Products'
    import ProductCategories from '../products/ProductCategories'
    import FooterNavRightBooking from '../navigations/FooterNavRightBooking'
    import CartBooking from '../carts/cartsBooking/CartBooking'
    import CartBookingTotal from '../carts/CartBookingTotal'
    import CartTotal from '../carts/CartTotal'

    import '../booking/Booking.scss'
    import '../cashier/SidebarComponentsWrapper.scss'
    import OrderBooking from '../order/OrderBooking'
    import OrderBookingDelete from '../order/OrderBookingDelete'
    import OrderBookingEdit from '../order/OrderBookingEdit'
    import OrderBookingTake from '../order/OrderBookingTake'
    import DeleteBooking from '../order/DeleteBooking'
    import EditBooking from '../order/EditBooking'
    import TakeBooking from '../order/TakeBooking'

    class Booking extends Component {
        constructor(props) {
            super(props)

            this.toggle = this.toggle.bind(this);
            this.state = {
                popoverOpen: false,
                userLoggedIn: []
            };

        }

        toggle() {
            this.setState({
            popoverOpen: !this.state.popoverOpen
            });
            console.log("A")
        }

        componentDidMount(){
            this.props.transactionStore.fetchReservation()
            console.log("UWOWO ~~~~~~~~~~~~~ ", this.props.transactionStore);
            const user = JSON.parse(sessionStorage.getItem('usernow'))
            this.setState({userLoggedIn: user});
        
        }

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
                                    <CartBooking cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                    {this.props.cartStore.state.popStatus && 
                                    <div>
                                        <Button toggle="false" block="true" id="Popover1" type="button" onClick={() => this.toggle()}>
                                        Tambah Item
                                        </Button>
                                        <Popover placement="right" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                                            <PopoverBody >
                                                <Products cartStore={this.props.cartStore} productStore={this.props.productStore} activePath={this.props.activePath}/>
                                            </PopoverBody>
                                        </Popover>
                                    </div>
                                    }
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
                                    <Products activePath={this.props.activePath} cartStore={this.props.cartStore} productStore={this.props.productStore} />
                                </Col>
                                <Col xs="3">
                                    <ProductCategories productStore={this.props.productStore} />
                                </Col>
                            </Row>

                            <Row className="product-nav no-gutters">
                                <Col xs="12">
                                    <FooterNavRightBooking cartStore={this.props.cartStore} />
                                </Col>
                            </Row>
                            
                            {this.props.cartStore.state.isOrderBookingShow &&
                                <aside className="SidebarComponentsWrapper">
                                    {/* PAYEMNT COMPONENTS */}
                                    <OrderBooking userNow={this.state.userLoggedIn} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </aside>
                            }
                            {this.props.cartStore.state.isOrderBookingDeleteShow &&
                                <aside className="SidebarComponentsWrapper">
                                    {/* PAYEMNT COMPONENTS */}
                                    <OrderBookingDelete transactionStore={this.props.transactionStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </aside>
                            }
                            {this.props.cartStore.state.isOrderBookingEditShow &&
                                <aside className="SidebarComponentsWrapper">
                                    {/* PAYEMNT COMPONENTS */}
                                    <OrderBookingEdit transactionStore={this.props.transactionStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </aside>
                            }
                            {this.props.cartStore.state.isOrderBookingTakeShow &&
                                <aside className="SidebarComponentsWrapper">
                                    {/* PAYEMNT COMPONENTS */}
                                    <OrderBookingTake transactionStore={this.props.transactionStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </aside>
                            }
                            {this.props.cartStore.state.isBookingDeleteShow &&
                                <aside className="SidebarComponentsWrapper">
                                    {/* PAYEMNT COMPONENTS */}
                                    <DeleteBooking transactionStore={this.props.transactionStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </aside>
                            }
                            {this.props.cartStore.state.isBookingEditShow &&
                                <aside className="SidebarComponentsWrapper">
                                    {/* PAYEMNT COMPONENTS */}
                                    <EditBooking userNow={this.state.userLoggedIn} transactionStore={this.props.transactionStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </aside>
                            }
                            {this.props.cartStore.state.isBookingTakeShow &&
                                <aside className="SidebarComponentsWrapper">
                                    {/* PAYEMNT COMPONENTS */}
                                    <TakeBooking transactionStore={this.props.transactionStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </aside>
                            }

                        </Col>

                    </Row>
                </Container>
            )
        }
    }

    export default Booking