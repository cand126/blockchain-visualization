import React, {Component} from 'react';
import {Form} from 'reactstrap';
import NodeCard from './NodeCard';
import DelayRow from './DelayRow';
import './Settings.css';
import Simulator from '../simulation/Simulator';
import TransactionGenerator from '../agents/TransactionGenerator';

/**
 * Logger
 * @class
 */
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionGenerator: TransactionGenerator.getInstance(),
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(nextProps.nodes);
    this.setState({
      transactionGenerator: TransactionGenerator.getInstance(),
    });
  }

  render() {
    return (
      <div className="container Settings">
        <NodeCard node={this.state.transactionGenerator} />
        {this.props.nodes.map((node, index) =>
          <NodeCard key={index} index={index} node={node} />
        )}
      </div>
    );
  }
}

export default Settings;
