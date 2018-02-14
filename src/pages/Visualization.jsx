import React, {Component} from 'react';
import {Button} from 'reactstrap';
import Logger from '../visualization/Logger';
import VisualizationRow from '../visualization/VisualizationRow';
import Simulator from '../simulation/Simulator';
import './Visualization.css';

/**
 * Logger
 * @class
 */
class Visualization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };

    this.handleInitNodes = this.handleInitNodes.bind(this);
  }

  handleInitNodes(e) {
    this.props.onInitNodes();
  }

  render() {
    return (
      <div className="d-flex flex-column Visualization">
        <div className="d-flex flex-column node-container">
          {/* <Button color="primary" onClick={this.handleInitNodes}>Initialize</Button> */}
          {this.props.nodes.map((node, index) =>
            <VisualizationRow key={index} id={node.id} name={node.name} color={node.color} type={node.type}/>
          )}
        </div>
        <Logger />
      </div>
    );
  }
}

export default Visualization;
