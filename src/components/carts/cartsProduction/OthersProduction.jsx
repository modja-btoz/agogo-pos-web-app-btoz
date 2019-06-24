import React from 'react'
import { Input, Button, Popover, PopoverBody} from 'reactstrap'

class OthersProduction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        popoverOpen: false,
        }
    }

    toggle() {
        this.setState({
        popoverOpen: !this.state.popoverOpen
        });
        console.log("A")
    }

    render() {
        return (
            <div>
                <div>
                <tr>
                    <th><i class="fas fa-minus-circle add-product"> Lain-lain</i></th>
                </tr>
                <tr>
                    <td className="broken-production">Rusak</td>
                    <td className="product-total-broken text-right" >{ this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "rusak"] || "-"}</td>
                    <td><a className={this.props.cartStore.productionButton4()} onClick={() => this.props.modalStore.toggleModal('production', 'lg', "4")}><i class="fas fa-pen-square edit"></i></a></td>
                </tr>
                <tr>
                    <td className="others-production">Lain-lain</td>
                    <td className="product-total-others text-right" >{ this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "lain"] || "-"}</td>
                    <td><a className={this.props.cartStore.productionButton5()} onClick={() => this.props.modalStore.toggleModal('production', 'lg', "5")}><i class="fas fa-pen-square edit"></i></a></td>
                </tr>
                <hr />
                <tr>
                    <td className="total-others">Total Lain-lain</td>
                    <td className="calc-product-total text-right">{parseInt(this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "rusak"] || 0)+
                                                                    parseInt(this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "lain"] || 0) || "-"}</td>
                </tr>
                </div>
                <div>
                <tr>
                <Button disabled={this.props.cartStore.state.disabledProductionNote} onClick={() => this.props.modalStore.toggleModal('catatan')}>
                    Tambah Catatan
                </Button>
                    {/* <Popover placement="right" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                        <PopoverBody >
                        <div className={this.props.cartStore.state.activeInputBooking === 'note'+this.props.cartStore.state.selectedProduct.name ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
                            <Input  
                                    value={this.props.cartStore.state.valueInputBooking["note"]}
                                    name="refundCode" id={"note"+this.props.cartStore.state.selectedProduct.name}
                                    onChange={this.props.cartStore.onChangeBooking}
                                    onFocus={this.props.cartStore.setActiveInputBooking} 
                                    className="note-production" type="textarea" name="catatan" placeholder="TAMBAH CATATAN" rows="7"></Input>
                            </div>
                        </PopoverBody>
                    </Popover> */}
                </tr>
                </div>
            </div>
        )
    }
}

export default OthersProduction