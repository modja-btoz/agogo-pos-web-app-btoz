import React from 'react'

class OthersProduction extends React.Component {
    render() {
        return (
            <div>
                <tr>
                    <th><i class="fas fa-minus-circle add-product"> Lain-lain</i></th>
                </tr>
                <tr>
                    <td className="broken-production">Rusak</td>
                    <td className="product-total-broken text-right" >-</td>
                    <td><i class="fas fa-pen-square edit"></i></td>
                </tr>
                <tr>
                    <td className="others-production">Lain-lain</td>
                    <td className="product-total-others text-right" >-</td>
                    <td><i class="fas fa-pen-square edit"></i></td>
                </tr>
                <hr />
                <tr>
                    <td className="total-sales">Total Lain-lain</td>
                    <td className="calc-product-others text-right">-</td>
                </tr>
            </div>
        )
    }
}

export default OthersProduction