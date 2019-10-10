import {observable, computed, action, runInAction, autorun, toJS, flow, $mobx, reaction} from 'mobx';
import {Injectable, Inject} from '@angular/core';
import {ApplicationState} from './application.state';



export class DataSourceState {
  childSources: DataSourceState[]
  parentSources: DataSourceState[]
  public code: string;
  data: any[];
  @observable selected: any;
  @observable status: DataSourceStatus;
  reaction2: any;
  reaction1: any;
  reaction3: any;
  //@Inject(ApplicationState) private applicationState

  constructor(code: string, private applicationState: ApplicationState) {
    runInAction(() => {
      this.code = code;
      this.childSources = [];
      this.parentSources = [];
      this.status = DataSourceStatus.MustRefresh;
      this.data = [];
    });
  }

  @action
  setStatus(s: DataSourceStatus) {
    this.status = s;
  }

  @action
  addChildSource(d: DataSourceState) {
    this.childSources.push(d);
  }

  @action
  addParentSource(d: DataSourceState) {
    this.parentSources.push(d);
    console.log('appstate: ' );
    console.log(this.applicationState);
    this.reaction1 = reaction(
      () => d.status,
      s => console.log('reaction 1:', s)
    );
    this.reaction2 = reaction(
      () => d.selected,
      s => {
        console.log('reaction 2:', s)
        this.reaction3 = reaction(
          () => s.title,
          s2 => {
            console.log('reaction 3:', s2)

          }
        );
      }
    );

    //reaction2 = null;
  }

  @action
  reloadAsync() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let d = [];
        for (let i = 0; i < 5; i++) {
          d.push({title: this.code + '_' + i});
        }
        this.selected = d[0];
        resolve(d);
      }, 500);
    });

  }

  @action
  async reload() {
    if (this.parentSources.some((d: DataSourceState) => d.status === DataSourceStatus.MustRefresh)) {
      return;
    }
    const d = await this.reloadAsync()
    //  console.log(d)
    runInAction(() => {
      this.data = [{title: 'ssss'}];
      this.status = DataSourceStatus.Loaded;
    });
    /*  for (let i = 0; i < this.childSources.length; i++) {
        let c = this.childSources[0];
        await c.reload()
      }*/

    runInAction(() => {
      this.data = d as any[];
    });
  }

  /*@action
  async reload() {
    if (this.parentSources.some((d: DataSourceState) => d.status === DataSourceStatus.MustRefresh)) {
      return;
    }
    setTimeout(() => {
      let d = [];
      for (let i = 0; i < 5; i++) {
        d.push({title: this.code + '_' + i});
      }
      runInAction(() => {
        this.data = d;
        this.status = DataSourceStatus.Loaded;
        this.childSources.filter((c: DataSourceState) => c.status === DataSourceStatus.MustRefresh).forEach((c: DataSourceState) => {
          c.reload();
        });
      })
    }, 500)
  }*/

}


export enum DataSourceStatus {
  MustRefresh,
  Loaded
}

