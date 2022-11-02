function dn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let o = 0; o < r.length; o++)
    n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const Mc = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", jc = /* @__PURE__ */ dn(Mc);
function ys(e) {
  return !!e || e === "";
}
function Qo(e) {
  if (G(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = he(r) ? Fc(r) : Qo(r);
      if (o)
        for (const i in o)
          t[i] = o[i];
    }
    return t;
  } else {
    if (he(e))
      return e;
    if (ae(e))
      return e;
  }
}
const Vc = /;(?![^(]*\))/g, kc = /:(.+)/;
function Fc(e) {
  const t = {};
  return e.split(Vc).forEach((n) => {
    if (n) {
      const r = n.split(kc);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Xo(e) {
  let t = "";
  if (he(e))
    t = e;
  else if (G(e))
    for (let n = 0; n < e.length; n++) {
      const r = Xo(e[n]);
      r && (t += r + " ");
    }
  else if (ae(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Lc = (e) => he(e) ? e : e == null ? "" : G(e) || ae(e) && (e.toString === Os || !Z(e.toString)) ? JSON.stringify(e, bs, 2) : String(e), bs = (e, t) => t && t.__v_isRef ? bs(e, t.value) : Mt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, o]) => (n[`${r} =>`] = o, n), {})
} : Es(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : ae(t) && !G(t) && !Cs(t) ? String(t) : t, ie = {}.NODE_ENV !== "production" ? Object.freeze({}) : {}, tn = {}.NODE_ENV !== "production" ? Object.freeze([]) : [], be = () => {
}, _s = () => !1, Rc = /^on[^a-z]/, Kn = (e) => Rc.test(e), br = (e) => e.startsWith("onUpdate:"), de = Object.assign, ei = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Hc = Object.prototype.hasOwnProperty, X = (e, t) => Hc.call(e, t), G = Array.isArray, Mt = (e) => Ar(e) === "[object Map]", Es = (e) => Ar(e) === "[object Set]", Z = (e) => typeof e == "function", he = (e) => typeof e == "string", ti = (e) => typeof e == "symbol", ae = (e) => e !== null && typeof e == "object", ni = (e) => ae(e) && Z(e.then) && Z(e.catch), Os = Object.prototype.toString, Ar = (e) => Os.call(e), ri = (e) => Ar(e).slice(8, -1), Cs = (e) => Ar(e) === "[object Object]", oi = (e) => he(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ur = /* @__PURE__ */ dn(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Bc = /* @__PURE__ */ dn("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"), Dr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Uc = /-(\w)/g, an = Dr((e) => e.replace(Uc, (t, n) => n ? n.toUpperCase() : "")), zc = /\B([A-Z])/g, Ot = Dr((e) => e.replace(zc, "-$1").toLowerCase()), $r = Dr((e) => e.charAt(0).toUpperCase() + e.slice(1)), St = Dr((e) => e ? `on${$r(e)}` : ""), Mn = (e, t) => !Object.is(e, t), bn = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, _r = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Ns = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Hi;
const ws = () => Hi || (Hi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function go(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Ge;
class Wc {
  constructor(t = !1) {
    this.detached = t, this.active = !0, this.effects = [], this.cleanups = [], this.parent = Ge, !t && Ge && (this.index = (Ge.scopes || (Ge.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = Ge;
      try {
        return Ge = this, t();
      } finally {
        Ge = n;
      }
    } else
      ({}).NODE_ENV !== "production" && go("cannot run an inactive effect scope.");
  }
  on() {
    Ge = this;
  }
  off() {
    Ge = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0, this.active = !1;
    }
  }
}
function Kc(e, t = Ge) {
  t && t.active && t.effects.push(e);
}
const jn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, xs = (e) => (e.w & Ct) > 0, Ts = (e) => (e.n & Ct) > 0, qc = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Ct;
}, Yc = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let r = 0; r < t.length; r++) {
      const o = t[r];
      xs(o) && !Ts(o) ? o.delete(e) : t[n++] = o, o.w &= ~Ct, o.n &= ~Ct;
    }
    t.length = n;
  }
}, mo = /* @__PURE__ */ new WeakMap();
let Nn = 0, Ct = 1;
const vo = 30;
let xe;
const jt = Symbol({}.NODE_ENV !== "production" ? "iterate" : ""), yo = Symbol({}.NODE_ENV !== "production" ? "Map key iterate" : "");
class ii {
  constructor(t, n = null, r) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Kc(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = xe, n = bt;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = xe, xe = this, bt = !0, Ct = 1 << ++Nn, Nn <= vo ? qc(this) : Bi(this), this.fn();
    } finally {
      Nn <= vo && Yc(this), Ct = 1 << --Nn, xe = this.parent, bt = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    xe === this ? this.deferStop = !0 : this.active && (Bi(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Bi(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let bt = !0;
const Ss = [];
function Ht() {
  Ss.push(bt), bt = !1;
}
function Bt() {
  const e = Ss.pop();
  bt = e === void 0 ? !0 : e;
}
function De(e, t, n) {
  if (bt && xe) {
    let r = mo.get(e);
    r || mo.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || r.set(n, o = jn());
    const i = {}.NODE_ENV !== "production" ? { effect: xe, target: e, type: t, key: n } : void 0;
    bo(o, i);
  }
}
function bo(e, t) {
  let n = !1;
  Nn <= vo ? Ts(e) || (e.n |= Ct, n = !xs(e)) : n = !e.has(xe), n && (e.add(xe), xe.deps.push(e), {}.NODE_ENV !== "production" && xe.onTrack && xe.onTrack(Object.assign({ effect: xe }, t)));
}
function ct(e, t, n, r, o, i) {
  const a = mo.get(e);
  if (!a)
    return;
  let s = [];
  if (t === "clear")
    s = [...a.values()];
  else if (n === "length" && G(e))
    a.forEach((u, f) => {
      (f === "length" || f >= r) && s.push(u);
    });
  else
    switch (n !== void 0 && s.push(a.get(n)), t) {
      case "add":
        G(e) ? oi(n) && s.push(a.get("length")) : (s.push(a.get(jt)), Mt(e) && s.push(a.get(yo)));
        break;
      case "delete":
        G(e) || (s.push(a.get(jt)), Mt(e) && s.push(a.get(yo)));
        break;
      case "set":
        Mt(e) && s.push(a.get(jt));
        break;
    }
  const l = {}.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: r, oldValue: o, oldTarget: i } : void 0;
  if (s.length === 1)
    s[0] && ({}.NODE_ENV !== "production" ? Zt(s[0], l) : Zt(s[0]));
  else {
    const u = [];
    for (const f of s)
      f && u.push(...f);
    ({}).NODE_ENV !== "production" ? Zt(jn(u), l) : Zt(jn(u));
  }
}
function Zt(e, t) {
  const n = G(e) ? e : [...e];
  for (const r of n)
    r.computed && Ui(r, t);
  for (const r of n)
    r.computed || Ui(r, t);
}
function Ui(e, t) {
  (e !== xe || e.allowRecurse) && ({}.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(de({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const Gc = /* @__PURE__ */ dn("__proto__,__v_isRef,__isVue"), Ps = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ti)
), Jc = /* @__PURE__ */ Ir(), Zc = /* @__PURE__ */ Ir(!1, !0), Qc = /* @__PURE__ */ Ir(!0), Xc = /* @__PURE__ */ Ir(!0, !0), zi = /* @__PURE__ */ eu();
function eu() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = Q(this);
      for (let i = 0, a = this.length; i < a; i++)
        De(r, "get", i + "");
      const o = r[t](...n);
      return o === -1 || o === !1 ? r[t](...n.map(Q)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Ht();
      const r = Q(this)[t].apply(this, n);
      return Bt(), r;
    };
  }), e;
}
function Ir(e = !1, t = !1) {
  return function(r, o, i) {
    if (o === "__v_isReactive")
      return !e;
    if (o === "__v_isReadonly")
      return e;
    if (o === "__v_isShallow")
      return t;
    if (o === "__v_raw" && i === (e ? t ? ks : Vs : t ? js : Ms).get(r))
      return r;
    const a = G(r);
    if (!e && a && X(zi, o))
      return Reflect.get(zi, o, i);
    const s = Reflect.get(r, o, i);
    return (ti(o) ? Ps.has(o) : Gc(o)) || (e || De(r, "get", o), t) ? s : ye(s) ? a && oi(o) ? s : s.value : ae(s) ? e ? Fs(s) : nt(s) : s;
  };
}
const tu = /* @__PURE__ */ As(), nu = /* @__PURE__ */ As(!0);
function As(e = !1) {
  return function(n, r, o, i) {
    let a = n[r];
    if (Nt(a) && ye(a) && !ye(o))
      return !1;
    if (!e && (!Er(o) && !Nt(o) && (a = Q(a), o = Q(o)), !G(n) && ye(a) && !ye(o)))
      return a.value = o, !0;
    const s = G(n) && oi(r) ? Number(r) < n.length : X(n, r), l = Reflect.set(n, r, o, i);
    return n === Q(i) && (s ? Mn(o, a) && ct(n, "set", r, o, a) : ct(n, "add", r, o)), l;
  };
}
function ru(e, t) {
  const n = X(e, t), r = e[t], o = Reflect.deleteProperty(e, t);
  return o && n && ct(e, "delete", t, void 0, r), o;
}
function ou(e, t) {
  const n = Reflect.has(e, t);
  return (!ti(t) || !Ps.has(t)) && De(e, "has", t), n;
}
function iu(e) {
  return De(e, "iterate", G(e) ? "length" : jt), Reflect.ownKeys(e);
}
const Ds = {
  get: Jc,
  set: tu,
  deleteProperty: ru,
  has: ou,
  ownKeys: iu
}, $s = {
  get: Qc,
  set(e, t) {
    return {}.NODE_ENV !== "production" && go(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return {}.NODE_ENV !== "production" && go(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, au = /* @__PURE__ */ de({}, Ds, {
  get: Zc,
  set: nu
}), su = /* @__PURE__ */ de({}, $s, {
  get: Xc
}), ai = (e) => e, Mr = (e) => Reflect.getPrototypeOf(e);
function Qn(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = Q(e), i = Q(t);
  n || (t !== i && De(o, "get", t), De(o, "get", i));
  const { has: a } = Mr(o), s = r ? ai : n ? si : Vn;
  if (a.call(o, t))
    return s(e.get(t));
  if (a.call(o, i))
    return s(e.get(i));
  e !== o && e.get(t);
}
function Xn(e, t = !1) {
  const n = this.__v_raw, r = Q(n), o = Q(e);
  return t || (e !== o && De(r, "has", e), De(r, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function er(e, t = !1) {
  return e = e.__v_raw, !t && De(Q(e), "iterate", jt), Reflect.get(e, "size", e);
}
function Wi(e) {
  e = Q(e);
  const t = Q(this);
  return Mr(t).has.call(t, e) || (t.add(e), ct(t, "add", e, e)), this;
}
function Ki(e, t) {
  t = Q(t);
  const n = Q(this), { has: r, get: o } = Mr(n);
  let i = r.call(n, e);
  i ? {}.NODE_ENV !== "production" && Is(n, r, e) : (e = Q(e), i = r.call(n, e));
  const a = o.call(n, e);
  return n.set(e, t), i ? Mn(t, a) && ct(n, "set", e, t, a) : ct(n, "add", e, t), this;
}
function qi(e) {
  const t = Q(this), { has: n, get: r } = Mr(t);
  let o = n.call(t, e);
  o ? {}.NODE_ENV !== "production" && Is(t, n, e) : (e = Q(e), o = n.call(t, e));
  const i = r ? r.call(t, e) : void 0, a = t.delete(e);
  return o && ct(t, "delete", e, void 0, i), a;
}
function Yi() {
  const e = Q(this), t = e.size !== 0, n = {}.NODE_ENV !== "production" ? Mt(e) ? new Map(e) : new Set(e) : void 0, r = e.clear();
  return t && ct(e, "clear", void 0, void 0, n), r;
}
function tr(e, t) {
  return function(r, o) {
    const i = this, a = i.__v_raw, s = Q(a), l = t ? ai : e ? si : Vn;
    return !e && De(s, "iterate", jt), a.forEach((u, f) => r.call(o, l(u), l(f), i));
  };
}
function nr(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, i = Q(o), a = Mt(i), s = e === "entries" || e === Symbol.iterator && a, l = e === "keys" && a, u = o[e](...r), f = n ? ai : t ? si : Vn;
    return !t && De(i, "iterate", l ? yo : jt), {
      next() {
        const { value: c, done: p } = u.next();
        return p ? { value: c, done: p } : {
          value: s ? [f(c[0]), f(c[1])] : f(c),
          done: p
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function ft(e) {
  return function(...t) {
    if ({}.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${$r(e)} operation ${n}failed: target is readonly.`, Q(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function lu() {
  const e = {
    get(i) {
      return Qn(this, i);
    },
    get size() {
      return er(this);
    },
    has: Xn,
    add: Wi,
    set: Ki,
    delete: qi,
    clear: Yi,
    forEach: tr(!1, !1)
  }, t = {
    get(i) {
      return Qn(this, i, !1, !0);
    },
    get size() {
      return er(this);
    },
    has: Xn,
    add: Wi,
    set: Ki,
    delete: qi,
    clear: Yi,
    forEach: tr(!1, !0)
  }, n = {
    get(i) {
      return Qn(this, i, !0);
    },
    get size() {
      return er(this, !0);
    },
    has(i) {
      return Xn.call(this, i, !0);
    },
    add: ft("add"),
    set: ft("set"),
    delete: ft("delete"),
    clear: ft("clear"),
    forEach: tr(!0, !1)
  }, r = {
    get(i) {
      return Qn(this, i, !0, !0);
    },
    get size() {
      return er(this, !0);
    },
    has(i) {
      return Xn.call(this, i, !0);
    },
    add: ft("add"),
    set: ft("set"),
    delete: ft("delete"),
    clear: ft("clear"),
    forEach: tr(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    e[i] = nr(i, !1, !1), n[i] = nr(i, !0, !1), t[i] = nr(i, !1, !0), r[i] = nr(i, !0, !0);
  }), [
    e,
    n,
    t,
    r
  ];
}
const [cu, uu, fu, du] = /* @__PURE__ */ lu();
function jr(e, t) {
  const n = t ? e ? du : fu : e ? uu : cu;
  return (r, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(X(n, o) && o in r ? n : r, o, i);
}
const pu = {
  get: /* @__PURE__ */ jr(!1, !1)
}, hu = {
  get: /* @__PURE__ */ jr(!1, !0)
}, gu = {
  get: /* @__PURE__ */ jr(!0, !1)
}, mu = {
  get: /* @__PURE__ */ jr(!0, !0)
};
function Is(e, t, n) {
  const r = Q(n);
  if (r !== n && t.call(e, r)) {
    const o = ri(e);
    console.warn(`Reactive ${o} contains both the raw and reactive versions of the same object${o === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const Ms = /* @__PURE__ */ new WeakMap(), js = /* @__PURE__ */ new WeakMap(), Vs = /* @__PURE__ */ new WeakMap(), ks = /* @__PURE__ */ new WeakMap();
function vu(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function yu(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : vu(ri(e));
}
function nt(e) {
  return Nt(e) ? e : Vr(e, !1, Ds, pu, Ms);
}
function bu(e) {
  return Vr(e, !1, au, hu, js);
}
function Fs(e) {
  return Vr(e, !0, $s, gu, Vs);
}
function Qt(e) {
  return Vr(e, !0, su, mu, ks);
}
function Vr(e, t, n, r, o) {
  if (!ae(e))
    return {}.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = o.get(e);
  if (i)
    return i;
  const a = yu(e);
  if (a === 0)
    return e;
  const s = new Proxy(e, a === 2 ? r : n);
  return o.set(e, s), s;
}
function Vt(e) {
  return Nt(e) ? Vt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Nt(e) {
  return !!(e && e.__v_isReadonly);
}
function Er(e) {
  return !!(e && e.__v_isShallow);
}
function _o(e) {
  return Vt(e) || Nt(e);
}
function Q(e) {
  const t = e && e.__v_raw;
  return t ? Q(t) : e;
}
function Ls(e) {
  return _r(e, "__v_skip", !0), e;
}
const Vn = (e) => ae(e) ? nt(e) : e, si = (e) => ae(e) ? Fs(e) : e;
function Rs(e) {
  bt && xe && (e = Q(e), {}.NODE_ENV !== "production" ? bo(e.dep || (e.dep = jn()), {
    target: e,
    type: "get",
    key: "value"
  }) : bo(e.dep || (e.dep = jn())));
}
function Hs(e, t) {
  e = Q(e), e.dep && ({}.NODE_ENV !== "production" ? Zt(e.dep, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : Zt(e.dep));
}
function ye(e) {
  return !!(e && e.__v_isRef === !0);
}
function Xt(e) {
  return _u(e, !1);
}
function _u(e, t) {
  return ye(e) ? e : new Eu(e, t);
}
class Eu {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : Q(t), this._value = n ? t : Vn(t);
  }
  get value() {
    return Rs(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Er(t) || Nt(t);
    t = n ? t : Q(t), Mn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Vn(t), Hs(this, t));
  }
}
function Bs(e) {
  return ye(e) ? e.value : e;
}
const Ou = {
  get: (e, t, n) => Bs(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return ye(o) && !ye(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Us(e) {
  return Vt(e) ? e : new Proxy(e, Ou);
}
var zs;
class Cu {
  constructor(t, n, r, o) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[zs] = !1, this._dirty = !0, this.effect = new ii(t, () => {
      this._dirty || (this._dirty = !0, Hs(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = r;
  }
  get value() {
    const t = Q(this);
    return Rs(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
zs = "__v_isReadonly";
function Nu(e, t, n = !1) {
  let r, o;
  const i = Z(e);
  i ? (r = e, o = {}.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : be) : (r = e.get, o = e.set);
  const a = new Cu(r, o, i || !o, n);
  return {}.NODE_ENV !== "production" && t && !n && (a.effect.onTrack = t.onTrack, a.effect.onTrigger = t.onTrigger), a;
}
const kt = [];
function fr(e) {
  kt.push(e);
}
function dr() {
  kt.pop();
}
function P(e, ...t) {
  Ht();
  const n = kt.length ? kt[kt.length - 1].component : null, r = n && n.appContext.config.warnHandler, o = wu();
  if (r)
    lt(r, n, 11, [
      e + t.join(""),
      n && n.proxy,
      o.map(({ vnode: i }) => `at <${Kr(n, i.type)}>`).join(`
`),
      o
    ]);
  else {
    const i = [`[Vue warn]: ${e}`, ...t];
    o.length && i.push(`
`, ...xu(o)), console.warn(...i);
  }
  Bt();
}
function wu() {
  let e = kt[kt.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function xu(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...Tu(n));
  }), t;
}
function Tu({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, o = ` at <${Kr(e.component, e.type, r)}`, i = ">" + n;
  return e.props ? [o, ...Su(e.props), i] : [o + i];
}
function Su(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...Ws(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Ws(e, t, n) {
  return he(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : ye(t) ? (t = Ws(e, Q(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : Z(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = Q(t), n ? t : [`${e}=`, t]);
}
const li = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function lt(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (i) {
    kr(i, t, n);
  }
  return o;
}
function Le(e, t, n, r) {
  if (Z(e)) {
    const i = lt(e, t, n, r);
    return i && ni(i) && i.catch((a) => {
      kr(a, t, n);
    }), i;
  }
  const o = [];
  for (let i = 0; i < e.length; i++)
    o.push(Le(e[i], t, n, r));
  return o;
}
function kr(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const a = t.proxy, s = {}.NODE_ENV !== "production" ? li[n] : n;
    for (; i; ) {
      const u = i.ec;
      if (u) {
        for (let f = 0; f < u.length; f++)
          if (u[f](e, a, s) === !1)
            return;
      }
      i = i.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      lt(l, null, 10, [e, a, s]);
      return;
    }
  }
  Pu(e, n, o, r);
}
function Pu(e, t, n, r = !0) {
  if ({}.NODE_ENV !== "production") {
    const o = li[t];
    if (n && fr(n), P(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && dr(), r)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let kn = !1, Eo = !1;
const Ee = [];
let Qe = 0;
const nn = [];
let Ze = null, gt = 0;
const Ks = /* @__PURE__ */ Promise.resolve();
let ci = null;
const Au = 100;
function Fr(e) {
  const t = ci || Ks;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Du(e) {
  let t = Qe + 1, n = Ee.length;
  for (; t < n; ) {
    const r = t + n >>> 1;
    Fn(Ee[r]) < e ? t = r + 1 : n = r;
  }
  return t;
}
function Lr(e) {
  (!Ee.length || !Ee.includes(e, kn && e.allowRecurse ? Qe + 1 : Qe)) && (e.id == null ? Ee.push(e) : Ee.splice(Du(e.id), 0, e), qs());
}
function qs() {
  !kn && !Eo && (Eo = !0, ci = Ks.then(Js));
}
function $u(e) {
  const t = Ee.indexOf(e);
  t > Qe && Ee.splice(t, 1);
}
function Ys(e) {
  G(e) ? nn.push(...e) : (!Ze || !Ze.includes(e, e.allowRecurse ? gt + 1 : gt)) && nn.push(e), qs();
}
function Gi(e, t = kn ? Qe + 1 : 0) {
  for ({}.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()); t < Ee.length; t++) {
    const n = Ee[t];
    if (n && n.pre) {
      if ({}.NODE_ENV !== "production" && ui(e, n))
        continue;
      Ee.splice(t, 1), t--, n();
    }
  }
}
function Gs(e) {
  if (nn.length) {
    const t = [...new Set(nn)];
    if (nn.length = 0, Ze) {
      Ze.push(...t);
      return;
    }
    for (Ze = t, {}.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Ze.sort((n, r) => Fn(n) - Fn(r)), gt = 0; gt < Ze.length; gt++)
      ({}).NODE_ENV !== "production" && ui(e, Ze[gt]) || Ze[gt]();
    Ze = null, gt = 0;
  }
}
const Fn = (e) => e.id == null ? 1 / 0 : e.id, Iu = (e, t) => {
  const n = Fn(e) - Fn(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Js(e) {
  Eo = !1, kn = !0, {}.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Ee.sort(Iu);
  const t = {}.NODE_ENV !== "production" ? (n) => ui(e, n) : be;
  try {
    for (Qe = 0; Qe < Ee.length; Qe++) {
      const n = Ee[Qe];
      if (n && n.active !== !1) {
        if ({}.NODE_ENV !== "production" && t(n))
          continue;
        lt(n, null, 14);
      }
    }
  } finally {
    Qe = 0, Ee.length = 0, Gs(e), kn = !1, ci = null, (Ee.length || nn.length) && Js(e);
  }
}
function ui(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Au) {
      const r = t.ownerInstance, o = r && xl(r.type);
      return P(`Maximum recursive updates exceeded${o ? ` in component <${o}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
let _t = !1;
const qt = /* @__PURE__ */ new Set();
({}).NODE_ENV !== "production" && (ws().__VUE_HMR_RUNTIME__ = {
  createRecord: Jr(Zs),
  rerender: Jr(Vu),
  reload: Jr(ku)
});
const Lt = /* @__PURE__ */ new Map();
function Mu(e) {
  const t = e.type.__hmrId;
  let n = Lt.get(t);
  n || (Zs(t, e.type), n = Lt.get(t)), n.instances.add(e);
}
function ju(e) {
  Lt.get(e.type.__hmrId).instances.delete(e);
}
function Zs(e, t) {
  return Lt.has(e) ? !1 : (Lt.set(e, {
    initialDef: Tn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Tn(e) {
  return Tl(e) ? e.__vccOpts : e;
}
function Vu(e, t) {
  const n = Lt.get(e);
  !n || (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, Tn(r.type).render = t), r.renderCache = [], _t = !0, r.update(), _t = !1;
  }));
}
function ku(e, t) {
  const n = Lt.get(e);
  if (!n)
    return;
  t = Tn(t), Ji(n.initialDef, t);
  const r = [...n.instances];
  for (const o of r) {
    const i = Tn(o.type);
    qt.has(i) || (i !== n.initialDef && Ji(i, t), qt.add(i)), o.appContext.optionsCache.delete(o.type), o.ceReload ? (qt.add(i), o.ceReload(t.styles), qt.delete(i)) : o.parent ? (Lr(o.parent.update), o.parent.type.__asyncLoader && o.parent.ceReload && o.parent.ceReload(t.styles)) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  Ys(() => {
    for (const o of r)
      qt.delete(Tn(o.type));
  });
}
function Ji(e, t) {
  de(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Jr(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (r) {
      console.error(r), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let Xe, wn = [], Oo = !1;
function qn(e, ...t) {
  Xe ? Xe.emit(e, ...t) : Oo || wn.push({ event: e, args: t });
}
function Qs(e, t) {
  var n, r;
  Xe = e, Xe ? (Xe.enabled = !0, wn.forEach(({ event: o, args: i }) => Xe.emit(o, ...i)), wn = []) : typeof window < "u" && window.HTMLElement && !(!((r = (n = window.navigator) === null || n === void 0 ? void 0 : n.userAgent) === null || r === void 0) && r.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((i) => {
    Qs(i, t);
  }), setTimeout(() => {
    Xe || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Oo = !0, wn = []);
  }, 3e3)) : (Oo = !0, wn = []);
}
function Fu(e, t) {
  qn("app:init", e, t, {
    Fragment: Te,
    Text: hn,
    Comment: Ce,
    Static: hr
  });
}
function Lu(e) {
  qn("app:unmount", e);
}
const Ru = /* @__PURE__ */ fi("component:added"), Xs = /* @__PURE__ */ fi("component:updated"), Hu = /* @__PURE__ */ fi("component:removed"), Bu = (e) => {
  Xe && typeof Xe.cleanupBuffer == "function" && !Xe.cleanupBuffer(e) && Hu(e);
};
function fi(e) {
  return (t) => {
    qn(e, t.appContext.app, t.uid, t.parent ? t.parent.uid : void 0, t);
  };
}
const Uu = /* @__PURE__ */ el("perf:start"), zu = /* @__PURE__ */ el("perf:end");
function el(e) {
  return (t, n, r) => {
    qn(e, t.appContext.app, t.uid, t, n, r);
  };
}
function Wu(e, t, n) {
  qn("component:emit", e.appContext.app, e, t, n);
}
function Ku(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const r = e.vnode.props || ie;
  if ({}.NODE_ENV !== "production") {
    const { emitsOptions: f, propsOptions: [c] } = e;
    if (f)
      if (!(t in f))
        (!c || !(St(t) in c)) && P(`Component emitted event "${t}" but it is neither declared in the emits option nor as an "${St(t)}" prop.`);
      else {
        const p = f[t];
        Z(p) && (p(...n) || P(`Invalid event arguments: event validation failed for event "${t}".`));
      }
  }
  let o = n;
  const i = t.startsWith("update:"), a = i && t.slice(7);
  if (a && a in r) {
    const f = `${a === "modelValue" ? "model" : a}Modifiers`, { number: c, trim: p } = r[f] || ie;
    p && (o = n.map((g) => g.trim())), c && (o = n.map(Ns));
  }
  if ({}.NODE_ENV !== "production" && Wu(e, t, o), {}.NODE_ENV !== "production") {
    const f = t.toLowerCase();
    f !== t && r[St(f)] && P(`Event "${f}" is emitted in component ${Kr(e, e.type)} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Ot(t)}" instead of "${t}".`);
  }
  let s, l = r[s = St(t)] || r[s = St(an(t))];
  !l && i && (l = r[s = St(Ot(t))]), l && Le(l, e, 6, o);
  const u = r[s + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[s])
      return;
    e.emitted[s] = !0, Le(u, e, 6, o);
  }
}
function tl(e, t, n = !1) {
  const r = t.emitsCache, o = r.get(e);
  if (o !== void 0)
    return o;
  const i = e.emits;
  let a = {}, s = !1;
  if (!Z(e)) {
    const l = (u) => {
      const f = tl(u, t, !0);
      f && (s = !0, de(a, f));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !i && !s ? (ae(e) && r.set(e, null), null) : (G(i) ? i.forEach((l) => a[l] = null) : de(a, i), ae(e) && r.set(e, a), a);
}
function Rr(e, t) {
  return !e || !Kn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), X(e, t[0].toLowerCase() + t.slice(1)) || X(e, Ot(t)) || X(e, t));
}
let Fe = null, nl = null;
function Or(e) {
  const t = Fe;
  return Fe = e, nl = e && e.type.__scopeId || null, t;
}
function rl(e, t = Fe, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && ca(-1);
    const i = Or(t);
    let a;
    try {
      a = e(...o);
    } finally {
      Or(i), r._d && ca(1);
    }
    return {}.NODE_ENV !== "production" && Xs(t), a;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
let Co = !1;
function Cr() {
  Co = !0;
}
function Zr(e) {
  const { type: t, vnode: n, proxy: r, withProxy: o, props: i, propsOptions: [a], slots: s, attrs: l, emit: u, render: f, renderCache: c, data: p, setupState: g, ctx: v, inheritAttrs: E } = e;
  let F, L;
  const A = Or(e);
  ({}).NODE_ENV !== "production" && (Co = !1);
  try {
    if (n.shapeFlag & 4) {
      const R = o || r;
      F = Be(f.call(R, R, c, i, g, p, v)), L = l;
    } else {
      const R = t;
      ({}).NODE_ENV !== "production" && l === i && Cr(), F = Be(R.length > 1 ? R(i, {}.NODE_ENV !== "production" ? {
        get attrs() {
          return Cr(), l;
        },
        slots: s,
        emit: u
      } : { attrs: l, slots: s, emit: u }) : R(i, null)), L = t.props ? l : Yu(l);
    }
  } catch (R) {
    An.length = 0, kr(R, e, 1), F = w(Ce);
  }
  let W = F, K;
  if ({}.NODE_ENV !== "production" && F.patchFlag > 0 && F.patchFlag & 2048 && ([W, K] = qu(F)), L && E !== !1) {
    const R = Object.keys(L), { shapeFlag: C } = W;
    if (R.length) {
      if (C & 7)
        a && R.some(br) && (L = Gu(L, a)), W = et(W, L);
      else if ({}.NODE_ENV !== "production" && !Co && W.type !== Ce) {
        const D = Object.keys(l), S = [], V = [];
        for (let q = 0, ee = D.length; q < ee; q++) {
          const j = D[q];
          Kn(j) ? br(j) || S.push(j[2].toLowerCase() + j.slice(3)) : V.push(j);
        }
        V.length && P(`Extraneous non-props attributes (${V.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`), S.length && P(`Extraneous non-emits event listeners (${S.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
      }
    }
  }
  return n.dirs && ({}.NODE_ENV !== "production" && !Zi(W) && P("Runtime directive used on component with non-element root node. The directives will not function as intended."), W = et(W), W.dirs = W.dirs ? W.dirs.concat(n.dirs) : n.dirs), n.transition && ({}.NODE_ENV !== "production" && !Zi(W) && P("Component inside <Transition> renders non-element root node that cannot be animated."), W.transition = n.transition), {}.NODE_ENV !== "production" && K ? K(W) : F = W, Or(A), F;
}
const qu = (e) => {
  const t = e.children, n = e.dynamicChildren, r = ol(t);
  if (!r)
    return [e, void 0];
  const o = t.indexOf(r), i = n ? n.indexOf(r) : -1, a = (s) => {
    t[o] = s, n && (i > -1 ? n[i] = s : s.patchFlag > 0 && (e.dynamicChildren = [...n, s]));
  };
  return [Be(r), a];
};
function ol(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    if (ln(r)) {
      if (r.type !== Ce || r.children === "v-if") {
        if (t)
          return;
        t = r;
      }
    } else
      return;
  }
  return t;
}
const Yu = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Kn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Gu = (e, t) => {
  const n = {};
  for (const r in e)
    (!br(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
}, Zi = (e) => e.shapeFlag & 7 || e.type === Ce;
function Ju(e, t, n) {
  const { props: r, children: o, component: i } = e, { props: a, children: s, patchFlag: l } = t, u = i.emitsOptions;
  if ({}.NODE_ENV !== "production" && (o || s) && _t || t.dirs || t.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return r ? Qi(r, a, u) : !!a;
    if (l & 8) {
      const f = t.dynamicProps;
      for (let c = 0; c < f.length; c++) {
        const p = f[c];
        if (a[p] !== r[p] && !Rr(u, p))
          return !0;
      }
    }
  } else
    return (o || s) && (!s || !s.$stable) ? !0 : r === a ? !1 : r ? a ? Qi(r, a, u) : !0 : !!a;
  return !1;
}
function Qi(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const i = r[o];
    if (t[i] !== e[i] && !Rr(n, i))
      return !0;
  }
  return !1;
}
function Zu({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Qu = (e) => e.__isSuspense;
function Xu(e, t) {
  t && t.pendingBranch ? G(e) ? t.effects.push(...e) : t.effects.push(e) : Ys(e);
}
function Hr(e, t) {
  if (!ve)
    ({}).NODE_ENV !== "production" && P("provide() can only be used inside setup().");
  else {
    let n = ve.provides;
    const r = ve.parent && ve.parent.provides;
    r === n && (n = ve.provides = Object.create(r)), n[e] = t;
  }
}
function Sn(e, t, n = !1) {
  const r = ve || Fe;
  if (r) {
    const o = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && Z(t) ? t.call(r.proxy) : t;
    ({}).NODE_ENV !== "production" && P(`injection "${String(e)}" not found.`);
  } else
    ({}).NODE_ENV !== "production" && P("inject() can only be used inside setup() or functional components.");
}
function Br(e, t) {
  return di(e, null, t);
}
const Xi = {};
function Et(e, t, n) {
  return {}.NODE_ENV !== "production" && !Z(t) && P("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."), di(e, t, n);
}
function di(e, t, { immediate: n, deep: r, flush: o, onTrack: i, onTrigger: a } = ie) {
  ({}).NODE_ENV !== "production" && !t && (n !== void 0 && P('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), r !== void 0 && P('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const s = (A) => {
    P("Invalid watch source: ", A, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, l = ve;
  let u, f = !1, c = !1;
  if (ye(e) ? (u = () => e.value, f = Er(e)) : Vt(e) ? (u = () => e, r = !0) : G(e) ? (c = !0, f = e.some((A) => Vt(A) || Er(A)), u = () => e.map((A) => {
    if (ye(A))
      return A.value;
    if (Vt(A))
      return en(A);
    if (Z(A))
      return lt(A, l, 2);
    ({}).NODE_ENV !== "production" && s(A);
  })) : Z(e) ? t ? u = () => lt(e, l, 2) : u = () => {
    if (!(l && l.isUnmounted))
      return p && p(), Le(e, l, 3, [g]);
  } : (u = be, {}.NODE_ENV !== "production" && s(e)), t && r) {
    const A = u;
    u = () => en(A());
  }
  let p, g = (A) => {
    p = L.onStop = () => {
      lt(A, l, 4);
    };
  };
  if (Bn)
    return g = be, t ? n && Le(t, l, 3, [
      u(),
      c ? [] : void 0,
      g
    ]) : u(), be;
  let v = c ? [] : Xi;
  const E = () => {
    if (!!L.active)
      if (t) {
        const A = L.run();
        (r || f || (c ? A.some((W, K) => Mn(W, v[K])) : Mn(A, v))) && (p && p(), Le(t, l, 3, [
          A,
          v === Xi ? void 0 : v,
          g
        ]), v = A);
      } else
        L.run();
  };
  E.allowRecurse = !!t;
  let F;
  o === "sync" ? F = E : o === "post" ? F = () => Ae(E, l && l.suspense) : (E.pre = !0, l && (E.id = l.uid), F = () => Lr(E));
  const L = new ii(u, F);
  return {}.NODE_ENV !== "production" && (L.onTrack = i, L.onTrigger = a), t ? n ? E() : v = L.run() : o === "post" ? Ae(L.run.bind(L), l && l.suspense) : L.run(), () => {
    L.stop(), l && l.scope && ei(l.scope.effects, L);
  };
}
function ef(e, t, n) {
  const r = this.proxy, o = he(e) ? e.includes(".") ? il(r, e) : () => r[e] : e.bind(r, r);
  let i;
  Z(t) ? i = t : (i = t.handler, n = t);
  const a = ve;
  cn(this);
  const s = di(o, i.bind(r), n);
  return a ? cn(a) : Ft(), s;
}
function il(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
function en(e, t) {
  if (!ae(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), ye(e))
    en(e.value, t);
  else if (G(e))
    for (let n = 0; n < e.length; n++)
      en(e[n], t);
  else if (Es(e) || Mt(e))
    e.forEach((n) => {
      en(n, t);
    });
  else if (Cs(e))
    for (const n in e)
      en(e[n], t);
  return e;
}
function al() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return pn(() => {
    e.isMounted = !0;
  }), zr(() => {
    e.isUnmounting = !0;
  }), e;
}
const Ve = [Function, Array], tf = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Ve,
    onEnter: Ve,
    onAfterEnter: Ve,
    onEnterCancelled: Ve,
    onBeforeLeave: Ve,
    onLeave: Ve,
    onAfterLeave: Ve,
    onLeaveCancelled: Ve,
    onBeforeAppear: Ve,
    onAppear: Ve,
    onAfterAppear: Ve,
    onAppearCancelled: Ve
  },
  setup(e, { slots: t }) {
    const n = _i(), r = al();
    let o;
    return () => {
      const i = t.default && pi(t.default(), !0);
      if (!i || !i.length)
        return;
      let a = i[0];
      if (i.length > 1) {
        let E = !1;
        for (const F of i)
          if (F.type !== Ce) {
            if ({}.NODE_ENV !== "production" && E) {
              P("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            if (a = F, E = !0, {}.NODE_ENV === "production")
              break;
          }
      }
      const s = Q(e), { mode: l } = s;
      if ({}.NODE_ENV !== "production" && l && l !== "in-out" && l !== "out-in" && l !== "default" && P(`invalid <transition> mode: ${l}`), r.isLeaving)
        return Qr(a);
      const u = ea(a);
      if (!u)
        return Qr(a);
      const f = Ln(u, s, r, n);
      Rn(u, f);
      const c = n.subTree, p = c && ea(c);
      let g = !1;
      const { getTransitionKey: v } = u.type;
      if (v) {
        const E = v();
        o === void 0 ? o = E : E !== o && (o = E, g = !0);
      }
      if (p && p.type !== Ce && (!At(u, p) || g)) {
        const E = Ln(p, s, r, n);
        if (Rn(p, E), l === "out-in")
          return r.isLeaving = !0, E.afterLeave = () => {
            r.isLeaving = !1, n.update();
          }, Qr(a);
        l === "in-out" && u.type !== Ce && (E.delayLeave = (F, L, A) => {
          const W = ll(r, p);
          W[String(p.key)] = p, F._leaveCb = () => {
            L(), F._leaveCb = void 0, delete f.delayedLeave;
          }, f.delayedLeave = A;
        });
      }
      return a;
    };
  }
}, sl = tf;
function ll(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Ln(e, t, n, r) {
  const { appear: o, mode: i, persisted: a = !1, onBeforeEnter: s, onEnter: l, onAfterEnter: u, onEnterCancelled: f, onBeforeLeave: c, onLeave: p, onAfterLeave: g, onLeaveCancelled: v, onBeforeAppear: E, onAppear: F, onAfterAppear: L, onAppearCancelled: A } = t, W = String(e.key), K = ll(n, e), R = (S, V) => {
    S && Le(S, r, 9, V);
  }, C = (S, V) => {
    const q = V[1];
    R(S, V), G(S) ? S.every((ee) => ee.length <= 1) && q() : S.length <= 1 && q();
  }, D = {
    mode: i,
    persisted: a,
    beforeEnter(S) {
      let V = s;
      if (!n.isMounted)
        if (o)
          V = E || s;
        else
          return;
      S._leaveCb && S._leaveCb(!0);
      const q = K[W];
      q && At(e, q) && q.el._leaveCb && q.el._leaveCb(), R(V, [S]);
    },
    enter(S) {
      let V = l, q = u, ee = f;
      if (!n.isMounted)
        if (o)
          V = F || l, q = L || u, ee = A || f;
        else
          return;
      let j = !1;
      const b = S._enterCb = (y) => {
        j || (j = !0, y ? R(ee, [S]) : R(q, [S]), D.delayedLeave && D.delayedLeave(), S._enterCb = void 0);
      };
      V ? C(V, [S, b]) : b();
    },
    leave(S, V) {
      const q = String(e.key);
      if (S._enterCb && S._enterCb(!0), n.isUnmounting)
        return V();
      R(c, [S]);
      let ee = !1;
      const j = S._leaveCb = (b) => {
        ee || (ee = !0, V(), b ? R(v, [S]) : R(g, [S]), S._leaveCb = void 0, K[q] === e && delete K[q]);
      };
      K[q] = e, p ? C(p, [S, j]) : j();
    },
    clone(S) {
      return Ln(S, t, n, r);
    }
  };
  return D;
}
function Qr(e) {
  if (Yn(e))
    return e = et(e), e.children = null, e;
}
function ea(e) {
  return Yn(e) ? e.children ? e.children[0] : void 0 : e;
}
function Rn(e, t) {
  e.shapeFlag & 6 && e.component ? Rn(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function pi(e, t = !1, n) {
  let r = [], o = 0;
  for (let i = 0; i < e.length; i++) {
    let a = e[i];
    const s = n == null ? a.key : String(n) + String(a.key != null ? a.key : i);
    a.type === Te ? (a.patchFlag & 128 && o++, r = r.concat(pi(a.children, t, s))) : (t || a.type !== Ce) && r.push(s != null ? et(a, { key: s }) : a);
  }
  if (o > 1)
    for (let i = 0; i < r.length; i++)
      r[i].patchFlag = -2;
  return r;
}
function We(e) {
  return Z(e) ? { setup: e, name: e.name } : e;
}
const pr = (e) => !!e.type.__asyncLoader, Yn = (e) => e.type.__isKeepAlive;
function nf(e, t) {
  cl(e, "a", t);
}
function rf(e, t) {
  cl(e, "da", t);
}
function cl(e, t, n = ve) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Ur(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Yn(o.parent.vnode) && of(r, t, n, o), o = o.parent;
  }
}
function of(e, t, n, r) {
  const o = Ur(t, e, r, !0);
  gi(() => {
    ei(r[t], o);
  }, n);
}
function Ur(e, t, n = ve, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...a) => {
      if (n.isUnmounted)
        return;
      Ht(), cn(n);
      const s = Le(t, n, e, a);
      return Ft(), Bt(), s;
    });
    return r ? o.unshift(i) : o.push(i), i;
  } else if ({}.NODE_ENV !== "production") {
    const o = St(li[e].replace(/ hook$/, ""));
    P(`${o} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const ut = (e) => (t, n = ve) => (!Bn || e === "sp") && Ur(e, (...r) => t(...r), n), af = ut("bm"), pn = ut("m"), sf = ut("bu"), hi = ut("u"), zr = ut("bum"), gi = ut("um"), lf = ut("sp"), cf = ut("rtg"), uf = ut("rtc");
function ff(e, t = ve) {
  Ur("ec", e, t);
}
function ul(e) {
  Bc(e) && P("Do not use built-in directive ids as custom directive id: " + e);
}
function wt(e, t, n, r) {
  const o = e.dirs, i = t && t.dirs;
  for (let a = 0; a < o.length; a++) {
    const s = o[a];
    i && (s.oldValue = i[a].value);
    let l = s.dir[r];
    l && (Ht(), Le(l, n, 8, [
      e.el,
      s,
      e,
      t
    ]), Bt());
  }
}
const df = Symbol(), No = (e) => e ? Nl(e) ? Ei(e) || e.proxy : No(e.parent) : null, sn = /* @__PURE__ */ de(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => ({}).NODE_ENV !== "production" ? Qt(e.props) : e.props,
  $attrs: (e) => ({}).NODE_ENV !== "production" ? Qt(e.attrs) : e.attrs,
  $slots: (e) => ({}).NODE_ENV !== "production" ? Qt(e.slots) : e.slots,
  $refs: (e) => ({}).NODE_ENV !== "production" ? Qt(e.refs) : e.refs,
  $parent: (e) => No(e.parent),
  $root: (e) => No(e.root),
  $emit: (e) => e.emit,
  $options: (e) => vi(e),
  $forceUpdate: (e) => e.f || (e.f = () => Lr(e.update)),
  $nextTick: (e) => e.n || (e.n = Fr.bind(e.proxy)),
  $watch: (e) => ef.bind(e)
}), mi = (e) => e === "_" || e === "$", fl = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: o, props: i, accessCache: a, type: s, appContext: l } = e;
    if ({}.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if ({}.NODE_ENV !== "production" && r !== ie && r.__isScriptSetup && X(r, t))
      return r[t];
    let u;
    if (t[0] !== "$") {
      const g = a[t];
      if (g !== void 0)
        switch (g) {
          case 1:
            return r[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (r !== ie && X(r, t))
          return a[t] = 1, r[t];
        if (o !== ie && X(o, t))
          return a[t] = 2, o[t];
        if ((u = e.propsOptions[0]) && X(u, t))
          return a[t] = 3, i[t];
        if (n !== ie && X(n, t))
          return a[t] = 4, n[t];
        wo && (a[t] = 0);
      }
    }
    const f = sn[t];
    let c, p;
    if (f)
      return t === "$attrs" && (De(e, "get", t), {}.NODE_ENV !== "production" && Cr()), f(e);
    if ((c = s.__cssModules) && (c = c[t]))
      return c;
    if (n !== ie && X(n, t))
      return a[t] = 4, n[t];
    if (p = l.config.globalProperties, X(p, t))
      return p[t];
    ({}).NODE_ENV !== "production" && Fe && (!he(t) || t.indexOf("__v") !== 0) && (o !== ie && mi(t[0]) && X(o, t) ? P(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === Fe && P(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: i } = e;
    return o !== ie && X(o, t) ? (o[t] = n, !0) : r !== ie && X(r, t) ? (r[t] = n, !0) : X(e.props, t) ? ({}.NODE_ENV !== "production" && P(`Attempting to mutate prop "${t}". Props are readonly.`, e), !1) : t[0] === "$" && t.slice(1) in e ? ({}.NODE_ENV !== "production" && P(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`, e), !1) : ({}.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(i, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : i[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: i } }, a) {
    let s;
    return !!n[a] || e !== ie && X(e, a) || t !== ie && X(t, a) || (s = i[0]) && X(s, a) || X(r, a) || X(sn, a) || X(o.config.globalProperties, a);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : X(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
({}).NODE_ENV !== "production" && (fl.ownKeys = (e) => (P("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function pf(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(sn).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => sn[n](e),
      set: be
    });
  }), t;
}
function hf(e) {
  const { ctx: t, propsOptions: [n] } = e;
  n && Object.keys(n).forEach((r) => {
    Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[r],
      set: be
    });
  });
}
function gf(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(Q(n)).forEach((r) => {
    if (!n.__isScriptSetup) {
      if (mi(r[0])) {
        P(`setup() return property ${JSON.stringify(r)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(t, r, {
        enumerable: !0,
        configurable: !0,
        get: () => n[r],
        set: be
      });
    }
  });
}
function mf() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? P(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let wo = !0;
function vf(e) {
  const t = vi(e), n = e.proxy, r = e.ctx;
  wo = !1, t.beforeCreate && ta(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: i,
    methods: a,
    watch: s,
    provide: l,
    inject: u,
    created: f,
    beforeMount: c,
    mounted: p,
    beforeUpdate: g,
    updated: v,
    activated: E,
    deactivated: F,
    beforeDestroy: L,
    beforeUnmount: A,
    destroyed: W,
    unmounted: K,
    render: R,
    renderTracked: C,
    renderTriggered: D,
    errorCaptured: S,
    serverPrefetch: V,
    expose: q,
    inheritAttrs: ee,
    components: j,
    directives: b,
    filters: y
  } = t, H = {}.NODE_ENV !== "production" ? mf() : null;
  if ({}.NODE_ENV !== "production") {
    const [M] = e.propsOptions;
    if (M)
      for (const k in M)
        H("Props", k);
  }
  if (u && yf(u, r, H, e.appContext.config.unwrapInjectedRef), a)
    for (const M in a) {
      const k = a[M];
      Z(k) ? ({}.NODE_ENV !== "production" ? Object.defineProperty(r, M, {
        value: k.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : r[M] = k.bind(n), {}.NODE_ENV !== "production" && H("Methods", M)) : {}.NODE_ENV !== "production" && P(`Method "${M}" has type "${typeof k}" in the component definition. Did you reference the function correctly?`);
    }
  if (o) {
    ({}).NODE_ENV !== "production" && !Z(o) && P("The data option must be a function. Plain object usage is no longer supported.");
    const M = o.call(n, n);
    if ({}.NODE_ENV !== "production" && ni(M) && P("data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."), !ae(M))
      ({}).NODE_ENV !== "production" && P("data() should return an object.");
    else if (e.data = nt(M), {}.NODE_ENV !== "production")
      for (const k in M)
        H("Data", k), mi(k[0]) || Object.defineProperty(r, k, {
          configurable: !0,
          enumerable: !0,
          get: () => M[k],
          set: be
        });
  }
  if (wo = !0, i)
    for (const M in i) {
      const k = i[M], re = Z(k) ? k.bind(n, n) : Z(k.get) ? k.get.bind(n, n) : be;
      ({}).NODE_ENV !== "production" && re === be && P(`Computed property "${M}" has no getter.`);
      const me = !Z(k) && Z(k.set) ? k.set.bind(n) : {}.NODE_ENV !== "production" ? () => {
        P(`Write operation failed: computed property "${M}" is readonly.`);
      } : be, ge = ue({
        get: re,
        set: me
      });
      Object.defineProperty(r, M, {
        enumerable: !0,
        configurable: !0,
        get: () => ge.value,
        set: (te) => ge.value = te
      }), {}.NODE_ENV !== "production" && H("Computed", M);
    }
  if (s)
    for (const M in s)
      dl(s[M], r, n, M);
  if (l) {
    const M = Z(l) ? l.call(n) : l;
    Reflect.ownKeys(M).forEach((k) => {
      Hr(k, M[k]);
    });
  }
  f && ta(f, e, "c");
  function B(M, k) {
    G(k) ? k.forEach((re) => M(re.bind(n))) : k && M(k.bind(n));
  }
  if (B(af, c), B(pn, p), B(sf, g), B(hi, v), B(nf, E), B(rf, F), B(ff, S), B(uf, C), B(cf, D), B(zr, A), B(gi, K), B(lf, V), G(q))
    if (q.length) {
      const M = e.exposed || (e.exposed = {});
      q.forEach((k) => {
        Object.defineProperty(M, k, {
          get: () => n[k],
          set: (re) => n[k] = re
        });
      });
    } else
      e.exposed || (e.exposed = {});
  R && e.render === be && (e.render = R), ee != null && (e.inheritAttrs = ee), j && (e.components = j), b && (e.directives = b);
}
function yf(e, t, n = be, r = !1) {
  G(e) && (e = xo(e));
  for (const o in e) {
    const i = e[o];
    let a;
    ae(i) ? "default" in i ? a = Sn(i.from || o, i.default, !0) : a = Sn(i.from || o) : a = Sn(i), ye(a) ? r ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => a.value,
      set: (s) => a.value = s
    }) : ({}.NODE_ENV !== "production" && P(`injected property "${o}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`), t[o] = a) : t[o] = a, {}.NODE_ENV !== "production" && n("Inject", o);
  }
}
function ta(e, t, n) {
  Le(G(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function dl(e, t, n, r) {
  const o = r.includes(".") ? il(n, r) : () => n[r];
  if (he(e)) {
    const i = t[e];
    Z(i) ? Et(o, i) : {}.NODE_ENV !== "production" && P(`Invalid watch handler specified by key "${e}"`, i);
  } else if (Z(e))
    Et(o, e.bind(n));
  else if (ae(e))
    if (G(e))
      e.forEach((i) => dl(i, t, n, r));
    else {
      const i = Z(e.handler) ? e.handler.bind(n) : t[e.handler];
      Z(i) ? Et(o, i, e) : {}.NODE_ENV !== "production" && P(`Invalid watch handler specified by key "${e.handler}"`, i);
    }
  else
    ({}).NODE_ENV !== "production" && P(`Invalid watch option: "${r}"`, e);
}
function vi(e) {
  const t = e.type, { mixins: n, extends: r } = t, { mixins: o, optionsCache: i, config: { optionMergeStrategies: a } } = e.appContext, s = i.get(t);
  let l;
  return s ? l = s : !o.length && !n && !r ? l = t : (l = {}, o.length && o.forEach((u) => Nr(l, u, a, !0)), Nr(l, t, a)), ae(t) && i.set(t, l), l;
}
function Nr(e, t, n, r = !1) {
  const { mixins: o, extends: i } = t;
  i && Nr(e, i, n, !0), o && o.forEach((a) => Nr(e, a, n, !0));
  for (const a in t)
    if (r && a === "expose")
      ({}).NODE_ENV !== "production" && P('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const s = bf[a] || n && n[a];
      e[a] = s ? s(e[a], t[a]) : t[a];
    }
  return e;
}
const bf = {
  data: na,
  props: Pt,
  emits: Pt,
  methods: Pt,
  computed: Pt,
  beforeCreate: we,
  created: we,
  beforeMount: we,
  mounted: we,
  beforeUpdate: we,
  updated: we,
  beforeDestroy: we,
  beforeUnmount: we,
  destroyed: we,
  unmounted: we,
  activated: we,
  deactivated: we,
  errorCaptured: we,
  serverPrefetch: we,
  components: Pt,
  directives: Pt,
  watch: Ef,
  provide: na,
  inject: _f
};
function na(e, t) {
  return t ? e ? function() {
    return de(Z(e) ? e.call(this, this) : e, Z(t) ? t.call(this, this) : t);
  } : t : e;
}
function _f(e, t) {
  return Pt(xo(e), xo(t));
}
function xo(e) {
  if (G(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function we(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Pt(e, t) {
  return e ? de(de(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function Ef(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = de(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = we(e[r], t[r]);
  return n;
}
function Of(e, t, n, r = !1) {
  const o = {}, i = {};
  _r(i, Wr, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), pl(e, t, o, i);
  for (const a in e.propsOptions[0])
    a in o || (o[a] = void 0);
  ({}).NODE_ENV !== "production" && gl(t || {}, o, e), n ? e.props = r ? o : bu(o) : e.type.props ? e.props = o : e.props = i, e.attrs = i;
}
function Cf(e) {
  for (; e; ) {
    if (e.type.__hmrId)
      return !0;
    e = e.parent;
  }
}
function Nf(e, t, n, r) {
  const { props: o, attrs: i, vnode: { patchFlag: a } } = e, s = Q(o), [l] = e.propsOptions;
  let u = !1;
  if (!({}.NODE_ENV !== "production" && Cf(e)) && (r || a > 0) && !(a & 16)) {
    if (a & 8) {
      const f = e.vnode.dynamicProps;
      for (let c = 0; c < f.length; c++) {
        let p = f[c];
        if (Rr(e.emitsOptions, p))
          continue;
        const g = t[p];
        if (l)
          if (X(i, p))
            g !== i[p] && (i[p] = g, u = !0);
          else {
            const v = an(p);
            o[v] = To(l, s, v, g, e, !1);
          }
        else
          g !== i[p] && (i[p] = g, u = !0);
      }
    }
  } else {
    pl(e, t, o, i) && (u = !0);
    let f;
    for (const c in s)
      (!t || !X(t, c) && ((f = Ot(c)) === c || !X(t, f))) && (l ? n && (n[c] !== void 0 || n[f] !== void 0) && (o[c] = To(l, s, c, void 0, e, !0)) : delete o[c]);
    if (i !== s)
      for (const c in i)
        (!t || !X(t, c) && !0) && (delete i[c], u = !0);
  }
  u && ct(e, "set", "$attrs"), {}.NODE_ENV !== "production" && gl(t || {}, o, e);
}
function pl(e, t, n, r) {
  const [o, i] = e.propsOptions;
  let a = !1, s;
  if (t)
    for (let l in t) {
      if (ur(l))
        continue;
      const u = t[l];
      let f;
      o && X(o, f = an(l)) ? !i || !i.includes(f) ? n[f] = u : (s || (s = {}))[f] = u : Rr(e.emitsOptions, l) || (!(l in r) || u !== r[l]) && (r[l] = u, a = !0);
    }
  if (i) {
    const l = Q(n), u = s || ie;
    for (let f = 0; f < i.length; f++) {
      const c = i[f];
      n[c] = To(o, l, c, u[c], e, !X(u, c));
    }
  }
  return a;
}
function To(e, t, n, r, o, i) {
  const a = e[n];
  if (a != null) {
    const s = X(a, "default");
    if (s && r === void 0) {
      const l = a.default;
      if (a.type !== Function && Z(l)) {
        const { propsDefaults: u } = o;
        n in u ? r = u[n] : (cn(o), r = u[n] = l.call(null, t), Ft());
      } else
        r = l;
    }
    a[0] && (i && !s ? r = !1 : a[1] && (r === "" || r === Ot(n)) && (r = !0));
  }
  return r;
}
function hl(e, t, n = !1) {
  const r = t.propsCache, o = r.get(e);
  if (o)
    return o;
  const i = e.props, a = {}, s = [];
  let l = !1;
  if (!Z(e)) {
    const f = (c) => {
      l = !0;
      const [p, g] = hl(c, t, !0);
      de(a, p), g && s.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!i && !l)
    return ae(e) && r.set(e, tn), tn;
  if (G(i))
    for (let f = 0; f < i.length; f++) {
      ({}).NODE_ENV !== "production" && !he(i[f]) && P("props must be strings when using array syntax.", i[f]);
      const c = an(i[f]);
      ra(c) && (a[c] = ie);
    }
  else if (i) {
    ({}).NODE_ENV !== "production" && !ae(i) && P("invalid props options", i);
    for (const f in i) {
      const c = an(f);
      if (ra(c)) {
        const p = i[f], g = a[c] = G(p) || Z(p) ? { type: p } : p;
        if (g) {
          const v = ia(Boolean, g.type), E = ia(String, g.type);
          g[0] = v > -1, g[1] = E < 0 || v < E, (v > -1 || X(g, "default")) && s.push(c);
        }
      }
    }
  }
  const u = [a, s];
  return ae(e) && r.set(e, u), u;
}
function ra(e) {
  return e[0] !== "$" ? !0 : ({}.NODE_ENV !== "production" && P(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function So(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function oa(e, t) {
  return So(e) === So(t);
}
function ia(e, t) {
  return G(t) ? t.findIndex((n) => oa(n, e)) : Z(t) && oa(t, e) ? 0 : -1;
}
function gl(e, t, n) {
  const r = Q(t), o = n.propsOptions[0];
  for (const i in o) {
    let a = o[i];
    a != null && wf(i, r[i], a, !X(e, i) && !X(e, Ot(i)));
  }
}
function wf(e, t, n, r) {
  const { type: o, required: i, validator: a } = n;
  if (i && r) {
    P('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !n.required)) {
    if (o != null && o !== !0) {
      let s = !1;
      const l = G(o) ? o : [o], u = [];
      for (let f = 0; f < l.length && !s; f++) {
        const { valid: c, expectedType: p } = Tf(t, l[f]);
        u.push(p || ""), s = c;
      }
      if (!s) {
        P(Sf(e, t, u));
        return;
      }
    }
    a && !a(t) && P('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const xf = /* @__PURE__ */ dn("String,Number,Boolean,Function,Symbol,BigInt");
function Tf(e, t) {
  let n;
  const r = So(t);
  if (xf(r)) {
    const o = typeof e;
    n = o === r.toLowerCase(), !n && o === "object" && (n = e instanceof t);
  } else
    r === "Object" ? n = ae(e) : r === "Array" ? n = G(e) : r === "null" ? n = e === null : n = e instanceof t;
  return {
    valid: n,
    expectedType: r
  };
}
function Sf(e, t, n) {
  let r = `Invalid prop: type check failed for prop "${e}". Expected ${n.map($r).join(" | ")}`;
  const o = n[0], i = ri(t), a = aa(t, o), s = aa(t, i);
  return n.length === 1 && sa(o) && !Pf(o, i) && (r += ` with value ${a}`), r += `, got ${i} `, sa(i) && (r += `with value ${s}.`), r;
}
function aa(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function sa(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Pf(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const ml = (e) => e[0] === "_" || e === "$stable", yi = (e) => G(e) ? e.map(Be) : [Be(e)], Af = (e, t, n) => {
  if (t._n)
    return t;
  const r = rl((...o) => ({}.NODE_ENV !== "production" && ve && P(`Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`), yi(t(...o))), n);
  return r._c = !1, r;
}, vl = (e, t, n) => {
  const r = e._ctx;
  for (const o in e) {
    if (ml(o))
      continue;
    const i = e[o];
    if (Z(i))
      t[o] = Af(o, i, r);
    else if (i != null) {
      ({}).NODE_ENV !== "production" && P(`Non-function value encountered for slot "${o}". Prefer function slots for better performance.`);
      const a = yi(i);
      t[o] = () => a;
    }
  }
}, yl = (e, t) => {
  ({}).NODE_ENV !== "production" && !Yn(e.vnode) && P("Non-function value encountered for default slot. Prefer function slots for better performance.");
  const n = yi(t);
  e.slots.default = () => n;
}, Df = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = Q(t), _r(t, "_", n)) : vl(t, e.slots = {});
  } else
    e.slots = {}, t && yl(e, t);
  _r(e.slots, Wr, 1);
}, $f = (e, t, n) => {
  const { vnode: r, slots: o } = e;
  let i = !0, a = ie;
  if (r.shapeFlag & 32) {
    const s = t._;
    s ? {}.NODE_ENV !== "production" && _t ? de(o, t) : n && s === 1 ? i = !1 : (de(o, t), !n && s === 1 && delete o._) : (i = !t.$stable, vl(t, o)), a = t;
  } else
    t && (yl(e, t), a = { default: 1 });
  if (i)
    for (const s in o)
      !ml(s) && !(s in a) && delete o[s];
};
function bl() {
  return {
    app: null,
    config: {
      isNativeTag: _s,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let If = 0;
function Mf(e, t) {
  return function(r, o = null) {
    Z(r) || (r = Object.assign({}, r)), o != null && !ae(o) && ({}.NODE_ENV !== "production" && P("root props passed to app.mount() must be an object."), o = null);
    const i = bl(), a = /* @__PURE__ */ new Set();
    let s = !1;
    const l = i.app = {
      _uid: If++,
      _component: r,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: da,
      get config() {
        return i.config;
      },
      set config(u) {
        ({}).NODE_ENV !== "production" && P("app.config cannot be replaced. Modify individual options instead.");
      },
      use(u, ...f) {
        return a.has(u) ? {}.NODE_ENV !== "production" && P("Plugin has already been applied to target app.") : u && Z(u.install) ? (a.add(u), u.install(l, ...f)) : Z(u) ? (a.add(u), u(l, ...f)) : {}.NODE_ENV !== "production" && P('A plugin must either be a function or an object with an "install" function.'), l;
      },
      mixin(u) {
        return i.mixins.includes(u) ? {}.NODE_ENV !== "production" && P("Mixin has already been applied to target app" + (u.name ? `: ${u.name}` : "")) : i.mixins.push(u), l;
      },
      component(u, f) {
        return {}.NODE_ENV !== "production" && Do(u, i.config), f ? ({}.NODE_ENV !== "production" && i.components[u] && P(`Component "${u}" has already been registered in target app.`), i.components[u] = f, l) : i.components[u];
      },
      directive(u, f) {
        return {}.NODE_ENV !== "production" && ul(u), f ? ({}.NODE_ENV !== "production" && i.directives[u] && P(`Directive "${u}" has already been registered in target app.`), i.directives[u] = f, l) : i.directives[u];
      },
      mount(u, f, c) {
        if (s)
          ({}).NODE_ENV !== "production" && P("App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`");
        else {
          ({}).NODE_ENV !== "production" && u.__vue_app__ && P("There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first.");
          const p = w(r, o);
          return p.appContext = i, {}.NODE_ENV !== "production" && (i.reload = () => {
            e(et(p), u, c);
          }), f && t ? t(p, u) : e(p, u, c), s = !0, l._container = u, u.__vue_app__ = l, {}.NODE_ENV !== "production" && (l._instance = p.component, Fu(l, da)), Ei(p.component) || p.component.proxy;
        }
      },
      unmount() {
        s ? (e(null, l._container), {}.NODE_ENV !== "production" && (l._instance = null, Lu(l)), delete l._container.__vue_app__) : {}.NODE_ENV !== "production" && P("Cannot unmount an app that is not mounted.");
      },
      provide(u, f) {
        return {}.NODE_ENV !== "production" && u in i.provides && P(`App already provides property with key "${String(u)}". It will be overwritten with the new value.`), i.provides[u] = f, l;
      }
    };
    return l;
  };
}
function Po(e, t, n, r, o = !1) {
  if (G(e)) {
    e.forEach((p, g) => Po(p, t && (G(t) ? t[g] : t), n, r, o));
    return;
  }
  if (pr(r) && !o)
    return;
  const i = r.shapeFlag & 4 ? Ei(r.component) || r.component.proxy : r.el, a = o ? null : i, { i: s, r: l } = e;
  if ({}.NODE_ENV !== "production" && !s) {
    P("Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.");
    return;
  }
  const u = t && t.r, f = s.refs === ie ? s.refs = {} : s.refs, c = s.setupState;
  if (u != null && u !== l && (he(u) ? (f[u] = null, X(c, u) && (c[u] = null)) : ye(u) && (u.value = null)), Z(l))
    lt(l, s, 12, [a, f]);
  else {
    const p = he(l), g = ye(l);
    if (p || g) {
      const v = () => {
        if (e.f) {
          const E = p ? X(c, l) ? c[l] : f[l] : l.value;
          o ? G(E) && ei(E, i) : G(E) ? E.includes(i) || E.push(i) : p ? (f[l] = [i], X(c, l) && (c[l] = f[l])) : (l.value = [i], e.k && (f[e.k] = l.value));
        } else
          p ? (f[l] = a, X(c, l) && (c[l] = a)) : g ? (l.value = a, e.k && (f[e.k] = a)) : {}.NODE_ENV !== "production" && P("Invalid template ref type:", l, `(${typeof l})`);
      };
      a ? (v.id = -1, Ae(v, n)) : v();
    } else
      ({}).NODE_ENV !== "production" && P("Invalid template ref type:", l, `(${typeof l})`);
  }
}
let _n, vt;
function it(e, t) {
  e.appContext.config.performance && wr() && vt.mark(`vue-${t}-${e.uid}`), {}.NODE_ENV !== "production" && Uu(e, t, wr() ? vt.now() : Date.now());
}
function at(e, t) {
  if (e.appContext.config.performance && wr()) {
    const n = `vue-${t}-${e.uid}`, r = n + ":end";
    vt.mark(r), vt.measure(`<${Kr(e, e.type)}> ${t}`, n, r), vt.clearMarks(n), vt.clearMarks(r);
  }
  ({}).NODE_ENV !== "production" && zu(e, t, wr() ? vt.now() : Date.now());
}
function wr() {
  return _n !== void 0 || (typeof window < "u" && window.performance ? (_n = !0, vt = window.performance) : _n = !1), _n;
}
function jf() {
  const e = [];
  if ({}.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(`Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
  }
}
const Ae = Xu;
function Vf(e) {
  return kf(e);
}
function kf(e, t) {
  jf();
  const n = ws();
  n.__VUE__ = !0, {}.NODE_ENV !== "production" && Qs(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const { insert: r, remove: o, patchProp: i, createElement: a, createText: s, createComment: l, setText: u, setElementText: f, parentNode: c, nextSibling: p, setScopeId: g = be, insertStaticContent: v } = e, E = (d, h, m, O = null, _ = null, T = null, I = !1, x = null, $ = {}.NODE_ENV !== "production" && _t ? !1 : !!h.dynamicChildren) => {
    if (d === h)
      return;
    d && !At(d, h) && (O = Ke(d), se(d, _, T, !0), d = null), h.patchFlag === -2 && ($ = !1, h.dynamicChildren = null);
    const { type: N, ref: z, shapeFlag: U } = h;
    switch (N) {
      case hn:
        F(d, h, m, O);
        break;
      case Ce:
        L(d, h, m, O);
        break;
      case hr:
        d == null ? A(h, m, O, I) : {}.NODE_ENV !== "production" && W(d, h, m, I);
        break;
      case Te:
        b(d, h, m, O, _, T, I, x, $);
        break;
      default:
        U & 1 ? C(d, h, m, O, _, T, I, x, $) : U & 6 ? y(d, h, m, O, _, T, I, x, $) : U & 64 || U & 128 ? N.process(d, h, m, O, _, T, I, x, $, Wt) : {}.NODE_ENV !== "production" && P("Invalid VNode type:", N, `(${typeof N})`);
    }
    z != null && _ && Po(z, d && d.ref, T, h || d, !h);
  }, F = (d, h, m, O) => {
    if (d == null)
      r(h.el = s(h.children), m, O);
    else {
      const _ = h.el = d.el;
      h.children !== d.children && u(_, h.children);
    }
  }, L = (d, h, m, O) => {
    d == null ? r(h.el = l(h.children || ""), m, O) : h.el = d.el;
  }, A = (d, h, m, O) => {
    [d.el, d.anchor] = v(d.children, h, m, O, d.el, d.anchor);
  }, W = (d, h, m, O) => {
    if (h.children !== d.children) {
      const _ = p(d.anchor);
      R(d), [h.el, h.anchor] = v(h.children, m, _, O);
    } else
      h.el = d.el, h.anchor = d.anchor;
  }, K = ({ el: d, anchor: h }, m, O) => {
    let _;
    for (; d && d !== h; )
      _ = p(d), r(d, m, O), d = _;
    r(h, m, O);
  }, R = ({ el: d, anchor: h }) => {
    let m;
    for (; d && d !== h; )
      m = p(d), o(d), d = m;
    o(h);
  }, C = (d, h, m, O, _, T, I, x, $) => {
    I = I || h.type === "svg", d == null ? D(h, m, O, _, T, I, x, $) : q(d, h, _, T, I, x, $);
  }, D = (d, h, m, O, _, T, I, x) => {
    let $, N;
    const { type: z, props: U, shapeFlag: Y, transition: J, dirs: ne } = d;
    if ($ = d.el = a(d.type, T, U && U.is, U), Y & 8 ? f($, d.children) : Y & 16 && V(d.children, $, null, O, _, T && z !== "foreignObject", I, x), ne && wt(d, null, O, "created"), U) {
      for (const le in U)
        le !== "value" && !ur(le) && i($, le, null, U[le], T, d.children, O, _, $e);
      "value" in U && i($, "value", null, U.value), (N = U.onVnodeBeforeMount) && Ye(N, O, d);
    }
    S($, d, d.scopeId, I, O), {}.NODE_ENV !== "production" && (Object.defineProperty($, "__vnode", {
      value: d,
      enumerable: !1
    }), Object.defineProperty($, "__vueParentComponent", {
      value: O,
      enumerable: !1
    })), ne && wt(d, null, O, "beforeMount");
    const ce = (!_ || _ && !_.pendingBranch) && J && !J.persisted;
    ce && J.beforeEnter($), r($, h, m), ((N = U && U.onVnodeMounted) || ce || ne) && Ae(() => {
      N && Ye(N, O, d), ce && J.enter($), ne && wt(d, null, O, "mounted");
    }, _);
  }, S = (d, h, m, O, _) => {
    if (m && g(d, m), O)
      for (let T = 0; T < O.length; T++)
        g(d, O[T]);
    if (_) {
      let T = _.subTree;
      if ({}.NODE_ENV !== "production" && T.patchFlag > 0 && T.patchFlag & 2048 && (T = ol(T.children) || T), h === T) {
        const I = _.vnode;
        S(d, I, I.scopeId, I.slotScopeIds, _.parent);
      }
    }
  }, V = (d, h, m, O, _, T, I, x, $ = 0) => {
    for (let N = $; N < d.length; N++) {
      const z = d[N] = x ? mt(d[N]) : Be(d[N]);
      E(null, z, h, m, O, _, T, I, x);
    }
  }, q = (d, h, m, O, _, T, I) => {
    const x = h.el = d.el;
    let { patchFlag: $, dynamicChildren: N, dirs: z } = h;
    $ |= d.patchFlag & 16;
    const U = d.props || ie, Y = h.props || ie;
    let J;
    m && xt(m, !1), (J = Y.onVnodeBeforeUpdate) && Ye(J, m, h, d), z && wt(h, d, m, "beforeUpdate"), m && xt(m, !0), {}.NODE_ENV !== "production" && _t && ($ = 0, I = !1, N = null);
    const ne = _ && h.type !== "foreignObject";
    if (N ? (ee(d.dynamicChildren, N, x, m, O, ne, T), {}.NODE_ENV !== "production" && m && m.type.__hmrId && Pn(d, h)) : I || re(d, h, x, null, m, O, ne, T, !1), $ > 0) {
      if ($ & 16)
        j(x, h, U, Y, m, O, _);
      else if ($ & 2 && U.class !== Y.class && i(x, "class", null, Y.class, _), $ & 4 && i(x, "style", U.style, Y.style, _), $ & 8) {
        const ce = h.dynamicProps;
        for (let le = 0; le < ce.length; le++) {
          const pe = ce[le], Re = U[pe], Kt = Y[pe];
          (Kt !== Re || pe === "value") && i(x, pe, Re, Kt, _, d.children, m, O, $e);
        }
      }
      $ & 1 && d.children !== h.children && f(x, h.children);
    } else
      !I && N == null && j(x, h, U, Y, m, O, _);
    ((J = Y.onVnodeUpdated) || z) && Ae(() => {
      J && Ye(J, m, h, d), z && wt(h, d, m, "updated");
    }, O);
  }, ee = (d, h, m, O, _, T, I) => {
    for (let x = 0; x < h.length; x++) {
      const $ = d[x], N = h[x], z = $.el && ($.type === Te || !At($, N) || $.shapeFlag & 70) ? c($.el) : m;
      E($, N, z, null, O, _, T, I, !0);
    }
  }, j = (d, h, m, O, _, T, I) => {
    if (m !== O) {
      if (m !== ie)
        for (const x in m)
          !ur(x) && !(x in O) && i(d, x, m[x], null, I, h.children, _, T, $e);
      for (const x in O) {
        if (ur(x))
          continue;
        const $ = O[x], N = m[x];
        $ !== N && x !== "value" && i(d, x, N, $, I, h.children, _, T, $e);
      }
      "value" in O && i(d, "value", m.value, O.value);
    }
  }, b = (d, h, m, O, _, T, I, x, $) => {
    const N = h.el = d ? d.el : s(""), z = h.anchor = d ? d.anchor : s("");
    let { patchFlag: U, dynamicChildren: Y, slotScopeIds: J } = h;
    ({}).NODE_ENV !== "production" && (_t || U & 2048) && (U = 0, $ = !1, Y = null), J && (x = x ? x.concat(J) : J), d == null ? (r(N, m, O), r(z, m, O), V(h.children, m, z, _, T, I, x, $)) : U > 0 && U & 64 && Y && d.dynamicChildren ? (ee(d.dynamicChildren, Y, m, _, T, I, x), {}.NODE_ENV !== "production" && _ && _.type.__hmrId ? Pn(d, h) : (h.key != null || _ && h === _.subTree) && Pn(d, h, !0)) : re(d, h, m, z, _, T, I, x, $);
  }, y = (d, h, m, O, _, T, I, x, $) => {
    h.slotScopeIds = x, d == null ? h.shapeFlag & 512 ? _.ctx.activate(h, m, O, I, $) : H(h, m, O, _, T, I, $) : B(d, h, $);
  }, H = (d, h, m, O, _, T, I) => {
    const x = d.component = Xf(d, O, _);
    if ({}.NODE_ENV !== "production" && x.type.__hmrId && Mu(x), {}.NODE_ENV !== "production" && (fr(d), it(x, "mount")), Yn(d) && (x.ctx.renderer = Wt), {}.NODE_ENV !== "production" && it(x, "init"), td(x), {}.NODE_ENV !== "production" && at(x, "init"), x.asyncDep) {
      if (_ && _.registerDep(x, M), !d.el) {
        const $ = x.subTree = w(Ce);
        L(null, $, h, m);
      }
      return;
    }
    M(x, d, h, m, _, T, I), {}.NODE_ENV !== "production" && (dr(), at(x, "mount"));
  }, B = (d, h, m) => {
    const O = h.component = d.component;
    if (Ju(d, h, m))
      if (O.asyncDep && !O.asyncResolved) {
        ({}).NODE_ENV !== "production" && fr(h), k(O, h, m), {}.NODE_ENV !== "production" && dr();
        return;
      } else
        O.next = h, $u(O.update), O.update();
    else
      h.el = d.el, O.vnode = h;
  }, M = (d, h, m, O, _, T, I) => {
    const x = () => {
      if (d.isMounted) {
        let { next: z, bu: U, u: Y, parent: J, vnode: ne } = d, ce = z, le;
        ({}).NODE_ENV !== "production" && fr(z || d.vnode), xt(d, !1), z ? (z.el = ne.el, k(d, z, I)) : z = ne, U && bn(U), (le = z.props && z.props.onVnodeBeforeUpdate) && Ye(le, J, z, ne), xt(d, !0), {}.NODE_ENV !== "production" && it(d, "render");
        const pe = Zr(d);
        ({}).NODE_ENV !== "production" && at(d, "render");
        const Re = d.subTree;
        d.subTree = pe, {}.NODE_ENV !== "production" && it(d, "patch"), E(
          Re,
          pe,
          c(Re.el),
          Ke(Re),
          d,
          _,
          T
        ), {}.NODE_ENV !== "production" && at(d, "patch"), z.el = pe.el, ce === null && Zu(d, pe.el), Y && Ae(Y, _), (le = z.props && z.props.onVnodeUpdated) && Ae(() => Ye(le, J, z, ne), _), {}.NODE_ENV !== "production" && Xs(d), {}.NODE_ENV !== "production" && dr();
      } else {
        let z;
        const { el: U, props: Y } = h, { bm: J, m: ne, parent: ce } = d, le = pr(h);
        if (xt(d, !1), J && bn(J), !le && (z = Y && Y.onVnodeBeforeMount) && Ye(z, ce, h), xt(d, !0), U && Gr) {
          const pe = () => {
            ({}).NODE_ENV !== "production" && it(d, "render"), d.subTree = Zr(d), {}.NODE_ENV !== "production" && at(d, "render"), {}.NODE_ENV !== "production" && it(d, "hydrate"), Gr(U, d.subTree, d, _, null), {}.NODE_ENV !== "production" && at(d, "hydrate");
          };
          le ? h.type.__asyncLoader().then(
            () => !d.isUnmounted && pe()
          ) : pe();
        } else {
          ({}).NODE_ENV !== "production" && it(d, "render");
          const pe = d.subTree = Zr(d);
          ({}).NODE_ENV !== "production" && at(d, "render"), {}.NODE_ENV !== "production" && it(d, "patch"), E(null, pe, m, O, d, _, T), {}.NODE_ENV !== "production" && at(d, "patch"), h.el = pe.el;
        }
        if (ne && Ae(ne, _), !le && (z = Y && Y.onVnodeMounted)) {
          const pe = h;
          Ae(() => Ye(z, ce, pe), _);
        }
        (h.shapeFlag & 256 || ce && pr(ce.vnode) && ce.vnode.shapeFlag & 256) && d.a && Ae(d.a, _), d.isMounted = !0, {}.NODE_ENV !== "production" && Ru(d), h = m = O = null;
      }
    }, $ = d.effect = new ii(
      x,
      () => Lr(N),
      d.scope
    ), N = d.update = () => $.run();
    N.id = d.uid, xt(d, !0), {}.NODE_ENV !== "production" && ($.onTrack = d.rtc ? (z) => bn(d.rtc, z) : void 0, $.onTrigger = d.rtg ? (z) => bn(d.rtg, z) : void 0, N.ownerInstance = d), N();
  }, k = (d, h, m) => {
    h.component = d;
    const O = d.vnode.props;
    d.vnode = h, d.next = null, Nf(d, h.props, O, m), $f(d, h.children, m), Ht(), Gi(), Bt();
  }, re = (d, h, m, O, _, T, I, x, $ = !1) => {
    const N = d && d.children, z = d ? d.shapeFlag : 0, U = h.children, { patchFlag: Y, shapeFlag: J } = h;
    if (Y > 0) {
      if (Y & 128) {
        ge(N, U, m, O, _, T, I, x, $);
        return;
      } else if (Y & 256) {
        me(N, U, m, O, _, T, I, x, $);
        return;
      }
    }
    J & 8 ? (z & 16 && $e(N, _, T), U !== N && f(m, U)) : z & 16 ? J & 16 ? ge(N, U, m, O, _, T, I, x, $) : $e(N, _, T, !0) : (z & 8 && f(m, ""), J & 16 && V(U, m, O, _, T, I, x, $));
  }, me = (d, h, m, O, _, T, I, x, $) => {
    d = d || tn, h = h || tn;
    const N = d.length, z = h.length, U = Math.min(N, z);
    let Y;
    for (Y = 0; Y < U; Y++) {
      const J = h[Y] = $ ? mt(h[Y]) : Be(h[Y]);
      E(d[Y], J, m, null, _, T, I, x, $);
    }
    N > z ? $e(d, _, T, !0, !1, U) : V(h, m, O, _, T, I, x, $, U);
  }, ge = (d, h, m, O, _, T, I, x, $) => {
    let N = 0;
    const z = h.length;
    let U = d.length - 1, Y = z - 1;
    for (; N <= U && N <= Y; ) {
      const J = d[N], ne = h[N] = $ ? mt(h[N]) : Be(h[N]);
      if (At(J, ne))
        E(J, ne, m, null, _, T, I, x, $);
      else
        break;
      N++;
    }
    for (; N <= U && N <= Y; ) {
      const J = d[U], ne = h[Y] = $ ? mt(h[Y]) : Be(h[Y]);
      if (At(J, ne))
        E(J, ne, m, null, _, T, I, x, $);
      else
        break;
      U--, Y--;
    }
    if (N > U) {
      if (N <= Y) {
        const J = Y + 1, ne = J < z ? h[J].el : O;
        for (; N <= Y; )
          E(null, h[N] = $ ? mt(h[N]) : Be(h[N]), m, ne, _, T, I, x, $), N++;
      }
    } else if (N > Y)
      for (; N <= U; )
        se(d[N], _, T, !0), N++;
    else {
      const J = N, ne = N, ce = /* @__PURE__ */ new Map();
      for (N = ne; N <= Y; N++) {
        const Ne = h[N] = $ ? mt(h[N]) : Be(h[N]);
        Ne.key != null && ({}.NODE_ENV !== "production" && ce.has(Ne.key) && P("Duplicate keys found during update:", JSON.stringify(Ne.key), "Make sure keys are unique."), ce.set(Ne.key, N));
      }
      let le, pe = 0;
      const Re = Y - ne + 1;
      let Kt = !1, Fi = 0;
      const yn = new Array(Re);
      for (N = 0; N < Re; N++)
        yn[N] = 0;
      for (N = J; N <= U; N++) {
        const Ne = d[N];
        if (pe >= Re) {
          se(Ne, _, T, !0);
          continue;
        }
        let qe;
        if (Ne.key != null)
          qe = ce.get(Ne.key);
        else
          for (le = ne; le <= Y; le++)
            if (yn[le - ne] === 0 && At(Ne, h[le])) {
              qe = le;
              break;
            }
        qe === void 0 ? se(Ne, _, T, !0) : (yn[qe - ne] = N + 1, qe >= Fi ? Fi = qe : Kt = !0, E(Ne, h[qe], m, null, _, T, I, x, $), pe++);
      }
      const Li = Kt ? Ff(yn) : tn;
      for (le = Li.length - 1, N = Re - 1; N >= 0; N--) {
        const Ne = ne + N, qe = h[Ne], Ri = Ne + 1 < z ? h[Ne + 1].el : O;
        yn[N] === 0 ? E(null, qe, m, Ri, _, T, I, x, $) : Kt && (le < 0 || N !== Li[le] ? te(qe, m, Ri, 2) : le--);
      }
    }
  }, te = (d, h, m, O, _ = null) => {
    const { el: T, type: I, transition: x, children: $, shapeFlag: N } = d;
    if (N & 6) {
      te(d.component.subTree, h, m, O);
      return;
    }
    if (N & 128) {
      d.suspense.move(h, m, O);
      return;
    }
    if (N & 64) {
      I.move(d, h, m, Wt);
      return;
    }
    if (I === Te) {
      r(T, h, m);
      for (let U = 0; U < $.length; U++)
        te($[U], h, m, O);
      r(d.anchor, h, m);
      return;
    }
    if (I === hr) {
      K(d, h, m);
      return;
    }
    if (O !== 2 && N & 1 && x)
      if (O === 0)
        x.beforeEnter(T), r(T, h, m), Ae(() => x.enter(T), _);
      else {
        const { leave: U, delayLeave: Y, afterLeave: J } = x, ne = () => r(T, h, m), ce = () => {
          U(T, () => {
            ne(), J && J();
          });
        };
        Y ? Y(T, ne, ce) : ce();
      }
    else
      r(T, h, m);
  }, se = (d, h, m, O = !1, _ = !1) => {
    const { type: T, props: I, ref: x, children: $, dynamicChildren: N, shapeFlag: z, patchFlag: U, dirs: Y } = d;
    if (x != null && Po(x, null, m, d, !0), z & 256) {
      h.ctx.deactivate(d);
      return;
    }
    const J = z & 1 && Y, ne = !pr(d);
    let ce;
    if (ne && (ce = I && I.onVnodeBeforeUnmount) && Ye(ce, h, d), z & 6)
      Zn(d.component, m, O);
    else {
      if (z & 128) {
        d.suspense.unmount(m, O);
        return;
      }
      J && wt(d, null, h, "beforeUnmount"), z & 64 ? d.type.remove(d, h, m, _, Wt, O) : N && (T !== Te || U > 0 && U & 64) ? $e(N, h, m, !1, !0) : (T === Te && U & 384 || !_ && z & 16) && $e($, h, m), O && Pe(d);
    }
    (ne && (ce = I && I.onVnodeUnmounted) || J) && Ae(() => {
      ce && Ye(ce, h, d), J && wt(d, null, h, "unmounted");
    }, m);
  }, Pe = (d) => {
    const { type: h, el: m, anchor: O, transition: _ } = d;
    if (h === Te) {
      ({}).NODE_ENV !== "production" && d.patchFlag > 0 && d.patchFlag & 2048 && _ && !_.persisted ? d.children.forEach((I) => {
        I.type === Ce ? o(I.el) : Pe(I);
      }) : Jn(m, O);
      return;
    }
    if (h === hr) {
      R(d);
      return;
    }
    const T = () => {
      o(m), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (d.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: I, delayLeave: x } = _, $ = () => I(m, T);
      x ? x(d.el, T, $) : $();
    } else
      T();
  }, Jn = (d, h) => {
    let m;
    for (; d !== h; )
      m = p(d), o(d), d = m;
    o(h);
  }, Zn = (d, h, m) => {
    ({}).NODE_ENV !== "production" && d.type.__hmrId && ju(d);
    const { bum: O, scope: _, update: T, subTree: I, um: x } = d;
    O && bn(O), _.stop(), T && (T.active = !1, se(I, d, h, m)), x && Ae(x, h), Ae(() => {
      d.isUnmounted = !0;
    }, h), h && h.pendingBranch && !h.isUnmounted && d.asyncDep && !d.asyncResolved && d.suspenseId === h.pendingId && (h.deps--, h.deps === 0 && h.resolve()), {}.NODE_ENV !== "production" && Bu(d);
  }, $e = (d, h, m, O = !1, _ = !1, T = 0) => {
    for (let I = T; I < d.length; I++)
      se(d[I], h, m, O, _);
  }, Ke = (d) => d.shapeFlag & 6 ? Ke(d.component.subTree) : d.shapeFlag & 128 ? d.suspense.next() : p(d.anchor || d.el), ki = (d, h, m) => {
    d == null ? h._vnode && se(h._vnode, null, null, !0) : E(h._vnode || null, d, h, null, null, null, m), Gi(), Gs(), h._vnode = d;
  }, Wt = {
    p: E,
    um: se,
    m: te,
    r: Pe,
    mt: H,
    mc: V,
    pc: re,
    pbc: ee,
    n: Ke,
    o: e
  };
  let Yr, Gr;
  return t && ([Yr, Gr] = t(Wt)), {
    render: ki,
    hydrate: Yr,
    createApp: Mf(ki, Yr)
  };
}
function xt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Pn(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (G(r) && G(o))
    for (let i = 0; i < r.length; i++) {
      const a = r[i];
      let s = o[i];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = o[i] = mt(o[i]), s.el = a.el), n || Pn(a, s)), {}.NODE_ENV !== "production" && s.type === Ce && !s.el && (s.el = a.el);
    }
}
function Ff(e) {
  const t = e.slice(), n = [0];
  let r, o, i, a, s;
  const l = e.length;
  for (r = 0; r < l; r++) {
    const u = e[r];
    if (u !== 0) {
      if (o = n[n.length - 1], e[o] < u) {
        t[r] = o, n.push(r);
        continue;
      }
      for (i = 0, a = n.length - 1; i < a; )
        s = i + a >> 1, e[n[s]] < u ? i = s + 1 : a = s;
      u < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r);
    }
  }
  for (i = n.length, a = n[i - 1]; i-- > 0; )
    n[i] = a, a = t[a];
  return n;
}
const Lf = (e) => e.__isTeleport, rn = (e) => e && (e.disabled || e.disabled === ""), la = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Ao = (e, t) => {
  const n = e && e.to;
  if (he(n))
    if (t) {
      const r = t(n);
      return r || {}.NODE_ENV !== "production" && P(`Failed to locate Teleport target with selector "${n}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`), r;
    } else
      return {}.NODE_ENV !== "production" && P("Current renderer does not support string target for Teleports. (missing querySelector renderer option)"), null;
  else
    return {}.NODE_ENV !== "production" && !n && !rn(e) && P(`Invalid Teleport target: ${n}`), n;
}, Rf = {
  __isTeleport: !0,
  process(e, t, n, r, o, i, a, s, l, u) {
    const { mc: f, pc: c, pbc: p, o: { insert: g, querySelector: v, createText: E, createComment: F } } = u, L = rn(t.props);
    let { shapeFlag: A, children: W, dynamicChildren: K } = t;
    if ({}.NODE_ENV !== "production" && _t && (l = !1, K = null), e == null) {
      const R = t.el = {}.NODE_ENV !== "production" ? F("teleport start") : E(""), C = t.anchor = {}.NODE_ENV !== "production" ? F("teleport end") : E("");
      g(R, n, r), g(C, n, r);
      const D = t.target = Ao(t.props, v), S = t.targetAnchor = E("");
      D ? (g(S, D), a = a || la(D)) : {}.NODE_ENV !== "production" && !L && P("Invalid Teleport target on mount:", D, `(${typeof D})`);
      const V = (q, ee) => {
        A & 16 && f(W, q, ee, o, i, a, s, l);
      };
      L ? V(n, C) : D && V(D, S);
    } else {
      t.el = e.el;
      const R = t.anchor = e.anchor, C = t.target = e.target, D = t.targetAnchor = e.targetAnchor, S = rn(e.props), V = S ? n : C, q = S ? R : D;
      if (a = a || la(C), K ? (p(e.dynamicChildren, K, V, o, i, a, s), Pn(e, t, !0)) : l || c(e, t, V, q, o, i, a, s, !1), L)
        S || rr(t, n, R, u, 1);
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const ee = t.target = Ao(t.props, v);
        ee ? rr(t, ee, null, u, 0) : {}.NODE_ENV !== "production" && P("Invalid Teleport target on update:", C, `(${typeof C})`);
      } else
        S && rr(t, C, D, u, 1);
    }
  },
  remove(e, t, n, r, { um: o, o: { remove: i } }, a) {
    const { shapeFlag: s, children: l, anchor: u, targetAnchor: f, target: c, props: p } = e;
    if (c && i(f), (a || !rn(p)) && (i(u), s & 16))
      for (let g = 0; g < l.length; g++) {
        const v = l[g];
        o(v, t, n, !0, !!v.dynamicChildren);
      }
  },
  move: rr,
  hydrate: Hf
};
function rr(e, t, n, { o: { insert: r }, m: o }, i = 2) {
  i === 0 && r(e.targetAnchor, t, n);
  const { el: a, anchor: s, shapeFlag: l, children: u, props: f } = e, c = i === 2;
  if (c && r(a, t, n), (!c || rn(f)) && l & 16)
    for (let p = 0; p < u.length; p++)
      o(u[p], t, n, 2);
  c && r(s, t, n);
}
function Hf(e, t, n, r, o, i, { o: { nextSibling: a, parentNode: s, querySelector: l } }, u) {
  const f = t.target = Ao(t.props, l);
  if (f) {
    const c = f._lpa || f.firstChild;
    if (t.shapeFlag & 16)
      if (rn(t.props))
        t.anchor = u(a(e), t, s(e), n, r, o, i), t.targetAnchor = c;
      else {
        t.anchor = a(e);
        let p = c;
        for (; p; )
          if (p = a(p), p && p.nodeType === 8 && p.data === "teleport anchor") {
            t.targetAnchor = p, f._lpa = t.targetAnchor && a(t.targetAnchor);
            break;
          }
        u(c, t, f, n, r, o, i);
      }
  }
  return t.anchor && a(t.anchor);
}
const Bf = Rf, Te = Symbol({}.NODE_ENV !== "production" ? "Fragment" : void 0), hn = Symbol({}.NODE_ENV !== "production" ? "Text" : void 0), Ce = Symbol({}.NODE_ENV !== "production" ? "Comment" : void 0), hr = Symbol({}.NODE_ENV !== "production" ? "Static" : void 0), An = [];
let Ue = null;
function Uf(e = !1) {
  An.push(Ue = e ? null : []);
}
function zf() {
  An.pop(), Ue = An[An.length - 1] || null;
}
let Hn = 1;
function ca(e) {
  Hn += e;
}
function Wf(e) {
  return e.dynamicChildren = Hn > 0 ? Ue || tn : null, zf(), Hn > 0 && Ue && Ue.push(e), e;
}
function Kf(e, t, n, r, o) {
  return Wf(w(e, t, n, r, o, !0));
}
function ln(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function At(e, t) {
  return {}.NODE_ENV !== "production" && t.shapeFlag & 6 && qt.has(t.type) ? !1 : e.type === t.type && e.key === t.key;
}
const qf = (...e) => El(...e), Wr = "__vInternal", _l = ({ key: e }) => e != null ? e : null, gr = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? he(e) || ye(e) || Z(e) ? { i: Fe, r: e, k: t, f: !!n } : e : null;
function Yf(e, t = null, n = null, r = 0, o = null, i = e === Te ? 0 : 1, a = !1, s = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && _l(t),
    ref: t && gr(t),
    scopeId: nl,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null
  };
  return s ? (bi(l, n), i & 128 && e.normalize(l)) : n && (l.shapeFlag |= he(n) ? 8 : 16), {}.NODE_ENV !== "production" && l.key !== l.key && P("VNode created with invalid key (NaN). VNode type:", l.type), Hn > 0 && !a && Ue && (l.patchFlag > 0 || i & 6) && l.patchFlag !== 32 && Ue.push(l), l;
}
const w = {}.NODE_ENV !== "production" ? qf : El;
function El(e, t = null, n = null, r = 0, o = null, i = !1) {
  if ((!e || e === df) && ({}.NODE_ENV !== "production" && !e && P(`Invalid vnode type when creating vnode: ${e}.`), e = Ce), ln(e)) {
    const s = et(e, t, !0);
    return n && bi(s, n), Hn > 0 && !i && Ue && (s.shapeFlag & 6 ? Ue[Ue.indexOf(e)] = s : Ue.push(s)), s.patchFlag |= -2, s;
  }
  if (Tl(e) && (e = e.__vccOpts), t) {
    t = Gf(t);
    let { class: s, style: l } = t;
    s && !he(s) && (t.class = Xo(s)), ae(l) && (_o(l) && !G(l) && (l = de({}, l)), t.style = Qo(l));
  }
  const a = he(e) ? 1 : Qu(e) ? 128 : Lf(e) ? 64 : ae(e) ? 4 : Z(e) ? 2 : 0;
  return {}.NODE_ENV !== "production" && a & 4 && _o(e) && (e = Q(e), P("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), Yf(e, t, n, r, o, a, i, !0);
}
function Gf(e) {
  return e ? _o(e) || Wr in e ? de({}, e) : e : null;
}
function et(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: i, children: a } = e, s = t ? Jf(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: s,
    key: s && _l(s),
    ref: t && t.ref ? n && o ? G(o) ? o.concat(gr(t)) : [o, gr(t)] : gr(t) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: {}.NODE_ENV !== "production" && i === -1 && G(a) ? a.map(Ol) : a,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Te ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && et(e.ssContent),
    ssFallback: e.ssFallback && et(e.ssFallback),
    el: e.el,
    anchor: e.anchor
  };
}
function Ol(e) {
  const t = et(e);
  return G(e.children) && (t.children = e.children.map(Ol)), t;
}
function Cl(e = " ", t = 0) {
  return w(hn, null, e, t);
}
function Be(e) {
  return e == null || typeof e == "boolean" ? w(Ce) : G(e) ? w(
    Te,
    null,
    e.slice()
  ) : typeof e == "object" ? mt(e) : w(hn, null, String(e));
}
function mt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : et(e);
}
function bi(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (G(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), bi(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(Wr in t) ? t._ctx = Fe : o === 3 && Fe && (Fe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    Z(t) ? (t = { default: t, _ctx: Fe }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Cl(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Jf(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Xo([t.class, r.class]));
      else if (o === "style")
        t.style = Qo([t.style, r.style]);
      else if (Kn(o)) {
        const i = t[o], a = r[o];
        a && i !== a && !(G(i) && i.includes(a)) && (t[o] = i ? [].concat(i, a) : a);
      } else
        o !== "" && (t[o] = r[o]);
  }
  return t;
}
function Ye(e, t, n, r = null) {
  Le(e, t, 7, [
    n,
    r
  ]);
}
const Zf = bl();
let Qf = 0;
function Xf(e, t, n) {
  const r = e.type, o = (t ? t.appContext : e.appContext) || Zf, i = {
    uid: Qf++,
    vnode: e,
    type: r,
    parent: t,
    appContext: o,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new Wc(!0),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: hl(r, o),
    emitsOptions: tl(r, o),
    emit: null,
    emitted: null,
    propsDefaults: ie,
    inheritAttrs: r.inheritAttrs,
    ctx: ie,
    data: ie,
    props: ie,
    attrs: ie,
    slots: ie,
    refs: ie,
    setupState: ie,
    setupContext: null,
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return {}.NODE_ENV !== "production" ? i.ctx = pf(i) : i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Ku.bind(null, i), e.ce && e.ce(i), i;
}
let ve = null;
const _i = () => ve || Fe, cn = (e) => {
  ve = e, e.scope.on();
}, Ft = () => {
  ve && ve.scope.off(), ve = null;
}, ed = /* @__PURE__ */ dn("slot,component");
function Do(e, t) {
  const n = t.isNativeTag || _s;
  (ed(e) || n(e)) && P("Do not use built-in or reserved HTML elements as component id: " + e);
}
function Nl(e) {
  return e.vnode.shapeFlag & 4;
}
let Bn = !1;
function td(e, t = !1) {
  Bn = t;
  const { props: n, children: r } = e.vnode, o = Nl(e);
  Of(e, n, o, t), Df(e, r);
  const i = o ? nd(e, t) : void 0;
  return Bn = !1, i;
}
function nd(e, t) {
  var n;
  const r = e.type;
  if ({}.NODE_ENV !== "production") {
    if (r.name && Do(r.name, e.appContext.config), r.components) {
      const i = Object.keys(r.components);
      for (let a = 0; a < i.length; a++)
        Do(i[a], e.appContext.config);
    }
    if (r.directives) {
      const i = Object.keys(r.directives);
      for (let a = 0; a < i.length; a++)
        ul(i[a]);
    }
    r.compilerOptions && rd() && P('"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.');
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Ls(new Proxy(e.ctx, fl)), {}.NODE_ENV !== "production" && hf(e);
  const { setup: o } = r;
  if (o) {
    const i = e.setupContext = o.length > 1 ? od(e) : null;
    cn(e), Ht();
    const a = lt(o, e, 0, [{}.NODE_ENV !== "production" ? Qt(e.props) : e.props, i]);
    if (Bt(), Ft(), ni(a)) {
      if (a.then(Ft, Ft), t)
        return a.then((s) => {
          ua(e, s, t);
        }).catch((s) => {
          kr(s, e, 0);
        });
      if (e.asyncDep = a, {}.NODE_ENV !== "production" && !e.suspense) {
        const s = (n = r.name) !== null && n !== void 0 ? n : "Anonymous";
        P(`Component <${s}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
      }
    } else
      ua(e, a, t);
  } else
    wl(e, t);
}
function ua(e, t, n) {
  Z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ae(t) ? ({}.NODE_ENV !== "production" && ln(t) && P("setup() should not return VNodes directly - return a render function instead."), {}.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Us(t), {}.NODE_ENV !== "production" && gf(e)) : {}.NODE_ENV !== "production" && t !== void 0 && P(`setup() should return an object. Received: ${t === null ? "null" : typeof t}`), wl(e, n);
}
let $o;
const rd = () => !$o;
function wl(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && $o && !r.render) {
      const o = r.template || vi(e).template;
      if (o) {
        ({}).NODE_ENV !== "production" && it(e, "compile");
        const { isCustomElement: i, compilerOptions: a } = e.appContext.config, { delimiters: s, compilerOptions: l } = r, u = de(de({
          isCustomElement: i,
          delimiters: s
        }, a), l);
        r.render = $o(o, u), {}.NODE_ENV !== "production" && at(e, "compile");
      }
    }
    e.render = r.render || be;
  }
  cn(e), Ht(), vf(e), Bt(), Ft(), {}.NODE_ENV !== "production" && !r.render && e.render === be && !t && (r.template ? P('Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".') : P("Component is missing template or render function."));
}
function fa(e) {
  return new Proxy(e.attrs, {}.NODE_ENV !== "production" ? {
    get(t, n) {
      return Cr(), De(e, "get", "$attrs"), t[n];
    },
    set() {
      return P("setupContext.attrs is readonly."), !1;
    },
    deleteProperty() {
      return P("setupContext.attrs is readonly."), !1;
    }
  } : {
    get(t, n) {
      return De(e, "get", "$attrs"), t[n];
    }
  });
}
function od(e) {
  const t = (r) => {
    ({}).NODE_ENV !== "production" && e.exposed && P("expose() should be called only once per setup()."), e.exposed = r || {};
  };
  let n;
  return {}.NODE_ENV !== "production" ? Object.freeze({
    get attrs() {
      return n || (n = fa(e));
    },
    get slots() {
      return Qt(e.slots);
    },
    get emit() {
      return (r, ...o) => e.emit(r, ...o);
    },
    expose: t
  }) : {
    get attrs() {
      return n || (n = fa(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ei(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Us(Ls(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in sn)
          return sn[n](e);
      }
    }));
}
const id = /(?:^|[-_])(\w)/g, ad = (e) => e.replace(id, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function xl(e, t = !0) {
  return Z(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Kr(e, t, n = !1) {
  let r = xl(t);
  if (!r && t.__file) {
    const o = t.__file.match(/([^/\\]+)\.\w+$/);
    o && (r = o[1]);
  }
  if (!r && e && e.parent) {
    const o = (i) => {
      for (const a in i)
        if (i[a] === t)
          return a;
    };
    r = o(e.components || e.parent.type.components) || o(e.appContext.components);
  }
  return r ? ad(r) : n ? "App" : "Anonymous";
}
function Tl(e) {
  return Z(e) && "__vccOpts" in e;
}
const ue = (e, t) => Nu(e, t, Bn);
function Io(e, t, n) {
  const r = arguments.length;
  return r === 2 ? ae(t) && !G(t) ? ln(t) ? w(e, null, [t]) : w(e, t) : w(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && ln(n) && (n = [n]), w(e, t, n));
}
function Xr(e) {
  return !!(e && e.__v_isShallow);
}
function sd() {
  if ({}.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, o = {
    header(c) {
      return ae(c) ? c.__isVue ? ["div", e, "VueInstance"] : ye(c) ? [
        "div",
        {},
        ["span", e, f(c)],
        "<",
        s(c.value),
        ">"
      ] : Vt(c) ? [
        "div",
        {},
        ["span", e, Xr(c) ? "ShallowReactive" : "Reactive"],
        "<",
        s(c),
        `>${Nt(c) ? " (readonly)" : ""}`
      ] : Nt(c) ? [
        "div",
        {},
        ["span", e, Xr(c) ? "ShallowReadonly" : "Readonly"],
        "<",
        s(c),
        ">"
      ] : null : null;
    },
    hasBody(c) {
      return c && c.__isVue;
    },
    body(c) {
      if (c && c.__isVue)
        return [
          "div",
          {},
          ...i(c.$)
        ];
    }
  };
  function i(c) {
    const p = [];
    c.type.props && c.props && p.push(a("props", Q(c.props))), c.setupState !== ie && p.push(a("setup", c.setupState)), c.data !== ie && p.push(a("data", Q(c.data)));
    const g = l(c, "computed");
    g && p.push(a("computed", g));
    const v = l(c, "inject");
    return v && p.push(a("injected", v)), p.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: c }]
    ]), p;
  }
  function a(c, p) {
    return p = de({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        c
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(p).map((g) => [
          "div",
          {},
          ["span", r, g + ": "],
          s(p[g], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function s(c, p = !0) {
    return typeof c == "number" ? ["span", t, c] : typeof c == "string" ? ["span", n, JSON.stringify(c)] : typeof c == "boolean" ? ["span", r, c] : ae(c) ? ["object", { object: p ? Q(c) : c }] : ["span", n, String(c)];
  }
  function l(c, p) {
    const g = c.type;
    if (Z(g))
      return;
    const v = {};
    for (const E in c.ctx)
      u(g, E, p) && (v[E] = c.ctx[E]);
    return v;
  }
  function u(c, p, g) {
    const v = c[g];
    if (G(v) && v.includes(p) || ae(v) && p in v || c.extends && u(c.extends, p, g) || c.mixins && c.mixins.some((E) => u(E, p, g)))
      return !0;
  }
  function f(c) {
    return Xr(c) ? "ShallowRef" : c.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(o) : window.devtoolsFormatters = [o];
}
const da = "3.2.41", ld = "http://www.w3.org/2000/svg", Dt = typeof document < "u" ? document : null, pa = Dt && /* @__PURE__ */ Dt.createElement("template"), cd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const o = t ? Dt.createElementNS(ld, e) : Dt.createElement(e, n ? { is: n } : void 0);
    return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  },
  createText: (e) => Dt.createTextNode(e),
  createComment: (e) => Dt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Dt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  insertStaticContent(e, t, n, r, o, i) {
    const a = n ? n.previousSibling : t.lastChild;
    if (o && (o === i || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === i || !(o = o.nextSibling)); )
        ;
    else {
      pa.innerHTML = r ? `<svg>${e}</svg>` : e;
      const s = pa.content;
      if (r) {
        const l = s.firstChild;
        for (; l.firstChild; )
          s.appendChild(l.firstChild);
        s.removeChild(l);
      }
      t.insertBefore(s, n);
    }
    return [
      a ? a.nextSibling : t.firstChild,
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function ud(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function fd(e, t, n) {
  const r = e.style, o = he(n);
  if (n && !o) {
    for (const i in n)
      Mo(r, i, n[i]);
    if (t && !he(t))
      for (const i in t)
        n[i] == null && Mo(r, i, "");
  } else {
    const i = r.display;
    o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = i);
  }
}
const ha = /\s*!important$/;
function Mo(e, t, n) {
  if (G(n))
    n.forEach((r) => Mo(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = dd(e, t);
    ha.test(n) ? e.setProperty(Ot(r), n.replace(ha, ""), "important") : e[r] = n;
  }
}
const ga = ["Webkit", "Moz", "ms"], eo = {};
function dd(e, t) {
  const n = eo[t];
  if (n)
    return n;
  let r = an(t);
  if (r !== "filter" && r in e)
    return eo[t] = r;
  r = $r(r);
  for (let o = 0; o < ga.length; o++) {
    const i = ga[o] + r;
    if (i in e)
      return eo[t] = i;
  }
  return t;
}
const ma = "http://www.w3.org/1999/xlink";
function pd(e, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(ma, t.slice(6, t.length)) : e.setAttributeNS(ma, t, n);
  else {
    const i = jc(t);
    n == null || i && !ys(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n);
  }
}
function hd(e, t, n, r, o, i, a) {
  if (t === "innerHTML" || t === "textContent") {
    r && a(r, o, i), e[t] = n == null ? "" : n;
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const l = n == null ? "" : n;
    (e.value !== l || e.tagName === "OPTION") && (e.value = l), n == null && e.removeAttribute(t);
    return;
  }
  let s = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = ys(n) : n == null && l === "string" ? (n = "", s = !0) : l === "number" && (n = 0, s = !0);
  }
  try {
    e[t] = n;
  } catch (l) {
    ({}).NODE_ENV !== "production" && !s && P(`Failed setting prop "${t}" on <${e.tagName.toLowerCase()}>: value ${n} is invalid.`, l);
  }
  s && e.removeAttribute(t);
}
function gd(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function md(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function vd(e, t, n, r, o = null) {
  const i = e._vei || (e._vei = {}), a = i[t];
  if (r && a)
    a.value = r;
  else {
    const [s, l] = yd(t);
    if (r) {
      const u = i[t] = Ed(r, o);
      gd(e, s, u, l);
    } else
      a && (md(e, s, a, l), i[t] = void 0);
  }
}
const va = /(?:Once|Passive|Capture)$/;
function yd(e) {
  let t;
  if (va.test(e)) {
    t = {};
    let r;
    for (; r = e.match(va); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ot(e.slice(2)), t];
}
let to = 0;
const bd = /* @__PURE__ */ Promise.resolve(), _d = () => to || (bd.then(() => to = 0), to = Date.now());
function Ed(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    Le(Od(r, n.value), t, 5, [r]);
  };
  return n.value = e, n.attached = _d(), n;
}
function Od(e, t) {
  if (G(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((r) => (o) => !o._stopped && r && r(o));
  } else
    return t;
}
const ya = /^on[a-z]/, Cd = (e, t, n, r, o = !1, i, a, s, l) => {
  t === "class" ? ud(e, r, o) : t === "style" ? fd(e, n, r) : Kn(t) ? br(t) || vd(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Nd(e, t, r, o)) ? hd(e, t, r, i, a, s, l) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), pd(e, t, r, o));
};
function Nd(e, t, n, r) {
  return r ? !!(t === "innerHTML" || t === "textContent" || t in e && ya.test(t) && Z(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || ya.test(t) && he(n) ? !1 : t in e;
}
const dt = "transition", En = "animation", Oi = (e, { slots: t }) => Io(sl, Pl(e), t);
Oi.displayName = "Transition";
const Sl = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, wd = Oi.props = /* @__PURE__ */ de({}, sl.props, Sl), Tt = (e, t = []) => {
  G(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, ba = (e) => e ? G(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Pl(e) {
  const t = {};
  for (const j in e)
    j in Sl || (t[j] = e[j]);
  if (e.css === !1)
    return t;
  const { name: n = "v", type: r, duration: o, enterFromClass: i = `${n}-enter-from`, enterActiveClass: a = `${n}-enter-active`, enterToClass: s = `${n}-enter-to`, appearFromClass: l = i, appearActiveClass: u = a, appearToClass: f = s, leaveFromClass: c = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: g = `${n}-leave-to` } = e, v = xd(o), E = v && v[0], F = v && v[1], { onBeforeEnter: L, onEnter: A, onEnterCancelled: W, onLeave: K, onLeaveCancelled: R, onBeforeAppear: C = L, onAppear: D = A, onAppearCancelled: S = W } = t, V = (j, b, y) => {
    ht(j, b ? f : s), ht(j, b ? u : a), y && y();
  }, q = (j, b) => {
    j._isLeaving = !1, ht(j, c), ht(j, g), ht(j, p), b && b();
  }, ee = (j) => (b, y) => {
    const H = j ? D : A, B = () => V(b, j, y);
    Tt(H, [b, B]), _a(() => {
      ht(b, j ? l : i), st(b, j ? f : s), ba(H) || Ea(b, r, E, B);
    });
  };
  return de(t, {
    onBeforeEnter(j) {
      Tt(L, [j]), st(j, i), st(j, a);
    },
    onBeforeAppear(j) {
      Tt(C, [j]), st(j, l), st(j, u);
    },
    onEnter: ee(!1),
    onAppear: ee(!0),
    onLeave(j, b) {
      j._isLeaving = !0;
      const y = () => q(j, b);
      st(j, c), Dl(), st(j, p), _a(() => {
        !j._isLeaving || (ht(j, c), st(j, g), ba(K) || Ea(j, r, F, y));
      }), Tt(K, [j, y]);
    },
    onEnterCancelled(j) {
      V(j, !1), Tt(W, [j]);
    },
    onAppearCancelled(j) {
      V(j, !0), Tt(S, [j]);
    },
    onLeaveCancelled(j) {
      q(j), Tt(R, [j]);
    }
  });
}
function xd(e) {
  if (e == null)
    return null;
  if (ae(e))
    return [no(e.enter), no(e.leave)];
  {
    const t = no(e);
    return [t, t];
  }
}
function no(e) {
  const t = Ns(e);
  return {}.NODE_ENV !== "production" && Td(t), t;
}
function Td(e) {
  typeof e != "number" ? P(`<transition> explicit duration is not a valid number - got ${JSON.stringify(e)}.`) : isNaN(e) && P("<transition> explicit duration is NaN - the duration expression might be incorrect.");
}
function st(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e._vtc || (e._vtc = /* @__PURE__ */ new Set())).add(t);
}
function ht(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function _a(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Sd = 0;
function Ea(e, t, n, r) {
  const o = e._endId = ++Sd, i = () => {
    o === e._endId && r();
  };
  if (n)
    return setTimeout(i, n);
  const { type: a, timeout: s, propCount: l } = Al(e, t);
  if (!a)
    return r();
  const u = a + "end";
  let f = 0;
  const c = () => {
    e.removeEventListener(u, p), i();
  }, p = (g) => {
    g.target === e && ++f >= l && c();
  };
  setTimeout(() => {
    f < l && c();
  }, s + 1), e.addEventListener(u, p);
}
function Al(e, t) {
  const n = window.getComputedStyle(e), r = (v) => (n[v] || "").split(", "), o = r(dt + "Delay"), i = r(dt + "Duration"), a = Oa(o, i), s = r(En + "Delay"), l = r(En + "Duration"), u = Oa(s, l);
  let f = null, c = 0, p = 0;
  t === dt ? a > 0 && (f = dt, c = a, p = i.length) : t === En ? u > 0 && (f = En, c = u, p = l.length) : (c = Math.max(a, u), f = c > 0 ? a > u ? dt : En : null, p = f ? f === dt ? i.length : l.length : 0);
  const g = f === dt && /\b(transform|all)(,|$)/.test(n[dt + "Property"]);
  return {
    type: f,
    timeout: c,
    propCount: p,
    hasTransform: g
  };
}
function Oa(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, r) => Ca(n) + Ca(e[r])));
}
function Ca(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Dl() {
  return document.body.offsetHeight;
}
const $l = /* @__PURE__ */ new WeakMap(), Il = /* @__PURE__ */ new WeakMap(), Pd = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ de({}, wd, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = _i(), r = al();
    let o, i;
    return hi(() => {
      if (!o.length)
        return;
      const a = e.moveClass || `${e.name || "v"}-move`;
      if (!Md(o[0].el, n.vnode.el, a))
        return;
      o.forEach(Dd), o.forEach($d);
      const s = o.filter(Id);
      Dl(), s.forEach((l) => {
        const u = l.el, f = u.style;
        st(u, a), f.transform = f.webkitTransform = f.transitionDuration = "";
        const c = u._moveCb = (p) => {
          p && p.target !== u || (!p || /transform$/.test(p.propertyName)) && (u.removeEventListener("transitionend", c), u._moveCb = null, ht(u, a));
        };
        u.addEventListener("transitionend", c);
      });
    }), () => {
      const a = Q(e), s = Pl(a);
      let l = a.tag || Te;
      o = i, i = t.default ? pi(t.default()) : [];
      for (let u = 0; u < i.length; u++) {
        const f = i[u];
        f.key != null ? Rn(f, Ln(f, s, r, n)) : {}.NODE_ENV !== "production" && P("<TransitionGroup> children must be keyed.");
      }
      if (o)
        for (let u = 0; u < o.length; u++) {
          const f = o[u];
          Rn(f, Ln(f, s, r, n)), $l.set(f, f.el.getBoundingClientRect());
        }
      return w(l, null, i);
    };
  }
}, Ad = Pd;
function Dd(e) {
  const t = e.el;
  t._moveCb && t._moveCb(), t._enterCb && t._enterCb();
}
function $d(e) {
  Il.set(e, e.el.getBoundingClientRect());
}
function Id(e) {
  const t = $l.get(e), n = Il.get(e), r = t.left - n.left, o = t.top - n.top;
  if (r || o) {
    const i = e.el.style;
    return i.transform = i.webkitTransform = `translate(${r}px,${o}px)`, i.transitionDuration = "0s", e;
  }
}
function Md(e, t, n) {
  const r = e.cloneNode();
  e._vtc && e._vtc.forEach((a) => {
    a.split(/\s+/).forEach((s) => s && r.classList.remove(s));
  }), n.split(/\s+/).forEach((a) => a && r.classList.add(a)), r.style.display = "none";
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(r);
  const { hasTransform: i } = Al(r);
  return o.removeChild(r), i;
}
const jd = /* @__PURE__ */ de({ patchProp: Cd }, cd);
let Na;
function Vd() {
  return Na || (Na = Vf(jd));
}
const wa = (...e) => {
  Vd().render(...e);
};
function kd() {
  sd();
}
({}).NODE_ENV !== "production" && kd();
function fe(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function xa(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ze(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xa(Object(n), !0).forEach(function(r) {
      fe(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : xa(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function oe() {
  return oe = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, oe.apply(this, arguments);
}
function xr(e) {
  return xr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, xr(e);
}
var Fd = Array.isArray, Ld = function(t) {
  return typeof t == "string";
}, Rd = function(t) {
  return t !== null && xr(t) === "object";
};
function xn(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  return typeof e == "function" ? e(t) : e != null ? e : n;
}
function Gn() {
  for (var e = [], t = 0; t < arguments.length; t++) {
    var n = t < 0 || arguments.length <= t ? void 0 : arguments[t];
    if (!!n) {
      if (Ld(n))
        e.push(n);
      else if (Fd(n))
        for (var r = 0; r < n.length; r++) {
          var o = Gn(n[r]);
          o && e.push(o);
        }
      else if (Rd(n))
        for (var i in n)
          n[i] && e.push(i);
    }
  }
  return e.join(" ");
}
function Hd(e) {
  if (Array.isArray(e))
    return e;
}
function Bd(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r = [], o = !0, i = !1, a, s;
    try {
      for (n = n.call(e); !(o = (a = n.next()).done) && (r.push(a.value), !(t && r.length === t)); o = !0)
        ;
    } catch (l) {
      i = !0, s = l;
    } finally {
      try {
        !o && n.return != null && n.return();
      } finally {
        if (i)
          throw s;
      }
    }
    return r;
  }
}
function jo(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function Ml(e, t) {
  if (!!e) {
    if (typeof e == "string")
      return jo(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return jo(e, t);
  }
}
function Ud() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ta(e, t) {
  return Hd(e) || Bd(e, t) || Ml(e, t) || Ud();
}
function zd(e) {
  if (Array.isArray(e))
    return jo(e);
}
function Wd(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function Kd() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Tr(e) {
  return zd(e) || Wd(e) || Ml(e) || Kd();
}
var qd = function(t) {
  return t != null && t !== "";
};
const Yd = qd;
var Gd = function(t, n) {
  var r = oe({}, t);
  return Object.keys(n).forEach(function(o) {
    var i = r[o];
    if (i)
      i.type || i.default ? i.default = n[o] : i.def ? i.def(n[o]) : r[o] = {
        type: i,
        default: n[o]
      };
    else
      throw new Error("not have ".concat(o, " prop"));
  }), r;
};
const Jd = Gd;
var jl = function e() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, r = Array.isArray(t) ? t : [t], o = [];
  return r.forEach(function(i) {
    Array.isArray(i) ? o.push.apply(o, Tr(e(i, n))) : i && i.type === Te ? o.push.apply(o, Tr(e(i.children, n))) : i && ln(i) ? n && !Vl(i) ? o.push(i) : n || o.push(i) : Yd(i) && o.push(i);
  }), o;
}, Sa = function(t) {
  for (var n, r = ((n = t == null ? void 0 : t.vnode) === null || n === void 0 ? void 0 : n.el) || t && (t.$el || t); r && !r.tagName; )
    r = r.nextSibling;
  return r;
};
function Vl(e) {
  return e && (e.type === Ce || e.type === Te && e.children.length === 0 || e.type === hn && e.children.trim() === "");
}
function kl() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = [];
  return e.forEach(function(n) {
    Array.isArray(n) ? t.push.apply(t, Tr(n)) : (n == null ? void 0 : n.type) === Te ? t.push.apply(t, Tr(kl(n.children))) : t.push(n);
  }), t.filter(function(n) {
    return !Vl(n);
  });
}
var Fl = function(t) {
  return setTimeout(t, 16);
}, Ll = function(t) {
  return clearTimeout(t);
};
typeof window < "u" && "requestAnimationFrame" in window && (Fl = function(t) {
  return window.requestAnimationFrame(t);
}, Ll = function(t) {
  return window.cancelAnimationFrame(t);
});
var Pa = 0, Ci = /* @__PURE__ */ new Map();
function Rl(e) {
  Ci.delete(e);
}
function Vo(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  Pa += 1;
  var n = Pa;
  function r(o) {
    if (o === 0)
      Rl(n), e();
    else {
      var i = Fl(function() {
        r(o - 1);
      });
      Ci.set(n, i);
    }
  }
  return r(t), n;
}
Vo.cancel = function(e) {
  var t = Ci.get(e);
  return Rl(t), Ll(t);
};
var Zd = function() {
  for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  return n;
}, Hl = function(t) {
  var n = t;
  return n.install = function(r) {
    r.component(n.displayName || n.name, t);
  }, t;
};
const Qd = {
  items_per_page: "/ page",
  jump_to: "Go to",
  jump_to_confirm: "confirm",
  page: "",
  prev_page: "Previous Page",
  next_page: "Next Page",
  prev_5: "Previous 5 Pages",
  next_5: "Next 5 Pages",
  prev_3: "Previous 3 Pages",
  next_3: "Next 3 Pages"
};
var Xd = {
  locale: "en_US",
  today: "Today",
  now: "Now",
  backToToday: "Back to today",
  ok: "Ok",
  clear: "Clear",
  month: "Month",
  year: "Year",
  timeSelect: "select time",
  dateSelect: "select date",
  weekSelect: "Choose a week",
  monthSelect: "Choose a month",
  yearSelect: "Choose a year",
  decadeSelect: "Choose a decade",
  yearFormat: "YYYY",
  dateFormat: "M/D/YYYY",
  dayFormat: "D",
  dateTimeFormat: "M/D/YYYY HH:mm:ss",
  monthBeforeYear: !0,
  previousMonth: "Previous month (PageUp)",
  nextMonth: "Next month (PageDown)",
  previousYear: "Last year (Control + left)",
  nextYear: "Next year (Control + right)",
  previousDecade: "Last decade",
  nextDecade: "Next decade",
  previousCentury: "Last century",
  nextCentury: "Next century"
};
const ep = Xd;
var tp = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
const Bl = tp;
var np = {
  lang: oe({
    placeholder: "Select date",
    yearPlaceholder: "Select year",
    quarterPlaceholder: "Select quarter",
    monthPlaceholder: "Select month",
    weekPlaceholder: "Select week",
    rangePlaceholder: ["Start date", "End date"],
    rangeYearPlaceholder: ["Start year", "End year"],
    rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
    rangeMonthPlaceholder: ["Start month", "End month"],
    rangeWeekPlaceholder: ["Start week", "End week"]
  }, ep),
  timePickerLocale: oe({}, Bl)
};
const Aa = np;
var Ie = "${label} is not a valid ${type}", rp = {
  locale: "en",
  Pagination: Qd,
  DatePicker: Aa,
  TimePicker: Bl,
  Calendar: Aa,
  global: {
    placeholder: "Please select"
  },
  Table: {
    filterTitle: "Filter menu",
    filterConfirm: "OK",
    filterReset: "Reset",
    filterEmptyText: "No filters",
    filterCheckall: "Select all items",
    filterSearchPlaceholder: "Search in filters",
    emptyText: "No data",
    selectAll: "Select current page",
    selectInvert: "Invert current page",
    selectNone: "Clear all data",
    selectionAll: "Select all data",
    sortTitle: "Sort",
    expand: "Expand row",
    collapse: "Collapse row",
    triggerDesc: "Click to sort descending",
    triggerAsc: "Click to sort ascending",
    cancelSort: "Click to cancel sorting"
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search here",
    itemUnit: "item",
    itemsUnit: "items",
    remove: "Remove",
    selectCurrent: "Select current page",
    removeCurrent: "Remove current page",
    selectAll: "Select all data",
    removeAll: "Remove all data",
    selectInvert: "Invert current page"
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Remove file",
    uploadError: "Upload error",
    previewFile: "Preview file",
    downloadFile: "Download file"
  },
  Empty: {
    description: "No Data"
  },
  Icon: {
    icon: "icon"
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand"
  },
  PageHeader: {
    back: "Back"
  },
  Form: {
    optional: "(optional)",
    defaultValidateMessages: {
      default: "Field validation error for ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
      },
      types: {
        string: Ie,
        method: Ie,
        array: Ie,
        object: Ie,
        number: Ie,
        date: Ie,
        boolean: Ie,
        integer: Ie,
        float: Ie,
        regexp: Ie,
        email: Ie,
        url: Ie,
        hex: Ie
      },
      string: {
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  },
  Image: {
    preview: "Preview"
  }
};
const ko = rp, Ul = We({
  name: "LocaleReceiver",
  props: {
    componentName: String,
    defaultLocale: {
      type: [Object, Function]
    },
    children: {
      type: Function
    }
  },
  setup: function(t, n) {
    var r = n.slots, o = Sn("localeData", {}), i = ue(function() {
      var s = t.componentName, l = s === void 0 ? "global" : s, u = t.defaultLocale, f = u || ko[l || "global"], c = o.antLocale, p = l && c ? c[l] : {};
      return oe(oe({}, typeof f == "function" ? f() : f), p || {});
    }), a = ue(function() {
      var s = o.antLocale, l = s && s.locale;
      return s && s.exist && !l ? ko.locale : l;
    });
    return function() {
      var s = t.children || r.default, l = o.antLocale;
      return s == null ? void 0 : s(i.value, a.value, l);
    };
  }
});
var zl = function() {
  var t = zt("empty", {}), n = t.getPrefixCls, r = n("empty-img-default");
  return w("svg", {
    class: r,
    width: "184",
    height: "152",
    viewBox: "0 0 184 152"
  }, [w("g", {
    fill: "none",
    "fill-rule": "evenodd"
  }, [w("g", {
    transform: "translate(24 31.67)"
  }, [w("ellipse", {
    class: "".concat(r, "-ellipse"),
    cx: "67.797",
    cy: "106.89",
    rx: "67.797",
    ry: "12.668"
  }, null), w("path", {
    class: "".concat(r, "-path-1"),
    d: "M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
  }, null), w("path", {
    class: "".concat(r, "-path-2"),
    d: "M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z",
    transform: "translate(13.56)"
  }, null), w("path", {
    class: "".concat(r, "-path-3"),
    d: "M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
  }, null), w("path", {
    class: "".concat(r, "-path-4"),
    d: "M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
  }, null)]), w("path", {
    class: "".concat(r, "-path-5"),
    d: "M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
  }, null), w("g", {
    class: "".concat(r, "-g"),
    transform: "translate(149.65 15.383)"
  }, [w("ellipse", {
    cx: "20.654",
    cy: "3.167",
    rx: "2.849",
    ry: "2.815"
  }, null), w("path", {
    d: "M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"
  }, null)])])]);
};
zl.PRESENTED_IMAGE_DEFAULT = !0;
const op = zl;
var Wl = function() {
  var t = zt("empty", {}), n = t.getPrefixCls, r = n("empty-img-simple");
  return w("svg", {
    class: r,
    width: "64",
    height: "41",
    viewBox: "0 0 64 41"
  }, [w("g", {
    transform: "translate(0 1)",
    fill: "none",
    "fill-rule": "evenodd"
  }, [w("ellipse", {
    class: "".concat(r, "-ellipse"),
    fill: "#F5F5F5",
    cx: "32",
    cy: "33",
    rx: "32",
    ry: "7"
  }, null), w("g", {
    class: "".concat(r, "-g"),
    "fill-rule": "nonzero",
    stroke: "#D9D9D9"
  }, [w("path", {
    d: "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
  }, null), w("path", {
    d: "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
    fill: "#FAFAFA",
    class: "".concat(r, "-path")
  }, null)])])]);
};
Wl.PRESENTED_IMAGE_SIMPLE = !0;
const ip = Wl;
function Da(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function Kl(e, t, n) {
  return t && Da(e.prototype, t), n && Da(e, n), e;
}
function mr() {
  return (mr = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }).apply(this, arguments);
}
function ql(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
}
function Yl(e, t) {
  if (e == null)
    return {};
  var n, r, o = {}, i = Object.keys(e);
  for (r = 0; r < i.length; r++)
    t.indexOf(n = i[r]) >= 0 || (o[n] = e[n]);
  return o;
}
function $a(e) {
  return ((t = e) != null && typeof t == "object" && Array.isArray(t) === !1) == 1 && Object.prototype.toString.call(e) === "[object Object]";
  var t;
}
var Gl = Object.prototype, Jl = Gl.toString, ap = Gl.hasOwnProperty, Zl = /^\s*function (\w+)/;
function Ia(e) {
  var t, n = (t = e == null ? void 0 : e.type) !== null && t !== void 0 ? t : e;
  if (n) {
    var r = n.toString().match(Zl);
    return r ? r[1] : "";
  }
  return "";
}
var Rt = function(e) {
  var t, n;
  return $a(e) !== !1 && typeof (t = e.constructor) == "function" && $a(n = t.prototype) !== !1 && n.hasOwnProperty("isPrototypeOf") !== !1;
}, Ql = function(e) {
  return e;
}, Oe = Ql;
if ({}.NODE_ENV !== "production") {
  var sp = typeof console < "u";
  Oe = sp ? function(e) {
    console.warn("[VueTypes warn]: " + e);
  } : Ql;
}
var Un = function(e, t) {
  return ap.call(e, t);
}, lp = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}, un = Array.isArray || function(e) {
  return Jl.call(e) === "[object Array]";
}, fn = function(e) {
  return Jl.call(e) === "[object Function]";
}, Sr = function(e) {
  return Rt(e) && Un(e, "_vueTypes_name");
}, Xl = function(e) {
  return Rt(e) && (Un(e, "type") || ["_vueTypes_name", "validator", "default", "required"].some(function(t) {
    return Un(e, t);
  }));
};
function Ni(e, t) {
  return Object.defineProperty(e.bind(t), "__original", { value: e });
}
function Ut(e, t, n) {
  var r;
  n === void 0 && (n = !1);
  var o = !0, i = "";
  r = Rt(e) ? e : { type: e };
  var a = Sr(r) ? r._vueTypes_name + " - " : "";
  if (Xl(r) && r.type !== null) {
    if (r.type === void 0 || r.type === !0 || !r.required && t === void 0)
      return o;
    un(r.type) ? (o = r.type.some(function(c) {
      return Ut(c, t, !0) === !0;
    }), i = r.type.map(function(c) {
      return Ia(c);
    }).join(" or ")) : o = (i = Ia(r)) === "Array" ? un(t) : i === "Object" ? Rt(t) : i === "String" || i === "Number" || i === "Boolean" || i === "Function" ? function(c) {
      if (c == null)
        return "";
      var p = c.constructor.toString().match(Zl);
      return p ? p[1] : "";
    }(t) === i : t instanceof r.type;
  }
  if (!o) {
    var s = a + 'value "' + t + '" should be of type "' + i + '"';
    return n === !1 ? (Oe(s), !1) : s;
  }
  if (Un(r, "validator") && fn(r.validator)) {
    var l = Oe, u = [];
    if (Oe = function(c) {
      u.push(c);
    }, o = r.validator(t), Oe = l, !o) {
      var f = (u.length > 1 ? "* " : "") + u.join(`
* `);
      return u.length = 0, n === !1 ? (Oe(f), o) : f;
    }
  }
  return o;
}
function je(e, t) {
  var n = Object.defineProperties(t, { _vueTypes_name: { value: e, writable: !0 }, isRequired: { get: function() {
    return this.required = !0, this;
  } }, def: { value: function(o) {
    return o !== void 0 || this.default ? fn(o) || Ut(this, o, !0) === !0 ? (this.default = un(o) ? function() {
      return [].concat(o);
    } : Rt(o) ? function() {
      return Object.assign({}, o);
    } : o, this) : (Oe(this._vueTypes_name + ' - invalid default value: "' + o + '"'), this) : this;
  } } }), r = n.validator;
  return fn(r) && (n.validator = Ni(r, n)), n;
}
function tt(e, t) {
  var n = je(e, t);
  return Object.defineProperty(n, "validate", { value: function(r) {
    return fn(this.validator) && Oe(this._vueTypes_name + ` - calling .validate() will overwrite the current custom validator function. Validator info:
` + JSON.stringify(this)), this.validator = Ni(r, this), this;
  } });
}
function Ma(e, t, n) {
  var r, o, i = (r = t, o = {}, Object.getOwnPropertyNames(r).forEach(function(c) {
    o[c] = Object.getOwnPropertyDescriptor(r, c);
  }), Object.defineProperties({}, o));
  if (i._vueTypes_name = e, !Rt(n))
    return i;
  var a, s, l = n.validator, u = Yl(n, ["validator"]);
  if (fn(l)) {
    var f = i.validator;
    f && (f = (s = (a = f).__original) !== null && s !== void 0 ? s : a), i.validator = Ni(f ? function(c) {
      return f.call(this, c) && l.call(this, c);
    } : l, i);
  }
  return Object.assign(i, u);
}
function qr(e) {
  return e.replace(/^(?!\s*$)/gm, "  ");
}
var cp = function() {
  return tt("any", {});
}, up = function() {
  return tt("function", { type: Function });
}, fp = function() {
  return tt("boolean", { type: Boolean });
}, dp = function() {
  return tt("string", { type: String });
}, pp = function() {
  return tt("number", { type: Number });
}, hp = function() {
  return tt("array", { type: Array });
}, gp = function() {
  return tt("object", { type: Object });
}, mp = function() {
  return je("integer", { type: Number, validator: function(e) {
    return lp(e);
  } });
}, vp = function() {
  return je("symbol", { validator: function(e) {
    return typeof e == "symbol";
  } });
};
function yp(e, t) {
  if (t === void 0 && (t = "custom validation failed"), typeof e != "function")
    throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return je(e.name || "<<anonymous function>>", { validator: function(n) {
    var r = e(n);
    return r || Oe(this._vueTypes_name + " - " + t), r;
  } });
}
function bp(e) {
  if (!un(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument.");
  var t = 'oneOf - value should be one of "' + e.join('", "') + '".', n = e.reduce(function(r, o) {
    if (o != null) {
      var i = o.constructor;
      r.indexOf(i) === -1 && r.push(i);
    }
    return r;
  }, []);
  return je("oneOf", { type: n.length > 0 ? n : void 0, validator: function(r) {
    var o = e.indexOf(r) !== -1;
    return o || Oe(t), o;
  } });
}
function _p(e) {
  if (!un(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument");
  for (var t = !1, n = [], r = 0; r < e.length; r += 1) {
    var o = e[r];
    if (Xl(o)) {
      if (Sr(o) && o._vueTypes_name === "oneOf") {
        n = n.concat(o.type);
        continue;
      }
      if (fn(o.validator) && (t = !0), o.type !== !0 && o.type) {
        n = n.concat(o.type);
        continue;
      }
    }
    n.push(o);
  }
  return n = n.filter(function(i, a) {
    return n.indexOf(i) === a;
  }), je("oneOfType", t ? { type: n, validator: function(i) {
    var a = [], s = e.some(function(l) {
      var u = Ut(Sr(l) && l._vueTypes_name === "oneOf" ? l.type || null : l, i, !0);
      return typeof u == "string" && a.push(u), u === !0;
    });
    return s || Oe("oneOfType - provided value does not match any of the " + a.length + ` passed-in validators:
` + qr(a.join(`
`))), s;
  } } : { type: n });
}
function Ep(e) {
  return je("arrayOf", { type: Array, validator: function(t) {
    var n, r = t.every(function(o) {
      return (n = Ut(e, o, !0)) === !0;
    });
    return r || Oe(`arrayOf - value validation error:
` + qr(n)), r;
  } });
}
function Op(e) {
  return je("instanceOf", { type: e });
}
function Cp(e) {
  return je("objectOf", { type: Object, validator: function(t) {
    var n, r = Object.keys(t).every(function(o) {
      return (n = Ut(e, t[o], !0)) === !0;
    });
    return r || Oe(`objectOf - value validation error:
` + qr(n)), r;
  } });
}
function Np(e) {
  var t = Object.keys(e), n = t.filter(function(o) {
    var i;
    return !!(!((i = e[o]) === null || i === void 0) && i.required);
  }), r = je("shape", { type: Object, validator: function(o) {
    var i = this;
    if (!Rt(o))
      return !1;
    var a = Object.keys(o);
    if (n.length > 0 && n.some(function(l) {
      return a.indexOf(l) === -1;
    })) {
      var s = n.filter(function(l) {
        return a.indexOf(l) === -1;
      });
      return Oe(s.length === 1 ? 'shape - required property "' + s[0] + '" is not defined.' : 'shape - required properties "' + s.join('", "') + '" are not defined.'), !1;
    }
    return a.every(function(l) {
      if (t.indexOf(l) === -1)
        return i._vueTypes_isLoose === !0 || (Oe('shape - shape definition does not include a "' + l + '" property. Allowed keys: "' + t.join('", "') + '".'), !1);
      var u = Ut(e[l], o[l], !0);
      return typeof u == "string" && Oe('shape - "' + l + `" property validation error:
 ` + qr(u)), u === !0;
    });
  } });
  return Object.defineProperty(r, "_vueTypes_isLoose", { writable: !0, value: !1 }), Object.defineProperty(r, "loose", { get: function() {
    return this._vueTypes_isLoose = !0, this;
  } }), r;
}
var Je = function() {
  function e() {
  }
  return e.extend = function(t) {
    var n = this;
    if (un(t))
      return t.forEach(function(c) {
        return n.extend(c);
      }), this;
    var r = t.name, o = t.validate, i = o !== void 0 && o, a = t.getter, s = a !== void 0 && a, l = Yl(t, ["name", "validate", "getter"]);
    if (Un(this, r))
      throw new TypeError('[VueTypes error]: Type "' + r + '" already defined');
    var u, f = l.type;
    return Sr(f) ? (delete l.type, Object.defineProperty(this, r, s ? { get: function() {
      return Ma(r, f, l);
    } } : { value: function() {
      var c, p = Ma(r, f, l);
      return p.validator && (p.validator = (c = p.validator).bind.apply(c, [p].concat([].slice.call(arguments)))), p;
    } })) : (u = s ? { get: function() {
      var c = Object.assign({}, l);
      return i ? tt(r, c) : je(r, c);
    }, enumerable: !0 } : { value: function() {
      var c, p, g = Object.assign({}, l);
      return c = i ? tt(r, g) : je(r, g), g.validator && (c.validator = (p = g.validator).bind.apply(p, [c].concat([].slice.call(arguments)))), c;
    }, enumerable: !0 }, Object.defineProperty(this, r, u));
  }, Kl(e, null, [{ key: "any", get: function() {
    return cp();
  } }, { key: "func", get: function() {
    return up().def(this.defaults.func);
  } }, { key: "bool", get: function() {
    return fp().def(this.defaults.bool);
  } }, { key: "string", get: function() {
    return dp().def(this.defaults.string);
  } }, { key: "number", get: function() {
    return pp().def(this.defaults.number);
  } }, { key: "array", get: function() {
    return hp().def(this.defaults.array);
  } }, { key: "object", get: function() {
    return gp().def(this.defaults.object);
  } }, { key: "integer", get: function() {
    return mp().def(this.defaults.integer);
  } }, { key: "symbol", get: function() {
    return vp();
  } }]), e;
}();
function ec(e) {
  var t;
  return e === void 0 && (e = { func: function() {
  }, bool: !0, string: "", number: 0, array: function() {
    return [];
  }, object: function() {
    return {};
  }, integer: 0 }), (t = function(n) {
    function r() {
      return n.apply(this, arguments) || this;
    }
    return ql(r, n), Kl(r, null, [{ key: "sensibleDefaults", get: function() {
      return mr({}, this.defaults);
    }, set: function(o) {
      this.defaults = o !== !1 ? mr({}, o !== !0 ? o : e) : {};
    } }]), r;
  }(Je)).defaults = mr({}, e), t;
}
Je.defaults = {}, Je.custom = yp, Je.oneOf = bp, Je.instanceOf = Op, Je.oneOfType = _p, Je.arrayOf = Ep, Je.objectOf = Cp, Je.shape = Np, Je.utils = { validate: function(e, t) {
  return Ut(t, e, !0) === !0;
}, toType: function(e, t, n) {
  return n === void 0 && (n = !1), n ? tt(e, t) : je(e, t);
} };
(function(e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  return ql(t, e), t;
})(ec());
var tc = ec({
  func: void 0,
  bool: void 0,
  string: void 0,
  number: void 0,
  array: void 0,
  object: void 0,
  integer: void 0
});
tc.extend([{
  name: "looseBool",
  getter: !0,
  type: Boolean,
  default: void 0
}, {
  name: "style",
  getter: !0,
  type: [String, Object],
  default: void 0
}, {
  name: "VueNode",
  getter: !0,
  type: null
}]);
const Fo = tc;
var wp = globalThis && globalThis.__rest || function(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}, nc = w(op, null, null), rc = w(ip, null, null), gn = function(t, n) {
  var r = n.slots, o = r === void 0 ? {} : r, i = n.attrs, a, s = zt("empty", t), l = s.direction, u = s.prefixCls, f = u.value, c = oe(oe({}, t), i), p = c.image, g = p === void 0 ? nc : p, v = c.description, E = v === void 0 ? ((a = o.description) === null || a === void 0 ? void 0 : a.call(o)) || void 0 : v, F = c.imageStyle, L = c.class, A = L === void 0 ? "" : L, W = wp(c, ["image", "description", "imageStyle", "class"]);
  return w(Ul, {
    componentName: "Empty",
    children: function(R) {
      var C, D = typeof E < "u" ? E : R.description, S = typeof D == "string" ? D : "empty", V = null;
      return typeof g == "string" ? V = w("img", {
        alt: S,
        src: g
      }, null) : V = g, w("div", ze({
        class: Gn(f, A, (C = {}, fe(C, "".concat(f, "-normal"), g === rc), fe(C, "".concat(f, "-rtl"), l.value === "rtl"), C))
      }, W), [w("div", {
        class: "".concat(f, "-image"),
        style: F
      }, [V]), D && w("p", {
        class: "".concat(f, "-description")
      }, [D]), o.default && w("div", {
        class: "".concat(f, "-footer")
      }, [kl(o.default())])]);
    }
  }, null);
};
gn.displayName = "AEmpty";
gn.PRESENTED_IMAGE_DEFAULT = nc;
gn.PRESENTED_IMAGE_SIMPLE = rc;
gn.inheritAttrs = !1;
gn.props = {
  prefixCls: String,
  image: Fo.any,
  description: Fo.any,
  imageStyle: {
    type: Object,
    default: void 0
  }
};
const On = Hl(gn);
var xp = function(t) {
  var n = zt("empty", t), r = n.prefixCls, o = function(a) {
    switch (a) {
      case "Table":
      case "List":
        return w(On, {
          image: On.PRESENTED_IMAGE_SIMPLE
        }, null);
      case "Select":
      case "TreeSelect":
      case "Cascader":
      case "Transfer":
      case "Mentions":
        return w(On, {
          image: On.PRESENTED_IMAGE_SIMPLE,
          class: "".concat(r.value, "-small")
        }, null);
      default:
        return w(On, null, null);
    }
  };
  return o(t.componentName);
};
function oc(e) {
  return w(xp, {
    componentName: e
  }, null);
}
var ja = {};
function Tp(e, t) {
  ({}).NODE_ENV !== "production" && !e && console !== void 0 && console.error("Warning: ".concat(t));
}
function Sp(e, t, n) {
  !t && !ja[n] && (e(!1, n), ja[n] = !0);
}
function ic(e, t) {
  Sp(Tp, e, t);
}
const Pp = function(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  ic(e, "[antdv: ".concat(t, "] ").concat(n));
};
var Lo = "internalMark", vr = We({
  name: "ALocaleProvider",
  props: {
    locale: {
      type: Object
    },
    ANT_MARK__: String
  },
  setup: function(t, n) {
    var r = n.slots;
    Pp(t.ANT_MARK__ === Lo, "LocaleProvider", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead");
    var o = nt({
      antLocale: oe(oe({}, t.locale), {
        exist: !0
      }),
      ANT_MARK__: Lo
    });
    return Hr("localeData", o), Et(function() {
      return t.locale;
    }, function() {
      o.antLocale = oe(oe({}, t.locale), {
        exist: !0
      });
    }, {
      immediate: !0
    }), function() {
      var i;
      return (i = r.default) === null || i === void 0 ? void 0 : i.call(r);
    };
  }
});
vr.install = function(e) {
  return e.component(vr.name, vr), e;
};
const Ap = Hl(vr);
Zd("bottomLeft", "bottomRight", "topLeft", "topRight");
var Dp = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = oe(t ? {
    name: t,
    appear: !0,
    appearActiveClass: "".concat(t),
    appearToClass: "".concat(t, "-appear ").concat(t, "-appear-active"),
    enterFromClass: "".concat(t, "-appear ").concat(t, "-enter ").concat(t, "-appear-prepare ").concat(t, "-enter-prepare"),
    enterActiveClass: "".concat(t),
    enterToClass: "".concat(t, "-enter ").concat(t, "-appear ").concat(t, "-appear-active ").concat(t, "-enter-active"),
    leaveActiveClass: "".concat(t, " ").concat(t, "-leave"),
    leaveToClass: "".concat(t, "-leave-active")
  } : {
    css: !1
  }, n);
  return r;
};
const $p = Oi, Ip = We({
  name: "Notice",
  inheritAttrs: !1,
  props: ["prefixCls", "duration", "updateMark", "noticeKey", "closeIcon", "closable", "props", "onClick", "onClose", "holder", "visible"],
  setup: function(t, n) {
    var r = n.attrs, o = n.slots, i, a = ue(function() {
      return t.duration === void 0 ? 1.5 : t.duration;
    }), s = function() {
      a.value && (i = setTimeout(function() {
        u();
      }, a.value * 1e3));
    }, l = function() {
      i && (clearTimeout(i), i = null);
    }, u = function(p) {
      p && p.stopPropagation(), l();
      var g = t.onClose, v = t.noticeKey;
      g && g(v);
    }, f = function() {
      l(), s();
    };
    return pn(function() {
      s();
    }), gi(function() {
      l();
    }), Et([a, function() {
      return t.updateMark;
    }, function() {
      return t.visible;
    }], function(c, p) {
      var g = Ta(c, 3), v = g[0], E = g[1], F = g[2], L = Ta(p, 3), A = L[0], W = L[1], K = L[2];
      (v !== A || E !== W || F !== K && K) && f();
    }, {
      flush: "post"
    }), function() {
      var c, p, g = t.prefixCls, v = t.closable, E = t.closeIcon, F = E === void 0 ? (c = o.closeIcon) === null || c === void 0 ? void 0 : c.call(o) : E, L = t.onClick, A = t.holder, W = r.class, K = r.style, R = "".concat(g, "-notice"), C = Object.keys(r).reduce(function(S, V) {
        return (V.substr(0, 5) === "data-" || V.substr(0, 5) === "aria-" || V === "role") && (S[V] = r[V]), S;
      }, {}), D = w("div", ze({
        class: Gn(R, W, fe({}, "".concat(R, "-closable"), v)),
        style: K,
        onMouseenter: l,
        onMouseleave: s,
        onClick: L
      }, C), [w("div", {
        class: "".concat(R, "-content")
      }, [(p = o.default) === null || p === void 0 ? void 0 : p.call(o)]), v ? w("a", {
        tabindex: 0,
        onClick: u,
        class: "".concat(R, "-close")
      }, [F || w("span", {
        class: "".concat(R, "-close-x")
      }, null)]) : null]);
      return A ? w(Bf, {
        to: A
      }, {
        default: function() {
          return D;
        }
      }) : D;
    };
  }
});
var Mp = globalThis && globalThis.__rest || function(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}, Va = 0, jp = Date.now();
function ka() {
  var e = Va;
  return Va += 1, "rcNotification_".concat(jp, "_").concat(e);
}
var Ro = We({
  name: "Notification",
  inheritAttrs: !1,
  props: ["prefixCls", "transitionName", "animation", "maxCount", "closeIcon"],
  setup: function(t, n) {
    var r = n.attrs, o = n.expose, i = n.slots, a = /* @__PURE__ */ new Map(), s = Xt([]), l = ue(function() {
      var c = t.prefixCls, p = t.animation, g = p === void 0 ? "fade" : p, v = t.transitionName;
      return !v && g && (v = "".concat(c, "-").concat(g)), Dp(v);
    }), u = function(p, g) {
      var v = p.key || ka(), E = oe(oe({}, p), {
        key: v
      }), F = t.maxCount, L = s.value.map(function(W) {
        return W.notice.key;
      }).indexOf(v), A = s.value.concat();
      L !== -1 ? A.splice(L, 1, {
        notice: E,
        holderCallback: g
      }) : (F && s.value.length >= F && (E.key = A[0].notice.key, E.updateMark = ka(), E.userPassKey = v, A.shift()), A.push({
        notice: E,
        holderCallback: g
      })), s.value = A;
    }, f = function(p) {
      s.value = s.value.filter(function(g) {
        var v = g.notice, E = v.key, F = v.userPassKey, L = F || E;
        return L !== p;
      });
    };
    return o({
      add: u,
      remove: f,
      notices: s
    }), function() {
      var c, p, g = t.prefixCls, v = t.closeIcon, E = v === void 0 ? (p = i.closeIcon) === null || p === void 0 ? void 0 : p.call(i, {
        prefixCls: g
      }) : v, F = s.value.map(function(A, W) {
        var K = A.notice, R = A.holderCallback, C = W === s.value.length - 1 ? K.updateMark : void 0, D = K.key, S = K.userPassKey, V = K.content, q = oe(oe(oe({
          prefixCls: g,
          closeIcon: typeof E == "function" ? E({
            prefixCls: g
          }) : E
        }, K), K.props), {
          key: D,
          noticeKey: S || D,
          updateMark: C,
          onClose: function(j) {
            var b;
            f(j), (b = K.onClose) === null || b === void 0 || b.call(K);
          },
          onClick: K.onClick
        });
        return R ? w("div", {
          key: D,
          class: "".concat(g, "-hook-holder"),
          ref: function(j) {
            typeof D > "u" || (j ? (a.set(D, j), R(j, q)) : a.delete(D));
          }
        }, null) : w(Ip, q, {
          default: function() {
            return [typeof V == "function" ? V({
              prefixCls: g
            }) : V];
          }
        });
      }), L = (c = {}, fe(c, g, 1), fe(c, r.class, !!r.class), c);
      return w("div", {
        class: L,
        style: r.style || {
          top: "65px",
          left: "50%"
        }
      }, [w(Ad, ze({
        tag: "div"
      }, l.value), {
        default: function() {
          return [F];
        }
      })]);
    };
  }
});
Ro.newInstance = function(t, n) {
  var r = t || {}, o = r.name, i = o === void 0 ? "notification" : o, a = r.getContainer, s = r.appContext, l = r.prefixCls, u = r.rootPrefixCls, f = r.transitionName, c = r.hasTransitionName, p = Mp(r, ["name", "getContainer", "appContext", "prefixCls", "rootPrefixCls", "transitionName", "hasTransitionName"]), g = document.createElement("div");
  if (a) {
    var v = a();
    v.appendChild(g);
  } else
    document.body.appendChild(g);
  var E = We({
    name: "NotificationWrapper",
    setup: function(A, W) {
      var K = W.attrs, R = Xt();
      return pn(function() {
        n({
          notice: function(D) {
            var S;
            (S = R.value) === null || S === void 0 || S.add(D);
          },
          removeNotice: function(D) {
            var S;
            (S = R.value) === null || S === void 0 || S.remove(D);
          },
          destroy: function() {
            wa(null, g), g.parentNode && g.parentNode.removeChild(g);
          },
          component: R
        });
      }), function() {
        var C = ke, D = C.getPrefixCls(i, l), S = C.getRootPrefixCls(u, D), V = c ? f : "".concat(S, "-").concat(f);
        return w($n, ze(ze({}, C), {}, {
          notUpdateGlobalConfig: !0,
          prefixCls: S
        }), {
          default: function() {
            return [w(Ro, ze(ze({
              ref: R
            }, K), {}, {
              prefixCls: D,
              transitionName: V
            }), null)];
          }
        });
      };
    }
  }), F = w(E, p);
  F.appContext = s || F.appContext, wa(F, g);
};
const ac = Ro;
var Vp = { icon: { tag: "svg", attrs: { viewBox: "0 0 1024 1024", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" } }] }, name: "loading", theme: "outlined" };
const kp = Vp;
function _e(e, t) {
  Fp(e) && (e = "100%");
  var n = Lp(e);
  return e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e))), n && (e = parseInt(String(e * t), 10) / 100), Math.abs(e - t) < 1e-6 ? 1 : (t === 360 ? e = (e < 0 ? e % t + t : e % t) / parseFloat(String(t)) : e = e % t / parseFloat(String(t)), e);
}
function or(e) {
  return Math.min(1, Math.max(0, e));
}
function Fp(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function Lp(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function sc(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function ir(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function It(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function Rp(e, t, n) {
  return {
    r: _e(e, 255) * 255,
    g: _e(t, 255) * 255,
    b: _e(n, 255) * 255
  };
}
function Fa(e, t, n) {
  e = _e(e, 255), t = _e(t, 255), n = _e(n, 255);
  var r = Math.max(e, t, n), o = Math.min(e, t, n), i = 0, a = 0, s = (r + o) / 2;
  if (r === o)
    a = 0, i = 0;
  else {
    var l = r - o;
    switch (a = s > 0.5 ? l / (2 - r - o) : l / (r + o), r) {
      case e:
        i = (t - n) / l + (t < n ? 6 : 0);
        break;
      case t:
        i = (n - e) / l + 2;
        break;
      case n:
        i = (e - t) / l + 4;
        break;
    }
    i /= 6;
  }
  return { h: i, s: a, l: s };
}
function ro(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * (6 * n) : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function Hp(e, t, n) {
  var r, o, i;
  if (e = _e(e, 360), t = _e(t, 100), n = _e(n, 100), t === 0)
    o = n, i = n, r = n;
  else {
    var a = n < 0.5 ? n * (1 + t) : n + t - n * t, s = 2 * n - a;
    r = ro(s, a, e + 1 / 3), o = ro(s, a, e), i = ro(s, a, e - 1 / 3);
  }
  return { r: r * 255, g: o * 255, b: i * 255 };
}
function Ho(e, t, n) {
  e = _e(e, 255), t = _e(t, 255), n = _e(n, 255);
  var r = Math.max(e, t, n), o = Math.min(e, t, n), i = 0, a = r, s = r - o, l = r === 0 ? 0 : s / r;
  if (r === o)
    i = 0;
  else {
    switch (r) {
      case e:
        i = (t - n) / s + (t < n ? 6 : 0);
        break;
      case t:
        i = (n - e) / s + 2;
        break;
      case n:
        i = (e - t) / s + 4;
        break;
    }
    i /= 6;
  }
  return { h: i, s: l, v: a };
}
function Bp(e, t, n) {
  e = _e(e, 360) * 6, t = _e(t, 100), n = _e(n, 100);
  var r = Math.floor(e), o = e - r, i = n * (1 - t), a = n * (1 - o * t), s = n * (1 - (1 - o) * t), l = r % 6, u = [n, a, i, i, s, n][l], f = [s, n, n, a, i, i][l], c = [i, i, s, n, n, a][l];
  return { r: u * 255, g: f * 255, b: c * 255 };
}
function Bo(e, t, n, r) {
  var o = [
    It(Math.round(e).toString(16)),
    It(Math.round(t).toString(16)),
    It(Math.round(n).toString(16))
  ];
  return r && o[0].startsWith(o[0].charAt(1)) && o[1].startsWith(o[1].charAt(1)) && o[2].startsWith(o[2].charAt(1)) ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) : o.join("");
}
function Up(e, t, n, r, o) {
  var i = [
    It(Math.round(e).toString(16)),
    It(Math.round(t).toString(16)),
    It(Math.round(n).toString(16)),
    It(zp(r))
  ];
  return o && i[0].startsWith(i[0].charAt(1)) && i[1].startsWith(i[1].charAt(1)) && i[2].startsWith(i[2].charAt(1)) && i[3].startsWith(i[3].charAt(1)) ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) + i[3].charAt(0) : i.join("");
}
function zp(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function La(e) {
  return Me(e) / 255;
}
function Me(e) {
  return parseInt(e, 16);
}
function Wp(e) {
  return {
    r: e >> 16,
    g: (e & 65280) >> 8,
    b: e & 255
  };
}
var Uo = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function Yt(e) {
  var t = { r: 0, g: 0, b: 0 }, n = 1, r = null, o = null, i = null, a = !1, s = !1;
  return typeof e == "string" && (e = Yp(e)), typeof e == "object" && (ot(e.r) && ot(e.g) && ot(e.b) ? (t = Rp(e.r, e.g, e.b), a = !0, s = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : ot(e.h) && ot(e.s) && ot(e.v) ? (r = ir(e.s), o = ir(e.v), t = Bp(e.h, r, o), a = !0, s = "hsv") : ot(e.h) && ot(e.s) && ot(e.l) && (r = ir(e.s), i = ir(e.l), t = Hp(e.h, r, i), a = !0, s = "hsl"), Object.prototype.hasOwnProperty.call(e, "a") && (n = e.a)), n = sc(n), {
    ok: a,
    format: e.format || s,
    r: Math.min(255, Math.max(t.r, 0)),
    g: Math.min(255, Math.max(t.g, 0)),
    b: Math.min(255, Math.max(t.b, 0)),
    a: n
  };
}
var Kp = "[-\\+]?\\d+%?", qp = "[-\\+]?\\d*\\.\\d+%?", yt = "(?:".concat(qp, ")|(?:").concat(Kp, ")"), oo = "[\\s|\\(]+(".concat(yt, ")[,|\\s]+(").concat(yt, ")[,|\\s]+(").concat(yt, ")\\s*\\)?"), io = "[\\s|\\(]+(".concat(yt, ")[,|\\s]+(").concat(yt, ")[,|\\s]+(").concat(yt, ")[,|\\s]+(").concat(yt, ")\\s*\\)?"), He = {
  CSS_UNIT: new RegExp(yt),
  rgb: new RegExp("rgb" + oo),
  rgba: new RegExp("rgba" + io),
  hsl: new RegExp("hsl" + oo),
  hsla: new RegExp("hsla" + io),
  hsv: new RegExp("hsv" + oo),
  hsva: new RegExp("hsva" + io),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function Yp(e) {
  if (e = e.trim().toLowerCase(), e.length === 0)
    return !1;
  var t = !1;
  if (Uo[e])
    e = Uo[e], t = !0;
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var n = He.rgb.exec(e);
  return n ? { r: n[1], g: n[2], b: n[3] } : (n = He.rgba.exec(e), n ? { r: n[1], g: n[2], b: n[3], a: n[4] } : (n = He.hsl.exec(e), n ? { h: n[1], s: n[2], l: n[3] } : (n = He.hsla.exec(e), n ? { h: n[1], s: n[2], l: n[3], a: n[4] } : (n = He.hsv.exec(e), n ? { h: n[1], s: n[2], v: n[3] } : (n = He.hsva.exec(e), n ? { h: n[1], s: n[2], v: n[3], a: n[4] } : (n = He.hex8.exec(e), n ? {
    r: Me(n[1]),
    g: Me(n[2]),
    b: Me(n[3]),
    a: La(n[4]),
    format: t ? "name" : "hex8"
  } : (n = He.hex6.exec(e), n ? {
    r: Me(n[1]),
    g: Me(n[2]),
    b: Me(n[3]),
    format: t ? "name" : "hex"
  } : (n = He.hex4.exec(e), n ? {
    r: Me(n[1] + n[1]),
    g: Me(n[2] + n[2]),
    b: Me(n[3] + n[3]),
    a: La(n[4] + n[4]),
    format: t ? "name" : "hex8"
  } : (n = He.hex3.exec(e), n ? {
    r: Me(n[1] + n[1]),
    g: Me(n[2] + n[2]),
    b: Me(n[3] + n[3]),
    format: t ? "name" : "hex"
  } : !1)))))))));
}
function ot(e) {
  return Boolean(He.CSS_UNIT.exec(String(e)));
}
var ao = function() {
  function e(t, n) {
    t === void 0 && (t = ""), n === void 0 && (n = {});
    var r;
    if (t instanceof e)
      return t;
    typeof t == "number" && (t = Wp(t)), this.originalInput = t;
    var o = Yt(t);
    this.originalInput = t, this.r = o.r, this.g = o.g, this.b = o.b, this.a = o.a, this.roundA = Math.round(100 * this.a) / 100, this.format = (r = n.format) !== null && r !== void 0 ? r : o.format, this.gradientType = n.gradientType, this.r < 1 && (this.r = Math.round(this.r)), this.g < 1 && (this.g = Math.round(this.g)), this.b < 1 && (this.b = Math.round(this.b)), this.isValid = o.ok;
  }
  return e.prototype.isDark = function() {
    return this.getBrightness() < 128;
  }, e.prototype.isLight = function() {
    return !this.isDark();
  }, e.prototype.getBrightness = function() {
    var t = this.toRgb();
    return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
  }, e.prototype.getLuminance = function() {
    var t = this.toRgb(), n, r, o, i = t.r / 255, a = t.g / 255, s = t.b / 255;
    return i <= 0.03928 ? n = i / 12.92 : n = Math.pow((i + 0.055) / 1.055, 2.4), a <= 0.03928 ? r = a / 12.92 : r = Math.pow((a + 0.055) / 1.055, 2.4), s <= 0.03928 ? o = s / 12.92 : o = Math.pow((s + 0.055) / 1.055, 2.4), 0.2126 * n + 0.7152 * r + 0.0722 * o;
  }, e.prototype.getAlpha = function() {
    return this.a;
  }, e.prototype.setAlpha = function(t) {
    return this.a = sc(t), this.roundA = Math.round(100 * this.a) / 100, this;
  }, e.prototype.toHsv = function() {
    var t = Ho(this.r, this.g, this.b);
    return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
  }, e.prototype.toHsvString = function() {
    var t = Ho(this.r, this.g, this.b), n = Math.round(t.h * 360), r = Math.round(t.s * 100), o = Math.round(t.v * 100);
    return this.a === 1 ? "hsv(".concat(n, ", ").concat(r, "%, ").concat(o, "%)") : "hsva(".concat(n, ", ").concat(r, "%, ").concat(o, "%, ").concat(this.roundA, ")");
  }, e.prototype.toHsl = function() {
    var t = Fa(this.r, this.g, this.b);
    return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
  }, e.prototype.toHslString = function() {
    var t = Fa(this.r, this.g, this.b), n = Math.round(t.h * 360), r = Math.round(t.s * 100), o = Math.round(t.l * 100);
    return this.a === 1 ? "hsl(".concat(n, ", ").concat(r, "%, ").concat(o, "%)") : "hsla(".concat(n, ", ").concat(r, "%, ").concat(o, "%, ").concat(this.roundA, ")");
  }, e.prototype.toHex = function(t) {
    return t === void 0 && (t = !1), Bo(this.r, this.g, this.b, t);
  }, e.prototype.toHexString = function(t) {
    return t === void 0 && (t = !1), "#" + this.toHex(t);
  }, e.prototype.toHex8 = function(t) {
    return t === void 0 && (t = !1), Up(this.r, this.g, this.b, this.a, t);
  }, e.prototype.toHex8String = function(t) {
    return t === void 0 && (t = !1), "#" + this.toHex8(t);
  }, e.prototype.toRgb = function() {
    return {
      r: Math.round(this.r),
      g: Math.round(this.g),
      b: Math.round(this.b),
      a: this.a
    };
  }, e.prototype.toRgbString = function() {
    var t = Math.round(this.r), n = Math.round(this.g), r = Math.round(this.b);
    return this.a === 1 ? "rgb(".concat(t, ", ").concat(n, ", ").concat(r, ")") : "rgba(".concat(t, ", ").concat(n, ", ").concat(r, ", ").concat(this.roundA, ")");
  }, e.prototype.toPercentageRgb = function() {
    var t = function(n) {
      return "".concat(Math.round(_e(n, 255) * 100), "%");
    };
    return {
      r: t(this.r),
      g: t(this.g),
      b: t(this.b),
      a: this.a
    };
  }, e.prototype.toPercentageRgbString = function() {
    var t = function(n) {
      return Math.round(_e(n, 255) * 100);
    };
    return this.a === 1 ? "rgb(".concat(t(this.r), "%, ").concat(t(this.g), "%, ").concat(t(this.b), "%)") : "rgba(".concat(t(this.r), "%, ").concat(t(this.g), "%, ").concat(t(this.b), "%, ").concat(this.roundA, ")");
  }, e.prototype.toName = function() {
    if (this.a === 0)
      return "transparent";
    if (this.a < 1)
      return !1;
    for (var t = "#" + Bo(this.r, this.g, this.b, !1), n = 0, r = Object.entries(Uo); n < r.length; n++) {
      var o = r[n], i = o[0], a = o[1];
      if (t === a)
        return i;
    }
    return !1;
  }, e.prototype.toString = function(t) {
    var n = Boolean(t);
    t = t != null ? t : this.format;
    var r = !1, o = this.a < 1 && this.a >= 0, i = !n && o && (t.startsWith("hex") || t === "name");
    return i ? t === "name" && this.a === 0 ? this.toName() : this.toRgbString() : (t === "rgb" && (r = this.toRgbString()), t === "prgb" && (r = this.toPercentageRgbString()), (t === "hex" || t === "hex6") && (r = this.toHexString()), t === "hex3" && (r = this.toHexString(!0)), t === "hex4" && (r = this.toHex8String(!0)), t === "hex8" && (r = this.toHex8String()), t === "name" && (r = this.toName()), t === "hsl" && (r = this.toHslString()), t === "hsv" && (r = this.toHsvString()), r || this.toHexString());
  }, e.prototype.toNumber = function() {
    return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
  }, e.prototype.clone = function() {
    return new e(this.toString());
  }, e.prototype.lighten = function(t) {
    t === void 0 && (t = 10);
    var n = this.toHsl();
    return n.l += t / 100, n.l = or(n.l), new e(n);
  }, e.prototype.brighten = function(t) {
    t === void 0 && (t = 10);
    var n = this.toRgb();
    return n.r = Math.max(0, Math.min(255, n.r - Math.round(255 * -(t / 100)))), n.g = Math.max(0, Math.min(255, n.g - Math.round(255 * -(t / 100)))), n.b = Math.max(0, Math.min(255, n.b - Math.round(255 * -(t / 100)))), new e(n);
  }, e.prototype.darken = function(t) {
    t === void 0 && (t = 10);
    var n = this.toHsl();
    return n.l -= t / 100, n.l = or(n.l), new e(n);
  }, e.prototype.tint = function(t) {
    return t === void 0 && (t = 10), this.mix("white", t);
  }, e.prototype.shade = function(t) {
    return t === void 0 && (t = 10), this.mix("black", t);
  }, e.prototype.desaturate = function(t) {
    t === void 0 && (t = 10);
    var n = this.toHsl();
    return n.s -= t / 100, n.s = or(n.s), new e(n);
  }, e.prototype.saturate = function(t) {
    t === void 0 && (t = 10);
    var n = this.toHsl();
    return n.s += t / 100, n.s = or(n.s), new e(n);
  }, e.prototype.greyscale = function() {
    return this.desaturate(100);
  }, e.prototype.spin = function(t) {
    var n = this.toHsl(), r = (n.h + t) % 360;
    return n.h = r < 0 ? 360 + r : r, new e(n);
  }, e.prototype.mix = function(t, n) {
    n === void 0 && (n = 50);
    var r = this.toRgb(), o = new e(t).toRgb(), i = n / 100, a = {
      r: (o.r - r.r) * i + r.r,
      g: (o.g - r.g) * i + r.g,
      b: (o.b - r.b) * i + r.b,
      a: (o.a - r.a) * i + r.a
    };
    return new e(a);
  }, e.prototype.analogous = function(t, n) {
    t === void 0 && (t = 6), n === void 0 && (n = 30);
    var r = this.toHsl(), o = 360 / n, i = [this];
    for (r.h = (r.h - (o * t >> 1) + 720) % 360; --t; )
      r.h = (r.h + o) % 360, i.push(new e(r));
    return i;
  }, e.prototype.complement = function() {
    var t = this.toHsl();
    return t.h = (t.h + 180) % 360, new e(t);
  }, e.prototype.monochromatic = function(t) {
    t === void 0 && (t = 6);
    for (var n = this.toHsv(), r = n.h, o = n.s, i = n.v, a = [], s = 1 / t; t--; )
      a.push(new e({ h: r, s: o, v: i })), i = (i + s) % 1;
    return a;
  }, e.prototype.splitcomplement = function() {
    var t = this.toHsl(), n = t.h;
    return [
      this,
      new e({ h: (n + 72) % 360, s: t.s, l: t.l }),
      new e({ h: (n + 216) % 360, s: t.s, l: t.l })
    ];
  }, e.prototype.onBackground = function(t) {
    var n = this.toRgb(), r = new e(t).toRgb();
    return new e({
      r: r.r + (n.r - r.r) * n.a,
      g: r.g + (n.g - r.g) * n.a,
      b: r.b + (n.b - r.b) * n.a
    });
  }, e.prototype.triad = function() {
    return this.polyad(3);
  }, e.prototype.tetrad = function() {
    return this.polyad(4);
  }, e.prototype.polyad = function(t) {
    for (var n = this.toHsl(), r = n.h, o = [this], i = 360 / t, a = 1; a < t; a++)
      o.push(new e({ h: (r + a * i) % 360, s: n.s, l: n.l }));
    return o;
  }, e.prototype.equals = function(t) {
    return this.toRgbString() === new e(t).toRgbString();
  }, e;
}(), ar = 2, Ra = 0.16, Gp = 0.05, Jp = 0.05, Zp = 0.15, lc = 5, cc = 4, Qp = [{
  index: 7,
  opacity: 0.15
}, {
  index: 6,
  opacity: 0.25
}, {
  index: 5,
  opacity: 0.3
}, {
  index: 5,
  opacity: 0.45
}, {
  index: 5,
  opacity: 0.65
}, {
  index: 5,
  opacity: 0.85
}, {
  index: 4,
  opacity: 0.9
}, {
  index: 3,
  opacity: 0.95
}, {
  index: 2,
  opacity: 0.97
}, {
  index: 1,
  opacity: 0.98
}];
function Ha(e) {
  var t = e.r, n = e.g, r = e.b, o = Ho(t, n, r);
  return {
    h: o.h * 360,
    s: o.s,
    v: o.v
  };
}
function sr(e) {
  var t = e.r, n = e.g, r = e.b;
  return "#".concat(Bo(t, n, r, !1));
}
function Xp(e, t, n) {
  var r = n / 100, o = {
    r: (t.r - e.r) * r + e.r,
    g: (t.g - e.g) * r + e.g,
    b: (t.b - e.b) * r + e.b
  };
  return o;
}
function Ba(e, t, n) {
  var r;
  return Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? r = n ? Math.round(e.h) - ar * t : Math.round(e.h) + ar * t : r = n ? Math.round(e.h) + ar * t : Math.round(e.h) - ar * t, r < 0 ? r += 360 : r >= 360 && (r -= 360), r;
}
function Ua(e, t, n) {
  if (e.h === 0 && e.s === 0)
    return e.s;
  var r;
  return n ? r = e.s - Ra * t : t === cc ? r = e.s + Ra : r = e.s + Gp * t, r > 1 && (r = 1), n && t === lc && r > 0.1 && (r = 0.1), r < 0.06 && (r = 0.06), Number(r.toFixed(2));
}
function za(e, t, n) {
  var r;
  return n ? r = e.v + Jp * t : r = e.v - Zp * t, r > 1 && (r = 1), Number(r.toFixed(2));
}
function zn(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [], r = Yt(e), o = lc; o > 0; o -= 1) {
    var i = Ha(r), a = sr(Yt({
      h: Ba(i, o, !0),
      s: Ua(i, o, !0),
      v: za(i, o, !0)
    }));
    n.push(a);
  }
  n.push(sr(r));
  for (var s = 1; s <= cc; s += 1) {
    var l = Ha(r), u = sr(Yt({
      h: Ba(l, s),
      s: Ua(l, s),
      v: za(l, s)
    }));
    n.push(u);
  }
  return t.theme === "dark" ? Qp.map(function(f) {
    var c = f.index, p = f.opacity, g = sr(Xp(Yt(t.backgroundColor || "#141414"), Yt(n[c]), p * 100));
    return g;
  }) : n;
}
var so = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1890FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#666666"
}, lo = {}, co = {};
Object.keys(so).forEach(function(e) {
  lo[e] = zn(so[e]), lo[e].primary = lo[e][5], co[e] = zn(so[e], {
    theme: "dark",
    backgroundColor: "#141414"
  }), co[e].primary = co[e][5];
});
var Wa = [], Cn = [], eh = "insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).";
function th() {
  var e = document.createElement("style");
  return e.setAttribute("type", "text/css"), e;
}
function nh(e, t) {
  if (t = t || {}, e === void 0)
    throw new Error(eh);
  var n = t.prepend === !0 ? "prepend" : "append", r = t.container !== void 0 ? t.container : document.querySelector("head"), o = Wa.indexOf(r);
  o === -1 && (o = Wa.push(r) - 1, Cn[o] = {});
  var i;
  return Cn[o] !== void 0 && Cn[o][n] !== void 0 ? i = Cn[o][n] : (i = Cn[o][n] = th(), n === "prepend" ? r.insertBefore(i, r.childNodes[0]) : r.appendChild(i)), e.charCodeAt(0) === 65279 && (e = e.substr(1, e.length)), i.styleSheet ? i.styleSheet.cssText += e : i.textContent += e, i;
}
function Ka(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      rh(e, o, n[o]);
    });
  }
  return e;
}
function rh(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function oh(e, t) {
  ({}).NODE_ENV !== "production" && !e && console !== void 0 && console.error("Warning: ".concat(t));
}
function ih(e, t) {
  oh(e, "[@ant-design/icons-vue] ".concat(t));
}
function qa(e) {
  return typeof e == "object" && typeof e.name == "string" && typeof e.theme == "string" && (typeof e.icon == "object" || typeof e.icon == "function");
}
function zo(e, t, n) {
  return n ? Io(e.tag, Ka({
    key: t
  }, n, e.attrs), (e.children || []).map(function(r, o) {
    return zo(r, "".concat(t, "-").concat(e.tag, "-").concat(o));
  })) : Io(e.tag, Ka({
    key: t
  }, e.attrs), (e.children || []).map(function(r, o) {
    return zo(r, "".concat(t, "-").concat(e.tag, "-").concat(o));
  }));
}
function uc(e) {
  return zn(e)[0];
}
function fc(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
var ah = `
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`, Ya = !1, sh = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ah;
  Fr(function() {
    Ya || (typeof window < "u" && window.document && window.document.documentElement && nh(t, {
      prepend: !0
    }), Ya = !0);
  });
}, lh = ["icon", "primaryColor", "secondaryColor"];
function ch(e, t) {
  if (e == null)
    return {};
  var n = uh(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (o = 0; o < i.length; o++)
      r = i[o], !(t.indexOf(r) >= 0) && (!Object.prototype.propertyIsEnumerable.call(e, r) || (n[r] = e[r]));
  }
  return n;
}
function uh(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function yr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      fh(e, o, n[o]);
    });
  }
  return e;
}
function fh(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Dn = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function dh(e) {
  var t = e.primaryColor, n = e.secondaryColor;
  Dn.primaryColor = t, Dn.secondaryColor = n || uc(t), Dn.calculated = !!n;
}
function ph() {
  return yr({}, Dn);
}
var mn = function(t, n) {
  var r = yr({}, t, n.attrs), o = r.icon, i = r.primaryColor, a = r.secondaryColor, s = ch(r, lh), l = Dn;
  if (i && (l = {
    primaryColor: i,
    secondaryColor: a || uc(i)
  }), sh(), ih(qa(o), "icon should be icon definiton, but got ".concat(o)), !qa(o))
    return null;
  var u = o;
  return u && typeof u.icon == "function" && (u = yr({}, u, {
    icon: u.icon(l.primaryColor, l.secondaryColor)
  })), zo(u.icon, "svg-".concat(u.name), yr({}, s, {
    "data-icon": u.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }));
};
mn.props = {
  icon: Object,
  primaryColor: String,
  secondaryColor: String,
  focusable: String
};
mn.inheritAttrs = !1;
mn.displayName = "IconBase";
mn.getTwoToneColors = ph;
mn.setTwoToneColors = dh;
const wi = mn;
function hh(e, t) {
  return yh(e) || vh(e, t) || mh(e, t) || gh();
}
function gh() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mh(e, t) {
  if (!!e) {
    if (typeof e == "string")
      return Ga(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Ga(e, t);
  }
}
function Ga(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function vh(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r = [], o = !0, i = !1, a, s;
    try {
      for (n = n.call(e); !(o = (a = n.next()).done) && (r.push(a.value), !(t && r.length === t)); o = !0)
        ;
    } catch (l) {
      i = !0, s = l;
    } finally {
      try {
        !o && n.return != null && n.return();
      } finally {
        if (i)
          throw s;
      }
    }
    return r;
  }
}
function yh(e) {
  if (Array.isArray(e))
    return e;
}
function dc(e) {
  var t = fc(e), n = hh(t, 2), r = n[0], o = n[1];
  return wi.setTwoToneColors({
    primaryColor: r,
    secondaryColor: o
  });
}
function bh() {
  var e = wi.getTwoToneColors();
  return e.calculated ? [e.primaryColor, e.secondaryColor] : e.primaryColor;
}
var _h = ["class", "icon", "spin", "rotate", "tabindex", "twoToneColor", "onClick"];
function Eh(e, t) {
  return wh(e) || Nh(e, t) || Ch(e, t) || Oh();
}
function Oh() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ch(e, t) {
  if (!!e) {
    if (typeof e == "string")
      return Ja(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Ja(e, t);
  }
}
function Ja(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function Nh(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r = [], o = !0, i = !1, a, s;
    try {
      for (n = n.call(e); !(o = (a = n.next()).done) && (r.push(a.value), !(t && r.length === t)); o = !0)
        ;
    } catch (l) {
      i = !0, s = l;
    } finally {
      try {
        !o && n.return != null && n.return();
      } finally {
        if (i)
          throw s;
      }
    }
    return r;
  }
}
function wh(e) {
  if (Array.isArray(e))
    return e;
}
function Za(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      Wo(e, o, n[o]);
    });
  }
  return e;
}
function Wo(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function xh(e, t) {
  if (e == null)
    return {};
  var n = Th(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (o = 0; o < i.length; o++)
      r = i[o], !(t.indexOf(r) >= 0) && (!Object.prototype.propertyIsEnumerable.call(e, r) || (n[r] = e[r]));
  }
  return n;
}
function Th(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
dc("#1890ff");
var vn = function(t, n) {
  var r, o = Za({}, t, n.attrs), i = o.class, a = o.icon, s = o.spin, l = o.rotate, u = o.tabindex, f = o.twoToneColor, c = o.onClick, p = xh(o, _h), g = (r = {
    anticon: !0
  }, Wo(r, "anticon-".concat(a.name), Boolean(a.name)), Wo(r, i, i), r), v = s === "" || !!s || a.name === "loading" ? "anticon-spin" : "", E = u;
  E === void 0 && c && (E = -1, p.tabindex = E);
  var F = l ? {
    msTransform: "rotate(".concat(l, "deg)"),
    transform: "rotate(".concat(l, "deg)")
  } : void 0, L = fc(f), A = Eh(L, 2), W = A[0], K = A[1];
  return w("span", Za({
    role: "img",
    "aria-label": a.name
  }, p, {
    onClick: c,
    class: g
  }), [w(wi, {
    class: v,
    icon: a,
    primaryColor: W,
    secondaryColor: K,
    style: F
  }, null)]);
};
vn.props = {
  spin: Boolean,
  rotate: Number,
  icon: Object,
  twoToneColor: String
};
vn.displayName = "AntdIcon";
vn.inheritAttrs = !1;
vn.getTwoToneColor = bh;
vn.setTwoToneColor = dc;
const rt = vn;
function Qa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      Sh(e, o, n[o]);
    });
  }
  return e;
}
function Sh(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var xi = function(t, n) {
  var r = Qa({}, t, n.attrs);
  return w(rt, Qa({}, r, {
    icon: kp
  }), null);
};
xi.displayName = "LoadingOutlined";
xi.inheritAttrs = !1;
const Ko = xi;
var Ph = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, name: "exclamation-circle", theme: "filled" };
const Ah = Ph;
function Xa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      Dh(e, o, n[o]);
    });
  }
  return e;
}
function Dh(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Ti = function(t, n) {
  var r = Xa({}, t, n.attrs);
  return w(rt, Xa({}, r, {
    icon: Ah
  }), null);
};
Ti.displayName = "ExclamationCircleFilled";
Ti.inheritAttrs = !1;
const $h = Ti;
var Ih = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" } }] }, name: "close-circle", theme: "filled" };
const Mh = Ih;
function es(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      jh(e, o, n[o]);
    });
  }
  return e;
}
function jh(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Si = function(t, n) {
  var r = es({}, t, n.attrs);
  return w(rt, es({}, r, {
    icon: Mh
  }), null);
};
Si.displayName = "CloseCircleFilled";
Si.inheritAttrs = !1;
const Vh = Si;
var kh = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" } }] }, name: "check-circle", theme: "filled" };
const Fh = kh;
function ts(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      Lh(e, o, n[o]);
    });
  }
  return e;
}
function Lh(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Pi = function(t, n) {
  var r = ts({}, t, n.attrs);
  return w(rt, ts({}, r, {
    icon: Fh
  }), null);
};
Pi.displayName = "CheckCircleFilled";
Pi.inheritAttrs = !1;
const Rh = Pi;
var Hh = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, name: "info-circle", theme: "filled" };
const Bh = Hh;
function ns(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      Uh(e, o, n[o]);
    });
  }
  return e;
}
function Uh(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Ai = function(t, n) {
  var r = ns({}, t, n.attrs);
  return w(rt, ns({}, r, {
    icon: Bh
  }), null);
};
Ai.displayName = "InfoCircleFilled";
Ai.inheritAttrs = !1;
const zh = Ai;
var pc = 3, hc, Se, Wh = 1, gc = "", mc = "move-up", vc = !1, yc = function() {
  return document.body;
}, bc, _c = !1;
function Kh() {
  return Wh++;
}
function qh(e) {
  e.top !== void 0 && (hc = e.top, Se = null), e.duration !== void 0 && (pc = e.duration), e.prefixCls !== void 0 && (gc = e.prefixCls), e.getContainer !== void 0 && (yc = e.getContainer, Se = null), e.transitionName !== void 0 && (mc = e.transitionName, Se = null, vc = !0), e.maxCount !== void 0 && (bc = e.maxCount, Se = null), e.rtl !== void 0 && (_c = e.rtl);
}
function Yh(e, t) {
  if (Se) {
    t(Se);
    return;
  }
  ac.newInstance({
    appContext: e.appContext,
    prefixCls: e.prefixCls || gc,
    rootPrefixCls: e.rootPrefixCls,
    transitionName: mc,
    hasTransitionName: vc,
    style: {
      top: hc
    },
    getContainer: yc || e.getPopupContainer,
    maxCount: bc,
    name: "message"
  }, function(n) {
    if (Se) {
      t(Se);
      return;
    }
    Se = n, t(n);
  });
}
var Gh = {
  info: zh,
  success: Rh,
  error: Vh,
  warning: $h,
  loading: Ko
};
function Jh(e) {
  var t = e.duration !== void 0 ? e.duration : pc, n = e.key || Kh(), r = new Promise(function(i) {
    var a = function() {
      return typeof e.onClose == "function" && e.onClose(), i(!0);
    };
    Yh(e, function(s) {
      s.notice({
        key: n,
        duration: t,
        style: e.style || {},
        class: e.class,
        content: function(u) {
          var f, c = u.prefixCls, p = Gh[e.type], g = p ? w(p, null, null) : "", v = Gn("".concat(c, "-custom-content"), (f = {}, fe(f, "".concat(c, "-").concat(e.type), e.type), fe(f, "".concat(c, "-rtl"), _c === !0), f));
          return w("div", {
            class: v
          }, [typeof e.icon == "function" ? e.icon() : e.icon || g, w("span", null, [typeof e.content == "function" ? e.content() : e.content])]);
        },
        onClose: a,
        onClick: e.onClick
      });
    });
  }), o = function() {
    Se && Se.removeNotice(n);
  };
  return o.then = function(i, a) {
    return r.then(i, a);
  }, o.promise = r, o;
}
function Zh(e) {
  return Object.prototype.toString.call(e) === "[object Object]" && !!e.content;
}
var Pr = {
  open: Jh,
  config: qh,
  destroy: function(t) {
    if (Se)
      if (t) {
        var n = Se, r = n.removeNotice;
        r(t);
      } else {
        var o = Se, i = o.destroy;
        i(), Se = null;
      }
  }
};
function Qh(e, t) {
  e[t] = function(n, r, o) {
    return Zh(n) ? e.open(oe(oe({}, n), {
      type: t
    })) : (typeof r == "function" && (o = r, r = void 0), e.open({
      content: n,
      duration: r,
      type: t,
      onClose: o
    }));
  };
}
["success", "info", "warning", "error", "loading"].forEach(function(e) {
  return Qh(Pr, e);
});
Pr.warn = Pr.warning;
const Xh = Pr;
var Ec = { exports: {} }, Oc = { exports: {} };
(function(e) {
  function t(n) {
    return e.exports = t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
      return typeof r;
    } : function(r) {
      return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Oc);
(function(e) {
  var t = Oc.exports.default;
  function n() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
    e.exports = n = function() {
      return r;
    }, e.exports.__esModule = !0, e.exports.default = e.exports;
    var r = {}, o = Object.prototype, i = o.hasOwnProperty, a = typeof Symbol == "function" ? Symbol : {}, s = a.iterator || "@@iterator", l = a.asyncIterator || "@@asyncIterator", u = a.toStringTag || "@@toStringTag";
    function f(b, y, H) {
      return Object.defineProperty(b, y, {
        value: H,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), b[y];
    }
    try {
      f({}, "");
    } catch {
      f = function(H, B, M) {
        return H[B] = M;
      };
    }
    function c(b, y, H, B) {
      var M = y && y.prototype instanceof v ? y : v, k = Object.create(M.prototype), re = new q(B || []);
      return k._invoke = function(me, ge, te) {
        var se = "suspendedStart";
        return function(Pe, Jn) {
          if (se === "executing")
            throw new Error("Generator is already running");
          if (se === "completed") {
            if (Pe === "throw")
              throw Jn;
            return j();
          }
          for (te.method = Pe, te.arg = Jn; ; ) {
            var Zn = te.delegate;
            if (Zn) {
              var $e = D(Zn, te);
              if ($e) {
                if ($e === g)
                  continue;
                return $e;
              }
            }
            if (te.method === "next")
              te.sent = te._sent = te.arg;
            else if (te.method === "throw") {
              if (se === "suspendedStart")
                throw se = "completed", te.arg;
              te.dispatchException(te.arg);
            } else
              te.method === "return" && te.abrupt("return", te.arg);
            se = "executing";
            var Ke = p(me, ge, te);
            if (Ke.type === "normal") {
              if (se = te.done ? "completed" : "suspendedYield", Ke.arg === g)
                continue;
              return {
                value: Ke.arg,
                done: te.done
              };
            }
            Ke.type === "throw" && (se = "completed", te.method = "throw", te.arg = Ke.arg);
          }
        };
      }(b, H, re), k;
    }
    function p(b, y, H) {
      try {
        return {
          type: "normal",
          arg: b.call(y, H)
        };
      } catch (B) {
        return {
          type: "throw",
          arg: B
        };
      }
    }
    r.wrap = c;
    var g = {};
    function v() {
    }
    function E() {
    }
    function F() {
    }
    var L = {};
    f(L, s, function() {
      return this;
    });
    var A = Object.getPrototypeOf, W = A && A(A(ee([])));
    W && W !== o && i.call(W, s) && (L = W);
    var K = F.prototype = v.prototype = Object.create(L);
    function R(b) {
      ["next", "throw", "return"].forEach(function(y) {
        f(b, y, function(H) {
          return this._invoke(y, H);
        });
      });
    }
    function C(b, y) {
      function H(M, k, re, me) {
        var ge = p(b[M], b, k);
        if (ge.type !== "throw") {
          var te = ge.arg, se = te.value;
          return se && t(se) == "object" && i.call(se, "__await") ? y.resolve(se.__await).then(function(Pe) {
            H("next", Pe, re, me);
          }, function(Pe) {
            H("throw", Pe, re, me);
          }) : y.resolve(se).then(function(Pe) {
            te.value = Pe, re(te);
          }, function(Pe) {
            return H("throw", Pe, re, me);
          });
        }
        me(ge.arg);
      }
      var B;
      this._invoke = function(M, k) {
        function re() {
          return new y(function(me, ge) {
            H(M, k, me, ge);
          });
        }
        return B = B ? B.then(re, re) : re();
      };
    }
    function D(b, y) {
      var H = b.iterator[y.method];
      if (H === void 0) {
        if (y.delegate = null, y.method === "throw") {
          if (b.iterator.return && (y.method = "return", y.arg = void 0, D(b, y), y.method === "throw"))
            return g;
          y.method = "throw", y.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return g;
      }
      var B = p(H, b.iterator, y.arg);
      if (B.type === "throw")
        return y.method = "throw", y.arg = B.arg, y.delegate = null, g;
      var M = B.arg;
      return M ? M.done ? (y[b.resultName] = M.value, y.next = b.nextLoc, y.method !== "return" && (y.method = "next", y.arg = void 0), y.delegate = null, g) : M : (y.method = "throw", y.arg = new TypeError("iterator result is not an object"), y.delegate = null, g);
    }
    function S(b) {
      var y = {
        tryLoc: b[0]
      };
      1 in b && (y.catchLoc = b[1]), 2 in b && (y.finallyLoc = b[2], y.afterLoc = b[3]), this.tryEntries.push(y);
    }
    function V(b) {
      var y = b.completion || {};
      y.type = "normal", delete y.arg, b.completion = y;
    }
    function q(b) {
      this.tryEntries = [{
        tryLoc: "root"
      }], b.forEach(S, this), this.reset(!0);
    }
    function ee(b) {
      if (b) {
        var y = b[s];
        if (y)
          return y.call(b);
        if (typeof b.next == "function")
          return b;
        if (!isNaN(b.length)) {
          var H = -1, B = function M() {
            for (; ++H < b.length; )
              if (i.call(b, H))
                return M.value = b[H], M.done = !1, M;
            return M.value = void 0, M.done = !0, M;
          };
          return B.next = B;
        }
      }
      return {
        next: j
      };
    }
    function j() {
      return {
        value: void 0,
        done: !0
      };
    }
    return E.prototype = F, f(K, "constructor", F), f(F, "constructor", E), E.displayName = f(F, u, "GeneratorFunction"), r.isGeneratorFunction = function(b) {
      var y = typeof b == "function" && b.constructor;
      return !!y && (y === E || (y.displayName || y.name) === "GeneratorFunction");
    }, r.mark = function(b) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(b, F) : (b.__proto__ = F, f(b, u, "GeneratorFunction")), b.prototype = Object.create(K), b;
    }, r.awrap = function(b) {
      return {
        __await: b
      };
    }, R(C.prototype), f(C.prototype, l, function() {
      return this;
    }), r.AsyncIterator = C, r.async = function(b, y, H, B, M) {
      M === void 0 && (M = Promise);
      var k = new C(c(b, y, H, B), M);
      return r.isGeneratorFunction(y) ? k : k.next().then(function(re) {
        return re.done ? re.value : k.next();
      });
    }, R(K), f(K, u, "Generator"), f(K, s, function() {
      return this;
    }), f(K, "toString", function() {
      return "[object Generator]";
    }), r.keys = function(b) {
      var y = [];
      for (var H in b)
        y.push(H);
      return y.reverse(), function B() {
        for (; y.length; ) {
          var M = y.pop();
          if (M in b)
            return B.value = M, B.done = !1, B;
        }
        return B.done = !0, B;
      };
    }, r.values = ee, q.prototype = {
      constructor: q,
      reset: function(y) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(V), !y)
          for (var H in this)
            H.charAt(0) === "t" && i.call(this, H) && !isNaN(+H.slice(1)) && (this[H] = void 0);
      },
      stop: function() {
        this.done = !0;
        var y = this.tryEntries[0].completion;
        if (y.type === "throw")
          throw y.arg;
        return this.rval;
      },
      dispatchException: function(y) {
        if (this.done)
          throw y;
        var H = this;
        function B(te, se) {
          return re.type = "throw", re.arg = y, H.next = te, se && (H.method = "next", H.arg = void 0), !!se;
        }
        for (var M = this.tryEntries.length - 1; M >= 0; --M) {
          var k = this.tryEntries[M], re = k.completion;
          if (k.tryLoc === "root")
            return B("end");
          if (k.tryLoc <= this.prev) {
            var me = i.call(k, "catchLoc"), ge = i.call(k, "finallyLoc");
            if (me && ge) {
              if (this.prev < k.catchLoc)
                return B(k.catchLoc, !0);
              if (this.prev < k.finallyLoc)
                return B(k.finallyLoc);
            } else if (me) {
              if (this.prev < k.catchLoc)
                return B(k.catchLoc, !0);
            } else {
              if (!ge)
                throw new Error("try statement without catch or finally");
              if (this.prev < k.finallyLoc)
                return B(k.finallyLoc);
            }
          }
        }
      },
      abrupt: function(y, H) {
        for (var B = this.tryEntries.length - 1; B >= 0; --B) {
          var M = this.tryEntries[B];
          if (M.tryLoc <= this.prev && i.call(M, "finallyLoc") && this.prev < M.finallyLoc) {
            var k = M;
            break;
          }
        }
        k && (y === "break" || y === "continue") && k.tryLoc <= H && H <= k.finallyLoc && (k = null);
        var re = k ? k.completion : {};
        return re.type = y, re.arg = H, k ? (this.method = "next", this.next = k.finallyLoc, g) : this.complete(re);
      },
      complete: function(y, H) {
        if (y.type === "throw")
          throw y.arg;
        return y.type === "break" || y.type === "continue" ? this.next = y.arg : y.type === "return" ? (this.rval = this.arg = y.arg, this.method = "return", this.next = "end") : y.type === "normal" && H && (this.next = H), g;
      },
      finish: function(y) {
        for (var H = this.tryEntries.length - 1; H >= 0; --H) {
          var B = this.tryEntries[H];
          if (B.finallyLoc === y)
            return this.complete(B.completion, B.afterLoc), V(B), g;
        }
      },
      catch: function(y) {
        for (var H = this.tryEntries.length - 1; H >= 0; --H) {
          var B = this.tryEntries[H];
          if (B.tryLoc === y) {
            var M = B.completion;
            if (M.type === "throw") {
              var k = M.arg;
              V(B);
            }
            return k;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(y, H, B) {
        return this.delegate = {
          iterator: ee(y),
          resultName: H,
          nextLoc: B
        }, this.method === "next" && (this.arg = void 0), g;
      }
    }, r;
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ec);
var uo = Ec.exports();
try {
  regeneratorRuntime = uo;
} catch {
  typeof globalThis == "object" ? globalThis.regeneratorRuntime = uo : Function("r", "regeneratorRuntime = r")(uo);
}
var eg = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" } }, { tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }] }, name: "check-circle", theme: "outlined" };
const tg = eg;
function rs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      ng(e, o, n[o]);
    });
  }
  return e;
}
function ng(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Di = function(t, n) {
  var r = rs({}, t, n.attrs);
  return w(rt, rs({}, r, {
    icon: tg
  }), null);
};
Di.displayName = "CheckCircleOutlined";
Di.inheritAttrs = !1;
const rg = Di;
var og = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { tag: "path", attrs: { d: "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" } }] }, name: "info-circle", theme: "outlined" };
const ig = og;
function os(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      ag(e, o, n[o]);
    });
  }
  return e;
}
function ag(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var $i = function(t, n) {
  var r = os({}, t, n.attrs);
  return w(rt, os({}, r, {
    icon: ig
  }), null);
};
$i.displayName = "InfoCircleOutlined";
$i.inheritAttrs = !1;
const sg = $i;
var lg = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" } }, { tag: "path", attrs: { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }] }, name: "close-circle", theme: "outlined" };
const cg = lg;
function is(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      ug(e, o, n[o]);
    });
  }
  return e;
}
function ug(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Ii = function(t, n) {
  var r = is({}, t, n.attrs);
  return w(rt, is({}, r, {
    icon: cg
  }), null);
};
Ii.displayName = "CloseCircleOutlined";
Ii.inheritAttrs = !1;
const fg = Ii;
var dg = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { tag: "path", attrs: { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" } }] }, name: "exclamation-circle", theme: "outlined" };
const pg = dg;
function as(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      hg(e, o, n[o]);
    });
  }
  return e;
}
function hg(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var Mi = function(t, n) {
  var r = as({}, t, n.attrs);
  return w(rt, as({}, r, {
    icon: pg
  }), null);
};
Mi.displayName = "ExclamationCircleOutlined";
Mi.inheritAttrs = !1;
const gg = Mi;
var mg = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" } }] }, name: "close", theme: "outlined" };
const vg = mg;
function ss(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? Object(arguments[t]) : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    }))), r.forEach(function(o) {
      yg(e, o, n[o]);
    });
  }
  return e;
}
function yg(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
var ji = function(t, n) {
  var r = ss({}, t, n.attrs);
  return w(rt, ss({}, r, {
    icon: vg
  }), null);
};
ji.displayName = "CloseOutlined";
ji.inheritAttrs = !1;
const bg = ji;
globalThis && globalThis.__awaiter;
var $t = {}, Cc = 4.5, Nc = "24px", wc = "24px", qo = "", xc = "topRight", Tc = function() {
  return document.body;
}, Sc = null, Yo = !1, Pc;
function _g(e) {
  var t = e.duration, n = e.placement, r = e.bottom, o = e.top, i = e.getContainer, a = e.closeIcon, s = e.prefixCls;
  s !== void 0 && (qo = s), t !== void 0 && (Cc = t), n !== void 0 && (xc = n), r !== void 0 && (wc = typeof r == "number" ? "".concat(r, "px") : r), o !== void 0 && (Nc = typeof o == "number" ? "".concat(o, "px") : o), i !== void 0 && (Tc = i), a !== void 0 && (Sc = a), e.rtl !== void 0 && (Yo = e.rtl), e.maxCount !== void 0 && (Pc = e.maxCount);
}
function Eg(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Nc, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : wc, r;
  switch (e) {
    case "topLeft":
      r = {
        left: "0px",
        top: t,
        bottom: "auto"
      };
      break;
    case "topRight":
      r = {
        right: "0px",
        top: t,
        bottom: "auto"
      };
      break;
    case "bottomLeft":
      r = {
        left: "0px",
        top: "auto",
        bottom: n
      };
      break;
    default:
      r = {
        right: "0px",
        top: "auto",
        bottom: n
      };
      break;
  }
  return r;
}
function Og(e, t) {
  var n = e.prefixCls, r = e.placement, o = r === void 0 ? xc : r, i = e.getContainer, a = i === void 0 ? Tc : i, s = e.top, l = e.bottom, u = e.closeIcon, f = u === void 0 ? Sc : u, c = e.appContext, p = kg(), g = p.getPrefixCls, v = g("notification", n || qo), E = "".concat(v, "-").concat(o, "-").concat(Yo), F = $t[E];
  if (F) {
    Promise.resolve(F).then(function(A) {
      t(A);
    });
    return;
  }
  var L = Gn("".concat(v, "-").concat(o), fe({}, "".concat(v, "-rtl"), Yo === !0));
  ac.newInstance({
    name: "notification",
    prefixCls: n || qo,
    class: L,
    style: Eg(o, s, l),
    appContext: c,
    getContainer: a,
    closeIcon: function(W) {
      var K = W.prefixCls, R = w("span", {
        class: "".concat(K, "-close-x")
      }, [xn(f, {}, w(bg, {
        class: "".concat(K, "-close-icon")
      }, null))]);
      return R;
    },
    maxCount: Pc,
    hasTransitionName: !0
  }, function(A) {
    $t[E] = A, t(A);
  });
}
var Cg = {
  success: rg,
  info: sg,
  error: fg,
  warning: gg
};
function Ng(e) {
  var t = e.icon, n = e.type, r = e.description, o = e.message, i = e.btn, a = e.duration === void 0 ? Cc : e.duration;
  Og(e, function(s) {
    s.notice({
      content: function(u) {
        var f = u.prefixCls, c = "".concat(f, "-notice"), p = null;
        if (t)
          p = function() {
            return w("span", {
              class: "".concat(c, "-icon")
            }, [xn(t)]);
          };
        else if (n) {
          var g = Cg[n];
          p = function() {
            return w(g, {
              class: "".concat(c, "-icon ").concat(c, "-icon-").concat(n)
            }, null);
          };
        }
        return w("div", {
          class: p ? "".concat(c, "-with-icon") : ""
        }, [p && p(), w("div", {
          class: "".concat(c, "-message")
        }, [!r && p ? w("span", {
          class: "".concat(c, "-message-single-line-auto-margin")
        }, null) : null, xn(o)]), w("div", {
          class: "".concat(c, "-description")
        }, [xn(r)]), i ? w("span", {
          class: "".concat(c, "-btn")
        }, [xn(i)]) : null]);
      },
      duration: a,
      closable: !0,
      onClose: e.onClose,
      onClick: e.onClick,
      key: e.key,
      style: e.style || {},
      class: e.class
    });
  });
}
var Wn = {
  open: Ng,
  close: function(t) {
    Object.keys($t).forEach(function(n) {
      return Promise.resolve($t[n]).then(function(r) {
        r.removeNotice(t);
      });
    });
  },
  config: _g,
  destroy: function() {
    Object.keys($t).forEach(function(t) {
      Promise.resolve($t[t]).then(function(n) {
        n.destroy();
      }), delete $t[t];
    });
  }
}, wg = ["success", "info", "warning", "error"];
wg.forEach(function(e) {
  Wn[e] = function(t) {
    return Wn.open(oe(oe({}, t), {
      type: e
    }));
  };
});
Wn.warn = Wn.warning;
const xg = Wn;
function Ac() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var Tg = "vc-util-key";
function Dc() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.mark;
  return t ? t.startsWith("data-") ? t : "data-".concat(t) : Tg;
}
function Vi(e) {
  if (e.attachTo)
    return e.attachTo;
  var t = document.querySelector("head");
  return t || document.body;
}
function ls(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n, r;
  if (!Ac())
    return null;
  var o = document.createElement("style");
  !((n = t.csp) === null || n === void 0) && n.nonce && (o.nonce = (r = t.csp) === null || r === void 0 ? void 0 : r.nonce), o.innerHTML = e;
  var i = Vi(t), a = i.firstChild;
  return t.prepend && i.prepend ? i.prepend(o) : t.prepend && a ? i.insertBefore(o, a) : i.appendChild(o), o;
}
var Go = /* @__PURE__ */ new Map();
function Sg(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = Vi(t);
  return Array.from(Go.get(n).children).find(function(r) {
    return r.tagName === "STYLE" && r.getAttribute(Dc(t)) === e;
  });
}
function Pg(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r, o, i, a = Vi(n);
  if (!Go.has(a)) {
    var s = ls("", n), l = s.parentNode;
    Go.set(a, l), l.removeChild(s);
  }
  var u = Sg(t, n);
  if (u)
    return ((r = n.csp) === null || r === void 0 ? void 0 : r.nonce) && u.nonce !== ((o = n.csp) === null || o === void 0 ? void 0 : o.nonce) && (u.nonce = (i = n.csp) === null || i === void 0 ? void 0 : i.nonce), u.innerHTML !== e && (u.innerHTML = e), u;
  var f = ls(e, n);
  return f.setAttribute(Dc(n), t), f;
}
const $c = function(e, t, n) {
  ic(e, "[ant-design-vue: ".concat(t, "] ").concat(n));
};
var Ag = "-ant-".concat(Date.now(), "-").concat(Math.random());
function Dg(e, t) {
  var n = {}, r = function(f, c) {
    var p = f.clone();
    return p = (c == null ? void 0 : c(p)) || p, p.toRgbString();
  }, o = function(f, c) {
    var p = new ao(f), g = zn(p.toRgbString());
    n["".concat(c, "-color")] = r(p), n["".concat(c, "-color-disabled")] = g[1], n["".concat(c, "-color-hover")] = g[4], n["".concat(c, "-color-active")] = g[6], n["".concat(c, "-color-outline")] = p.clone().setAlpha(0.2).toRgbString(), n["".concat(c, "-color-deprecated-bg")] = g[1], n["".concat(c, "-color-deprecated-border")] = g[3];
  };
  if (t.primaryColor) {
    o(t.primaryColor, "primary");
    var i = new ao(t.primaryColor), a = zn(i.toRgbString());
    a.forEach(function(u, f) {
      n["primary-".concat(f + 1)] = u;
    }), n["primary-color-deprecated-l-35"] = r(i, function(u) {
      return u.lighten(35);
    }), n["primary-color-deprecated-l-20"] = r(i, function(u) {
      return u.lighten(20);
    }), n["primary-color-deprecated-t-20"] = r(i, function(u) {
      return u.tint(20);
    }), n["primary-color-deprecated-t-50"] = r(i, function(u) {
      return u.tint(50);
    }), n["primary-color-deprecated-f-12"] = r(i, function(u) {
      return u.setAlpha(u.getAlpha() * 0.12);
    });
    var s = new ao(a[0]);
    n["primary-color-active-deprecated-f-30"] = r(s, function(u) {
      return u.setAlpha(u.getAlpha() * 0.3);
    }), n["primary-color-active-deprecated-d-02"] = r(s, function(u) {
      return u.darken(2);
    });
  }
  t.successColor && o(t.successColor, "success"), t.warningColor && o(t.warningColor, "warning"), t.errorColor && o(t.errorColor, "error"), t.infoColor && o(t.infoColor, "info");
  var l = Object.keys(n).map(function(u) {
    return "--".concat(e, "-").concat(u, ": ").concat(n[u], ";");
  });
  Ac() ? Pg(`
  :root {
    `.concat(l.join(`
`), `
  }
  `), "".concat(Ag, "-dynamic-theme")) : $c(!1, "ConfigProvider", "SSR do not support dynamic theme with css variables.");
}
var $g = Symbol("GlobalFormContextKey"), Ig = function(t) {
  Hr($g, t);
}, Mg = function() {
  return {
    getTargetContainer: {
      type: Function
    },
    getPopupContainer: {
      type: Function
    },
    prefixCls: String,
    getPrefixCls: {
      type: Function
    },
    renderEmpty: {
      type: Function
    },
    transformCellText: {
      type: Function
    },
    csp: {
      type: Object,
      default: void 0
    },
    input: {
      type: Object
    },
    autoInsertSpaceInButton: {
      type: Boolean,
      default: void 0
    },
    locale: {
      type: Object,
      default: void 0
    },
    pageHeader: {
      type: Object
    },
    componentSize: {
      type: String
    },
    direction: {
      type: String
    },
    space: {
      type: Object
    },
    virtual: {
      type: Boolean,
      default: void 0
    },
    dropdownMatchSelectWidth: {
      type: [Number, Boolean],
      default: !0
    },
    form: {
      type: Object,
      default: void 0
    },
    notUpdateGlobalConfig: Boolean
  };
}, jg = "ant";
function on() {
  return ke.prefixCls || jg;
}
var Jo = nt({}), Ic = nt({}), ke = nt({});
Br(function() {
  oe(ke, Jo, Ic), ke.prefixCls = on(), ke.getPrefixCls = function(e, t) {
    return t || (e ? "".concat(ke.prefixCls, "-").concat(e) : ke.prefixCls);
  }, ke.getRootPrefixCls = function(e, t) {
    return e || (ke.prefixCls ? ke.prefixCls : t && t.includes("-") ? t.replace(/^(.*)-[^-]*$/, "$1") : on());
  };
});
var fo, Vg = function(t) {
  fo && fo(), fo = Br(function() {
    oe(Ic, nt(t));
  }), t.theme && Dg(on(), t.theme);
}, kg = function() {
  return {
    getPrefixCls: function(n, r) {
      return r || (n ? "".concat(on(), "-").concat(n) : on());
    },
    getRootPrefixCls: function(n, r) {
      return n || (ke.prefixCls ? ke.prefixCls : r && r.includes("-") ? r.replace(/^(.*)-[^-]*$/, "$1") : on());
    }
  };
}, $n = We({
  name: "AConfigProvider",
  inheritAttrs: !1,
  props: Mg(),
  setup: function(t, n) {
    var r = n.slots, o = function(c, p) {
      var g = t.prefixCls, v = g === void 0 ? "ant" : g;
      return p || (c ? "".concat(v, "-").concat(c) : v);
    }, i = function(c) {
      var p = t.renderEmpty || r.renderEmpty || oc;
      return p(c);
    }, a = function(c, p) {
      var g = t.prefixCls;
      if (p)
        return p;
      var v = g || o("");
      return c ? "".concat(v, "-").concat(c) : v;
    }, s = nt(oe(oe({}, t), {
      getPrefixCls: a,
      renderEmpty: i
    }));
    Object.keys(t).forEach(function(f) {
      Et(function() {
        return t[f];
      }, function() {
        s[f] = t[f];
      });
    }), t.notUpdateGlobalConfig || (oe(Jo, s), Et(s, function() {
      oe(Jo, s);
    }));
    var l = ue(function() {
      var f, c, p = {};
      return t.locale && (p = ((f = t.locale.Form) === null || f === void 0 ? void 0 : f.defaultValidateMessages) || ((c = ko.Form) === null || c === void 0 ? void 0 : c.defaultValidateMessages) || {}), t.form && t.form.validateMessages && (p = oe(oe({}, p), t.form.validateMessages)), p;
    });
    Ig({
      validateMessages: l
    }), Hr("configProvider", s);
    var u = function(c) {
      var p;
      return w(Ap, {
        locale: t.locale || c,
        ANT_MARK__: Lo
      }, {
        default: function() {
          return [(p = r.default) === null || p === void 0 ? void 0 : p.call(r)];
        }
      });
    };
    return Br(function() {
      t.direction && (Xh.config({
        rtl: t.direction === "rtl"
      }), xg.config({
        rtl: t.direction === "rtl"
      }));
    }), function() {
      return w(Ul, {
        children: function(c, p, g) {
          return u(g);
        }
      }, null);
    };
  }
}), Fg = nt({
  getPrefixCls: function(t, n) {
    return n || (t ? "ant-".concat(t) : "ant");
  },
  renderEmpty: oc,
  direction: "ltr"
});
$n.config = Vg;
$n.install = function(e) {
  e.component($n.name, $n);
};
const zt = function(e, t) {
  var n = Sn("configProvider", Fg), r = ue(function() {
    return n.getPrefixCls(e, t.prefixCls);
  }), o = ue(function() {
    var A;
    return (A = t.direction) !== null && A !== void 0 ? A : n.direction;
  }), i = ue(function() {
    return n.getPrefixCls();
  }), a = ue(function() {
    return n.autoInsertSpaceInButton;
  }), s = ue(function() {
    return n.renderEmpty;
  }), l = ue(function() {
    return n.space;
  }), u = ue(function() {
    return n.pageHeader;
  }), f = ue(function() {
    return n.form;
  }), c = ue(function() {
    return t.getTargetContainer || n.getTargetContainer;
  }), p = ue(function() {
    return t.getPopupContainer || n.getPopupContainer;
  }), g = ue(function() {
    var A;
    return (A = t.dropdownMatchSelectWidth) !== null && A !== void 0 ? A : n.dropdownMatchSelectWidth;
  }), v = ue(function() {
    return (t.virtual === void 0 ? n.virtual !== !1 : t.virtual !== !1) && g.value !== !1;
  }), E = ue(function() {
    return t.size || n.componentSize;
  }), F = ue(function() {
    var A;
    return t.autocomplete || ((A = n.input) === null || A === void 0 ? void 0 : A.autocomplete);
  }), L = ue(function() {
    return n.csp;
  });
  return {
    configProvider: n,
    prefixCls: r,
    direction: o,
    size: E,
    getTargetContainer: c,
    getPopupContainer: p,
    space: l,
    pageHeader: u,
    form: f,
    autoInsertSpaceInButton: a,
    renderEmpty: s,
    virtual: v,
    dropdownMatchSelectWidth: g,
    rootPrefixCls: i,
    getPrefixCls: n.getPrefixCls,
    autocomplete: F,
    csp: L
  };
};
var po = {
  transitionstart: {
    transition: "transitionstart",
    WebkitTransition: "webkitTransitionStart",
    MozTransition: "mozTransitionStart",
    OTransition: "oTransitionStart",
    msTransition: "MSTransitionStart"
  },
  animationstart: {
    animation: "animationstart",
    WebkitAnimation: "webkitAnimationStart",
    MozAnimation: "mozAnimationStart",
    OAnimation: "oAnimationStart",
    msAnimation: "MSAnimationStart"
  }
}, ho = {
  transitionend: {
    transition: "transitionend",
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "mozTransitionEnd",
    OTransition: "oTransitionEnd",
    msTransition: "MSTransitionEnd"
  },
  animationend: {
    animation: "animationend",
    WebkitAnimation: "webkitAnimationEnd",
    MozAnimation: "mozAnimationEnd",
    OAnimation: "oAnimationEnd",
    msAnimation: "MSAnimationEnd"
  }
}, Gt = [], Jt = [];
function Lg() {
  var e = document.createElement("div"), t = e.style;
  "AnimationEvent" in window || (delete po.animationstart.animation, delete ho.animationend.animation), "TransitionEvent" in window || (delete po.transitionstart.transition, delete ho.transitionend.transition);
  function n(r, o) {
    for (var i in r)
      if (r.hasOwnProperty(i)) {
        var a = r[i];
        for (var s in a)
          if (s in t) {
            o.push(a[s]);
            break;
          }
      }
  }
  n(po, Gt), n(ho, Jt);
}
typeof window < "u" && typeof document < "u" && Lg();
function cs(e, t, n) {
  e.addEventListener(t, n, !1);
}
function us(e, t, n) {
  e.removeEventListener(t, n, !1);
}
var Rg = {
  startEvents: Gt,
  addStartEventListener: function(t, n) {
    if (Gt.length === 0) {
      setTimeout(n, 0);
      return;
    }
    Gt.forEach(function(r) {
      cs(t, r, n);
    });
  },
  removeStartEventListener: function(t, n) {
    Gt.length !== 0 && Gt.forEach(function(r) {
      us(t, r, n);
    });
  },
  endEvents: Jt,
  addEndEventListener: function(t, n) {
    if (Jt.length === 0) {
      setTimeout(n, 0);
      return;
    }
    Jt.forEach(function(r) {
      cs(t, r, n);
    });
  },
  removeEndEventListener: function(t, n) {
    Jt.length !== 0 && Jt.forEach(function(r) {
      us(t, r, n);
    });
  }
};
const lr = Rg;
var pt;
function fs(e) {
  return {}.NODE_ENV === "test" ? !1 : !e || e.offsetParent === null;
}
function Hg(e) {
  var t = (e || "").match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
  return t && t[1] && t[2] && t[3] ? !(t[1] === t[2] && t[2] === t[3]) : !0;
}
const Bg = We({
  name: "Wave",
  props: {
    insertExtraNode: Boolean,
    disabled: Boolean
  },
  setup: function(t, n) {
    var r = n.slots, o = n.expose, i = _i(), a = zt("", t), s = a.csp, l = a.prefixCls;
    o({
      csp: s
    });
    var u = null, f = null, c = null, p = !1, g = null, v = !1, E = function(C) {
      if (!v) {
        var D = Sa(i);
        !C || C.target !== D || p || W(D);
      }
    }, F = function(C) {
      !C || C.animationName !== "fadeEffect" || W(C.target);
    }, L = function() {
      var C = t.insertExtraNode;
      return C ? "".concat(l.value, "-click-animating") : "".concat(l.value, "-click-animating-without-extra-node");
    }, A = function(C, D) {
      var S, V = t.insertExtraNode, q = t.disabled;
      if (!(q || !C || fs(C) || C.className.indexOf("-leave") >= 0)) {
        g = document.createElement("div"), g.className = "".concat(l.value, "-click-animating-node");
        var ee = L();
        C.removeAttribute(ee), C.setAttribute(ee, "true"), pt = pt || document.createElement("style"), D && D !== "#ffffff" && D !== "rgb(255, 255, 255)" && Hg(D) && !/rgba\(\d*, \d*, \d*, 0\)/.test(D) && D !== "transparent" && (!((S = s.value) === null || S === void 0) && S.nonce && (pt.nonce = s.value.nonce), g.style.borderColor = D, pt.innerHTML = `
        [`.concat(l.value, "-click-animating-without-extra-node='true']::after, .").concat(l.value, `-click-animating-node {
          --antd-wave-shadow-color: `).concat(D, `;
        }`), document.body.contains(pt) || document.body.appendChild(pt)), V && C.appendChild(g), lr.addStartEventListener(C, E), lr.addEndEventListener(C, F);
      }
    }, W = function(C) {
      if (!(!C || C === g || !(C instanceof Element))) {
        var D = t.insertExtraNode, S = L();
        C.setAttribute(S, "false"), pt && (pt.innerHTML = ""), D && g && C.contains(g) && C.removeChild(g), lr.removeStartEventListener(C, E), lr.removeEndEventListener(C, F);
      }
    }, K = function(C) {
      if (!(!C || !C.getAttribute || C.getAttribute("disabled") || C.className.indexOf("disabled") >= 0)) {
        var D = function(V) {
          if (!(V.target.tagName === "INPUT" || fs(V.target))) {
            W(C);
            var q = getComputedStyle(C).getPropertyValue("border-top-color") || getComputedStyle(C).getPropertyValue("border-color") || getComputedStyle(C).getPropertyValue("background-color");
            f = setTimeout(function() {
              return A(C, q);
            }, 0), Vo.cancel(c), p = !0, c = Vo(function() {
              p = !1;
            }, 10);
          }
        };
        return C.addEventListener("click", D, !0), {
          cancel: function() {
            C.removeEventListener("click", D, !0);
          }
        };
      }
    };
    return pn(function() {
      Fr(function() {
        var R = Sa(i);
        R.nodeType === 1 && (u = K(R));
      });
    }), zr(function() {
      u && u.cancel(), clearTimeout(f), v = !0;
    }), function() {
      var R;
      return (R = r.default) === null || R === void 0 ? void 0 : R.call(r)[0];
    };
  }
});
var Ug = function() {
  return {
    prefixCls: String,
    type: String,
    htmlType: {
      type: String,
      default: "button"
    },
    shape: {
      type: String
    },
    size: {
      type: String
    },
    loading: {
      type: [Boolean, Object],
      default: function() {
        return !1;
      }
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    ghost: {
      type: Boolean,
      default: void 0
    },
    block: {
      type: Boolean,
      default: void 0
    },
    danger: {
      type: Boolean,
      default: void 0
    },
    icon: Fo.any,
    href: String,
    target: String,
    title: String,
    onClick: {
      type: Function
    },
    onMousedown: {
      type: Function
    }
  };
};
const zg = Ug;
var ds = function(t) {
  t && (t.style.width = "0px", t.style.opacity = "0", t.style.transform = "scale(0)");
}, ps = function(t) {
  Fr(function() {
    t && (t.style.width = "".concat(t.scrollWidth, "px"), t.style.opacity = "1", t.style.transform = "scale(1)");
  });
}, hs = function(t) {
  t && t.style && (t.style.width = null, t.style.opacity = null, t.style.transform = null);
};
const Wg = We({
  name: "LoadingIcon",
  props: {
    prefixCls: String,
    loading: [Boolean, Object],
    existIcon: Boolean
  },
  setup: function(t) {
    return function() {
      var n = t.existIcon, r = t.prefixCls, o = t.loading;
      if (n)
        return w("span", {
          class: "".concat(r, "-loading-icon")
        }, [w(Ko, null, null)]);
      var i = !!o;
      return w($p, {
        name: "".concat(r, "-loading-icon-motion"),
        onBeforeEnter: ds,
        onEnter: ps,
        onAfterEnter: hs,
        onBeforeLeave: ps,
        onLeave: function(s) {
          setTimeout(function() {
            ds(s);
          });
        },
        onAfterLeave: hs
      }, {
        default: function() {
          return [i ? w("span", {
            class: "".concat(r, "-loading-icon")
          }, [w(Ko, null, null)]) : null];
        }
      });
    };
  }
});
var gs = /^[\u4e00-\u9fa5]{2}$/, ms = gs.test.bind(gs);
function cr(e) {
  return e === "text" || e === "link";
}
const In = We({
  name: "AButton",
  inheritAttrs: !1,
  __ANT_BUTTON: !0,
  props: Jd(zg(), {
    type: "default"
  }),
  slots: ["icon"],
  setup: function(t, n) {
    var r = n.slots, o = n.attrs, i = n.emit, a = zt("btn", t), s = a.prefixCls, l = a.autoInsertSpaceInButton, u = a.direction, f = a.size, c = Xt(null), p = Xt(void 0), g = !1, v = Xt(!1), E = Xt(!1), F = ue(function() {
      return l.value !== !1;
    }), L = ue(function() {
      return xr(t.loading) === "object" && t.loading.delay ? t.loading.delay || !0 : !!t.loading;
    });
    Et(L, function(C) {
      clearTimeout(p.value), typeof L.value == "number" ? p.value = setTimeout(function() {
        v.value = C;
      }, L.value) : v.value = C;
    }, {
      immediate: !0
    });
    var A = ue(function() {
      var C, D = t.type, S = t.shape, V = S === void 0 ? "default" : S, q = t.ghost, ee = t.block, j = t.danger, b = s.value, y = {
        large: "lg",
        small: "sm",
        middle: void 0
      }, H = f.value, B = H && y[H] || "";
      return C = {}, fe(C, "".concat(b), !0), fe(C, "".concat(b, "-").concat(D), D), fe(C, "".concat(b, "-").concat(V), V !== "default" && V), fe(C, "".concat(b, "-").concat(B), B), fe(C, "".concat(b, "-loading"), v.value), fe(C, "".concat(b, "-background-ghost"), q && !cr(D)), fe(C, "".concat(b, "-two-chinese-chars"), E.value && F.value), fe(C, "".concat(b, "-block"), ee), fe(C, "".concat(b, "-dangerous"), !!j), fe(C, "".concat(b, "-rtl"), u.value === "rtl"), C;
    }), W = function() {
      var D = c.value;
      if (!(!D || l.value === !1)) {
        var S = D.textContent;
        g && ms(S) ? E.value || (E.value = !0) : E.value && (E.value = !1);
      }
    }, K = function(D) {
      if (v.value || t.disabled) {
        D.preventDefault();
        return;
      }
      i("click", D);
    }, R = function(D, S) {
      var V = S ? " " : "";
      if (D.type === hn) {
        var q = D.children.trim();
        return ms(q) && (q = q.split("").join(V)), w("span", null, [q]);
      }
      return D;
    };
    return Br(function() {
      $c(!(t.ghost && cr(t.type)), "Button", "`link` or `text` button can't be a `ghost` button.");
    }), pn(W), hi(W), zr(function() {
      p.value && clearTimeout(p.value);
    }), function() {
      var C, D, S = t.icon, V = S === void 0 ? (C = r.icon) === null || C === void 0 ? void 0 : C.call(r) : S, q = jl((D = r.default) === null || D === void 0 ? void 0 : D.call(r));
      g = q.length === 1 && !V && !cr(t.type);
      var ee = t.type, j = t.htmlType, b = t.disabled, y = t.href, H = t.title, B = t.target, M = t.onMousedown, k = v.value ? "loading" : V, re = oe(oe({}, o), {
        title: H,
        disabled: b,
        class: [A.value, o.class, fe({}, "".concat(s.value, "-icon-only"), q.length === 0 && !!k)],
        onClick: K,
        onMousedown: M
      });
      b || delete re.disabled;
      var me = V && !v.value ? V : w(Wg, {
        existIcon: !!V,
        prefixCls: s.value,
        loading: !!v.value
      }, null), ge = q.map(function(se) {
        return R(se, g && F.value);
      });
      if (y !== void 0)
        return w("a", ze(ze({}, re), {}, {
          href: y,
          target: B,
          ref: c
        }), [me, ge]);
      var te = w("button", ze(ze({}, re), {}, {
        ref: c,
        type: j
      }), [me, ge]);
      return cr(ee) ? te : w(Bg, {
        ref: "wave",
        disabled: !!v.value
      }, {
        default: function() {
          return [te];
        }
      });
    };
  }
});
function vs(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function Kg(e, t, n) {
  return t && vs(e.prototype, t), n && vs(e, n), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function qg(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
var Yg = /* @__PURE__ */ Kg(function e(t) {
  qg(this, e), this.error = new Error("unreachable case: ".concat(JSON.stringify(t)));
}), Gg = function() {
  return {
    prefixCls: String,
    size: {
      type: String
    }
  };
};
const Zo = We({
  name: "AButtonGroup",
  props: Gg(),
  setup: function(t, n) {
    var r = n.slots, o = zt("btn-group", t), i = o.prefixCls, a = o.direction, s = ue(function() {
      var l, u = t.size, f = "";
      switch (u) {
        case "large":
          f = "lg";
          break;
        case "small":
          f = "sm";
          break;
        case "middle":
        case void 0:
          break;
        default:
          console.warn(new Yg(u).error);
      }
      return l = {}, fe(l, "".concat(i.value), !0), fe(l, "".concat(i.value, "-").concat(f), f), fe(l, "".concat(i.value, "-rtl"), a.value === "rtl"), l;
    });
    return function() {
      var l;
      return w("div", {
        class: s.value
      }, [jl((l = r.default) === null || l === void 0 ? void 0 : l.call(r))]);
    };
  }
});
In.Group = Zo;
In.install = function(e) {
  return e.component(In.name, In), e.component(Zo.name, Zo), e;
};
const Jg = {
  __name: "Button",
  props: ["value"],
  setup(e) {
    return We({ name: "Button" }), (t, n) => (Uf(), Kf(Bs(In), null, {
      default: rl(() => [
        Cl(Lc(e.value), 1)
      ]),
      _: 1
    }));
  }
}, Zg = {
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
}, Qg = {
  width: "\u5BBD\u5EA6",
  height: "\u9AD8\u5EA6"
}, Xg = [
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
], em = [
  {
    key: "click",
    label: "\u70B9\u51FB"
  }
], tm = [
  {
    key: "width",
    label: "\u5BBD\u5EA6",
    event: (e, t) => e.style.width = t + "px"
  }
], nm = {
  name: "Button",
  basicProps: Zg,
  attrProps: Qg,
  eventProps: Xg,
  linkageEvent: em,
  linkageEventProp: tm
}, rm = { component: Jg, config: nm };
export {
  Jg as Button,
  nm as config,
  rm as default
};
