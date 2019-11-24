import {reaction, runInAction} from 'mobx';
import {PanelState} from './panel.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {IHierarchyPart} from './hierarchyPart.interface';

export class PartState {
  metadata: string;
  parent: IHierarchyPart;

  constructor(metadata: IPartMeta, parent: IHierarchyPart) {
    reaction(() => this.metadata, (meta) => {
      if (meta) {
        this.init();
      }
    }, {name: 'part metadata changed', fireImmediately: true});
    runInAction(() => {
      this.parent = parent;
    });
  }

  init() {
    console.log('part part changed:' + this.metadata ? this.metadata : 'null');
  }


}





