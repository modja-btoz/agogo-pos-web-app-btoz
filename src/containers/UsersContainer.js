import React, { Component } from 'react';
import axios from 'axios'
import UserList from '../components/users/UserList'
import '../components/users/Users.scss';

class LoginSplashScreen extends Component {

  state = {
    users: []
  }
  render = this.render.bind(this);
  componentDidMount() {
    axios.get(`http://101.255.125.227:82/api/users`)
    .then(res => {
      const users = res.data;
      this.setState({ users });
      sessionStorage.setItem('users', JSON.stringify(users));
      console.log("TES ~~~~~~~~~~~~~ ", this.state.users)
    })
  }

  render() {
    // console.log(this.state.users)
    return (
      <section className="LoginSplashScreen centered">
        <div className="container">
          < UserList users={this.state.users} />
        </div>
      </section>
    );
  }
}

export default LoginSplashScreen;
