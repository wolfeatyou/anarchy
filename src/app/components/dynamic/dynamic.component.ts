import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {PanelState} from '../../stores/panel.state';
import {IAppControl} from '../../stores/IAppControl.interface';


@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.less']
})
export class DynamicComponent implements OnInit {

  @ViewChild('template') template;

  _state: IAppControl;

  @Input()
  set state(state: IAppControl) {
    this._state = state;
  }

  constructor(
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    if(this.template) {
   //   console.log(11111111111)
      this.viewContainerRef.createEmbeddedView(this.template);
    }
  }

}
