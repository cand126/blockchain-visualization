import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Blockchain Visualization</NavbarBrand>
        </Navbar>
      </div>
    );
  }
}

export default Header;
