import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  timer; // reference for the timer
  counter = 0;

  constructor() { }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.counter++;
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
  }
}
