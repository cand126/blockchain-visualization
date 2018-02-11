import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Visualization from './pages/Visualization';
import Settings from './pages/Settings';

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
          id: 't',
          type: 'transaction generator',
        },
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
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <div className="d-flex flex-column App">
          <Header />
          <Route exact path="/" component={Visualization} />
          <Route path="/settings" render={(props) => (
            <Settings {...props} nodes={this.state.nodes} />
          )} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
