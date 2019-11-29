export class AdministrationPackage {
  static package: any = {
    pages: [
      {
        code: 'menu',
        type: 'page',
        parts: [
          {
            type: 'bar',
            items: []
          },
          {
            type: 'menu',
            items: [
              {
                title: 'Administration',
                type: 'link',
                target: 'page',
                page: 'administration'
              },
              {
                title: 'Global parameters',
                type: 'link',
                target: 'page',
                page: 'default'
              }
            ]
          }
        ]
      },
      {
        code: 'administration',
        type: 'page',
        parts: [
          {
            type: 'bar',
            items: [
              {
                title: 'Officer groups',
                type: 'link',
                panel: 'officerGroups',
                target: 'content'
              },
              {
                title: 'Roles',
                type: 'link',
                panel: 'roles',
                target: 'content'
              },
            ]
          },
          {
            code: 'content',
            type: 'placeholder',
            panel: 'officerGroups',
            applyToUrl: true
          }
        ]
      },
      {
        code: 'simple',
        type: 'page',
        dataSources:
          [
            {
              code: 'simpleDs',
              operations: [
                {
                  code: 'simpleDs',
                  type: 'read'
                }
              ]
            }
          ],
        parts: [
          {
            type: 'bar',
            items: []
          },
          {
            type: 'list',
            dataSourceCode: 'simpleDs'
          }
        ]
      },
      {
        code: 'simple_layout',
        type: 'page',
        dataSources:
          [
            {
              code: 'simpleDs',
              operations: [
                {
                  code: 'simpleDs',
                  type: 'read'
                }
              ]
            }
          ],
        parts: [
          {
            type: 'bar',
            items: []
          },
          {
            type: 'layout',
            layout: '\'master details\'',
            placeholders: [
              {
                code: 'master',
                type: 'placeholder',
                panel: 'roles'
              },
              {
                code: 'details',
                type: 'placeholder',
                panel: 'roles'
              }]
          }
        ]
      }
    ],
    panels: [
      {
        code: 'officerGroups',
        type: 'panel',
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
            type: 'layout',
            layout: '\'master details\'',
            placeholders: [
              {
                code: 'master',
                type: 'placeholder',
                panel: 'officerGroupsList'
              },
              {
                code: 'details',
                type: 'placeholder',
                panel: 'officerGroupDetails'
              }
            ]
          },
        ]
      },
      {
        code: 'officerGroupsList',
        type: 'panel',
        parts: [
          {
            type: 'toolbar'
          },
          {
            type: 'list',
            dataSourceCode: 'officerGroupsDs'
          }
        ]
      },
      {
        code: 'officerGroupDetails',
        type: 'panel',
        parts: [
          {
            type: 'toolbar',
            items: [
              {
                title: 'Officers',
                code: 'officersTab',
                type: 'link',
                panel: 'officers',
                target: 'tabs'
              },
              {
                title: 'Roles',
                code: 'rolesTab',
                type: 'link',
                panel: 'roles',
                target: 'tabs'
              }
            ]
          },
          {
            code: 'tabs',
            type: 'placeholder',
            panel: 'officers',
            applyToUrl: true
          }
        ]

      },
      {
        code: 'roles',
        type: 'panel',
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
        parts: [
          {
            type: 'toolbar',
            items: []
          },
          {
            type: 'list',
            dataSourceCode: 'rolesDs'
          }
        ]
      },
      {
        code: 'officers',
        type: 'panel',
        parts: [
          {
            type: 'toolbar',
            items: []
          },
          {
            type: 'list',
            dataSourceCode: 'officersDs'
          }
        ],
        dataSources:
          [
            {
              code: 'officersDs',
              operations: [
                {
                  code: 'readOfficers',
                  type: 'read',
                  parameters: [{
                    code: 'parentId',
                    dataSourceCode: 'officerGroupsDs',
                    dataItemProperty: 'id'
                  }]
                }
              ]
            }
          ]
      }
    ]
  };
}
