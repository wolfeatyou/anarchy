import {observable, computed, action} from 'mobx';
import {Injectable} from '@angular/core';
import {PanelState} from './panel.state';
import {DataSourceState} from './DataSourceState/datasource.state';


@Injectable()
export class ApplicationState {
  @observable activePanel;
  dataSources: any;

  constructor() {
    this.dataSources = {};
  }

  @action
  setActive(s: PanelState) {
    this.activePanel = s;
  }

  public getDataSourceById(id: string): DataSourceState {
    const ds = this.dataSources[id];
    if (!ds) {
      throw new Error('Cant find DataSource with code ' + id);
    }
    return ds;
  }

}


