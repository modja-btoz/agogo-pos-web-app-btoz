import React, { Component } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./CalcNumeric.scss";

class CalcNumeric extends Component {
  constructor(props){
    super(props)
  }
  state = {
    layoutName: "default"
  };

  onKeyPress = button => {
    // console.log("Button pressed", button);
    if ( button === "{enter}" ) {
      this.onEnterRefund(button);
    }
  };
  onEnterRefund = (button) => {
    console.log("Button ENTER pressed", button);

    // JALANKAN FUNGSI DARI PARENT
    this.props.onEnterRefund(this.props.modalStore)
  };

  render() {
    return (
      <div>
        {/* <input
          value={this.state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={e => this.onChangeInput(e)}
        /> */}
        <Keyboard
          ref={r => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          layout={{
            default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"]
          }}
          display={{
            '{bksp}': '<i class="fas fa-backspace"></i>',
            '{enter}': '<i class="fas fa-level-down-alt"></i>'
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
          inputName={this.props.cartStore.state.activeInputRefund}
          onChangeAll={inputs => this.props.cartStore.onChangeRefund(inputs)}
          onKeyPress={button => this.onKeyPress(button)}
        />
      </div>
    );
  }
}

export default CalcNumeric