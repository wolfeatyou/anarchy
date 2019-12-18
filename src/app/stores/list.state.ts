import {PartState} from './part.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {action, computed, observable} from 'mobx';
import {IListMeta} from '../meta/ListMeta';
import {DataSourceState} from './DataSourceState/datasource.state';
import {PanelState} from './panel.state';
import {PageState} from './page.state';

export class ListState extends PartState {

  @observable dataSource: DataSourceState;

  constructor(metadata: IPartMeta, private panel: PanelState) {
    super(metadata, panel);
    this.init();
  }


  @action
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
