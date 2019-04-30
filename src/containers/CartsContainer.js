import { Container } from 'unstated'
import axios from 'axios'

const initialState = {
  data: [],
  dataTrx: [],
  dataRefund: {},
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
  isReservationCheckoutShow: false,
  isOrderBookingShow: false,
  isOrderBookingDeleteShow: false,
  isOrderBookingEditShow: false,
  isOrderBookingTakeShow: false,
  isBookingDelete: false,
  isBookingEdit: false,
  isBookingTake: false,
  isDeleteBookingShow: false,
  isEditBookingShow: false,
  isTakeBookingShow: false,
  activeInputPayment: '',
  valueInputPayment: '',
  activeInputBooking: '',
  valueInputBooking: '',
  activeInputEditBooking: '',
  valueInputEditBooking: '',
  isTransactionListShow: false,
  isReservationListShow: false,
  isRefundShow: false,
  valueInputRefund: '',
  activeInputRefund: '',
  valueInputApproval: '',
  activeInputApproval: '',
  discountType: 'Rp',
  changePayment: 0,
  payment: 0,
  selectedRefund: 'PS',
  whatRefund: 'PS',
  whatBooking: '',
  dpReservationAmount: 0,
  leftToPay: 0,
  popStatus: false
};

class CartsContainer extends Container {

  constructor(props) {
    super(props)
    this.state = initialState;
  }

  clearCart = () => {
    console.log("CLEAR CART", this.state.selectedItems)
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
      console.log("ADD NEW", index)
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
  axios.get('http://101.255.125.227:82/api/order/' + id).then(res => {
    const transaction = res.data;
    transaction.forEach((trx) =>
      this.state.selectedItems.push({
        idx: idx,
        id: trx.product_id,
        name: trx.product.name,
        qty: trx.qty,
        price: trx.product.price
      })
    )
    console.log("INI ", this.state.selectedItems)
    this.setState({items: this.state.selectedItems}, 
      () => {this.sumTotalAmount() 
            this.setState({
              isAdded: true,
              selectedItems: []}, 
                () => {
                  this.sumGrandTotalAmount()
                  setTimeout(() => {
                  this.setState({
                    isAdded: false,
                    selectedItems: []
                });
              }, 3500);
            }
          )
        }
      )
    })
  }

