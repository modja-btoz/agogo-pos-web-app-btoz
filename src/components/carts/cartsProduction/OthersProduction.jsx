import React from 'react'

class OthersProduction extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <tr>
                    <th><i class="fas fa-minus-circle add-product"> Lain-lain</i></th>
                </tr>
                <tr>
                    <td className="broken-production">Rusak</td>
                    <td className="product-total-broken text-right" >{ this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "rusak"] || "-"}</td>
                    <td><a href="#" onClick={() => this.props.modalStore.toggleModal('production', 'lg', "4")}><i class="fas fa-pen-square edit"></i></a></td>
                </tr>
                <tr>
                    <td className="others-production">Lain-lain</td>
                    <td className="product-total-others text-right" >{ this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "lain"] || "-"}</td>
                    <td><a href="#" onClick={() => this.props.modalStore.toggleModal('production', 'lg', "5")}><i class="fas fa-pen-square edit"></i></a></td>
                </tr>
                <hr />
                <tr>
                    <td className="total-sales">Total Lain-lain</td>
                    <td className="calc-product-others text-right">{parseInt(this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "rusak"] || 0)+
                                                                    parseInt(this.props.cartStore.state.produksi[this.props.cartStore.state.selectedProduct.name + "lain"] || 0) || "-"}</td>
                </tr>
            </div>
        )
    }
}

export default OthersProduction