import React, { Component } from 'react';
import { Subscribe } from 'unstated'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Modal.scss';

import RootContainer from '../../containers/RootContainer'
import ModalsContainer from '../../containers/ModalsContainer'
import CartsContainer from '../../containers/CartsContainer'

class Modals extends Component {

  constructor(props) {
    super(props);
  };

  clearCartCloseModal = (props) => {
    this.props.cartStore.clearCart()
    this.props.toggle()
  }

  renderSwitch(type) {
    // console.log(type)
    switch(type) {
      case 'reguler':
        return (
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          <ModalHeader toggle={this.props.toggle} className="text-center d-block"><h3>Modal Reguler</h3></ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <Button color="dark" size="lg" onClick={this.props.toggle}>Do Something</Button>{' '}
            <Button color="danger" size="lg" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      );
      case 'logout':
        return (
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          <ModalHeader toggle={this.props.toggle} className="text-center d-block mt-2"><h3>Modal Logout</h3></ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <a href="/logout" color="dark" className="btn btn-dark btn-lg"><i class="fas fa-sign-out-alt mr-1"></i> Log Out</a>
            <Button color="danger" size="lg" onClick={this.props.toggle}><i class="fas fa-times-circle mr-1"></i> Batalkan</Button>
          </ModalFooter>
        </Modal>
      );
      case 'logoutKasir':
        return (
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          <ModalHeader toggle={this.props.toggle} className="text-center d-block">Modal Logout Kasir</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <Button color="dark" onClick={this.props.toggle}>Do Something</Button>{' '}
            <Button color="danger" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      );
      case 'bayar':
        return (
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          <ModalBody className="p-5">
            <i className="fas fa-check font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Transaksi Berhasil!</h2>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-check mr-1"></i> Selesai</Button>
          </ModalBody>
        </Modal>
      );
      case 'clearCart':
        return (
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          <ModalBody className="p-5">
            <i className="fas fa-times font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Apakah Anda yakin ingin menghapus Cart?</h2>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-times mr-1"></i> Ya, Hapus!</Button>
          </ModalBody>
        </Modal>
      );
      default:
        return (
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          <ModalHeader toggle={this.props.toggle} className="text-center d-block">Modal Default</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <Button color="dark" size="lg" onClick={this.props.toggle}>Do Something</Button>{' '}
            <Button color="danger" size="lg" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      );
    }
  }

  render() {
    return (
      <Subscribe to={[RootContainer, ModalsContainer, CartsContainer]}>
      {(rootStore, modalStore, cartStore) => (
        <div>
          {this.renderSwitch(modalStore.state.modalType)}
        </div>
      )}
    </Subscribe>
    )
  }
}

export default Modals