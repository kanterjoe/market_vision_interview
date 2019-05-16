import React from 'react';
import {Row, Col, Jumbotron, Card, CardBody, CardTitle, Badge, CardImgOverlay, CardSubtitle} from 'reactstrap'

const toMoney = number => `$${number.toFixed(2)}`;

export default props => (
    <Card style={{width:'100%', marginBottom:"1em", boxShadow:"0 0 16px -8px black"}} onClick={() => props.onClick(props._id)}>
        <img src={props.image} className="card-img-top" alt="" />

        <CardBody>
            {/*<CardImg src={props.image} />*/}
            <CardImgOverlay><Badge color="success">{toMoney(props.price)}</Badge></CardImgOverlay>
            <CardTitle><h3>{props.name}</h3></CardTitle>
            <CardSubtitle><h4>{props.category}</h4></CardSubtitle>
            {/* <CardTitle>{props.name}</CardTitle> */}
            {/* <CardText>{props.description}</CardText> */}
        </CardBody>
    </Card>
);