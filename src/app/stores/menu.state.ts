import {PartState} from './part.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {IHierarchyPart} from './hierarchyPart.interface';
import {computed, observable} from 'mobx';
import {PartResolver} from './part.resolver';
import {IBarMeta} from '../meta/BarMeta';
import {ILinkMeta} from '../meta/LinkMeta';
import {IListMeta} from '../meta/ListMeta';
import {DataSourceState} from './DataSourceState/datasource.state';
import {IPanelMeta} from '../meta/PanelMeta';
import {PanelState} from './panel.state';
import {IMenuMeta} from '../meta/MenuMeta';
import {LinkState} from './link.state';
import {PageState} from './page.state';

export class MenuState extends PartState {

  @observable dataSource: DataSourceState;
  items: LinkState[];

  constructor(metadata: IMenuMeta, private panel: PanelState) {
    super(metadata, panel);
    this.init();
  }


  init() {
    this.items = [];
    if (this.metadata.dataSourceCode) {
      this.dataSource = this.panel.getDataSourceById(this.metadata.dataSourceCode);
    }
    if (this.metadata.items) {
      this.metadata.items.forEach((linkMeta: ILinkMeta) => {
        this.items.push(new LinkState(linkMeta, this));
      });
    }
  }

  get metadata(): IMenuMeta {
    return this.internalmeta as IMenuMeta;
  }

  @computed get Visible(): boolean {
    return this.parent.Visible;
  }

  GetConditions() {
    return this.parent.GetConditions();
  }

  GetDataSources() {
    return this.parent.GetDataSources();
  }

  GetPage(): PageState {
    return this.parent.GetPage();
  }
}
