import {observable, computed, action, autorun, toJS, runInAction, reaction} from 'mobx';
import {Injectable} from '@angular/core';
import {DataSourceState} from './DataSourceState/datasource.state';
import {IPanelMeta} from '../meta/PanelMeta';
import {calculateSizes} from '@angular-devkit/build-angular/src/angular-cli-files/utilities/bundle-calculator';
import {LinkState} from './link.state';
import {ConditionState} from './condition.state';
import {IDataSourceMeta} from '../meta/DataSourceMeta';
import {MetaDataParser} from '../meta/parser/MetaDataParser';
import {ApplicationState} from './application.state';
import {IConditionMeta} from '../meta/ConditionMeta';
import {ILinkMeta} from '../meta/LinkMeta';

export class PanelState {
  @observable title: string;
  dataSources: DataSourceState[];
  conditions: ConditionState[];
  subPanels: PanelState[];
  @observable links: LinkState[];
  @observable tabs: LinkState[];
  @observable metadata: IPanelMeta;

  constructor(metadata: IPanelMeta, public appState: ApplicationState) {
    reaction(() => this.metadata, (meta) => {
      this.init();
    });
    runInAction(() => {
      this.subPanels = [];
      this.dataSources = [];
      this.metadata = metadata;
    });
  }

  @action
  init() {
    if (this.metadata.dataSources) {
      this.dataSources = [];
      this.metadata.dataSources.forEach((dsMeta: IDataSourceMeta) => {
        this.dataSources.push(new DataSourceState(dsMeta, this.appState));
      });
    }
    if (this.metadata.conditions) {
      this.conditions = [];
      this.metadata.conditions.forEach((conditionMeta: IConditionMeta) => {
        this.conditions.push(new ConditionState(conditionMeta, this));
      });
    }

    if (this.metadata.links) {
      this.links = [];
      this.metadata.links.forEach((linkMeta: ILinkMeta) => {
        this.links.push(new LinkState(linkMeta, this));
      });
    }
    if (this.metadata.tabs) {
      this.tabs = [];
      this.metadata.tabs.forEach((linkMeta: ILinkMeta) => {
        this.tabs.push(new LinkState(linkMeta, this));
      });
    }
  }

  @computed get getTabsMeta() {
    return this.tabs.filter(t => t.isVisible);
  }


  @action
  addSubPanel(s: PanelState) {
    this.subPanels.push(s);
  }

  @action
  addDataSource(d: DataSourceState) {
    this.dataSources.push(d);
  }

}





