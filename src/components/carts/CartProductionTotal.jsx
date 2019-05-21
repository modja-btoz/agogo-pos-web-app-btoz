import React from 'react' 
import NumberFormat from 'react-number-format';

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
                <th><h2><NumberFormat value={props.cartStore.getStok() || "-"} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','}  />
                </h2></th>
            </tr>
        </tfoot>
    )
}

export default CartProductionTotal