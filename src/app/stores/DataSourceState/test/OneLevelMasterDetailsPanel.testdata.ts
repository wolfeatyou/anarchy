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



  ds1Meta: any = {
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
  };
  ds2Meta: any = {
    code: 'ds2',
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
  };

  dsRelatedMeta: any = {
    code: 'dsRelated',
    operations: [
      {
        code: 'readOperation',
        type: 'read',
        parameters: [
          {
            code: 'param1',
            source: {
              dataSourceId: 'ds1',
              dataItemProperty: 'title'
            }
          },
          {
            code: 'param2',
            source: {
              dataSourceId: 'ds2',
              dataItemProperty: 'desc'
            }
          }
        ]
      }
    ]
  };
}
