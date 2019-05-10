import { Container } from 'unstated';
import axios from 'axios'

const initialState = {
  transactionStore: [],
  reservationStore: [],
  items: [],
  data: [],
  isKasir: false,
  isStok: false,
  isAdmin: false,
  redirect: false,
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
      this.setState({ transactionStore: transaction});
      // sessionStorage.setItem('transaction', JSON.stringify(transaction));
    })
  }

  fetchReservation() {
    axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/preorders`)
    .then(res => {
      const transaction = res.data;
      this.setState({ reservationStore: transaction });
      // sessionStorage.setItem('transaction', JSON.stringify(transaction));
    })
  }

addTransaction(user_id, items, total) {
  items.forEach((x) => 
  this.state.data.push({
        user_id: user_id,
        product_id: x.id,
        qty: x.qty,
        price: x.price,
        subtotal: total,
        diskon: "",
        total: total,
        dibayar: "",
        kembali: "",
        status: "UNPAID",
      })
  )
  axios.post(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/orders`, this.state.data)
  .then(res => {
    console.log("A",res)
  })
this.setState({data: []})
}

}

export default TransactionContainer