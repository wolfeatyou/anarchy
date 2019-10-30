import {observable, computed, action} from 'mobx';
import {Injectable} from '@angular/core';
import {PanelState} from './panel.state';
import {DataSourceState} from './DataSourceState/datasource.state';
import {MetadataResolver} from './matadata.resolver';


@Injectable()
export class ApplicationState {
  activePanel;
  dataSources: any;
  public metadataResolver: MetadataResolver;

  constructor() {
    this.dataSources = {};
    this.metadataResolver = new MetadataResolver();
  }

  @action
  setActive(s: PanelState) {
    this.activePanel = s;
  }

  @action
  setActivePanel(packageCode: string, panelCode: string) {
    const panel = new PanelState(this.metadataResolver.resolvePanel(packageCode, panelCode), this);
    this.activePanel = panel;
  }

  public getDataSourceById(id: string): DataSourceState {
    const ds = this.dataSources[id];
    if (!ds) {
      throw new Error('Cant find DataSource with code ' + id);
    }
    return ds;
  }

}


