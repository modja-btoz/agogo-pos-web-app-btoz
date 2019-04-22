import { Container } from 'unstated'
import axios from 'axios'

class ProductsContainer extends Container {

  state = {
    products: [],
    productsFiltered: [],
    filterKeyword: "Semua Item",
    searchKeyword: '',
    footerNvaBarHeight: 114,
    windowInnerHeight: 0,
    productItemsHeight: 0,
    activeCatClass: 'cat-0'
  }

  fetchProducts() {
    // axios.get(`http://gigit.store/wp-json/wp/v2/product?_embed`)
    axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/products`)
    .then(res => {
      const products = res.data;
      this.setState({ 
        products: products,
      }, 
        () => {
          this.productsFiltered()

          sessionStorage.setItem('products', JSON.stringify(products));
          console.log(products)
        }
      );
    })
  }

  // CARI PRODUK
  productsSearch() {
    let products = this.state.products
    let searchKeyword = this.state.searchKeyword

    let productsSearch =  products.filter(function(product) {
      // return product.title.rendered === searchKeyword;
      return product.title.rendered.toString().toLowerCase().search(searchKeyword.toLowerCase()) !== -1;
    });

    this.setState({ 
      productsFiltered: productsSearch,
      activeCatClass: ''
    },()=>{
      console.log("searchKeyword => ", searchKeyword)
      console.log("productsFiltered => ", productsSearch)
    })
    
  }

  setSearchKeyword(keyword) {
    console.log("CATEGORY => ", keyword)
    this.setState({ 
      searchKeyword: keyword
    }, 
      () => {
        this.productsSearch()
      }
    )
  }

  // FILTER KATEGORI
  productsFiltered(){
    let products = this.state.products
    let filterKeyword = this.state.filterKeyword

    let productsFiltered =  products.filter(function(product) {
      return product.category_id[0] === filterKeyword;
    });

    if(filterKeyword === "Semua Item"){
      this.setState({ 
        productsFiltered: products
      })
    }else{
      this.setState({ 
        productsFiltered: productsFiltered
      })
    }
  }

  setFilteredKeyword(keyword) {
    console.log("CATEGORY => ", keyword)
    this.setState({ 
      filterKeyword: keyword
    }, 
      () => {
        this.productsFiltered()
      }
    )
  }

  setProductItemsHeight(){
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

}

export default ProductsContainer;
