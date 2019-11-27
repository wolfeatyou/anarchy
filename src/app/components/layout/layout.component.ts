import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PlaceholderState} from '../../stores/placeholder.state';
import {LayoutState} from '../../stores/layout.state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  private partState: LayoutState;

  constructor() {
  }

  @Input()
  set state(value: LayoutState) {
    this.partState = value;
  }

  get state() {
    return this.partState;
  }

  getCurrentStyle() {
    return {
      'grid-template-areas': this.state.metadata.layout
    };
  }


  ngOnInit() {
  }

  getPlaceholderStyle(placeholder: PlaceholderState) {
    return {'grid-area': placeholder.metadata.code};
  }
}
