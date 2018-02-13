import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Visualization from './pages/Visualization';
import Settings from './pages/Settings';
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
    this.state = {
      nodes: [
        {
          id: 'a',
          type: 'miner',
          color: '#FF0000',
          miningTime: 10,
          minValue: 3,
          mineNumber: 2,
          maxPending: 10,
        },
        {
          id: 'b',
          type: 'miner',
          color: '#00FF00',
          miningTime: 10,
          minValue: 3,
          mineNumber: 2,
          maxPending: 10,
        },
        {
          id: 'c',
          type: 'miner',
          color: '#0000FF',
          miningTime: 10,
          minValue: 3,
          mineNumber: 2,
          maxPending: 10,
        },
        {
          id: 'd',
          type: 'node',
        },
        {
          id: 'e',
          type: 'node',
        },
      ],
      delays: [],
    };

    this.handleNodesChange = this.handleNodesChange.bind(this);
    this.initNodes = this.initNodes.bind(this);
  }

  componentDidMount() {
    this.updateNatch();
  }

  handleNodesChange(nodes) {
    this.setState({nodes: nodes});
  }

  updateNatch() {
    this.setState({
      delays: [],
    });
    for (let i = 0; i < this.state.nodes.length; i++) {
      for (let j = i + 1; j < this.state.nodes.length; j++) {
        this.setState((prevState) => ({
          delays: [...prevState.delays, {
            node: [this.state.nodes[i].id, this.state.nodes[j].id],
            time: 0,
          }],
        }));
      }
    }
  }

  initNodes() {
    Simulator.getInstance().addNodes(this.state.nodes, this.state.delays);
  }

  render() {
    return (
      <Router>
        <div className="d-flex flex-column App">
          <Header />
          <Route exact path="/" render={(props) => (
            <Visualization {...props} onInitNodes={this.initNodes} />
          )} />
          <Route path="/settings" render={(props) => (
            <Settings {...props} nodes={this.state.nodes} delays={this.state.delays} onNodesChange={this.handleNodesChange} />
          )} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
