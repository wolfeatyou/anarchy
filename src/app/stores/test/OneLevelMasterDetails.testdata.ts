import {ApplicationState} from '../application.state';
import {DataSourceState} from '../DataSourceState/datasource.state';
import {MetaDataParser} from '../../meta/parser/MetaDataParser';


export class OneLevelMaterDetailsTestData {
  appState: ApplicationState;
  dataSource1: DataSourceState;
  dataSource2: DataSourceState;
  dataSourceRelated: DataSourceState;

  constructor() {
    this.appState = new ApplicationState();


    this.dataSource1 = new DataSourceState(new MetaDataParser().getDataSourceMeta(this.ds1Meta), null, this.appState);
    this.dataSource2 = new DataSourceState(new MetaDataParser().getDataSourceMeta(this.ds2Meta), null,  this.appState);
    this.dataSourceRelated = new DataSourceState(new MetaDataParser().getDataSourceMeta(this.dsRelatedMeta), null,  this.appState);
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
