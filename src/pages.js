module.exports = [{
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
  path: 'pages/my/index',
  config: {
    navigationBarTitleText: 'myPage'
  }
},
{
  path: 'pages/my/logOut',
  config: {
    navigationBarTitleText: 'logOutPage'
  }
},
{
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
