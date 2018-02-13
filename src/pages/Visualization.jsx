import React, {Component} from 'react';
import {Button} from 'reactstrap';
import Logger from '../visualization/Logger';
import './Visualization.css';

/**
 * Logger
 * @class
 */
class Visualization extends Component {
  constructor(props) {
    super(props);
    this.handleInitNodes = this.handleInitNodes.bind(this);
  }

  handleInitNodes() {
    this.props.onInitNodes();
  }

  render() {
    return (
      <div className="d-flex flex-column Visualization">
        <div className="d-flex flex-column justify-content-center align-items-center node-container">
          <Button color="primary" onClick={this.handleInitNodes}>Initialize</Button>
        </div>
        <Logger />
      </div>
    );
  }
}

export default Visualization;
