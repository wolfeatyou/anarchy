import {observable, action, runInAction, computed, reaction} from 'mobx';
import {ApplicationState} from '../application.state';
import {DataSourceBuilder, DataSourceRelation} from './datasource.builder';
import {IDataSourceMeta} from '../../meta/DataSourceMeta';
import {PanelState} from '../panel.state';


export class DataSourceState {
  public code: string;
  @observable reloadCounter: number;
  private metadata: IDataSourceMeta;
  data: any[];
  @observable selectedDataItem: any;
  @observable status: DataSourceStatus;
  relations: DataSourceRelation[];

  constructor(metadata: IDataSourceMeta, private panel: PanelState, private applicationState: ApplicationState) {
    reaction(() => this.Visible, (visibility: boolean) => {
      console.log(`ds '${metadata.code}' is visible: ` + visibility);
    }, {fireImmediately: true});
    runInAction(() => {
      this.code = metadata.code;
      this.applicationState.dataSources[metadata.code] = this;
      this.reloadCounter = 0;
      this.metadata = metadata;
      this.status = DataSourceStatus.MustRefresh;
      this.data = [];
      const relations = DataSourceBuilder.getRelatedDataSources(metadata);
      DataSourceBuilder.initRelatedDataSourceReactions(relations, applicationState, async () => {
        await this.reload();
      }, `(dataSource ${this.code})`);
      this.relations = relations;
    });
  }

  @action
  setStatus(s: DataSourceStatus) {
    this.status = s;
  }

  @action
  setSelectedIndex(index: number) {
    this.selectedDataItem = this.data[index];
  }

  @action
  reloadAsync() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const d: any [] = [];
        for (let i = 0; i < 5; i++) {
          d.push({title: this.code + '_' + i, desc: 'some data', id: i});
        }
        resolve(d);
      }, 1);
    });

  }

  @action('Reload data source')
  async reload() {
    this.status = DataSourceStatus.MustRefresh;
    const d = await this.reloadAsync();
    runInAction(() => {
      this.status = DataSourceStatus.Loaded;
      this.data = d as any[];
      this.selectedDataItem = d[0];
      this.reloadCounter++;
      console.log('action async: data reloaded for ' + this.code + ', count:' + this.reloadCounter);
    });
  }

  @computed get Visible() {
    return this.panel.Visible;
  }

}


export enum DataSourceStatus {
  MustRefresh,
  Loaded
}



