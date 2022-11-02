(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.Button = {}));
})(this, function(exports2) {
  "use strict";
  const _toDisplayString = window["Vue"].toDisplayString;
  const _createTextVNode = window["Vue"].createTextVNode;
  const _unref = window["Vue"].unref;
  const _withCtx = window["Vue"].withCtx;
  const _openBlock = window["Vue"].openBlock;
  const _createBlock = window["Vue"].createBlock;
  const defineComponent = window["Vue"].defineComponent;
  const Button = window["antd"].Button;
  const _sfc_main = {
    __name: "Button",
    props: ["value"],
    setup(__props) {
      defineComponent({ name: "Button" });
      return (_ctx, _cache) => {
        return _openBlock(), _createBlock(_unref(Button), null, {
          default: _withCtx(() => [
            _createTextVNode(_toDisplayString(__props.value), 1)
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
