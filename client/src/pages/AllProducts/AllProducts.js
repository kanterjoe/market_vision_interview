import React from 'react';
import {Row, Col, Jumbotron, Button, Container, Nav, Navbar,NavbarBrand, NavItem} from 'reactstrap'
import axios from 'axios';
import ProductCard from './ProductCard'
import ProductModal from '../ProductModal'
import CartIndicator from '../../component/CartIndicator'
export default class AllProducts extends React.Component {
    state = {
        viewingProduct: false,
        products: [],
        selectedProduct: {},
        cart: []
    };
    componentDidMount () {
        this.getProducts().then(this.getCart)
    }
    getProducts = () => axios.get(`/product`).then(products => this.setState({products: products.data}))
    getCart     = () => axios.get(`/cart`).then(products => this.setState({cart: products.data}))
    emptyCart   = () => Promise.resolve(this.state.cart.map( productID => axios.delete(`/cart/${productID}`) ))
                                .then(deletions => Promise.all(deletions))
                                .then(results => this.setState({cart:[]}))
    handleProductClick = id => {
        console.log("CLicked: ", id)
        const product = this.state.products.find(({_id}) => _id===id);
        this.setState({selectedProduct: product, viewingProduct: true})
    }
    closeModal = () => this.setState({viewingProduct: false})
    addProductToCart = id => axios.post(`/cart/${id}`).then(response => this.getCart())
    remProductFromCart = id => axios.delete(`/cart/${id}`).then(response => this.getCart())
    render() {
        return (
            <>
                <Navbar color="light" light expand="md">
                    <NavbarBrand>Buy Pictures</NavbarBrand>
                    <Nav className="ml-auto" navbar>

                        <CartIndicator
                            cart={this.state.cart.map(id=> this.state.products.find(product => product._id === id))}
                            emptyCart={this.emptyCart}
                        />
                        <Button outline color="danger" onClick={this.props.logout} style={{float:"right", marginLeft:"1em"}}>Logout</Button>

                    </Nav>
                </Navbar>
            <Container>

                <Row className="mt-3">
                    <Col md={4}>
                        {this.state.products.map(
                            (product, i) => i%3===0? 
                            <ProductCard 
                                key={product._id}
                                {...product} 
                                inCart={this.state.cart.includes(product._id)}
                                onClick={this.handleProductClick}/> 
                            : null)
                        }
                    </Col>
                    <Col md={4}>
                        {this.state.products.map(
                                (product, i) => i%3===1? 
                                <ProductCard 
                                    key={product._id}
                                    {...product} 
                                    inCart={this.state.cart.includes(product._id)}
                                    onClick={this.handleProductClick}/> 
                                : null)
                        }
                    </Col>
                    <Col md={4}>
                        {this.state.products.map(
                                (product, i) => i%3===2? 
                                <ProductCard 
                                    key={product._id}
                                    {...product} 
                                    inCart={this.state.cart.includes(product._id)}
                                    onClick={this.handleProductClick}/> 
                                : null)
                            }
                    </Col>                
                </Row>
                <ProductModal 
                    {...this.state.selectedProduct} 
                    isOpen={this.state.viewingProduct} 
                    closeModal={this.closeModal}                                 
                    inCart={this.state.cart.includes(this.state.selectedProduct._id)}
                    addToCart={this.addProductToCart}
                    removeFromCart={this.remProductFromCart}
                />
            </Container>
                </>
        )
    }
}

