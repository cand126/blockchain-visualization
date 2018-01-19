import { Component, OnInit, Input } from '@angular/core';
import * as eve from 'evejs';
import { Itransaction } from '../types/Itransaction';

@Component({
  selector: 'app-transaction-generator',
  templateUrl: './transaction-generator.component.html',
  styleUrls: ['./transaction-generator.component.scss']
})

/**
 * @class this class is resposible for generating transactions
 * @extends eve.Agent extends Agent class from eve framework
 */
export class TransactionGeneratorComponent extends eve.Agent implements OnInit {
  @Input() minerList: any;

  /**
  * @constructor
  * @param {string} id the id of the agent
  * @public
  */
  constructor() {
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    super(id);
    this.connect(eve.system.transports.getAll()); // connect to all transports configured by the system
  }

  ngOnInit() {
  }

  /**
   * @function generate generate a transaction
   * @returns {Itransaction} return the transaction that is generated, @see {@link Itransaction}
   * @private
   */
  private generate(): any {
    const transaction: Itransaction = {
      id: 'uuid',
      type: 'transaction',
      timestamp: new Date(),
      message: 'hello',
      reward: 10,
      privilege: 0
    };

    return transaction;
  }

  /**
   * @function publish publish a transaction with a delay time
   * @param {string} to the id of the agents who will receive the transaction
   * @param {number} delay the number of time to delay
   * @public
   */
  publish(to: string, delay: number): void {
    const transaction: Itransaction = this.generate();
    setTimeout(() => {
      this.send(to, transaction);
    }, delay);
  }
}
