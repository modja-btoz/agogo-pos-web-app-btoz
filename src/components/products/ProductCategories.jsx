import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Input } from 'reactstrap';

import './ProductCategories.scss';

var classNames = require('classnames');


class ProductCategories extends Component {

  state = {
    searchInputText: '',
    categories: [
      {
        "id": 0,
        "title": "Semua Item",
      },
      {
        "id": 1,
        "title": "Roti"
      },
      {
        "id": 2,
        "title": "Cake"
      },
      {
        "id": 3,
        "title": "Kue Basah"
      },
      {
        "id": 4,
        "title": "Brownies"
      },
      {
        "id": 5,
        "title": "Cake Slices"
      },
      {
        "id": 6,
        "title": "Black Forrest"
      },
      {
        "id": 7,
        "title": "Sponge"
      }
    ]
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
          <NavItem key={cat.title}>
            <NavLink href="#" 
              onClick={() => this.buttonSetFilteredKeyword(cat.title, index)}
              className={classNames({'active': this.props.productStore.state.activeCatClass === ("cat-"+index)})}
            >
              {cat.title}
            </NavLink>
          </NavItem>
        )}
      </Nav>
    );
  }
}

export default ProductCategories;
