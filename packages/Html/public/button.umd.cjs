(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("ant-design-vue")) : typeof define === "function" && define.amd ? define(["exports", "vue", "ant-design-vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.Button = {}, global.Vue, global.antd));
})(this, function(exports2, vue, antDesignVue) {
  "use strict";
  const _sfc_main = {
    __name: "Button",
    props: ["value"],
    setup(__props) {
      vue.defineComponent({ name: "Button" });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.unref(antDesignVue.Button), null, {
          default: vue.withCtx(() => [
            vue.createTextVNode(vue.toDisplayString(__props.value), 1)
          ]),
          _: 1
        });
      };
    }
  };
  const basicProps = {
    component: "Button",
    label: "\u6309\u94AE",
    propValue: "\u6309\u94AE\u6309\u94AE",
    style: {
      width: "100px",
      height: "100px"
    },
    attr: {
      type: "primary"
    }
  };
  const attrProps = {
    width: "\u5BBD\u5EA6",
    height: "\u9AD8\u5EA6"
  };
  const eventProps = [
    {
      key: "redirect",
      label: "\u8DF3\u8F6C\u4E8B\u4EF6",
      event: (url) => window.open(url)
    },
    {
      key: "alert",
      label: "alert\u4E8B\u4EF6",
      event: (str) => alert(str)
    }
  ];
  const linkageEvent = [
    {
      key: "click",
      label: "\u70B9\u51FB"
    }
  ];
  const linkageEventProp = [
    {
      key: "width",
      label: "\u5BBD\u5EA6",
      event: (comp, width) => comp.style.width = width + "px"
    }
  ];
  const config = {
    name: "Button",
    basicProps,
    attrProps,
    eventProps,
    linkageEvent,
    linkageEventProp
  };
  const main = { component: _sfc_main, config };
  exports2.Button = _sfc_main;
  exports2.config = config;
  exports2.default = main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
