import {DataSourceState} from "./DataSourceState/datasource.state";

export interface IHierarchyPart {
  Visible: boolean;

  GetConditions();

  GetDataSources(): DataSourceState[];
}
