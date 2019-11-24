import {IPartMeta} from '../meta/PartMeta';
import {PartState} from './part.state';
import {IHierarchyPart} from './hierarchyPart.interface';
import {BarState} from './bar.state';

export class PartResolver {

  resolve(partMeta: IPartMeta, parent: IHierarchyPart){
    switch (partMeta.type) {
      case 'bar' : return new BarState(partMeta, parent);
      default : return new PartState(partMeta, parent);
    }
  }
}
