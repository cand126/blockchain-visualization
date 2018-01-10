import { Component, OnInit } from '@angular/core';
import { TransactionGenerator } from '../agents/transaction-generator';
import { FastMiner } from '../agents/fast-miner';
import { Itransaction } from '../types/itransaction';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})


export class VisualizerComponent implements OnInit {
  transactionGenerator: any;
  miner1: any;
  miner2: any;
  miner3: any;
  miners: string[] = ['miner1', 'miner2', 'miner3'];

  constructor() { }

  ngOnInit() {
    this.transactionGenerator = new TransactionGenerator('transactionGenerator');
    this.miner1 = new FastMiner('miner1', this);
    this.miner2 = new FastMiner('miner2', this);
    this.miner3 = new FastMiner('miner3', this);
  }

  addTransaction(id: string, transaction: any) {
    const node = document.createElement('div');
    node.innerText = JSON.stringify(transaction);
    console.log(id)
    document.getElementById(id).appendChild(node);
  }

  onSendTransaction() {
    const formRows = document.getElementById('formGenerator').getElementsByClassName('form-group');
    for (let i = 0; i < formRows.length; i++) {
      const row = formRows[i];
      if (row.getElementsByClassName('miner-id').length > 0) {
        if ((<HTMLInputElement>row.getElementsByClassName('miner-id')[0]).checked === true) {
          const id: string = (<HTMLInputElement>row.getElementsByClassName('miner-id')[0]).value;
          const delay: number = parseInt((<HTMLInputElement>row.getElementsByClassName('delay')[0]).value, 10);
          this.transactionGenerator.publish(id, delay * 1000);
        }
      }
    }
  }
}
