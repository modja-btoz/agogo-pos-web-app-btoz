import React, { Component } from 'react'
import { Container, Row, Col, NavLink, Button, Input, Table } from 'reactstrap';

import ShadowScrollbars from '../scrollbars/ShadowScrollbars';

import ReservationHeader from './ReservationHeader';
import ReservationItems from './ReservationItems';
import FooterNavRight from '../navigations/FooterNavRight';

class ReservationList extends Component {
  constructor(props){
    super(props)
  }
    state = {
    transactionStore: [],
    footerNvaBarHeight: 350,
    windowInnerHeight: 0,
    productItemsHeight: 0,
  }

  componentDidMount(){
    this.props.cartStore.fetchReservation()
  }


  componentWillMount(){
    this.setState({
      windowInnerHeight: window.innerHeight
    },
      () => {
        this.setState({
          productItemsHeight: this.state.windowInnerHeight - this.state.footerNvaBarHeight
        })
      }
    );
  }

  render(){
  return (
<Container className="reservation">
        <NavLink onClick={() => this.props.cartStore.toggleOpenReservationShow()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i>Pemesanan</NavLink>
            <Table borderless striped>
              <ReservationHeader transactionStore={this.props.transactionStore}/>
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
                  <ReservationItems transactionStore={this.props.transactionStore} cartStore={this.props.cartStore}/>
                </Table>
              </div>
            </ShadowScrollbars>

            <Row className="product-nav no-gutters">
              <Col xs="12">
                <FooterNavRight modalStore={this.props.modalStore} cartStore={this.props.cartStore}/>
              </Col>
            </Row>
        </Container>
  )
}
}

export default ReservationList