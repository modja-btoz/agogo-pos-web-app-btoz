import React from 'react'
// import {DatePicker} from 'react-datepicker'
import { Container, Row, Col, NavLink, Button, Input, Form, FormGroup, Label } from 'reactstrap';
import NumberFormat from 'react-number-format';
import './OrderBooking.scss';

const OrderBooking = (props) => {

        return (

            <Row className="OrderBooking d-block">
                <Container>
                    <Row className="SidebarHeader">
                        <Col>
                            <NavLink onClick={() => props.cartStore.toggleOrderBookingShow() || props.cartStore.clearCart()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i> Pemesanan</NavLink>
                        </Col>
                    </Row>

                    <Row className="SidebarBody">
                        <Col xs="5">
                            <h7 className="mb-0">PEMESAN</h7>
                            {/* <Input className="input pemesan" placeholder="NAMA" text-color="white"></Input> */}
                            <Input className="input-nama" type="text" name="bookingName" id="bookingName" placeholder="NAMA" 
                                value={props.cartStore.state.valueInputBooking["bookingName"]} 
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                        </Col>
                        <Col xs="5">
                            <h7 className="mb-0">TANGGAL SELESAI</h7>
                            {/* <Input className="input tgl" placeholder="DD-MM-YYYY"></Input> */}
                            <Input className="input-tgl" type="date" name="bookingDate" id="bookingDate" placeholder="DD-MM-YYYY"
                                value={props.cartStore.state.valueInputBooking["bookingDate"]}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                            {/* <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            /> */}
                        </Col>
                        <Col xs="2">
                            <h7 className="mb-0">JAM SELESAI</h7>
                            {/* <Input className="input jam" placeholder="HH-MM"></Input> */}
                            <Input className="input-jam" type="time" name="bookingTime" id="bookingTime" placeholder="HH-MM"
                                value={props.cartStore.state.valueInputBooking["bookingTime"]}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                        </Col>
                    </Row>

                    <Row className="Sidebar">
                        <Col >
                            {/* <Input className="input alamat" type="textarea" placeholder="ALAMAT"></Input> */}
                            <Input className="input-alamat" type="textarea" name="bookingAddress" id="bookingAddress" placeholder="ALAMAT"
                                value={props.cartStore.state.valueInputBooking["bookingAddress"]}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                            {/* <Input className="input telepon" placeholder="TELEPON"></Input> */}
                            <Input className="input-telepon" type="text" name="bookingPhone" id="bookingPhone" placeholder="TELEPON"
                                value={props.cartStore.state.valueInputBooking["bookingPhone"]}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                        </Col>
                        <Col xs="auto">
                            {/* <Input className="input-note" type="textarea" placeholder="CATATAN"></Input> */}
                            <Input className="input-note" type="textarea" name="bookingNote" id="bookingNote" placeholder="CATATAN"
                                value={props.cartStore.state.valueInputBooking["bookingNote"]} style={{marginTop:"10px", minHeight:"110px"}}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                        </Col>
                    </Row>

                    <Row className="Sidebar">

                        {/* LEFT */}
                        <Col className="pr-0">

                            <Form>
                                <FormGroup row>
                                    <Label sm={2} className="control-label">BIAYA TAMBAHAN</Label>
                                    <Col sm={10}>

                                    <div className={props.cartStore.state.activeInputBooking === 'bookingAddition' ? 'input-data-wrapper active-input' : 'input-data-wrapper'}>
                                    <Input thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="mb-4 form-control-lg form-control" placeholder="Rp 0"  
                                    name="bookingAddition" id="bookingAddition" 
                                    value={props.cartStore.state.valueInputBooking["bookingAddition"]}  
                                    onChange={props.cartStore.onChangeBooking}                                  
                                    onFocus={props.cartStore.setActiveInputBooking} 
                                    />
                                    {/* <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="mb-4 form-control-lg form-control" placeholder="Rp 0"  
                                    name="bookingAddition" id="bookingAddition" 
                                    value={props.cartStore.state.valueInputBooking["bookingAddition"]}  
                                    onChange={props.cartStore.onChangeBooking}                                  
                                    onFocus={props.cartStore.moveCaretAtEnd} 
                                    />
                                    <Input className="input-masking mb-4" type="text" name="bookingAddition" id="bookingAddition" placeholder=" ..." bsSize="lg" 
                                    value={props.cartStore.state.valueInputBooking["bookingAddition"]}
                                    name="bookingAddition" id="bookingAddition"
                                    onChange={props.cartStore.onChangeBooking}
                                    onFocus={props.cartStore.setActiveInputBooking}
                                    /> */}
                                    </div>
                                        
                                        {/* <Input className="input-lg size-input" placeholder="Rp0" 
                                                onChange={props.cartStore.setActiveInputBooking}
                                                name="bookingAddition" id="bookingAddition"
                                            />  */}
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2} className="control-label">DISKON</Label>
                                    <Col sm={7} style={{float: "left"}}>
                                    {props.cartStore.state.discountType === 'Rp' &&
                                    <div className={props.cartStore.state.activeInputBooking === 'paymentDiscount' ? 'input-data-wrapper active-input' : 'input-data-wrapper'}>
                                    <Input type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="Rp 0" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"]}
                                    name="paymentDiscount" id="paymentDiscount" 
                                    onChange={props.cartStore.onChangeBooking}
                                    onFocus={props.cartStore.setActiveInputBooking}
                                    prefix={'Rp '}/>
                                    {/* <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="Rp 0" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"]}
                                    name="paymentDiscount" id="paymentDiscount" 
                                    onChange={props.cartStore.onChangeBooking}
                                    onFocus={props.cartStore.moveCaretAtEnd}
                                    prefix={'Rp '}
                                    />
                                    <Input className="input-masking mb-4" type="text" placeholder=" ..." bsSize="lg" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"]}
                                    name="paymentDiscount" id="paymentDiscount"
                                    onFocus={props.cartStore.setActiveInputBooking} 
                                    />*/}
                                    </div>
                                    }
                                    {props.cartStore.state.discountType === '%' &&
                                    <div className="input-data-wrapper">
                                    <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="0%" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"]}
                                    name="paymentDiscount" id="paymentDiscount"
                                    onChange={props.cartStore.onChangeBooking}
                                    onFocus={props.cartStore.moveCaretAtEnd}
                                    suffix={'%'}
                                    />
                                    <Input className="input-masking mb-4" type="text" placeholder=" ..." bsSize="lg" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"]}
                                    name="paymentDiscount" id="paymentDiscount"
                                    onFocus={props.cartStore.setActiveInputBooking} 
                                    />
                                    </div>
                                    }
                                    </Col>
                                    <Col sm={2}>
                                    <FormGroup check>
                                        <Input checked={props.cartStore.state.discountType === "Rp"} onChange={props.cartStore.handleDiscountChange} value="Rp" className="radio sm" size="sm" type="radio" name="Rp" id="Rp" /><Label check> Rp </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                    <Input checked={props.cartStore.state.discountType === "%"} onChange={props.cartStore.handleDiscountChange} value="%" className="radio sm" size="sm" type="radio" name="%" id="%" /><Label check> % </Label>
                                        </FormGroup>   
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2} className="control-label">UANG MUKA</Label>
                                    <Col sm={10}>
                                        <div className={props.cartStore.state.activeInputBooking === 'bookingPayment' ? 'input-data-wrapper active-input' : 'input-data-wrapper'}>
                                        <Input thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="mb-4 form-control-lg form-control" placeholder="Rp 0"  
                                        name="bookingPayment" id="bookingPayment"
                                        value={props.cartStore.state.valueInputBooking["bookingPayment"]}
                                        onChange={props.cartStore.onChangeBooking}
                                        onFocus={props.cartStore.setActiveInputBooking}  
                                        />
                                        {/* <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="mb-4 form-control-lg form-control" placeholder="Rp 0"  
                                        name="bookingPayment" id="bookingPayment"
                                        value={props.cartStore.state.valueInputBooking["bookingPayment"]}
                                        // onChange={props.cartStore.onChangeBooking}
                                        onFocus={props.cartStore.moveCaretAtEnd}  
                                        />
                                        <Input className="input-masking mb-4" type="text" name="bookingPayment" id="bookingPayment" placeholder=" ..." bsSize="lg" 
                                        value={props.cartStore.state.valueInputBooking["bookingPayment"]}
                                        name="bookingPayment" id="bookingPayment"
                                        onChange={props.cartStore.onChangeBooking}
                                        onFocus={props.cartStore.setActiveInputBooking}
                                        /> */}
                                        </div>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={2} className="approval">APPROVAL</Label>
                                    <Col sm={6}>
                                        <Input type="password" className="input-lg approval" ></Input>
                                    </Col>
                                    <Col sm={3}>
                                        <Button onClick={() => props.cartStore.addReservation(props.userNow, props.modalStore.toggleModal, "doOrder")} color="danger" className="input-lg"><i className="fas fa-edit"></i> SIMPAN</Button>
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