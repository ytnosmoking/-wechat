module.exports = [{
  path: 'pages/my/index',
  config: {
    navigationBarTitleText: '我的'
  }
}, {
  path: 'pages/my/collect/index',
  config: {
    navigationBarTitleText: '收藏'
  }
}, {
  path: 'pages/my/book/index',
  config: {
    navigationBarTitleText: '预定'
  }
}, {
  path: 'pages/my/foot/index',
  config: {
    navigationBarTitleText: '足迹'
  }
}, {
  path: 'pages/my/order/index',
  config: {
    navigationBarTitleText: '预约'
  }
}, {
  path: 'pages/my/contract/index',
  config: {
    navigationBarTitleText: '我的合同'
  }
}, {
  path: 'pages/my/contract/detail',
  config: {
    navigationBarTitleText: '合同详细'
  }
}, {
  path: 'pages/my/bill/index',
  config: {
    navigationBarTitleText: '代缴账单'
  }
}, {
  path: 'pages/my/clean/index',
  config: {
    navigationBarTitleText: '保洁服务'
  }
}, {
  path: 'pages/my/fix/index',
  config: {
    navigationBarTitleText: '维修服务'
  }
}, {
  path: 'pages/my/complain/index',
  config: {
    navigationBarTitleText: '建议投诉'
  }
}, {
  path: 'pages/my/lock/index',
  config: {
    navigationBarTitleText: '智能门锁'
  }
}, {
  path: 'pages/my/electric/index',
  config: {
    navigationBarTitleText: '智能电表'
  }
}, {
  path: 'pages/my/water/index',
  config: {
    navigationBarTitleText: '智能水表'
  }
}, {
  path: 'pages/index', // 页面路径，同时是 vue 文件相对于 src 的路径
  config: {
    navigationBarTitleText: '品牌公寓'
  }
},
{
  path: 'pages/maps/maps',
  config: {
    navigationBarTitleText: '地图'
  }
},
{
  path: 'pages/zhengzhu/index',
  config: {
    navigationBarTitleText: '整租'
  }
},
{
  path: 'pages/zhengzhu/about',
  config: {
    navigationBarTitleText: '房源详情'
  }
}, {
  path: 'pages/zhengzhu/orderHouse',
  config: {
    navigationBarTitleText: '预约看房'
  }
}, {
  path: 'pages/zhengzhu/onLineBook',
  config: {
    navigationBarTitleText: '在线预定'
  }
},
{
  path: 'pages/my/logOut',
  config: {
    navigationBarTitleText: '退出'
  }
}, {
  path: 'pages/login/index',
  config: {
    navigationBarTitleText: '登陆'
  }
},

{
  path: 'packageA/logs',
  subPackage: true,
  config: { // 页面配置，即 page.json 的内容
    navigationBarTitleText: '查看启动日志'
  }
}
]
