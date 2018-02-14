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
  // constructor(props) {
  //   super(props);
  //   this.miner = new Miner(this.props.colorHex);
  //   this.miner.minerList = [];
  // }

  // componentDidMount() {
  //   this.miner.initBlockchain();
  //   Simulator.getInstance().addMiner(this.miner);
  //   Simulator.getInstance().addMiner(this);
  //   // if (this.props.ready) {
  //   //   Simulator.getInstance().start();
  //   // }
  // }

  render() {
    let minerHeader = {};
    this.props.color ?
    minerHeader.backgroundColor = this.props.color
    :
    minerHeader.backgroundColor = '#FFFFFF';

    return (
      <div className="d-flex flex-column Miner-row">
        <h3 style={minerHeader}>{this.props.name} ({this.props.type})</h3>
        {/* <Visualizer minerId={this.miner.id}/> */}
      </div>
    );
  }
}

export default VisualizationRow;
