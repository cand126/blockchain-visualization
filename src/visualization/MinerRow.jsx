import React, {Component} from 'react';
import './MinerRow.css';

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
      <div className="container-fluid Miner-row">
        <h3 style={minerHeader}>{this.props.name}: {this.props.id}</h3>
      </div>
    );
  }
}

export default MinerRow;
