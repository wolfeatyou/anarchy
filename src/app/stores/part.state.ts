import {reaction, runInAction} from 'mobx';
import {PanelState} from './panel.state';
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





