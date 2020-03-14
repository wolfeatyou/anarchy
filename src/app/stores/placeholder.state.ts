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
import {DataSourceState} from './DataSourceState/datasource.state';

export class PlaceholderState extends PartState{

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


  getDefaultPanelCode() {
    const hierarchyIndex = this.getPlaceHolderHierarchyIndex();
    if (hierarchyIndex > 0) {
      const page = this.GetPage();
      const path = page.route.getSegmentUrl(hierarchyIndex + 1);
      if (path) {
        return path;
      }

    }
    if (this.metadata.panel) {
      return this.metadata.panel;
    }
  }

  @action
  init() {
    const defaultPanelCode = this.getDefaultPanelCode();
    if (defaultPanelCode) {
      this.setPanelCode(defaultPanelCode);
    }
  }

  getDataSourceCodes() {
    return this.GetDataSources().map((ds: DataSourceState) => ds.code);
  }

  @action
  setPanelCode(code: string) {
    this.panelCode = code;
    const page = this.GetPage();
    const hierarchyIndex = this.getPlaceHolderHierarchyIndex();
    if (hierarchyIndex > 0) {
      page.route.segmentUrlChanged(hierarchyIndex + 1, this.panelCode, this.getDataSourceCodes());
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
      current = current.parent as PartState;
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

  getStyles() {
    var styles = {}
    if(this.metadata.boxDecorations){
      if(this.metadata.boxDecorations.align){
        styles["align-items"] = this.metadata.boxDecorations.align;
      }
      if(this.metadata.boxDecorations.paddingTop){
        styles["padding-top"] = this.metadata.boxDecorations.paddingTop;
      }
      if(this.metadata.boxDecorations.borderWidth){
        styles["border-width"] = this.metadata.boxDecorations.borderWidth;
      }
      if(this.metadata.boxDecorations.borderWidth){
        styles["min-width"] = this.metadata.boxDecorations.width;
      }
    }
    return styles;
  }
}
