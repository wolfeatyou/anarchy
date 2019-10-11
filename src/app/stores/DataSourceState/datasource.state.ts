import {observable, computed, action, runInAction, autorun, toJS, flow, $mobx, reaction} from 'mobx';
import {Injectable, Inject} from '@angular/core';
import {ApplicationState} from '../application.state';
import {DataSourceBuilder, DataSourceRelation} from './datasource.builder';


export class DataSourceState {
  public id: string;
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
      this.metadata = metadata;
      this.status = DataSourceStatus.MustRefresh;
      this.data = [];
      this.relations = DataSourceBuilder.getRelatedDataSources(metadata);
      this.relations.forEach((r: DataSourceRelation) => {
        const ds = this.appState.getDataSourceById(r.dataSourceId);
        r.selectedItemReaction = reaction(
          () => ds.selectedDataItem,
          async (selectedItem) => {
            console.log('selected item changed: ' + JSON.stringify( selectedItem));
            r.propertyReactions.forEach((pr: any) => pr());
            r.propertyReactions = [];
            r.dataItemProperties.forEach((prop: string) => {
              r.propertyReactions.push(reaction(
                () => selectedItem[prop],
                async (propValue) => {
                  console.log('property changed: ' + prop + ' - ' + propValue);
                  await this.reload();
                }
              ));
            });
            await this.reload();
          }
        );

      });
      /* Array.from(new Set(this.relations.map((r) => r.dataSourceId))).forEach((dataSourceId: string) => {
         const ds = this.appState.getDataSourceById(dataSourceId);
         this.reactions.push(reaction(
           () => ds.selectedDataItem,
           async (s) => {
             this.reactions.filter((r: DataSourceRelation) => {
               if (r.dataSourceId === ds.id) {
                 r();
               }
             });
             runInAction(() => {
               this.status = DataSourceStatus.MustRefresh;
             });
           }));
       });

       relations.forEach((relation: DataSourceRelation) => {
         const ds = this.appState.getDataSourceById(relation.dataSourceId);
         this.reactions.push(reaction(
           () => ds.selectedDataItem[relation.dataItemProperty],
           async (s) => {
             //  if (s === DataSourceStatus.Loaded) {
             await this.reload();
             //}
           }));
       });*/
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
          d.push({title: this.id + '_' + i});
        }
        resolve(d);
      }, 500);
    });

  }

  @action
  async reload() {
    const d = await this.reloadAsync();
    runInAction(() => {
      console.log('Data reloaded for ' + this.id);
      this.status = DataSourceStatus.Loaded;
      this.data = d as any[];
      this.selectedDataItem = d[0];
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

