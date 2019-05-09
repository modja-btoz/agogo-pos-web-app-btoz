import React from 'react' 

const CartProductionTotal = (props) => {
    return (
        <tfoot className="tfoot-booking">
            <tr className="cart-total">
                <th>
                    STOK AWAL <br/>
                    <span className="date">{props.date.days[new Date().getDay() - 1] + ", " + props.date.prevDate}</span>    
                </th>
                <th><h2>{props.cartStore.state.produksi["stok_kemarin"+ props.cartStore.state.selectedProduct.name] || "-"}</h2></th>
                <th>
                    SISA STOK
                </th>
                <th><h2>{props.cartStore.state.selectedProduct.stock ? props.cartStore.state.selectedProduct.stock : "-"}</h2></th>
            </tr>
        </tfoot>
    )
}

export default CartProductionTotal