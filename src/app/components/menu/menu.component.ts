import {Component, Input, OnInit} from '@angular/core';
import {ListState} from '../../stores/list.state';
import {MenuState} from '../../stores/menu.state';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  menuState: MenuState;

  constructor() {
  }

  @Input()
  set state(menu: MenuState) {
    this.menuState = menu;
  }

  get state(): MenuState {
    return this.menuState;
  }


  ngOnInit() {
  }

}
