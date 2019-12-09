import {computed, observable, reaction, runInAction} from 'mobx';
import {ILinkMeta} from '../meta/LinkMeta';
import {PanelState} from './panel.state';
import {ConditionState} from './condition.state';
import {IHierarchyPart} from './hierarchyPart.interface';
import {PartState} from './part.state';
import {IPartMeta} from '../meta/PartMeta';
import {ILabelMeta} from '../meta/TextMeta';


export class LabelState extends PartState {

  constructor(metadata: ILabelMeta, parent: IHierarchyPart) {
    super(metadata, parent);
  }

  @computed
  get text(): string {
    return this.metadata.text;
  }

  get metadata(): ILabelMeta {
    return this.internalmeta as ILabelMeta;
  }

}





