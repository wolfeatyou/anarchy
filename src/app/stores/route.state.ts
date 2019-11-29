import {action, observable, runInAction} from 'mobx';
import {Inject, Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {DefaultUrlSerializer, NavigationStart, PRIMARY_OUTLET, Router, UrlSegment} from '@angular/router';


@Injectable()
export class RouteState {
  @observable url: string;

  constructor(@Inject(Router) public router: Router, @Inject(Location) public location: Location) {
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
    this.router.navigateByUrl(url);
    //  this.url = url;
    // this.location.go( url);

  }

  @action
  segmentUrlChanged(index: number, code: string) {
    const tree = new DefaultUrlSerializer().parse(this.url);
    const primary = tree.root.children[PRIMARY_OUTLET];
    if (primary.segments.length - 1 < index) {
      primary.segments.push(new UrlSegment(code,{}));
    } else {
      primary.segments[index].path = code;
    }

    const newUrl = new DefaultUrlSerializer().serialize(tree);
    this.location.replaceState(newUrl);
  }


}


