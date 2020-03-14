import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {PartState} from '../../stores/part.state';


@Component({
  selector: 'app-dynamic2',
  templateUrl: './dynamic2.component.html',
  styleUrls: ['./dynamic2.component.less']
})
export class Dynamic2Component implements OnInit {

  partState: PartState;

  @Input()
  set state(state: PartState) {
    this.partState = state;
  }

  get state() {
    return this.partState;
  }

  constructor(
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
  }

}
