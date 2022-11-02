import { defineComponent as _, openBlock as u, createElementBlock as v, Fragment as c, renderList as n, normalizeClass as b, normalizeStyle as y, createBlock as L, resolveDynamicComponent as w, mergeProps as x, createCommentVNode as E } from "vue";
const P = ["index"], j = {
  __name: "preview",
  props: ["components", "eventList", "importComponent"],
  setup(d) {
    const i = d;
    _({ name: "Preview" }), console.log({ ...i });
    const g = (e) => {
      var r, s;
      if (console.log(e, i.eventList), e != null && e.event) {
        const t = Object.keys(e == null ? void 0 : e.event);
        (t == null ? void 0 : t.length) > 0 && t.forEach((l) => {
          if (e != null && e.event[l]) {
            const { eventProps: k } = i.eventList.find(
              (a) => a.name === e.component
            );
            k.find((a) => a.key === l).event(e == null ? void 0 : e.event[l]);
          }
        });
      }
      (r = e == null ? void 0 : e.linkage) != null && r.eventType && ((s = e == null ? void 0 : e.linkage) == null || s.event());
    }, f = ["width", "height"], h = (e) => {
      const r = {};
      return Object.keys(e).forEach((s) => {
        f.includes(s) && (r[s] = e[s]);
      }), r;
    }, C = (e) => {
      const r = {};
      return Object.keys(e).forEach((s) => {
        f.includes(s) || (s === "top" && (r[s] = Number(e[s].slice(0, -2)) + 55 + "px"), r[s] = e[s]);
      }), r;
    };
    return (e, r) => i.components.length > 0 ? (u(!0), v(c, { key: 0 }, n(i.components, (s, t) => (u(), v("div", {
      key: s.label,
      class: b(s.propValue + t),
      index: t,
      style: y({
        ...C(s.style),
        position: "absolute",
        transition: "none",
        zIndex: t
      })
    }, [
      (u(), L(w(s.component), x({
        value: s.propValue
      }, { ...s.attr }, {
        style: { ...h(s.style) },
        onClick: () => g(s)
      }), null, 16, ["value", "style", "onClick"]))
    ], 14, P))), 128)) : E("", !0);
  }
}, B = { component: j };
export {
  j as Preview,
  B as default
};
