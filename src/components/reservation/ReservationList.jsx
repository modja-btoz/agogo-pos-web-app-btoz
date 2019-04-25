import React from 'react'
import { Container, Row, Col, NavLink, Button, Input, Table } from 'reactstrap';
<<<<<<< HEAD
import FooterNavRight from '../navigations/FooterNavRight';
=======
import ShadowScrollbars from '../scrollbars/ShadowScrollbars';

import ReservationHeader from './ReservationHeader';
import ReservationItems from './ReservationItems';
>>>>>>> c35b374eb8da81d155b9afba4014f5a1956ef1e8

const ReservationList = (props) => {
  
  return (
<<<<<<< HEAD

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

=======
<Container className="reservation mt-4 pt-5 pr-0 pl-0">
        <NavLink onClick={() => props.cartStore.toggleOpenReservationShow()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i>Transaksi Tertunda</NavLink>
            <Table borderless striped>
              <ReservationHeader transactionStore={props.transactionStore}/>
            </Table>
  
            <ShadowScrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              autoHeight
              autoHeightMin={600}
              autoHeightMax={0}
            >
              <div className="scroll-wrapper">
                <Table borderless striped className="mb-0">
                  <ReservationItems transactionStore={props.transactionStore} cartStore={props.cartStore}/>
                </Table>
              </div>
            </ShadowScrollbars>
        </Container>
>>>>>>> c35b374eb8da81d155b9afba4014f5a1956ef1e8
  )
}

export default ReservationList