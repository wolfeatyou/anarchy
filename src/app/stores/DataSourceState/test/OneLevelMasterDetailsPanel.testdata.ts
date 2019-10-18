import {ApplicationState} from '../../application.state';
import {DataSourceState} from '../datasource.state';
import {MetaDataParser} from '../../../meta/parser/MetaDataParser';


export class OneLevelMaterDetailsTestDataPanel {
  appState: ApplicationState;
  dataSource1: DataSourceState;
  dataSource2: DataSourceState;
  dataSourceRelated: DataSourceState;

  constructor() {
    this.appState = new ApplicationState();
  }

  panel1 = {
    code: 'panel001',
    dataSources: [
      {
        code: 'ds1',
        operations: [
          {
            code: 'readOperation',
            type: 'read',
            parameters: [
              {
                code: 'param1'
              }
            ]
          }
        ]
      }
    ]
  };


}
