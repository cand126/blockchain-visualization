import React, {Component} from 'react';
import './Visualizer.css';
import MinerRow from './MinerRow';
import Logger from './Logger';

/**
 * Visualizer
 * @class
 */
class Visualizer extends Component {
  render() {
    return (
      <div className="d-flex flex-column Visualizer">
        <div className="Miner-container">
          {this.props.minerList.map((miner) =>
            <MinerRow key={miner.id} id={miner.id} name={miner.name} color={miner.color}/>
          )}
        </div>
        <Logger />
      </div>
    );
  }
}

export default Visualizer;
