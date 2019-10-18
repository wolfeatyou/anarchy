import {observable, computed, action, autorun, toJS, runInAction, reaction} from 'mobx';
import {IConditionMeta} from '../meta/ConditionMeta';
import {PanelState} from './panel.state';

export class ConditionState {

  @observable value: boolean;

  constructor(private metadata: IConditionMeta, private panel: PanelState) {

  }

  @computed
  getValue() {
    return this.value;
  }

  @action
  setValue(val) {
    this.value = val;
  }

}





