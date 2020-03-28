const PCOption = {
  option: {
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {}
      }
    }
  }
}

const mobileOption = {
  query: {
    maxWidth: 500
  },
  option: {
    toolbox: {
      show: false
    },
    legend: {
      right: 10,
      top: '15%',
      orient: 'vertical'
    },
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'empty'
      }
    ]
  }
}

function formatMediaOption(option) {
  return {
    baseOption: option,
    media: [PCOption, mobileOption]
  }
}

export function getEchartOptions(data, title) {
  const XData = data.map(item => item.date)
  const maxTempData = data.map(item => item.statistics.max_temp)
  const minTempData = data.map(item => item.statistics.min_temp)

  return formatMediaOption({
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['最高气温', '最低气温']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: XData
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        type: 'line',
        name: '最高气温',
        data: maxTempData,
        smooth: true,
        markPoint: {
          label: {
            formatter: '{c}°C'
          },
          symbolSize: 60,
          data: [
            { type: 'max', name: '最大值' }
          ]
        }
      },
      {
        type: 'line',
        name: '最低气温',
        data: minTempData,
        smooth: true,
        markPoint: {
          label: {
            formatter: '{c}°C'
          },
          symbolSize: 60,
          data: [
            { type: 'min', name: '最小值' }
          ]
        }
      }
    ]
  })
}
