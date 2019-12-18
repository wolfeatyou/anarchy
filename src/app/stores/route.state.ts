import {action, observable, runInAction} from 'mobx';
import {Inject, Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {convertToParamMap, DefaultUrlSerializer, NavigationStart, PRIMARY_OUTLET, Router, UrlSegment, UrlTree} from '@angular/router';


@Injectable()
export class RouteState {
  @observable url: string;

  constructor(@Inject(Router) public router: Router, @Inject(Location) public location: Location) {
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
    this.router.navigateByUrl(url);
  }

  /*getSegmentUrl(index: number): string {
    const tree = new DefaultUrlSerializer().parse(this.location.path());
    const primary = tree.root.children[PRIMARY_OUTLET];
    if (primary.segments.length > index) {
      return primary.segments[index].path;
    }
    return null;
  }

  @action removeUnusedDataSources(dataSourceCodes: string[], tree: UrlTree) {
    return;
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

  @action
  segmentUrlChanged(index: number, code: string, dataSourceCodes: string[]) {
    //const tree = new DefaultUrlSerializer().parse(this.location.path());
    const tree = new DefaultUrlSerializer().parse(this.url);
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
        this.removeUnusedDataSources(dataSourceCodes, tree);
      }
    }

    const newUrl = new DefaultUrlSerializer().serialize(tree);
    this.url = newUrl;
    this.location.replaceState(newUrl);
  }

  @action
  queryUrlChanged(dataSourceCode: string, value: string) {
    //const tree = new DefaultUrlSerializer().parse(this.location.path());
    const tree = new DefaultUrlSerializer().parse(this.url);
    tree.queryParams[dataSourceCode] = value;
    const dataSourceCodes: string[] = [];
    const queryParamsArray = Object.getOwnPropertyNames(tree.queryParams);
    for (let i = 0; i < queryParamsArray.length; i++) {
      dataSourceCodes.push(queryParamsArray[i]);
      if (queryParamsArray[i] === dataSourceCode) {
        break;
      }
    }
    this.removeUnusedDataSources(dataSourceCodes, tree);
    const newUrl = new DefaultUrlSerializer().serialize(tree);
    this.url = newUrl;
    this.location.replaceState(newUrl);
  }

  getQueryDataSourceValue(dataSourceCode: string) {
    const tree = new DefaultUrlSerializer().parse(this.location.path());
    return tree.queryParams[dataSourceCode];
  }*/


}


