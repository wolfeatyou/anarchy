import {ApplicationState} from '../application.state';
import {DataSourceState} from '../DataSourceState/datasource.state';
import {MetaDataParser} from '../../meta/parser/MetaDataParser';
import {PanelState} from '../panel.state';


export class PanelsVisiblityTestDataNew {
  appState: ApplicationState;

  constructor() {

  }

  init(panelCode: string) {
    this.appState = new ApplicationState();

    this.appState.metadataResolver.addMetadataPackage('test', this.testPackage);
    this.appState.setActivePanel('test', panelCode);

  }


  testPackage: any = {
    officersAndGrantsPanel: {
      code: 'officersAndGrantsPanel',
      parts: [
        {
          type: 'layout',
          layout:
            'master details details' +
            'master details details',
          items: [
            {
              code: 'master',
              type: 'placeholder',
              linkedPanelCode: 'officerGroupsList'
            },
            {
              code: 'master',
              type: 'placeholder',
              linkedPanelCode: 'officerGroupDetails'
            }
          ]
        },
      ],
    }

    ,
    officerGroupsList: {
      code: 'officerGroupsList',
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
        ],
      parts: [
        {
          type: 'toolbar'
        },
        {
          type: 'list'
        }
      ]
    },

    officerGroupDetails: {
      code: 'officerGroupDetails',
      parts: [
        {
          type: 'toolbar',
          items: [
            {
              code: 'officersTab',
              type: 'link',
              targetPlaceholder: 'tabsPlaceholder',
              linkedPanelCode: 'officers'
            },
            {
              code: 'roles',
              type: 'link',
              targetPlaceholder: 'tabsPlaceholder',
              linkedPanelCode: 'roles'
            }
          ]
        },
        {
          code: 'tabsPlaceholder',
          type: 'placeholder'
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
