"use strict";
const common_vendor = require("../../common/vendor.js");
const store_activity = require("../../store/activity.js");
if (!Math) {
  SignupForm();
}
const SignupForm = () => "../../components/SignupForm.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const store = store_activity.useActivityStore();
    const activity = common_vendor.ref({});
    const showForm = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const { id } = pages[pages.length - 1].options;
      activity.value = store.getActivityById(id);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(activity.value.title),
        b: common_vendor.t(activity.value.time),
        c: common_vendor.t(activity.value.location),
        d: common_vendor.t(activity.value.remaining),
        e: common_vendor.t(activity.value.description),
        f: common_vendor.t(activity.value.signedUp ? "已报名" : "立即报名"),
        g: activity.value.signedUp,
        h: common_vendor.o(($event) => showForm.value = true),
        i: showForm.value
      }, showForm.value ? {
        j: common_vendor.o(($event) => showForm.value = false),
        k: common_vendor.p({
          ["activity-id"]: activity.value.id
        })
      } : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/detail.js.map
