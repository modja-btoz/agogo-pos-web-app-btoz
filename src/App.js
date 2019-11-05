import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect, Link } from 'react-router-dom'
import { Button } from 'reactstrap';
import Modal from 'react-modal'
import axios from 'axios'

import decode from 'jwt-decode';

import UsersContainer from './containers/UsersContainer';
import Login from './components/logins/Login';
import InitialBalance from './components/balances/InitialBalance';
import Selection from './components/selection/Selection'
import Cashier from './components/cashier/Cashier';
import Booking from './components/booking/Booking'

import Fullscreen from "react-full-screen";
import Production from './components/production/Production';
import Invoice from './components/print/pemesananOrder';

Modal.setAppElement("#root");

const isTokenExpired = (token) => {
  try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
          return true;
      }
      else
          return false;
  }
  catch (err) {
      return false;
  }
}

const isLoggedIn = () => {
  // Checks if there is a saved token and it's still valid
  
  const token = sessionStorage.getItem('token') // GEtting token from localstorage
  return !!token && !isTokenExpired(token) // handwaiving here
}

const whatRole = () => {
  const roles = JSON.parse(sessionStorage.getItem("usernow"))
  try{
    if(roles.role.includes("kasir") && roles.role.includes("pemesanan") && roles.role.includes("produksi") ){
      console.log("all", roles.role)
      return 'all'
    }else if(roles.role.includes("kasir") && roles.role.includes("pemesanan")){
      console.log("kasirpemesanan", roles.role)
      return 'kasirpemesanan'
    }else if(roles.role.includes("kasir") && roles.role.includes("produksi")){
      console.log("kasirproduksi", roles.role)
      return 'kasirproduksi'
    }else if(roles.role.includes("pemesanan") && roles.role.includes("produksi")){
      console.log("pemesananproduksi", roles.role)
      return 'pemesananproduksi'
    }else if(roles.role.includes("kasir")){
      console.log("kasir", roles.role)
      return 'kasir'
    } if(roles.role.includes("pemesanan")){
      console.log("pemesanan", roles.role)
      return 'pemesanan'
    }else if(roles.role.includes("produksi")){
      console.log("produksi", roles.role)
      return 'produksi'
    }else{
      console.log("salah", roles.role)
      return false
    }
  }
  catch(err){
    console.log("error", roles.role)
    return false;
  }
}

// const ProtectedRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => {
//     console.log("GET CURRENT PATH")
//     console.log(props.match.path)
//     return(
//       isLoggedIn() === true
//       ? <Component {...props} rootStore={props.rootStore} />
//       : <Redirect to={{
//           pathname: '/initial-balance',
//           state: { from: props.location }
//         }} />
//     )
//   }} />
// );

// const ProtectedRouteLogged = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => {
//     console.log("GET CURRENT PATH")
//     console.log(props.match.path)
//     return(
//       isLoggedIn() === false
//       ? <Component {...props} rootStore={props.rootStore} />
//       : <Redirect to={{
//           pathname: '/',
//           state: { from: props.location }
//         }} />
//     )
//   }} />
// );
// );


const root = document.getElementById("root");

class App extends Component {
  // modal = React.createRef()
  // componentDidMount(){
  //   console.log("TES ~~~~~~~~~~~~~ ", this.props.transactionStore)
  // }
  
  state = {
    activePath: '/',
    saldo: false
  }
  modal = React.createRef()

  logout = () => {
    // console.log("LOGOUT")
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('idKas', '');
    sessionStorage.clear();
  }

  activePath = (props) => {
    // console.log("=== ACTIVE PATH ===")
    // console.log(props.match.path)
    if(props.match.path !== this.state.activePath){
      this.setState({
        activePath: props.match.path
      },
      () => {

        console.log(this.state.activePath)
      })
    }
  }

  componentDidMount(){
    axios.get('http://101.255.125.227:82/api/cekKas')
    .then(res => {
        if(res.data.status === 'counted'){
          console.log('counted', res)
          this.setState({saldo: false})
        }else{
          console.log('uncounted2', res)
          this.setState({saldo: true})
        }
    })
    .catch(res => {
      console.log('catch', res)
    })
  }


  // componentDidMount(){
  //   console.log("AAAAAAAAAAAAAAAA", this.checkRoles())
  //   // this.setState({role })
  // }

  // componentDidUpdate(){
  //   // console.log("AAAAAAAAAAAAAAAA", this.checkRoles())
  //   // this.setState({role })
  // }
  
