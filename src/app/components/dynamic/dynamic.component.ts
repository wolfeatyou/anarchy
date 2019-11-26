import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {PartState} from '../../stores/part.state';


@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.less']
})
export class DynamicComponent implements OnInit {

  partState: PartState;
  @ViewChild('template', null) template;


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
    if (this.template) {
      this.viewContainerRef.createEmbeddedView(this.template);
    }
  }

}
