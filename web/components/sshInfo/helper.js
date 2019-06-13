const echarts = require('echarts')
const moment = require('moment')

function getVirtulData(data) {
  data = data.map(item => echarts.format.formatTime('yyyy-MM-dd', item.time))
  data = data.reduce((result, item) => {
    const newItem = [item, 1]
    if (result.length === 0) {
      result.push(newItem)
      return result
    }
    const last = result[result.length - 1]
    if (last[0] === item) {
      last[1] += 1
      return result
    } else {
      result.push(newItem)
      return result
    }
  }, [])
  return data
}

export function getOptions(data, user) {
  const lastYearToday = moment().add(-1, 'year').format('YYYY-MM-DD')
  const today = moment().format('YYYY-MM-DD')
  const range = [lastYearToday, today]
  const option = {
    title: {
      top: 30,
      left: 'center',
      text: `${user}的ssh登陆频率图`
    },
    tooltip: {},
    visualMap: {
      min: 0,
      max: 10,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 65,
      textStyle: {
        color: '#000'
      }
    },
    calendar: {
      top: 120,
      left: 30,
      right: 30,
      cellSize: ['auto', 13],
      range,
      itemStyle: {
        normal: { borderWidth: 0.5 }
      },
      yearLabel: { show: false },
      monthLabel: {
        nameMap: 'cn'
      },
      dayLabel: {
        firstDay: 1,
        nameMap: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      }
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtulData(data)
    }
  }
  return option
}
