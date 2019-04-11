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
    axios.get(`http://dev.wakwaw.com/agogo/wp-json/wp/v2/users`)
    .then(res => {
      const transaction = res.data;
      this.setState({ transactionStore: transaction });
      // sessionStorage.setItem('transaction', JSON.stringify(transaction));
    })
  }
}

export default TransactionContainer