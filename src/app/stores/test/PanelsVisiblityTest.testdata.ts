import {ApplicationState} from '../application.state';
import {DataSourceState} from '../DataSourceState/datasource.state';
import {MetaDataParser} from '../../meta/parser/MetaDataParser';
import {PanelState} from '../panel.state';


export class PanelsVisiblityTestData {
  appState: ApplicationState;

  constructor() {

  }

  init() {
    this.appState = new ApplicationState();
    this.appState.metadataResolver.addMetadataPackage('test', this.testPackage);
    this.appState.setActivePanel('test', 'officerGroups');


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
          linkedPanelCode: 'officers'
        },
        {
          code: 'roles',
          linkedPanelCode: 'roles'
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
