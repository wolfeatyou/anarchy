import {PartState} from './part.state';
import {IPartMeta} from '../meta/PartMeta';
import {IHierarchyPart} from './hierarchyPart.interface';

export class BarState extends PartState {
  constructor(metadata: IPartMeta, parent: IHierarchyPart) {
    super(metadata, parent);
  }
}
