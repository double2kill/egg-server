const echarts = require('echarts')

function getVirtulData() {

  let data = [ { name: 'liuchen',
    terminal: 'pts/0',
    time: 1527392040000,
    ip: '(218.106.154.158)' },
  { name: 'liuchen',
    terminal: 'pts/0',
    time: 1527581040000,
    ip: '(220.200.15.132)' },
  { name: 'liuchen',
    terminal: 'pts/0',
    time: 1527648840000,
    ip: '(220.250.27.220)' },
  { name: 'liuchen',
    terminal: 'pts/1',
    time: 1527650820000,
    ip: '(220.250.27.220)' }]

    data = data.map(item => echarts.format.formatTime('yyyy-MM-dd', item.time))
    data = data.reduce((result, item) => {
        const newItem = [item, 1]
        if(result.length === 0) {
            result.push(newItem)
            return result
        }
        const last = result[result.length - 1]
        if(last[0] === item){
            last[1] += 1
            return result
        } else {
            result.push(newItem)
            return result
        }
    }, [])
  return data;
}

const option = {
  title: {
      top: 30,
      left: 'center',
      text: '某人的ssh信息'
  },
  tooltip : {},
  visualMap: {
      min: 0,
      max: 4,
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
      range: '2018',
      itemStyle: {
          normal: {borderWidth: 0.5}
      },
      yearLabel: {show: false}
  },
  series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtulData(2016)
  }
};



export function getOptions() {
  return option
}