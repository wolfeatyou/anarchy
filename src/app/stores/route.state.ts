import {observable, computed, action, reaction} from 'mobx';
import {Inject, Injectable} from '@angular/core';
import {NavigationStart, PRIMARY_OUTLET, Router} from '@angular/router';
import {ApplicationState} from './application.state';


@Injectable()
export class RouteState {
  @observable url: string;

  constructor(@Inject(Router) public router: Router) {
    if (router) {
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          setTimeout(() => {
            this.setActiveUrl(event.url);
          });

        }
      });
    }
  }

  @action
  setActiveUrl(url: string) {
    this.url = url;
  }


}


