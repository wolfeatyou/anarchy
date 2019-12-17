import {computed, observable, reaction, runInAction} from 'mobx';
import {DataSourceState} from './DataSourceState/datasource.state';
import {IPanelMeta} from '../meta/PanelMeta';
import {ConditionState} from './condition.state';
import {IHierarchyPart} from './hierarchyPart.interface';
import {PartState} from './part.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {PartResolver} from './part.resolver';
import {IDataSourceMeta} from '../meta/DataSourceMeta';
import {PageState} from './page.state';


export class PanelState extends PartState{
  @observable title: string;
  dataSources: DataSourceState[];
  conditions: ConditionState[];
  parts: PartState[];

  constructor(metadata: IPanelMeta, parent: IHierarchyPart) {
    super(metadata, parent);
    this.dataSources = [];
    this.parts = [];
    this.init();
  }

  @computed get Visible(): boolean {
    return this.parent.Visible;
  }

  init() {
    if (this.metadata.dataSources) {
      this.metadata.dataSources.forEach((dsMeta: IDataSourceMeta) => {
        this.dataSources.push(new DataSourceState(dsMeta, this));
      });
    }
    if (this.metadata.parts) {
      this.metadata.parts.forEach((partMeta: IPanelPartMeta) => {
        this.parts.push(new PartResolver().resolve(partMeta, this));
      });
    }

  }

  GetConditions() {
    return this.conditions;
  }

  GetDataSources() {
    let allDataSources: DataSourceState[] = [];
    if (this.parent) {
      allDataSources = this.parent.GetDataSources();
    }
    return allDataSources.concat(this.dataSources);
  }

  get metadata(): IPanelMeta {
    return this.internalmeta as IPanelMeta;
  }

  getDataSourceById(id: string): DataSourceState {
    const ds = this.GetDataSources().find((d: DataSourceState) => d.code === id);
    if (!ds) {
      throw new Error('Datasource not found ' + id);
    }
    return ds;
  }

  GetPage(): PageState {
    return this.parent.GetPage();
  }
}






