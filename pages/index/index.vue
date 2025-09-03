// 活动列表
<template>
  <view class="container">
    <view
      class="card"
      v-for="item in activities"
      :key="item.id"
      @click="goDetail(item.id)"
    >
      <view class="title">{{ item.title }}</view>
      <view class="info">时间：{{ item.time }}</view>
      <view class="info">地点：{{ item.location }}</view>
      <view class="info">剩余名额：{{ item.remaining }}</view>
      <view class="info">描述：{{ item.description }}</view>
    </view>
    <view v-if="activities.length === 0">暂无活动</view>
  </view>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useActivityStore } from '@/store/activity.js'

const store = useActivityStore()
const activities = computed(() => store.activities)

onMounted(() => {
  console.log('onMounted: fetchActivities')
  store.fetchActivities().then(() => {
    console.log('activities:', store.activities)
  })
})

const goDetail = (id) => {
  console.log('goDetail:', id)
  uni.navigateTo({
    url: `/pages/detail/detail?id=${id}`
  })
}
</script>

<style>
.container {
  padding: 16px;
}
.card {
  background: #fff;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
}
.info {
  font-size: 14px;
  margin: 2px 0;
}
</style>
