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
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      matches: [],
    };
  }

  componentDidMount() {
    this.updateNatch();
  }

  updateNatch() {
    this.setState({
      matches: [],
    });
    for (let i = 0; i < this.props.nodes.length; i++) {
      for (let j = i + 1; j < this.props.nodes.length; j++) {
        this.setState((prevState) => ({
          matches: [...prevState.matches, {
            node: [this.props.nodes[i].id, this.props.nodes[j].id],
            delay: 0,
          }],
        }));
      }
    }
  }

  render() {
    return (
      <div className="container Settings">
        <h3>Nodes</h3>
        {this.props.nodes.map((node, index) =>
          <MinerRow key={index} index={index} id={node.id} type={node.type} color={node.color} miningTime={node.miningTime} minValue={node.minValue} mineNumber={node.mineNumber} maxPending={node.maxPending} />
        )}
        <h3>Delay of Network (seconds)</h3>
        <Form>
        {this.state.matches.map((match, index) =>
          <DelayRow key={index} node1={match.node[0]} node2={match.node[1]} delay={match.delay}/>
        )}
        </Form>
      </div>
    );
  }
}

export default Settings;
