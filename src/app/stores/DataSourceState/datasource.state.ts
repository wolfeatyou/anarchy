import {observable, action, runInAction, computed, reaction} from 'mobx';
import {ApplicationState} from '../application.state';
import {DataSourceBuilder, DataSourceRelation} from './datasource.builder';
import {IDataSourceMeta} from '../../meta/DataSourceMeta';
import {PanelState} from '../panel.state';


export class DataSourceState {
  public code: string;
  @observable reloadCounter: number;
  private metadata: IDataSourceMeta;
  @observable data: any[];
  @observable selectedDataItem: any;
  @observable status: DataSourceStatus;
  relations: DataSourceRelation[];

  constructor(metadata: IDataSourceMeta, private panel: PanelState, private applicationState: ApplicationState) {
    runInAction(() => {
      this.code = metadata.code;
      this.applicationState.dataSources[metadata.code] = this;
      this.reloadCounter = 0;
      console.log(`ds '${metadata.code}' set metadata`);
      this.metadata = metadata;
      this.status = DataSourceStatus.MustRefresh;
      this.data = [];
      const relations = DataSourceBuilder.getRelatedDataSources(metadata);
      DataSourceBuilder.initRelatedDataSourceReactions(relations, applicationState, async () => {
        await this.reload();
      }, `(dataSource ${this.code})`);
      console.log(`ds '${metadata.code}' set relations`);
      this.relations = relations;
    });

    reaction(() => this.Visible, async (visibility: boolean) => {
      console.log(`ds '${metadata.code}' is visible: ` + visibility);
      if (visibility) {
        this.status = DataSourceStatus.MustRefresh;
        const notReloadedDs = this.relations.find((r: DataSourceRelation) => {
          const ds = applicationState.getDataSourceById(r.dataSourceId);
          return ds.status === DataSourceStatus.MustRefresh;
        });
        if (notReloadedDs == null) {
          await this.reload();
        }
      }
    }, {fireImmediately: true});
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

  @action.bound
  async reload() {
    runInAction(() => {
      console.log('set must refresh for ' + this.code)
      this.status = DataSourceStatus.MustRefresh;
    });
    if (this.Visible) {
      const d = await this.reloadAsync();
      runInAction(() => {
        this.data = d as any[];
        this.selectedDataItem = d[0];
        this.reloadCounter++;
        this.status = DataSourceStatus.Loaded;
        console.log('action async: data reloaded for ' + this.code + ', count:' + this.reloadCounter);
      });
    }
  }

  @computed get Visible() {
    return this.panel ? this.panel.Visible : true;
  }

}


export enum DataSourceStatus {
  MustRefresh,
  Loaded
}



