import React from 'react'
import { Container, Row, Col, NavLink, Button, Input } from 'reactstrap';
import NumberFormat from 'react-number-format';
import CalcNumericRefund from '../calcs/CalcNumericRefund'
//import './Refund.scss';

const Refund = (props) => {
  return (

    <Row className="Refund d-block">
      <Container>
        <Row className="SidebarHeader">
          <Col>
            <NavLink onClick={() => props.cartStore.toggleOpenRefundShow()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i>Refund</NavLink>
          </Col>
        </Row>

        {/* <Row className="SidebarBody mt-4 mb-3">
          <Col>
            <h5 className="mb-0">SUB TOTAL</h5>
            <h3><strong><NumberFormat value={props.cartStore.state.totalAmount} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /></strong></h3>
          </Col>
        </Row> */}

        <Row className="SidebarBody" >

          {/* LEFT */}
          <Col className="pr-0">

            <h5>NOMOR ORDER</h5>
            {/* <Input className="mb-4" type="text" name="paymentDiscount" id="paymentDiscount" placeholder=" ..." bsSize="lg" /> */}
            <div className={props.cartStore.state.activeInputRefund === 'refundCode' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
              <Input className="input-masking mb-4" type="text" placeholder=" ..." bsSize="lg" 
                value={props.cartStore.state.valueInputRefund["refundCode"] || ""}
                name="refundCode" id="refundCode"
                onFocus={props.cartStore.setActiveInputRefund}
                autoFocus
              />
            </div>

            <h5>APPROVAL</h5>
            {/* <Input className="mb-4" type="text" name="paymentDiscount" id="paymentDiscount" placeholder=" ..." bsSize="lg" /> */}
            <div className={props.cartStore.state.activeInputApproval === 'approvalCode' ? 'input-keyboard-wrapper active-input' : 'input-keyboard-wrapper'}>
              <Input className="input-masking mb-4" type="text" placeholder=" ..." bsSize="lg" 
                value={props.cartStore.state.valueInputRefund["approvalCode"] || ""}
                name="approvalCode" id="approvalCode" type="password"
                onFocus={props.cartStore.setActiveInputRefund}
              />
            </div> 

          </Col>

          {/* RIGHT */}
          <Col className="px-0">
            <CalcNumericRefund
              cartStore={props.cartStore} 
              onEnter={props.cartStore.onEnter} 
              inputName={props.cartStore.state.inputName}
            />
            
          </Col>
          
        </Row>

        <Row className="SidebarFooter mt-4">
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button onClick={() => props.modalStore.toggleModal('bayar', '')} color="danger" size="lg" className="py-3 px-5"><i className="fas fa-retweet mr-2"></i> REFUND</Button>
          </Col>
        </Row>
      </Container>
    </Row>

  )
}

export default Refund