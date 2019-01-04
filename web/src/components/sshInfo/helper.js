const echarts = require('echarts')

function getVirtulData(data) {
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

export function getOptions(data) {

const option = {
    title: {
        top: 30,
        left: 'center',
        text: 'liuchen的ssh信息'
    },
    tooltip : {},
    visualMap: {
        min: 0,
        max: 5,
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
        data: getVirtulData(data)
    }
  };
  return option
}