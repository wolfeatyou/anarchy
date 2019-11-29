import {PartState} from './part.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {IHierarchyPart} from './hierarchyPart.interface';
import {computed, observable} from 'mobx';
import {PartResolver} from './part.resolver';
import {IBarMeta} from '../meta/BarMeta';
import {ILinkMeta} from "../meta/LinkMeta";
import {IListMeta} from "../meta/ListMeta";
import {DataSourceState} from "./DataSourceState/datasource.state";
import {IPanelMeta} from "../meta/PanelMeta";
import {PanelState} from "./panel.state";
import {PageState} from './page.state';

export class ListState extends PartState implements IHierarchyPart {

  @observable dataSource: DataSourceState;

  constructor(metadata: IPartMeta, private panel: PanelState) {
    super(metadata, panel);
    this.init();
  }


  init() {
    if (this.metadata.dataSourceCode) {
      this.dataSource = this.panel.getDataSourceById(this.metadata.dataSourceCode);
    }
  }

  get metadata(): IListMeta {
    return this.internalmeta as IListMeta;
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
