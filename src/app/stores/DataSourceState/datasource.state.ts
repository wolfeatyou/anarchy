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
      this.relations = DataSourceBuilder.getRelatedDataSources(metadata);
      this.relations.forEach((r: DataSourceRelation) => {
        const ds = this.applicationState.getDataSourceById(r.dataSourceId);
        r.selectedItemReaction = reaction(
          () => ds.selectedDataItem,
          async (selectedItem) => {
            console.log('selected item changed: ' + JSON.stringify(selectedItem));
            r.propertyReactions.forEach((pr: any) => pr());
            r.propertyReactions = [];
            r.propertyReactions.push(reaction(
              () => r.dataItemProperties.map((p: any) => selectedItem[p]),
              async (propValue) => {
                console.log('any related property changed:  - ' + propValue);
                await this.reload();
              },
              {fireImmediately: false}
            ));
            await this.reload();
          }
        );

      });
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
          d.push({title: this.code + '_' + i, desc: 'some data'});
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



