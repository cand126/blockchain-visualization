import React, {Component} from 'react';
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import MinerRow from './visualization/MinerRow';
import Logger from './visualization/Logger';
import Miner from './agents/Miner';
import TransactionGenerator from './agents/TransactionGenerator';
import Hash from './helper/Hash';

/**
 * App
 * @class
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.transactionGenerator = new TransactionGenerator(Hash.generateId());
    this.state = {
      minerList: [],
    };
  }

  componentDidMount() {
    // test
    let miner1 = new Miner(
      Hash.generateId(),
      'Miner1',
      'red'
    );
    let miner2 = new Miner(
      Hash.generateId(),
      'Miner2',
      'yellow'
    );
    let miner3 = new Miner(
      Hash.generateId(),
      'Miner3',
      'blue'
    );
    this.setState({
      minerList: [miner1, miner2, miner3],
    });
    this.transactionGenerator.publish(miner1.id, 1);
    this.transactionGenerator.publish(miner3.id, 3);
    miner1.publish(miner2.id, 4);
    miner1.publish(miner2.id, 7);
  }

  render() {
    return (
      <div className="d-flex flex-column App">
        <Header />
        <div className="d-flex flex-column App-content">
          <div className="d-flex flex-column Miner-container">
            {this.state.minerList.map((miner) =>
              <MinerRow key={miner.id} id={miner.id} name={miner.name} color={miner.color} />
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
