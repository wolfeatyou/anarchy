import {IPartMeta} from '../meta/PartMeta';
import {PartState} from './part.state';
import {IHierarchyPart} from './hierarchyPart.interface';
import {BarState} from './bar.state';
import {LinkState} from "./link.state";
import {ILinkMeta} from "../meta/LinkMeta";
import {IBarMeta} from "../meta/BarMeta";
import {PlaceholderState} from './placeholder.state';
import {IPlaceHolderMeta} from '../meta/PlaceHolderMeta';
import {ILayoutMeta} from '../meta/LayoutMeta';
import {LayoutState} from './layout.state';
import {IListMeta} from "../meta/ListMeta";
import {ListState} from "./list.state";
import {PanelState} from "./panel.state";

export class PartResolver {

  resolve(partMeta: IPartMeta, parent: IHierarchyPart){
    switch (partMeta.type) {
      case 'bar' : return new BarState(partMeta as IBarMeta, parent);
      case 'link' : return new LinkState(partMeta as ILinkMeta, parent);
      case 'placeholder' : return new PlaceholderState(partMeta as IPlaceHolderMeta, parent);
      case 'layout' : return new LayoutState(partMeta as ILayoutMeta, parent);
      case 'list' : return new ListState(partMeta as IListMeta, parent as PanelState);
      default : return new PartState(partMeta, parent);
    }
  }
}
