import { Container } from 'unstated'
import axios from 'axios'

const initialState = {
  items: [],
  selectedItems: [],
  selectedProduct: {},
  selectedTransaction: {},
  isAdded: false,
  isCalcNumericCartOpen: false,
  inputQtyCartItem: '',
  selectedQtyID: '',
  layoutName: "default",
  onReset: false,
  activeItem: -1,
  totalAmount: 0,
  discountAmount: 0,
  discountPercentage: 0, 
  expenseAmount: 0,
  grandTotalAmount: 0,
  grandTotalAmountDiscount: 0,
  bookingAmount:0,
  isCashierOverlayShow: false,
  isPaymentCheckoutShow: false,
  isOrderBookingShow: false,
  isDeleteBookingShow: false,
  isEditBookingShow: false,
  isTakeBookingShow: false,
  valueInputPayment: '',
  activeInputPayment: '',
  valueInputPayment: '',
  activeInputBooking: '',
  valueInputBooking: '',
  activeInputBookingPayment: '',
  valueInputBookingPayment: '',
  isTransactionListShow: false,
  isReservationListShow: false,
  isRefundShow: false,
  valueInputRefund: '',
  activeInputRefund: '',
  valueInputApproval: '',
  activeInputApproval: '',
  discountType: 'Rp',
  changePayment: 0
};

class CartsContainer extends Container {

  constructor(props) {
    super(props)
    this.state = initialState;
  }

  clearCart = () => {
    console.log("CLEAR CART")
    this.setState(initialState);
  }


  componentWillMount(){
    this.setState({
      windowInnerHeight: window.innerHeight
    },
      () => {
        this.setState({
          productItemsHeight: this.state.windowInnerHeight - 114
        })
      }
    );
  }


  // ===============
  // CART ACTION
  // ===============
  onAddToCart = this.onAddToCart.bind(this);
  onRemoveFromCart = this.onRemoveFromCart.bind(this);

  onAddToCart(selectedProduct) {

    let id = selectedProduct.id
    let user_id = selectedProduct.user_id
    let qty = selectedProduct.qty
    let index = this.state.items.findIndex( x => x.id === id);

    if (index === -1 || id === index){
      // console.log("ADD NEW")
      this.setState({
        items: [...this.state.items, selectedProduct]
      },
        () => {
          // console.log('ITEMS Updated!');
          // console.log(this.state.items)

          this.sumTotalAmount()

          this.setState({
            isAdded: true,
            selectedProduct: {}
          },
            () => {
              this.sumGrandTotalAmount()

              setTimeout(() => {
                this.setState({
                  isAdded: false
                });
              }, 3500);
            }
          );
        }
      );
    }else{
      let currentQty = this.state.items[index].qty
      // console.log("CURRENT QTY", currentQty)

      // console.log("UPDATE w/ SELECTED ID", qty, id)
      this.onUpdateItem(id, Number(currentQty) + 1)
    }
    
  }


  addSelectedProduct(idx, id, name, qty, price) {
    this.setState(
      {
        selectedProduct: {
          idx: idx,
          id: id,
          name: name,
          qty: qty,
          price: price
        }
      },
      () => {
        this.onAddToCart(this.state.selectedProduct);
        console.log(this.state.selectedProduct)
        console.log(this.state.items)
      }
    );
  }

  addSelectedTransaction(id, idx) {
  axios.get('https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/order/' + id)
  .then(res => {
    const transaction = res.data;
    transaction.map((trx) =>
      this.setState (
        {
          selectedProduct: {
          idx: idx,
          id: trx.product_id,
          name: trx.product.name,
          qty: trx.qty,
          price: trx.price
        }
      },
      () => {
        this.onAddToCart(this.state.selectedProduct);
        console.log(this.state.selectedProduct)
        console.log(this.state.items)
      }
    )
  )
  })
}

//   addSelectedTransaction(id) {
//     axios.get('https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/order/' + id)
//     .then (res => {
//       const transaction = res.data;
//       console.log("transaction", transaction);
//       this.setState({selectedTransaction: []})
//       console.log("transaction", this.selectedTransaction);
//       // this.setState({items: [...this.state.items, this.transaction]})

//   })
// }

// addSelectedTransaction(id) {
//     axios.get('https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/order/' + id)
//     .then (res => {
//       const transaction = res.data;
//       console.log("Transaksi", transaction)
//       transaction.map((trx, i) =>
//       this.setState (
//         {
//           selectedTransaction: {
//           idx: i,
//           id: trx.product_id,
//           name: trx.product.name,
//           qty: trx.qty,
//           price: trx.price
//         }
//       },
//       () => {
//         // this.onAddTrxToCart(this.state.selectedTransaction);
//         console.log("Items",this.state.items)
//         console.log("Selected",this.state.selectedTransaction)
//         // console.log("PARSE",JSON.parse(transaction))
//       }
//     )
//   )
  
//   })
// }

//   addSelectedTransaction(id) {
//     axios.get('https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/order/' + id)
//     .then (res => {
//       const transaction = res.data;
//       transaction.map((trx, i) =>
//       this.setState (
//         {
//           selectedTransaction : {
//           idx: i,
//           id: trx.product_id,
//           name: trx.product.name,
//           qty: trx.qty,
//           price: trx.price
//         }
//       },
//       () => {
//         this.onAddTrxToCart(this.state.selectedTransaction);
//         console.log("Items",this.state.items)
//         console.log("Selected",this.state.selectedTransaction)
//       }
//     )
//   )
  
//   })
// }

