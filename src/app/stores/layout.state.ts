import {PartState} from './part.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {IHierarchyPart} from './hierarchyPart.interface';
import {computed} from 'mobx';
import {PartResolver} from './part.resolver';
import {IBarMeta} from '../meta/BarMeta';
import {ILinkMeta} from '../meta/LinkMeta';
import {ILayoutMeta} from '../meta/LayoutMeta';
import {PlaceholderState} from './placeholder.state';
import {InPlaceFileWriter} from '@angular/compiler-cli/ngcc/src/writing/in_place_file_writer';
import {IPlaceHolderMeta} from '../meta/PlaceHolderMeta';
import {PageState} from './page.state';
import {PanelState} from "./panel.state";

export class LayoutState extends PartState{

  constructor(metadata: ILayoutMeta, parent: IHierarchyPart) {
    super(metadata, parent);
    this.init();
  }

  placeholders: PlaceholderState[];


  init() {
    this.placeholders = [];
    this.metadata.placeholders.forEach(( p: IPlaceHolderMeta) => {
      this.placeholders.push(new PlaceholderState(p, this));
    });
  }

  get metadata(): ILayoutMeta {
    return this.internalmeta as ILayoutMeta;
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

  GetPage(): PageState {
    return this.parent.GetPage();
  }

  GetPanel(): PanelState {
    return this.parent.GetPanel();
  }
}
