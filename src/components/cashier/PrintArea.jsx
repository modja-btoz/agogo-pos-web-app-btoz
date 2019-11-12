import React from 'react'
import NumberFormat from 'react-number-format'

const headContent = () =>{
  return (
    <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px'}}>
      <div style={{marginTop: '5%', float: 'left', width: '100px', height: '40px', backgroundImage: `url(require(Rp {LogoAgogo}))`, backgroundSize: '100px 40px'}} />
      <div class="info" style={{marginTop: '5%'}}> 
        <h6>
          <p align='left'> 
              Jalan Woltermonginsidi<br />
              Kel. Girian Indah | Kec. Girian <br />
              Bitung | Sulawesi Utara<br />
              Telp. 0438 2230652<br />
              Fax. 0821 8749 8746<br />
          </p>
        </h6>
      </div>
    </div>
  )
}

const PrintArea = (props) => {
return (
<div>
  <iframe id="printArea" title="coba" style={{display: 'none', width: '70mm'}} />
  
  
  {/* KASIR BAYAR*/}
  <div id="kasirBayar">
      
      {headContent()}
      <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px', minHeight: '110px'}} >
        <div style={{marginTop: '10px'}}>
        <table>
          <tr>
              <td>No order</td>
              <td>: {props.cartStore.state.currentTrx}</td>
          </tr>
          <tr>
              <td>Tanggal</td>
          <td>: {props.cartStore.getDateTime()}</td>
          </tr>
          <tr>
              <td>Kasir</td>
              <td>: {props.namaKasir} </td>
          </tr>
          </table>
        </div>
      </div>
      
      <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px'}}>
        <div id="table" style={{marginTop: 10}}>
          <table>
            <tr style={{height: 20}}>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Item</td>
              <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Price</td>
              <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Qty</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Sub Total</td>
            </tr>

            {props.cartStore.state.items.map(item => 
                <tr class="service">
                  <td>{item.name}</td>
                  <td style={{textAlign: 'center'}}><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                  <td style={{textAlign: 'center'}}>{item.qty}</td>
                  <td><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                </tr>
            )}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Total</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.grandTotalAmountDiscount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Pembayaran</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.valueInputPayment["paymentTotal"]} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Kembali</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.changePayment} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

          </table>
        </div>

        <div id="legalcopy">
          <p align="center"><strong>*** {props.cartStore.state.items.length} ITEM ***
          <br />
          </strong>Terima kasih 
          <br />
          Atas kunjungan anda
          </p>
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
          </tr>
          <tr>
              <td>Tanggal</td>
          <td>: {props.cartStore.getDateTime()}</td>
          </tr>
          <tr>
              <td>Kasir</td>
              <td>: {props.namaKasir} </td>
          </tr>
          </table>
        </div>
      </div>
      
      <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px'}}>
        <div id="table" style={{marginTop: 10}}>
          <table>
            <tr style={{height: 20}}>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Item</td>
              <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Price</td>
              <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Qty</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Sub Total</td>
            </tr>

            {props.cartStore.state.refundItems.map(item => 
                <tr class="service">
                  <td>{item.name}</td>
                  <td style={{textAlign: 'center'}}><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                  <td style={{textAlign: 'center'}}>{item.qty}</td>
                  <td><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                </tr>
            )}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Total</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Dibayarkan</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Kembali</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

          </table>
        </div>

        <div id="legalcopy">
          <p align="center"><strong>*** {props.cartStore.state.refundItems.length} ITEM ***
          <br />
          </strong>Terima kasih 
          <br />
          Atas kunjungan anda
          </p>
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
          </tr>
          <tr>
              <td>Alamat</td>
              <td>: {props.cartStore.state.dataReservation["alamat"]}</td>
          </tr>
          <tr>
              <td>Telepon</td>
              <td>: {props.cartStore.state.dataReservation["telepon"]}</td>
          </tr>
          <tr>
              <td>No. Order</td>
              <td>: {props.cartStore.state.currentTrx}</td>
          </tr>
          <tr>
              <td>Tanggal</td>
              <td>: {props.cartStore.getDateTime()}</td>
          </tr>
          <tr>
              <td>Selesai</td>
              <td>: {(props.cartStore.state.whatDate || props.cartStore.getToday())} {props.cartStore.state.time + ':00'}</td>
          </tr>
          <tr>
              <td>Pencatat</td>
              <td>: {props.namaKasir}</td>
          </tr>
          </table>
        </div>
      </div>
      
      <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px'}}>
        <div id="table" style={{marginTop: 10}}>
          <table>
            <tr style={{height: 20}}>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Item</td>
              <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Price</td>
              <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Qty</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Sub Total</td>
            </tr>

            {props.cartStore.state.items.map(item => 
                <tr class="service">
                  <td>{item.name}</td>
                  <td style={{textAlign: 'center'}}><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                  <td style={{textAlign: 'center'}}>{item.qty}</td>
                  <td><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                </tr>
            )}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Total</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Biaya Tambahan</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.expenseAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Diskon</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.discountAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Uang Muka</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.dpReservationAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Sisa Pembayaran</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.leftToPay} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

          </table>
        </div>

        <div id="legalcopy">
          <p align="center"><strong>*** {props.cartStore.state.items.length} ITEM ***
          <br />
          </strong>Terima kasih 
          <br />
          Atas kunjungan anda
          </p>
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
          </tr>
          <tr>
              <td>Alamat</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].alamat : ''}</td>
          </tr>
          <tr>
              <td>Telepon</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].telepon : ''}</td>
          </tr>
          <tr>
              <td>No. Order</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].invoice : ''}</td>
          </tr>
          <tr>
              <td>Tanggal</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].tgl_pesan : ''}</td>
          </tr>
          <tr>
              <td>Selesai</td>
              <td>: {props.cartStore.getDateTime()}</td>
          </tr>
          <tr>
              <td>Kasir</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].pencatat : ''}</td>
          </tr>
          </table>
        </div>
      </div>
      
      <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px'}}>
        <div id="table" style={{marginTop: 10}}>
          <table>
            <tr style={{height: 20}}>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Item</td>
              <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Price</td>
              <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Qty</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Sub Total</td>
            </tr>

            {props.cartStore.state.items.map(item => 
                <tr class="service">
                  <td>{item.name}</td>
                  <td style={{textAlign: 'center'}}><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                  <td style={{textAlign: 'center'}}>{item.qty}</td>
                  <td><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                </tr>
            )}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Total</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.grandTotalAmountDiscount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Pembayaran</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.valueInputPayment["paymentTotal"]} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Kembali</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.changePayment} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

          </table>
        </div>

        <div id="legalcopy">
          <p align="center"><strong>*** {props.cartStore.state.items.length} ITEM ***
          <br />
          </strong>Terima kasih 
          <br />
          Atas kunjungan anda
          </p>
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
          </tr>
          <tr>
              <td>Alamat</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].alamat : ''}</td>
          </tr>
          <tr>
              <td>Telepon</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].telepon : ''}</td>
          </tr>
          <tr>
              <td>No. Order</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].invoice : ''}</td>
          </tr>
          <tr>
              <td>Tanggal</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].tgl_pesan : ''}</td>
          </tr>
          <tr>
              <td>Selesai</td>
              <td>: {props.cartStore.getDateTime()}</td>
          </tr>
          <tr>
              <td>Pencatat</td>
              <td>: {props.cartStore.state.selectedItems[0] ? props.cartStore.state.selectedItems[0].pencatat : ''}</td>
          </tr>
          </table>
        </div>
      </div>
      
      <div style={{borderBottom: '1px solid #EEE', marginBottom: '5px'}}>
        <div id="table" style={{marginTop: 10}}>
          <table>
            <tr style={{height: 20}}>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Item</td>
              <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Price</td>
              <td style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>Qty</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Sub Total</td>
            </tr>

            {props.cartStore.state.refundItems.map(item => 
                <tr class="service">
                  <td>{item.name}</td>
                  <td style={{textAlign: 'center'}}><NumberFormat prefix={'Rp '} value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                  <td style={{textAlign: 'center'}}>{item.qty}</td>
                  <td><NumberFormat prefix={'Rp '} value={item.price * item.qty} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
                </tr>
            )}

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Total</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Dibayarkan</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={props.cartStore.state.totalRefund} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

            <tr class="tabletitle">
              <td></td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}>Kembali</td>
              <td style={{fontSize: '16px', fontWeight: 'bold'}}><NumberFormat prefix={'Rp '} value={0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} /></td>
            </tr>

          </table>
        </div>

        <div id="legalcopy">
          <p align="center"><strong>*** {props.cartStore.state.refundItems.length} ITEM ***
          <br />
          </strong>Terima kasih 
          <br />
          Atas kunjungan anda
          </p>
        </div>

      </div>
    </div>
</div>
)}

export default PrintArea