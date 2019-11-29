import {Component, HostListener, Input, OnInit} from '@angular/core';
import {MenuState} from '../../stores/menu.state';
import {LinkState} from '../../stores/link.state';
import {RouteState} from '../../stores/route.state';
import {PlaceholderState} from '../../stores/placeholder.state';

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

  onClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.metadata.page) {
      const page = this.state.parent.GetPage();
      page.applicationState.navigate(this.state.url);
    } else {
      if (this.state.metadata.target) {
        let ph = this.state.parent.GetPage().placeHolders[this.state.metadata.target] as PlaceholderState;
        if (ph == null) {
          throw new Error('Placeholder not found:' + this.state.metadata.target);
        }
        ph.setPanelCode(this.state.metadata.panel);
      }
    }

  }


  ngOnInit() {
  }

}
