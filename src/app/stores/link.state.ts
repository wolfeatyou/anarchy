import {action, computed, observable, reaction, runInAction} from 'mobx';
import {ILinkMeta} from '../meta/LinkMeta';
import {PanelState} from './panel.state';
import {ConditionState} from './condition.state';
import {IHierarchyPart} from './hierarchyPart.interface';
import {PartState} from './part.state';
import {IPartMeta} from '../meta/PartMeta';
import {PlaceholderState} from './placeholder.state';
import {PageState} from './page.state';
import {DataSourceState} from './DataSourceState/datasource.state';
import {ILabelMeta} from '../meta/LabelMeta';
import {LabelState} from './label.state';
import {PanelResolver} from './panel.resolver';
import {PageResolver} from './page.resolver';

export class LinkState extends PartState {
  public code: string;
  public label: LabelState;
  @observable private visibleCondition: ConditionState;

  constructor(metadata: IPartMeta, parent: IHierarchyPart) {
    super(metadata, parent);
    if (this.metadata.target === 'modal' && this.metadata.page == null) {
      this.metadata.page = 'modal';
    }
    this.code = this.metadata.code;
    if (!this.label) {
      const label = new ILabelMeta();
      label.text = this.metadata.title ? this.metadata.title : this.metadata.panel;
      this.label = new LabelState(label, this);
    }

    runInAction(() => {
      if (this.metadata.visibleCondition) {
        this.visibleCondition = this.parent.GetConditions().find((c: ConditionState) => c.code === this.metadata.visibleCondition);
        if (!this.visibleCondition) {
          throw Error('Condition not found ' + this.metadata.visibleCondition);
        }
      }
    });
  }

  @computed
  get title(): string {
    return this.label.text;
  }

  @computed
  get url(): string {
    let url = '';
    if (this.metadata.page) {
      url = this.metadata.page;
      if (this.metadata.panel) {
        url = url + '/' + this.metadata.panel;
      }
    } else {
      url = this.baseUrl + this.metadata.panel;
    }
    const query = this.baseQuery;
    if (query) {
      url = url + '?' + query;
    }
    return '/test/' + url;
  }

  get baseQuery(): string {
    let query = '';
    this.GetDataSources().forEach((d: DataSourceState) => {
      if (d.selectedDataItem) {
        if (query) {
          query = '&' + query;
        }
        query = d.code + '=' + d.selectedDataItem.id;
      }
    });
    return query;
  }

  get baseUrl(): string {
    let url = '';
    let current = this as PartState;
    while (current !== null) {
      if (current.getPartType() === 'placeholder') {
        const placeHolderState = current as PlaceholderState;
        if (placeHolderState.metadata.applyToUrl) {
          url = placeHolderState.panelCode + '/' + url;
        }
      }
      if (current.getPartType() === 'page') {
        const pageState = current as PageState;
        url = pageState.metadata.code + '/' + url;
      }
      current = current.parent as PartState;
    }
    return url;
  }

  get metadata(): ILinkMeta {
    return this.internalmeta as ILinkMeta;
  }


  @computed get Visible() {
    if (this.metadata.hidden === true) {
      return false;
    }
    if (this.visibleCondition) {
      return this.visibleCondition.Value;
    }
    return true;
  }

  @action
  click() {
    if (this.metadata.target === 'modal') {
      const page = this.parent.GetPage();
      const modal = page.applicationState.pageResolver.getPageByUrl(this.url, page.applicationState);
      modal.parent = page;
      page.setModalPanel(modal);
      return;
    }
    if (this.metadata.page) {
      const page = this.parent.GetPage();
      page.applicationState.navigate(this.url);
    } else {
      if (this.metadata.target) {
        let ph = this.parent.GetPage().placeHolders[this.metadata.target] as PlaceholderState;
        if (ph == null) {
          throw new Error('Placeholder not found:' + this.metadata.target);
        }
        ph.setPanelCode(this.metadata.panel);
      }
    }
  }

}





