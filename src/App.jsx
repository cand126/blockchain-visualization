import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Visualization from './pages/Visualization';
import Settings from './pages/Settings';
import Simulator from './simulation/Simulator';
import Hash from './helper/Hash';

// import Hash from './helper/Hash';

/**
 * Class representing the whole app.
 * @extends Component
 * @since 1.0.0
 */
class App extends Component {
  constructor(props) {
    super(props);
    // test
    this.state = {
      nodes: [],
    };

    this.handleNodesChange = this.handleNodesChange.bind(this);
    this.initNodes = this.initNodes.bind(this);
  }

  componentDidMount() {
    // test
    let n1 = Simulator.getInstance().addNode({
      id: Hash.generateId(),
      type: 'miner',
      color: '#FF0000',
      name: 'Alice',
      miningTime: 10,
      minValue: 3,
      mineNumber: 2,
      maxPending: 10,
    });
    this.setState((prevState) => ({
      nodes: [...prevState.nodes, n1],
    }));
    let n2 = Simulator.getInstance().addNode({
      id: Hash.generateId(),
      type: 'miner',
      color: '#00FF00',
      name: 'Bob',
      miningTime: 10,
      minValue: 3,
      mineNumber: 2,
      maxPending: 10,
    });
    this.setState((prevState) => ({
      nodes: [...prevState.nodes, n2],
    }));
    let n3 = Simulator.getInstance().addNode({
      id: Hash.generateId(),
      type: 'miner',
      color: '#0000FF',
      name: 'Charlie',
      miningTime: 10,
      minValue: 3,
      mineNumber: 2,
      maxPending: 10,
    });
    this.setState((prevState) => ({
      nodes: [...prevState.nodes, n3],
    }));
    let n4 = Simulator.getInstance().addNode({
      id: Hash.generateId(),
      type: 'node',
      name: 'David',
    });
    this.setState((prevState) => ({
      nodes: [...prevState.nodes, n4],
    }));
    let n5 = Simulator.getInstance().addNode({
      id: Hash.generateId(),
      type: 'node',
      name: 'Eric',
    });
    this.setState((prevState) => ({
      nodes: [...prevState.nodes, n5],
    }));
  }

  handleNodesChange(nodes) {
    this.setState({nodes: nodes});
  }

  initNodes() {
    // Simulator.getInstance().addDelays(this.state.transactionDelays, this.state.nodeDelays);
  }

  render() {
    return (
      <Router>
        <div className="d-flex flex-column App">
          <Header />
          <Route exact path="/" render={(props) => (
            <Visualization {...props} nodes={this.state.nodes} onInitNodes={this.initNodes} />
          )} />
          <Route path="/settings" render={(props) => (
            <Settings {...props} nodes={this.state.nodes} onNodesChange={this.handleNodesChange} />
          )} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
