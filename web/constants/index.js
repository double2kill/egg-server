export default {
  CMD: 'http://cmd.greatwebtech.cn',
  SPAIR: 'http://spair.greatwebtech.cn'
}

export const EGG_SERVER = 'http://www.greatwebtech.cn:7001'
export const COOKIE = {
  USER_NAME: 'USER_NAME'
}

export const routeList = [
  { path: '/', name: '首页' },
  { path: '/textStorage', name: '临时存储区' },
  { path: '/sshInfo', name: 'ssh信息' },
  { path: '/list', name: '天气订阅' },
  { path: '/weather', name: '天气历史' },
  { path: '/questionnaire', name: '性格测评' },
  { path: '/timeLine', name: '时间线' },
  { path: '/todoList', name: 'TODO' },
  { path: '/others', name: '其他' },
  { path: '/admin', name: '管理员后台', mode: 'admin' }
]

export const routeNameMap = routeList.reduce((map, item) => {
  const { path, name } = item
  map[path] = name
  return map
}, {})

export const SPAIR_NAMESPACE = {
  admin: 'admin',
  timeLine: 'timeLine',
  textStorage: 'textStorage',
  user: 'user'
}
