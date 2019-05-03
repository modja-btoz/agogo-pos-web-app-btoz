import React from 'react'

const CartProductionTotal = (props) => {
    return (
        <tfoot className="tfoot-booking">
            <tr className="cart-total">
                <th>
                    STOK AWAL <br/>
                    <span className="date">Jum'at, 26 Oct 2018</span>    
                </th>
                <th>-</th>
                <th>
                    SISA STOK
                </th>
                <th><h2>{props.cartStore.state.selectedProduct.stock ? props.cartStore.state.selectedProduct.stock : "-"}</h2></th>
            </tr>
        </tfoot>
    )
}

export default CartProductionTotal