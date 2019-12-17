import {DataSourceState} from './DataSourceState/datasource.state';
import {PageState} from './page.state';
import {PanelState} from './panel.state';

export interface IHierarchyPart {
  Visible: boolean;

  GetConditions();

  GetDataSources(): DataSourceState[];

  GetPage(): PageState;

  GetPanel(): PanelState;
}
