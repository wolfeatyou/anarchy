import {PartState} from './part.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {IHierarchyPart} from './hierarchyPart.interface';
import {computed} from 'mobx';
import {PartResolver} from './part.resolver';
import {IBarMeta} from '../meta/BarMeta';
import {ILinkMeta} from '../meta/LinkMeta';
import {IPlaceHolderMeta} from '../meta/PlaceHolderMeta';
import {PanelState} from './panel.state';
import {PanelResolver} from './panel.resolver';

export class PlaceholderState extends PartState implements IHierarchyPart {

  panel: PanelState;

  constructor(metadata: IPlaceHolderMeta, parent: IHierarchyPart) {
    super(metadata, parent);
    this.init();
  }


  init() {
    if (this.metadata.panel) {
      this.panel = new PanelResolver().getPanel(this.metadata.panel, this);
    }
  }

  get metadata(): IPlaceHolderMeta {
    return this.internalmeta as IPlaceHolderMeta;
  }

  @computed get Visible(): boolean {
    return this.parent.Visible;
  }

  GetConditions() {
    return this.parent.GetConditions();
  }

  GetDataSources() {
    return this.parent.GetDataSources();
  }
}
