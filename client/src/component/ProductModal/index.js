import React from 'react';
import {Modal, Badge, Button} from 'reactstrap'


export default class AllProducts extends React.Component {


    render() {
        return <Modal isOpen={this.props.isOpen} toggle={this.props.closeModal}>
            <Button onClick={this.props.closeModal} color="danger" style={{width:"2.5em"}}>X</Button>
            <div className="m-5 p-5 text-center">
                <div>
                    <h1>{this.props.name}</h1>
                    <Badge>{this.props.category}</Badge>
                </div>
                <img src={this.props.image} alt=""/>
                <p>{this.props.description}</p>
                {
                    this.props.inCart?
                        <Button onClick={() => this.props.removeFromCart(this.props._id)} color="danger">Remove From Cart</Button>
                        :
                        <Button onClick={() => this.props.addToCart(this.props._id)} color="success">Add to Cart</Button>

                }
            </div>

        </Modal>
    }

}

