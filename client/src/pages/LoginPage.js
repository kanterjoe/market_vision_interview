import React from 'react';
import {Card,Input,Button, Alert} from 'reactstrap'

export default props => (
    <Card className="App">
        Please log in
        <Input placeholder="Username" onChange={props.inputChange("username")}/>
        <Input placeholder="Password" onChange={props.inputChange("password")} type="password" />
        <Button onClick={props.login}>Submit</Button>
        {
            props.errorMessage? 
                <Alert color='danger'>{props.errorMessage}</Alert>
                : null
        }
    </Card>
);