import React, {Component} from 'react';
import {Card, CardHeader, CardBody, CardTitle, Form, FormGroup, Label, Col, Input, Row} from 'reactstrap';
import './Settings.css';

/**
 * Logger
 * @class
 */
class NodeCard extends Component {
  render() {
    return (
      <Card className="MinerCard">
        {this.props.index >= 0 ?
        <CardHeader>Node {this.props.index + 1}</CardHeader>
        :
        <CardHeader>Transaction Generator</CardHeader>
        }
        <CardBody>
          <Form>
            <CardTitle>Information</CardTitle>
            <Row className="settings-row">
              <Col sm="2">ID</Col>
              <Col sm="10">{this.props.node.id}</Col>
            </Row>
            {this.props.node.type && (
            <FormGroup row>
              <Label sm={2}>Name</Label>
              <Col sm={10}>
                <Input type="text" name="nodeName" value={this.props.node.name} />
              </Col>
            </FormGroup>
            )}
            {this.props.node.type && (
            <FormGroup row>
              <Label sm={2}>Type</Label>
              <Col sm={10}>
                <Input type="text" name="typeName" value={this.props.node.type} />
              </Col>
            </FormGroup>
            )}
            {this.props.node.type === 'miner' && (
            <FormGroup row>
              <Label sm={2}>Color</Label>
              <Col sm={10}>
                <Input type="text" name="color" value={this.props.node.color} />
              </Col>
            </FormGroup>
            )}
          </Form>
          <Form>
            <CardTitle>Delay of Network</CardTitle>
            {this.props.node.neighbors.map((neighbor, index) =>
              <FormGroup row>
                <Label sm={6}>{neighbor.name} ({neighbor.id})</Label>
                <Col sm={6}>
                  <Input type="number" name="delay" value={neighbor.delay} />
                </Col>
              </FormGroup>
            )}
          </Form>
          {this.props.node.type === 'miner' && (
            <Form>
              <CardTitle>Mining Strategy</CardTitle>
              <FormGroup row>
                <Label sm={6}>Mining Time (Seconds)</Label>
                <Col sm={6}>
                  <Input type="number" name="miningTime" value={this.props.node.miningTime} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={6}>Minimum Value of Transactions</Label>
                <Col sm={6}>
                  <Input type="number" name="minValue" value={this.props.node.minValue} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={6}>Number of Transactions to Mine</Label>
                <Col sm={6}>
                  <Input type="number" name="mineNumber" value={this.props.node.mineNumber} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={6}>Maximum Number of Pending Transactions</Label>
                <Col sm={6}>
                  <Input type="number" name="maxPending" value={this.props.node.maxPending} />
                </Col>
              </FormGroup>
            </Form>
          )}
        </CardBody>
      </Card>
    );
  }
}

export default NodeCard;
