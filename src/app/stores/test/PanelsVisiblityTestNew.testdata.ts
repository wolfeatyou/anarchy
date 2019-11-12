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
          type: 'header',
          reference: 'pageToolbar1',
          items: [
            {
              type: 'link'
            }
          ]
        },
        {
          type: 'breadcrumbs',
          reference: 'pageToolbar1'
        },
        {
          type: 'layout',
          items: [
            {
              code: 'master',
              reference: 'officerGroupsList'
            },
            {
              code: 'details',
              referencedPartCode: 'officerGroupDetails'
            }
          ],
          layout:
            `master details details
             master details details`
        }
      ]
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
          type: 'header',
          items: [
            {
              type: 'link'
            },
            {
              type: 'field'
            }
          ]
        },
        {
          type: 'list',
          dataSourceCode: 'officerGroupsDs',
          fields: [
            {
              code: 'title',
              dataField: ''
            }
          ]
        }
      ]
    },

    officerGroupDetails: {
      code: 'officerGroupDetails',
      display: 'panel',
      parts:
        [
          {
            type: 'header',
            items: [
              {
                type: 'title'
              },
              {
                type: 'action'
              }
            ]
          },
          {
            type: 'form',
            fields: [
              {
                code: 'title'
              }
            ]
          },
          {
            type: 'tabs',
            items: [
              {
                code: 'officersTab',
                type: 'reference',
                linkedPanelCode: 'officers'
              },
              {
                code: 'roles',
                type: 'reference',
                linkedPanelCode: 'roles'
              }
            ]
          }
        ]
    },

    roles: {
      code: 'roles',
      display: 'list',
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
