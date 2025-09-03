<template>
  <view class="popup">
    <view class="form">
      <view class="field">
        <text>姓名</text>
        <input v-model="form.name" placeholder="请输入姓名" />
      </view>
      <view class="field">
        <text>学号</text>
        <input v-model="form.studentId" placeholder="请输入学号" />
      </view>
      <view class="field">
        <text>手机号</text>
        <input v-model="form.phone" type="number" placeholder="请输入手机号" />
      </view>
      <view class="btns">
        <button type="default" @click="$emit('close')">取消</button>
        <button type="primary" @click="submit">提交</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue'
import { useActivityStore } from '@/store/activity.js'

const props = defineProps({
  activityId: Number
})
const emit = defineEmits(['close'])
const store = useActivityStore()

const form = reactive({
  name: '',
  studentId: '',
  phone: ''
})

const submit = () => {
  if (!form.name || !form.studentId || !form.phone) {
    return uni.showToast({ title: '请填写完整信息', icon: 'none' })
  }
  store.signUp(props.activityId, form)
  uni.showToast({ title: '报名成功', icon: 'success' })
  emit('close')
}
</script>

<style>
.popup {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 16px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
}
.field {
  margin-bottom: 12px;
}
.field text {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
}
input {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 6px 8px;
}
.btns {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
</style>
