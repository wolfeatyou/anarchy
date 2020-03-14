export class AdministrationPackage {
  static package: any = {
    pages: [
      {
        code: 'fleets',
        type: 'page',
        parts: [
          {
            type: 'layout',
            layout: '\'master details details details details details\'',
            placeholders: [
              {
                code: 'master',
                type: 'placeholder',
                panel: 'fleets_menu'
              },
              {
                code: 'details',
                type: 'placeholder',
                panel: 'fleets_page'
              }
            ]
          }
        ]
      },
      {
        code: 'fleets_page',
        type: 'page',
        parts: [
          {
            type: 'bar',
            height: 48,
            items: [
              {
                type: 'label',
                role: 'header',
                align: 'right',
                text: 'IMG'
              },
              {
                type: 'label',
                role: 'header',
                text: 'Stan Lee',
              }
            ]
          },
          {
            code: 'fleets_details',
            type: 'placeholder',
            panel: 'fleets_contracts'
          }
        ],
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
          ]
      },
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
        code: 'fleets_menu',
        type: 'panel',
        parts: [
          {
            type: 'bar',
            height: 48,
            items: [
              {
                type: 'label',
                role: 'header',
                text: 'Transport Z'
              }
            ]
          },
          {
            type: 'menu',
            items: [
              {
                title: 'Contracts',
                type: 'link',
                target: 'fleets_details',
                panel: 'fleets_contracts'
              },
              {
                title: 'Cards',
                type: 'link',
                target: 'fleets_details',
                panel: 'fleets_cards'
              },
              {
                title: 'Card groups',
                type: 'link',
                target: 'fleets_details',
                panel: 'fleets_cards'
              },
              {
                title: 'Transactions',
                type: 'link',
                target: 'fleets_details',
                panel: 'fleets_cards'
              },
              {
                title: 'Company profile',
                type: 'link',
                target: 'fleets_details',
                panel: 'fleets_cards'
              }
            ]
          }
        ]
      },
      {
        code: 'fleets_contracts',
        type: 'panel',
        parts: [
          {
            type: 'bar',
            height: 48,
            items: [
              {
                type: 'label',
                role: 'header',
                text: 'Contracts'
              }
            ]
          },
          {
            type: 'list',
            dataSourceCode: 'rolesDs'
          }
        ],
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
          ]
      },
      {
        code: 'fleets_cards',
        type: 'panel',
        parts: [
          {
            type: 'bar',
            height: 48,
            items: [
              {
                type: 'label',
                role: 'header',
                text: 'Cards'
              }
            ]
          },
          {
            type: 'bar',
            height: 96,
            items: [
              {
                type: 'label',
                role: 'header',
                text: 'Filter field1',
                hack: 'input'
              },
              {
                type: 'label',
                role: 'header',
                text: 'Filter field1',
                hack: 'input'
              },
              {
                type: 'label',
                role: 'header',
                text: 'Filter field3',
                hack: 'input'
              },
              {
                title: 'Add new card',
                type: 'link',
                target: 'fleets_details',
                panel: 'fleets_cards_add',
                align: 'right'
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
        code: 'fleets_cards_add',
        type: 'panel',
        parts: [
          {
            type: 'bar',
            height: 48,
            items: [
              {
                title: '<--Back',
                type: 'link',
                target: 'fleets_details',
                panel: 'fleets_cards'
              },
              {
                type: 'label',
                role: 'header',
                text: 'Add new card'
              }
            ]
          },
          {
            type: 'layout',
            layout: `
            \'l   .   .   .   .    .   .   .   .   .   .   .   .   r\'
            \'l   l1  l1  l1  l1   .   .   .   .   .   .   .   .   r\'
            \'l   v1  v1  v1  v1   .   .   .   .   .   .   .   .   r\'
            \'l   .   .   .   .    .   .   .   .   .   .   .   .   r\'
            \'l   g1   g1 g1  g1   g1  .   .   fg1 fg1 fg1 fg1 .   r\'
            \'l   cnt cnt cnt cnt  cnt .   .   cbt cbt cbt cbt .   r\'
            \'l   cnb cnb cnb cnb  cnb .   .   cbv cbv cbv cbv .   r\'
            \'l   vnt vnt vnt vnt  vnt .   .   lg1 lg1 lg1 lg1 .   r\'
            \'l   vnv vnv vnv vnv  vnv .   .   cgt cgt cgt cgt .   r\'
            \'l   btt btt btt btt  btt .   .   cgv cgv cgv cgv .   r\'
            \'l   btv btv btv btv  btv .   .   .   .   .   .   .   r\'
            \'l   .   .   .   .    .   .   .   .   .   .   .   .   r\'
            \'l   ldt ldt ldt ldt  ldt ldt .   .   .   .   .   .   r\'
            \'l   ld  ld  ld  ld   ld  ld  ld  ld  ld  ld  ld  ld   r\'
            \'l   ld  ld  ld  ld   ld  ld  ld  ld  ld  ld  ld  ld   r\'
            \'l   ld  ld  ld  ld   ld  ld  ld  ld  ld  ld  ld  ld   r\'
            \'l   ld  ld  ld  ld   ld  ld  ld  ld  ld  ld  ld  ld   r\'
            \'l   ld  ld  ld  ld   ld  ld  ld  ld  ld  ld  ld  ld   r\'
            \'l   ld  ld  ld  ld   ld  ld  ld  ld  ld  ld  ld  ld   r\'
            \'l   ld  ld  ld  ld   ld  ld  ld  ld  ld  ld  ld  ld   r\'
            \'l   ld  ld  ld  ld   ld  ld  ld  ld  ld  ld  ld  ld   r\'
            \'l   ld  ld  ld  ld   ld  ld  ld  ld  ld  ld  ld  ld   r\'
            \'l   ld  ld  ld  ld   ld  ld  ld  ld  ld  ld  ld  ld   r\'
            `,
            items: [
              {
                code: 'l',
                type: 'label',
                role: 'header',
                text: ''
              },
              {
                code: 'r',
                type: 'label',
                role: 'header',
                text: ''
              },
              {
                code: 'l1',
                type: 'label',
                text: 'Card number',
                role: 'group'
              },
              {
                code: 'v1',
                type: 'label',
                role: 'main-text',
                text: '1212 1212 1121 2121',
              },
              {
                code: 'g1',
                type: 'label',
                role: 'group',
                text: 'General'
              },
              {
                code: 'cnt',
                type: 'label',
                text: 'Contract number',
                role: 'title'
              },
              {
                code: 'cnb',
                type: 'label',
                text: 'CN1234567890',
                role: 'value'
              },
              {
                code: 'vnt',
                type: 'label',
                text: 'Valid until',
                role: 'title'
              },
              {
                code: 'vnv',
                type: 'label',
                text: '10.10.2020',
                role: 'value'
              },
              {
                code: 'fg1',
                type: 'label',
                role: 'group',
                text: 'Finance'
              },
              {
                code: 'cbt',
                type: 'label',
                text: 'Card balance',
                role: 'title'
              },
              {
                code: 'cbv',
                type: 'label',
                text: '$ 100.00',
                role: 'value'
              },
              {
                code: 'lg1',
                type: 'label',
                role: 'group',
                text: 'Limits'
              },
              {
                code: 'cgt',
                type: 'label',
                text: 'Card groups',
                role: 'title'
              },
              {
                code: 'cgv',
                type: 'label',
                text: 'Group A, Group D',
                role: 'value'
              },
              {
                code: 'btt',
                type: 'label',
                text: 'Balance type',
                role: 'title'
              },
              {
                code: 'btv',
                type: 'label',
                text: 'Own',
                role: 'value'
              },
              {
                code: 'ldt',
                type: 'label',
                role: 'group',
                text: 'Linked drivers'
              },
              {
                code: 'ld',
                type: 'list',
                dataSourceCode: 'rolesDs'
              }
            ]
          }
        ],
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
          ]
      },

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
                text: 'Title for: {groupTitle}',
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
