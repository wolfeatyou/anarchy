import {observable, computed, action, reaction} from 'mobx';
import {Injectable} from '@angular/core';
import {NavigationStart, PRIMARY_OUTLET, Router} from '@angular/router';


@Injectable()
export class RouteState {
  @observable url: string;

  constructor(public router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        setTimeout(() => {
          this.setActiveUrl(event.url);
        });

      }
    });
  }

  @action
  setActiveUrl(url: string) {
    this.url = url;
  }


}


