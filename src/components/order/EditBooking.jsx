import React from 'react'
import { Container, Row, Col, Input, Label, Button, NavLink, Form, FormGroup } from 'reactstrap'
import NumberFormat from 'react-number-format';
import './EditBooking.scss'
import FooterNavRightBooking from '../navigations/FooterNavRightBooking'


const EditBooking = (props) => {
    return (

        <Row className="editBooking d-block">
            <Container>
                <Row className="SidebarHeader">
                    <Col>
                        <NavLink onClick={() => props.cartStore.toggleBookingEditShow() || props.cartStore.clearCart()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i> Pemesanan</NavLink>
                    </Col>
                </Row>

                <Row className="SidebarBody">
                    <Col sm={5}>
                        <h7 className="mb-0">PEMESAN</h7>
                        <Input className="input-masking mb-4" type="text" name="bookingName" id="bookingName" placeholder="NAMA"
                                value={props.cartStore.state.valueInputBooking["bookingName"]}
                                defaultValue={props.cartStore.state.dataReservation.nama}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />                    
                        </Col>
                    <Col sm={4}>
                        <h7 className="mb-0">TANGGAL SELESAI</h7>
                        <Input className="input-tgl" type="date" name="bookingDate" id="bookingDate" placeholder="DD-MM-YYYY"
                                value={props.cartStore.state.valueInputBooking["bookingDate"]}
                                defaultValue={props.cartStore.state.dataReservation.tgl_selesai}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                        </Col>
                    <Col sm={3}>
                        <h7 className="mb-0">JAM SELESAI</h7>
                        <Input className="input-jam" type="time" name="bookingTime" id="bookingTime" placeholder="HH-MM"
                                value={props.cartStore.state.valueInputBooking["bookingTime"]}
                                defaultValue={props.cartStore.state.dataReservation.waktu_selesai}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                        </Col>
                </Row>

                <Row className="Sidebar">
                    <Col >
                    <Input className="input-alamat" type="textarea" name="bookingAddress" id="bookingAddress" placeholder="ALAMAT"
                                value={props.cartStore.state.valueInputBooking["bookingAddress"]}
                                defaultValue={props.cartStore.state.dataReservation.alamat}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                    <Input className="input-telepon" type="text" name="bookingPhone" id="bookingPhone" placeholder="TELEPON"
                                value={props.cartStore.state.valueInputBooking["bookingPhone"]}
                                defaultValue={props.cartStore.state.dataReservation.telepon}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                        </Col>
                    <Col xs="auto">
                    <Input className="input-note" type="textarea" name="bookingNote" id="bookingNote" placeholder="CATATAN"
                                value={props.cartStore.state.valueInputBooking["bookingNote"]} style={{marginTop:"10px", minHeight:"110px"}}
                                defaultValue={props.cartStore.state.dataReservation.catatan}
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
                                <Label sm={3} className="control-label">BIAYA TAMBAHAN</Label>
                                <Col sm={9}>
                                <div className={props.cartStore.state.activeInputBooking === 'bookingAddition' ? 'input-data-wrapper active-input' : 'input-data-wrapper'}>
                                    <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="mb-4 form-control-lg form-control" placeholder="Rp 0"  
                                    name="bookingAddition" id="bookingAddition" 
                                    value={props.cartStore.state.valueInputBooking["bookingAddition"]}  
                                    onChange={props.cartStore.onChangeBooking}  
                                    defaultValue={props.cartStore.state.dataReservation.add_fee}                                
                                    onFocus={props.cartStore.setActiveInputBooking}/>
                                    </div>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3} className="control-label">DISKON</Label>
                                <Col sm={7}>
                                    {props.cartStore.state.discountType === 'Rp' &&
                                    <div className={props.cartStore.state.activeInputBooking === 'paymentDiscount' ? 'input-data-wrapper active-input' : 'input-data-wrapper'}>
                                    <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="Rp 0" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"]}
                                    name="paymentDiscount" id="paymentDiscount" 
                                    onChange={props.cartStore.onChangeBooking}
                                    defaultValue={props.cartStore.state.dataReservation.discount}
                                    onFocus={props.cartStore.setActiveInputBooking}
                                    prefix={'Rp '}/>
                                    </div>
                                    }
                                    {props.cartStore.state.discountType === '%' &&
                                    <div className={props.cartStore.state.activeInputBooking === 'paymentDiscount' ? 'input-data-wrapper active-input' : 'input-data-wrapper'}>
                                    <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="0%" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"]}
                                    name="paymentDiscount" id="paymentDiscount"
                                    onChange={props.cartStore.onChangeBooking}
                                    defaultValue={props.cartStore.state.dataReservation.discount}
                                    onFocus={props.cartStore.setActiveInputBooking}
                                    suffix={'%'}/>
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
                                <Label sm={3} className="control-label">UANG MUKA<br/><i className="far fa-times-circle notif-close"></i><span className="notif"> Belum dibayar</span></Label>
                                <Col sm={9}>
                                <div className={props.cartStore.state.activeInputBooking === 'bookingPayment' ? 'input-data-wrapper active-input' : 'input-data-wrapper'}>
                                    <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="mb-4 form-control-lg form-control" placeholder="Rp 0"  
                                    name="bookingPayment" id="bookingPayment"
                                    value={props.cartStore.state.valueInputBooking["bookingPayment"]}
                                    onChange={props.cartStore.onChangeBooking}
                                    defaultValue={props.cartStore.state.dataReservation.uang_muka}
                                    onFocus={props.cartStore.setActiveInputBooking}/>
                                </div>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Row>
                                <Label sm={3} className="approval">USER</Label>
                                <Col sm={6}>
                                <Input className="input-masking mb-4" type="text" placeholder="USER" bsSize="lg"
                                        name="approvalUser" id="approvalUser"
                                        onFocus={props.cartStore.setActiveInputRefund}
                                        onChange={props.cartStore.onChangeBooking}
                                        autoComplete="off"
                                    />
                                </Col>
                                </Row>
                                <Row>
                                <Label sm={3} className="approval">APPROVAL</Label>
                                <Col sm={6}>
                                <Input className="input-masking mb-4" type="password" placeholder="PIN" bsSize="lg"
                                        // value={props.cartStore.state.valueInputBooking["approvalCode"]}
                                        name="approvalCode" id="approvalCode"
                                        onFocus={props.cartStore.setActiveInputBooking}
                                        onChange={props.cartStore.onChangeBooking}
                                    />
                                </Col>
                                <Col sm={3}>
                                <Button onClick={() => props.cartStore.addReservation(props.userNow, props.modalStore.toggleModal, "editOrder")} color="danger" className="input-lg"><i className="fas fa-edit"></i> SIMPAN</Button>
                                </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                        <Row className="product-nav no-gutters">
                                <Col xs="12">
                                    <FooterNavRightBooking cartStore={props.cartStore} />
                                </Col>
                            </Row>
                    </Col>

                </Row>

            </Container>
        </Row>

    )
}

export default EditBooking;