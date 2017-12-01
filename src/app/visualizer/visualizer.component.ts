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
  a1: Itransaction[] = [];
  a2: Itransaction[] = [];

  constructor() { }

  ngOnInit() {
    console.log('hi');
    const transactionGenerator: any = new TransactionGenerator('transactionGenerator');
    const miner1: any = new FastMiner('miner1');
    const miner2: any = new FastMiner('miner2');

    transactionGenerator.publish('miner1', 1000);
    transactionGenerator.publish('miner2', 2000);
    transactionGenerator.publish('miner2', 3000);

    console.log(document.getElementsByTagName('h1'));
  }

}
