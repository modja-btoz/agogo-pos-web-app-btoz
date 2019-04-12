import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect, Link } from 'react-router-dom'
import { Button } from 'reactstrap';

import decode from 'jwt-decode';

import UsersContainer from './containers/UsersContainer';
import Login from './components/logins/Login';
import InitialBalance from './components/balances/InitialBalance';
import Selection from './components/selection/Selection'
import Cashier from './components/cashier/Cashier';
import Booking from './components/booking/Booking'

import Fullscreen from "react-full-screen";


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

class App extends Component {

  state = {
    activePath: '/'
  }

  logout = () => {
    // console.log("LOGOUT")
    sessionStorage.setItem('token', '');
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
  
  render() {
    // console.log(isLoggedIn())

    return (

      <Fullscreen enabled={this.props.rootStore.state.isFull} onChange={isFull => this.props.rootStore.setState({isFull})}>

        <footer className="Footer right">                    
          <a href="#" className="btn-fullscreen" onClick={this.props.rootStore.goFull} >
            <i className="fas fa-expand-arrows-alt"></i>
          </a>

          {this.state.activePath === '/initial-balance' &&
          <a href="#" className="btn-logout" onClick={() => this.props.modalStore.toggleModal('saldo', '')} >
            <i className="fas fa-power-off"></i>
          </a>
          }
        </footer>

        <BrowserRouter>
          <div className="App">

            {/* <h1 className="text-primary text-center">Page = {this.props.rootStore.state.page}</h1> */}
            
            {/* GAKTAUNYA BISA KASIH FUNCTION DI ROUTE
            INI GAK BSIA KRN ROUTENYA DI PROTECT */}

            <Switch>
              <Route exact path='/'
                render={(props) => {
                  this.activePath(props);
                  return(
                    isLoggedIn() === true
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

              <Route path='/initial-balance'
                render={(props) => {
                  this.activePath(props);
                  return(
                    isLoggedIn() === true
                    ? <InitialBalance {...props} 
                      rootStore={this.props.rootStore} 
                      modalStore={this.props.modalStore} 
                      activePath={props.match.path} /> 
                    : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
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
                      activePath={props.match.path} />
                    : <Redirect to={{ pathname: '/', state: {from: props.location} }} />
                  )
                }}
              />

              <Route path='/cashier'
                render={(props) => {
                  this.activePath(props);
                  return(
                    isLoggedIn() === true
                    ? <Cashier {...props} 
                        rootStore={this.props.rootStore} 
                        modalStore={this.props.modalStore} 
                        cartStore={this.props.cartStore} 
                        productStore={this.props.productStore} 
                        activePath={props.match.path} />
                    : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                  )
                }}
              />

              <Route path='/booking'
                render={(props) => {
                  this.activePath(props);
                  return (
                    isLoggedIn() === true
                      ? <Booking {...props}
                        rootStore={this.props.rootStore}
                        modalStore={this.props.modalStore}
                        cartStore={this.props.cartStore}
                        productStore={this.props.productStore}
                        activePath={props.match.path} />
                      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
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

      </Fullscreen>
    );
  }
}

export default App;
