import React, {Component} from 'react';
import './MinerRow.css';
import Miner from '../agents/Miner';
import Visualizer from './Visualizer';
import Simulator from '../simulation/Simulator';

/**
 * MinerRow
 * @class
 */
class MinerRow extends Component {
  constructor(props) {
    super(props);
    this.miner = new Miner(this.props.color);
    this.miner.minerList = [];

    Simulator.getInstance().addMiner(this.miner);
  }

  componentDidMount() {
    this.miner.initBlockchain();
  }


  render() {
    const minerHeader = {
      backgroundColor: '#' + this.props.color,
    };

    return (
      <div className="d-flex flex-column Miner-row">
        <h3 style={minerHeader}>Miner: {this.miner.id}</h3>
        <Visualizer minerId={this.miner.id}/>
      </div>
    );
  }
}

export default MinerRow;
