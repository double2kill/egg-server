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
import { SPAIR_NAMESPACE } from '~/constants'
import SpairService from '~/utils/SpairService'
const timeLineService = new SpairService(SPAIR_NAMESPACE.timeLine)

export default {
  data() {
    return {
      reverse: true,
      activities: []
    }
  },
  async mounted() {
    this.activities = await timeLineService.get('1')
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
