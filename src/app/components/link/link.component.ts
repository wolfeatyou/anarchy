import {Component, Input, OnInit} from '@angular/core';
import {MenuState} from '../../stores/menu.state';
import {LinkState} from '../../stores/link.state';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.less']
})
export class LinkComponent implements OnInit {

  linkState: LinkState;

  constructor() {
  }

  @Input()
  set state(menu: LinkState) {
    this.linkState = menu;
  }

  get state(): LinkState {
    return this.linkState;
  }


  ngOnInit() {
  }

}
