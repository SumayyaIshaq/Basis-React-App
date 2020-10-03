import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Phone from './components/Phone/Phone';
import OTP from './components/OTP/OTP';
import Email from './components/Email/Email';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      phone: "",
      email: "",
      firstname: "",
      lastname: "",
      user: {}
    }
  }

  // Function for changing state variable value from child component
  changeStateHandler = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={(props) => <Phone {...this.state} changeState={this.changeStateHandler} />} />
          <Route path="/otp" render={(props) => <OTP {...this.state} changeState={this.changeStateHandler} />} />
          <Route path="/email" render={(props) => <Email {...this.state} changeState={this.changeStateHandler} />} />
          <Route path="/signup" render={(props) => <SignUp {...this.state} changeState={this.changeStateHandler} />} />
          <Route path="/profile" render={(props) => <Profile {...this.state} changeState={this.changeStateHandler} />} />
        </Switch>
      </BrowserRouter >
    );
  }
}

export default App;
