import React, { Component } from 'react';
import ShadowScrollbars from '../scrollbars/ShadowScrollbars';
import { Container } from 'reactstrap';
import ProductItems from './ProductItems'

import "./Products.scss";


class Products extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.productStore.setProductItemsHeight()
  }

  componentDidMount() {
    this.props.productStore.setFilteredKeyword("Semua Item")
    this.props.productStore.fetchProducts()
  }

  render() {
    // console.log(this.state.products)
    // this.props.productStore.productsFiltered()

    return (
      <Container className="products pt-4 pl-0">

        <ShadowScrollbars
          // This will activate auto-height
          autoHeight
          autoHeightMin={100}
          autoHeightMax={this.props.productStore.state.productItemsHeight}
          isBlack
        >
          <ProductItems activePath={this.props.activePath} productStore={this.props.productStore} cartStore={this.props.cartStore}  />
        </ShadowScrollbars>

      </Container>
    );
  }
}

export default Products;
