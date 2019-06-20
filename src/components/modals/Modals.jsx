import React, { Component } from 'react';
import axios from 'axios'
import { Subscribe } from 'unstated'
import { Button, ModalHeader, ModalBody, ModalFooter, Col, Input, Row, Label } from 'reactstrap';
import { Redirect, Route } from 'react-router-dom'
import './Modal.scss';
import CalcNumeric from '../calcs/CalcNumericRefund';
import Modal from 'react-modal'

import RootContainer from '../../containers/RootContainer'
import ModalsContainer from '../../containers/ModalsContainer'
import CartsContainer from '../../containers/CartsContainer'
import TransactionContainer from '../../containers/TransactionContainer'
import { get } from 'http';
const root = document.getElementById("modal");
const customStyles = {
  content: {
    boxShadow: "7px 7px 33px 0px rgba(0, 0, 0, 0.85)",
    textAlign: "center",
    position: "fixed",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "2rem",
    border: "none",
    
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: "1000000",
    transition: "all 0.3s"
}
}

// Modal.setAppElement("#modal");
// Modal.setAppElement("#root");

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
    ],
    userLoggedIn :[],
    name: '',
    transaction: {}
    // console.log(days[new Date().getDay()]);
    };
    this.root = React.createRef();
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

  // componentWillUpdate() {
  //   axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/getTrx`)
  //   .then(res => this.setState({transaction: res.data}, () => console.log("AA")))
  // }

  componentWillUnmount(){
    this.props.cartStore.clearCart()
  }

  clearCartCloseModal = (props) => {
    this.props.cartStore.clearCart() 
    this.props.toggle()
  }

  clearToggle = () => {
    this.props.toggle()
    console.log("ABC")
    this.props.cartStore.resetProduct()
  }

  hideModalTransaction = (props) => {
    this.props.transactionStore.clearCart() 
    this.props.toggle()
  }


  renderSwitch(type) {
    // console.log(type)
    const externalCloseBtn = <button className="close" style={{ zIndex:'20', position: 'absolute', top: '20px', right: '20px' }} onClick={this.props.toggle}>&times;</button>;
    switch(type) {
      case 'reguler':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalHeader toggle={this.props.toggle} className="text-center d-block"><h3>Modal Reguler</h3></ModalHeader>
          <ModalBody>
            {this.props.message}
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <Button color="dark" size="lg" onClick={this.props.toggle}>Do Something</Button>{' '}
            <Button color="danger" size="lg" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        )}
        </div>
      );
      case 'simpanKasir':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
        {externalCloseBtn}
        <ModalHeader toggle={this.props.toggle} className="text-center d-block"><h3>Modal Reguler</h3></ModalHeader>
          <ModalBody>
            {this.props.message}
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <Button color="dark" size="lg" onClick={this.hideModalTransaction}>Do Something</Button>{' '}
            <Button color="danger" size="lg" onClick={this.hideModalTransaction}>Cancel</Button>
          </ModalFooter>
        </Modal>
        )}
        </div>
      );
      case 'alert':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalHeader toggle={this.props.toggle} className="text-center d-block mt-2"><h3>ALERT !</h3></ModalHeader>
          <ModalBody>
            {this.props.message || "Input tidak sesuai"}
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <Button color="danger" size="lg" onClick={this.props.toggle}><i class="fas fa-times-circle mr-1"></i> Close</Button>
          </ModalFooter>
        </Modal>
        )}
        </div>
      );
      case 'logout':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalHeader toggle={this.props.toggle} className="text-center d-block mt-2"><h3>Modal Logout</h3></ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <a href="/logout" color="dark" className="btn btn-dark btn-lg"><i class="fas fa-sign-out-alt mr-1"></i> Log Out</a>
            <Button color="danger" size="lg" onClick={this.props.toggle}><i class="fas fa-times-circle mr-1"></i> Batalkan</Button>
          </ModalFooter>
        </Modal>
        )}
        </div>
      );
      case 'logoutKasir':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} className={this.props.className}toggle={this.props.toggle} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody style={{margin: "10px"}}>
            <Row>
            <Col style={{margin: "auto"}} centered>
            <a href="/logout">
            <div className="my-icon">
              <i className="fas fa-sign-out-alt mr-1 fa-7x"></i>
              <Label className="label">Logout</Label>
            </div>
            </a>
            </Col>
            <Col style={{margin: "auto"}} centered>
            <a href="#" onClick={() => this.props.modalStore.clearModal() || this.props.toggleModal('hitungKas', 'lg') || this.props.modalStore.getData()}>
            <div className="my-icon">
              <i className="fas fa-coins mr-1 fa-7x"></i>
              <Label className="label">Hitung Kas</Label>
            </div>
            </a>
            </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <Button color="danger" style={{paddingLeft: "50px", paddingRight: "50px"}} onClick={this.props.toggle}><i class="fas fa-times-circle mr-1"></i>Batal</Button>
          </ModalFooter>
        </Modal>
        )}
        </div>
      );
      case 'hitungKas':
        const user = sessionStorage.getItem('usernow')
        const data = JSON.parse(user)
        console.log("AWODKOPWAKDPO",this.props.cartStore.state)
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
        {externalCloseBtn}
        <ModalHeader className="text-center d-block">
            {data.username.toUpperCase() || "nama user"}
          </ModalHeader>
        <ModalBody>
        <Row>
          <Col xs="8">
          <div style={{textAlign: "left", paddingLeft: "30px"}}>
            <h5>
            <Label>Saldo Awal : {this.props.modalStore.state.transaction.saldo_awal}</Label>< br/>
            <Label>Transaksi : {this.props.modalStore.state.transaction.total_transaksi}</Label>
            <hr style={{width: 'auto'}} />
            <Label>Saldo Akhir : {parseInt(this.props.modalStore.state.transaction.total_transaksi) + parseInt(this.props.modalStore.state.transaction.saldo_awal)}</Label></h5>
          </div>

          <h3>USER</h3>
            <div className={this.props.cartStore.state.activeInputRefund === 'approvalUser' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
              <Input className="input-masking mb-4" type="text" placeholder=" ..." bsSize="lg" style={{textAlign: "center", border: "2px solid black"}}
                name="approvalUser" id="approvalUser"
                onFocus={this.props.cartStore.setActiveInputRefund}
                onChange={this.props.cartStore.onChangeBooking}
                autoComplete="off"
              />
            </div>
          <h3>Approval</h3>
          <div className={this.props.cartStore.state.activeInputApproval === 'approvalCode' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
              <Input className="input-masking mb-4" type="text" placeholder="PIN" bsSize="lg" style={{textAlign: "center", border: "2px solid black"}}
                value={this.props.cartStore.state.valueInputRefund["approvalCode"] || ""}
                name="approvalCode" id="approvalCode" type="password" 
                onFocus={this.props.cartStore.setActiveInputRefund}
              />
          </div>
          <Button color="secondary" size="lg" onClick={this.props.toggle}><i class="fas fa-times-circle mr-1"></i> Batalkan</Button>
          <a href="#" onClick={() => this.props.cartStore.doPostKas(this.props.modalStore.state.transaction, data, this.props.modalStore)} color="danger" className="btn btn-danger btn-lg"><i class="fas fa-check mr-1"></i> Sign Out</a>
          </Col>
          <Col xs="4">
          <CalcNumeric
                  cartStore={this.props.cartStore} 
                  onEnterRefund={this.props.cartStore.onEnterRefund} 
                  // inputName={this.props.cartStore.state.inputName}
                />
          </Col>
        </Row>
        </ModalBody>


          {/* <ModalBody className="p-5">
            <i className="fas fa-check font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Transaksi Berhasil!</h2>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-check mr-1"></i> Selesai</Button>
          </ModalBody> */}
        </Modal>
        )}
        </div>
      );
      case 'bayar':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody className="p-5">
            <i className="fas fa-check font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Transaksi Berhasil!</h2>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-check mr-1"></i> Selesai</Button>
          </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'hapus':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody className="p-5">
            <i className="fas fa-times font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Pesanan Berhasil Dihapus!</h2>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-check mr-1"></i> Selesai</Button>
          </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'simpan':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody className="p-5">
            <i className="fas fa-check font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Data Berhasil Disimpan!</h2>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-check mr-1"></i> Selesai</Button>
          </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'clearCart':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody className="p-5">
            <i className="fas fa-times font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Apakah Anda yakin ingin menghapus Cart?</h2>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-times mr-1"></i> Ya, Hapus!</Button>
          </ModalBody>
        </Modal>
          )}
          </div>
      );
      case 'saveTransaction':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody className="p-5">
            <i className="fas fa-check font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Transaksi Berhasil Disimpan!</h2>
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={this.clearCartCloseModal}> OK</Button>
          </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'changeDate':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody className="p-5">
            <i className="fas fa-calendar-check font-weight-bold display-3 text-red"></i>
            <h2 className="display-6 py-3">Apakah anda yakin akan mengubah posisi tanggal ke hari berikutnya ?</h2>
            <Button className="mt-3 py-3 px-5" color="secondary" size="lg" onClick={this.clearCartCloseModal}><i class="fas fa-times mr-1"></i> TIDAK</Button>{" "}
            <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={() => this.props.cartStore.changeAllDate(this.props.toggleModal, this.clearCartCloseModal)}><i class="fas fa-check mr-1"></i> YA</Button>
          </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'catatan':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalBody className="p-5">
            <h4 className="display-6 py-3">Tambah Catatan</h4>
            <div className={this.props.cartStore.state.activeInputBooking === 'note'+this.props.cartStore.state.selectedProduct.name ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                            <Input  
                                    // value={this.props.cartStore.state.valueInputBooking["note"]}
                                    defaultValue={this.props.cartStore.state.produksi["note"+this.props.cartStore.state.selectedProduct.name]}
                                    id={"note"+this.props.cartStore.state.selectedProduct.name}
                                    onChange={this.props.cartStore.onChangeBooking}
                                    onFocus={this.props.cartStore.setActiveInputBooking} 
                                    className="note-production" type="textarea" name="catatan" placeholder="TAMBAH CATATAN" rows="7"
                                    autoFocus
                                    ></Input>
                            </div>
            <Button className="mt-3 py-3 px-5" color="secondary" size="lg" onClick={this.props.toggle}><i class="fas fa-check mr-1"></i> Selesai</Button>{" "}
          </ModalBody>
        </Modal>
        )}
        </div>
      );
      case 'production':
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} onClosed={this.props.cartStore.resetActiveInputRefund} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered >
          {externalCloseBtn}
          <ModalBody className="p-5">
            <Row>
              <div className="date"><span className="date-update">{this.state.days[new Date().getDay()] + ", " + this.state.date}</span></div>
            </Row>
            <Row>
            <div className="date">{"Produksi " + this.props.where + " : " + this.props.cartStore.state.selectedProduct.name ? "Produksi " + this.props.where + " : " + this.props.cartStore.state.selectedProduct.name : ""}</div>
            </Row>
            <Row className="SidebarBody" >

              {/* LEFT */}
              
              <Col xs='4'>
                <div centered>
                    <img className="img-view" src={this.props.cartStore.state.selectedProduct.photo}></img>
                </div>
                </Col>
                <Col xs='4'>
                
                {/* <Input className="mb-4" type="text" name="paymentDiscount" id="paymentDiscount" placeholder=" ..." bsSize="lg" /> */}

                {/* <Input className="mb-4" type="text" name="paymentDiscount" id="paymentDiscount" placeholder=" ..." bsSize="lg" /> */}
                <div className={this.props.cartStore.state.activeInputRefund === 'approvalUser' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                  <Input className="input-masking mb-4" placeholder="User" bsSize="lg" style={{textAlign: "center", border: "2px solid grey", fontSize:"20px"}}
                    value={this.props.cartStore.state.valueInputRefund["approvalUser"]}
                    name="approvalUser" id="approvalUser" type="text"
                    onChange={this.props.cartStore.onChangeBooking}
                    onFocus={this.props.cartStore.setActiveInputRefund}
                    autoFocus
                  />
                </div>
                <div className={this.props.cartStore.state.activeInputRefund === 'approvalCode' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                  <Input className="input-masking mb-4" placeholder="Approval" bsSize="lg" style={{textAlign: "center", border: "2px solid grey", fontSize:"20px"}}
                    value={this.props.cartStore.state.valueInputRefund["approvalCode"]}
                    name="approvalCode" id="approvalCode" type="password"
                    onChange={this.props.cartStore.onChangeBooking}
                    onFocus={this.props.cartStore.setActiveInputRefund}
                  />
                </div>
                <div className={this.props.cartStore.state.activeInputRefund === 'refundCode'+this.props.where ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                  <Input className="input-masking mb-4" type="text" placeholder="Jumlah Produksi" bsSize="lg" style={{textAlign: "center", border: "2px solid grey", fontSize:"20px"}}
                    value={this.props.cartStore.state.valueInputRefund["refundCode1"] || this.props.cartStore.state.valueInputRefund["refundCode2"] || 
                          this.props.cartStore.state.valueInputRefund["refundCode3"]  || this.props.cartStore.state.valueInputRefund["refundCode4"] ||
                          this.props.cartStore.state.valueInputRefund["refundCode5"]}
                    name="refundCode" id={"refundCode"+this.props.where}
                    onFocus={this.props.cartStore.setActiveInputRefund}
                    // onBlur={this.props.cartStore.resetActiveInputRefund}
                    
                  />
                </div>

                <Button className="mt-3 py-3 px-5" color="danger" size="lg" onClick={() => this.props.cartStore.doProduction(this.props.cartStore.state.selectedProduct.id, this.props.modalStore)}><i class="fas fa-check mr-1"></i> OK</Button>

                </Col>

                <Col xs='4'>
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
        )}
        </div>
      );
      default:
        return (
          <div id="A" ref={this.root}>
          {this.root.current && (
        <Modal parentSelector={() => this.root.current} style={customStyles} isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} size={this.props.size} centered>
          {externalCloseBtn}
          <ModalHeader toggle={this.props.toggle} className="text-center d-block">Shutdown</ModalHeader>
          <ModalBody>
            Apakah Anda yakin ingin mematikan mesin ? 
          </ModalBody>
          <ModalFooter className="text-center d-block">
            <Button color="dark" size="lg" onClick={this.props.toggle}>Ya</Button>{' '}
            <Button color="danger" size="lg" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        )}
        </div>
      );
    }
  }

  render() {
    return (
      <Subscribe to={[RootContainer, ModalsContainer, CartsContainer, TransactionContainer]}>
      {(rootStore, modalStore, cartStore, transactionStore) => (
        <div>
          {this.renderSwitch(modalStore.state.modalType)}
        </div>
      )}
    </Subscribe>
    )
  }
}

export default Modals