"use strict";
const common_vendor = require("../../common/vendor.js");
const store_activity = require("../../store/activity.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = store_activity.useActivityStore();
    const activities = common_vendor.computed(() => store.activities);
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:28", "onMounted: fetchActivities");
      store.fetchActivities().then(() => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:30", "activities:", store.activities);
      });
    });
    const goDetail = (id) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:35", "goDetail:", id);
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(activities.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.time),
            c: common_vendor.t(item.location),
            d: common_vendor.t(item.remaining),
            e: common_vendor.t(item.description),
            f: item.id,
            g: common_vendor.o(($event) => goDetail(item.id), item.id)
          };
        }),
        b: activities.value.length === 0
      }, activities.value.length === 0 ? {} : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
