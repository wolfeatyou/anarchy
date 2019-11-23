import {action, reaction} from 'mobx';
import {Inject, Injectable} from '@angular/core';
import {MetadataResolver} from './matadata.resolver';
import {PRIMARY_OUTLET} from '@angular/router';
import {RouteState} from './route.state';
import {PageState} from './page.state';
import {PageResolver} from './page.resolver';

@Injectable()
export class ApplicationState {
  currentPage: PageState;
  public metadataResolver: MetadataResolver;
  public pageResolver: PageResolver;

  constructor(@Inject(RouteState) private routeState: RouteState, metadataResolver: MetadataResolver = new MetadataResolver()) {
    this.metadataResolver = metadataResolver;
    this.pageResolver = new PageResolver(routeState, metadataResolver);

    reaction(() => this.routeState.url, (url: string) => {
      const tree = this.routeState.router.parseUrl(url);
      const primary = tree.root.children[PRIMARY_OUTLET];
      if (primary) {
        this.setCurrentPage(this.pageResolver.getPageByUrl(url));
      } else {
        this.routeState.navigate('/test/administration');
      }
    });
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


