import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {configure} from 'mobx';
import {MobxAngularModule} from 'mobx-angular';
import {AppComponent} from './app.component';
import {ApplicationState} from './stores/application.state';
import {PanelComponent} from './components/panel/panel.component';
import {ListComponent} from './components/list/list.component';
import {RouterModule, Routes} from '@angular/router';
import {RouteState} from './stores/route.state';
import {DynamicComponent} from './components/dynamic/dynamic.component';
import {MetadataResolver} from './stores/matadata.resolver';

const routes: Routes = [
  {
    path: '**',
    component: AppComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    ListComponent,
    DynamicComponent
  ],
  imports: [
    BrowserModule,
    MobxAngularModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [ApplicationState, RouterModule, RouteState, MetadataResolver],
  bootstrap: [AppComponent]
})


export class AppModule {

  constructor() {
    configure({enforceActions: 'strict'});
  }
}

