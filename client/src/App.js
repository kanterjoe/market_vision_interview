import React from 'react';
import logo from './logo.svg';
import {Input, Button, Card, CardBody} from 'reactstrap';
import './App.css';
import axios from "axios";
class App extends React.Component {
  state={
      userToken: false,
      userData: false,
      errorMessage: false,

  }
  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token && token !== '' && token !== 'undefined') {
      this.setState({userToken: token})
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
        .then(({data, token}) => this.setState({
            userData: data, userToken:token
        }))
        .catch( err => this.setState({errorMessage: err}))
      ;

  }
  render() {
    return this.state.userToken?
                <div className="App">
                    You are so logged in, it's not even funny
                </div>
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
