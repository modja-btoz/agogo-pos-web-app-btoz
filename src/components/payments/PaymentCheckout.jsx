import React, {Component} from 'react'
import { Container, Row, Col, NavLink, Button, Input } from 'reactstrap';
import NumberFormat from 'react-number-format';
import CalcNumericPayment from '../calcs/CalcNumericPayment'
import './PaymentCheckout.scss';

const PaymentCheckout = (props) => {

  // ~ {
  //   usernow: props.userNow.id,
  //   qty: "",
  //   product_id: "",
  //   price: "",
  //   subtotal: props.cartStore.state.totalAmount,
  //   diskon: props.cartStore.state.grandTotalAmountDiscount,
  //   total: props.cartStore.state.grandTotalAmount,
  //   dibayar: props.cartStore.state.totalPayment,
  //   kembali: props.cartStore.state.changePayment,
  //   status: "",
  // }

  return (

    <Row className="PaymentCheckout d-block">
      <Container>
        <Row className="SidebarHeader">
          <Col>
            <NavLink onClick={() => props.cartStore.togglePaymentCheckoutShow()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i> Lanjut Belanja</NavLink>
          </Col>
        </Row>

        <Row className="SidebarBody mt-4 mb-3">
          <Col>
            <h5 className="mb-0">SUB TOTAL</h5>
            <h3><strong><NumberFormat value={props.cartStore.state.totalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></strong></h3>
          </Col>
        </Row>

        <Row className="SidebarBody">

          {/* LEFT */}
          <Col className="pr-0">
            <h5>DISKON</h5>
            {/* <Input className="mb-4" type="text" name="paymentDiscount" id="paymentDiscount" placeholder=" ..." bsSize="lg" /> */}
            {props.cartStore.state.discountType === 'Rp' &&
            <div className={props.cartStore.state.activeInputPayment === 'paymentDiscount' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
              <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="Rp 0" 
                value={props.cartStore.state.valueInputPayment["paymentDiscount"] || ""}
                name="paymentDiscount" id="paymentDiscount" 
                onFocus={props.cartStore.moveCaretAtEnd}
                prefix={'Rp '}
              />
              <Input className="input-masking mb-4" type="text" placeholder=" ..." bsSize="lg" 
                value={props.cartStore.state.valueInputPayment["paymentDiscount"] || ""}
                name="paymentDiscount" id="paymentDiscount"
                onFocus={props.cartStore.setActiveInputPayment}
              />
            </div>
            }
            {props.cartStore.state.discountType === '%' &&
            <div className="input-keyboard-wrapper">
              <NumberFormat type="text" thousandSeparator={'.'} decimalSeparator={','} className="mb-4 form-control-lg form-control" placeholder="0%" 
                value={props.cartStore.state.valueInputPayment["paymentDiscount"] || ""}
                name="paymentDiscount" id="paymentDiscount"
                onFocus={props.cartStore.moveCaretAtEnd}
                suffix={'%'}
              />
              <Input className="input-masking mb-4" type="text" placeholder=" ..." bsSize="lg" 
                value={props.cartStore.state.valueInputPayment["paymentDiscount"] || ""}
                name="paymentDiscount" id="paymentDiscount"
                onFocus={props.cartStore.setActiveInputPayment}
              />
            </div>
            }
            
            <h5 className="mb-0">TOTAL</h5>
            <h3><strong><NumberFormat value={props.cartStore.state.grandTotalAmountDiscount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></strong></h3>

            <h5 className="mt-4">TOTAL PEMBAYARAN</h5>
            <div className={props.cartStore.state.activeInputPayment === 'paymentTotal' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
              <NumberFormat thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} className="mb-4 form-control-lg form-control" placeholder="Rp 0"  
                value={props.cartStore.state.valueInputPayment["paymentTotal"] || ""}
                name="paymentTotal" id="paymentTotal"
                autoFocus
                onFocus={props.cartStore.moveCaretAtEnd}
              />
              <Input className="input-masking mb-4" type="text" name="paymentTotal" id="paymentTotal" placeholder=" ..." bsSize="lg" 
                value={props.cartStore.state.valueInputPayment["paymentTotal"] || ""}
                name="paymentTotal" id="paymentTotal"
                onFocus={props.cartStore.setActiveInputPayment}
                autoFocus
              />
            </div>

            <h5 className="mb-0">
              {(props.cartStore.state.valueInputPayment["paymentTotal"] < props.cartStore.state.grandTotalAmountDiscount || isNaN(props.cartStore.state.valueInputPayment["paymentTotal"]) )
              ? 'KURANG' 
              : 'KEMBALI'}
            </h5>
            <h3 className="text-orange"><strong>
            <NumberFormat value={props.cartStore.state.changePayment} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '}  />
            </strong></h3>

          </Col>

          {/* RIGHT */}
          <Col className="px-0">
            <CalcNumericPayment
              cartStore={props.cartStore}
              onChange={props.cartStore.onChange} 
              onChangeInput={props.cartStore.onChangeInput} 
              onEnter={props.cartStore.onEnter} 
              inputName={props.cartStore.state.inputName}
            />
          </Col>
          
        </Row>

        <Row className="SidebarFooter mt-4">
          <Col>
            <Button onClick={() => props.cartStore.doTransaction(props.userNow.id, props.modalStore.toggleModal)} 
            color="danger" size="lg" className="py-3 px-5 btn-bayar-fixed"><i className="fas fa-coins mr-2"></i> BAYAR</Button>
          </Col>
        </Row>
      </Container>
    </Row>

  )
}

export default PaymentCheckout