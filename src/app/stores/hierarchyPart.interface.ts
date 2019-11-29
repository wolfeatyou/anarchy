import {DataSourceState} from './DataSourceState/datasource.state';
import {PageState} from './page.state';

export interface IHierarchyPart {
  Visible: boolean;

  GetConditions();

  GetDataSources(): DataSourceState[];

  GetPage(): PageState;
}
