import React from 'react';
import {Row, Col, Jumbotron, Card, CardBody, CardTitle, CardText, CardHeader, CardSubtitle} from 'reactstrap'


export default props => (
    <Card style={{width:'100%'}} onClick={() => props.onClick(props._id)}>
        <img src={props.image} className="card-img-top" alt="" />

        <CardBody>
            <CardTitle><h3>{props.name}</h3></CardTitle>
            <CardSubtitle><h4>{props.category}</h4></CardSubtitle>
            {/* <CardTitle>{props.name}</CardTitle> */}
            {/* <CardText>{props.description}</CardText> */}
        </CardBody>
    </Card>
);