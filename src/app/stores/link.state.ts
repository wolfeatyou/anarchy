import {observable, computed, action, autorun, toJS, runInAction, reaction} from 'mobx';
import {Injectable} from '@angular/core';
import {DataSourceState} from './DataSourceState/datasource.state';
import {IPanelMeta} from '../meta/PanelMeta';
import {calculateSizes} from '@angular-devkit/build-angular/src/angular-cli-files/utilities/bundle-calculator';
import {ILinkMeta} from '../meta/LinkMeta';
import {PanelState} from './panel.state';

export class LinkState {
  @observable metadata: ILinkMeta;
  @observable title: string;
  @observable visible: boolean;
  panel: PanelState;

  constructor(metadata: ILinkMeta, panel: PanelState) {
    reaction(() => this.metadata, (meta) => {
      this.init();
    });
    runInAction(() => {
      this.panel = panel;
      this.metadata = metadata;
    });
  }

  @action
  init() {
    this.visible = this.metadata.visible === false;
  }

}





