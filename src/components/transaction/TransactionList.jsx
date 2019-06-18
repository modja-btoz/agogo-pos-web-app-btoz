import React, { Component } from 'react'
import { Table, NavLink, Container, Row, Col } from 'reactstrap';
import ShadowScrollbars from '../scrollbars/ShadowScrollbars';

import TransactionHeader from './TransactionHeader';
import TransactionItems from './TransactionItems';
import FooterNavRight from '../navigations/FooterNavRight';


class TransactionList extends Component {
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
    this.props.cartStore.fetchTransaction()
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


    render() {
      return (
        <Container className="transaction d-block">
        <NavLink onClick={() => this.props.cartStore.toggleOpenTransactionShow()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i>Transaksi Tertunda</NavLink>
            <Table borderless striped>
              <TransactionHeader transactionStore={this.props.transactionStore}/>
            </Table>
  
            <ShadowScrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              autoHeight
              autoHeightMin={600}
              autoHeightMax={this.state.productItemsHeight}
            >
              <div className="scroll-wrapper">
                <Table borderless striped className="mb-0">
                  <TransactionItems transactionStore={this.props.transactionStore} cartStore={this.props.cartStore}/>
                </Table>
              </div>
            </ShadowScrollbars>

            <Row className="product-nav no-gutters">
              <Col xs="12">
                <FooterNavRight cartStore={this.props.cartStore} rootStore={this.props.rootStore}/>
              </Col>
            </Row>
        </Container>
      );
    }
}

export default TransactionList