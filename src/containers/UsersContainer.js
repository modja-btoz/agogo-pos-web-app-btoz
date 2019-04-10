import React, { Component } from 'react';
import axios from 'axios'
import UserList from '../components/users/UserList'
import '../components/users/Users.scss';

<<<<<<< HEAD
=======
// test PR

>>>>>>> dev
class LoginSplashScreen extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    axios.get(`http://dev.wakwaw.com/agogo/wp-json/wp/v2/users`)
    .then(res => {
      const users = res.data;
      this.setState({ users });
      sessionStorage.setItem('users', JSON.stringify(users));
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
