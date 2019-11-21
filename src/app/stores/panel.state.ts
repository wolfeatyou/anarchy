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
import {IAppControl, IAppControlTypes} from './IAppControl.interface';

export class PanelState  {
  @observable title: string;
  @observable metadata: IPanelMeta;
  dataSources: DataSourceState[];
  conditions: ConditionState[];

  constructor(metadata: IPanelMeta, private parentPanel: PanelState, public appState: ApplicationState) {

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

  init() {
  }
}






