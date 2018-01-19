import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {
  @Input() appComponent: any;
  @Input() minerId: string;

  constructor() { }

  ngOnInit() {
    // subscribe
    this.appComponent.getWatchdog().addVisualizer(this.minerId, this);
  }

}