  render() {
    // console.log(isLoggedIn())

    return (

      <Fullscreen enabled={this.props.rootStore.state.isFull} onChange={isFull => this.props.rootStore.setState({isFull})}>
          
        <BrowserRouter>
          <div className="App" style={{position: "relative",}}>

            {/* <h1 className="text-primary text-center">Page = {this.props.rootStore.state.page}</h1> */}
            
            {/* GAKTAUNYA BISA KASIH FUNCTION DI ROUTE
            INI GAK BSIA KRN ROUTENYA DI PROTECT */}

            <Switch>
              <Route exact path='/'
                render={(props) => {
                  // this.activePath(props);
                  return(
                    isLoggedIn() === true && (whatRole() === 'all' || whatRole() === 'kasirpemesanan' || whatRole() === 'kasirproduksi' || whatRole() === 'kasir')
                    ? <Redirect to={{ pathname: '/initial-balance', state: { from: props.location } }} />
                    : <UsersContainer {...props} 
                      rootStore={this.props.rootStore} 
                      activePath={props.match.path} />
                  )
                }}
              />
              
              <Route path='/login/:user_index'
                render={(props) => {
                  this.activePath(props);
                  return(
                    isLoggedIn() === true
                    ? <Redirect to={{ pathname: '/initial-balance', state: { from: props.location } }} />
                    : <Login {...props} 
                      rootStore={this.props.rootStore} 
                      modalStore={this.props.modalStore} 
                      activePath={props.match.path} />
                  )
                }}
              />

              <Route path='/selection'
                render={(props) => {
                  this.activePath(props);
                  return(
                    isLoggedIn() === true
                    ? <Selection {...props}
                      rootStore={this.props.rootStore}
                      modalStore={this.props.modalStore}
                      transactionStore={this.props.transactionStore}
                      activePath={props.match.path} />
                    : <Redirect to={{ pathname: '/', state: {from: props.location} }} />
                  )
                }}
              />
              
              <Route path='/initial-balance'
                render={(props) => {
                  this.activePath(props);
                  return(
                    isLoggedIn() === true
                    ? <InitialBalance {...props} 
                      rootStore={this.props.rootStore} 
                      modalStore={this.props.modalStore} 
                      activePath={props.match.path} /> 
                    : <Redirect to={{ pathname: '/cashier', state: { from: props.location } }} />
                  )
                }}
              />

              <Route path='/invoice'
                render={(props) => {
                  this.activePath(props);
                  return(
                    isLoggedIn() === true
                    ? <Invoice {...props} 
                      cartStore={this.props.cartStore}
                      rootStore={this.props.rootStore} 
                      modalStore={this.props.modalStore} 
                      activePath={props.match.path} /> 
                    : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                  )
                }}
              />
              <Route path='/cashier'
                render={(props) => {
                  this.activePath(props);
                  // console.log(this.props.myModal.props)
                  return(
                    isLoggedIn() === true && (whatRole() === 'all' || whatRole() === 'kasirpemesanan' || whatRole() === 'kasirproduksi' || whatRole() === 'kasir')
                    ? <Cashier {...props} 
                        rootStore={this.props.rootStore} 
                        modalStore={this.props.modalStore}
                        // myModal={this.props.myModal}
                        cartStore={this.props.cartStore} 
                        productStore={this.props.productStore} 
                        transactionStore={this.props.transactionStore} 
                        activePath={props.match.path} />
                    : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                  )
                }}
              /> 

              <Route path='/booking'
                render={(props) => {
                  this.activePath(props);
                  return (
                    isLoggedIn() === true && (whatRole() === 'all' || whatRole() === 'kasirpemesanan' || whatRole() === 'kasirpemesanan' || whatRole() === 'pemesanan' ) && this.state.saldo
                      ? <Booking {...props}
                        rootStore={this.props.rootStore}
                        modalStore={this.props.modalStore}
                        cartStore={this.props.cartStore}
                        productStore={this.props.productStore}
                        transactionStore={this.props.transactionStore}
                        activePath={props.match.path} />
                      : this.props.modalStore.toggleModal('alert','','','Saldo kasir belum diinput!') || this.logout() || 
                      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                  )
                }}
              />

              <Route path='/production'
                render={(props) => {
                  this.activePath(props);
                  return (
                    isLoggedIn() === true && (whatRole() === 'all' || whatRole() === 'pemesananproduksi' || whatRole() === 'kasirproduksi' || whatRole() === 'produksi')
                      ? <Production {...props}
                        rootStore={this.props.rootStore}
                        modalStore={this.props.modalStore}
                        cartStore={this.props.cartStore}
                        productStore={this.props.productStore}
                        activePath={props.match.path} />
                      : <Redirect to={{pathname: '/', state: { from: props.location } }} />
                  )
                }}
              />

              <Route path="/logout" 
                render={() => {
                  this.logout();
                  return <Redirect to={{ pathname: "/" }} />;
                }}
              />
            </Switch>
            
          </div>
        </BrowserRouter>
        <footer className="Footer right">                    
          <a href="#" className="btn-fullscreen" onClick={this.props.rootStore.goFull} >
            <i className="fas fa-expand-arrows-alt"></i>
          </a>

          {/* {this.state.activePath === '/initial-balance' &&
          <a href="#" className="btn-logout" onClick={() => this.props.modalStore.toggleModal('saldo', '')} >
            <i className="fas fa-power-off"></i>
          </a>
          } */}
        </footer>
        <div ref={this.root} id="myModal">{this.props.myModal}</div>
      </Fullscreen>
    );
  }
}

export default App;
