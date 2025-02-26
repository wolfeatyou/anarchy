import {ApplicationState} from '../application.state';
import {DataSourceState} from '../DataSourceState/datasource.state';
import {MetaDataParser} from '../../meta/parser/MetaDataParser';
import {PanelState} from '../panel.state';
import {OneLevelMaterDetailsTestDataPanel} from './OneLevelMasterDetailsPanel.testdata';


export class TwoLevelMaterDetailsTestDataPanel extends OneLevelMaterDetailsTestDataPanel {
  dataSource2: DataSourceState;
  panel2: PanelState;


  constructor() {
    super();
    this.panel2 = new PanelState(new MetaDataParser().getPanelMeta(this.panel2Meta), null, this.appState);
    this.dataSource2 = this.appState.getDataSourceById('ds2');
    this.panel2.setActive(true);
  }

  panel2Meta: any = {
    code: 'panel002',
    dataSources: [
      {
        code: 'ds2',
        operations: [
          {
            code: 'readOperation',
            type: 'read',
            parameters: [
              {
                code: 'param1',
                source: {
                  dataSourceId: 'ds1',
                  dataItemProperty: 'id'
                }
              }
            ]
          }
        ]
      }
    ],
    links: [
      {
        code: 'link2',
        visibleCondition: 'isSecondOrThirdPanel2'
      }
    ],
    conditions: [
      {
        code: 'isSecondOrThirdPanel2',
        if: '{ds1.id} == 2 && {ds2.id} == 3'
      }
    ]
  };

}
