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
  placeholderPanels: PanelState[];
  tabPanels: PanelState[];
  selectedTabChangeCounter: number;
  @observable selectedTab: LinkState;
  @observable links: LinkState[];
  @observable tabs: LinkState[];
  @observable metadata: IPanelMeta;


  constructor(metadata: IPanelMeta, public appState: ApplicationState) {
    reaction(() => this.metadata, (meta) => {
      if (meta) {
        console.log('reaction: metadata changed for panel ' + meta.code);
        this.init();
      }
    }, {name: `panel metadata changed`, fireImmediately: true});
    reaction(() => this.selectedTab, this.selectedTabChanged, {fireImmediately: true});
    reaction(() => this.Tabs, this.tabsCountChanged, {fireImmediately: true});

    runInAction(() => {
      this.selectedTabChangeCounter = 0;
      this.placeholderPanels = [];
      this.tabPanels = [];
      this.dataSources = [];
      this.selectedTab = null;
      this.metadata = metadata;
    });
  }

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
        const tab = new LinkState(linkMeta, this);
        console.log('tab is vis:' + tab.isVisible);
        this.tabs.push(tab);
      });
    }
  }

  @action.bound
  selectedTabChanged(tabLink: LinkState) {
    this.selectedTabChangeCounter++;
    console.log('selected tab changed: ' + this.selectedTabChangeCounter);
    //let it be empty
  }


  @action.bound
  tabsCountChanged(tabs: LinkState[]) {
    console.log('tabs count changed:' + tabs.length);
    console.log('selected tab:' + this.selectedTab);
    if (tabs.indexOf(this.selectedTab) === -1) {

      runInAction(() => {
        if (tabs.length === 0) {
          this.selectedTab = null;
        } else {
          console.log('change selected tab');
          this.selectedTab = this.tabs[0];
        }
      });

    }

  }


  @computed get Links() {
    return this.tabs.filter(t => t.isVisible);
  }

  @computed get Tabs() {
    return this.tabs ? this.tabs.filter(t => t.isVisible) : [];
  }

  @action
  addDataSource(d: DataSourceState) {
    this.dataSources.push(d);
  }

}





