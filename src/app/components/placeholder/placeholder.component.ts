import {Component, Input, OnInit} from '@angular/core';
import {BarState} from '../../stores/bar.state';
import {PartState} from '../../stores/part.state';
import {PlaceholderState} from '../../stores/placeholder.state';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.less']
})
export class PlaceholderComponent implements OnInit {

  private partState: PlaceholderState;
  constructor() { }

  @Input()
  set state(value: PlaceholderState) {
    this.partState = value;
  }

  get state() {
    return this.partState;
  }

  ngOnInit() {
  }

}
