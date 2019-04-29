import React from 'react'
import { Container, Row, Col, NavLink, Button, Input, Table } from 'reactstrap';
import ShadowScrollbars from '../scrollbars/ShadowScrollbars';

import OrderHeader from './OrderHeader';
import OrderItems from './OrderItems';

const OrderBookingTake = (props) => {
  
  return (
<Container className="reservation">
        <NavLink onClick={() => props.cartStore.toggleOrderBookingTakeShow()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i>Transaksi Tertunda</NavLink>
            <Table borderless striped>
              <OrderHeader cartStore={props.cartStore}/>
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
                  <OrderItems transactionStore={props.transactionStore} cartStore={props.cartStore}/>
                </Table>
              </div>
            </ShadowScrollbars>
        </Container>
  )
}

export default OrderBookingTake