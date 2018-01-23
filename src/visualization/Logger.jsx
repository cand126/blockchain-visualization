import React, {Component} from 'react';
import './Logger.css';
import Watchdog from '../watchdog/Watchdog';

/**
 * Logger
 * @class
 */
class Logger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logList: [],
    };
  }

  componentDidMount() {
    Watchdog.getInstance().addLogger(this);
  }

  addlog(id, data) {
    this.setState((prevState) => ({
      logList: [...prevState.logList, {
        minerId: id,
        data: data,
      }],
    }));
  }

  render() {
    return (
      <div className="container-fluid Logger">
        <h3>Log</h3>
        {this.state.logList.map((log, index) =>
          <div key={index}>
            {log.minerId} received a {log.data.type} ({log.data.id})
          </div>
        )}
      </div>
    );
  }
}

export default Logger;
