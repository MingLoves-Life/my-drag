const basicProps = {
  component: "Button",
  label: "按钮",
  propValue: "按钮按钮",
  style: {
    width: "100px",
    height: "100px",
  },
  attr: {
    type: "primary",
  },
};

const attrProps = {
  width: "宽度",
  height: "高度",
};

const eventProps = [
  {
    key: "redirect",
    label: "跳转事件",
    event: (url) => window.open(url),
  },
  {
    key: "alert",
    label: "alert事件",
    event: (str) => alert(str),
  },
];

const linkageEvent = [
  {
    key: "click",
    label: "点击",
  },
];

const linkageEventProp = [
  {
    key: "width",
    label: "宽度",
    event: (comp, width) => (comp.style.width = width + "px"),
  },
];

export default {
  name: "Button",
  basicProps,
  attrProps,
  eventProps,
  linkageEvent,
  linkageEventProp,
};
