import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { TransactionGeneratorComponent } from './transaction-generator/transaction-generator.component';
import { MinerComponent } from './miner/miner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VisualizerComponent,
    TransactionGeneratorComponent,
    MinerComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
