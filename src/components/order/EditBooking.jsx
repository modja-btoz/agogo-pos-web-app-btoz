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
                        <Col xs="6" className="pl-0">
                        <Col>
                            <h7 className="mb-0">PEMESAN</h7>
                            {/* <Input className="input pemesan" placeholder="NAMA" text-color="white"></Input> */}
                            <Input className="input-nama" type="text" name="bookingName" id="bookingName" placeholder="NAMA" 
                                value={props.cartStore.state.valueInputBooking["bookingName"]} 
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                defaultValue={props.cartStore.state.dataReservation.nama}
                                />
                        </Col>
                        <Col>
                            <h7 className="mb-0">TANGGAL SELESAI</h7>
                            {/* <Input className="input tgl" placeholder="DD-MM-YYYY"></Input> */}
                            <Input className="input-tgl" type="date" name="bookingDate" id="bookingDate" placeholder="DD-MM-YYYY"
                                value={props.cartStore.state.valueInputBooking["bookingDate"]}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                defaultValue={props.cartStore.state.dataReservation.tgl_selesai}
                                />
                        </Col>
                        <Col>
                            <h7 className="mb-0">JAM SELESAI</h7>
                            {/* <Input className="input jam" placeholder="HH-MM"></Input> */}
                            <Input className="input-jam" type="time" name="bookingTime" id="bookingTime" placeholder="HH-MM"
                                value={props.cartStore.state.valueInputBooking["bookingTime"]}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                defaultValue={props.cartStore.state.dataReservation.waktu_selesai}
                                />
                        </Col>
                        <Col>
                            <h7 className="mb-0">TELEPON</h7>
                            <Input className="input-telepon" type="text" name="bookingPhone" id="bookingPhone" placeholder="TELEPON"
                                value={props.cartStore.state.valueInputBooking["bookingPhone"]}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                defaultValue={props.cartStore.state.dataReservation.telepon}
                                />
                        </Col>
                        </Col>
                        <Col xs="6"  className="pl-0">
                        <Col>
                            <h7 className="mb-0">ALAMAT</h7>
                            {/* <Input className="input alamat" type="textarea" placeholder="ALAMAT"></Input> */}
                            <Input className="input-alamat" type="textarea" name="bookingAddress" id="bookingAddress" placeholder="ALAMAT"
                                value={props.cartStore.state.valueInputBooking["bookingAddress"]} style={{minHeight:"100px"}}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                defaultValue={props.cartStore.state.dataReservation.alamat}
                                />
                        </Col>
                        <Col>
                            <h7 className="mb-0">CATATAN</h7>
                            {/* <Input className="input-note" type="textarea" placeholder="CATATAN"></Input> */}
                            <Input className="input-note" type="textarea" name="bookingNote" id="bookingNote" placeholder="CATATAN"
                                    value={props.cartStore.state.valueInputBooking["bookingNote"]} style={{marginTop:"0px", minHeight:"100px"}}
                                    onChange={props.cartStore.onChangeBooking}
                                    onFocus={props.cartStore.setActiveInputBooking}
                                    defaultValue={props.cartStore.state.dataReservation.catatan}
                                    />
                        </Col>
                        </Col>
                    </Row>
                    <Row className="Sidebar">
                        {/* LEFT */}
                        <Col className="pr-0">
                            <Form>
                                <FormGroup row>
                                    {/* <Label sm={2} className="control-label">BIAYA TAMBAHAN</Label> */}
                                    <Col sm={11}>
                                    <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="input-uangTambah" placeholder="BIAYA TAMBAHAN"  
                                    name="bookingAddition" id="bookingAddition"
                                    value={props.cartStore.state.valueInputBooking["bookingAddition"]}  
                                    onValueChange={props.cartStore.onChangeBooking} 
                                    defaultValue={props.cartStore.state.dataReservation.add_fee}                                                                 
                                    onFocus={props.cartStore.setActiveInputBooking}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    {/* <Label sm={2} className="control-label">DISKON</Label> */}
                                    <Col sm={9} style={{float: "left"}}>
                                    {props.cartStore.state.discountType === 'Rp' &&
                                    <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="input-uangDiskon" placeholder="DISKON RP" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"]}
                                    name="paymentDiscount" id="paymentDiscount" 
                                    onValueChange={props.cartStore.onChangeBooking}
                                    defaultValue={props.cartStore.state.dataReservation.discount}
                                    onFocus={props.cartStore.setActiveInputBooking}
                                    prefix={'Rp '}/>
                                    }
                                    {props.cartStore.state.discountType === '%' &&
                                    <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="input-uangDiskon" placeholder="DISKON %" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"]}
                                    name="paymentDiscount" id="paymentDiscount"
                                    onValueChange={props.cartStore.onChangeBooking}
                                    defaultValue={props.cartStore.state.dataReservation.discount}
                                    onFocus={props.cartStore.setActiveInputBooking}
                                    suffix={'%'}/>
                                    }
                                    </Col>
                                    <Col sm={2}>
                                    <FormGroup check className="pl-0">
                                        <Input checked={props.cartStore.state.discountType === "Rp"} onChange={props.cartStore.handleDiscountChange} value="Rp" className="radio sm pl-0" size="sm" type="radio" name="Rp" id="Rp" /><Label check> Rp </Label>
                                    </FormGroup>
                                    <FormGroup check className="pl-0">
                                    <Input checked={props.cartStore.state.discountType === "%"} onChange={props.cartStore.handleDiscountChange} value="%" className="radio sm pl-0" size="sm" type="radio" name="%" id="%" /><Label check> % </Label>
                                        </FormGroup>   
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    {/* <Label sm={2} className="control-label">UANG MUKA</Label> */}
                                    <Col sm={11}>
                                        <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="input-uangMuka" placeholder="UANG MUKA"  
                                        name="bookingPayment" id="bookingPayment"
                                        value={props.cartStore.state.valueInputBooking["bookingPayment"]}
                                        onValueChange={props.cartStore.onChangeBooking}
                                        defaultValue={props.cartStore.state.dataReservation.uang_muka}
                                        onFocus={props.cartStore.setActiveInputBooking}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                <Row >
                                {/* <Label sm={2} className="approval">USER</Label> */}
                                <Col sm={6}>
                                <Input className="input-user" type="text" placeholder="USER" 
                                        name="approvalUser" id="approvalUser"
                                        onFocus={props.cartStore.setActiveInputRefund}
                                        onChange={props.cartStore.onChangeBooking}
                                        autoComplete="off"
                                    />
                                </Col>
                                </Row>
                                <Row style={{paddingTop: "10px"}}>
                                {/* <Label sm={2} className="approval">APPROVAL</Label> */}
                                <Col sm={6}>
                                <Input className="input-password" type="password" placeholder="PIN" 
                                        // value={props.cartStore.state.valueInputBooking["approvalCode"]}
                                        name="approvalCode" id="approvalCode"
                                        onFocus={props.cartStore.setActiveInputRefund}
                                        onChange={props.cartStore.onChangeBooking}
                                    />
                                </Col>
                                <Col sm={3}>
                                <Button onClick={() => props.cartStore.addReservation(props.userNow, props.modalStore.toggleModal, "doOrder")} color="danger"><i className="fas fa-edit"></i> SIMPAN</Button>
                                </Col>
                                </Row>
                            </FormGroup>
                            </Form>
                            <Row className="product-nav no-gutters">
                                <Col xs="12">
                                    <FooterNavRightBooking cartStore={props.cartStore} rootStore={props.rootStore}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

            </Container>
        </Row>

    )
}

export default EditBooking;