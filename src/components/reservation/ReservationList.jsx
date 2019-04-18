import React from 'react'
import { Container, Row, Col, NavLink, Button, Input, Table } from 'reactstrap';
import FooterNavRight from '../navigations/FooterNavRight';

const ReservationList = (props) => {
  
  return (

    <Row className="ReservationList d-block">
      <Container>
        <Row className="SidebarHeader">
          <Col>
            <NavLink onClick={() => props.cartStore.toggleOpenReservationShow()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i>Pemesanan</NavLink>
          </Col>
        </Row>

        <Row className="SidebarBody mt-4 mb-3">
          <Col>
            <h7 className="mb-0">Transaksi</h7>
          </Col>
          <Col>
            <h7 className="mb-0">Tanggal</h7>
          </Col>
        </Row>

        <Row className="SidebarBody list-item">
        <Col>
          <tr>
            <td scope="row" className="transaction-name">TR#000001</td>
          </tr>
        </Col>
        <Col>
          <tr>
            <td className="text-left transaction-date">Tanggal Hari Ini</td>
          </tr>
        </Col>
        </Row>
        <hr/>

      <Row className="product-nav no-gutters">
        <Col xs="12">
          <FooterNavRight cartStore={props.cartStore} />
        </Col>
      </Row>
      </Container>
    </Row>

  )
}

export default ReservationList