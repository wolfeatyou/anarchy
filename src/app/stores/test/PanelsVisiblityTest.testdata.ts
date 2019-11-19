import {ApplicationState} from '../application.state';
import {DataSourceState} from '../DataSourceState/datasource.state';
import {MetaDataParser} from '../../meta/parser/MetaDataParser';
import {PanelState} from '../panel.state';
import {RouteState} from '../route.state';


export class PanelsVisiblityTestData {
  appState: ApplicationState;

  constructor() {

  }

  init(panelCode: string) {
    this.appState = new ApplicationState(new RouteState(null));
    //this.appState.metadataResolver.addMetadataPackage('test', this.testPackage);
    //this.appState.setActivePanel('test', 'officerGroupDetails');
    //officersAndGrantsPanel

    this.appState.metadataResolver.addMetadataPackage('test', this.testPackage);
    this.appState.setActivePanel('test', panelCode);

  }


  testPackage: any = {
    officersAndGrantsPanel: {
      code: 'officersAndGrantsPanel',
      sections: [
        {
          code: 'master',
          linkedPanelCode: 'officerGroupsList'
        },
        {
          code: 'details',
          linkedPanelCode: 'officerGroupDetails'
        }
      ],
      sectionsTemplate:
        'master details details' +
        'master details details'
    }

    ,
    officerGroupsList: {
      code: 'officerGroupsList'
    },

    officerGroupDetails: {
      code: 'officerGroupDetails',
      dataSources:
        [
          {
            code: 'officerGroupsDs',
            operations: [
              {
                code: 'readOfficerGroups',
                type: 'read'
              }
            ]
          }
        ]
      ,
      tabs:
        [
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
      dataSources:
        [
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
      dataSources:
        [
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
