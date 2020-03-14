import {Component, Input, OnInit} from '@angular/core';
import {BarState} from '../../stores/bar.state';
import {PartState} from '../../stores/part.state';
import {LabelState} from '../../stores/label.state';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.less']
})
export class LabelComponent implements OnInit {

  private labelState: LabelState;

  constructor() {
  }

  @Input()
  set state(label: LabelState) {
    this.labelState = label;
  }

  get state() {
    return this.labelState;
  }


  ngOnInit() {
  }

}
