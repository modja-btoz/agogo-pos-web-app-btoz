import { Container } from 'unstated'
import axios from 'axios'

class ModalsContainer extends Container {

  state = {
    modal: false,
    modalType: 'reguler',
    modalSize: 'sm',
    modalWhere : '',
    modalMessage: '',
    transaction: ''
  };

  toggleModal = (type, size, where, message) => {
    this.setState({
      modalType: type,
      modalSize: size,
      modalWhere: where,
      modalMessage: message
    },
    () => {
      console.log("MODAL TYPE =>", this.state.modalType, this.state)
      this.setState({
        modal: !this.state.modal
      });
    })
  } 

  clearModal = () => {
    this.setState({modal: !this.state.modal})
    console.log("IEE")
  }

  getData(){
    axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/getTrx`)
    .then(res => this.setState({transaction: res.data}, () => console.log("AA")))
  }
  
}

export default ModalsContainer