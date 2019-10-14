import {observable, computed, action, autorun, toJS, runInAction} from 'mobx';
import {Injectable} from '@angular/core';
import {DataSourceState} from './DataSourceState/datasource.state';

export class PanelState {
  @observable title: string;
  @observable dataSources: DataSourceState[];
  @observable panels: PanelState[];

  constructor({title}) {
    runInAction(() => {
      this.title = title;
      this.panels = [];
      this.dataSources = [];
    });
  }

  @action
  addSubPanel(s: PanelState) {
    this.panels.push(s);
  }

  @action
  addDataSource(d: DataSourceState) {
    this.dataSources.push(d);
  }

}





