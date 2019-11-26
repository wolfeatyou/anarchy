import {Component, Input, OnInit} from '@angular/core';
import {PanelState} from '../../stores/panel.state';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class PanelComponent implements OnInit {
  private panelState: PanelState;
  constructor() {
  }

  @Input()
  set state(panel: PanelState) {
    this.panelState = panel;
  }

  get state() {
    return this.panelState;
  }


  ngOnInit(): void {
  }
}
