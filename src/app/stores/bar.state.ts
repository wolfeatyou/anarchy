import {PartState} from './part.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {IHierarchyPart} from './hierarchyPart.interface';
import {computed} from 'mobx';
import {PartResolver} from './part.resolver';
import {IBarMeta} from '../meta/BarMeta';
import {ILinkMeta} from '../meta/LinkMeta';
import {PageState} from './page.state';
import {PanelState} from "./panel.state";

export class BarState extends PartState implements IHierarchyPart {
  items: PartState[];

  constructor(metadata: IPartMeta, parent: IHierarchyPart) {
    super(metadata, parent);
    this.init();
  }


  init() {
    this.items = [];
    if(this.metadata.items) {
      this.metadata.items.forEach((partMeta: IPanelPartMeta) => {
        this.items.push(new PartResolver().resolve(partMeta, this));
      });
    }
  }

  get metadata(): IBarMeta {
    return this.internalmeta as IBarMeta;
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
