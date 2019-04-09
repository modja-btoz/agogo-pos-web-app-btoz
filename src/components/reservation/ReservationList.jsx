import React from 'react'
import { Container, Row, Col, NavLink, Button, Input, Table } from 'reactstrap';

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
        <hr/>

        <Row className="SidebarBody">
        <Table>
          <tr>
            <td scope="row" className="transaction-name">TR#000001</td>
            <td className="text-left transaction-date">Tanggal Hari Ini</td>
          </tr>
        </Table>
        </Row>

      </Container>
    </Row>

  )
}

export default ReservationList