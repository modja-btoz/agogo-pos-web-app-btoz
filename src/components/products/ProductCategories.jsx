import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Input } from 'reactstrap';
import axios from 'axios'

import './ProductCategories.scss';

var classNames = require('classnames');


class ProductCategories extends Component {

  state = {
    searchInputText: '',
    categories: [
      {
        'id': 0,
        'name' : 'Semua Item'
      }
    ]
  }

  componentDidMount(){
    this.fetchCategories()
  }

  fetchCategories() {
    axios.get(`http://101.255.125.227:82/api/categories`)
    .then(res => {
      const categories = res.data;
      categories.map(x => 
      this.setState({ categories: [...this.state.categories, x] })
      )
      // sessionStorage.setItem('transaction', JSON.stringify(transaction));
      console.log("TIS", this.state.categories)
    })
  }

  buttonSetFilteredKeyword(keyword, index){
    this.resetSearchKeyword()
    
    this.props.productStore.setFilteredKeyword(keyword)
    let activeCatClass = "cat-"+index
    this.props.productStore.setState({
      activeCatClass: activeCatClass
    },()=>{
      console.log("activeCatClass => ", this.props.productStore.state.activeCatClass)
    })
  }

  buttonSetSearchKeyword(keyword){
    this.props.productStore.setSearchKeyword(keyword)
  }

  handleChange = (e) => {
    this.props.productStore.setState({
      searchKeyword: e.target.value
    }, () => {
      this.buttonSetSearchKeyword(this.props.productStore.state.searchKeyword)
    })
  }

  resetSearchKeyword(){
    this.props.productStore.setState({
      searchKeyword: ''
    })
  }

  render() {
    // console.log(this.state.categories)
    return (
      <Nav className="product-categories pt-4 pb-4">
        <NavItem>
          <Input type="search" name="search" id="productSearch" placeholder="Cari produk..." 
            value={this.props.productStore.state.searchKeyword}
            onChange={this.handleChange}
            ref={el => this.inputTitle = el}
          />
        </NavItem>
        { this.state.categories.map((cat, index) => 
          <NavItem key={cat.name}>
            <NavLink href="#" 
              onClick={() => this.buttonSetFilteredKeyword(cat.name, index)}
              className={classNames({'active': this.props.productStore.state.activeCatClass === ("cat-"+index)})}
            >
              {cat.name}
            </NavLink>
          </NavItem>
        )}
      </Nav>
      
    );
  }
}

export default ProductCategories;
