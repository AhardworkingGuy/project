"use strict";
const common_vendor = require("../common/vendor.js");
function getActivities() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "校园歌唱大赛",
          time: "2025-09-05 18:00",
          location: "礼堂",
          remaining: 30,
          description: "展示你的歌喉",
          signedUp: false
        },
        {
          id: 2,
          title: "篮球比赛",
          time: "2025-09-10 15:00",
          location: "体育馆",
          remaining: 20,
          description: "快来一起打球吧！",
          signedUp: false
        }
      ]);
    }, 300);
  });
}
const useActivityStore = common_vendor.defineStore("activity", {
  state: () => ({
    activities: [],
    signUpLogs: []
  }),
  actions: {
    async fetchActivities() {
      const cache = common_vendor.index.getStorageSync("activities");
      if (cache) {
        this.activities = cache;
      } else {
        const data = await getActivities();
        this.activities = data;
        common_vendor.index.setStorageSync("activities", data);
      }
    },
    getActivityById(id) {
      return this.activities.find((a) => a.id == id) || {};
    },
    signUp(id, form) {
      const activity = this.activities.find((a) => a.id == id);
      if (activity && !activity.signedUp) {
        activity.signedUp = true;
        activity.remaining -= 1;
        common_vendor.index.setStorageSync("activities", this.activities);
        const signUpTime2 = (/* @__PURE__ */ new Date()).toLocaleString();
        this.signUpLogs.push({
          activityId: id,
          activityTitle: activity.title,
          signUpTime: signUpTime2,
          name: form.name,
          studentId: form.studentId,
          phone: form.phone
        });
        common_vendor.index.setStorageSync("signUpLogs", this.signUpLogs);
        common_vendor.index.__f__("log", "at store/activity.js:69", `[报名表提交日志] 活动ID: ${id}, 活动名称: ${activity.title}, 提交时间: ${signUpTime2}, 姓名: ${form.name}, 学号: ${form.studentId}, 手机号: ${form.phone}`);
      } else {
        common_vendor.index.__f__("log", "at store/activity.js:71", `[报名表提交日志] 活动ID: ${id}, 活动名称: ${activity.title}, 提交时间: ${signUpTime}, 报名失败: 已经报名或名额已满`);
      }
    }
  }
});
exports.useActivityStore = useActivityStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/activity.js.map
