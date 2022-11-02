import { defineComponent as n, openBlock as o, createElementBlock as a } from "vue";
const p = ["src"], l = {
  __name: "Image",
  props: ["value"],
  setup(e) {
    const t = e;
    return n({ name: "Image" }), (h, _) => (o(), a("img", {
      src: t.value
    }, null, 8, p));
  }
}, s = {
  component: "Image",
  label: "\u56FE\u7247",
  propValue: "https://xesfile.xesimg.com/app/happyexplore/2022/09/06/2450410_1662451249922_happyExplpre.jpg",
  style: {
    width: "100px",
    height: "100px"
  }
}, c = {
  width: "\u5BBD\u5EA6",
  height: "\u9AD8\u5EA6"
}, r = [
  {
    key: "redirect",
    label: "\u8DF3\u8F6C\u4E8B\u4EF6",
    event: (e) => window.open(e)
  },
  {
    key: "alert",
    label: "alert\u4E8B\u4EF6",
    event: (e) => alert(e)
  }
], i = [
  {
    key: "click",
    label: "\u70B9\u51FB"
  }
], m = [
  {
    key: "width",
    label: "\u5BBD\u5EA6",
    event: (e, t) => e.style.width = t + "px"
  }
], g = {
  name: "Image",
  basicProps: s,
  attrProps: c,
  eventProps: r,
  linkageEvent: i,
  linkageEventProp: m
}, k = { component: l, config: g };
export {
  l as Image,
  g as config,
  k as default
};
