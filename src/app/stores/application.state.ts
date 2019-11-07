import {observable, computed, action} from 'mobx';
import {Injectable} from '@angular/core';
import {PanelState} from './panel.state';
import {DataSourceState} from './DataSourceState/datasource.state';
import {MetadataResolver} from './matadata.resolver';


@Injectable()
export class ApplicationState {
  activePanel: PanelState;
  dataSources: any;
  panels: any;
  public metadataResolver: MetadataResolver;

  constructor() {
    this.dataSources = {};
    this.panels = {};
    this.metadataResolver = new MetadataResolver();
  }

  @action
  setActive(s: PanelState) {
    this.activePanel = s;
  }

  @action
  setActivePanel(packageCode: string, panelCode: string) {
    if (this.activePanel) {
      this.activePanel.setActive(false);
    }
    const panel = new PanelState(this.metadataResolver.resolvePanel(packageCode, panelCode), null, this);
    this.activePanel = panel;
    this.activePanel.setActive(true);
  }

  public getDataSourceById(id: string): DataSourceState {
    const ds = this.dataSources[id];
    if (!ds) {
      throw new Error('Cant find DataSource with code ' + id);
    }
    return ds;
  }

  public getPanelById(id: string): PanelState {
    const p = this.panels[id];
    if (!p) {
      throw new Error('Cant find panel with code ' + id);
    }
    return p;
  }

}


