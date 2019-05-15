import React from 'react'
import { Container, Row, Col, NavLink, Button, Input, Table } from 'reactstrap';

import ShadowScrollbars from '../scrollbars/ShadowScrollbars';

import ReservationHeader from './ReservationHeader';
import ReservationItems from './ReservationItems';
import FooterNavRight from '../navigations/FooterNavRight';

const ReservationList = (props) => {
  
  return (
<Container className="reservation">
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

            <Row className="product-nav no-gutters">
              <Col xs="12">
                <FooterNavRight modalStore={props.modalStore} cartStore={props.cartStore}/>
              </Col>
            </Row>
        </Container>
  )
}

export default ReservationList