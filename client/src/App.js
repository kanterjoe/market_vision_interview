import React from 'react';
import logo from './logo.svg';
import {Input, Button, Card, CardBody} from 'reactstrap';
import './App.css';
import axios from "axios";
import AllProducts from './pages/AllProducts/AllProducts';

class App extends React.Component {
  state={
      userToken: false,
      userData: false,
      errorMessage: false,

  }
  componentDidMount() {
    this.setupAJAX();
  }
  setupAJAX = () => {
    const token = localStorage.getItem("token")
    if (token && token !== '' && token !== 'undefined') {
      this.setState({userToken: token})
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
  inputChange = inputField => e => {
      this.setState({[inputField]: e.target.value})
  };
  login = () => {
      const loginData = {
          username: this.state.username,
          password: this.state.password
      };
    axios.post("/user", loginData )
        .then(response => response.status===200? response.data: Promise.reject("Incorrect username or password. Please try again."))
        .then(data => {localStorage.setItem("token", data.token); return data;})
        .then(data => {this.setupAJAX(); return data})
        .then(({data, token}) => this.setState({
            userData: data, userToken:token
        }))
        .catch( err => this.setState({errorMessage: err}))
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
              <Card className="App">
                  Please log in
                <Input placeholder="Username" onChange={this.inputChange("username")}/>
                <Input placeholder="Password" onChange={this.inputChange("password")} type="password" />
                <Button onClick={this.login}>Submit</Button>
              </Card>



  }

}

export default App;
