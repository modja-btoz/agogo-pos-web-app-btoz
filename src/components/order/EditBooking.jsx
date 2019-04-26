import React from 'react'
import { Container, Row, Col, Input, Label, Button, NavLink, Form, FormGroup } from 'reactstrap'

const EditBooking = (props) => {
    return (

        <Row className="orderBooking d-block">
            <Container>
                <Row className="SidebarHeader">
                    <Col>
                        <NavLink onClick={() => props.cartStore.toggleEditBookingShow()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i> Pemesanan</NavLink>
                    </Col>
                </Row>

                <Row className="SidebarBody">
                    <Col sm={5}>
                        <h7 className="mb-0">PEMESAN</h7>
                        <Input className="input pemesan" placeholder="NAMA"></Input>
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
                                    <Input className="input-lg size-input" placeholder="Rp0"

                                        onChange={props.cartStore.setActiveInputBooking}
                                        name="input" id="input"
                                        autoFocus
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3} className="control-label">DISKON</Label>
                                <Col sm={7}>
                                    <Input className="input-lg" placeholder="0%"></Input>
                                </Col>
                                <Col sm={2}>
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
                                <Label sm={3} className="control-label">UANG MUKA<br/><i className="far fa-times-circle notif-close"></i><span className="notif"> Belum dibayar</span></Label>
                                <Col sm={9}>
                                    <Input className="input-lg" placeholder="Rp0"></Input>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={3} className="approval">APPROVAL</Label>
                                <Col sm={6}>
                                    <Input className="input-lg approval" ></Input>
                                </Col>
                                <Col sm={3}>
                                    <Button onClick={() => props.modalStore.toggleModal('bayar', '')} color="danger" className="input-lg"><i className="fas fa-edit"></i> SIMPAN</Button>
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