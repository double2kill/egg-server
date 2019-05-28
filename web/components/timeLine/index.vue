<template>
  <div class="timeline">
    <div class="radio">
      排序：
      <el-radio-group v-model="reverse">
        <el-radio :label="true">
          倒序
        </el-radio>
        <el-radio :label="false">
          正序
        </el-radio>
      </el-radio-group>
    </div>

    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp"
        placement="top"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reverse: true,
      activities: [{
        content: '确定金鸡亭的房子，交5万定金',
        timestamp: '2019-4-19',
        size: 'large',
        icon: 'el-icon-check',
        color: '#0bbd87'
      }, {
        content: '交完全部定金',
        timestamp: '2019-4-23',
        size: 'large',
        icon: 'el-icon-check',
        color: '#0bbd87'
      }, {
        content: '交中介费1万',
        timestamp: '2019-4-23',
        size: 'large',
        icon: 'el-icon-check',
        color: '#0bbd87'
      }, {
        content: '去装修卖场确定装修方案',
        timestamp: '2019-5-4',
        size: 'large',
        icon: 'el-icon-check',
        color: '#0bbd87'
      }, {
        content: '和房东过户，交税费2.5%',
        timestamp: '2019-5-13',
        size: 'large',
        icon: 'el-icon-check',
        color: '#0bbd87'
      }, {
        content: '拆旧橱柜，门，沙发',
        timestamp: '2019-5-17',
        size: 'large',
        icon: 'el-icon-check',
        color: '#0bbd87'
      }, {
        content: '清洗空调，冰箱',
        timestamp: '2019-5-18',
        size: 'large',
        icon: 'el-icon-check',
        color: '#0bbd87'
      }, {
        content: '过水电',
        timestamp: '2019-5-20',
        size: 'large',
        icon: 'el-icon-question',
        color: '#0bbd87'
      }, {
        content: '装吊顶，清洗窗户',
        timestamp: '2019-5-26',
        size: 'large',
        icon: 'el-icon-check',
        color: '#0bbd87'
      }, {
        content: '装门,换锁',
        timestamp: '2019-5-28',
        size: 'large',
        icon: 'el-icon-check',
        color: '#0bbd87'
      }, {
        content: '刷墙',
        timestamp: '2019-5-30',
        size: 'large',
        icon: 'el-icon-question',
        color: '#0bbd87'
      }, {
        content: '装橱柜',
        size: 'large',
        icon: 'el-icon-question',
        color: '#0bbd87'
      }, {
        content: '装灯',
        size: 'large',
        icon: 'el-icon-question',
        color: '#0bbd87'
      }, {
        content: '换新床垫',
        size: 'large',
        icon: 'el-icon-question',
        color: '#0bbd87'
      }, {
        content: '交完首付',
        timestamp: '2019-5-25',
        size: 'large',
        icon: 'el-icon-more',
        color: '#E6A23C'
      }, {
        content: '所有手续完成',
        timestamp: '2019-6-15'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timeline {
  max-width: 400px;
  margin: 0 auto;
}
.radio {
  line-height: 60px;
  height: 60px;
}
</style>
