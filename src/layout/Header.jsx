import React, {Component} from 'react';
import {Navbar, NavbarToggler, Collapse, Nav, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';

/**
 * @public
 */
class Header extends Component {
  /**
   * @public
   */
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  /**
   * @public
   */
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  /**
   * @public
   */
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Link className="navbar-brand" to="/">Blockchain Visualization</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/settings">Settings</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
