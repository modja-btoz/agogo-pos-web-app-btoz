import React from 'react'
import { Table, Container, Row, Col, Input, Button, Popover, PopoverBody} from 'reactstrap'
import CartHeader from '../CartHeader'
import CartProductionTotal from '../CartProductionTotal'

import './CartProduction.scss'
import OthersProduction from './OthersProduction';
import ProductionStore from './ProductionStore';

class CartProduction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          //defauilt value of the date time
          date: '',
          prevDate : '',
          days: [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Saturday"
        ],
        // console.log(days[new Date().getDay()]);
        };
    }

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
          prevDate:
            (date -1) + '/' + month + '/' + year,
        });
      }

    render() {
        return (
            <Container className="cart mt-4 pt-5 pr-0 pl-0">
                <Row style={{height: "500px"}}>
                    <Col xs="7" className="body-left">
                        <div className="date">Posisi per <span className="date-update">{this.state.days[new Date().getDay()] + ", " + this.state.date}</span></div>
                        <div className="change-date" style={{marginTop: "5px"}}><a href="#" onClick={() => this.props.modalStore.toggleModal('changeDate', 'lg')}><strong>Ubah Tanggal</strong></a></div>
                        <div className="view-img" style={{marginTop: "10px"}}>
                            <img className="img-product" src={this.props.cartStore.state.selectedProduct.photo}></img>
                        </div>
                        <div className="select-view-product">
                            { this.props.cartStore.state.selectedProduct.name ? this.props.cartStore.state.selectedProduct.name : "Pilih product untuk melihat stok"}
                        </div>
    
                    </Col>
                    <Col xs="5" className="body-right">
                        <tr>
                            <th><i class="fas fa-plus-circle add-product"> Produksi</i></th>
                        </tr>
                        <tr>
                            <td className="production">Produksi 1</td>
                            <td className="product-total text-right" id="produksi1">{ this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "produksi1"] || 0 || "-"}</td>
                            <td><a href="#" onClick={() => this.props.modalStore.toggleModal('production', 'lg', "1")}><i class="fas fa-pen-square edit"></i></a></td>
                        </tr>
                        <tr>
                            <td className="production">Produksi 2</td>
                            <td className="product-total text-right" id="produksi2">{ this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "produksi2"] || 0 || "-"}</td>
                            <td><a href="#" onClick={() => this.props.modalStore.toggleModal('production', 'lg', "2")}><i class="fas fa-pen-square edit"></i></a></td>
                        </tr>
                        <tr>
                            <td className="production">Produksi 3</td>
                            <td className="product-total text-right" id="produksi3">{ this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "produksi3"] || 0 || "-"}</td>
                            <td><a href="#" onClick={() => this.props.modalStore.toggleModal('production', 'lg', "3")}><i class="fas fa-pen-square edit"></i></a></td>
                        </tr>
                        <hr/>
                        <tr>
                            <td className="production">Total Produksi</td>
                            <td className="calc-product-total text-right">{parseInt(this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "produksi1"] || 0)+
                                                                           parseInt(this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "produksi2"] || 0)+
                                                                           parseInt(this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "produksi3"] || 0) || "-"
                                                                           }</td>
                        </tr>

                        <ProductionStore cartStore={this.props.cartStore} modalStore={this.props.modalStore}/>
                        <OthersProduction cartStore={this.props.cartStore} modalStore={this.props.modalStore}/>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <h5>Catatan {this.props.cartStore.state.selectedProduct.name} : {this.props.cartStore.state.produksi["note"+this.props.cartStore.state.selectedProduct.name] || ""} </h5>

                        {/* <div className={this.props.cartStore.state.activeInputBooking === 'note'+this.props.cartStore.state.selectedProduct.name ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                        <Input  
                                value={this.props.cartStore.state.valueInputBooking["note"]}
                                name="refundCode" id={"note"+this.props.cartStore.state.selectedProduct.name}
                                onChange={this.props.cartStore.onChangeBooking}
                                onFocus={this.props.cartStore.setActiveInputBooking} 
                                className="note-production" type="textarea" name="catatan" placeholder="TAMBAH CATATAN" rows="7"></Input>
                        </div> */}
                    </Col>
                </Row>

                <Table borderless striped>
                    <CartProductionTotal date={this.state} cartStore={this.props.cartStore}/>
                </Table>
            </Container>
        )
    }
}

export default CartProduction