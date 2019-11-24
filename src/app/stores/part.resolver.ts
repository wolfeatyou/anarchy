import {IPartMeta} from '../meta/PartMeta';
import {PartState} from './part.state';
import {IHierarchyPart} from './hierarchyPart.interface';
import {BarState} from './bar.state';
import {LinkState} from "./link.state";
import {ILinkMeta} from "../meta/LinkMeta";
import {IBarMeta} from "../meta/BarMeta";

export class PartResolver {

  resolve(partMeta: IPartMeta, parent: IHierarchyPart){
    switch (partMeta.type) {
      case 'bar' : return new BarState(partMeta as IBarMeta, parent);
      case 'link' : return new LinkState(partMeta as ILinkMeta, parent);

      default : return new PartState(partMeta, parent);
    }
  }
}
