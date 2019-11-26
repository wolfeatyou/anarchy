export class AdministrationPackage {
  static package: any = {
    pages: [
      {
        code: 'menu',
        type: 'page',
        parts: [
          {
            type: 'menu',
            items: [
              {
                type: 'link',
                target: 'page',
                page: 'administration',
                panel: 'officerGroups',
              },
              {
                type: 'link',
                target: 'page',
                page: 'default',
                panel: 'globalParams',
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
                type: 'link',
                panel: 'officerGroups',
                target: 'content'
              },
              {
                type: 'link',
                panel: 'roles',
                target: 'content'
              },
            ]
          },
          {
            code: 'content',
            type: 'placeholder',
            panel: 'officerGroups'
          }
        ]
      }
    ],
    panels: [
      {
        code: 'officerGroups',
        type: 'panel',
        parts: [
          {
            type: 'layout',
            layout: 'master details details',
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
      {
        code: 'officerGroupDetails',
        type: 'panel',
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
            type: 'placeholder',
            panel: 'officers'
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
            type: 'list'
          }
        ],
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
          ]
      }
    ]
  };
}
