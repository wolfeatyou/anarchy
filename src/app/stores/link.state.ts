import {computed, observable, reaction, runInAction} from 'mobx';
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

export class LinkState extends PartState {
  public code: string;
  public label: LabelState;
  @observable private visibleCondition: ConditionState;

  constructor(metadata: IPartMeta, parent: IHierarchyPart) {
    super(metadata, parent);
    this.code = this.metadata.code;
    if(!this.label) {
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

}





