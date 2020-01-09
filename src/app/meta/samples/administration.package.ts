export class AdministrationPackage {
  static package: any = {
    pages: [
      {
        code: 'menu',
        type: 'page',
        parts: [
          {
            type: 'bar',
            items: [
              {
                type: 'label',
                role: 'header',
                text: 'Main menu page'
              }
            ]
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
                title: 'Designer',
                type: 'link',
                target: 'page',
                page: 'designer'
              },
              {
                title: 'Simple',
                type: 'link',
                target: 'page',
                page: 'simple'
              },
              {
                title: 'Simple layout',
                type: 'link',
                target: 'page',
                page: 'simple_layout'
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
        code: 'designer',
        type: 'page',
        parts: [
          {
            type: 'bar',
            items: [
              {
                type: 'label',
                role: 'header',
                text: 'Admin page toolbar'
              }
            ]
          },
          {
            type: 'layout',
            layout: '\'master details details details details details properties\'',
            placeholders: [
              {
                code: 'master',
                type: 'placeholder',
                panel: 'menu'
              },
              {
                code: 'details',
                type: 'placeholder',
                panel: 'administration'
              },
              {
                code: 'properties',
                type: 'placeholder',
                panel: 'menu'
              }]
          }]
      },
      {
        code: 'modal',
        type: 'page',
        parts: [
          {
            type: 'bar',
            items: [
              {
                type: 'label',
                role: 'header',
                text: 'Modal page ({url})',
                parameters: [{
                  code: 'url',
                  expression: 'api.GetPage().route.url'
                }]
              }
            ]
          },
          {
            code: 'content',
            type: 'placeholder',
            applyToUrl: true
          },
          {
            type: 'bar',
            items: [
              {
                type: 'label',
                role: 'header',
                text: 'OK'
              },
              {
                type: 'label',
                role: 'header',
                text: 'CANCEL'
              }
            ]
          },
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
                type: 'label',
                role: 'header',
                text: 'Administration page'
              },
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
              }
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
            items: [
              {
                type: 'label',
                role: 'header',
                text: 'Simple page'
              }
            ]
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
            items: [
              {
                type: 'label',
                role: 'header',
                text: 'Layout sample page'
              }
            ]
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
            layout: '\'master details',
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
            type: 'toolbar',
            items: [
              {
                type: 'label',
                role: 'header',
                text: 'Officers groups'
              }
            ]
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
                type: 'label',
                role: 'header',
                text: 'lalalal: {groupTitle}',
                parameters: [{
                  code: 'groupTitle',
                  dataSourceCode: 'officerGroupsDs',
                  dataItemProperty: 'title'
                }]
              },
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
            items: [
              {
                type: 'label',
                role: 'header',
                text: 'Roles'
              },
              {
                title: 'modal',
                type: 'link',
                panel: 'roles',
                target: 'modal'
              }
            ]
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
            items: [
              {
                type: 'label',
                role: 'header',
                text: 'Officers'
              },
              {
                title: 'external',
                type: 'link',
                page: 'simple'
              },
              {
                title: 'modal',
                type: 'link',
                panel: 'roles',
                target: 'modal'
              },
              {
                title: 'simple action',
                type: 'link',
                /*flow1: [
                  {
                    type: 'confirmation',
                    text: 'Are you sure?',
                    dataSourceCode: 'officersDs',
                    operation: 'update',
                  }
                ],
                flow: [
                  {
                    code: 'confirm',
                    type: 'confirmation',
                    label: {
                      text: 'Are you sure?'
                    },
                    success: 'run'
                  },
                  {
                    code: 'run',
                    type: 'run-operation',
                    dataSourceCode: 'officersDs',
                    operation: 'update',
                    success: {
                      code: 'result',
                      type: 'message',
                      enabled: 'operation.retMsg == true',
                      label: {
                        text: 'Operation completed: {operation.retMsg}'
                      }
                    },
                    failed: {
                      code: 'error',
                      type: 'message',
                      enabled: 'operation.retCode != 0',
                      label: {
                        text: 'Operation failed: {retMsg}'
                      }
                    }
                  }
                ]*/
              }
            ]
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
