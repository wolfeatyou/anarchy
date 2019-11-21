import {observable, computed, action, autorun, toJS, runInAction, reaction} from 'mobx';
import {Injectable} from '@angular/core';
import {DataSourceState} from './DataSourceState/datasource.state';
import {IPanelMeta} from '../meta/PanelMeta';
import {calculateSizes} from '@angular-devkit/build-angular/src/angular-cli-files/utilities/bundle-calculator';
import {ILinkMeta} from '../meta/LinkMeta';
import {PanelState} from './panel.state';
import {ConditionState} from './condition.state';
import {MetadataResolver} from './matadata.resolver';
import {IPanelPartMeta} from '../meta/PartMeta';

export class PartState {
  metadata: string;
  parent: PanelState
  constructor(metadata: IPanelPartMeta, panel: PanelState) {
    reaction(() => this.metadata, (meta) => {
      if (meta) {
        this.init();
      }
    }, {name: 'link metadata changed', fireImmediately: true});
    runInAction(() => {
      this.parent = panel;
    });
  }

  init() {
    console.log('link part changed:' + this.metadata ? this.metadata : 'null');
  }


}





