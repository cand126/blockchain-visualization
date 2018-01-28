import React, {Component} from 'react';
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import MinerRow from './visualization/MinerRow';
import Logger from './visualization/Logger';
import Simulator from './simulation/Simulator';

// import Hash from './helper/Hash';

/**
 * Class representing the whole app.
 * @extends Component
 * @since 1.0.0
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.simulator = Simulator.getInstance();
    this.state = {
      minerList: [],
    };
  }

  componentDidMount() {
    // test
    this.setState((prevState) => ({
      minerList: [
        ...prevState.minerList,
        {
          color: 'FF0000',
          colorHex: 0xFF0000,
        },
      ],
    }));
    this.setState((prevState) => ({
      minerList: [
        ...prevState.minerList,
        {
          color: '00FF00',
          colorHex: 0x00FF00,
        },
      ],
    }));
    this.setState((prevState) => ({
      minerList: [
        ...prevState.minerList,
        {
          color: '0000FF',
          colorHex: 0x0000FF,
        },
      ],
    }));
  }

  render() {
    return (
      <div className="d-flex flex-column App">
        <Header />
        <div className="d-flex flex-column App-content">
          <div className="d-flex flex-column Miner-container">
            {this.state.minerList.map((miner, index) =>
              <MinerRow key={index} color={miner.color} colorHex={miner.colorHex} ready={index === 2}/>
            )}
          </div>
          <Logger />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
