import React, {Component} from 'react';
import {Button} from 'reactstrap';
import './Footer.css';
import Simulator from '../simulation/Simulator';

  /**
   * @public
   */
class Footer extends Component {
  /**
   * @public
   */
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      counter: 0,
    };
  }

  /**
   * @public
   */
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        counter: prevState.counter + 1,
      }));
    }, 1000);
  }

  /**
   * @public
   */
  componentWillUnmount() {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
  }

  /**
   * @public
   */
  startSimulation() {
    Simulator.getInstance().start();
  }

  /**
   * @public
   */
  render() {
    return (
      <div className="d-flex justify-content-between align-items-center Footer">
        <div></div>
        <Button color="primary" onClick={this.startSimulation}>Start</Button>
        <h3 className="d-flex align-items-center">Timer: {this.state.counter}</h3>
      </div>
    );
  }
}

export default Footer;
