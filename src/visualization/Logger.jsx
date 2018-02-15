import React, {Component} from 'react';
import './Logger.css';
import Watchdog from '../watchdog/Watchdog';

/**
 * Logger
 * @class
 */
class Logger extends Component {
  /**
   * @public
   */
  constructor(props) {
    super(props);
    this.state = {
      logList: [],
    };
  }

  /**
   * @public
   */
  componentDidMount() {
    Watchdog.getInstance().addLogger(this);
  }

  /**
   * @public
   */
  addlog(id, data) {
    this.setState((prevState) => ({
      logList: [...prevState.logList, {
        minerId: id,
        data: data,
      }],
    }));
  }

  /**
   * @public
   */
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
