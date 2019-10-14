import {observable, computed, action, runInAction, autorun, toJS, flow, $mobx, reaction} from 'mobx';
import {Injectable, Inject} from '@angular/core';
import {ApplicationState} from '../application.state';
import {DataSourceBuilder, DataSourceRelation} from './datasource.builder';


export class DataSourceState {
  public id: string;
  @observable reloadCounter: number;
  private metadata: any;
  data: any[];
  @observable selectedDataItem: any;
  @observable status: DataSourceStatus;
  relations: DataSourceRelation[];
  appState: any;

  constructor(id: string, metadata: any, private applicationState: ApplicationState) {
    runInAction(() => {
      this.appState = applicationState;
      this.appState.dataSources[id] = this;
      this.id = id;
      this.reloadCounter = 1;
      this.metadata = metadata;
      this.status = DataSourceStatus.MustRefresh;
      this.data = [];
      this.relations = DataSourceBuilder.getRelatedDataSources(metadata);
      this.relations.forEach((r: DataSourceRelation) => {
        const ds = this.appState.getDataSourceById(r.dataSourceId);
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
          d.push({title: this.id + '_' + i, desc: 'wrewewe'});
        }
        resolve(d);
      }, 50);
    });

  }

  @action
  async reload() {
    const d = await this.reloadAsync();
    runInAction(() => {
      console.log('Data reloaded for ' + this.id + ', count:' + this.reloadCounter);
      this.status = DataSourceStatus.Loaded;
      this.data = d as any[];
      this.selectedDataItem = d[0];
      this.reloadCounter++;
    });
  }

}


export enum DataSourceStatus {
  MustRefresh,
  Loaded
}

export enum DataSourceOperationType {
  read = 'read',
  update = 'update',
  onchange = 'onchange',
  action = 'action'
}

