import React, { Component } from 'react'
import { Container } from 'reactstrap';
import TransactionItems from './TransactionItems'

class TransactionItem extends Component {

  constructor(props){
    super(props)
  }

  render() {
    // console.log(this.state.products)
    // this.props.productStore.productsFiltered()

    return (
      <Container className="transaction pt-4 pl-0">

          <TransactionItems transactionStore={this.props.transactionStore} cartStore={this.props.cartStore}/>
          {/* id={"id"+this.props.id}
          date={"id"+this.props.date}  */}
          
      </Container>
    );
  }
}

// const TransactionItem = (props) => {

//   return (
//       {/* idx, id, name, qty, price */}
//       <a href="#" onClick={() => props.transactionStore.deleteSelectedTransaction(props.trxID, props.trxDate, props.trxStatus)}>
//       </a>
  // )
  // return ( 
  //   <tr>
  //     <td className="transaction-name" scope="row">{props.trxID}</td>
  //     <td className="transaction-delete text-right">{props.trxDate}</td>
  //   </tr>
  // )
  
// }

//cartTransaction
export default TransactionItem