import {action, computed, observable, reaction, runInAction} from 'mobx';
import {PanelState} from './panel.state';
import {IPageMeta} from '../meta/PageMeta';
import {IHierarchyPart} from './hierarchyPart.interface';
import {IPanelMeta} from '../meta/PanelMeta';

export class PageState extends PanelState implements IHierarchyPart {
  @observable isCurrentPage: boolean;

  constructor(metadata: IPageMeta, parent: IHierarchyPart) {
    super(metadata, parent);

  }

  @action
  setAsCurrentPage(value: boolean) {

    this.isCurrentPage = value;
  }


  @computed get Visible(): boolean {
    if (this.parent) {
      return this.parent.Visible;
    }
    return this.isCurrentPage;
  }

  GetConditions() {
    return [];
  }

}





