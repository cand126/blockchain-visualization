import React, {Component} from 'react';
import Logger from '../visualization/Logger';

/**
 * Logger
 * @class
 */
class Visualization extends Component {
  render() {
    return (
      <div className="d-flex flex-column h-100">
        <div className="d-flex flex-column Miner-container">


        </div>
        <Logger />
      </div>
    );
  }
}

export default Visualization;
