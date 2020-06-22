export default {
  CMD: 'http://cmd.greatwebtech.cn',
  SPAIR: 'http://spair.greatwebtech.cn'
}

export const EGG_SERVER = 'http://www.greatwebtech.cn:7001'
export const COOKIE = {
  USER_NAME: 'USER_NAME',
  GITHUB_USER_NAME: 'GITHUB_USER_NAME'
}

export const routeList = [
  { path: '/', name: '首页' },

  { path: '/textStorage', name: '临时存储区' },
  { path: '/sshInfo', name: 'ssh信息' },
  { path: '/weather', name: '天气历史' },
  {
    name: '其它服务',
    subMenuRouteList: [
      { path: '/list', name: '天气订阅' },
      { path: '/scripts', name: '脚本生成' },
      { path: '/questionnaire', name: '性格测评' },
      { path: '/timeLine', name: '时间线' },
      { path: '/todoList', name: 'TODO' }
    ]
  },
  { path: '/others', name: '其它网站' },
  { path: '/login', name: '登录' },
  { path: '/admin', name: '管理员后台', mode: 'admin' }
]

export const routeNameMap = routeList.reduce((map, item) => {
  const { path, name, subMenuRouteList } = item
  if (subMenuRouteList) {
    subMenuRouteList.forEach((route) => {
      map[route.path] = route.name
    })
  } else {
    map[path] = name
  }
  return map
}, {})

export const SPAIR_NAMESPACE = {
  admin: 'admin',
  timeLine: 'timeLine',
  textStorage: 'textStorage',
  user: 'user'
}

export const links = [
  { href: '/textstorage', text: '临时存储区', page: 'index', target: '_self' },
  { href: '/sshInfo', text: 'ssh信息', page: 'index', target: '_self' },
  { href: 'http://table.greatwebtech.cn/', text: 'table', page: 'other' },
  { href: 'http://hetenghuan.greatwebtech.cn/jenkins', text: 'jenkins', page: 'other' },
  { href: 'http://code-craft.greatwebtech.cn/', text: 'code-craft', page: 'other' },
  { href: 'http://birthday.greatwebtech.cn/', text: '生日快乐', page: 'other' },
  { href: 'http://cmd.greatwebtech.cn/', text: '常用命令', page: 'other' },
  { href: 'http://family.greatwebtech.cn/', text: 'family', page: 'other' },
  { href: 'http://handsontable.greatwebtech.cn/', text: '云表格', page: 'other' },
  { href: 'http://hanxiaoluan.greatwebtech.cn/', text: 'reactApp', page: 'other' }
]

export const othersLinks = links.filter(item => item.page === 'other')
export const indexLinks = links.filter(item => item.page === 'index')
