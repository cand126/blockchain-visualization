import React, {Component} from 'react';
import {FormGroup, Label, Col, Input} from 'reactstrap';

/**
 * Logger
 * @class
 */
class DelayRow extends Component {
  render() {
    return (
      <FormGroup row>
        <Label sm={6}>{this.props.node1} & {this.props.node2}</Label>
        <Col sm={6}>
          <Input type="number" name="delay" value={this.props.time} />
        </Col>
      </FormGroup>
    );
  }
}

export default DelayRow;
