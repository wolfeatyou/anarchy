import {observable, computed, action} from 'mobx';
import {Injectable} from '@angular/core';
import {PanelState} from './panel.state';


@Injectable()
export class ApplicationState {
  @observable activePanel;

  constructor() {
  }

  @action
  setActive(s: PanelState) {
    this.activePanel = s;
  }

}


