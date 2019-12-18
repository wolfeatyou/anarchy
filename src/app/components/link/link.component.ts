import {Component, HostListener, Input, OnInit} from '@angular/core';
import {MenuState} from '../../stores/menu.state';
import {LinkState} from '../../stores/link.state';
import {RouteState} from '../../stores/route.state';
import {PlaceholderState} from '../../stores/placeholder.state';
import {PanelResolver} from '../../stores/panel.resolver';

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
  set state(state: LinkState) {
    this.linkState = state;
  }

  get state(): LinkState {
    return this.linkState;
  }

  onClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.state.click();
  }


  ngOnInit() {
  }

}
