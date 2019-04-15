import React from 'react'
import { Navbar, Nav, NavItem, NavLink, FormGroup, Label, Input } from 'reactstrap';

const FooterNavRightProduction = (props) => {
    return (

        <Navbar expand="md">
            <Nav className="ml-auto" navbar>
                
                    <NavItem className="radio-btn">
                        <input type="radio" name="radio-stock" className="radio" />
                        <span className="item-stok">Semua Stok</span>
                    </NavItem>
                    <NavItem className="radio-btn">
                        <input type="radio" name="radio-stock" className="radio" />
                        <span className="item-stok">Stok Tersedia</span>
                    </NavItem>
                    <NavItem className="radio-btn">
                        <input type="radio" name="radio-stock" className="radio" />
                        <span className="item-stok">Stok Habis</span>
                    </NavItem>

                <NavItem>
                    <NavLink href="/logout"><i class="fas fa-sign-out-alt"></i><br />Sign Out</NavLink>
                </NavItem>
            </Nav>
        </Navbar>

    )
}

export default FooterNavRightProduction

