"use strict";
const common_vendor = require("../common/vendor.js");
const store_activity = require("../store/activity.js");
const _sfc_main = {
  __name: "SignupForm",
  props: {
    activityId: Number
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const store = store_activity.useActivityStore();
    const form = common_vendor.reactive({
      name: "",
      studentId: "",
      phone: ""
    });
    const submit = () => {
      if (!form.name || !form.studentId || !form.phone) {
        return common_vendor.index.showToast({ title: "请填写完整信息", icon: "none" });
      }
      store.signUp(props.activityId, form);
      common_vendor.index.showToast({ title: "报名成功", icon: "success" });
      emit("close");
    };
    return (_ctx, _cache) => {
      return {
        a: form.name,
        b: common_vendor.o(($event) => form.name = $event.detail.value),
        c: form.studentId,
        d: common_vendor.o(($event) => form.studentId = $event.detail.value),
        e: form.phone,
        f: common_vendor.o(($event) => form.phone = $event.detail.value),
        g: common_vendor.o(($event) => _ctx.$emit("close")),
        h: common_vendor.o(submit)
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/SignupForm.js.map
