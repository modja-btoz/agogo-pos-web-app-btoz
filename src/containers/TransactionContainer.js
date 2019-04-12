import { Container } from 'unstated';
import axios from 'axios'

const initialState = {
  transactionStore: []
};

class TransactionContainer extends Container {

  constructor(props) {
    super(props)
    this.state = initialState;
  }


  fetchTransaction() {
    axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/users`)
    .then(res => {
      const transaction = res.data;
      this.setState({ transactionStore: transaction });
      // sessionStorage.setItem('transaction', JSON.stringify(transaction));
    })
  }
}

export default TransactionContainer