import React from 'react';
import logo from './logo.svg';
import {Input, Button, Card, CardBody} from 'reactstrap';
import './App.css';
import axios from "axios";
class App extends React.Component {
  state={
    userToken: false
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
        .then(data => console.log(data))
  }
  render() {
    return this.state.userToken?
                <div className="App">
                    You Good
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
