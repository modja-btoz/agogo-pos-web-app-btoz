import React from 'react'

const Production = (props) => {
    return (
        <div>
            <tr>
                <th><i class="fas fa-plus-circle add-product"> Produksi</i></th>
            </tr>
            <tr>
                <td className="production">Produksi 1</td>
                <td className="product-total text-right" >-</td>
                <td><i class="fas fa-pen-square edit"></i></td>
            </tr>
            <tr>
                <td className="production">Produksi 2</td>
                <td className="product-total text-right">-</td>
                <td><i class="fas fa-pen-square edit"></i></td>
            </tr>
            <tr>
                <td className="production">Produksi 3</td>
                <td className="product-total text-right">-</td>
                <td><i class="fas fa-pen-square edit"></i></td>
            </tr>
            <hr />
            <tr>
                <td className="total-production">Total Produksi</td>
                <td className="calc-product-total text-right">-</td>
            </tr>
        </div>
    )
}

export default Production;