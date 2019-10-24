import { Container } from 'unstated'
import axios from 'axios'

class ModalsContainer extends Container {
  constructor() {
  super();
  this.toggleModal = this.toggleModal.bind(this);
  this.state = {
    modal: false,
    modalType: 'reguler',
    modalSize: 'sm',
    modalWhere : '',
    modalMessage: '',
    transaction: '',
  };
  this.toggleModal = this.toggleModal.bind(this);
}

  toggleModal = (type, size, where, message) => {
    this.setState({
      modalType: type,
      modalSize: size,
      modalWhere: where,
      modalMessage: message
    },
    () => {
      console.log("MODAL TYPE =>", this.state.modalType, this.state)
      setTimeout(this.setState({
        modal: !this.state.modal
      }), 1000)
      
    })
  } 

  clearModal = () => {
    this.setState({modal: !this.state.modal})
    console.log("IEE")
  }

  getData(){
    axios.get(`http://10.254.128.66:82/api/getTrx`)
    .then(res => this.setState({transaction: res.data}, () => console.log("AA")))
  }
  
}

export default ModalsContainer