  // addSelectedTransaction(id) {
  //   this.setState(
  //     {
  //       selectedTransaction: {
  //         id: id,
  //         name: ""
  //       }
  //     },
  //     () => {
  //       axios.get('https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/order/' + id)
  //       .then(res => {
  //       const transaction = res.data;
  //       this.setState({ items: transaction}, 
  //         () => this.sumTotalAmount());})
        
        
  //       // this.onAddToCart(this.state.selectedProduct);
  //       console.log(this.state.selectedTransaction)
  //       console.log(this.state.items)
  //       // console.log(JSON.stringify(this.state.items))
  //       // console.log(JSON.parse(this.state.items))
  //     }
  //   );
  // }
  
  setSelectedQtyID = (idx, id, currentQty) => {
    this.setState({
      selectedQtyID: id,
      inputQtyCartItem: currentQty,
      isCalcNumericCartOpen: true,
      onReset: true,
      activeItem: idx,
      isCashierOverlayShow: true
    });
  }

  onUpdateItem(id, newQty) {
    let index = this.state.items.findIndex( x => x.id === id);
    let currentQty = this.state.items[index].qty;
    let updateQty = currentQty + 1;
    // console.log(currentQty)
    if (index === -1){
      console.log("ERROR")
      // handle error
    }else{
      this.setState({
        items: [
           ...this.state.items.slice(0,index),
           Object.assign({}, this.state.items[index], {qty: newQty}),
           ...this.state.items.slice(index+1)
        ]
      },
        () => {
          // this.sumTotalAmountPerItem(index)
          this.sumTotalAmount()
          setTimeout(() => {
            this.sumGrandTotalAmount()
          }, 1);
          this.onCloseCalc()
        } 
      );
    }
  }

  onRemoveFromCart(item) {
    const newArray = [...this.state.items];
    newArray.splice(item, 1);

    this.setState({
      items: newArray
    },
      () => {
        this.sumTotalAmount()
        setTimeout(() => {
          this.sumGrandTotalAmount()
        }, 10);
      }
    );
  }

  sumTotalAmountPerItem(idx) {
    let total = 0;
    let item = this.state.items[idx];
    total = item.price * parseInt(item.qty);
    // console.log("TOTAL HARGA PER ITEM", total)
    return total
  }
  sumTotalAmount() {
    let total = 0;
    let items = this.state.items;
    for (var i = 0; i < items.length; i++) {
      total += items[i].price * parseInt(items[i].qty);
    }
    this.setState({
      totalAmount: total
    });
  }
  sumGrandTotalAmount() {
    let sumTotalAmount = this.state.totalAmount
    let otherExpenses = parseInt( this.state.expenseAmount )
    let grandTotalAmount = parseInt( sumTotalAmount - otherExpenses )
    
    let discountAmount;
    if(this.state.discountType === '%'){
      discountAmount = parseInt( sumTotalAmount * (this.discountPercentage()/100) )
    }
    if(this.state.discountType === 'Rp'){
      console.log("this.discountPrice", this.discountPrice())
      discountAmount = parseInt( this.discountPrice() )
    }

    this.setState({
      discountAmount: discountAmount,
      grandTotalAmount: grandTotalAmount
    },
      () => {
        let grandTotalAmountDiscount = parseInt( sumTotalAmount - discountAmount )
        this.setState({
          grandTotalAmountDiscount: grandTotalAmountDiscount
        },
          () => {
            this.sumChangePayment()
          }
        )
      }
    )
  }

  discountPercentage(){
    let discount = this.state.valueInputPayment["paymentDiscount"] || this.state.valueInputBooking["paymentDiscount"]
    if(discount === undefined || discount === ''){
      discount = 0;
    }
    if(discount > 100){
      discount = 100;
    }
    console.log("DISCOUNT", discount)
    this.setState({
      discountPercentage: discount
    })
    return discount
  }

