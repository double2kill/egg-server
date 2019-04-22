<template>
  <div class="timeline">
    <div class="radio">
      排序：
      <el-radio-group v-model="reverse">
        <el-radio :label="true">倒序</el-radio>
        <el-radio :label="false">正序</el-radio>
      </el-radio-group>
    </div>

    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in activities2"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp">
        {{activity.content}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        reverse: true,
        activities2: [{
          content: '确定金鸡亭的房子，交5万定金',
          timestamp: '2019-4-19',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '交完全部定金',
          timestamp: '2019-4-23',
          color: '#0bbd87'
        }, {
          content: '交完首付',
          timestamp: '2018-05-25',
          size: 'large'
        }, {
          content: '所有手续完成',
          timestamp: '2018-06-15'
        }]
      };
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timeline {
  max-width: 400px;
  margin: 0 auto;
}
.radio {
  line-height: 40px;
  height: 40px;
}
</style>
