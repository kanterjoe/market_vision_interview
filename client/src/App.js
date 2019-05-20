import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import AllProducts from './pages/AllProducts/AllProducts';
import LoginPage from './pages/LoginPage';

class App extends React.Component {
  state={
      userToken: false,
      userData: false,
      errorMessage: false,
      username: "",
      password: ""
  }
  componentDidMount() {
    this.setupAJAX();
  }
  setupAJAX = _token => {
    if (_token) localStorage.setItem("token", _token);
    const token = localStorage.getItem("token")
    if (token && token !== '' && token !== 'undefined') {
      this.setState({userToken: token})
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
  inputChange = inputField => e => this.setState({[inputField]: e.target.value});
  login = () => {
    const loginData = {
        username: this.state.username,
        password: this.state.password
    };
    axios.post("/user", loginData )
        .then(response => response.status===200? response.data: Promise.reject(response.data.message))
        .then(data => {this.setupAJAX(data.token); return data})
        .then(({data, token}) => this.setState({
            userData: data, userToken:token
        }))
        
        .catch( err => {console.log(err); this.setState({errorMessage: err.response.data.message})})
      ; 

  }
  logout = () => {
    localStorage.removeItem("token");
    this.setupAJAX();
    this.setState({
      userToken: false,
      userData: false,
      errorMessage: false,
    })
  }
  render() {
    return this.state.userToken?
      <AllProducts logout={this.logout}/>
      :
      <LoginPage 
        inputChange={this.inputChange}
        login={this.login}
        errorMessage={this.state.errorMessage}
      />
  }

}

export default App;
