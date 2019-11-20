import {observable, computed, action, reaction} from 'mobx';
import {Inject, Injectable} from '@angular/core';
import {PanelState} from './panel.state';
import {DataSourceState} from './DataSourceState/datasource.state';
import {MetadataResolver} from './matadata.resolver';
import {NavigationStart, PRIMARY_OUTLET, Router} from '@angular/router';
import {PanelsVisiblityTestDataNew} from './test/PanelsVisiblityTestNew.testdata';
import {RouteState} from './route.state';

@Injectable()
export class ApplicationState {
  activePanel: PanelState;
  dataSources: any;
  panels: any;
  router: Router;
  @observable url: string;

  public metadataResolver: MetadataResolver;

  constructor(@Inject(RouteState) private routeState: RouteState) {
    this.dataSources = {};
    this.panels = {};
    this.metadataResolver = new MetadataResolver();
    this.metadataResolver.addMetadataPackage('test', PanelsVisiblityTestDataNew.testPackage);

    reaction(() => this.routeState.url, (url: string) => {
      const tree = this.routeState.router.parseUrl(url);
      const primary = tree.root.children[PRIMARY_OUTLET];
      if (primary) {
        this.setActivePanel('test', primary.segments[0].path);
      } else {
        this.routeState.router.navigateByUrl('/officersAndGrantsPanel');
      }
    });
  }

  @action
  setActive(s: PanelState) {
    this.activePanel = s;
  }

  @action
  setActiveUrl(url: string) {
    this.url = url;
  }

  @action
  setActivePanel(packageCode: string, panelCode: string) {
    if (this.activePanel) {
      this.activePanel.setActive(false);
    }
    const panel = new PanelState(this.metadataResolver.resolvePanel(packageCode, panelCode), null, this);
    this.activePanel = panel;
    this.activePanel.setActive(true);
  }

  public getDataSourceById(id: string): DataSourceState {
    const ds = this.dataSources[id];
    if (!ds) {
      throw new Error('Cant find DataSource with code ' + id);
    }
    return ds;
  }

  public getPanelById(id: string): PanelState {
    const p = this.panels[id];
    if (!p) {
      throw new Error('Cant find panel with code ' + id);
    }
    return p;
  }

}


