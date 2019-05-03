import React, { Component } from 'react';
import { Subscribe } from 'unstated'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Input, Row } from 'reactstrap';
import './Modal.scss';
import CalcNumeric from '../calcs/CalcNumericRefund';

import RootContainer from '../../containers/RootContainer'
import ModalsContainer from '../../containers/ModalsContainer'
import CartsContainer from '../../containers/CartsContainer'

class Modals extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //defauilt value of the date time
      date: '',
      days: [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Saturday"
    ]
    // console.log(days[new Date().getDay()]);
    };
  };

  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    // var hours = new Date().getHours(); //Current Hours
    // var min = new Date().getMinutes(); //Current Minutes
    // var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year,
    });
  }

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
      case 'saveTransaction':
        return (
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          <ModalBody className="p-5">
            <i className="fas fa-times font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Transaksi Berhasil Disimpan!</h2>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-times mr-1"></i> OK</Button>
          </ModalBody>
        </Modal>
      );
      case 'production':
        return (
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size="lg" centered style={{width: '1100px'}}>
          <ModalBody className="p-5" style={{width: "1150px"}}>
            <Row>
              <div className="date"><span className="date-update">{this.state.days[new Date().getDay()] + ", " + this.state.date}</span></div>
            </Row>
            <Row>
            <div className="date">{this.props.cartStore.state.selectedProduct.name}</div>
            </Row>
            <Row className="SidebarBody" >

              {/* LEFT */}
              
              <Col xs='3.5'>
                <div className="view-img" centered>
                    <img className="img-view" src={this.props.cartStore.state.selectedProduct.photo}></img>
                </div>
                </Col>
                <Col xs='3'>
                
                {/* <Input className="mb-4" type="text" name="paymentDiscount" id="paymentDiscount" placeholder=" ..." bsSize="lg" /> */}
                <div className={this.props.cartStore.state.activeInputRefund === 'refundCode' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                  <Input className="input-masking mb-4" type="text" placeholder="Jumlah Produksi" bsSize="lg" 
                    value={this.props.cartStore.state.valueInputRefund["refundCode"] || "" ? this.props.cartStore.state.valueInputRefund["refundCode"] || "" : ""}
                    name="refundCode" id="refundCode"
                    onFocus={this.props.cartStore.setActiveInputRefund}
                    autoFocus
                  />
                </div>

                {/* <Input className="mb-4" type="text" name="paymentDiscount" id="paymentDiscount" placeholder=" ..." bsSize="lg" /> */}
                <div className={this.props.cartStore.state.activeInputApproval === 'approvalCode' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                  <Input className="input-masking mb-4" type="text" placeholder="Approval" bsSize="lg" 
                    value={this.props.cartStore.state.valueInputRefund["approvalCode"] || ""}
                    name="approvalCode" id="approvalCode" type="password"
                    onFocus={this.props.cartStore.setActiveInputRefund}
                  />
                </div>

                <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-times mr-1"></i> OK</Button>

                </Col>

                <Col xs='3'>
                <CalcNumeric
                  cartStore={this.props.cartStore} 
                  onEnterRefund={this.props.cartStore.onEnterRefund} 
                  // inputName={this.props.cartStore.state.inputName}
                />
                </Col>
  
              {/* RIGHT */}
                     
              </Row>
          </ModalBody>
        </Modal>
      );
      default:
        return (
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          <ModalHeader toggle={this.props.toggle} className="text-center d-block">Shutdown</ModalHeader>
          <ModalBody>
            Apakah Anda yakin ingin mematikan mesin ? 
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <Button color="dark" size="lg" onClick={this.props.toggle}>Ya</Button>{' '}
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