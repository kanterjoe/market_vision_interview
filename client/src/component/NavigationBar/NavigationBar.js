import React from 'react';
import CartIndicator from './CartIndicator';
import {Button, Nav, Navbar,NavbarBrand, NavItem} from 'reactstrap'


export const NavigationBar = props => (
    <Navbar color="light" light expand="md">
        <NavbarBrand>Buy Pictures</NavbarBrand>
        <Nav className="ml-auto" navbar>

            <CartIndicator
                cart={props.cart.map(id=> props.products.find(product => product._id === id))}
                emptyCart={props.emptyCart}
            />
            <Button outline color="danger" onClick={props.logout} style={{float:"right", marginLeft:"1em"}}>Logout</Button>

        </Nav>
    </Navbar>
);

