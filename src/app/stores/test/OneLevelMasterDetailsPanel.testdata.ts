import {ApplicationState} from '../application.state';
import {DataSourceState} from '../DataSourceState/datasource.state';
import {MetaDataParser} from '../../meta/parser/MetaDataParser';
import {PanelState} from '../panel.state';


export class OneLevelMaterDetailsTestDataPanel {
  appState: ApplicationState;
  dataSource1: DataSourceState;
  panel1: PanelState;


  constructor() {
    this.appState = new ApplicationState();
    this.panel1 = new PanelState(new MetaDataParser().getPanelMeta(this.panel1Meta), this.appState);
    this.dataSource1 = this.appState.getDataSourceById('ds1');
  }

  panel1Meta: any = {
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
    ],
    links: [
      {
        code: 'link1',
        visibleCondition: 'isSecondOrThirdPanel1'
      }
    ],
    conditions: [
      {
        code: 'isSecondOrThirdPanel1',
        if: '{ds1.id} == 2 || {ds1.id} == 3'

      }
    ]
  };

}
