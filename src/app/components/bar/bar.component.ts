import {Component, Input, OnInit} from '@angular/core';
import {PanelState} from '../../stores/panel.state';
import {BarState} from '../../stores/bar.state';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.less']
})
export class BarComponent implements OnInit {

  private partState: BarState;
  constructor() { }

  @Input()
  set state(panel: BarState) {
    this.partState = panel;
  }

  get state() {
    return this.partState;
  }


  ngOnInit() {
  }

}
