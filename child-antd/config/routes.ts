export default [
  {
    path: '/',
    component: '../layouts/BaseLayout',
    routes: [
      {
        path: '/background',
        redirect: '/background/dashboard'
      },
      {
        path: '/background/dashboard',
        component: './Dashboard/Index',
        name: '仪表盘',
        icon: 'dashboard',
      },
      {
        path: '/ampPortal',
        name: 'AmpPortal',
        icon: 'dashboard',
        component: './AmpPortal/Index',
        routes: [
          {
            name: '爱回收小程序',
            routes: [
              {
                path: '/ampPortal/amp/mp-list',
                name: '列表',
              }
            ],
          },
          {
            name: '回收晒单',
            routes: [
              {
                path: '/ampPortal/share-order/manage',
                name: '奖品码管理',
              },

              {
                path: '/ampPortal/share-order/exchange',
                name: '奖品核销',
              }
            ],
          },
        ],
      },
    ]
  },
  {
    component: './404',
  },
];
