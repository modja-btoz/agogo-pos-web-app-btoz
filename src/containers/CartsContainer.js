import { Container } from 'unstated'
import axios from 'axios'

const initialState = {
  data: [],
  dataTrx: [],
  dataRefund: {},
  items: [],
  refundItems: [],
  selectedItems: [],
  selectedProduct: {},
  selectedTransaction: {},
  dataReservation : {},
  production: [],
  product: {},
  refund: [],
  trxRefund: [],
  produksi: {total: 0, rusak: 0, lain: 0, catatan: ""},
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
  isBookingDeleteShow: false,
  isBookingEditShow: false,
  isBookingTakeShow: false,
  isDeleteBookingShow: false,
  isEditBookingShow: false,
  isTakeBookingShow: false,
  isRefundTKShow: true,
  isRefundPSShow: false,
  activeInputPayment: '',
  valueInputPayment: '',
  activeInputBooking: '',
  valueInputBooking: '',
  activeInputEditBooking: '',
  valueInputEditBooking: '',
  isTransactionListShow: false,
  isReservationListShow: false,
  isRefundShow: false,
  isRefundItem: false,
  valueInputRefund: '',
  activeInputRefund: '',
  valueInputApproval: '',
  activeInputApproval: '',
  discountType: 'Rp',
  changePayment: 0,
  payment: 0,
  selectedRefund: 'TK',
  whatRefund: 'TK',
  whatBooking: '',
  dpReservationAmount: 0,
  leftToPay: 0,
  date: '',
  currentTrx: '',
  popStatus: false
};

class CartsContainer extends Container {

  constructor(props) {
    super(props)
    this.state = initialState;
  }

  clearCart = () => {
    console.log("CLEAR CART", this.state)
    this.setState(initialState);
  }

