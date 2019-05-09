import { Container } from 'unstated'

class ModalsContainer extends Container {

  state = {
    modal: false,
    modalType: 'reguler',
    modalSize: 'sm',
    modalWhere : '',
  };

  toggleModal = (type, size, where) => {
    this.setState({
      modalType: type,
      modalSize: size,
      modalWhere: where
    },
    () => {
      console.log("MODAL TYPE =>", this.state.modalType)
      this.setState({
        modal: !this.state.modal
      });
    })
  } 
  
}

export default ModalsContainer