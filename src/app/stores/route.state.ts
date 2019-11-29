import {action, observable, runInAction} from 'mobx';
import {Inject, Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {NavigationStart, Router} from '@angular/router';



@Injectable()
export class RouteState {
  @observable url: string;

  constructor(@Inject(Router) public router: Router, @Inject(Location) public location: Location ) {
    if (router) {
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          setTimeout(() => {
            runInAction(() => {
             // alert(1);
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
    this.location.go( url);

  }


}


