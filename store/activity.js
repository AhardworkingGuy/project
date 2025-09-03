import { defineStore } from 'pinia'

// 模拟 API
function getActivities() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: '校园歌唱大赛',
          time: '2025-09-05 18:00',
          location: '礼堂',
          remaining: 30,
          description: '展示你的歌喉',
          signedUp: false
        },
        {
          id: 2,
          title: '篮球比赛',
          time: '2025-09-10 15:00',
          location: '体育馆',
          remaining: 20,
          description: '快来一起打球吧！',
          signedUp: false
        }
      ])
    }, 300)
  })
}

// 本地存储
export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: [],
    signUpLogs: []
  }),
  actions: {
    async fetchActivities() {
      const cache = uni.getStorageSync('activities')
      if (cache) {
        this.activities = cache
      } else {
        const data = await getActivities()
        this.activities = data
        uni.setStorageSync('activities', data)
      }
    },
    getActivityById(id) {
      return this.activities.find(a => a.id == id) || {}
    },
    signUp(id, form) {
      const activity = this.activities.find(a => a.id == id)
      if (activity && !activity.signedUp) {
        activity.signedUp = true
        activity.remaining -= 1
        uni.setStorageSync('activities', this.activities)

        const signUpTime = new Date().toLocaleString()
        this.signUpLogs.push({
          activityId: id,
          activityTitle: activity.title,
          signUpTime: signUpTime,
          name: form.name,
          studentId: form.studentId,
          phone: form.phone
        })
        uni.setStorageSync('signUpLogs', this.signUpLogs)

        console.log(`[报名表提交日志] 活动ID: ${id}, 活动名称: ${activity.title}, 提交时间: ${signUpTime}, 姓名: ${form.name}, 学号: ${form.studentId}, 手机号: ${form.phone}`)
      } else {
        console.log(`[报名表提交日志] 活动ID: ${id}, 活动名称: ${activity.title}, 提交时间: ${signUpTime}, 报名失败: 已经报名或名额已满`)
      }
    }
  }
})
