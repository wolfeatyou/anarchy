import {action, observable, runInAction} from 'mobx';
import {Inject, Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {convertToParamMap, DefaultUrlSerializer, NavigationStart, PRIMARY_OUTLET, Router, UrlSegment} from '@angular/router';


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

  getSegmentUrl(index: number): string {
    const tree = new DefaultUrlSerializer().parse(this.location.path());
    const primary = tree.root.children[PRIMARY_OUTLET];
    if (primary.segments.length > index) {
      return primary.segments[index].path;
    }
    return null;
  }

  @action
  segmentUrlChanged(index: number, code: string, dataSourceCodes: string[]) {
    const tree = new DefaultUrlSerializer().parse(this.location.path());
    const primary = tree.root.children[PRIMARY_OUTLET];
    if (primary.segments.length - 1 < index) {
      primary.segments.push(new UrlSegment(code, {}));
    } else {
      if (primary.segments[index].path.toLowerCase() !== code.toLowerCase()) {
        primary.segments[index].path = code;
        //remove other
        primary.segments = primary.segments.filter((itm: any, idx: number) => {
          return idx <= index;
        });
        //remove unused datasources
        const queryPropsToDelete = [];
        const queryParamsArray = Object.getOwnPropertyNames(tree.queryParams);
        queryParamsArray.forEach((prop: string) => {
          if (dataSourceCodes.indexOf(prop) === -1) {
            queryPropsToDelete.push(prop);
          }
        });

        queryPropsToDelete.forEach((prop: string) => {
          delete tree.queryParams[prop];
        });
      }
    }

    const newUrl = new DefaultUrlSerializer().serialize(tree);
    this.location.replaceState(newUrl);
  }

  @action
  queryUrlChanged(dataSourceCode: string, value: string) {
    const tree = new DefaultUrlSerializer().parse(this.location.path());
    tree.queryParams[dataSourceCode] = value;
    const newUrl = new DefaultUrlSerializer().serialize(tree);
    this.location.replaceState(newUrl);
  }

  getQueryDataSourceValue(dataSourceCode: string) {
    const tree = new DefaultUrlSerializer().parse(this.location.path());
    return tree.queryParams[dataSourceCode];
  }


}


