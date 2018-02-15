import React, {Component} from 'react';
import './Row.css';
import Miner from '../agents/Miner';
import Visualizer from '../visualization/Visualizer';
import Simulator from '../simulation/Simulator';

/**
 * MinerRow
 * @class
 */
class VisualizationRow extends Component {
  /**
   * @public
   */
  render() {
    let nodeHeader = {};
    this.props.color ?
    nodeHeader.backgroundColor = this.props.color
    :
    nodeHeader.backgroundColor = '#FFFFFF';

    return (
      <div className="d-flex flex-column Miner-row">
        <h3 style={nodeHeader}>{this.props.name} ({this.props.type})</h3>
        <Visualizer nodeId={this.props.id}/>
      </div>
    );
  }
}

export default VisualizationRow;
