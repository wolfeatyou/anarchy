import {action, observable, reaction, runInAction} from 'mobx';
import {DataSourceState} from './DataSourceState/datasource.state';
import {PanelState} from './panel.state';
import {IPageMeta} from '../meta/PageMeta';
import {PartState} from './part.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {IHierarchyPart} from './hierarchyPart.interface';
import {PartResolver} from './part.resolver';

export class PageState implements IHierarchyPart {
  @observable isCurrentPage: boolean;
  @observable metadata: IPageMeta;
  dataSources: DataSourceState[];
  panels: PanelState[];
  parts: PartState[];

  constructor(metadata: IPageMeta) {
    this.dataSources = [];
    this.parts = [];
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
    this.metadata.parts.forEach((partMeta: IPanelPartMeta) => {
       this.parts.push(new PartResolver().resolve(partMeta, this));
    });
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

  Visible(): boolean {
    return this.isCurrentPage;
  }


}





