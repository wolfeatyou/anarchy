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
  @observable private visible: boolean;
  private panel: PanelState;
  @observable private visibleCondition: ConditionState;

  constructor(metadata: ILinkMeta, panel: PanelState) {
    reaction(() => this.metadata, (meta) => {
      this.init();
    }, {name: 'link metadata changed'});
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

  @action
  init() {
    this.visible = this.metadata.visible === false;
  }

  @computed get isVisible() {
    if (this.visible) {
      return true;
    }
    if (this.visibleCondition) {
      return this.visibleCondition.Value;
    }
    return false;
  }

}





