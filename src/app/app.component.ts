import { Component, OnInit } from '@angular/core';
// import { NgStyle } from '@angular/common';
import { TransactionGenerator } from './agents/transaction-generator';
import { Miner } from './agents/miner';
import { Watchdog } from './watchdog/watchdog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // transactionGenerator: any;
  // test
  // miner1: any;
  // miner2: any;
  // miner3: any;
  minerList: any[] = [];

  watchdog: any;
  self = this;

  ngOnInit() {
    this.watchdog = new Watchdog();

    // this.transactionGenerator = new TransactionGenerator('transactionGenerator');
    // test
    this.minerList.push({
      name: 'Miner1'
    });
    this.minerList.push({
      name: 'Miner2'
    });
    this.minerList.push({
      name: 'Miner3'
    });
    // this.miner1 = new Miner('miner1');
    // this.miner2 = new Miner('miner2');
    // this.miner3 = new Miner('miner3');

    // this.miner1.initBlockchain();
    // this.miner2.initBlockchain();
    // this.miner3.initBlockchain();
  }

  private onSendTransaction() {
    const formRows = document.getElementsByName('generator-row');
    for (let i = 0; i < formRows.length; i++) {
      const row = formRows[i];
      if ((<HTMLInputElement>row.getElementsByClassName('miner-id')[0]).checked === true) {
        const id: string = (<HTMLInputElement>row.getElementsByClassName('miner-id')[0]).value;
        const delay: number = parseInt((<HTMLInputElement>row.getElementsByClassName('delay')[0]).value, 10);
        // this.transactionGenerator.publish(id, delay * 1000);
      }
    }
  }

  public getWatchdog(): any {
    return this.watchdog;
  }

  minerIdChange(event) {
    console.log(event);
  }
}
