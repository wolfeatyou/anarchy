import {reaction, runInAction} from 'mobx';
import {PanelState} from './panel.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {IHierarchyPart} from './hierarchyPart.interface';

export class PartState {
  internalmeta: IPartMeta;
  parent: IHierarchyPart;

  constructor(metadata: IPartMeta, parent: IHierarchyPart) {
    runInAction(() => {
      this.internalmeta = metadata;
      this.parent = parent;
    });
  }

  getPartType(){
    return this.internalmeta.type;
  }
}





