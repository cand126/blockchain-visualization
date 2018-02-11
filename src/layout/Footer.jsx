import React, {Component} from 'react';
import {Button} from 'reactstrap';
import './Footer.css';

class Footer extends Component {
  timer;

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        counter: prevState.counter + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div className="d-flex justify-content-between align-items-center Footer">
        <div></div>
        <Button color="primary">Start</Button>
        <h3 className="d-flex align-items-center">Timer: {this.state.counter}</h3>
      </div>
    );
  }
}

export default Footer;
