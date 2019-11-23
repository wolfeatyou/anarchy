import {action, observable, runInAction} from 'mobx';
import {Inject, Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';


@Injectable()
export class RouteState {
  @observable url: string;

  constructor(@Inject(Router) public router: Router) {
    if (router) {
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          setTimeout(() => {
            runInAction(() => {
              this.url = event.url;
            });
          });

        }
      });
    }
  }

  @action
  navigate(url: string) {
    this.url = url;
  }


}


