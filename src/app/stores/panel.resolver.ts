import {DefaultUrlSerializer, PRIMARY_OUTLET} from '@angular/router';
import {PageState} from './page.state';
import {RouteState} from './route.state';
import {MetadataResolver} from './matadata.resolver';
import {PanelState} from './panel.state';
import {IPanelMeta} from '../meta/PanelMeta';
import {IHierarchyPart} from './hierarchyPart.interface';
import {ApplicationState} from './application.state';


export class PanelResolver {

  constructor() {

  }

  getPanel(code: string, parent: IHierarchyPart) {
    //todo: resolve package code
    const meta = ApplicationState.Current.metadataResolver.resolvePanel('test', code);
    return new PageState(meta, parent);
  }

}


