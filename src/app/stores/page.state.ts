import {action, observable, reaction, runInAction} from 'mobx';
import {DataSourceState} from './DataSourceState/datasource.state';
import {PanelState} from './panel.state';
import {IPageMeta} from '../meta/PageMeta';

export class PageState {
  @observable isCurrentPage: boolean;
  @observable metadata: IPageMeta;
  dataSources: [DataSourceState];
  panels: [PanelState];

  constructor(metadata: IPageMeta) {
    // @ts-ignore
    this.dataSources = [];
    reaction(() => this.metadata, (meta) => {
      if (meta) {
        this.init();
      }
    }, {name: `page metadata changed`, fireImmediately: true});
    runInAction(() => {
      this.metadata = metadata;
    });

  }

  init() {
  }

  @action
  setAsCurrentPage(value: boolean) {
    this.isCurrentPage = value;
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





