import React, {Component} from 'react';
import './MinerRow.css';
import Visualizer from './Visualizer';

/**
 * MinerRow
 * @class
 */
class MinerRow extends Component {
  render() {
    const minerHeader = {
      backgroundColor: this.props.color,
    };

    return (
      <div className="d-flex flex-column Miner-row">
        <h3 style={minerHeader}>{this.props.name}: {this.props.id}</h3>
        <Visualizer />
      </div>
    );
  }
}

export default MinerRow;
