import React from 'react'

class ProductionStore extends React.Component {
    render() {
        return (
            <div>
                <tr>
                    <th><i class="fas fa-minus-circle add-product"> Penjualan</i></th>
                </tr>
                <tr>
                    <td className="production-store">Toko</td>
                    <td className="product-total-store text-right" >-</td>
                </tr>
                <tr>
                    <td className="booking-production">Pemesanan</td>
                    <td className="product-total-store text-right" >-</td>
                </tr>
                <hr />
                <tr>
                    <td className="total-sales">Total Penjualan</td>
                    <td className="calc-product-sales text-right">-</td>
                </tr>
            </div>
        )
    }
}

export default ProductionStore