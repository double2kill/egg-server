export const TEXT_STORAGE_STORAGE_NAME = 'textStorage.storageName'
export const TEXT_STORAGE_READ_LOGS = 'textStorage.readLogs'
export const defaultStorageName = '默认仓库'

export const logs = [
  { id: 11,
    text: `1. 【文字收集仓】更名为【临时存储区】
           2. 增加上传图片的功能`,
    updateTime: '2020-3-20 23:36:52' },
  { id: 10,
    text: `1. 【仓库】获取最新的仓库作为第一次的仓库
           2. 修复特殊字符作为仓库名的bug`,
    updateTime: '2020-3-16 19:55:48' },
  { id: 9,
    text: `1. 【列表】时间会每分钟或者每小时变化`,
    updateTime: '2020-3-10 22:51:45' },
  { id: 8,
    text: `1. 【列表】增加删除功能
           2. 【列表】增加时间显示功能`,
    updateTime: '2020-3-6 23:59:31' },
  { id: 7,
    text: `1. 【日志】增加未读红点和已读标绿
           2. 【仓库】移动"复制"的位置至"仓库文字内部"`,
    updateTime: '2020-3-1 20:00:11' },
  { id: 6,
    text: `1. 【列表】增加+按钮，可增加仓库
           2. 【仓库】现在清空可以直接focus到文本，不需要额外点击
           3. 【仓库】"修改"文字更新为"切换"`,
    updateTime: '2020-3-1 03:49:44' },
  { id: 5,
    text: `1. 【仓库】增加清空按钮
           2. 新增【更新日志】可查看近期更新内容`,
    updateTime: '2020-2-28 22:02:35' },
  { id: 4, text: '增加【列表】，现在可以查看所有的仓库列表了，点击列表中的仓库可查看其内容', updateTime: '2020-2-27 21:48:52' },
  { id: 3, text: '更换组件库，仓库名支持修改', updateTime: '2020-2-12 23:12:29' },
  { id: 2, text: '增加复制功能', updateTime: '2020-2-10 23:28:29' },
  { id: 1, text: '文字收集仓上线，提供储存文字的功能', updateTime: '2020-2-8 21:20:29' }
]
