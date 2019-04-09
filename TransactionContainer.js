import { Container } from 'unstated'

const initialState = {
  list: [],
  // selectedProduct: {},
  // isAdded: false,
  // isCalcNumericCartOpen: false,
  // inputQtyCartItem: '',
  // selectedQtyID: '',
  // layoutName: "default",
  // onReset: false,
  // activeItem: -1,
  // totalAmount: 0,
  // discountAmount: 0,
  // discountPercentage: 0,
  // expenseAmount: 0,
  // grandTotalAmount: 0,
  // grandTotalAmountDiscount: 0,
  // isCashierOverlayShow: false,
  // isPaymentCheckoutShow: false,
  // isTransactionListShow: false,
  // isReservationListShow: false,
  // isRefundShow: false,
  // valueInputRefund: '',
  // activeInputRefund: '',
  // valueInputApproval: '',
  // activeInputApproval: '',
  // valueInputPayment: '',
  // activeInputPayment: '',
  // discountType: 'Rp',
  // changePayment: 0
};

class TransactionContainer extends Container {

  constructor(props) {
    super(props)
    this.state = initialState;
  }

  fetchTransaction() {
    // axios.get(`http://gigit.store/wp-json/wp/v2/product?_embed`)
    axios.get(`http://dev.wakwaw.com/agogo/wp-json/wp/v2/produk?_embed`)
    .then(res => {
      const transactions = res.data.data.children.map(obj => obj.data);
      this.setState({transactions}
      );
    })
  }

  // deleteSelectedTransaction= () => {
  //   console.log("CLEAR TRX")
  //   this.setState(initialState);
  // }

  // componentWillMount(){
  //   this.setState({
  //     windowInnerHeight: window.innerHeight
  //   },
  //     () => {
  //       this.setState({
  //         productItemsHeight: this.state.windowInnerHeight - 114
  //       })
  //     }
  //   );
  // }

  // // ===============
  // // CART ACTION
  // // ===============
  // onAddToCart = this.onAddToCart.bind(this);
  // onRemoveFromCart = this.onRemoveFromCart.bind(this);

  // onAddToCart(selectedProduct) {

  //   let id = selectedProduct.id
  //   let qty = selectedProduct.qty
  //   let index = this.state.list.findIndex( x => x.id === id);

  //   if (index === -1 || id === index){
  //     // console.log("ADD NEW")
  //     this.setState({
  //       items: [...this.state.items, selectedProduct]
  //     },
  //       () => {
  //         // console.log('ITEMS Updated!');
  //         // console.log(this.state.items)

  //         this.sumTotalAmount()

  //         this.setState({
  //           isAdded: true,
  //           selectedProduct: {}
  //         },
  //           () => {
  //             this.sumGrandTotalAmount()

  //             setTimeout(() => {
  //               this.setState({
  //                 isAdded: false
  //               });
  //             }, 3500);
  //           }
  //         );
  //       }
  //     );
  //   }else{
  //     let currentQty = this.state.items[index].qty
  //     // console.log("CURRENT QTY", currentQty)

  //     // console.log("UPDATE w/ SELECTED ID", qty, id)
  //     this.onUpdateItem(id, Number(currentQty) + 1)
  //   }
    
  // }

  // addSelectedProduct(idx, id, name, qty, price) {
  //   this.setState(
  //     {
  //       selectedProduct: {
  //         idx: idx,
  //         id: id,
  //         name: name,
  //         qty: qty,
  //         price: price
  //       }
  //     },
  //     () => {
  //       this.onAddToCart(this.state.selectedProduct);
  //     }
  //   );
  // }

  // setSelectedQtyID = (idx, id, currentQty) => {
  //   this.setState({
  //     selectedQtyID: id,
  //     inputQtyCartItem: currentQty,
  //     isCalcNumericCartOpen: true,
  //     onReset: true,
  //     activeItem: idx,
  //     isCashierOverlayShow: true
  //   });
  // }

  // onUpdateItem(id, newQty) {
  //   let index = this.state.items.findIndex( x => x.id === id);
  //   let currentQty = this.state.items[index].qty;
  //   let updateQty = currentQty + 1;
  //   // console.log(currentQty)
  //   if (index === -1){
  //     console.log("ERROR")
  //     // handle error
  //   }else{
  //     this.setState({
  //       items: [
  //          ...this.state.items.slice(0,index),
  //          Object.assign({}, this.state.items[index], {qty: newQty}),
  //          ...this.state.items.slice(index+1)
  //       ]
  //     },
  //       () => {
  //         // this.sumTotalAmountPerItem(index)
  //         this.sumTotalAmount()
  //         setTimeout(() => {
  //           this.sumGrandTotalAmount()
  //         }, 1);
  //         this.onCloseCalc()
  //       } 
  //     );
  //   }
  // }

  // onRemoveFromCart(item) {
  //   const newArray = [...this.state.items];
  //   newArray.splice(item, 1);

  //   this.setState({
  //     items: newArray
  //   },
  //     () => {
  //       this.sumTotalAmount()
  //       setTimeout(() => {
  //         this.sumGrandTotalAmount()
  //       }, 10);
  //     }
  //   );
  // }



  // ===============
  // TRX ACTION
  // ===============
  // onRemoveFromCart = this.onRemoveFromCart.bind(this);

  // onRemoveFromCart(item) {
  //   const newArray = [...this.state.items];
  //   newArray.splice(item, 1);

  //   this.setState({
  //     items: newArray
  //   },
  //     () => {
  //       this.sumTotalAmount()
  //       setTimeout(() => {
  //         this.sumGrandTotalAmount()
  //       }, 10);
  //     }
  //   );
  // }
}

export default TransactionContainer