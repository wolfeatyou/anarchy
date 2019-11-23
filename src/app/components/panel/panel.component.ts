import {Component, Input, OnInit} from '@angular/core';
import {PanelState} from '../../stores/panel.state';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class PanelComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _panelState: PanelState;

  constructor() {
  }

  @Input()
  set panelState(panel: PanelState) {
    this._panelState = panel;
  }

  selectTab(tab: any) {
    this._panelState.setSelectedTab(tab.code);
  }

  ngOnInit(): void {
  }
}
