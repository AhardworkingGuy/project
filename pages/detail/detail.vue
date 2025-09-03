// 活动详细信息及报名
<template>
  <view class="container">
    <view class="title">{{ activity.title }}</view>
    <view class="info">时间：{{ activity.time }}</view>
    <view class="info">地点：{{ activity.location }}</view>
    <view class="info">剩余名额：{{ activity.remaining }}</view>
    <view class="desc">描述：{{ activity.description }}</view>

    <button
      type="primary"
      :disabled="activity.signedUp"
      @click="showForm = true"
      style="margin-top:20px;"
    >
      {{ activity.signedUp ? '已报名' : '立即报名' }}
    </button>

    <SignupForm v-if="showForm" :activity-id="activity.id" @close="showForm=false" />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useActivityStore } from '@/store/activity.js'
import SignupForm from '@/components/SignupForm.vue'

const store = useActivityStore()
const activity = ref({})
const showForm = ref(false)

onMounted(() => {
  const pages = getCurrentPages()
  const { id } = pages[pages.length - 1].options
  activity.value = store.getActivityById(id)
})
</script>

<style>
.container {
  padding: 16px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
}
.info {
  margin: 4px 0;
}
.desc {
  margin-top: 10px;
  color: #666;
}
</style>
