import {Inject, Injectable} from '@angular/core';
import {action, observable} from 'mobx';
import {PageState} from './page.state';
import {DefaultUrlSerializer, PRIMARY_OUTLET, UrlSegment, UrlTree} from '@angular/router';
import {Location} from '@angular/common';

@Injectable()
export class PageRouteState {
  @observable url: string;
  @observable initialUrl: string;
  page: PageState;

  constructor(page: PageState, @Inject(Location) public location: Location) {
    this.page = page;
  }

  getSegmentUrl(index: number): string {
    const tree = new DefaultUrlSerializer().parse(this.url);
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

    this.url = new DefaultUrlSerializer().serialize(tree);
    this.setBrowserLocation();
  }

  @action
  queryUrlChanged(dataSourceCode: string, value: string) {
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
    this.url = new DefaultUrlSerializer().serialize(tree);
    this.setBrowserLocation();
  }

  getQueryDataSourceValue(dataSourceCode: string) {
    const tree = new DefaultUrlSerializer().parse(this.url);
    return tree.queryParams[dataSourceCode];
  }

  setBrowserLocation(){
    if(this.page.isCurrentPage) {
      this.location.replaceState(this.url);
    }
  }


}


