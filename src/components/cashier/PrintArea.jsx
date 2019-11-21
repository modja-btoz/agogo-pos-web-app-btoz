import React from 'react'
import NumberFormat from 'react-number-format'

const headContent = () =>{
  return (
          <p> 
              Jalan Woltermonginsidi{`<br />`}
              Kel. Girian Indah | Kec. Girian {`<br />`}
              Bitung | Sulawesi Utara{`<br />`}
              Telp. 0438 2230652{`<br />`}
              Fax. 0821 8749 8746{`<br />`}
              ---------------------------------------{`<br />`}
          </p>
  )
}

const PrintArea = (props) => {
return (
<div>
  <iframe id="printArea" title="coba" style={{display: 'none', width: '70mm', position: "absolute"}} />
  
  
  {/* KASIR BAYAR*/}
  <div id="kasirBayar">
      <div  >
        <div >
          {headContent()}
        <table>
          <tr>
              <td>No order</td>
              <td>: {props.cartStore.state.currentTrx}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Tanggal</td>
              <td>: {props.cartStore.getDateTime()}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Kasir</td>
              <td>: {props.namaKasir} </td>
              {`<br />`}
          </tr>
          </table>
          <p>---------------------------------------</p>
          {`<br />`}
        </div>
      </div>
      
      <div >
        <div >
        <table>
            <tr >
              <td align="left">PEMBELIAN </td>
              {/* <td align="left">Price </td>
              <td align="left">Qty </td>
              <td align="left">Sub Total </td> */}
            </tr>
            {`<br />`}
            {props.cartStore.state.items.map(item => 
                <tr class="service">
                  <td align="left">{item.qty} </td>
                  {/* <td align="left"><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                  <td align="left">{item.name} </td>
                  <td align="left"><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                  {`<br />`}
                </tr>
            )}
            <p>---------------------------------------</p>
            {`<br />`}
            <tr class="tabletitle">
              <td></td>
              <td></td>
              <td align="left">Total </td>
              <td align="left"><NumberFormat prefix={'Rp '} value={props.cartStore.state.grandTotalAmountDiscount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td></td>
              <td align="left">Pembayaran </td>
              <td align="left"><NumberFormat prefix={'Rp '} value={props.cartStore.state.valueInputPayment["paymentTotal"]} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td></td>
              <td align="left">Kembali </td>
              <td align="left"><NumberFormat prefix={'Rp '} value={props.cartStore.state.changePayment} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}
            <p>---------------------------------------</p>
            {`<br />`}
            <tr class="tabletitle">
              <td>*** {props.cartStore.state.items.length} ITEM ***</td>
            </tr>
            {`<br />`}
            <tr class="tabletitle">
              <td>Terima kasih</td>
            </tr>
            {`<br />`}
            <tr class="tabletitle">
              <td>Atas kunjungan anda</td>
            </tr>
            {`<br />`}
        </table>
        </div>
      </div>
    </div>
    

    {/* KASIR REFUND */}
    <div id="kasirRefund">
      
      {headContent()}
      <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px', minHeight: '110px'}} >
        <div style={{marginTop: '10px'}}>
        <table>
          <tr>
              <td>No order</td>
              <td>: {props.cartStore.state.currentTrx}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Tanggal</td>
              <td>: {props.cartStore.getDateTime()}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Kasir</td>
              <td>: {props.namaKasir} </td>
              {`<br />`}
          </tr>
          </table>
          <p>---------------------------------------</p>
          {`<br />`}
        </div>
      </div>
      
      <div>
        <div>
          <table>
            <tr>
              <td align="left">REFUND PEMBELIAN</td>
              {/* <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Price</td>
              <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Qty</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Sub Total</td> */}
            </tr>
            {`<br />`}
            {props.cartStore.state.refundItems.map(item => 
                <tr class="service">
                  <td>{item.qty} </td>
                  {/* <td><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                  <td>{item.name} </td>
                  <td><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                  {`<br />`}
                </tr>
            )}
            <p>---------------------------------------</p>
            {`<br />`}
            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Total </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Dibayarkan </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Kembali </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}
            <p>---------------------------------------</p>
            {`<br />`}
            <tr class="tabletitle">
              <td>*** {props.cartStore.state.refundItems.length} ITEM ***</td>
            </tr>
            {`<br />`}
            <tr class="tabletitle">
              <td>Terima kasih</td>
            </tr>
            {`<br />`}
            <tr class="tabletitle">
              <td>Atas kunjungan anda</td>
            </tr>
            {`<br />`}
          </table>
        </div>

      </div>
    </div>


    {/* PEMESANAN ORDER */}
    <div id="pesananOrder">

      {headContent()}
      <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px', minHeight: '110px'}} >
        <div style={{marginTop: '10px'}}>
        <table>
          <tr>
              <td>Pemesan</td>
              <td>: {props.cartStore.state.dataReservation["nama"]}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Alamat</td>
              <td>: {props.cartStore.state.dataReservation["alamat"]}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Telepon</td>
              <td>: {props.cartStore.state.dataReservation["telepon"]}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>No. Order</td>
              <td>: {props.cartStore.state.currentTrx}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Tanggal</td>
              <td>: {props.cartStore.getDateTime()}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Selesai</td>
              <td>: {(props.cartStore.state.whatDate || props.cartStore.getToday())} {props.cartStore.state.time + ':00'}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Pencatat</td>
              <td>: {props.namaKasir}</td>
              {`<br />`}
          </tr>
          </table>
          <p>---------------------------------------</p>
          {`<br />`}
        </div>
      </div>
      
      <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px'}}>
        <div id="table" style={{marginTop: 10}}>
          <table>
            <tr>
              <td>PESANAN</td>
              {/* <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Price</td>
              <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Qty</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Sub Total</td> */}
            </tr>
            {`<br />`}
            {props.cartStore.state.items.map(item => 
                <tr class="service">
                  <td>{item.qty} </td>
                  {/* <td><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                  <td>{item.name} </td>
                  <td><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                  {`<br />`}
                </tr>
            )}
            <p>---------------------------------------</p>
            {`<br />`}
            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Total </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Biaya Tambahan </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.expenseAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Diskon </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.discountAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Uang Muka </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.dpReservationAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}
            
            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Sisa Pembayaran </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.leftToPay} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}
            <p>---------------------------------------</p>
            {`<br />`}
            <tr class="tabletitle">
              <td>*** {props.cartStore.state.items.length} ITEM ***</td>
            </tr>
            {`<br />`}
            <tr class="tabletitle">
              <td>Terima kasih</td>
            </tr>
            {`<br />`}
            <tr class="tabletitle">
              <td>Atas kunjungan anda</td>
            </tr>
            {`<br />`}
          </table>
        </div>
      </div>
    </div>


    {/* PEMESANAN BAYAR */}
    <div id="pesananBayar">

      {headContent()}
      <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px', minHeight: '110px'}} >
        <div style={{marginTop: '10px'}}>
        <table>
          <tr>
              <td>Pemesan</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].nama : ''}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Alamat</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].alamat : ''}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Telepon</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].telepon : ''}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>No. Order</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].invoice : ''}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Tanggal</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].tgl_pesan : ''}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Selesai</td>
              <td>: {props.cartStore.getDateTime()}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Kasir</td>
              <td>: {props.namaKasir}</td>
              {`<br />`}
          </tr>
          </table>
          <p>---------------------------------------</p>
          {`<br />`}
        </div>
      </div>
      
      <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px'}}>
        <div id="table" style={{marginTop: 10}}>
          <table>
            <tr>
              <td>PESANAN</td>
              {/* <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Price</td>
              <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Qty</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Sub Total</td> */}
            </tr>
            {`<br />`}
            {props.cartStore.state.items.map(item => 
                <tr class="service">
                  <td>{item.qty} </td>
                  {/* <td><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                  <td>{item.name} </td>
                  <td><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                  {`<br />`}
                </tr>
            )}
            <p>---------------------------------------</p>
            {`<br />`}
            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Sub Total </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Biaya Tambahan </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.expenseAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Diskon </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.discountAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Total </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.grandTotalAmountDiscount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Uang Muka </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.dpReservationAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Sisa Pembayaran </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.leftToPay} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Pembayaran </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.valueInputPayment["paymentTotal"]} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Kembali </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.changePayment} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}
            <p>---------------------------------------</p>
            {`<br />`}
            <tr class="tabletitle">
              <td>*** {props.cartStore.state.items.length} ITEM ***</td>
            </tr>
            {`<br />`}
            <tr class="tabletitle">
              <td>Terima kasih</td>
            </tr>
            {`<br />`}
            <tr class="tabletitle">
              <td>Atas kunjungan anda</td>
            </tr>
            {`<br />`}
          </table>
        </div>
      </div>
    </div>

    {/* PEMESANAN REFUND */}
    <div id="pesananRefund">

      {headContent()}
      <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px', minHeight: '110px'}} >
        <div style={{marginTop: '10px'}}>
        <table>
          <tr>
              <td>Pemesan</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].nama : ''}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Alamat</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].alamat : ''}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Telepon</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].telepon : ''}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>No. Order</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].invoice : ''}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Tanggal</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].tgl_pesan : ''}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Selesai</td>
              <td>: {props.cartStore.getDateTime()}</td>
              {`<br />`}
          </tr>
          <tr>
              <td>Kasir</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].pencatat : ''}</td>
              {`<br />`}
          </tr>
          </table>
          <p>---------------------------------------</p>
          {`<br />`}
        </div>
      </div>
      
      <div>
        <div>
          <table>
            <tr style={{height: 20}}>
              <td>REFUND PESANAN</td>
              {/* <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Price</td>
              <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Qty</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Sub Total</td> */}
            </tr>
            {`<br />`}
            {props.cartStore.state.refundItems.map(item => 
                <tr class="service">
                  <td>{item.qty} </td>
                  {/* <td><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td> */}
                  <td>{item.name} </td>
                  <td><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                  {`<br />`}
                </tr>
            )}
            <p>---------------------------------------</p>
            {`<br />`}
            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Total </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Dibayarkan </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Kembali </td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>
            {`<br />`}
            <p>---------------------------------------</p>
            {`<br />`}
            <tr class="tabletitle">
              <td>*** {props.cartStore.state.refundItems.length} ITEM ***</td>
            </tr>
            {`<br />`}
            <tr class="tabletitle">
              <td>Terima kasih</td>
            </tr>
            {`<br />`}
            <tr class="tabletitle">
              <td>Atas kunjungan anda</td>
            </tr>
            {`<br />`}
          </table>
        </div>
      </div>
    </div>
</div>
)}

export default PrintArea