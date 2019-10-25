import {ApplicationState} from '../application.state';
import {DataSourceState} from '../DataSourceState/datasource.state';
import {MetaDataParser} from '../../meta/parser/MetaDataParser';
import {PanelState} from '../panel.state';
import {OneLevelMaterDetailsTestDataPanel} from './OneLevelMasterDetailsPanel.testdata';
import {TwoLevelMaterDetailsTestDataPanel} from './TwoLevelMasterDetails.testdata';


export class TreeLevelMaterDetailsTestDataPanel extends TwoLevelMaterDetailsTestDataPanel {
  dataSource3: DataSourceState;
  panel3: PanelState;


  constructor() {
    super();
    this.panel3 = new PanelState(MetaDataParser.getPanelMeta(this.panel3Meta), this.appState);
    this.dataSource3 = this.appState.getDataSourceById('ds3');
  }

  panel3Meta: any = {
    code: 'panel003',
    dataSources: [
      {
        code: 'ds3',
        operations: [
          {
            code: 'readOperation',
            type: 'read',
            parameters: [
              {
                code: 'param1',
                source: {
                  dataSourceId: 'ds2',
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
        visibleCondition: 'isThirdPanel3'
      }
    ],
    conditions: [
      {
        code: 'isThirdPanel3',
        if: '{ds2.id} == 3'
      }
    ]
  };

}
