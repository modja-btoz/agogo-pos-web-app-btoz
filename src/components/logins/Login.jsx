import React, { Component } from "react"
import ReactDOM from 'react-dom'
import UserCard from '../users/UserCard'
import CalcNumeric from '../calcs/CalcNumeric'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import LogoAgogo from "./../../img/logo-agogo.png";
import { Provider, Subscribe } from 'unstated'
import ModalsContainer from '../modals/_ModalsContainer'
import RootContainer from '../roots/RootContainer'

import './Login.scss';

class Login extends Component {

  constructor(props) {
    super(props);
  };

  state = {
    users: [],
    user: [],
    userAvatar: '',
    password: '',
    username: '',
    userRole: '',
    redirect: false
  };

  componentDidMount(){
    if(sessionStorage.getItem('users')){
      console.log('User logged in', sessionStorage)
    }else{
      this.state({ redirect: true })
    }

    // console.log(this.props)
    let user_index = this.props.match.params.user_index;
    let users = sessionStorage.getItem('users');
    this.setState({ users: JSON.parse(users)},
    () => {
      this.setState({
        user: this.state.users[user_index]
      },
      () => {
        console.log(this.state.user)
        this.setState({
          username: this.state.user.username,
          userAvatar: this.state.user.photo,
          userRole: this.state.user.role,
        },
        () => {
          sessionStorage.setItem('usernow', JSON.stringify(this.state.user));
          // console.log("USERNAME")
          // console.log(this.state.username)
          // console.log(this.state.userAvatar)
        });
      });
    });
  }

  onChange = input => {
    this.setState({ password: input });
    console.log("Password changed", input);
  };

  onChangeInput = event => {
    let input = event.target.value;
    this.setState({ password: input });
    // console.log("Password changed", input);
  };

  onEnter = () => {
    // console.log("ENTERRRRRRR DARI CHILD KEYBOARD")
    this.login()
  }

  login = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password,
    };

    axios.post(`https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/auth/login`, userData )
      .then(res => {
        console.log("UI ", res);
        console.log("UO ", res.data);
        console.log('Cek', sessionStorage)
        sessionStorage.setItem('token', res.data.token);
        this.setState({ redirect: true })
      })
  }

  logout = () => {
    sessionStorage.setItem('token', '');
    sessionStorage.clear();
    this.setState({ redirect: true })
  }



  render() {

    if(this.state.redirect || sessionStorage.getItem('token')){
      return (<Redirect to={'/selection'} />);
    }

    return (

        <section className="centered">

        {/* <h1 className="text-danger text-center">Page = {this.props.rootStore.state.page}</h1>
        <p className="text-light text-center">{JSON.stringify(this.props.match.path)}</p>

          <Button onClick={() => this.props.rootStore.setCurrentPage('login')}>SET CURRENT PAGE</Button> */}

          <div className="login">
            <div className="container">
              <div className="row">
                <div className="col login-header">
                  <div className="row">
                    <div className="col-9">
                      <a href="/"><i className="fas fa-arrow-left mr-5"></i></a> SIGN IN
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

                    <UserCard 
                      user={this.state.user} 
                      userID={this.state.user.id} 
                      userName={this.state.user.username} 
                      userAvatar={this.state.userAvatar}
                      userRole={this.state.userRole} 
                      colorTitle="text-black" 
                      colorSubTitle="text-red" 
                    />

                    <FormGroup className="mt-4">
                      <Label for="PIN" className="text-center d-block">Masukan PIN Anda</Label>
                      <Input 
                        value={this.state.password} 
                        onChange={e => this.onChangeInput(e)}
                        type="password" name="password" id="pin" placeholder="PIN"  size="lg" className="text-center" 
                        readonly
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="col-6 box-calc">
                  <div className="box-inner">
                    <CalcNumeric 
                      onChange={this.onChange} 
                      onChangeInput={this.onChangeInput} 
                      onEnter={this.onEnter} 
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

    )
  }
}

export default Login