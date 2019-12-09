import {computed, observable, reaction, runInAction} from 'mobx';
import {ILinkMeta} from '../meta/LinkMeta';
import {PanelState} from './panel.state';
import {ConditionState} from './condition.state';
import {IHierarchyPart} from './hierarchyPart.interface';
import {PartState} from './part.state';
import {IPartMeta} from '../meta/PartMeta';
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
    return '/test/' + this.metadata.page;
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





