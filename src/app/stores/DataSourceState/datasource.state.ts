import {observable, action, runInAction, reaction} from 'mobx';
import {ApplicationState} from '../application.state';
import {DataSourceBuilder, DataSourceRelation} from './datasource.builder';
import {IDataSourceMeta} from '../../meta/DataSourceMeta';


export class DataSourceState {
  public code: string;
  @observable reloadCounter: number;
  private metadata: IDataSourceMeta;
  data: any[];
  @observable selectedDataItem: any;
  @observable status: DataSourceStatus;
  relations: DataSourceRelation[];
  private reactions: any;

  constructor(metadata: IDataSourceMeta, private applicationState: ApplicationState) {
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
      });
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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const d: any [] = [];
        for (let i = 0; i < 5; i++) {
          d.push({title: this.code + '_' + i, desc: 'some data', id: i});
        }
        resolve(d);
      }, 1);
    });

  }

  @action
  async reload() {
    this.status = DataSourceStatus.MustRefresh;
    const d = await this.reloadAsync();
    runInAction(() => {
      this.status = DataSourceStatus.Loaded;
      this.data = d as any[];
      this.selectedDataItem = d[0];
      this.reloadCounter++;
      console.log('Data reloaded for ' + this.code + ', count:' + this.reloadCounter);
    });
  }

}


export enum DataSourceStatus {
  MustRefresh,
  Loaded
}



