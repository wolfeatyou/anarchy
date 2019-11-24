import {computed, observable, reaction, runInAction} from 'mobx';
import {DataSourceState} from './DataSourceState/datasource.state';
import {IPanelMeta} from '../meta/PanelMeta';
import {ConditionState} from './condition.state';
import {PageState} from './page.state';
import {IHierarchyPart} from './hierarchyPart.interface';

export class PanelState implements IHierarchyPart {
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

  @computed get Visible(): boolean {
    return this.pageState.isCurrentPage;
  }

  init() {
  }

  GetConditions() {
    return this.conditions;
  }
}






