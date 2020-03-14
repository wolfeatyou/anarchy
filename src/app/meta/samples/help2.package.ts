export class FleetsPackage {
  static package: any = {
    pages: [
      {
        code: 'registration',
        type: 'page',
        parts: [
          {
            type: 'bar',
            height: 48,
            items: [
              {
                type: 'label',
                role: 'header',
                text: 'LOGO'
              },
              {
                type: 'label',
                role: 'header',
                text: 'Login page'
              }
            ]
          },
          {
            type: 'custom',
            height: 50,
            componentCode: 'detailsBar',
            text: 'Custom component'
          },
          {
            type: 'custom',
            height: 50,
            componentCode: 'detailsBar',
            parameters: [{
              code: 'param1',
              dataSourceCode: 'anyDs',
              dataItemProperty: 'title'
            }]
          },
          {
            code: 'content',
            type: 'panel',
            boxDecorations: {
              align: 'center',
              paddingTop: '100px',
              borderWidth: '0px'
            },
            parts: [
              {
                code: 'content',
                type: 'placeholder',
                applyToUrl: true
              }
            ]
          }
        ],
        dataSources:
          [
            {
              code: 'anyDs',
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
            panel: 'fleets_contracts',
            applyToUrl: true
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
      }
    ],
    panels: [
      {
        code: 'register',
        type: 'panel',
        boxDecorations: {
          borderWidth: '0px',
          width: '320px'
        },
        parts: [
          {
            code: 'register_form',
            type: 'panel',
            boxDecorations: {
              borderWidth: '0px'
            },
            parts: [
              {
                type: 'label',
                role: 'title',
                text: 'Name'
              },
              {
                type: 'label',
                hack: 'input'
              },
              {
                type: 'label',
                role: 'title',
                text: 'e-mail'
              },
              {
                type: 'label',
                hack: 'input'
              }, {
                type: 'label',
                role: 'title',
                text: 'e-mail'
              },
              {
                type: 'label',
                hack: 'input'
              }, {
                type: 'label',
                role: 'title',
                text: 'e-mail'
              },
              {
                type: 'label',
                hack: 'input'
              }, {
                type: 'label',
                role: 'title',
                text: 'e-mail'
              },
              {
                type: 'label',
                hack: 'input'
              },
              {
                type: 'bar',
                role: 'box',
                height: 60,
                boxDecorations: {
                  borderWidth: '0px'
                },
                items: [
                  {
                    title: 'Process registration',
                    type: 'link',
                    page: 'registration/register_complete',
                    align: 'right'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        code: 'login',
        type: 'panel',
        boxDecorations: {
          borderWidth: '0px',
          width: '320px'
        },
        parts: [
          {
            type: 'label',
            role: 'title',
            text: 'Login'
          },
          {
            type: 'label',
            hack: 'input'
          },
          {
            type: 'label',
            role: 'title',
            text: 'Password'
          },
          {
            type: 'label',
            role: 'header',
            text: 'Login page',
            hack: 'input'
          },
          {
            type: 'bar',
            role: 'box',
            height: 60,
            boxDecorations: {
              borderWidth: '0px'
            },
            items: [
              {
                title: 'Register',
                type: 'link',
                page: 'registration/register'
              },
              {
                title: 'Log In',
                type: 'link',
                page: 'menu',
                align: 'right'
              }
            ]
          }
        ]
      },
      {
        code: 'register_complete',
        type: 'panel',
        boxDecorations: {
          borderWidth: '0px',
          width: '320px'
        },
        parts: [
          {
            code: 'register_complete',
            type: 'panel',
            boxDecorations: {
              borderWidth: '0px'
            },
            parts: [
              {
                type: 'label',
                role: 'title',
                text: 'Registration completed'
              },
              {
                type: 'bar',
                role: 'box',
                height: 60,
                boxDecorations: {
                  borderWidth: '0px'
                },
                items: [
                  {
                    title: 'Go to Login',
                    type: 'link',
                    page: 'registration/login'

                  }
                ]
              }
            ]
          }
        ]
      },
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
    ]
  };
}
