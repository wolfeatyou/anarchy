import {ApplicationState} from '../application.state';
import {DataSourceState} from '../DataSourceState/datasource.state';
import {MetaDataParser} from '../../meta/parser/MetaDataParser';
import {PanelState} from '../panel.state';
import {Router} from '@angular/router';
import {RouteState} from '../route.state';


export class PanelsVisiblityTestDataNew {
  appState: ApplicationState;

  constructor() {
    this.appState = new ApplicationState(new RouteState(null));
    this.appState.metadataResolver.addMetadataPackage('test', PanelsVisiblityTestDataNew.testPackage);
  }

  init(panelCode: string) {
    this.appState.setActivePanel('test', panelCode);

  }


  public static testPackage: any = {
    adimistrationPage: {
      code: 'adimistrationPage',
      parts: [
        {
          type:'toolbar'
        }
      ]
    },
    officersAndGrantsPanel: {
      code: 'officersAndGrantsPanel',
      parts: [
        {
          type: 'layout',
          layout: 'master details details',
          items: [
            {
              code: 'master',
              panel: 'officerGroupsList'
            },
            {
              code: 'details',
              panel: 'officerGroupDetails'
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
              panel: 'officers',
              target: 'tabs'
            },
            {
              code: 'rolesTab',
              type: 'link',
              panel: 'roles',
              target: 'tabs'
            }
          ]
        },
        {
          code: 'tabs',
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
