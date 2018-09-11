module.exports = [{
  path: 'pages/my/index',
  config: {
    navigationBarTitleText: 'myPage'
  }
}, {
  path: 'pages/my/collect/index',
  config: {
    navigationBarTitleText: 'myCollect'
  }
}, {
  path: 'pages/my/book/index',
  config: {
    navigationBarTitleText: 'myBook'
  }
}, {
  path: 'pages/my/foot/index',
  config: {
    navigationBarTitleText: 'myFoot'
  }
}, {
  path: 'pages/my/order/index',
  config: {
    navigationBarTitleText: 'myOrder'
  }
}, {
  path: 'pages/my/contract/index',
  config: {
    navigationBarTitleText: 'myContracnt'
  }
}, {
  path: 'pages/my/bill/index',
  config: {
    navigationBarTitleText: 'myBill'
  }
}, {
  path: 'pages/my/clean/index',
  config: {
    navigationBarTitleText: 'myClean'
  }
}, {
  path: 'pages/my/fix/index',
  config: {
    navigationBarTitleText: 'myFix'
  }
}, {
  path: 'pages/my/complain/index',
  config: {
    navigationBarTitleText: 'myComplain'
  }
}, {
  path: 'pages/my/lock/index',
  config: {
    navigationBarTitleText: 'myLock'
  }
}, {
  path: 'pages/my/electric/index',
  config: {
    navigationBarTitleText: 'myElectric'
  }
}, {
  path: 'pages/my/water/index',
  config: {
    navigationBarTitleText: 'myWater'
  }
}, {
  path: 'pages/index', // 页面路径，同时是 vue 文件相对于 src 的路径
  navigationBarTitleText: 'indexPage'
},
{
  path: 'pages/maps/maps',
  config: {
    navigationBarTitleText: 'mapsPage'
  }
},
{
  path: 'pages/zhengzhu/index',
  config: {
    navigationBarTitleText: 'zhengZhuPage'
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
    navigationBarTitleText: 'logOutPage'
  }
}, {
  path: 'pages/login/index',
  config: {
    navigationBarTitleText: 'logInPage'
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
