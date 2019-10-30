import {observable, computed, action, autorun, toJS, runInAction, reaction} from 'mobx';
import {Injectable} from '@angular/core';
import {DataSourceState} from './DataSourceState/datasource.state';
import {IPanelMeta} from '../meta/PanelMeta';
import {calculateSizes} from '@angular-devkit/build-angular/src/angular-cli-files/utilities/bundle-calculator';
import {ILinkMeta} from '../meta/LinkMeta';
import {PanelState} from './panel.state';
import {ConditionState} from './condition.state';

export class LinkState {
  @observable public title: string;
  @observable private metadata: ILinkMeta;
  private panel: PanelState;
  @observable private visibleCondition: ConditionState;

  constructor(metadata: ILinkMeta, panel: PanelState) {
    reaction(() => this.metadata, (meta) => {
      if (meta) {
        this.init();
      }
    }, {name: 'link metadata changed', fireImmediately: true});
    runInAction(() => {
      this.panel = panel;
      this.metadata = metadata;
      if (this.metadata.visibleCondition) {
        this.visibleCondition = this.panel.conditions.find((c: ConditionState) => c.code === this.metadata.visibleCondition);
        if (!this.visibleCondition) {
          throw Error('Condition not found ' + this.metadata.visibleCondition);
        }
      }
    });
  }

  init() {
    console.log('link meta changed:' + this.metadata ? this.metadata : 'null');
  }

  @computed get isVisible() {
    if (this.metadata.hidden === true) {
      return false;
    }
    if (this.visibleCondition) {
      return this.visibleCondition.Value;
    }
    return true;
  }

}