  resetProduct = () => {
    console.log("CLEAR CART", this.state.selectedItems)
    this.setState({valueInputRefund: '',
                  activeInputRefund: '',});
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
  onRemoveToRefund = this.onRemoveToRefund.bind(this);
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


  addSelectedProduct(idx, id, name, qty, price, active_path) {
    if(active_path === '/cashier' || active_path === '/booking'){
      axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/cekInvoice`).then(res => {
      const trx = res.data;
      this.setState({ currentTrx: trx.current_invoice});
      // sessionStorage.setItem('transaction', JSON.stringify(transaction));
      })
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
    if (active_path === '/production'){
      axios.get('http://101.255.125.227:82/api/product/' + id).then(res => {
        const product = res.data;
        this.setState({selectedProduct: product})
        console.log(product)
        // product["produksi1"] = 0
        // product["produksi2"] = 0
        // product["produksi3"] = 0
        let index = this.state.production.findIndex( x => x.id === id);
        
        if(index === -1 || id === index){
          this.state.production.push(product)
          console.log(this.state.production)
        } else {
          console.log("produsk")
          console.log(this.state.production)
        }

      })
      this.doProduction(id)
      axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/TrxByProduct/` + id).then(res => {
      const pesan = res.data;
      let index = this.state.production.findIndex( x => x.id === id)
      this.state.produksi["total"+this.state.selectedProduct.name] = pesan.count_order
      this.state.produksi["pemesanan"+this.state.selectedProduct.name] = pesan.count_preorder
      this.state.produksi["total_penjualan"+this.state.selectedProduct.name] = pesan.count_preorder + pesan.count_order
      this.state.produksi["stok_kemarin"+this.state.selectedProduct.name] = pesan.stok_kemarin
      this.setState({
        production: [
           ...this.state.production.slice(0,index),
           Object.assign({}, this.state.production[index], {penjualan_toko: pesan.count_order},
                                                           {penjualan_pemesanan: pesan.count_preorder},
                                                           {total_penjualan: parseInt(pesan.count_preorder) + parseInt(pesan.count_order)},
                                                           {stock_awal: pesan.stok_kemarin},
                                                           {catatan: ""},
                                                           {sisa_stock: parseInt(pesan.stok_kemarin || 0) + parseInt(this.state.production[index].total_produksi || 0) - parseInt(this.state.production[index].total_penjualan || 0)},
                                                           {product_id: id}),
           ...this.state.production.slice(index+1)
        ]
      })
      }) 
    }
  }

addSelectedTransaction(id, current, idx) {
  axios.get('http://101.255.125.227:82/api/order/' + id).then(res => {
    const transaction = res.data;
    console.log(id, current, id)
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
    this.setState({items: this.state.selectedItems, selectedItems:[]}, 
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
    this.setState({
      refund: [id, current],
      currentTrx: current, 
      isTransactionListShow: !this.state.isTransactionListShow,
      selectedItems: []})
  }

  addSelectedReservation(id, current, user_id, total) {
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
                          price: trx.product.price,
                          product_id: trx.product_id,
                          user_id: user_id,
                          total: total,
                          order_id: id
                        })
                      )
                      console.log("INI ", this.state.selectedItems)
                      this.setState({items: this.state.selectedItems}, 
                        () => {this.sumTotalAmount() 
                              this.setState({
                                isAdded: true,
                                  }, 
                                  () => {
                                    this.sumGrandTotalAmount()
                                    setTimeout(() => {
                                    this.setState({
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
    this.setState({
      currentTrx: current,
      selectedItems: []
    })
    console.log(reservationCode)
    }


  takeReservation(what_id) {
    axios.put('https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/preorder/' + what_id, {status: 'PAID'})
  }

  editReservation(user_now, data, what_id) {
    console.log(user_now, data, what_id)
    this.deleteReservation(what_id)
    this.addReservation(user_now, data)
  }
  addReservation(user_now, data) {
    let trx = this.state.items;
    trx.forEach((trx) => this.state.selectedItems.push({
    nama		: data.nama,
    tgl_selesai	: data.tgl_selesai,
    alamat	: data.alamat,
    telepon	: data.telepon,
    catatan	: data.catatan,
    user_id	: user_now.id,
    qty		: trx.qty,
    product_id: trx.id,
    price 	: trx.price,
    subtotal	: this.state.totalAmount,
    diskon	: this.state.discountAmount,
    add_fee	: this.state.expenseAmount,
    uang_muka	: this.state.dpReservationAmount,
    total		: this.state.grandTotalAmountDiscount,
    dibayar	: "",
    kembali	: "",
    status	: "UNPAID"
    }
    ))
    axios.post(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/preorders`, this.state.selectedItems).then(res => console.log(res), this.setState({selectedItems: []}))
  }

  doRefund() {
    let refundCode = this.state.whatRefund + '-' + (this.state.valueInputRefund["refundCode"])
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
      this.setState({dataRefund: refundData}, ()=> this.addSelectedRefundPS(transaction))
      console.log("HU",refundData )
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
        this.setState({dataRefund: refundData}, ()=> this.addSelectedRefundTK(transaction))
        console.log(refundData)
        }
      })
      console.log(refundCode)
      }
  }

  doNextRefund() {
    let dataReservation = this.state.selectedItems
    let dataTransaction = this.state.refundItems
    if(this.state.whatRefund === "PS"){
    dataReservation.forEach(data => 
    this.state.trxRefund.push({
      qty: data.qty,
      price: data.price,
      order_id: "",
      preorder_id: data.order_id,
      product_id: data.product_id,
      total: data.total,
      username_approval: this.state.dataReservation["user"],
      pin_approval: this.state.valueInputRefund["approvalCode"]}))
    axios.post(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/refunds`, this.state.trxRefund).then(res => console.log(res), this.setState({trxRefund: [], selectedItems: []}))
    console.log(this.state.trxRefund)
    }else if (this.state.whatRefund === "TK"){
      dataTransaction.forEach(data => 
        this.state.trxRefund.push({
          qty: data.qty,
          price: data.price,
          order_id: this.state.refund[0],
          preorder_id: "",
          product_id: data.id,
          total: parseInt(data.qty) * parseInt(data.price),
          username_approval: this.state.dataReservation["user"],
          pin_approval: this.state.valueInputRefund["approvalCode"]}))
        axios.post(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/refunds`, this.state.trxRefund).then(res => console.log(res), this.setState({trxRefund: [], selectedItems: []}))
        console.log(this.state.trxRefund)
    }
    // axios.put('https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/order/' + dataRefund.id, this.state.items)
  }

  addSelectedRefundTK(dataParent) {
    let dataRefund = this.state.dataRefund[0]
    this.addSelectedTransaction(dataRefund.id, dataRefund.invoice)
    console.log("BBBBBBBBBBBBB", this.state, dataParent)
  }

  addSelectedRefundPS(dataParent) {
    let dataRefund = this.state.dataRefund[0]
    this.addSelectedReservation(dataRefund.id, dataRefund.invoice, dataRefund.user_id, dataRefund.total)
    // axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/preorder/`, dataRefund.id)
    //   .then(res => {
    //     const data = res.data;
    //     data.forEach(data => {
    //       this.state.selectedItems.push(
    //         {
    //           order_id: "",
              // preorder_id: dataRefund.id,
              // product_id: data.product_id,
              // user_id: dataRefund.user_id,
              // qty: data.qty,
              // price: data.price,
              // total: dataRefund.total,
              // username_approval: this.state.dataReservation["user"],
              // pin_approval: this.state.valueInputRefund["approvalCode"]
    //         }
    //       )
    //     })
    //   })
    console.log("AAAAAAAAAAAAA", dataRefund, this.state.dataRefund, dataParent )
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

  onRemoveToRefund(item) {
    const newArray = [...this.state.items];
    const selected = newArray.splice(item, 1);
    newArray.splice(item, 1);
    const newRefund = [...this.state.refundItems, selected[0]];

    this.setState({
      items: newArray,
      refundItems: newRefund
    },
      () => {
        console.log(newArray, newRefund)
        console.log(this.state.items)
        this.sumTotalAmount()
        setTimeout(() => {
          this.sumGrandTotalAmount()
        }, 10);
      }
    );
  }
  sumTotalAmountPerRefund(idx) {
    let total = 0;
    let item = this.state.refundItems[idx];
    total = item.price * parseInt(item.qty);
    // console.log("TOTAL HARGA PER ITEM", total)
    return total
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
    let dpReservationAmount = parseInt(this.state.dpReservationAmount)
    
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
        let leftToPay = parseInt (grandTotalAmountDiscount - dpReservationAmount)
        this.setState({
          grandTotalAmountDiscount: grandTotalAmountDiscount,
          leftToPay: leftToPay
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
    this.setState({isRefundItem: !this.state.isRefundItem})
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


  isRefundTK = () => {
    console.log("orderBooking")
    this.toggleRefundTK()
  }

  toggleRefundTK = () => {
    this.setState({
      isRefundPSShow: false,
      isRefundTKShow: !this.state.isRefundTKShow
    })
  }
  isRefundPS = () => {
    console.log("orderBooking")
    this.toggleRefundPS()
  }

  toggleRefundPS = () => {
    this.setState({
      isRefundTKShow: false,
      isRefundPSShow: !this.state.isRefundPSShow
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

  // changeBook = event => {

  // }

  onChangeBooking = valueInputBooking => {
    valueInputBooking.preventDefault()
    if(this.state.activeInputBooking === "bookingAddition"){
      const add_fee = valueInputBooking.target.value
      this.setState({expenseAmount: add_fee}, () => this.sumGrandTotalAmount(), this.state.dataReservation["add_fee"] = this.state.expenseAmount)
    }
    if(this.state.activeInputBooking === "paymentDiscount"){
      const discount = valueInputBooking.target.value
      this.setState({discountAmount: discount}, () => this.sumGrandTotalAmount(), this.state.dataReservation["diskon"] = this.state.discountAmount)
    }
    if(this.state.activeInputBooking === "bookingPayment"){
      const dp = valueInputBooking.target.value
      this.state.dataReservation["status"] = "UNPAID";
      this.setState({dpReservationAmount: dp}, () => this.sumGrandTotalAmount(), this.state.dataReservation["dibayar"] = this.state.dpReservationAmount)
    } 
    if (this.state.activeInputBooking === 'bookingName'){
      const name = valueInputBooking.target.value
      this.state.dataReservation["nama"] = name;
    }
    if (this.state.activeInputBooking === 'bookingDate'){
      const date = valueInputBooking.target.value
      this.state.dataReservation["tgl_selesai"] = date;
    }
    if (this.state.activeInputBooking === 'bookingTime'){
      const time = valueInputBooking.target.value
      this.state.dataReservation["jam_selesai"] = time;
    }
    if (this.state.activeInputBooking === 'bookingAddress'){
      const address = valueInputBooking.target.value
      this.state.dataReservation["alamat"] = address;
    }
    if (this.state.activeInputBooking === 'bookingPhone'){
      const phone = valueInputBooking.target.value
      this.state.dataReservation["telepon"] = phone;
    }
    if (this.state.activeInputBooking === 'bookingNote'){
      const note = valueInputBooking.target.value
      this.state.dataReservation["catatan"] = note;
    }
    if (this.state.activeInputBooking === 'note'+this.state.selectedProduct.name){
      const note = valueInputBooking.target.value
      this.state.produksi["note"+this.state.selectedProduct.name] = note;
      let index = this.state.production.findIndex( x => x.id === this.state.selectedProduct.id)
      this.setState({
        production: [
           ...this.state.production.slice(0,index),
           Object.assign({}, this.state.production[index], {catatan: note || ""}),
           ...this.state.production.slice(index+1)
        ]
      })
    }
    if (this.state.activeInputRefund === 'approvalUser'){
      const user = valueInputBooking.target.value
      this.state.dataReservation["user"] = user;
      console.log(user)
    }
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

  resetActiveInputRefund = () => {
    this.setState({
      activeInputRefund: ""
    },
      () => {
        console.log("resetActiveInput", this.state.activeInputRefund)
      }
    );
  }
  setActiveInputRefund = (event) => {
    // console.log('event', event.target.id)
    document.getElementById(event.target.id).focus();
    this.setState({
      activeInputRefund: event.target.id || 0
    },
      () => {
        console.log("setActiveInput", this.state.activeInputRefund)
      }
    );
  }
  onChangeRefund = valueInputRefund => {
    this.setState({
      valueInputRefund: valueInputRefund || 0
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
      this.setState({selectedRefund: event.target.value, whatRefund: event.target.value, isRefundPSShow: !this.state.isRefundPSShow, })
    }
    if (this.state.selectedRefund === 'TK'){
      this.setState({selectedRefund: event.target.value, whatRefund: event.target.value, isRefundPSShow: !this.state.isRefundPSShow, })
    }
  }

  handleDiscountChange= (event) => {
    if (this.state.discountType === 'Rp'){
      this.setState({discountType: event.target.value})
    }
    if (this.state.discountType === '%'){
      this.setState({discountType: event.target.value})
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
    let whatBooking = this.state.refund
    if(whatBooking === ""){
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
    }else{
    this.deleteSelectedOrder(whatBooking[0])
    items.forEach((x) => 
    this.state.data.push({
          invoice: whatBooking[1],
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
    }
    axios.post(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/orders`, this.state.data).then(res => console.log(this, res))
    this.setState({refund: "", data: []})
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

  deleteSelectedOrder(id) {
    axios.delete(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/order/` + id)
    console.log(id)
  }

  deleteReservation(id) {
    axios.delete(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/preorder/` + id)
    console.log(id)
  }

  doProduction = (id) => {
    let qty = this.state.valueInputRefund["refundCode1"] || this.state.valueInputRefund["refundCode2"] || this.state.valueInputRefund["refundCode3"]
              || this.state.valueInputRefund["refundCode4"] || this.state.valueInputRefund["refundCode5"]
    let index = this.state.production.findIndex( x => x.id === id);
    
    if(this.state.activeInputRefund === "refundCode1"){
      this.state.produksi[this.state.selectedProduct.name+"produksi1"] = qty || 0
      this.setState({
        production: [
           ...this.state.production.slice(0,index),
           Object.assign({}, this.state.production[index], {produksi1: qty || 0}, {produksi2: this.state.production[index].produksi2 || 0}, {produksi3: this.state.production[index].produksi3 || 0},
            {total_produksi: parseInt(qty || 0) + parseInt(this.state.production[index].produksi2 || 0) + parseInt(this.state.production[index].produksi3 || 0)},
           {sisa_stock: parseInt(this.state.production[index].sisa_stock || 0) + parseInt(this.state.production[index].total_produksi || 0) - parseInt(this.state.production[index].total_penjualan || 0)}),
           ...this.state.production.slice(index+1)
        ]
      })
    }
    if(this.state.activeInputRefund === "refundCode2"){
      this.state.produksi[this.state.selectedProduct.name+"produksi2"] = qty || 0
      this.setState({
        production: [
           ...this.state.production.slice(0,index),
           Object.assign({}, this.state.production[index], {produksi2: qty || 0}, {produksi1: this.state.production[index].produksi1 || 0}, {produksi3: this.state.production[index].produksi3 || 0},
          {total_produksi: parseInt(qty || 0) + parseInt(this.state.production[index].produksi1 || 0) + parseInt(this.state.production[index].produksi3 || 0)},
           {sisa_stock: parseInt(this.state.production[index].sisa_stock || 0) + parseInt(this.state.production[index].total_produksi || 0) - parseInt(this.state.production[index].total_penjualan || 0)}),
           ...this.state.production.slice(index+1)
        ]
      })
    }
    if(this.state.activeInputRefund === "refundCode3"){
      this.state.produksi[this.state.selectedProduct.name+"produksi3"] = qty || 0
      this.setState({
        production: [
           ...this.state.production.slice(0,index),
           Object.assign({}, this.state.production[index], {produksi3: qty || 0}, {produksi1: this.state.production[index].produksi1 || 0}, {produksi2: this.state.production[index].produksi2 || 0},
           {total_produksi: parseInt(qty || 0) + parseInt(this.state.production[index].produksi1 || 0) + parseInt(this.state.production[index].produksi2 || 0)},
           {sisa_stock: parseInt(this.state.production[index].sisa_stock || 0) + parseInt(this.state.production[index].total_produksi || 0) - parseInt(this.state.production[index].total_penjualan || 0)}),
           ...this.state.production.slice(index+1)
        ]
      })
    }
    if(this.state.activeInputRefund === "refundCode4"){
      this.state.produksi[this.state.selectedProduct.name+"rusak"] = qty || 0
      this.setState({
        production: [
           ...this.state.production.slice(0,index),
           Object.assign({}, this.state.production[index], {ket_rusak: qty || 0}, {total_lain: parseInt(qty || 0) + parseInt(this.state.production[index].ket_lain || 0)},
           {sisa_stock: parseInt(this.state.production[index].sisa_stock || 0) + parseInt(this.state.production[index].total_produksi || 0) - parseInt(this.state.production[index].total_penjualan || 0)}),
           ...this.state.production.slice(index+1)
        ]
      })
    }
    if(this.state.activeInputRefund === "refundCode5"){
      this.state.produksi[this.state.selectedProduct.name+"lain"] = qty || 0
      this.setState({
        production: [
           ...this.state.production.slice(0,index),
           Object.assign({}, this.state.production[index], {ket_lain: qty || 0}, {total_lain: parseInt(qty || 0) + parseInt(this.state.production[index].ket_rusak || 0)},
           {sisa_stock: parseInt(this.state.production[index].sisa_stock || 0) + parseInt(this.state.production[index].total_produksi || 0) - parseInt(this.state.production[index].total_penjualan || 0)}),
           ...this.state.production.slice(index+1)
        ]
      })
    }
    console.log(this.state.produksi)
    console.log(this.state.production)
  }

  // whatisit = (id) => {
  //   let index = this.state.production.findIndex( x => x.id === id);
  //   let produksi1 = this.state.production[index].produksi1
  //   let produksi2 = this.state.production[index].produksi2
  //   let produksi3 = this.state.production[index].produksi3
  //   this.setState({produksi: {produksi1: produksi1, produksi2: produksi2, produksi3: produksi3}})
  // }

  // changeDate = () => {
  //   this.state.product.push({
  //       product_id: this.state.selectedProduct.id,
  //       produksi1: this.state.produksi.produksi1,
  //       produksi2: this.state.produksi.produksi2,
  //       produksi3: this.state.produksi.produksi3,
  //       total_produksi: this.state.produksi.produksi1+
  //                       this.state.produksi.produksi2+
  //                       this.state.produksi.produksi3,
  //       penjualan_toko: this.state.produksi["total"+this.state.selectedProduct.name],
  //       penjualan_pemesanan: this.state.produksi["pemesanan"+this.state.selectedProduct.name],
  //       total_penjualan: this.state.produksi["total"+this.state.selectedProduct.name]+ 
  //                         this.state.produksi["pemesanan"+this.state.selectedProduct.name],
  //       ket_rusak: this.state.produksi[this.state.selectedProduct.name+"rusak"],
  //       ket_lain: this.state.produksi[this.state.selectedProduct.name+"lain"],
  //       total_lain: this.state.produksi[this.state.selectedProduct.name+"rusak"]+
  //                   this.state.produksi[this.state.selectedProduct.name+"lain"],
  //       catatan: "belum",
  //       stock_awal: this.state.produksi["stok_kemarin"+this.state.selectedProduct.name],
  //       sisa_stock: this.state.produksi["stok_kemarin"+this.state.selectedProduct.name]+
  //                   this.state.produksi.produksi1+
  //                   this.state.produksi.produksi2+
  //                   this.state.produksi.produksi3-
  //                   this.state.produksi["total"+this.state.selectedProduct.name]-
  //                   this.state.produksi["pemesanan"+this.state.selectedProduct.name]
  //   })
  // }

  changeDate = () => {
    axios.post(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/postProduction`, this.state.production)
  }

  // changeDate() {
  //   axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/orderByProduct/` + this.state.selectedProduct.id).then(res => {
  //     const toko = res.data;
  //   axios.get(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/preorderByProduct/` + this.state.selectedProduct.id).then(res => {
  //     const pesan = res.data;
  //     this.setState({
  //       product: {
  //         product_id: this.state.selectedProduct.id,
  //         produksi1: this.state.produksi.produksi1,
  //         produksi2: this.state.produksi.produksi2,
  //         produksi3: this.state.produksi.produksi3,
  //         total_produksi: this.state.produksi.produksi1+
  //                         this.state.produksi.produksi2+
  //                         this.state.produksi.produksi3,
  //         penjualan_toko: toko,
  //         penjualan_pemesanan: pesan,
  //         total_penjualan: toko+pesan,
  //         ket_rusak: this.state.produksi.rusak,
  //         ket_lain: this.state.produksi.lain,
  //         total_lain: this.state.produksi.rusak+
  //                     this.state.produksi.lain,
  //         catatan: this.state.produksi.catatan,
  //         stock_awal: "30",
  //         sisa_stock: this.state.selectedProduct+
  //                     this.state.produksi.produksi1+
  //                     this.state.produksi.produksi2+
  //                     this.state.produksi.produksi3
  //       }
  //     })
  //     }) 
  //   })
  //   console.log("Clicked")
  // }
}




export default CartsContainer