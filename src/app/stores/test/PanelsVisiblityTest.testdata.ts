import {ApplicationState} from '../application.state';
import {DataSourceState} from '../DataSourceState/datasource.state';
import {MetaDataParser} from '../../meta/parser/MetaDataParser';
import {PanelState} from '../panel.state';


export class PanelsVisiblityTestData {
  appState: ApplicationState;
  ds: DataSourceState;
  constructor() {

  }

  init() {
    this.appState = new ApplicationState();
    this.appState.metadataResolver.addMetadataPackage('test', this.testPackage);
    this.appState.setActivePanel('test', 'officerGroups');
    //this.ds = this.appState.getDataSourceById('officerGroupsDs');

  }


  testPackage: any = {
    officerGroups: {
      code: 'officerGroups',
      dataSources: [
        {
          code: 'officerGroupsDs',
          operations: [
            {
              code: 'readOfficerGroups',
              type: 'read'
            }
          ]
        }
      ],
      tabs: [
        {
          code: 'officersTab',
          panelId: 'officers'
        },
        {
          code: 'roles',
          panelId: 'roles'
        }
      ]
    },

    roles: {
      code: 'roles',
      dataSources: [
        {
          code: 'rolesDs',
          operations: [
            {
              code: 'readRoles',
              type: 'read'
            }
          ]
        }
      ],
      tabs: []
    },

    officers: {
      code: 'officers',
      dataSources: [
        {
          code: 'officersDs',
          operations: [
            {
              code: 'readOfficers',
              type: 'read'
            }
          ]
        }
      ],
      tabs: []
    }
  };


}