  discountPrice(){
    let discount = this.state.valueInputPayment["paymentDiscount"] || this.state.valueInputBooking["paymentDiscount"]
    let sumTotalAmount = parseInt( this.state.totalAmount )
    if(discount === undefined || discount === ''){
      discount = 0;
    }
    if(discount >= sumTotalAmount){
      discount = sumTotalAmount;
    }
    return discount
  }

  sumChangePayment() {
    let totalPayment = parseInt( this.state.valueInputPayment["paymentTotal"] || this.state.valueInputBooking["bookingAddition"])
    console.log("sumChangePayment", totalPayment)
    if(isNaN(totalPayment)){
      totalPayment = 0
    }

    let grandTotalAmountDiscount =  parseInt( this.state.grandTotalAmountDiscount )
    let changePayment = parseInt( totalPayment - grandTotalAmountDiscount )
    
    this.setState({
      changePayment: changePayment
    })
  }

  sumChangeAdditionalCost() {
    let totalAdditional = parseInt(this.state.valueInputBooking["additionalCost"])
    console.log("sumChangeAdditionalCost", totalAdditional)
  }


  // ===============
  // KEYBOARD ACTION
  // ===============
  onChange = inputQtyCartItem => {
    this.setState({
      inputQtyCartItem: inputQtyCartItem
    });
    // console.log("Input changed", inputQtyCartItem);
  };

  onKeyPress = (button) => {
    // console.log("Button pressed", button);
    if (button === "{enter}") {
      this.onEnter(this.state.selectedQtyID, this.state.inputQtyCartItem);
    }
  };

  onEnter = (id, newQty) => {
    // console.log("Button ENTER pressed");
    this.onUpdateItem(id, newQty)
  };

  onOpenCalc = () =>{
    this.setState({
      isCalcNumericCartOpen: true
    })
  }

  onCloseCalc = () =>{
    this.setState({
      isCalcNumericCartOpen: false,
      activeItem: -1,
      isCashierOverlayShow: false
    })
  }
  
  // /END KEYBOARD ACTION

  toggleCashierOverlayShow = () => {
    this.setState({
      isCashierOverlayShow: !this.state.isCashierOverlayShow
    })
  }



  // ===============
  // PAYMENT ACTIONS
  // ===============
  paymentCheckout = () => {
    // console.log("paymentCheckout")
    this.togglePaymentCheckoutShow()
  }

  togglePaymentCheckoutShow = () => {
    this.setState({
      isReservationListShow: false,
      isTransactionListShow: false,
      isRefundShow: false,
      isPaymentCheckoutShow: !this.state.isPaymentCheckoutShow
    })
  }

  // =============
  // ORDER ACTIONS
  // =============
  orderBooking = () => {
    console.log("orderBooking")
    this.toggleOrderBookingShow()
  }

  toggleOrderBookingShow = () => {
    this.setState({
      isDeleteBookingShow: false,
      isEditBookingShow: false,
      isTakeBookingShow: false,
      isOrderBookingShow: !this.state.isOrderBookingShow
    })
  }

  // ===================
  // SHOW DELETE ACTIONS
  // ===================
  deleteBooking = () => {
    console.log("deleteBooking")
    this.toggleDeleteBookingShow()
  }

  toggleDeleteBookingShow = () => {
    this.setState({
      isOrderBookingShow: false,
      isDeleteBookingShow: false,
      isTakeBookingShow: false,
      isDeleteBookingShow: !this.state.isDeleteBookingShow
    })
  }

  editBooking = () => {
    console.log("editBooking");
    this.toggleEditBookingShow()
  }

  toggleEditBookingShow = () => {
    this.setState({
      isOrderBookingShow: false,
      isDeleteBookingShow: false,
      isTakeBookingShow: false,
      isEditBookingShow: !this.state.isEditBookingShow
    })
  }

  takeBooking = () => {
    console.log("takeBooking");
    this.toggleTakeBookingShow()
  }

  toggleTakeBookingShow = () => {
    this.setState({
      isOrderBookingShow: false,
      isDeleteBookingShow: false,
      isEditBookingShow: false,
      isTakeBookingShow: !this.state.isTakeBookingShow
    })
  }

  moveCaretAtEnd(e) {
    let temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  }

  setActiveInputPayment = (event) => {
    // console.log('event', event.target.id)
    document.getElementById(event.target.id).focus();
    this.setState({
      activeInputPayment: event.target.id
    },
      () => {
        console.log("setActiveInput", this.state.activeInputPayment)
      }
    );
  }