  addSelectedReservation(id) {
    let reservationCode = id
    axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/preorders`)
    .then(res => {
      const transaction = res.data;
      let reservationData = transaction.filter(function(data) {
        return data.id === reservationCode
      });
      if(reservationData.length === 0){
        console.log("GAGAL COY")
      } else {
      this.setState({dpReservationAmount: reservationData[0].uang_muka,  
                    changePayment: reservationData[0].subtotal - reservationData[0].uang_muka,
                    expenseAmount: reservationData[0].add_fee,
                    discountAmount: reservationData[0].discount},
                    () => axios.get('http://101.255.125.227:82/api/preorder/' + id).then(res => {
                      const transaction = res.data;
                      transaction.forEach((trx, i) =>
                        this.state.selectedItems.push({
                          idx: i,
                          id: trx.product_id,
                          name: trx.product.name,
                          qty: trx.qty,
                          price: trx.product.price
                        })
                      )
                      console.log("INI ", this.state.selectedItems)
                      this.setState({items: this.state.selectedItems}, 
                        () => {this.sumTotalAmount() 
                              this.setState({
                                isAdded: true,
                                selectedItems: []
                                  }, 
                                  () => {
                                    this.sumGrandTotalAmount()
                                    setTimeout(() => {
                                    this.setState({
                                      selectedItems: [],
                                      isAdded: false
                                  });
                                }, 3500);
                              }
                            )
                          }
                        )
                      }))
      console.log(reservationData, id)
      }
    })
    console.log(reservationCode)
    }

  doRefund() {
    let refundCode = this.state.whatRefund + '-' + (this.state.valueInputRefund["refundCode"] || "")
    if(this.state.whatRefund === 'PS'){
    axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/preorders`)
    .then(res => {
      const transaction = res.data;
      let refundData = transaction.filter(function(data) {
        return data.invoice === refundCode
      });
      if(refundData.length === 0){
        console.log("GAGAL COY")
      } else {
      this.setState({dataRefund: refundData}, ()=> this.addSelectedRefundPS())
      console.log(refundData)
      }
    })
    console.log(refundCode)
    }
    if(this.state.whatRefund === 'TK'){
      axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/orders`)
      .then(res => {
        const transaction = res.data;
        let refundData = transaction.filter(function(data) {
          return data.invoice === refundCode
        });
        if(refundData.length === 0){
          console.log("GAGAL COY")
        } else {
        this.setState({dataRefund: refundData}, ()=> this.addSelectedRefundTK())
        console.log(refundData)
        }
      })
      console.log(refundCode)
      }
  }

  addSelectedRefundTK() {
    let dataRefund = this.state.dataRefund[0]
    this.addSelectedTransaction(dataRefund.id)
  }

  addSelectedRefundPS() {
    let dataRefund = this.state.dataRefund[0]
    this.addSelectedReservation(dataRefund.id)
  }


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
        let grandTotalAmountDiscount = parseInt( sumTotalAmount - discountAmount + otherExpenses )
        this.setState({
          grandTotalAmountDiscount: grandTotalAmountDiscount,
          leftToPay: grandTotalAmountDiscount - this.state.dpReservationAmount
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
    let discount = this.state.valueInputPayment["paymentDiscount"] || this.state.valueInputBooking["paymentDiscount"] || this.state.discountAmount
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
    this.setState({payment: totalPayment})
    if(isNaN(totalPayment)){
      totalPayment = 0
    }

    let grandTotalAmountDiscount =  parseInt( this.state.grandTotalAmountDiscount )
    let dpReservationAmount = this.state.dpReservationAmount
    let changePayment = parseInt( totalPayment - grandTotalAmountDiscount + dpReservationAmount )
    
    this.setState({
      changePayment: changePayment
    })
  }

  onEnterRefund = () => {
    // console.log("Button ENTER pressed");
    this.doRefund()
  };

  

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
      isReservationCheckoutShow: false,
      isPaymentCheckoutShow: !this.state.isPaymentCheckoutShow
    })
  }

  reservationCheckout = () => {
    // console.log("paymentCheckout")
    this.toggleReservationCheckoutShow()
  }

  toggleReservationCheckoutShow = () => {
    this.setState({
      isReservationListShow: false, 
      isTransactionListShow: false,
      isRefundShow: false,
      isPaymentCheckoutShow: false,
      isReservationCheckoutShow: !this.state.isReservationCheckoutShow
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
      isOrderBookingDeleteShow: false,
      isOrderBookingEditShow: false,
      isOrderBookingTakeShow: false,
      isOrderBookingShow: !this.state.isOrderBookingShow
    })
  }

  orderBookingDelete = () => {
    console.log("orderBookingDelete")
    this.setState({whatBooking: 'deleteBooking'})
    this.toggleOrderBookingDeleteShow()
  }

  toggleOrderBookingDeleteShow = () => {
    this.setState({
      isOrderBookingShow: false,
      isOrderBookingEditShow: false,
      isOrderBookingTakeShow: false,
      isOrderBookingDeleteShow: !this.state.isOrderBookingDeleteShow,
    })
  }

  orderBookingEdit = () => {
    console.log("orderBooking")
    this.setState({whatBooking: 'editBooking'})
    this.toggleOrderBookingEditShow()
  }

  toggleOrderBookingEditShow = () => {
    this.setState({
      isOrderBookingShow: false,
      isOrderBookingDeleteShow: false,
      isOrderBookingTakeShow: false,
      isOrderBookingEditShow: !this.state.isOrderBookingEditShow,
    })
  }
  orderBookingTake = () => {
    console.log("orderBooking")
    this.setState({whatBooking: 'takeBooking'})
    this.toggleOrderBookingTakeShow()
  }

  toggleOrderBookingTakeShow = () => {
    this.setState({
      isOrderBookingShow: false,
      isOrderBookingDeleteShow: false,
      isOrderBookingEditShow: false,
      isOrderBookingTakeShow: !this.state.isOrderBookingTakeShow,
    })
  }

  bookingDelete = () => {
    // console.log("orderBooking")
    this.toggleBookingDeleteShow()
  }

  toggleBookingDeleteShow = () => {
    // console.log()
    this.setState({
      isOrderBookingShow: false,
      isOrderBookingDeleteShow: false,
      isOrderBookingEditShow: false,
      isOrderBookingTakeShow: false,
      isBookingEditShow: false,
      isBookingTakeShow: false,
      isBookingDeleteShow: !this.state.isBookingDeleteShow,
    })
  }

  bookingEdit = () => {
    // console.log("orderBooking")
    this.toggleBookingEditShow()
  }

  toggleBookingEditShow = () => {
    // console.log()
    this.setState({
      isOrderBookingShow: false,
      isOrderBookingDeleteShow: false,
      isOrderBookingEditShow: false,
      isOrderBookingTakeShow: false,
      isBookingDeleteShow: false,
      isBookingTakeShow: false,
      isBookingEditShow: !this.state.isBookingEditShow,
    })
  }

  bookingTake = () => {
    // console.log("orderBooking")
    this.toggleBookingTakeShow()
  }

  toggleBookingTakeShow = () => {
    // console.log()
    this.setState({
      isOrderBookingShow: false,
      isOrderBookingDeleteShow: false,
      isOrderBookingEditShow: false,
      isOrderBookingTakeShow: false,
      isBookingEditShow: false,
      isBookingDeleteShow: false,
      isBookingTakeShow: !this.state.isBookingTakeShow,
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

  setActiveInputEditBooking = (event) => {
    document.getElementById(event.target.id).focus();
    this.setState({
      activeInputEditBooking: event.target.id,
    },
      () => {
        console.log("setActiveInput", this.state.activeInputEditBooking)
      }
    )
  }

  onChangeEditBooking = (valueInputEditBooking) => {
    this.setState({
      valueInputEditBooking: valueInputEditBooking.target.value
    })
    console.log("Input change", valueInputEditBooking.target.value)
  }

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
      isReservationCheckoutShow: false,
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
      isReservationCheckoutShow: false,
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
      isReservationCheckoutShow: false,
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

  // handleChange= (event) => {
  //   if (this.state.activeInputBooking === 'bookingAddition'){
  //     this.setState({expenseAmount: event.target.value})
  //   } 
  //   else if (this.state.activeInputBooking === 'paymentDiscount'){
  //     this.setState({discountAmount: event.target.value})
  //   }
  //   else if (this.state.activeInputBooking === 'bookingPayment'){
  //     this.setState({bookingAmount: event.target.value})
  //   }
  // }

  handleRefundChange= (event) => {
    console.log("PENCET", this.state.selectedRefund, this.state.valueInputRefund)
    if (this.state.selectedRefund === 'PS'){
      this.setState({selectedRefund: event.target.value, whatRefund: event.target.value})
    }
    if (this.state.selectedRefund === 'TK'){
      this.setState({selectedRefund: event.target.value, whatRefund: event.target.value})
    }
  }

  // handleBookingChange= (event) => {
  //   if (this.state.activeInputEditBooking === 'biaya_tambahan'){
  //     this.setState({add_fee: event.target.value})
  //   }else{
  //     console.log('wew')
  //   }
  // }

  doTransaction(user_id, items) {
    items.forEach((x) => 
    this.state.data.push({
          user_id: user_id,
          product_id: x.id,
          qty: x.qty,
          price: x.price,
          subtotal: this.state.totalAmount,
          diskon: this.state.discountAmount,
          total: this.state.grandTotalAmountDiscount,
          dibayar: this.state.payment,
          kembali: this.state.changePayment,
          status: "PAID",
        })
    )
    axios.post(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/orders`, this.state.data)
    this.setState({ redirect: true })
  }
  
  doOrder = (id) => {
    let orderCode = id
    axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/preorders`)
    .then(res => {
      const transaction = res.data;
      let orderData = transaction.filter(function(data) {
        return data.id === orderCode
      });
      if(orderData.length === 0){
        console.log("GAGAL COY")
      } else {
      this.setState({dataTrx: orderData[0]}, 
        () => {if(this.state.whatBooking === 'deleteBooking'){
                this.deleteOrder(id)
                console.log("delete booking")
              }
              if(this.state.whatBooking === 'editBooking') {
                this.editOrder(id)
                this.setState({popStatus: !this.state.popStatus})
                console.log("edit booking")
              }
              if(this.state.whatBooking === 'takeBooking') {
                this.takeOrder(id)
                console.log("take boking")
              }})

      console.log(orderData, id)
      }
    })
    // console.log(reservationCode)
  }

  deleteOrder = (id) => {
    this.bookingDelete()
    this.addSelectedReservation(id)
    console.log("do delete booking") 
  }

  editOrder = (id) => {
    this.bookingEdit()
    this.addSelectedReservation(id)
    console.log("do edit booking") 
  }
  takeOrder = (id) => {
    this.bookingTake()
    this.addSelectedReservation(id)
    console.log("do edit booking") 
  }

  // deleteOrder = (id) => {
  //   axios.get('https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/preorder/' + id)
  //   .then(res => {
  //     const transaction = res.data;
  //     if(this.state.whatBooking === 'deleteBooking'){
  //       this.bookingDo()
  //       this.addSelectedReservation(id)
  //       console.log("edit", transaction, this.state.dataTrx)
  //     }
  //     if(this.state.whatBooking === 'editBooking') {
  //       console.log("edit", transaction)
  //     }
  //     if(this.state.whatBooking === 'takeBooking') {
  //       console.log("take", transaction)
  //     }
  //   })
  // }

  deleteReservation(id) {
    axios.delete(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/preorder/` + id)
    console.log(id)
  }


}

export default CartsContainer