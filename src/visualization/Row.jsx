import React, {Component} from 'react';
import './Row.css';
import Miner from '../agents/Miner';
import Visualizer from '../visualization/Visualizer';
import Simulator from '../simulation/Simulator';

/**
 * MinerRow
 * @class
 */
class Row extends Component {
  constructor(props) {
    super(props);
    this.miner = new Miner(this.props.colorHex);
    this.miner.minerList = [];
  }

  componentDidMount() {
    this.miner.initBlockchain();
    Simulator.getInstance().addMiner(this.miner);
    Simulator.getInstance().addMiner(this);
    // if (this.props.ready) {
    //   Simulator.getInstance().start();
    // }
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

export default Row;
