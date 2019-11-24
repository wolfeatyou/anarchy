import {reaction, runInAction} from 'mobx';
import {PanelState} from './panel.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {IHierarchyPart} from './hierarchyPart.interface';

export class PartState {
  meta: IPartMeta;
  parent: IHierarchyPart;

  constructor(metadata: IPartMeta, parent: IHierarchyPart) {
    runInAction(() => {
      this.meta = metadata;
      this.parent = parent;
    });
  }
}





