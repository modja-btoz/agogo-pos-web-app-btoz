import React, { Component } from "react";
import { FormGroup, Input, Label } from 'reactstrap';
import LogoAgogo from "./../../img/logo-agogo.png";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "../calcs/CalcNumeric.scss";
import '../logins/Login.scss';
import { Redirect } from 'react-router-dom'

import { Provider, Subscribe } from 'unstated'
import ModalsContainer from '../modals/_ModalsContainer'

var classNames = require('classnames');


class SaldoAwal extends Component {

  state = {
    layoutName: 'default',
    saldo: '',
    pin: '',
    keyboardSaldo: true,
    keyboardPIN: false,
    redirect: false
  };

  onFocus = whatInput => {
    if(whatInput === 'saldo'){
      this.setState({ 
        keyboardSaldo: true,
        keyboardPIN: false
      })
      console.log("What Input?", whatInput);
    }else if(whatInput === 'pin'){
      this.setState({ 
        keyboardPIN: true,
        keyboardSaldo: false
      })
      console.log("What Input?", whatInput);
    }
  };

  onChangeSaldo = saldo => {
    this.setState({
      saldo: saldo
    });
    console.log("Input Saldo changed", saldo);
  };
  onChangePIN = pin => {
    this.setState({
      pin: pin
    });
    console.log("Input PIN changed", pin);
  };

  onChangeInputSaldo = event => {
    let saldo = event.target.value;
    this.setState(
      {
        saldo: saldo
      },
      () => {
        this.keyboard.setInput(saldo);
      }
    );
  };
  onChangeInputPIN = event => {
    let pin = event.target.value;
    this.setState(
      {
        pin: pin
      },
      () => {
        this.keyboard.setInput(pin);
      }
    );
  };

  onKeyPress = button => {
    // console.log("Button pressed", button);

    if ( button === "{enter}" ) {
      this.onEnter(button);
    }
  };

  onEnter = () => {
    console.log("ON ENTER")
    this.setState({ redirect: true })
  }
  

  render() {

    if(this.state.redirect){
      return (<Redirect to={'/cashier'} />);
    }

    return (
      <Subscribe to={[ModalsContainer]}>
        {modals => (

          <section className="centered">

            <div className="login">

              <div className="container">

                <div className="row">
                  <div className="col login-header">
                    <div className="row">
                      <div className="col-9">
                        <i className="fas fa-coins mr-3"></i> SALDO AWAL
                      </div>
                      <div className="col-3 text-right">
                        <img src={LogoAgogo} className="img-fluid" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 box-pin">
                    <div className="box-inner">

                      <FormGroup className="mt-4">
                        <Label for="saldo" className="text-center d-block"><h3>Masukan Saldo Awal</h3></Label>
                        <Input 
                          onFocus={() => this.onFocus('saldo') } 
                          value={this.state.saldo} 
                          onChange={e => this.onChangeInputSaldo(e)}
                          type="number" name="saldo" id="saldo" placeholder="0"  size="lg" className="text-center mt-3 mb-5" 
                          readonly
                        />

                        <Label for="pin" className="text-center d-block"><h3>Kode Approval</h3></Label>
                        <Input 
                          onFocus={() => this.onFocus('pin') } 
                          value={this.state.pin} 
                          onChange={e => this.onChangeInputPIN(e)}
                          type="password" name="pin" id="pin" placeholder="PIN"  size="lg" className="text-center mb-5" 
                          readonly
                        />

                      </FormGroup>
                    </div>
                  </div>

                  <div className={ this.state.keyboardSaldo ? "col-6 box-calc saldo" : "col-6 box-calc pin" }>
                    <div className="box-inner">

                      <div id="keyboardSaldo" className={ this.state.keyboardSaldo ? "d-block" : "d-none" }>
                        <Keyboard
                          ref={r => (this.keyboard = r)}
                          layoutName={this.state.layoutName}
                          layout={{
                            default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"]
                          }}
                          display={{
                            '{bksp}': '<i class="fas fa-backspace"></i>',
                            '{enter}': '<i class="fas fa-level-down-alt"></i>',
                            '{shift}': 'shift'
                          }}
                          buttonTheme={[
                            {
                              class: "bg-orange",
                              buttons: "{enter}"
                            },
                            {
                              class: "bg-black text-light-grey",
                              buttons: "{bksp}"
                            }
                          ]}
                          onChange={saldo => this.onChangeSaldo(saldo)}
                          onKeyPress={button => this.onKeyPress(button)}
                        />
                      </div>

                      <div id="keyboardPIN" className={ this.state.keyboardPIN ? "d-block" : "d-none" }>
                        <Keyboard baseClass={"keyboard2"}
                          ref={s => (this.keyboard = s)}
                          layoutName={this.state.layoutName}
                          layout={{
                            default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"]
                          }}
                          display={{
                            '{bksp}': '<i class="fas fa-backspace"></i>',
                            '{enter}': '<i class="fas fa-level-down-alt"></i>',
                            '{shift}': 'shift'
                          }}
                          buttonTheme={[
                            {
                              class: "bg-orange",
                              buttons: "{enter}"
                            },
                            {
                              class: "bg-black text-light-grey",
                              buttons: "{bksp}"
                            }
                          ]}
                          onChange={pin => this.onChangePIN(pin)}
                          onKeyPress={button => this.onKeyPress(button)}
                        />
                      </div>
                      
                    </div>
                  </div>
                
                </div>
                
              </div>

            </div>
            
          </section>
       )}
      </Subscribe>
    )
  }
}

export default SaldoAwal