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
    this.appState.setActivePanel('test', 'officerGroupDetails');


  }


  testPackage: any = {
    officersAndGrantsPage: {
      display: 'page',
      props: {
        title: 'Officers & Grants'
      },
      toolbar: {
        items: []
      },
      sectionsTemplate:
        'master details details' +
        'master details details',
      sectionsDetails: [
        {
          code: 'master',
          linkedPanelCode: 'officerGroupsList',
        },
        {
          code: 'details',
          linkedPanelCode: 'officerGroupDetails',
        }
      ]
    }

    ,
    officerGroupsList: {
      code: 'officerGroupsList',
      display: 'list',
      sharedProperties:
        [
          {
            title: 'Officer Groups'
          }
        ]
      ,
      links: [
        {
          code: 'Details',
          linkedPanelCode: 'officerGroupDetails',
          linkedPanelSection: 'details'
        }
      ]
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
          }
          , {
          code: 'roles'
          ,
          linkedPanelCode: 'roles'
        }

        ]

    }

    ,

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
    }

    ,

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
