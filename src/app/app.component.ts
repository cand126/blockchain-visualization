import { Component, OnInit } from '@angular/core';
import { TransactionGenerator } from './agents/transaction-generator';
import { FastMiner } from './agents/fast-miner';
import { Itransaction } from './types/itransaction';
import { Watchdog } from './watchdog/watchdog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  watchdog: any;
  visualizer: any;
  transactionGenerator: any;
  miner1: any;
  miner2: any;
  miner3: any;
  miners: any[] = [
    {
      id: 'miner1',
      name: 'Miner1'
    },
    {
      id: 'miner2',
      name: 'Miner2'
    },
    {
      id: 'miner3',
      name: 'Miner3'
    }
  ];

  ngOnInit() {
    this.watchdog = new Watchdog();
    this.visualizer =
    this.transactionGenerator = new TransactionGenerator('transactionGenerator');
    this.miner1 = new FastMiner('miner1', this);
    this.miner2 = new FastMiner('miner2', this);
    this.miner3 = new FastMiner('miner3', this);
  }

  private onSendTransaction() {
    const formRows = document.getElementsByName('generator-row');
    for (let i = 0; i < formRows.length; i++) {
      const row = formRows[i];
      console.log(row);
      if ((<HTMLInputElement>row.getElementsByClassName('miner-id')[0]).checked === true) {
        const id: string = (<HTMLInputElement>row.getElementsByClassName('miner-id')[0]).value;
        const delay: number = parseInt((<HTMLInputElement>row.getElementsByClassName('delay')[0]).value, 10);
        this.transactionGenerator.publish(id, delay * 1000);
      }
    }
  }
}
