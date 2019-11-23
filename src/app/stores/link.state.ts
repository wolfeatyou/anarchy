import {computed, observable, reaction, runInAction} from 'mobx';
import {ILinkMeta} from '../meta/LinkMeta';
import {PanelState} from './panel.state';
import {ConditionState} from './condition.state';

export class LinkState {
  public code: string;
  @observable public title: string;
  @observable public metadata: ILinkMeta;
  private panel: PanelState;
  private linkedPanel: PanelState;
  @observable private visibleCondition: ConditionState;

  constructor(metadata: ILinkMeta, panel: PanelState) {
    this.code = metadata.code;
    reaction(() => this.metadata, (meta) => {
      if (meta) {
        this.init();
      }
    }, {name: 'link metadata changed', fireImmediately: true});
    runInAction(() => {
      this.panel = panel;
      this.metadata = metadata;
      if (this.metadata.visibleCondition) {
        this.visibleCondition = this.panel.conditions.find((c: ConditionState) => c.code === this.metadata.visibleCondition);
        if (!this.visibleCondition) {
          throw Error('Condition not found ' + this.metadata.visibleCondition);
        }
      }
    });
  }

  init() {
    console.log('link meta changed:' + this.metadata ? this.metadata : 'null');
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





