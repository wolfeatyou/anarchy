import {action, computed, observable, reaction, runInAction} from 'mobx';
import {PanelState} from './panel.state';
import {IPageMeta} from '../meta/PageMeta';
import {IHierarchyPart} from './hierarchyPart.interface';
import {IPanelMeta} from '../meta/PanelMeta';
import {ApplicationState} from './application.state';

export class PageState extends PanelState {

  applicationState: ApplicationState;
  placeHolders: any;
  @observable isCurrentPage: boolean;

  constructor(metadata: IPageMeta, applicationState: ApplicationState) {
    super(metadata, null);
    this.applicationState = applicationState;
  }

  @action
  init(){

  }
  @action initPage(){
    super.init();
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

  GetPage(): PageState {
    return this;
  }


}





