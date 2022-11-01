const basicProps = {
  component: "Image",
  label: "图片",
  propValue:
    "https://xesfile.xesimg.com/app/happyexplore/2022/09/06/2450410_1662451249922_happyExplpre.jpg",
  style: {
    width: "100px",
    height: "100px",
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
  name: "Image",
  basicProps,
  attrProps,
  eventProps,
  linkageEvent,
  linkageEventProp,
};
