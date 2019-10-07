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
import ReservationCheckout from '../payments/ReservationCheckout'
import NumberFormat from 'react-number-format'
import LogoAgogo from "./../../img/logo-agogo.png";

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
    name : ''
  }
  
  componentDidMount(){
    this.props.transactionStore.fetchTransaction()
    this.props.transactionStore.fetchReservation()
    console.log("TRANS ~~~~~~~~~~~~~ ", this.props.transactionStore);
    console.log("CART ~~~~~~~~~~~~~ ", this.props.cartStore);
    console.log('A', sessionStorage);

    const user = JSON.parse(sessionStorage.getItem('usernow'))
    this.setState({userLoggedIn: user, name: user.username.toUpperCase()});

    let transactionStoreModal = this.props.transactionStore.state.showModal
    if(transactionStoreModal){
      this.props.modalStore.toggleModal('clearCart', '')
    }
    
  }

  // componentWillUpdate(){
  //   console.log("update", this.props.cartStore.state.selectedItems)
  // }

  render() {
    return (
      <Container fluid="true" className="kasir container-fluid h-100">
        <iframe id="ifmcontentstoprint" title="coba" style={{display: 'none', width: '70mm'}}></iframe>
        <div id="bacoba">

        <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px'}}>
        <div style={{marginTop: '5%', float: 'left', width: '100px', height: '40px', backgroundImage: `url(require(Rp {LogoAgogo}))`, backgroundSize: '100px 40px'}} />
        <div class="info" style={{marginTop: '5%'}}> 
        <h6>
        <p align='left'> 
            Jalan Woltermonginsidi<br />
            Kel. Girian Indah | Kec. Girian <br />
            Bitung | Sulawesi Utara<br />
            Telp. 0438 2230652<br />
            Fax. 0821 8749 8746<br />
        </p>
        </h6>
      </div>
    </div>
    
    <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px', minHeight: '110px'}} >
      <div style={{marginTop: '10px'}}>
      <table>
        <tr>
            <td>Pemesan</td>
            <td>: Manusia tak bertulgang</td>
        </tr>
        <tr>
            <td>Alamat</td>
            <td>: Jln Pegangsaan Timur no 54, Jakarta</td>
        </tr>
        <tr>
            <td>Telepon</td>
            <td>: 082565654125</td>
        </tr>
		    <tr>
            <td>No. Order</td>
            <td>: PS-3541351</td>
        </tr>
		    <tr>
            <td>Tanggal</td>
            <td>: 11/09/2019</td>
        </tr>
		    <tr>
            <td>Selesai</td>
            <td>: 13/09/2019</td>
        </tr>
		    <tr>
            <td>Pencatat</td>
            <td>: Pak Alex</td>
        </tr>
        </table>
      </div>
    </div>
    
    <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px'}}>

					<div id="table" style={{marginTop: 10}}>
						<table>
							<tr style={{height: 20}}>
								<td style={{fontSize: '16px', fontWeight: 'bold'}}>Item</td>
								<td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Qty</td>
								<td style={{fontSize: '16px', fontWeight: 'bold'}}>Sub Total</td>
							</tr>

							{this.props.cartStore.state.items.map(item => 
									<tr class="service">
										<td>{item.name}</td>
										<td style={{textAlign: 'center'}}>{item.qty}</td>
										<td><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
									</tr>
							)}
							{/* <tr class="service">
								<td class="tableitem"><p class="itemtext">{this.props.cartStore.state.time}</p></td>
								<td class="tableitem"><p class="itemtext">5</p></td>
								<td class="payment"><p class="itemtext">Rp 375.00</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Asset Gathering</p></td>
								<td class="tableitem"><p class="itemtext">3</p></td>
								<td class="payment"><p class="itemtext">Rp 225.00</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Design Development</p></td>
								<td class="tableitem"><p class="itemtext">5</p></td>
								<td class="payment"><p class="itemtext">Rp 375.00</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Animation</p></td>
								<td class="tableitem"><p class="itemtext">20</p></td>
								<td class="payment"><p class="itemtext">Rp 1500.00</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Animation Revisions</p></td>
								<td class="tableitem"><p class="itemtext">10</p></td>
								<td class="payment"><p class="itemtext">Rp 750.00</p></td>
							</tr> */}


							{/* <tr class="tabletitle">
								<td></td>
								<td style={{fontSize: '16px', fontWeight: 'bold'}}>Jumlah</td>
								<td style={{fontSize: '16px', fontWeight: 'bold'}}>Rp 419.25</td>
							</tr>

							<tr class="tabletitle">
								<td></td>
								<td style={{fontSize: '16px', fontWeight: 'bold'}}>Diskon</td>
								<td style={{fontSize: '16px', fontWeight: 'bold'}}>Rp 0</td>
							</tr> */}

							<tr class="tabletitle">
								<td></td>
								<td style={{fontSize: '16px', fontWeight: 'bold'}}>Total</td>
								<td style={{fontSize: '16px', fontWeight: 'bold'}}>Rp 3,644.25</td>
							</tr>

							<tr class="tabletitle">
								<td></td>
								<td style={{fontSize: '16px', fontWeight: 'bold'}}>Pembayaran</td>
								<td style={{fontSize: '16px', fontWeight: 'bold'}}>Rp 4,000.00</td>
							</tr>

							<tr class="tabletitle">
								<td></td>
								<td style={{fontSize: '16px', fontWeight: 'bold'}}>Kembali</td>
								<td style={{fontSize: '16px', fontWeight: 'bold'}}>Rp 365.75</td>
							</tr>

						</table>
					</div>

					<div id="legalcopy">
						<p class="legal"><strong>*** 5 ITEM ***<br /></strong>Terima kasih <br />Atas kunjungan anda</p>
					</div>

				</div>
      </div>

        <Row className="h-100">

          <Col xs="6" className="kasir-cart">
            <Row className="cart-header no-gutters">
              <Col xs="12">
                <Navbar expand="md">
                  <NavbarBrand href="#" className="ml-4"><i className="fas fa-user-alt mr-1"></i>{" " +this.state.name}</NavbarBrand>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink onClick={() => this.props.cartStore.doPrint()}>{"Order #" + this.props.cartStore.state.currentTrx}</NavLink>
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
                <FooterNavLeft productStore={this.props.productStore} modalStore={this.props.modalStore} transactionStore={this.props.transactionStore} userNow={this.state.userLoggedIn} cartStore={this.props.cartStore} />
              </Col>
            </Row>
            
            {this.props.cartStore.state.isPaymentCheckoutShow &&
              <aside className="SidebarComponentsWrapper">
                {/* PAYMENT COMPONENTS */}
                <PaymentCheckout userNow={this.state.userLoggedIn} cartStore={this.props.cartStore} modalStore={this.props.modalStore} transactionStore={this.props.transactionStore}/>
              </aside>
            }

            {this.props.cartStore.state.isReservationCheckoutShow &&
              <aside className="SidebarComponentsWrapper">
                {/* PAYMENT COMPONENTS */}
                <ReservationCheckout userNow={this.state.userLoggedIn} cartStore={this.props.cartStore} modalStore={this.props.modalStore} transactionStore={this.props.transactionStore}/>
              </aside>
            }

            {this.props.cartStore.state.isTransactionListShow &&
              <aside className="SidebarComponentsWrapper">
                {/* TRANSACTION COMPONENTS */}
                <TransactionList rootStore={this.props.rootStore} transactionStore={this.props.transactionStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore}/>
              </aside>
            }

            {this.props.cartStore.state.isReservationListShow &&
              <aside className="SidebarComponentsWrapper">
                {/* RESERVATION COMPONENTS */}
                <ReservationList rootStore={this.props.rootStore} transactionStore={this.props.transactionStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
              </aside>
            }

            {this.props.cartStore.state.isRefundShow &&
              <aside className="SidebarComponentsWrapper">
                {/* REFUND COMPONENTS */}
                <Refund userNow={this.state.userLoggedIn} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
              </aside>
            }

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
                <FooterNavRight rootStore={this.props.rootStore} modalStore={this.props.modalStore} cartStore={this.props.cartStore} />
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