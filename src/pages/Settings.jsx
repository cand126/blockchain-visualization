import React, {Component} from 'react';
import {Form} from 'reactstrap';
import MinerRow from './MinerRow';
import DelayRow from './DelayRow';
import './Settings.css';

/**
 * Logger
 * @class
 */
class Settings extends Component {
  render() {
    return (
      <div className="container Settings">
        <h3>Nodes</h3>
        {this.props.nodes.map((node, index) =>
          <MinerRow key={index} index={index} id={node.id} type={node.type} color={node.color} miningTime={node.miningTime} minValue={node.minValue} mineNumber={node.mineNumber} maxPending={node.maxPending} />
        )}
        <h3>Delay of Network (seconds)</h3>
        <h4>Transaction Generator</h4>
        <h4>Other Nodes</h4>
        <Form>
        {this.props.delays.map((delay, index) =>
          <DelayRow key={index} node1={delay.node[0]} node2={delay.node[1]} time={delay.time}/>
        )}
        </Form>
      </div>
    );
  }
}

export default Settings;
