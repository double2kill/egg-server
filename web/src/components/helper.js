export function getOptions(data) {

  const XData = data.map(item => item.date)
  const maxTempData = data.map(item => item.statistics.max_temp)
  const minTempData = data.map(item => item.statistics.min_temp)

  return {
    title: {
      text: '大田历史变化',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['最高气温', '最低气温']
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
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
        name: '最高气温',
        type: 'line',
        data: maxTempData,
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        }
      },
      {
        name: '最低气温',
        type: 'line',
        data: minTempData,
        label: {
          formatter: '{b} °C'
        },
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        }
      }
    ]
  };
}