  onChangePayment = valueInputPayment => {
    this.setState({
      valueInputPayment: valueInputPayment
    },
      () =>{
        this.sumGrandTotalAmount()
      }
    );
    console.log("Input changed", valueInputPayment);
  };

  setActiveInputBooking = (event) => {
    document.getElementById(event.target.id).focus();
    this.setState({
      activeInputBooking: event.target.id,
      // expenseAmount: event.target.value
    },
      () => {
        console.log("setActiveInput", this.state.activeInputBooking)
      }
    )
  }

  onChangeBooking = valueInputBooking => {
    this.setState({
      valueInputBooking: valueInputBooking
    },
      () => {
        this.sumGrandTotalAmount()
      }
    )
    console.log("Input change", valueInputBooking)
  }

  // setActiveInputBookingPayment = (event) => {
  //   document.getElementById(event.target.id).focus();
  //   this.setState({
  //     bookingAmount: event.target.value
  //   },
  //     () => {
  //       console.log("valueInputBookingPayment", this.state.bookingAmount)
  //     }
  //   )
  // }

  // onChangeBookingPayment = valueInputBookingPayment => {
  //   this.setState({
  //     valueInputBookingPayment: valueInputBookingPayment
  //   },
  //     () => {
  //       this.sumGrandTotalAmount()
  //     }
  //   )
  //   console.log("Input change", valueInputBookingPayment)
  // }

  onKeyPressPayment = (button) => {
    console.log("Button pressed", button);

    if (button === "{rp}") {
      this.setState({
        discountType: 'Rp'
      })
    }
    if (button === "{percentage}") {
      this.setState({
        discountType: '%'
      })
    }
    if (button === "{enter}") {
      this.onEnterPayment();
    }
  };

  onResetPayment = () => {
    this.setState({
      grandTotalAmountDiscount: this.state.totalAmount,
      discountAmount: 0
    })
  }

  onEnterPayment = () => {
    console.log("Button ENTER pressed");
    this.sumChangePayment()
  };





  // ===============
  // SHOW TRX ACTIONS
  // ===============
  openTransaction = () => {
    // console.log("OpenTransaction")
    this.toggleOpenTransactionShow()
  }

  toggleOpenTransactionShow = () => {
    this.setState({
      isReservationListShow: false,
      isRefundShow: false,
      isPaymentCheckoutShow: false,
      isTransactionListShow: !this.state.isTransactionListShow,
    })
  };

  // ===============
  // SHOW TRX ACTIONS
  // ===============
  openReservation = () => {
    // console.log("OpenReservation")
    this.toggleOpenReservationShow()
  }

  toggleOpenReservationShow = () => {
    this.setState({
      isTransactionListShow: false,
      isRefundShow: false,
      isPaymentCheckoutShow: false,
      isReservationListShow: !this.state.isReservationListShow
    })
  };

  // ===============
  // SHOW TRX ACTIONS
  // ===============
  openRefund = () => {
    // console.log("OpenReservation")
    this.toggleOpenRefundShow()
  }

  toggleOpenRefundShow = () => {
    this.setState({
      isReservationListShow: false,
      isTransactionListShow: false,
      isPaymentCheckoutShow: false,
      isRefundShow: !this.state.isRefundShow
    })
  }

  setActiveInputRefund = (event) => {
    // console.log('event', event.target.id)
    document.getElementById(event.target.id).focus();
    this.setState({
      activeInputRefund: event.target.id
    },
      () => {
        console.log("setActiveInput", this.state.activeInputRefund)
      }
    );
  }
  onChangeRefund = valueInputRefund => {
    this.setState({
      valueInputRefund: valueInputRefund
    });
    console.log("Input changed", valueInputRefund);
  };

  handleChange= (event) => {
    if (this.state.activeInputBooking === 'bookingAddition'){
      this.setState({expenseAmount: event.target.value})
    } 
    else if (this.state.activeInputBooking === 'paymentDiscount'){
      this.setState({discountAmount: event.target.value})
    }
    else if (this.state.activeInputBooking === 'bookingPayment'){
      this.setState({bookingAmount: event.target.value})
    }
  }
  
  deleteOrder = (id) => {
    axios.get('https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/preorder/' + id)
    .then(res => {
      const transaction = res.data;
      console.log(transaction)
    //   transaction.map((trx) =>
    //     this.setState (
    //       {
    //         selectedProduct: {
    //         idx: idx,
    //         id: trx.product_id,
    //         name: trx.product.name,
    //         qty: trx.qty,
    //         price: trx.price
    //       }
    //     },
    //     () => {
    //       this.onAddToCart(this.state.selectedProduct);
    //       console.log(this.state.selectedProduct)
    //       console.log(this.state.items)
    //     }
    //   )
    // )
    })
  }


}

export default CartsContainer