import React, {Component} from 'react';
import './MinerRow.css';

/**
 * MinerRow
 * @class
 */
class MinerRow extends Component {
  render() {
    return (
      <div className="container-fluid Miner-row">
        <h3>{this.props.name}</h3>
      </div>
    );
  }
}

export default MinerRow;
