import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {configure} from 'mobx';
import { MobxAngularModule } from 'mobx-angular';
import { AppComponent } from './app.component';
import {ApplicationState} from './stores/application.state';
import { PanelComponent } from './components/panel/panel.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    MobxAngularModule
  ],
  providers: [ApplicationState],
  bootstrap: [AppComponent]
})


export class AppModule {

  constructor() {
    configure({enforceActions: 'strict'});
  }
}

