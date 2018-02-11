import React, {Component} from 'react';
import {Card, CardHeader, CardBody, CardTitle, Form, FormGroup, Label, Col, Input} from 'reactstrap';
import './Settings.css';

/**
 * Logger
 * @class
 */
class MinerRow extends Component {
  render() {
    return (
      <Card className="MinerCard">
        <CardHeader>Node {this.props.index + 1}</CardHeader>
        <CardBody>
          <Form>
            <CardTitle>Information</CardTitle>
            <FormGroup row>
              <Label sm={2}>ID</Label>
              <Col sm={10}>
                <Input type="text" name="nodeId" value={this.props.id} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Type</Label>
              <Col sm={10}>
                <Input type="text" name="typeName" value={this.props.type} />
              </Col>
            </FormGroup>
            {this.props.type === 'miner' && (
            <FormGroup row>
              <Label sm={2}>Color</Label>
              <Col sm={10}>
                <Input type="text" name="color" value={this.props.color} />
              </Col>
            </FormGroup>
            )}
          </Form>
          {this.props.type === 'miner' && (
            <Form>
              <CardTitle>Mining Strategy</CardTitle>
              <FormGroup row>
                <Label sm={6}>Mining Time (Seconds)</Label>
                <Col sm={6}>
                  <Input type="number" name="miningTime" value={this.props.miningTime} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={6}>Minimum Value of Transactions</Label>
                <Col sm={6}>
                  <Input type="number" name="minValue" value={this.props.minValue} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={6}>Number of Transactions to Mine</Label>
                <Col sm={6}>
                  <Input type="number" name="mineNumber" value={this.props.mineNumber} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={6}>Maximum Number of Pending Transactions</Label>
                <Col sm={6}>
                  <Input type="number" name="maxPending" value={this.props.maxPending} />
                </Col>
              </FormGroup>
            </Form>
          )}
        </CardBody>
      </Card>
    );
  }
}

export default MinerRow;
