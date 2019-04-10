import React, { Component } from 'react'
import { Table, NavLink, Container } from 'reactstrap';
import ShadowScrollbars from '../scrollbars/ShadowScrollbars';

import TransactionHeader from './TransactionHeader';
import TransactionItems from './TransactionItems';


class TransactionList extends Component {
  constructor(props){
    super(props)
  }

  state = {
    transaction: [],
    footerNvaBarHeight: 350,
    windowInnerHeight: 0,
    productItemsHeight: 0,
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
        <Container className="cart mt-4 pt-5 pr-0 pl-0">
        <NavLink onClick={() => this.props.cartStore.toggleOpenTransactionShow()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i>Transaksi Tertunda</NavLink>
            <Table borderless striped>
              <TransactionHeader transactionStore={this.props.transactionStore} />
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
                  <TransactionItems transactionStore={this.props.transactionStore} />
                </Table>
              </div>
            </ShadowScrollbars>
        </Container>
      );
    }
}
// const TransactionList = (props) => {
//   super(props);
//   this.state = {
//     rows: []
//   };

//   return (

//     <Row className="TransactionList d-block">
//       <Container>
//         <Row className="SidebarHeader">
//           <Col>
//             <NavLink onClick={() => props.cartStore.toggleOpenTransactionShow()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i> Transaksi Tertunda</NavLink>
//           </Col>
//         </Row>

//         <Row className="SidebarBody mt-4 mb-3">
//           <div>
//             <table>
//               <tbody>
//                 {this.state.rows.map(row => (
//                   <tr>
//                     <td>{row.content}</td>
//                   </tr>
//                 ))}
//                 <tr>
//                   <td className="" onClick={this.handleAddRow}>
//                     (+)
//                 </td>
//                   {Boolean(this.state.rows.length) && (
//                 <td onClick={this.handleRemoveRow}>(-)</td>
//                  )}
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </Row>

//       </Container>
//     </Row>

//   )
// }

export default TransactionList