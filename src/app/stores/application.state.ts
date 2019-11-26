import {action, observable, reaction} from 'mobx';
import {Inject, Injectable} from '@angular/core';
import {MetadataResolver} from './matadata.resolver';
import {DefaultUrlSerializer, PRIMARY_OUTLET} from '@angular/router';
import {RouteState} from './route.state';
import {PageState} from './page.state';
import {PageResolver} from './page.resolver';
import {AdministrationPackage} from '../meta/samples/administration.package';

@Injectable()
export class ApplicationState {
  @observable currentPage: PageState;
  public metadataResolver: MetadataResolver;
  public pageResolver: PageResolver;
  private static currentAppState: ApplicationState;

  constructor(@Inject(RouteState) private routeState: RouteState, metadataResolver: MetadataResolver = new MetadataResolver()) {
    ApplicationState.currentAppState = this;
    this.metadataResolver = metadataResolver;
    this.pageResolver = new PageResolver(routeState, metadataResolver);
    this.metadataResolver.addMetadataPackage('test', AdministrationPackage.package);
    reaction(() => this.routeState.url, (url: string) => {
      const tree = new DefaultUrlSerializer().parse(url);
      const primary = tree.root.children[PRIMARY_OUTLET];
      if (primary) {
        this.setCurrentPage(this.pageResolver.getPageByUrl(url));
      } else {
        this.routeState.navigate('/test/administration');
      }
    });
  }

  static get Current(): ApplicationState {
    return ApplicationState.currentAppState;
  }

  @action
  navigate(url: string) {
    this.routeState.navigate(url);
  }

  @action
  setCurrentPage(page: PageState) {
    if (this.currentPage) {
      this.currentPage.setAsCurrentPage(false);
    }
    this.currentPage = page;
    page.setAsCurrentPage(true);
  }


}


