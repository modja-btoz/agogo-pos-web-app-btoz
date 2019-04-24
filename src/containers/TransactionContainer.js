import { Container } from 'unstated';
import axios from 'axios'

const initialState = {
  transactionStore: [],
  selectItems: {},
  items: [],
};

class TransactionContainer extends Container {

  constructor(props) {
    super(props)
    this.state = initialState;
  }

  clearCart = () => {
    console.log("CLEAR CART")
    this.setState(initialState);
  }

  fetchTransaction() {
    axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/orders`)
    .then(res => {
      const transaction = res.data;
      this.setState({ transactionStore: transaction });
      // sessionStorage.setItem('transaction', JSON.stringify(transaction));
    })
  }

  fetchReservation() {
    axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/preorders`)
    .then(res => {
      const transaction = res.data;
      this.setState({ transactionStore: transaction });
      // sessionStorage.setItem('transaction', JSON.stringify(transaction));
    })
  }

  addTransaction(user_id, items, total) {
    this.setState(
      {
        selectItems: {
          user_id: user_id,
          product_id: items.map((a => a.id)),
          qty: items.map((a => a.qty)),
          price: items.map((a => a.price)),
          subtotal: total,
          diskon: "",
          total: "",
          dibayar: "",
          kembali: "",
          status: "UNPAID"
        }
      },
      () => {
        this.onAddTrx(this.state.selectItems);
        this.clearCart();
        console.log(items);
        console.log(this.state.selectItems);
      }
    );
  }

  onAddTrx = this.onAddTrx.bind(this);
  onAddTrx(selectedProduct) {

    let product_id = selectedProduct.pruduct_id
    let user_id = selectedProduct.user_id
    let qty = selectedProduct.qty
    let index = this.state.items.findIndex( x => x.id === product_id);

    if (index === -1 || product_id === index){
      // console.log("ADD NEW")
      this.setState({
        items: [...this.state.items, selectedProduct]
      },
        () => {
          this.setState({
            selectedProduct: {}
          }
            
          );
        }
      );
    }else{
      console.log("wew", this.state.selectItems)
      console.log("uwew",this.state.items)
      // this.onUpdateItem(product_id, Number(currentQty) + 1)
    }
    
  }

  
  // addTransaction(a, b, c){
  //   let items = this.state.items
  //   let id = b.map((a => a.id))
  //   let index = this.state.items.findIndex( x => x.id === id);


  //   b.map((i, x) =>
  //   this.setState(
  //     {
  //     selectItems: {
  //     idx: x,
  //     user_id: a,
  //     product_id: i.id,
  //     qty: i.qty,
  //     price: i.price,
  //     subtotal: c,
  //     diskon: "",
  //     total: "",
  //     dibayar: "",
  //     kembali: "",
  //     status: "UNPAID"
  //     }
  //   }),
  //   () => this.setState({items: [...items, this.state.selectItems]})
  //   );
  //   console.log("ITEMS", this.state.items);
  //   console.log("SELECT", this.state.selectItems);
  // }

  // toggleBayar = (type, size) => {
  //   this.setState({
  //     modalType: type,
  //     modalSize: size
  //   },
  //   () => {
  //     console.log("MODAL TYPE =>", this.state.modalType)
  //     this.setState({
  //       modal: !this.state.modal
  //     });
  //   })
  // } 


}

export default TransactionContainer