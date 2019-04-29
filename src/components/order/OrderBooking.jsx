import React from 'react'
import { Container, Row, Col, NavLink, Button, Input, Form, FormGroup, Label } from 'reactstrap';
import NumberFormat from 'react-number-format';
import './OrderBooking.scss';

const OrderBooking = (props) => {

        return (

            <Row className="OrderBooking d-block">
                <Container>
                    <Row className="SidebarHeader">
                        <Col>
                            <NavLink onClick={() => props.cartStore.toggleOrderBookingShow()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i> Pemesanan</NavLink>
                        </Col>
                    </Row>

                    <Row className="SidebarBody">
                        <Col sm={5}>
                            <h7 className="mb-0">PEMESAN</h7>
                            <Input className="input pemesan" placeholder="NAMA" text-color="white"></Input>
                        </Col>
                        <Col sm={4}>
                            <h7 className="mb-0">TANGGAL SELESAI</h7>
                            <Input className="input tgl" placeholder="DD-MM-YYYY"></Input>
                        </Col>
                        <Col sm={3}>
                            <h7 className="mb-0">JAM SELESAI</h7>
                            <Input className="input jam" placeholder="HH-MM"></Input>
                        </Col>
                    </Row>

                    <Row className="Sidebar">
                        <Col sm={5}>
                            <Input className="input alamat" type="textarea" placeholder="ALAMAT"></Input>
                            <Input className="input telepon" placeholder="TELEPON"></Input>
                        </Col>
                        <Col sm={7}>
                            <Input className="input-note" type="textarea" placeholder="CATATAN"></Input>
                        </Col>
                    </Row>

                    <Row className="Sidebar">

                        {/* LEFT */}
                        <Col className="pr-0">

                            <Form>
                                <FormGroup row>
                                    <Label sm={3} className="control-label">BIAYA TAMBAHAN</Label>
                                    <Col sm={9}>

                                    <div className={props.cartStore.state.activeInputBooking === 'bookingAddition' ? 'input-data-wrapper active-input' : 'input-data-wrapper'}>
                                    <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="mb-4 form-control-lg form-control" placeholder="Rp 0"  
                                    name="bookingAddition" id="bookingAddition" 
                                    onFocus={props.cartStore.moveCaretAtEnd} onChange={props.cartStore.handleChange}
                                    />
                                    <Input className="input-masking mb-4" type="text" name="bookingAddition" id="bookingAddition" placeholder=" ..." bsSize="lg" 
                                    value={props.cartStore.state.valueInputBooking["bookingAddition"] || ""}
                                    name="bookingAddition" id="bookingAddition"
                                    onFocus={props.cartStore.setActiveInputBooking}
                                    />
                                    </div>
                                        
                                        {/* <Input className="input-lg size-input" placeholder="Rp0" 
                                                onChange={props.cartStore.setActiveInputBooking}
                                                name="bookingAddition" id="bookingAddition"
                                            />  */}
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={3} className="control-label">DISKON</Label>
                                    <Col sm={6}>
                                    {props.cartStore.state.discountType === 'Rp' &&
                                    <div className={props.cartStore.state.activeInputBooking === 'paymentDiscount' ? 'input-data-wrapper active-input' : 'input-data-wrapper'}>
                                    <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="Rp 0" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"] || ""}
                                    name="paymentDiscount" id="paymentDiscount" onChange={props.cartStore.handleChange}
                                    onFocus={props.cartStore.moveCaretAtEnd}
                                    prefix={'Rp '}
                                    />
                                    <Input className="input-masking mb-4" type="text" placeholder=" ..." bsSize="lg" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"] || ""}
                                    name="paymentDiscount" id="paymentDiscount"
                                    onFocus={props.cartStore.setActiveInputBooking}
                                    />
                                    </div>
                                    }
                                    {props.cartStore.state.discountType === '%' &&
                                    <div className="input-data-wrapper">
                                    <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="0%" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"] || ""}
                                    name="paymentDiscount" id="paymentDiscount" onChange={props.cartStore.handleChange}
                                    onFocus={props.cartStore.moveCaretAtEnd}
                                    suffix={'%'}
                                    />
                                    <Input className="input-masking mb-4" type="text" placeholder=" ..." bsSize="lg" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"] || ""}
                                    name="paymentDiscount" id="paymentDiscount"
                                    onFocus={props.cartStore.setActiveInputBooking} 
                                    />
                                    </div>
                                    }
                                    </Col>
                                    <Col sm={3}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input className="radio sm" size="sm" type="radio" name="radio1" /> {' '} %
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input className="radio sm" size="sm" type="radio" name="radio1" /> {' '} Rp
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={3} className="control-label">UANG MUKA</Label>
                                    <Col sm={9}>
                                        <div className={props.cartStore.state.activeInputBooking === 'bookingPayment' ? 'input-data-wrapper active-input' : 'input-data-wrapper'}>
                                        <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="mb-4 form-control-lg form-control" placeholder="Rp 0"  
                                        name="bookingPayment" id="bookingPayment" onChange={props.cartStore.handleChange}
                                        onFocus={props.cartStore.moveCaretAtEnd}  
                                        />
                                        <Input className="input-masking mb-4" type="text" name="bookingPayment" id="bookingPayment" placeholder=" ..." bsSize="lg" 
                                        value={props.cartStore.state.valueInputBooking["bookingPayment"] || ""}
                                        name="bookingPayment" id="bookingPayment"
                                        onFocus={props.cartStore.setActiveInputBooking}
                                        />
                                        </div>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={3} className="approval">APPROVAL</Label>
                                    <Col sm={6}>
                                        <Input className="input-lg approval" ></Input>
                                    </Col>
                                    <Col sm={3}>
                                        <Button onClick={() => props.modalStore.toggleModal('bayar', '')} color="danger" className="input-lg approval-btn"><i className="fas fa-edit"></i> SIMPAN</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Row>

        )
    }
    
   

export default OrderBooking