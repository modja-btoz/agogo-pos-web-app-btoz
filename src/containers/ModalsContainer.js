import { Container } from 'unstated'

class ModalsContainer extends Container {

  state = {
    modal: false,
    modalType: 'reguler',
    modalSize: 'sm',
    modalWhere : '',
    modalMessage: ''
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
  
}

export default ModalsContainer