import {computed, observable, reaction, runInAction} from 'mobx';
import {DataSourceState} from './DataSourceState/datasource.state';
import {IPanelMeta} from '../meta/PanelMeta';
import {ConditionState} from './condition.state';
import {PageState} from './page.state';

export class PanelState {
  @observable title: string;
  @observable metadata: IPanelMeta;
  dataSources: DataSourceState[];
  conditions: ConditionState[];

  constructor(metadata: IPanelMeta, private parentPanel: PanelState, public pageState: PageState) {

    reaction(() => this.metadata, (meta) => {
      if (meta) {
        console.log('reaction: metadata changed for panel ' + meta.code);
        this.init();
      }
    }, {name: `panel metadata changed`, fireImmediately: true});

    runInAction(() => {
      this.dataSources = [];
      this.metadata = metadata;
    });
  }

  @computed get Visible() {
    /*todo: use parent elements to determine visibility*/
    return this.pageState.isCurrentPage;
  }

  init() {
  }
}






