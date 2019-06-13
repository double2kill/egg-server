export const originData = [
  {
    id: 1,
    label: 'JAVA实现对数据库的访问'
  },
  {
    id: 2,
    label: '将查询到的数据封装为JSON格式'
  },
  {
    id: 3,
    label: '将JSON格式数据返回至前端'
  },
  {
    id: 4,
    label: '根据不同参数可以实现不同查询，并把数据返回前端'
  },
  {
    id: 5,
    label: '将代码封装为一个进程，能够为前端正常提供服务'
  },
  {
    id: 6,
    label: '实现静态的数据展示',
    children: [18, 19]
  },
  {
    id: 7,
    label: '将获取到的JSON数据显示在网页上'
  },
  {
    id: 8,
    label: '双击某一行，向后端发送查询测试LOG查询语句'
  },
  {
    id: 9,
    label: '将获取到的测试LOG显示在网页上',
    children: [17]
  },
  {
    id: 10,
    label: '实现测试LOG的下载',
    children: [20, 16]
  },
  {
    id: 11,
    label: '实现登录页面'
  },
  {
    id: 12,
    label: '优化查询界面',
    children: [13, 14, 15]
  },
  { id: 13, label: '选择完产品大类，自动刷新产品型号下拉列表' },
  {
    id: 14,
    label: '实现简单的数据筛选（测试结果勾选PASS或者FAIL实现测试结果筛选）'
  },
  { id: 15, label: '在测试LOG界面中能够实现对字符串的搜索' },
  { id: 16, label: '实现批量LOG下载' },
  { id: 17, label: '双击对应行，则刷出对应的log' },
  { id: 18, label: '输入参数界面设计' },
  { id: 19, label: '输出参数界面设计' },
  { id: 20, label: '在选中行右键，可以弹出菜单' }
]

export const formatData = (data) => {
  const childList = data.reduce((res, item) => {
    if (item.children && item.children.length > 0) {
      return res.concat(item.children)
    }
    return res
  }, [])

  let newData = data.filter(item => !childList.includes(item.id))
  newData = newData.map((item) => {
    if (item.children) {
      const children = item.children.map((childId) => {
        return data.find(item => item.id === childId)
      }).filter(item => item)
      return {
        ...item,
        children
      }
    }
    return item
  })
  return newData
}
