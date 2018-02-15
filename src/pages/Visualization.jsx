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
  /**
   * @public
   */
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  /**
   * @public
   */
  render() {
    return (
      <div className="d-flex flex-column Visualization">
        <div className="d-flex flex-column node-container">
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
