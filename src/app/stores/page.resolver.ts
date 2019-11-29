import {DefaultUrlSerializer, PRIMARY_OUTLET} from '@angular/router';
import {PageState} from './page.state';
import {RouteState} from './route.state';
import {MetadataResolver} from './matadata.resolver';
import {ApplicationState} from './application.state';


export class PageResolver {

  pagesUrlMap: any = {};

  constructor(private router: RouteState, private metadataResolver: MetadataResolver) {

  }

  getPageByUrl(url: string, appState: ApplicationState): PageState {
    if (this.pagesUrlMap[url]) {
      return this.pagesUrlMap[url];
    }
    const tree = new DefaultUrlSerializer().parse(url);
    const primary = tree.root.children[PRIMARY_OUTLET];
    let packageCode: string;
    let pageCode: string;

    if (primary) {
      packageCode = primary.segments[0].path;
      pageCode = primary.segments[1].path;
    } else {
      throw new Error('Page code not found in url');
    }
    const pageMeta = this.metadataResolver.resolvePage(packageCode, pageCode);
    const page = new PageState(pageMeta, appState);
    this.pagesUrlMap[url] = page;
    page.initPage();
    return page;
  }
}


