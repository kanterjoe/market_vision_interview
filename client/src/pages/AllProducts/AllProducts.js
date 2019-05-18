import React from 'react';
import {Row, Col, Jumbotron, Button, Container, Nav, Navbar,NavbarBrand, NavItem} from 'reactstrap'
import axios from 'axios';
import ProductCard from './ProductCard'
import ProductModal from '../../component/ProductModal'
import NavigationBar from '../../component/NavigationBar'



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

    closeModal          = () => this.setState({viewingProduct: false})

    addProductToCart    = id => axios.post(`/cart/${id}`).then(response => this.getCart())
    remProductFromCart  = id => axios.delete(`/cart/${id}`).then(response => this.getCart())
    getProducts = () => axios.get(`/product`).then(products => this.setState({products: products.data}))
    getCart     = () => axios.get(`/cart`).then(products => this.setState({cart: products.data}))
    emptyCart   = () => Promise.resolve(this.state.cart.map( productID => axios.delete(`/cart/${productID}`) ))
                                .then(deletions => Promise.all(deletions))
                                .then(results => this.setState({cart:[]}))
                                
    handleProductClick  = id => {
        console.log("CLicked: ", id)
        const product = this.state.products.find(({_id}) => _id===id);
        this.setState({selectedProduct: product, viewingProduct: true})
    }
    renderProductSubset = subset => this.state.products
        .filter((_, i) => i%3===subset)
        .map(
            product => (
                <ProductCard 
                    key={product._id}
                    {...product} 
                    inCart={this.state.cart.includes(product._id)}
                    onClick={this.handleProductClick}
                /> 
            )
        )
    render() {
        return (
        <>
            <NavigationBar 
                logout={this.props.logout}
                products={this.state.products}
                cart={this.state.cart}
                emptyCart={this.emptyCart}
            />
            <Container>
                <Row className="mt-3">
                    <Col md={4}>
                        {this.renderProductSubset(0)}
                    </Col>
                    <Col md={4}>
                        {this.renderProductSubset(1)}
                    </Col>
                    <Col md={4}>
                        {this.renderProductSubset(2)}
                    </Col>                
                </Row>
            </Container>
            <ProductModal 
                {...this.state.selectedProduct} 
                isOpen={this.state.viewingProduct} 
                closeModal={this.closeModal}                                 
                inCart={this.state.cart.includes(this.state.selectedProduct._id)}
                addToCart={this.addProductToCart}
                removeFromCart={this.remProductFromCart}
            />
        </>
        )
    }
}

