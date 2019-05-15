import React from 'react'
import { Container, Row, Col, Input, Label, Button, NavLink, Form, FormGroup } from 'reactstrap'
import NumberFormat from 'react-number-format';
import './EditBooking.scss'

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
                        <Input className="input-masking mb-4" type="text" name="bookingName" id="bookingName" placeholder="NAMA" bsSize="lg"
                                value={props.cartStore.state.valueInputBooking["bookingName"]}
                                name="bookingName" id="bookingName"
                                defaultValue={props.cartStore.state.dataTrx.nama}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />                    
                        </Col>
                    <Col sm={4}>
                        <h7 className="mb-0">TANGGAL SELESAI</h7>
                        <Input className="input-tgl" type="date" name="bookingDate" id="bookingDate" placeholder="DD-MM-YYYY"
                                value={props.cartStore.state.valueInputBooking["bookingDate"]}
                                name="bookingDate" id="bookingDate"
                                defaultValue={props.cartStore.state.dataTrx.tgl_selesai}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                        </Col>
                    <Col sm={3}>
                        <h7 className="mb-0">JAM SELESAI</h7>
                        <Input className="input-jam" type="time" name="bookingTime" id="bookingTime" placeholder="HH-MM"
                                value={props.cartStore.state.valueInputBooking["bookingTime"]}
                                name="bookingTime" id="bookingTime"
                                defaultValue={props.cartStore.state.dataTrx.waktu_selesai}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                        </Col>
                </Row>

                <Row className="Sidebar">
                    <Col sm={5}>
                    <Input className="input-alamat" type="textarea" name="bookingAddress" id="bookingAddress" placeholder="ALAMAT"
                                value={props.cartStore.state.valueInputBooking["bookingAddress"]}
                                name="bookingAddress" id="bookingAddress"
                                defaultValue={props.cartStore.state.dataTrx.alamat}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                    <Input className="input-telepon" type="text" name="bookingPhone" id="bookingPhone" placeholder="TELEPON"
                                value={props.cartStore.state.valueInputBooking["bookingPhone"]}
                                name="bookingPhone" id="bookingPhone"
                                defaultValue={props.cartStore.state.dataTrx.telepon}
                                onChange={props.cartStore.onChangeBooking}
                                onFocus={props.cartStore.setActiveInputBooking}
                                />
                        </Col>
                    <Col sm={7}>
                    <Input className="input-note" type="textarea" name="bookingNote" id="bookingNote" placeholder="CATATAN"
                                value={props.cartStore.state.valueInputBooking["bookingNote"]}
                                defaultValue={props.cartStore.state.dataTrx.catatan}
                                name="bookingNote" id="bookingNote"
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
                                {/* <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="Rp 0" 
                                    value={props.cartStore.state.valueInputEditBooking["biaya_tambahan"] || props.cartStore.state.dataTrx.add_fee || ""}
                                    name="biaya_tambahan" id="biaya_tambahan" onChange={props.cartStore.onChangeEditBooking}
                                    prefix={'Rp '} onFocus={props.cartStore.moveCaretAtEnd}
                                /> */}
                                <Input thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="mb-4 form-control-lg form-control" placeholder="Rp 0"  
                                    name="bookingAddition" id="bookingAddition" 
                                    value={props.cartStore.state.valueInputBooking["bookingAddition"]}  
                                    defaultValue={props.cartStore.state.dataTrx.add_fee}
                                    onChange={props.cartStore.onChangeBooking}                                  
                                    onFocus={props.cartStore.setActiveInputBooking} 
                                    />
                                </div>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3} className="control-label">DISKON</Label>
                                <Col sm={7}>
                                    {/* <div className={props.cartStore.state.activeInputEditBooking === 'discount' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                                    <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="Rp 0" 
                                        value={props.cartStore.state.valueInputEditBooking["discount"] || props.cartStore.state.dataTrx.discount}
                                        name="discount" id="discount" onChangeAll={props.cartStore.onChangeEditBooking.bind(this)}
                                        prefix={'Rp '} onFocus={props.cartStore.moveCaretAtEnd}
                                    />
                                    <Input className="input-masking mb-4" type="text" placeholder=" ..." bsSize="lg" 
                                        value={props.cartStore.state.valueInputEditBooking["discount"] || props.cartStore.state.dataTrx.discount}
                                        name="discount" id="discount" onChangeAll={props.cartStore.onChangeEditBooking.bind(this)}
                                        onFocus={props.cartStore.setActiveInputEditBooking} 
                                    />
                                    </div> */}
                                    {props.cartStore.state.discountType === 'Rp' &&
                                    <div className={props.cartStore.state.activeInputBooking === 'paymentDiscount' ? 'input-data-wrapper active-input' : 'input-data-wrapper'}>
                                    <Input type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="Rp 0" 
                                    value={props.cartStore.state.valueInputBooking["paymentDiscount"]}
                                    name="paymentDiscount" id="paymentDiscount" 
                                    defaultValue={props.cartStore.state.dataTrx.discount}
                                    onChange={props.cartStore.onChangeBooking}
                                    onFocus={props.cartStore.setActiveInputBooking}
                                    prefix={'Rp '}/>
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
                                    defaultValue={props.cartStore.state.dataTrx.discount}
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
                                <Label sm={3} className="control-label">UANG MUKA<br/><i className="far fa-times-circle notif-close"></i><span className="notif"> Belum dibayar</span></Label>
                                <Col sm={9}>
                                <div className={props.cartStore.state.activeInputBooking === 'bookingPayment' ? 'input-data-wrapper active-input' : 'input-data-wrapper'}>
                                {/* <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="Rp 0" 
                                    value={props.cartStore.state.dataTrx.uang_muka}
                                    name="uang_muka" id="uang_muka"
                                    prefix={'Rp '} onFocus={props.cartStore.moveCaretAtEnd}
                                /> */}
                                <Input thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="mb-4 form-control-lg form-control" placeholder="Rp 0"  
                                        name="bookingPayment" id="bookingPayment"
                                        value={props.cartStore.state.valueInputBooking["bookingPayment"]}
                                        defaultValue={props.cartStore.state.dataTrx.uang_muka}
                                        onChange={props.cartStore.onChangeBooking}
                                        onFocus={props.cartStore.setActiveInputBooking}  
                                        />
                                </div>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3} className="approval">APPROVAL</Label>
                                <Col sm={6}>
                                    <Input type="password" className="input-lg approval" ></Input>
                                </Col>
                                <Col sm={3}>
                                    <Button onClick={() => props.modalStore.toggleModal('bayar', '') || props.cartStore.editReservation(props.userNow, props.cartStore.state.dataTrx, props.cartStore.state.dataTrx.id)} color="danger" className="input-lg"><i className="fas fa-edit"></i> SIMPAN</Button>
                                </Col>
                            </FormGroup>
                        </Form>

                    </Col>

                </Row>

            </Container>
        </Row>

    )
}

export default EditBooking;