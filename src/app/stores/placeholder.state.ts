import {PartState} from './part.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {IHierarchyPart} from './hierarchyPart.interface';
import {action, computed, observable, reaction} from 'mobx';
import {PartResolver} from './part.resolver';
import {IBarMeta} from '../meta/BarMeta';
import {ILinkMeta} from '../meta/LinkMeta';
import {IPlaceHolderMeta} from '../meta/PlaceHolderMeta';
import {PanelState} from './panel.state';
import {PanelResolver} from './panel.resolver';
import {PageState} from './page.state';
import {run} from 'tslint/lib/runner';

export class PlaceholderState extends PartState implements IHierarchyPart {

  @observable panelCode: string;

  panel: PanelState;

  constructor(metadata: IPlaceHolderMeta, parent: IHierarchyPart) {
    super(metadata, parent);
    let p = this.parent.GetPage();
    if (!p.placeHolders) {
      p.placeHolders = {};
    }
    p.placeHolders[this.id] = this;
    this.init();
  }


  @action
  init() {
    if (this.metadata.panel) {
      this.setPanelCode(this.metadata.panel);
    }
  }

  @action
  setPanelCode(code: string) {
    this.panelCode = code;
    const page = this.GetPage();
    const hierarchyIndex = this.getPlaceHolderHierarchyIndex();
    if (hierarchyIndex > 0) {
      page.applicationState.routeState.segmentUrlChanged(hierarchyIndex+1, this.panelCode);
    }
    if (code) {
      this.panel = new PanelResolver().getPanel(code, this);
    } else {
      this.panel = null;
    }

  }

  get id(): string {
    return this.metadata.code;
  }

  get metadata(): IPlaceHolderMeta {
    return this.internalmeta as IPlaceHolderMeta;
  }

  getPlaceHolderHierarchyIndex(): number {

    let index = 0;
    let current = this as PartState;
    if (!this.metadata.applyToUrl) {
      return 0;
    }
    while (current.parent !== null) {
      if (current.getPartType() === 'placeholder') {
        const placeHolderState = current as PlaceholderState;
        if (placeHolderState.metadata.applyToUrl) {
          index++;
        }
      }
      current = current.parent;
    }
    return index;
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
}
