import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { TransactionGenerator } from './agents/transaction-generator';
import { Miner } from './agents/miner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  transactionGenerator: any;
  // test
  miner1: any;
  miner2: any;
  miner3: any;
  miners: any[] = [
    {
      id: 'miner1',
      name: 'Miner1',
      color: 'red'
    },
    {
      id: 'miner2',
      name: 'Miner2',
      color: 'yellow'
    },
    {
      id: 'miner3',
      name: 'Miner3',
      color: 'blue'
    }
  ];

  ngOnInit() {
    this.transactionGenerator = new TransactionGenerator('transactionGenerator');
    this.miner1 = new Miner('miner1');
    this.miner2 = new Miner('miner2');
    this.miner3 = new Miner('miner3');

    this.miner1.initBlockchain();
    this.miner2.initBlockchain();
    this.miner3.initBlockchain();
  }

  private onSendTransaction() {
    const formRows = document.getElementsByName('generator-row');
    for (let i = 0; i < formRows.length; i++) {
      const row = formRows[i];
      if ((<HTMLInputElement>row.getElementsByClassName('miner-id')[0]).checked === true) {
        const id: string = (<HTMLInputElement>row.getElementsByClassName('miner-id')[0]).value;
        const delay: number = parseInt((<HTMLInputElement>row.getElementsByClassName('delay')[0]).value, 10);
        this.transactionGenerator.publish(id, delay * 1000);
      }
    }
  }
}
