import React from 'react'
import { Container, Row, Col, Input, Label, Button, NavLink, Form, FormGroup } from 'reactstrap'

const TakeBooking = (props) => {
    return (

        <Row className="deleteBooking d-block">
            <Container>
                <Row className="SidebarHeader">
                    <Col>
                        <NavLink onClick={() => props.cartStore.toggleBookingTakeShow() || props.cartStore.clearCart()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i> Pemesanan</NavLink>
                    </Col>
                </Row>

                <Row className="SidebarBodyBooking">
                    <Col sm={5}>
                        <h7 className="mb-0">PEMESAN</h7>
                        <Input style={{ color: "white" }} value={props.cartStore.state.dataReservation.nama} className="input pemesan" placeholder="NAMA"></Input>
                    </Col>
                    <Col sm={4}>
                        <h7 className="mb-0">TANGGAL SELESAI</h7>
                        <Input style={{ color: "white" }} value={props.cartStore.state.dataReservation.tgl_selesai} className="input tgl" placeholder="DD-MM-YYYY"></Input>
                    </Col>
                    <Col sm={3}>
                        <h7 className="mb-0">JAM SELESAI</h7>
                        <Input style={{ color: "white" }} value="JamSelesai" className="input jam" placeholder="HH-MM"></Input>
                    </Col>
                </Row>

                <Row className="SidebarBottom">
                    <Col>
                        <Form>
                            <FormGroup row>
                                <Col sm={3}>
                                    <Label>
                                        <h7 className="mb-0">CATATAN</h7>
                                    </Label>
                                </Col>
                                <Col sm={9}>
                                    <Input value={props.cartStore.state.dataReservation.catatan} bsSize="lg" type="textarea" name="note" rows="3" ></Input>
                                </Col>
                            </FormGroup>
                            {/* <FormGroup row>
                                <Col sm={3}>
                                    <Label>
                                        <h7 className="mb-0">UANG MUKA</h7><br />
                                        <i className="far fa-times-circle notif-close"></i><span className="notif"> Belum dibayar</span>
                                    </Label>
                                </Col>
                                <Col sm={9}>
                                    <Input bsSize="lg" type="text" name="uang-muka"></Input>
                                </Col>
                            </FormGroup> */}
                            <FormGroup row>
                                <Col sm={3}>
                                    <Label>
                                        <h7 className="mb-0">APPROVAL</h7>
                                    </Label>
                                </Col>
                                <Col sm={9}>
                                    <Input bsSize="lg" type="password" name="approval" className="approval"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col className="btn btn-deleted">
                                    <Button onClick={() => props.modalStore.toggleModal('bayar', '') || props.cartStore.takeReservation(props.cartStore.state.dataReservation.id)} size="lg" name="btn-del" className="btn-del"><i class="fas fa-check check"></i>AMBIL</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Row>

    )
}

export default TakeBooking;