import {computed, observable, reaction, runInAction} from 'mobx';
import {ILinkMeta} from '../meta/LinkMeta';
import {PanelState} from './panel.state';
import {ConditionState} from './condition.state';
import {IHierarchyPart} from './hierarchyPart.interface';
import {PartState} from './part.state';
import {IPartMeta} from '../meta/PartMeta';

export class LinkState extends PartState {
  public code: string;
  @observable public title: string;
  @observable private visibleCondition: ConditionState;

  constructor(metadata: IPartMeta, parent: IHierarchyPart) {
    super(metadata, parent);

    this.code = this.metadata.code;
    runInAction(() => {
      if (this.metadata.visibleCondition) {
        this.visibleCondition = this.parent.GetConditions().find((c: ConditionState) => c.code === this.metadata.visibleCondition);
        if (!this.visibleCondition) {
          throw Error('Condition not found ' + this.metadata.visibleCondition);
        }
      }
    });
  }

  get metadata(): ILinkMeta {
    return this.internalmeta as ILinkMeta;
  }


  get LinkedPanel(): PanelState {
    //todo: complete it
    return null;
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





