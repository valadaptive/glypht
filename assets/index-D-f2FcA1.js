(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) a(i);
  new MutationObserver((i) => {
    for (const r of i) if (r.type === "childList") for (const s of r.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && a(s);
  }).observe(document, { childList: true, subtree: true });
  function n(i) {
    const r = {};
    return i.integrity && (r.integrity = i.integrity), i.referrerPolicy && (r.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? r.credentials = "include" : i.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r;
  }
  function a(i) {
    if (i.ep) return;
    i.ep = true;
    const r = n(i);
    fetch(i.href, r);
  }
})();
var Vt, A, Wa, Ja, Pe, la, Ka, Xa, Ga, On, vn, wn, Ya, ut = {}, Za = [], ir = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, Wt = Array.isArray;
function Te(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function En(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
function rr(e, t, n) {
  var a, i, r, s = {};
  for (r in t) r == "key" ? a = t[r] : r == "ref" ? i = t[r] : s[r] = t[r];
  if (arguments.length > 2 && (s.children = arguments.length > 3 ? Vt.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (r in e.defaultProps) s[r] === void 0 && (s[r] = e.defaultProps[r]);
  return kt(e, s, a, i, null);
}
function kt(e, t, n, a, i) {
  var r = { type: e, props: t, key: n, ref: a, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: i ?? ++Wa, __i: -1, __u: 0 };
  return i == null && A.vnode != null && A.vnode(r), r;
}
function ie(e) {
  return e.children;
}
function be(e, t) {
  this.props = e, this.context = t;
}
function Xe(e, t) {
  if (t == null) return e.__ ? Xe(e.__, e.__i + 1) : null;
  for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
  return typeof e.type == "function" ? Xe(e) : null;
}
function Qa(e) {
  var t, n;
  if ((e = e.__) != null && e.__c != null) {
    for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) {
      e.__e = e.__c.base = n.__e;
      break;
    }
    return Qa(e);
  }
}
function _n(e) {
  (!e.__d && (e.__d = true) && Pe.push(e) && !Nt.__r++ || la != A.debounceRendering) && ((la = A.debounceRendering) || Ka)(Nt);
}
function Nt() {
  for (var e, t, n, a, i, r, s, o = 1; Pe.length; ) Pe.length > o && Pe.sort(Xa), e = Pe.shift(), o = Pe.length, e.__d && (n = void 0, i = (a = (t = e).__v).__e, r = [], s = [], t.__P && ((n = Te({}, a)).__v = a.__v + 1, A.vnode && A.vnode(n), Rn(t.__P, n, a, t.__n, t.__P.namespaceURI, 32 & a.__u ? [i] : null, r, i ?? Xe(a), !!(32 & a.__u), s), n.__v = a.__v, n.__.__k[n.__i] = n, ni(r, n, s), n.__e != i && Qa(n)));
  Nt.__r = 0;
}
function ei(e, t, n, a, i, r, s, o, l, u, c) {
  var h, p, m, v, d, y, g = a && a.__k || Za, b = t.length;
  for (l = sr(n, t, g, l, b), h = 0; h < b; h++) (m = n.__k[h]) != null && (p = m.__i == -1 ? ut : g[m.__i] || ut, m.__i = h, y = Rn(e, m, p, i, r, s, o, l, u, c), v = m.__e, m.ref && p.ref != m.ref && (p.ref && Un(p.ref, null, m), c.push(m.ref, m.__c || v, m)), d == null && v != null && (d = v), 4 & m.__u || p.__k === m.__k ? l = ti(m, l, e) : typeof m.type == "function" && y !== void 0 ? l = y : v && (l = v.nextSibling), m.__u &= -7);
  return n.__e = d, l;
}
function sr(e, t, n, a, i) {
  var r, s, o, l, u, c = n.length, h = c, p = 0;
  for (e.__k = new Array(i), r = 0; r < i; r++) (s = t[r]) != null && typeof s != "boolean" && typeof s != "function" ? (l = r + p, (s = e.__k[r] = typeof s == "string" || typeof s == "number" || typeof s == "bigint" || s.constructor == String ? kt(null, s, null, null, null) : Wt(s) ? kt(ie, { children: s }, null, null, null) : s.constructor == null && s.__b > 0 ? kt(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v) : s).__ = e, s.__b = e.__b + 1, o = null, (u = s.__i = or(s, n, l, h)) != -1 && (h--, (o = n[u]) && (o.__u |= 2)), o == null || o.__v == null ? (u == -1 && (i > c ? p-- : i < c && p++), typeof s.type != "function" && (s.__u |= 4)) : u != l && (u == l - 1 ? p-- : u == l + 1 ? p++ : (u > l ? p-- : p++, s.__u |= 4))) : e.__k[r] = null;
  if (h) for (r = 0; r < c; r++) (o = n[r]) != null && (2 & o.__u) == 0 && (o.__e == a && (a = Xe(o)), ii(o, o));
  return a;
}
function ti(e, t, n) {
  var a, i;
  if (typeof e.type == "function") {
    for (a = e.__k, i = 0; a && i < a.length; i++) a[i] && (a[i].__ = e, t = ti(a[i], t, n));
    return t;
  }
  e.__e != t && (t && e.type && !n.contains(t) && (t = Xe(e)), n.insertBefore(e.__e, t || null), t = e.__e);
  do
    t = t && t.nextSibling;
  while (t != null && t.nodeType == 8);
  return t;
}
function or(e, t, n, a) {
  var i, r, s = e.key, o = e.type, l = t[n];
  if (l === null && e.key == null || l && s == l.key && o == l.type && (2 & l.__u) == 0) return n;
  if (a > (l != null && (2 & l.__u) == 0 ? 1 : 0)) for (i = n - 1, r = n + 1; i >= 0 || r < t.length; ) {
    if (i >= 0) {
      if ((l = t[i]) && (2 & l.__u) == 0 && s == l.key && o == l.type) return i;
      i--;
    }
    if (r < t.length) {
      if ((l = t[r]) && (2 & l.__u) == 0 && s == l.key && o == l.type) return r;
      r++;
    }
  }
  return -1;
}
function ua(e, t, n) {
  t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || ir.test(t) ? n : n + "px";
}
function vt(e, t, n, a, i) {
  var r, s;
  e: if (t == "style") if (typeof n == "string") e.style.cssText = n;
  else {
    if (typeof a == "string" && (e.style.cssText = a = ""), a) for (t in a) n && t in n || ua(e.style, t, "");
    if (n) for (t in n) a && n[t] == a[t] || ua(e.style, t, n[t]);
  }
  else if (t[0] == "o" && t[1] == "n") r = t != (t = t.replace(Ga, "$1")), s = t.toLowerCase(), t = s in e || t == "onFocusOut" || t == "onFocusIn" ? s.slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + r] = n, n ? a ? n.u = a.u : (n.u = On, e.addEventListener(t, r ? wn : vn, r)) : e.removeEventListener(t, r ? wn : vn, r);
  else {
    if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
      e[t] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === false && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
  }
}
function ca(e) {
  return function(t) {
    if (this.l) {
      var n = this.l[t.type + e];
      if (t.t == null) t.t = On++;
      else if (t.t < n.u) return;
      return n(A.event ? A.event(t) : t);
    }
  };
}
function Rn(e, t, n, a, i, r, s, o, l, u) {
  var c, h, p, m, v, d, y, g, b, S, _, T, x, F, w, k, C, I = t.type;
  if (t.constructor != null) return null;
  128 & n.__u && (l = !!(32 & n.__u), r = [o = t.__e = n.__e]), (c = A.__b) && c(t);
  e: if (typeof I == "function") try {
    if (g = t.props, b = "prototype" in I && I.prototype.render, S = (c = I.contextType) && a[c.__c], _ = c ? S ? S.props.value : c.__ : a, n.__c ? y = (h = t.__c = n.__c).__ = h.__E : (b ? t.__c = h = new I(g, _) : (t.__c = h = new be(g, _), h.constructor = I, h.render = ur), S && S.sub(h), h.props = g, h.state || (h.state = {}), h.context = _, h.__n = a, p = h.__d = true, h.__h = [], h._sb = []), b && h.__s == null && (h.__s = h.state), b && I.getDerivedStateFromProps != null && (h.__s == h.state && (h.__s = Te({}, h.__s)), Te(h.__s, I.getDerivedStateFromProps(g, h.__s))), m = h.props, v = h.state, h.__v = t, p) b && I.getDerivedStateFromProps == null && h.componentWillMount != null && h.componentWillMount(), b && h.componentDidMount != null && h.__h.push(h.componentDidMount);
    else {
      if (b && I.getDerivedStateFromProps == null && g !== m && h.componentWillReceiveProps != null && h.componentWillReceiveProps(g, _), !h.__e && h.shouldComponentUpdate != null && h.shouldComponentUpdate(g, h.__s, _) === false || t.__v == n.__v) {
        for (t.__v != n.__v && (h.props = g, h.state = h.__s, h.__d = false), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(j) {
          j && (j.__ = t);
        }), T = 0; T < h._sb.length; T++) h.__h.push(h._sb[T]);
        h._sb = [], h.__h.length && s.push(h);
        break e;
      }
      h.componentWillUpdate != null && h.componentWillUpdate(g, h.__s, _), b && h.componentDidUpdate != null && h.__h.push(function() {
        h.componentDidUpdate(m, v, d);
      });
    }
    if (h.context = _, h.props = g, h.__P = e, h.__e = false, x = A.__r, F = 0, b) {
      for (h.state = h.__s, h.__d = false, x && x(t), c = h.render(h.props, h.state, h.context), w = 0; w < h._sb.length; w++) h.__h.push(h._sb[w]);
      h._sb = [];
    } else do
      h.__d = false, x && x(t), c = h.render(h.props, h.state, h.context), h.state = h.__s;
    while (h.__d && ++F < 25);
    h.state = h.__s, h.getChildContext != null && (a = Te(Te({}, a), h.getChildContext())), b && !p && h.getSnapshotBeforeUpdate != null && (d = h.getSnapshotBeforeUpdate(m, v)), k = c, c != null && c.type === ie && c.key == null && (k = ai(c.props.children)), o = ei(e, Wt(k) ? k : [k], t, n, a, i, r, s, o, l, u), h.base = t.__e, t.__u &= -161, h.__h.length && s.push(h), y && (h.__E = h.__ = null);
  } catch (j) {
    if (t.__v = null, l || r != null) if (j.then) {
      for (t.__u |= l ? 160 : 128; o && o.nodeType == 8 && o.nextSibling; ) o = o.nextSibling;
      r[r.indexOf(o)] = null, t.__e = o;
    } else for (C = r.length; C--; ) En(r[C]);
    else t.__e = n.__e, t.__k = n.__k;
    A.__e(j, t, n);
  }
  else r == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : o = t.__e = lr(n.__e, t, n, a, i, r, s, l, u);
  return (c = A.diffed) && c(t), 128 & t.__u ? void 0 : o;
}
function ni(e, t, n) {
  for (var a = 0; a < n.length; a++) Un(n[a], n[++a], n[++a]);
  A.__c && A.__c(t, e), e.some(function(i) {
    try {
      e = i.__h, i.__h = [], e.some(function(r) {
        r.call(i);
      });
    } catch (r) {
      A.__e(r, i.__v);
    }
  });
}
function ai(e) {
  return typeof e != "object" || e == null || e.__b && e.__b > 0 ? e : Wt(e) ? e.map(ai) : Te({}, e);
}
function lr(e, t, n, a, i, r, s, o, l) {
  var u, c, h, p, m, v, d, y = n.props, g = t.props, b = t.type;
  if (b == "svg" ? i = "http://www.w3.org/2000/svg" : b == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), r != null) {
    for (u = 0; u < r.length; u++) if ((m = r[u]) && "setAttribute" in m == !!b && (b ? m.localName == b : m.nodeType == 3)) {
      e = m, r[u] = null;
      break;
    }
  }
  if (e == null) {
    if (b == null) return document.createTextNode(g);
    e = document.createElementNS(i, b, g.is && g), o && (A.__m && A.__m(t, r), o = false), r = null;
  }
  if (b == null) y === g || o && e.data == g || (e.data = g);
  else {
    if (r = r && Vt.call(e.childNodes), y = n.props || ut, !o && r != null) for (y = {}, u = 0; u < e.attributes.length; u++) y[(m = e.attributes[u]).name] = m.value;
    for (u in y) if (m = y[u], u != "children") {
      if (u == "dangerouslySetInnerHTML") h = m;
      else if (!(u in g)) {
        if (u == "value" && "defaultValue" in g || u == "checked" && "defaultChecked" in g) continue;
        vt(e, u, null, m, i);
      }
    }
    for (u in g) m = g[u], u == "children" ? p = m : u == "dangerouslySetInnerHTML" ? c = m : u == "value" ? v = m : u == "checked" ? d = m : o && typeof m != "function" || y[u] === m || vt(e, u, m, y[u], i);
    if (c) o || h && (c.__html == h.__html || c.__html == e.innerHTML) || (e.innerHTML = c.__html), t.__k = [];
    else if (h && (e.innerHTML = ""), ei(t.type == "template" ? e.content : e, Wt(p) ? p : [p], t, n, a, b == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, r, s, r ? r[0] : n.__k && Xe(n, 0), o, l), r != null) for (u = r.length; u--; ) En(r[u]);
    o || (u = "value", b == "progress" && v == null ? e.removeAttribute("value") : v != null && (v !== e[u] || b == "progress" && !v || b == "option" && v != y[u]) && vt(e, u, v, y[u], i), u = "checked", d != null && d != e[u] && vt(e, u, d, y[u], i));
  }
  return e;
}
function Un(e, t, n) {
  try {
    if (typeof e == "function") {
      var a = typeof e.__u == "function";
      a && e.__u(), a && t == null || (e.__u = e(t));
    } else e.current = t;
  } catch (i) {
    A.__e(i, n);
  }
}
function ii(e, t, n) {
  var a, i;
  if (A.unmount && A.unmount(e), (a = e.ref) && (a.current && a.current != e.__e || Un(a, null, t)), (a = e.__c) != null) {
    if (a.componentWillUnmount) try {
      a.componentWillUnmount();
    } catch (r) {
      A.__e(r, t);
    }
    a.base = a.__P = null;
  }
  if (a = e.__k) for (i = 0; i < a.length; i++) a[i] && ii(a[i], t, n || typeof e.type != "function");
  n || En(e.__e), e.__c = e.__ = e.__e = void 0;
}
function ur(e, t, n) {
  return this.constructor(e, n);
}
function cr(e, t, n) {
  var a, i, r, s;
  t == document && (t = document.documentElement), A.__ && A.__(e, t), i = (a = false) ? null : t.__k, r = [], s = [], Rn(t, e = t.__k = rr(ie, null, [e]), i || ut, ut, t.namespaceURI, i ? null : t.firstChild ? Vt.call(t.childNodes) : null, r, i ? i.__e : t.firstChild, a, s), ni(r, e, s);
}
function Pn(e) {
  function t(n) {
    var a, i;
    return this.getChildContext || (a = /* @__PURE__ */ new Set(), (i = {})[t.__c] = this, this.getChildContext = function() {
      return i;
    }, this.componentWillUnmount = function() {
      a = null;
    }, this.shouldComponentUpdate = function(r) {
      this.props.value != r.value && a.forEach(function(s) {
        s.__e = true, _n(s);
      });
    }, this.sub = function(r) {
      a.add(r);
      var s = r.componentWillUnmount;
      r.componentWillUnmount = function() {
        a && a.delete(r), s && s.call(r);
      };
    }), n.children;
  }
  return t.__c = "__cC" + Ya++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(n, a) {
    return n.children(a);
  }).contextType = t, t;
}
Vt = Za.slice, A = { __e: function(e, t, n, a) {
  for (var i, r, s; t = t.__; ) if ((i = t.__c) && !i.__) try {
    if ((r = i.constructor) && r.getDerivedStateFromError != null && (i.setState(r.getDerivedStateFromError(e)), s = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, a || {}), s = i.__d), s) return i.__E = i;
  } catch (o) {
    e = o;
  }
  throw e;
} }, Wa = 0, Ja = function(e) {
  return e != null && e.constructor == null;
}, be.prototype.setState = function(e, t) {
  var n;
  n = this.__s != null && this.__s != this.state ? this.__s : this.__s = Te({}, this.state), typeof e == "function" && (e = e(Te({}, n), this.props)), e && Te(n, e), e != null && this.__v && (t && this._sb.push(t), _n(this));
}, be.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = true, e && this.__h.push(e), _n(this));
}, be.prototype.render = ie, Pe = [], Ka = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Xa = function(e, t) {
  return e.__v.__b - t.__v.__b;
}, Nt.__r = 0, Ga = /(PointerCapture)$|Capture$/i, On = 0, vn = ca(false), wn = ca(true), Ya = 0;
var hr = 0;
function f(e, t, n, a, i, r) {
  t || (t = {});
  var s, o, l = t;
  if ("ref" in l) for (o in l = {}, t) o == "ref" ? s = t[o] : l[o] = t[o];
  var u = { type: e, props: l, key: n, ref: s, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --hr, __i: -1, __u: 0, __source: i, __self: r };
  if (typeof e == "function" && (s = e.defaultProps)) for (o in s) l[o] === void 0 && (l[o] = s[o]);
  return A.vnode && A.vnode(u), u;
}
var ln;
(ln = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : void 0) != null && ln.__PREACT_DEVTOOLS__ && ln.__PREACT_DEVTOOLS__.attachPreact("10.26.9", A, { Fragment: ie, Component: be });
var ha = {};
function ye(e) {
  return e.type === ie ? "Fragment" : typeof e.type == "function" ? e.type.displayName || e.type.name : typeof e.type == "string" ? e.type : "#text";
}
var st = [], $e = [];
function ri() {
  return st.length > 0 ? st[st.length - 1] : null;
}
var fa = true;
function un(e) {
  return typeof e.type == "function" && e.type != ie;
}
function G(e) {
  for (var t = [e], n = e; n.__o != null; ) t.push(n.__o), n = n.__o;
  return t.reduce(function(a, i) {
    a += "  in " + ye(i);
    var r = i.__source;
    return r ? a += " (at " + r.fileName + ":" + r.lineNumber + ")" : fa && console.warn("Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons."), fa = false, a + `
`;
  }, "");
}
var fr = typeof WeakMap == "function";
function xn(e) {
  var t = [];
  return e.__k && e.__k.forEach(function(n) {
    n && typeof n.type == "function" ? t.push.apply(t, xn(n)) : n && typeof n.type == "string" && t.push(n.type);
  }), t;
}
function si(e) {
  return e ? typeof e.type == "function" ? e.__ == null ? e.__e != null && e.__e.parentNode != null ? e.__e.parentNode.localName : "" : si(e.__) : e.type : "";
}
var dr = be.prototype.setState;
function cn(e) {
  return e === "table" || e === "tfoot" || e === "tbody" || e === "thead" || e === "td" || e === "tr" || e === "th";
}
be.prototype.setState = function(e, t) {
  return this.__v == null && this.state == null && console.warn(`Calling "this.setState" inside the constructor of a component is a no-op and might be a bug in your application. Instead, set "this.state = {}" directly.

` + G(ri())), dr.call(this, e, t);
};
var pr = /^(address|article|aside|blockquote|details|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|main|menu|nav|ol|p|pre|search|section|table|ul)$/, gr = be.prototype.forceUpdate;
function ce(e) {
  var t = e.props, n = ye(e), a = "";
  for (var i in t) if (t.hasOwnProperty(i) && i !== "children") {
    var r = t[i];
    typeof r == "function" && (r = "function " + (r.displayName || r.name) + "() {}"), r = Object(r) !== r || r.toString ? r + "" : Object.prototype.toString.call(r), a += " " + i + "=" + JSON.stringify(r);
  }
  var s = t.children;
  return "<" + n + a + (s && s.length ? ">..</" + n + ">" : " />");
}
be.prototype.forceUpdate = function(e) {
  return this.__v == null ? console.warn(`Calling "this.forceUpdate" inside the constructor of a component is a no-op and might be a bug in your application.

` + G(ri())) : this.__P == null && console.warn(`Can't call "this.forceUpdate" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

` + G(this.__v)), gr.call(this, e);
}, A.__m = function(e, t) {
  var n = e.type, a = t.map(function(i) {
    return i && i.localName;
  }).filter(Boolean);
  console.error('Expected a DOM node of type "' + n + '" but found "' + a.join(", ") + `" as available DOM-node(s), this is caused by the SSR'd HTML containing different DOM-nodes compared to the hydrated one.

` + G(e));
}, function() {
  (function() {
    var d = A.__b, y = A.diffed, g = A.__, b = A.vnode, S = A.__r;
    A.diffed = function(_) {
      un(_) && $e.pop(), st.pop(), y && y(_);
    }, A.__b = function(_) {
      un(_) && st.push(_), d && d(_);
    }, A.__ = function(_, T) {
      $e = [], g && g(_, T);
    }, A.vnode = function(_) {
      _.__o = $e.length > 0 ? $e[$e.length - 1] : null, b && b(_);
    }, A.__r = function(_) {
      un(_) && $e.push(_), S && S(_);
    };
  })();
  var e = false, t = A.__b, n = A.diffed, a = A.vnode, i = A.__r, r = A.__e, s = A.__, o = A.__h, l = fr ? { useEffect: /* @__PURE__ */ new WeakMap(), useLayoutEffect: /* @__PURE__ */ new WeakMap(), lazyPropTypes: /* @__PURE__ */ new WeakMap() } : null, u = [];
  A.__e = function(d, y, g, b) {
    if (y && y.__c && typeof d.then == "function") {
      var S = d;
      d = new Error("Missing Suspense. The throwing component was: " + ye(y));
      for (var _ = y; _; _ = _.__) if (_.__c && _.__c.__c) {
        d = S;
        break;
      }
      if (d instanceof Error) throw d;
    }
    try {
      (b = b || {}).componentStack = G(y), r(d, y, g, b), typeof d.then != "function" && setTimeout(function() {
        throw d;
      });
    } catch (T) {
      throw T;
    }
  }, A.__ = function(d, y) {
    if (!y) throw new Error(`Undefined parent passed to render(), this is the second argument.
Check if the element is available in the DOM/has the correct id.`);
    var g;
    switch (y.nodeType) {
      case 1:
      case 11:
      case 9:
        g = true;
        break;
      default:
        g = false;
    }
    if (!g) {
      var b = ye(d);
      throw new Error("Expected a valid HTML node as a second argument to render.	Received " + y + " instead: render(<" + b + " />, " + y + ");");
    }
    s && s(d, y);
  }, A.__b = function(d) {
    var y = d.type;
    if (e = true, y === void 0) throw new Error(`Undefined component passed to createElement()

You likely forgot to export your component or might have mixed up default and named imports` + ce(d) + `

` + G(d));
    if (y != null && typeof y == "object") throw y.__k !== void 0 && y.__e !== void 0 ? new Error("Invalid type passed to createElement(): " + y + `

Did you accidentally pass a JSX literal as JSX twice?

  let My` + ye(d) + " = " + ce(y) + `;
  let vnode = <My` + ye(d) + ` />;

This usually happens when you export a JSX literal and not the component.

` + G(d)) : new Error("Invalid type passed to createElement(): " + (Array.isArray(y) ? "array" : y));
    if (d.ref !== void 0 && typeof d.ref != "function" && typeof d.ref != "object" && !("$$typeof" in d)) throw new Error(`Component's "ref" property should be a function, or an object created by createRef(), but got [` + typeof d.ref + `] instead
` + ce(d) + `

` + G(d));
    if (typeof d.type == "string") {
      for (var g in d.props) if (g[0] === "o" && g[1] === "n" && typeof d.props[g] != "function" && d.props[g] != null) throw new Error(`Component's "` + g + '" property should be a function, but got [' + typeof d.props[g] + `] instead
` + ce(d) + `

` + G(d));
    }
    if (typeof d.type == "function" && d.type.propTypes) {
      if (d.type.displayName === "Lazy" && l && !l.lazyPropTypes.has(d.type)) {
        var b = "PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ";
        try {
          var S = d.type();
          l.lazyPropTypes.set(d.type, true), console.warn(b + "Component wrapped in lazy() is " + ye(S));
        } catch {
          console.warn(b + "We will log the wrapped component's name once it is loaded.");
        }
      }
      var _ = d.props;
      d.type.__f && delete (_ = function(T, x) {
        for (var F in x) T[F] = x[F];
        return T;
      }({}, _)).ref, function(T, x, F, w, k) {
        Object.keys(T).forEach(function(C) {
          var I;
          try {
            I = T[C](x, C, w, "prop", null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (j) {
            I = j;
          }
          I && !(I.message in ha) && (ha[I.message] = true, console.error("Failed prop type: " + I.message + (k && `
` + k() || "")));
        });
      }(d.type.propTypes, _, 0, ye(d), function() {
        return G(d);
      });
    }
    t && t(d);
  };
  var c, h = 0;
  A.__r = function(d) {
    i && i(d), e = true;
    var y = d.__c;
    if (y === c ? h++ : h = 1, h >= 25) throw new Error("Too many re-renders. This is limited to prevent an infinite loop which may lock up your browser. The component causing this is: " + ye(d));
    c = y;
  }, A.__h = function(d, y, g) {
    if (!d || !e) throw new Error("Hook can only be invoked from render methods.");
    o && o(d, y, g);
  };
  var p = function(d, y) {
    return { get: function() {
      var g = "get" + d + y;
      u && u.indexOf(g) < 0 && (u.push(g), console.warn("getting vnode." + d + " is deprecated, " + y));
    }, set: function() {
      var g = "set" + d + y;
      u && u.indexOf(g) < 0 && (u.push(g), console.warn("setting vnode." + d + " is not allowed, " + y));
    } };
  }, m = { nodeName: p("nodeName", "use vnode.type"), attributes: p("attributes", "use vnode.props"), children: p("children", "use vnode.props.children") }, v = Object.create({}, m);
  A.vnode = function(d) {
    var y = d.props;
    if (d.type !== null && y != null && ("__source" in y || "__self" in y)) {
      var g = d.props = {};
      for (var b in y) {
        var S = y[b];
        b === "__source" ? d.__source = S : b === "__self" ? d.__self = S : g[b] = S;
      }
    }
    d.__proto__ = v, a && a(d);
  }, A.diffed = function(d) {
    var y, g = d.type, b = d.__;
    if (d.__k && d.__k.forEach(function(E) {
      if (typeof E == "object" && E && E.type === void 0) {
        var z = Object.keys(E).join(",");
        throw new Error("Objects are not valid as a child. Encountered an object with the keys {" + z + `}.

` + G(d));
      }
    }), d.__c === c && (h = 0), typeof g == "string" && (cn(g) || g === "p" || g === "a" || g === "button")) {
      var S = si(b);
      if (S !== "" && cn(g)) g === "table" && S !== "td" && cn(S) ? console.error("Improper nesting of table. Your <table> should not have a table-node parent." + ce(d) + `

` + G(d)) : g !== "thead" && g !== "tfoot" && g !== "tbody" || S === "table" ? g === "tr" && S !== "thead" && S !== "tfoot" && S !== "tbody" ? console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot> parent." + ce(d) + `

` + G(d)) : g === "td" && S !== "tr" ? console.error("Improper nesting of table. Your <td> should have a <tr> parent." + ce(d) + `

` + G(d)) : g === "th" && S !== "tr" && console.error("Improper nesting of table. Your <th> should have a <tr>." + ce(d) + `

` + G(d)) : console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent." + ce(d) + `

` + G(d));
      else if (g === "p") {
        var _ = xn(d).filter(function(E) {
          return pr.test(E);
        });
        _.length && console.error("Improper nesting of paragraph. Your <p> should not have " + _.join(", ") + " as child-elements." + ce(d) + `

` + G(d));
      } else g !== "a" && g !== "button" || xn(d).indexOf(g) !== -1 && console.error("Improper nesting of interactive content. Your <" + g + "> should not have other " + (g === "a" ? "anchor" : "button") + " tags as child-elements." + ce(d) + `

` + G(d));
    }
    if (e = false, n && n(d), d.__k != null) for (var T = [], x = 0; x < d.__k.length; x++) {
      var F = d.__k[x];
      if (F && F.key != null) {
        var w = F.key;
        if (T.indexOf(w) !== -1) {
          console.error('Following component has two or more children with the same key attribute: "' + w + `". This may cause glitches and misbehavior in rendering process. Component: 

` + ce(d) + `

` + G(d));
          break;
        }
        T.push(w);
      }
    }
    if (d.__c != null && d.__c.__H != null) {
      var k = d.__c.__H.__;
      if (k) for (var C = 0; C < k.length; C += 1) {
        var I = k[C];
        if (I.__H) {
          for (var j = 0; j < I.__H.length; j++) if ((y = I.__H[j]) != y) {
            var V = ye(d);
            console.warn("Invalid argument passed to hook. Hooks should not be called with NaN in the dependency array. Hook index " + C + " in component " + V + " was called with NaN.");
          }
        }
      }
    }
  };
}();
const mr = "_app_sst3a_51", yr = "_display-pane_sst3a_58", br = "_main-pane_sst3a_69", hn = { app: mr, displayPane: yr, mainPane: br }, vr = "_loading_kj5mr_131", wr = "_no-fonts_kj5mr_221", _r = "_upload-header_kj5mr_232", xr = "_upload-sub_kj5mr_237", Sr = "_upload-icon_kj5mr_242", kr = "_families_kj5mr_254", Tr = "_family-settings_kj5mr_260", Fr = "_family-header_kj5mr_270", Ar = "_family-name_kj5mr_278", Cr = "_copy-paste-buttons_kj5mr_283", Nr = "_remove-font_kj5mr_287", Ir = "_remove-font-family_kj5mr_287", Mr = "_num-fonts_kj5mr_291", jr = "_single-font-settings_kj5mr_297", Or = "_single-font-header_kj5mr_308", Er = "_single-font-file-size_kj5mr_314", Rr = "_single-font-subfamily_kj5mr_319", Ur = "_family-settings-body_kj5mr_323", Pr = "_settings-section_kj5mr_328", Dr = "_settings-section-title_kj5mr_345", Br = "_settings-section-title-text_kj5mr_353", Lr = "_settings-section-body_kj5mr_357", qr = "_settings-grid_kj5mr_362", zr = "_single-font-settings-body_kj5mr_369", $r = "_settings-sub-section_kj5mr_374", Hr = "_checkbox-section_kj5mr_385", Vr = "_checkboxes_kj5mr_385", Wr = "_disabled_kj5mr_388", Jr = "_style-setting_kj5mr_392", Kr = "_style-setting-name_kj5mr_396", Xr = "_settings-list_kj5mr_404", Gr = "_static-setting_kj5mr_413", Yr = "_axis-setting_kj5mr_417", Zr = "_axis-setting-modes_kj5mr_425", Qr = "_spinbox-range_kj5mr_429", es = "_label_kj5mr_435", ts = "_unicode-range-textbox_kj5mr_446", ns = "_axis-range-textbox_kj5mr_451", as = "_invalid_kj5mr_455", N = { loading: vr, noFonts: wr, uploadHeader: _r, uploadSub: xr, uploadIcon: Sr, families: kr, familySettings: Tr, familyHeader: Fr, familyName: Ar, copyPasteButtons: Cr, removeFont: Nr, removeFontFamily: Ir, numFonts: Mr, singleFontSettings: jr, singleFontHeader: Or, singleFontFileSize: Er, singleFontSubfamily: Rr, familySettingsBody: Ur, settingsSection: Pr, settingsSectionTitle: Dr, settingsSectionTitleText: Br, settingsSectionBody: Lr, settingsGrid: qr, singleFontSettingsBody: zr, settingsSubSection: $r, checkboxSection: Hr, checkboxes: Vr, disabled: Wr, styleSetting: Jr, styleSettingName: Kr, settingsList: Xr, staticSetting: Gr, axisSetting: Yr, axisSettingModes: Zr, spinboxRange: Qr, label: es, unicodeRangeTextbox: ts, axisRangeTextbox: ns, invalid: as };
var Ie, B, fn, da, ct = 0, oi = [], K = A, pa = K.__b, ga = K.__r, ma = K.diffed, ya = K.__c, ba = K.unmount, va = K.__;
function Ze(e, t) {
  K.__h && K.__h(B, e, ct || t), ct = 0;
  var n = B.__H || (B.__H = { __: [], __h: [] });
  return e >= n.__.length && n.__.push({}), n.__[e];
}
function li(e) {
  return ct = 1, is(ci, e);
}
function is(e, t, n) {
  var a = Ze(Ie++, 2);
  if (a.t = e, !a.__c && (a.__ = [ci(void 0, t), function(o) {
    var l = a.__N ? a.__N[0] : a.__[0], u = a.t(l, o);
    l !== u && (a.__N = [u, a.__[1]], a.__c.setState({}));
  }], a.__c = B, !B.__f)) {
    var i = function(o, l, u) {
      if (!a.__c.__H) return true;
      var c = a.__c.__H.__.filter(function(p) {
        return !!p.__c;
      });
      if (c.every(function(p) {
        return !p.__N;
      })) return !r || r.call(this, o, l, u);
      var h = a.__c.props !== o;
      return c.forEach(function(p) {
        if (p.__N) {
          var m = p.__[0];
          p.__ = p.__N, p.__N = void 0, m !== p.__[0] && (h = true);
        }
      }), r && r.call(this, o, l, u) || h;
    };
    B.__f = true;
    var r = B.shouldComponentUpdate, s = B.componentWillUpdate;
    B.componentWillUpdate = function(o, l, u) {
      if (this.__e) {
        var c = r;
        r = void 0, i(o, l, u), r = c;
      }
      s && s.call(this, o, l, u);
    }, B.shouldComponentUpdate = i;
  }
  return a.__N || a.__;
}
function It(e, t) {
  var n = Ze(Ie++, 3);
  !K.__s && Dn(n.__H, t) && (n.__ = e, n.u = t, B.__H.__h.push(n));
}
function Jt(e, t) {
  var n = Ze(Ie++, 4);
  !K.__s && Dn(n.__H, t) && (n.__ = e, n.u = t, B.__h.push(n));
}
function ee(e) {
  return ct = 5, _e(function() {
    return { current: e };
  }, []);
}
function _e(e, t) {
  var n = Ze(Ie++, 7);
  return Dn(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function M(e, t) {
  return ct = 8, _e(function() {
    return e;
  }, t);
}
function dt(e) {
  var t = B.context[e.__c], n = Ze(Ie++, 9);
  return n.c = e, t ? (n.__ == null && (n.__ = true, t.sub(B)), t.props.value) : e.__;
}
function ui() {
  var e = Ze(Ie++, 11);
  if (!e.__) {
    for (var t = B.__v; t !== null && !t.__m && t.__ !== null; ) t = t.__;
    var n = t.__m || (t.__m = [0, 0]);
    e.__ = "P" + n[0] + "-" + n[1]++;
  }
  return e.__;
}
function rs() {
  for (var e; e = oi.shift(); ) if (e.__P && e.__H) try {
    e.__H.__h.forEach(Tt), e.__H.__h.forEach(Sn), e.__H.__h = [];
  } catch (t) {
    e.__H.__h = [], K.__e(t, e.__v);
  }
}
K.__b = function(e) {
  B = null, pa && pa(e);
}, K.__ = function(e, t) {
  e && t.__k && t.__k.__m && (e.__m = t.__k.__m), va && va(e, t);
}, K.__r = function(e) {
  ga && ga(e), Ie = 0;
  var t = (B = e.__c).__H;
  t && (fn === B ? (t.__h = [], B.__h = [], t.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
  })) : (t.__h.forEach(Tt), t.__h.forEach(Sn), t.__h = [], Ie = 0)), fn = B;
}, K.diffed = function(e) {
  ma && ma(e);
  var t = e.__c;
  t && t.__H && (t.__H.__h.length && (oi.push(t) !== 1 && da === K.requestAnimationFrame || ((da = K.requestAnimationFrame) || ss)(rs)), t.__H.__.forEach(function(n) {
    n.u && (n.__H = n.u), n.u = void 0;
  })), fn = B = null;
}, K.__c = function(e, t) {
  t.some(function(n) {
    try {
      n.__h.forEach(Tt), n.__h = n.__h.filter(function(a) {
        return !a.__ || Sn(a);
      });
    } catch (a) {
      t.some(function(i) {
        i.__h && (i.__h = []);
      }), t = [], K.__e(a, n.__v);
    }
  }), ya && ya(e, t);
}, K.unmount = function(e) {
  ba && ba(e);
  var t, n = e.__c;
  n && n.__H && (n.__H.__.forEach(function(a) {
    try {
      Tt(a);
    } catch (i) {
      t = i;
    }
  }), n.__H = void 0, t && K.__e(t, n.__v));
};
var wa = typeof requestAnimationFrame == "function";
function ss(e) {
  var t, n = function() {
    clearTimeout(a), wa && cancelAnimationFrame(t), setTimeout(e);
  }, a = setTimeout(n, 35);
  wa && (t = requestAnimationFrame(n));
}
function Tt(e) {
  var t = B, n = e.__c;
  typeof n == "function" && (e.__c = void 0, n()), B = t;
}
function Sn(e) {
  var t = B;
  e.__c = e.__(), B = t;
}
function Dn(e, t) {
  return !e || e.length !== t.length || t.some(function(n, a) {
    return n !== e[a];
  });
}
function ci(e, t) {
  return typeof t == "function" ? t(e) : t;
}
var os = Symbol.for("preact-signals");
function Kt() {
  if (Ce > 1) Ce--;
  else {
    for (var e, t = false; ot !== void 0; ) {
      var n = ot;
      for (ot = void 0, kn++; n !== void 0; ) {
        var a = n.o;
        if (n.o = void 0, n.f &= -3, !(8 & n.f) && pi(n)) try {
          n.c();
        } catch (i) {
          t || (e = i, t = true);
        }
        n = a;
      }
    }
    if (kn = 0, Ce--, t) throw e;
  }
}
function hi(e) {
  if (Ce > 0) return e();
  Ce++;
  try {
    return e();
  } finally {
    Kt();
  }
}
var P = void 0;
function fi(e) {
  var t = P;
  P = void 0;
  try {
    return e();
  } finally {
    P = t;
  }
}
var ot = void 0, Ce = 0, kn = 0, Mt = 0;
function di(e) {
  if (P !== void 0) {
    var t = e.n;
    if (t === void 0 || t.t !== P) return t = { i: 0, S: e, p: P.s, n: void 0, t: P, e: void 0, x: void 0, r: t }, P.s !== void 0 && (P.s.n = t), P.s = t, e.n = t, 32 & P.f && e.S(t), t;
    if (t.i === -1) return t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = P.s, t.n = void 0, P.s.n = t, P.s = t), t;
  }
}
function te(e, t) {
  this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched;
}
te.prototype.brand = os;
te.prototype.h = function() {
  return true;
};
te.prototype.S = function(e) {
  var t = this, n = this.t;
  n !== e && e.e === void 0 && (e.x = n, this.t = e, n !== void 0 ? n.e = e : fi(function() {
    var a;
    (a = t.W) == null || a.call(t);
  }));
};
te.prototype.U = function(e) {
  var t = this;
  if (this.t !== void 0) {
    var n = e.e, a = e.x;
    n !== void 0 && (n.x = a, e.e = void 0), a !== void 0 && (a.e = n, e.x = void 0), e === this.t && (this.t = a, a === void 0 && fi(function() {
      var i;
      (i = t.Z) == null || i.call(t);
    }));
  }
};
te.prototype.subscribe = function(e) {
  var t = this;
  return pt(function() {
    var n = t.value, a = P;
    P = void 0;
    try {
      e(n);
    } finally {
      P = a;
    }
  });
};
te.prototype.valueOf = function() {
  return this.value;
};
te.prototype.toString = function() {
  return this.value + "";
};
te.prototype.toJSON = function() {
  return this.value;
};
te.prototype.peek = function() {
  var e = P;
  P = void 0;
  try {
    return this.value;
  } finally {
    P = e;
  }
};
Object.defineProperty(te.prototype, "value", { get: function() {
  var e = di(this);
  return e !== void 0 && (e.i = this.i), this.v;
}, set: function(e) {
  if (e !== this.v) {
    if (kn > 100) throw new Error("Cycle detected");
    this.v = e, this.i++, Mt++, Ce++;
    try {
      for (var t = this.t; t !== void 0; t = t.x) t.t.N();
    } finally {
      Kt();
    }
  }
} });
function U(e, t) {
  return new te(e, t);
}
function pi(e) {
  for (var t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return true;
  return false;
}
function gi(e) {
  for (var t = e.s; t !== void 0; t = t.n) {
    var n = t.S.n;
    if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
      e.s = t;
      break;
    }
  }
}
function mi(e) {
  for (var t = e.s, n = void 0; t !== void 0; ) {
    var a = t.p;
    t.i === -1 ? (t.S.U(t), a !== void 0 && (a.n = t.n), t.n !== void 0 && (t.n.p = a)) : n = t, t.S.n = t.r, t.r !== void 0 && (t.r = void 0), t = a;
  }
  e.s = n;
}
function Le(e, t) {
  te.call(this, void 0), this.x = e, this.s = void 0, this.g = Mt - 1, this.f = 4, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched;
}
Le.prototype = new te();
Le.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return false;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === Mt)) return true;
  if (this.g = Mt, this.f |= 1, this.i > 0 && !pi(this)) return this.f &= -2, true;
  var e = P;
  try {
    gi(this), P = this;
    var t = this.x();
    (16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
  } catch (n) {
    this.v = n, this.f |= 16, this.i++;
  }
  return P = e, mi(this), this.f &= -2, true;
};
Le.prototype.S = function(e) {
  if (this.t === void 0) {
    this.f |= 36;
    for (var t = this.s; t !== void 0; t = t.n) t.S.S(t);
  }
  te.prototype.S.call(this, e);
};
Le.prototype.U = function(e) {
  if (this.t !== void 0 && (te.prototype.U.call(this, e), this.t === void 0)) {
    this.f &= -33;
    for (var t = this.s; t !== void 0; t = t.n) t.S.U(t);
  }
};
Le.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (var e = this.t; e !== void 0; e = e.x) e.t.N();
  }
};
Object.defineProperty(Le.prototype, "value", { get: function() {
  if (1 & this.f) throw new Error("Cycle detected");
  var e = di(this);
  if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} });
function jt(e, t) {
  return new Le(e, t);
}
function yi(e) {
  var t = e.u;
  if (e.u = void 0, typeof t == "function") {
    Ce++;
    var n = P;
    P = void 0;
    try {
      t();
    } catch (a) {
      throw e.f &= -2, e.f |= 8, Bn(e), a;
    } finally {
      P = n, Kt();
    }
  }
}
function Bn(e) {
  for (var t = e.s; t !== void 0; t = t.n) t.S.U(t);
  e.x = void 0, e.s = void 0, yi(e);
}
function ls(e) {
  if (P !== this) throw new Error("Out-of-order effect");
  mi(this), P = e, this.f &= -2, 8 & this.f && Bn(this), Kt();
}
function Qe(e) {
  this.x = e, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32;
}
Qe.prototype.c = function() {
  var e = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    var t = this.x();
    typeof t == "function" && (this.u = t);
  } finally {
    e();
  }
};
Qe.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, yi(this), gi(this), Ce++;
  var e = P;
  return P = this, ls.bind(this, e);
};
Qe.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = ot, ot = this);
};
Qe.prototype.d = function() {
  this.f |= 8, 1 & this.f || Bn(this);
};
Qe.prototype.dispose = function() {
  this.d();
};
function pt(e) {
  var t = new Qe(e);
  try {
    t.c();
  } catch (n) {
    throw t.d(), n;
  }
  return t.d.bind(t);
}
var bi, Xt, dn, vi = [];
pt(function() {
  bi = this.N;
})();
function et(e, t) {
  A[e] = t.bind(null, A[e] || function() {
  });
}
function Ot(e) {
  dn && dn(), dn = e && e.S();
}
function wi(e) {
  var t = this, n = e.data, a = Ee(n);
  a.value = n;
  var i = _e(function() {
    for (var o = t, l = t.__v; l = l.__; ) if (l.__c) {
      l.__c.__$f |= 4;
      break;
    }
    var u = jt(function() {
      var m = a.value.value;
      return m === 0 ? 0 : m === true ? "" : m || "";
    }), c = jt(function() {
      return !Array.isArray(u.value) && !Ja(u.value);
    }), h = pt(function() {
      if (this.N = xi, c.value) {
        var m = u.value;
        o.__v && o.__v.__e && o.__v.__e.nodeType === 3 && (o.__v.__e.data = m);
      }
    }), p = t.__$u.d;
    return t.__$u.d = function() {
      h(), p.call(this);
    }, [c, u];
  }, []), r = i[0], s = i[1];
  return r.value ? s.peek() : s.value;
}
wi.displayName = "_st";
Object.defineProperties(te.prototype, { constructor: { configurable: true, value: void 0 }, type: { configurable: true, value: wi }, props: { configurable: true, get: function() {
  return { data: this };
} }, __b: { configurable: true, value: 1 } });
et("__b", function(e, t) {
  if (typeof t.type == "string") {
    var n, a = t.props;
    for (var i in a) if (i !== "children") {
      var r = a[i];
      r instanceof te && (n || (t.__np = n = {}), n[i] = r, a[i] = r.peek());
    }
  }
  e(t);
});
et("__r", function(e, t) {
  if (t.type !== ie) {
    Ot();
    var n, a = t.__c;
    a && (a.__$f &= -2, (n = a.__$u) === void 0 && (a.__$u = n = function(i) {
      var r;
      return pt(function() {
        r = this;
      }), r.c = function() {
        a.__$f |= 1, a.setState({});
      }, r;
    }())), Xt = a, Ot(n);
  }
  e(t);
});
et("__e", function(e, t, n, a) {
  Ot(), Xt = void 0, e(t, n, a);
});
et("diffed", function(e, t) {
  Ot(), Xt = void 0;
  var n;
  if (typeof t.type == "string" && (n = t.__e)) {
    var a = t.__np, i = t.props;
    if (a) {
      var r = n.U;
      if (r) for (var s in r) {
        var o = r[s];
        o !== void 0 && !(s in a) && (o.d(), r[s] = void 0);
      }
      else r = {}, n.U = r;
      for (var l in a) {
        var u = r[l], c = a[l];
        u === void 0 ? (u = us(n, l, c, i), r[l] = u) : u.o(c, i);
      }
    }
  }
  e(t);
});
function us(e, t, n, a) {
  var i = t in e && e.ownerSVGElement === void 0, r = U(n);
  return { o: function(s, o) {
    r.value = s, a = o;
  }, d: pt(function() {
    this.N = xi;
    var s = r.value.value;
    a[t] !== s && (a[t] = s, i ? e[t] = s : s ? e.setAttribute(t, s) : e.removeAttribute(t));
  }) };
}
et("unmount", function(e, t) {
  if (typeof t.type == "string") {
    var n = t.__e;
    if (n) {
      var a = n.U;
      if (a) {
        n.U = void 0;
        for (var i in a) {
          var r = a[i];
          r && r.d();
        }
      }
    }
  } else {
    var s = t.__c;
    if (s) {
      var o = s.__$u;
      o && (s.__$u = void 0, o.d());
    }
  }
  e(t);
});
et("__h", function(e, t, n, a) {
  (a < 3 || a === 9) && (t.__$f |= 2), e(t, n, a);
});
be.prototype.shouldComponentUpdate = function(e, t) {
  var n = this.__$u, a = n && n.s !== void 0;
  for (var i in t) return true;
  if (this.__f || typeof this.u == "boolean" && this.u === true) {
    var r = 2 & this.__$f;
    if (!(a || r || 4 & this.__$f) || 1 & this.__$f) return true;
  } else if (!(a || 4 & this.__$f) || 3 & this.__$f) return true;
  for (var s in e) if (s !== "__source" && e[s] !== this.props[s]) return true;
  for (var o in this.props) if (!(o in e)) return true;
  return false;
};
function Ee(e, t) {
  return _e(function() {
    return U(e, t);
  }, []);
}
function _i(e, t) {
  var n = ee(e);
  return n.current = e, Xt.__$f |= 4, _e(function() {
    return jt(function() {
      return n.current();
    }, t);
  }, []);
}
var cs = function(e) {
  queueMicrotask(function() {
    queueMicrotask(e);
  });
};
function hs() {
  hi(function() {
    for (var e; e = vi.shift(); ) bi.call(e);
  });
}
function xi() {
  vi.push(this) === 1 && (A.requestAnimationFrame || cs)(hs);
}
function Si(e) {
  var t, n, a = "";
  if (typeof e == "string" || typeof e == "number") a += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (n = Si(e[t])) && (a && (a += " "), a += n);
  } else for (n in e) e[n] && (a && (a += " "), a += n);
  return a;
}
function Z() {
  for (var e, t, n = 0, a = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Si(e)) && (a && (a += " "), a += t);
  return a;
}
const fs = 17, ki = (e) => {
  const t = e.trim().split(/(?:,\s*)|(?:\s+)/);
  if (t.length === 1 && t[0].length === 0) return [];
  const n = [];
  for (const a of t) {
    if (a.length > fs) return null;
    if (a.length === 0) continue;
    const i = /^(?:u\+)?([0-9a-f]{1,6})(?:-(?:u\+)?([0-9a-f]{1,6}))?$/i.exec(a);
    if (!i) return null;
    const r = parseInt(i[1], 16);
    if (!Number.isFinite(r)) return null;
    if (typeof i[2] == "string") {
      const s = parseInt(i[2], 16);
      if (!Number.isFinite(s)) return null;
      n.push([r, s]);
    } else n.push(r);
  }
  return n;
}, Ti = (e) => {
  const t = e.trim().split(/,\s*/);
  if (t.length === 1 && t[0].length === 0) return [];
  const n = [];
  for (const a of t) {
    if (a.length === 0) continue;
    const i = /(-?\d+(?:\.\d+)?)(?:-(-?\d+(?:\.\d+)?))?/.exec(a);
    if (!i) return null;
    const r = Number(i[1]);
    if (!Number.isFinite(r)) return null;
    if (typeof i[2] == "string") {
      const s = Number(i[2]);
      if (!Number.isFinite(s)) return null;
      n.push([r, s]);
    } else n.push(r);
  }
  return n;
};
var Fi = ((e) => (e[e.Whitespace = 0] = "Whitespace", e[e.DefinitionKeyword = 1] = "DefinitionKeyword", e[e.OperatorKeyword = 2] = "OperatorKeyword", e[e.Keyword = 3] = "Keyword", e[e.PropertyName = 4] = "PropertyName", e[e.Paren = 5] = "Paren", e[e.Brace = 6] = "Brace", e[e.Punctuation = 7] = "Punctuation", e[e.String = 8] = "String", e[e.Number = 9] = "Number", e[e.Separator = 10] = "Separator", e))(Fi || {});
const ds = { 0: null, 1: "dk", 2: "ok", 3: "kw", 4: "pn", 5: "p", 6: "b", 7: "pu", 8: "s", 9: "n", 10: "se" };
class ps {
  constructor() {
    this.indent = 0, this.indentString = "  ", this.textLength = 0, this.spans = [];
  }
  pushSpan(t, n) {
    this.spans.length > 0 && this.spans[this.spans.length - 1].type === n ? this.spans[this.spans.length - 1].text += t : t.length > 0 && this.spans.push({ text: t, type: n }), this.textLength += t.length;
  }
  pushIndent() {
    this.pushSpan(this.indentString.repeat(this.indent), 0);
  }
  pushSpace() {
    this.pushSpan(" ", 0);
  }
  pushNewline() {
    this.pushSpan(`
`, 0);
  }
  pushString(t) {
    const n = t.includes('"'), a = n ? t.replace(/(\\|'|\n)/g, "\\$1") : t.replace(/(\\|\n)/g, "\\$1");
    this.pushSpan(n ? `'${a}'` : `"${a}"`, 8);
  }
  atRule(t) {
    this.pushSpan(t, 1), this.pushSpace(), this.pushSpan("{", 6), this.indent++, this.pushNewline();
  }
  endRule() {
    this.indent--, this.pushSpan("}", 6), this.pushNewline(), this.pushNewline();
  }
  declaration(t) {
    this.pushIndent(), this.pushSpan(t, 4), this.pushSpan(":", 7), this.pushSpace();
  }
  endDeclaration() {
    this.spans[this.spans.length - 1].type === 0 && this.spans.pop(), this.pushSpan(";", 10), this.pushNewline();
  }
  keyword(t) {
    this.pushSpan(t, 3), this.pushSpace();
  }
  number(t) {
    this.pushSpan(String(t), 9), this.pushSpace();
  }
  string(t) {
    this.pushString(t), this.pushSpace();
  }
  parenthesized(t) {
    this.pushSpan(t, 2), this.pushSpan("(", 5);
  }
  endParenthesized() {
    this.spans[this.spans.length - 1].type === 0 && this.spans.pop(), this.pushSpan(")", 5), this.pushSpace();
  }
  comma() {
    this.spans[this.spans.length - 1].type === 0 && this.spans.pop(), this.pushSpan(",", 10), this.pushSpace();
  }
  getString() {
    let t = "";
    for (const n of this.spans) t += n.text;
    return t;
  }
  getNodes() {
    const t = new DocumentFragment();
    for (const n of this.spans) {
      const a = document.createElement("span"), i = ds[n.type];
      i !== null && a.setAttribute("class", `hl-${i}`), a.append(n.text), t.appendChild(a);
    }
    return t;
  }
}
const _a = { aalt: { title: "Access All Alternates", registered: "Adobe", done: true, description: `Allows the end user to access glyphs which are either not available, or not
easily available, via other feature applications. The expectation is that this
feature will allow substituting a glyph with all possible "alternative" forms
of the glyph provided in the font: for example, for the glyph \`a\`, it will
provide a substitution to small capital forms, swash alternates, superior forms,
and so on. This is normally achieved through one-from-many (GSUB3) substitutions,
but where only a single alternate is provided, the use of a one-to-one (GSUB1)
substitution may be appropriate.


A layout application will not apply this feature in the ordinary course of layout,
but may use it to implement a "glyph picker" interface allowing the end user
to choose the desired substitution, or to cycle through the alternates available
for a glyph. Because of way that the layout application will apply this feature,
it is undefined what would happen to lookup types other than GSUB1 and GSUB3 if
placed inside an \`aalt\` feature.


*Note*: AFDKO feature syntax offers special handling of the \`aalt\` feature.
Within the context an \`aalt\` feature block, the \`feature\` keyword can be used
to reference the lookups of other features, arrange any GSUB1 or GSUB3 rules
within those lookups by glyph, and combine them into one-from-many rules.
This allows the engineer to more easily generate an \`aalt\` feature by
combining the effects of other features.


For example, given a feature \`smcp\` which contains the rule \`sub b by B.sc;\` and a
feature \`salt\` which contains the rule \`sub b by b.alt;\`, the effect of


\`\`\`fea
feature aalt {
  feature salt;
  feature smcp;
} aalt;
\`\`\`

would be to create the rule \`sub b from [b.alt B.sc];\`.
`, fea: `feature aalt {
  feature salt;
  feature smcp;
  feature swsh;
  sub quoteleft by quoteleft.fr;
  sub quoteright by quoteright.fr;
} aalt;
`, automatic: true, state: "discretionary", ui: `In the OS X typography panel, this feature is accessed via "Glyph Variants".
`, status: null }, abvf: { title: "Above-base Forms", registered: "Microsoft", group: "Orthographic", script: { INDIC: { order: 5 }, khmr: { order: 3 }, USE: { order: 0 } }, description: `Replaces above-base forms with special forms. This feature is applied by
Indic, Khmer and USE complex shapers as part of the orthographic unit
shaping phase. The context of application is restricted to a syllabic cluster.


This feature was originally intended for a specific use case in Khmer, the
OE vowel sign (U+17BE, \u25CC\u17BE), which has pre-base and above-base components.
The shaping engine [decomposes](https://github.com/n8willis/opentype-shaping-documents/blob/master/opentype-shaping-khmer.md#22-matra-decomposition)
U+17BE into a pair of characters, U+17C1 (\u17C1) and U+17BE (again). It then
reorders the syllable to put the pre-base vowel part before the base consonant,
leaving the U+17BE after the base. The font is responsible for turning the
remaining \u25CC\u17BE glyph into the above-base part (\u17B8), hence the example
implementation below.


However, more generally, this feature is a good home for above-base
substitutions such as choosing alternate widths of an above-base vowel mark.


See also \`abvs\` which applies to the whole run, rather than per-cluster.
`, fea: `feature abvf {
  sub uni17BE by uni17B8;
} abvf;
`, state: "required", done: true, example: { font: "Noto Sans Khmer", text: "\u1799\u179B\u17CB\u1783\u17BE\u1789" }, status: null }, abvm: { title: "Above-base Mark Positioning", registered: "Microsoft", group: "Common", description: "This feature allows for mark positioning, similar to the `mark` feature; it\nwas intended for positioning marks which are placed over a base consonant in\na syllabic script, but while the OpenType Specification describes this feature\nas being used for Indic scripts, Harfbuzz applies the `abvm` feature as\npart of common feature processing for all scripts.\n\n\nThe only distinction between this feature and the `mark` feature is a subtle\none: in `abvm` processing, any ZWJ characters are skipped when matching input\nand any ZWNJ characters are skipped when matching context, whereas in `mark`\nprocessing, ZWJ/ZWNJ characters are not skipped. Other than that, the choice\nof `abvm` versus `mark` is a matter of notational convenience for the engineer.\n\n\nSee also `blwm`.\n", automatic: true, done: true, state: "required", example: { font: "Hind", text: "\u0915\u0902\u0938\u0902" }, status: null }, abvs: { title: "Above-base Substitutions", registered: "Microsoft", group: "Typographic", script: { INDIC: { order: 0 }, khmr: { order: 0 }, USE: { order: 0 }, mym2: { order: 0 } }, description: `This feature is intended for substituting base glyphs and above marks with ligature forms, but may be used for any standard typographic substitutions; engineers may wish to restrict its use to substitutions concerning above-base marks for organisational purposes. As a typographic substitution, it will be applied after the \`abvf\` feature.

This feature is applied by the shaper as part of the standard typographic presentation phase for Indic scripts, Khmer, Myanmar, and scripts using the Universal Shaping Engine. It is applied with a per-syllable context for Indic scripts, but applied across the whole run in other scripts.
`, fea: `feature abvs {
  sub eCandraMatra-gujarati candraBindu-gujarati by eCandraMatraCandraBindu-gujarati;
  sub eMatra-gujarati candraBindu-gujarati by eMatraCandraBindu-gujarati;
  sub aiMatra-gujarati candraBindu-gujarati by aiMatraCandraBindu-gujarati;
  # ...
} abvs;
`, done: true, state: "required", example: { font: "Hind", text: "\u0930\u0943" }, status: null }, afrc: { title: "Alternative Fractions", registered: "Microsoft", state: "discretionary", description: `This feature is intended to provide alternative forms of a fraction; the feature should match numerals surrounded by a slash, and substitute them with a nut fraction.
`, fea: `feature afrc {
  sub one slash two by onehalf.nut;
} afrc;
`, ui: `In the OS X typography panel, this feature is accessed via "Contextual Fractional Forms -> Vertical."
`, done: true, example: { font: "Recursive", text: "1/2" }, status: null }, akhn: { group: "Preprocessing", script: { INDIC: { order: 2 }, USE: { order: 0 } }, title: "Akhand", registered: "Microsoft", state: "required", description: `This feature is intended to process ligatures of base characters in Indic scripts and scripts using the Universal Shaping Engine. It was designed for the processing of "Akhand" (unbreakable) character sequences in Devanagari, but may also be used for any substitutions which need to be applied early in the shaping process.
`, fea: `feature akhn {
  sub ka-deva halant-deva ssa-deva by kssa-deva;
  sub ja-deva halant-deva nya-deva by jnya-deva;

  sub ra-deva' halant-deva' zerowidthjoiner by eyelash-deva;
} akhn;
`, done: true, example: { font: "Hind", text: "\u0915\u094D\u0937" }, status: null }, blwf: { title: "Below-base Forms", registered: "Microsoft", group: "Orthographic", script: { INDIC: { order: 4 }, khmr: { order: 2 }, USE: { order: 0 }, mym2: { order: 3 } }, description: `Replaces below-base forms with special forms. This feature is applied by
Indic, Khmer, Myanmar and USE complex shapers as part of the orthographic unit
shaping phase. The context of application is restricted to a syllabic cluster.


This is intended to be used for halant conjuncts, where consonant-virama-consonant
sequences cause the second consonant to be displayed below the first.


Note that in the Indic shaper, this feature is used as a "signal" to the shaping engine for reordering
purposes: that is, if a virama-consonant pair would be substituted by this feature,
then that consonant is placed in the below-base position when the syllable is reordered.


See also \`blws\` which applies to the whole run, rather than per-cluster.
`, fea: `feature blwf {
  sub virama-myanmar @consonant by @conjunct_consonant;
} blwf;
`, state: "required", done: true, status: null }, blwm: { title: "Below-base Mark Positioning", registered: "Microsoft", group: "Common", description: "This feature allows for mark positioning, similar to the `mark` feature; it\nwas intended for positioning marks which are placed below a base consonant in\na syllabic script, but while the OpenType Specification describes this feature\nas being used for Indic scripts, Harfbuzz applies the `blwm` feature as\npart of common feature processing for all scripts.\n\n\nThe only distinction between this feature and the `mark` feature is a subtle\none: in `blwm` processing, any ZWJ characters are skipped when matching input\nand any ZWNJ characters are skipped when matching context, whereas in `mark`\nprocessing, ZWJ/ZWNJ characters are not skipped. Other than that, the choice\nof `blwm` versus `mark` is a matter of notational convenience for the engineer.\n\n\nSee also `abvm`.\n", state: "required", automatic: true, done: true, status: null }, blws: { title: "Below-base Substitutions", registered: "Microsoft", group: "Typographic", script: { INDIC: { order: 0 }, khmr: { order: 0 }, USE: { order: 0 }, mym2: { order: 0 } }, description: `This feature is intended for substituting base glyphs and below marks
with ligature forms, but may be used for any standard typographic
substitutions; engineers may wish to restrict its use to substitutions
concerning below-base marks for organisational purposes. As a typographic
substitution, it will be applied after the \`blwf\` feature.


This feature is applied by the shaper as part of the standard typographic
presentation phase for Indic scripts, Khmer, Myanmar, and scripts using the
Universal Shaping Engine. It is applied with a per-syllable context for
Indic scripts, but applied across the whole run in other scripts.
`, fea: `feature blws {
    sub dvRA dvmU  by dvRA_mU;
    sub dvRA dvmUU by dvRA_mUU;
    sub dvHA dvmU  by dvHA_mU;
    sub dvHA dvmUU by dvHA_mUU;
    sub dvDA  dvmvR by dvDA_mvR;
    sub dvSHA dvmvR by dvSHA_mvR;
    sub dvHA  dvmvR by dvHA_mvR;
} blws;
`, done: true, state: "required", status: null }, c2pc: { title: "Petite Capitals From Capitals", registered: "Tiro Typeworks / Emigre", state: "discretionary", description: "Substitutes capital characters for petite capitals. See the `pcap` feature for a description of petite capitals. See also `c2sc`.\n", fea: `feature c2pc {
  sub A by A.pc;
  sub B by B.pc;
  # ...
} c2pc;
`, ui: `In the OS X typography panel, this feature is accessed via "Uppercase ->
Petite Capitals."


In CSS, this feature can be set with \`font-variant-caps: all-petite-caps;\`
(although this also turns on \`pcap\`.)
`, example: { font: "EB Garamond", text: "NASA and the FBI" }, done: true, status: null }, c2sc: { title: "Small Capitals From Capitals", registered: "Adobe", state: "discretionary", automatic: true, description: "Substitutes capital characters for small capitals. Small capitals are often used to set acronyms. Compare with `smcp`, which substitutes lowercase letters for small capitals.\n", fea: `feature c2sc {
  sub A by A.sc;
  sub B by B.sc;
  # ...
} c2sc;
`, example: { font: "EB Garamond", text: "NASA and the FBI" }, ui: `In the OS X typography panel, this feature is accessed via "Uppercase ->
Small Capitals." In Adobe applications, this feature is accessed via "All
Small Caps" in the OpenType panel (although this also turns on \`smcp\`).


In CSS, this feature can be set with \`font-variant-caps: all-small-caps;\`
(although this also turns on \`smcp\`).
`, done: true, status: null }, calt: { title: "Contextual Alternates", registered: "Adobe", state: "default", group: "Typographic", description: `This feature is used to substitute glyphs with alternate forms, generally on
a contextual basis. For example, a script font may wish to use joining forms
of the letter \`o\` when followed by another letter starting at the x-height.


This feature is processed as part of the standard typographic presentation group;
in the Indic and Arabic complex shapers, it is processed as part of the language
form group.
`, fea: `feature calt {
  sub T' @letter by T.wide;
  sub o' space by o.swash;
  sub o' [i k m n o] by o.join;
  sub [f o t v w] s' by s.noinstroke;
} calt;
`, example: { font: "Kristi", text: "Two hoots!" }, done: true, ui: `In the OS X typography panel, this feature is accessed via "Contextual Alternates -> Contextual Alternates." In Adobe applications, this feature is accessed via "Contextual Alternates" in the OpenType panel.
`, status: null }, case: { title: "Case-Sensitive Forms", state: "discretionary", group: "Typographic", registered: "Adobe", automatic: true, description: `This features is intended to reposition glyphs (either by substitution or
positioning), particularly punctuation glyphs, so that they are better
aligned within all-capital sequences or sequences of lining numerals.
It should also change oldstyle numerals to lining numerals.


Note that while it was hoped that layout engines would automatically apply
this feature within all-capital sequences, this is not currently known to
be automatically applied, and must be applied manually by the typesetter.
`, done: true, fea: `feature case {
  sub [guillemotleft guillemotright hyphen] by [guillemotleft.cap guillemotright.cap hyphen.cap];
} case;
`, example: { font: "Zilla Slab", text: "\xABA-Za-z\xBB" }, ui: `In the OS X typography panel, this feature is accessed via "Case-Sensitive Layout -> Capital Forms."
`, status: null }, ccmp: { state: "required", title: "Glyph Composition/Decomposition", registered: "Microsoft", group: "Common", order: 0, description: `After OpenType normalization but before the processing of other features,
it may be useful to decompose single glyphs into sequences, or combine
sequences into a single glyph. For example:


* In Arabic fonts, treating the rasm letters and the nukta dots separately
allows for more flexible positioning and reduces the number of glyphs which
need to be drawn. Using rules such as \`sub beh-ar by behDotless-ar dotbelow;\`
in the \`ccmp\` feature decomposes the dots into separate glyphs.

* The i acute character (\xED, U+00ED) is normalized to U+0069 U+0301 (i acutecomb).
However, as the acute replaces the tittle on the \`i\`, it is useful to substitute
this for a dotless form: \`sub i' acutecomb by idotless;\`.

* Conversely, multiple glyphs may be combined into one. In Tibetan, stacked
letters such as \u0F43 (U+0F43) have their own Unicode codepoints, but can
alternatively be encoded in documents using the decomposed form U+0F42 (\u0F42)
\u25CC\u0FB7 (U+0FB7). These two encodings can be unified in the font with a rule such
as \`sub uni0F42 uni0FB7 by uni0F43;\`.
`, fea: `feature ccmp {
  sub alefHamzaabove-ar by alef-ar hamzaabove-ar;
  sub alefHamzabelow-ar by alef-ar hamzabelow-ar;
  sub beh-ar by behDotless-ar dotbelow-ar;
  sub teh-ar by behDotless-ar twodotsabove-ar;
  sub theh-ar by behDotless-ar threedotsabove-ar;
  sub jeem-ar by hah-ar dotbelow-ar;
  sub khah-ar by hah-ar dotabove-ar;
  ...
} ccmp;
`, done: true, status: null }, cfar: { state: "required", script: { khmr: { order: 5 } }, group: "Orthographic", title: "Conjunct Form After Ro", registered: "Microsoft", status: "discouraged", description: `This feature is only applied during orthographic unit shaping in the Khmer
complex shaper. In Khmer, the conjunct form of the letter ro (after a
coeng) is reordered to the left of the base consonant and displayed as a
deep letterform which can interact with below-base glyphs. This feature
was intended as offering an opportunity to fix up below-base glyphs to
avoid clashing with the coeng ro.


No examples of the use of this feature have been found. Consider using
\`blws\` instead.
`, done: true }, chws: { state: "discretionary", title: "Contextual Half-width Spacing", registered: "Adobe/W3C", description: `Layout engines which correctly support advanced typographic layout for CJK
(see [JLREQ](https://www.w3.org/TR/jlreq/), [CLREQ](https://www.w3.org/TR/clreq),
[KLREQ](https://www.w3.org/TR/klreq/)) will contain code to adjust the spacing
of glyphs in certain circumstances. For example, punctuation sequences such as
\`\u3002\u300D\` should be set with the full-stop taking up a half-em width instead of
a full em.

This feature is intended to improve the appearance of text set with software
which does *not* implement these spacing adjustments, by moving the spacing
logic into the font.

This feature is relatively new as of 2021, and no implementations have been
identified.
`, fea: `feature chws {
  pos [comma-han period-han] -500 @closing_bracket;
  pos @closing_bracket -500 [comma-han period_han];
  pos [comma-han period-han @closing_bracket] 500 @opening_bracket;
  pos @opening_bracket <500 0 0 0> @opening_bracket;
  pos @closing_bracket @closing_bracket <-500 0 0 0>;
} chws;
`, done: true, status: null }, cjct: { title: "Conjunct Forms", script: { INDIC: { order: 9 }, USE: { order: 7 } }, group: "Orthographic", registered: "Microsoft", state: "required", description: `This feature is applied to Indic scripts and scripts using the Universal
Shaping Engine as the final feature in the orthographic unit shaping phase,
before final reordering. It was intended for use in creating consonant
conjunct groups. (Consonant + Virama + Consonant.)  The context of application
is restricted to a syllabic cluster.


The difference between this feature and \`blwf\` is that the \`blwf\` feature
is intended for substituting the "tail" (virama + consonant) for a below-base
form, while this feature is intended for substituting the entire sequence
with a ligature.
`, fea: `feature cjct {
    # Actual implementation will depend on conjunct glyphs provided in your font.
    sub nga-deva virama-deva ga-deva by ngga-deva;
    sub nga-deva virama-deva ma-deva by ngma-deva;
    sub nga-deva virama-deva ya-deva by ngya-deva;
    sub tta-deva virama-deva tta-deva by tttta-deva;
    sub tta-deva virama-deva ya-deva by ttya-deva;
    # ...
} cjct;
`, done: true, example: { font: "Noto Sans Devanagari", text: "\u0919\u094D\u092E" }, status: null }, clig: { title: "Contextual Ligatures", registered: "Adobe", group: "Typographic", state: "default", script: { khmr: { order: 5 } }, done: true, description: `This feature has two distinct uses.


It was originally intended for ligature forms which are contextual in nature,
for example, for Latin script fonts, and typically made up of GSUB lookup 8 rules.
However, these rules may also be placed in other discretionary ligature
features, such as \`rlig\` or \`liga\`, and these should be used instead. As such
this use is relatively rare.


Separately, in the Khmer complex shaper, this is a mandatory feature used
for "ligatures that are desired for typographical correctness". It is
therefore used widely in Khmer fonts for general typographic shaping.
`, fea: `feature clig {
  sub kho-khmer.conjunct aaSign-khmer by kho-khmer.conjunct.aa;
  sub kho-khmer.conjunct auSign-khmer by kho-khmer.conjunct.au;
  # ...
  sub nyo-khmer' @conjuncts by nyo-khmer.alt;
  sub nyo-khmer.alt nyo-khmer.conjunct' by nyo-khmer.conjunct.alt;
  # ...
}
`, status: null }, cpct: { title: "Centered CJK Punctuation", description: `This feature is intended to center punctuation (typically the ideographic
comma \u3001 and ideographic full stop \u3002) in Chinese fonts. Where presented, it
is often implemented as GPOS lookup 1 positioning rules to place these
glyphs within the center of the em square.
`, example: { text: "\u304B\u3001\u304B", font: "Feature Sans" }, registered: "Adobe", done: true, fea: `feature cpct {
   pos comma-han <328 350 0 0>;
   pos period-han <359 350 0 0>;
} cpct;
`, state: null, status: null }, cpsp: { title: "Capital Spacing", registered: "Adobe", state: "discretionary", description: `This feature inserts a small around of space (order of 5-10 units for a typical
font) around capital letters to improve the setting of all-capital runs.
`, example: { font: "Grenze", text: "AAWW" }, fea: `feature cpsp {
  pos @capitals <5 0 10 0>;
} cpsp;
`, ui: `In the OS X typography panel, this feature is accessed via "Case-Sensitive
Layout > Capital Spacing".
`, done: true, status: null }, cswh: { title: "Contextual Swash", registered: "Adobe", state: "discretionary", description: "This feature is similar to the `swsh` (Swash) feature, but is intended to be\nused for contextual (conditional) swash substitutions. For example, while\nAdobe Garamond Pro Italic uses the `swsh` feature to substitute *all*\ncapitals for swash forms, it uses the `cswh` feature to conditionally change\nonly capitals preceding a lowercase into swash forms.\n", fea: `feature cswh {
  sub @capitals' @lowercase by @capitals.swsh;
} cswh;
`, example: { font: "Work Sans", text: "WOWSERS!" }, ui: 'In the OS X typography panel, this feature is accessed via "Contextual Alternates > Contextual Swash Alternates".', done: true, status: null }, curs: { automatic: true, title: "Cursive Positioning", registered: "Microsoft", state: "required", group: "Positioning", description: `This feature is used to position glyphs with cursive connections.


Certain scripts, in particular Arabic, are "connected" scripts, where the
start of a character has its position adjusted relative to the end of the previous
character. In font editors, this is normally defined by setting "exit" and
"entry" anchor points. These are then converted to GPOS 3 cursive positioning
rules.


While this feature is not mandatory for designers - some styles of Arabic
are aligned along the baseline, and so glyphs do not need to be repositioned
- it is applied by default if present, and is not specific to Arabic script.
It is not impossible, but exceptionally uncommon, to use this feature for
connected "cursive" Latin fonts, and is often unnecessary because of the
presence of a fixed baseline in Latin.
`, example: { font: "Aref Ruqaa", text: "\u0633\u0645\u0631" }, done: true, fea: `feature curs {
  pos cursive uni066F.medi <anchor 606 35> <anchor 0 35>;
  pos cursive uni0640 <anchor 250 35> <anchor 0 35>;
  pos cursive uni06A1.medi <anchor 606 35> <anchor 0 35>;
  # ...
} curs;
`, status: null }, cv01: { title: "Character Variant 1 \u2013 Character Variant 99", registered: "Microsoft", state: "discretionary", automatic: true, description: `These features - ranging from \`cv01\` to \`cv99\` - allow for stylistic variations
of individual characters.

They are similar to the Stylistic Set (\`ss01\`--\`ss20\`) features, but (as their)
name implies, stylistic sets are intended to allow a *set* of glyphs to
vary in a common way (for example, straightening the "leg" of glyphs such as
\`hnm\`, or overlining \`MCXLVI\`  characters to form Roman numerals).
Character variant features, on the other hand, do not imply any common
variations across a range of glyphs.


When this feature is coded manually, character variant features may be given
identifying names to be displayed in the user interface. See the
[Adobe feature file specification](http://adobe-type-tools.github.io/afdko/OpenTypeFeatureFileSpecification.html#8.d)
for the format of these names.
`, example: { font: "Source Code Pro", text: "Java" }, fea: `feature cv01 {
  cvParameters {
      FeatUILabelNameID {
          name 3 1 0x0409 "single-storey a";
          name 1 0 0 "single-storey a";
      };
      Character 0x61;
  }
  sub a by a.cv01;
} cv01;
`, ui: 'In the OS X typography panel, this feature is accessed via "Glyph Variants".\nIn CSS, this feature is accessed through the [`font-variant-alternates`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-alternates) property.\n', done: true, status: null }, dist: { title: "Distances", registered: "Microsoft", state: "required", group: "Positioning", description: 'This feature provides positional adjustments between glyphs. It is largely\nequivalent to the `kern` feature, but should be considered as "required"\nkerning in that no user interface is provided to disable it.', done: true, example: { font: "Noto Sans Devanagari", text: "\u0926\u0957\u0915\u0957" }, status: null }, dlig: { title: "Discretionary Ligatures", registered: "Adobe", state: "discretionary", description: `This feature is used for additional typographic ligatures which are selectable
by the end-user.
`, ui: `In the OS X typography panel, this feature is accessed via "Ligatures -> Rare
Ligatures." (Not to be confused with the \`rlig\` feature, which is for required
ligatures...) In Adobe applications, this feature is
accessed via "Discretionary Ligatures" in the OpenType panel.


In CSS, this feature can be accessed through the [\`font-variant-ligatures\`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures) property.
`, fea: `sub dlig {
  sub t h by t_h;
  sub p p by p_p;
} dlig;
`, example: { font: "Allura", text: "coppersmith" }, done: true, status: null }, dnom: { title: "Denominators", automatic: true, state: "discretionary", status: "deprecated", registered: "Adobe", description: 'This deprecated feature replaces numeric glyphs with denominator forms. See also `numr`.\n\nNote that, despite the description of this feature in the OpenType specification,\nthe application of the `frac` feature is independent of this feature. It was\noriginally intended that applying the `frac` feature would "trigger" the\napplication of the `numr` feature for glyphs before the division slash and\nthe `dnom` feature for glyphs after it. This behavior was never implemented in\nOpenType shaping, and instead contextual rules are used within the `frac` feature\nto choose appropriate glyphs for numerator and denominator.\n\nNew fonts should use the `frac` feature in preference to this feature.\n', done: true }, dtls: { title: "Dotless Forms", script: { math: null }, registered: "Microsoft", description: `This feature is used by a math layout handler to substitute glyphs by dotless
forms when accents are to be added to the base character.
`, fea: `feature dtls {
  sub i by i.dotless;
  sub j by j.dotless;
  sub uni2148 by uni2148.dotless;
  sub uni2149 by uni2149.dotless;
  sub u1D422 by u1D422.dotless;
  sub u1D423 by u1D423.dotless;
  # ...
} dtls;
`, example: { math: '<mover accent="true"><mi> i </mi> <mo> &#x0005E; </mo> </mover>' }, done: true, state: null, status: null }, expt: { title: "Expert Forms", registered: "Adobe", description: `This feature is used to substitute Japanese kanji for alternative forms which
are considered more "typographical". This includes the use of JIS78 forms
(see \`jp78\`), but also a wide range of other substitutions.


The expected substitutions of the \`expt\` feature are defined in terms of the
[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) glyphset.
Engineers creating Japanese fonts according to that glyphset should read the
information at the Adobe-Japan1 repository, and use the latest version of the
feature code provided there to implement this feature.


(Thanks to Ken Lunde for the information about implementing this feature.)
`, done: true, example: { font: "Kiwi Maru", text: "\u66C1\u5819\u50CA" }, state: null, status: null }, falt: { title: "Final Glyph on Line Alternates", registered: "Microsoft", description: `This feature was intended to allow a justification system to substitute a
glyph for another form when the glyph is the final one on a line of text,
to improve the fitting of the line. (See also \`jalt\`.) No known layout
engine supports activating this and it is unclear whether any fonts
implemented the feature.
`, done: true, status: "deprecated", state: null }, fin2: { title: "Terminal Form #2", registered: "Microsoft", group: "Topographical", state: "required", script: { syrc: { order: 3 } }, description: `This feature is used by the Arabic complex shaper when processing the Syriac
script. The Syriac letter alaph (U+0710) has multiple final forms: the first
final form, used when the preceding character is a joining
character, is selected using the \`fina\` feature, similar to an Arabic alif.


However, when the preceding character is a non-joining character, the selection
of the final form of alaph depends on whether the preceding character has
joining group \`Dalath_Rish\`. If the preceding character (skipping all characters
with a transparent joining group) is either U+0715 (dalath), U+0716 (dotless
dalath rish) or U+072A (rish), the \`fin3\` feature is applied. Otherwise,
this feature is applied.
`, example: { font: "Noto Sans Syriac", text: "\u0712\u0710" }, fea: `feature fin2 {
  lookupflag RightToLeft IgnoreMarks;
  sub uni0710 by uni0710.Fina2;
  } fin2;
`, done: true, status: null }, fin3: { title: "Terminal Form #3", registered: "Microsoft", group: "Orthographic", state: "required", script: { syrc: { order: 3 } }, description: `This feature is used by the Arabic complex shaper when processing the Syriac
script. The Syriac letter alaph (U+0710) has multiple final forms: the first
final form, used when the preceding character is a joining
character, is selected using the \`fina\` feature, similar to an Arabic alif.


However, when the preceding character is a non-joining character, the selection
of the final form of alaph depends on whether the preceding character has
joining group \`Dalath_Rish\`. If the preceding character (skipping all characters
with a transparent joining group) is either U+0715 (dalath), U+0716 (dotless
dalath rish) or U+072A (rish), this feature is applied. Otherwise,
the \`fin2\` feature is applied.
`, example: { font: "Noto Sans Syriac", text: "\u0715\u0710" }, fea: `feature fin3 {
  lookupflag RightToLeft IgnoreMarks;
  sub uni0710 by uni0710.Fina3;
  } fin2;
`, done: true, status: null }, fina: { title: "Terminal Forms", registered: "Microsoft/Adobe", group: "Topographical", state: "required", script: { arab: { order: 2 }, syrc: { order: 2 }, USE: { order: 4 } }, description: "This feature is used by the Arabic and USE complex shapers as part of topographic\nshaping. It is *not* appropriate for general end-of-word detection, but is\ndesigned to replace joining characters with final forms. This means characters\nwhich have the Unicode joining type `Right_Joining` or `Dual_Joining` in a\nright-to-left script, and characters which have the Unicode joining type `Left_Joining`\nor `Dual_Joining` in a left-to-right script. These joining type properties\ncan be found in [`ArabicShaping.txt`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)\nin the Unicode Character Database.\n", example: { font: "Aref Ruqaa", text: "\u062C\u0631" }, automatic: true, fea: `feature fina {
  lookupflag RightToLeft IgnoreMarks;
  sub alef-ar by alef-ar.fina;
  sub beh-ar by beh-ar.fina;
  # ...
}
`, done: true, status: null }, flac: { title: "Flattened accent forms", script: { math: null }, example: { math: "x&#x00301; X&#x00301;" }, registered: "Microsoft", description: `This feature replaces accents with flatter forms allowing them to fit within
the line when placed over a tall base character. This feature is automatically
applied by the math layout engine when an accent is placed over a base character
at a height of more than \`MATH.MathConstants.FlattenedAccentBaseHeight\`.
`, done: true, fea: `feature flac {
  sub uni0300 by uni0300.mathcap;
  sub uni0301 by uni0301.mathcap;
  sub uni0302 by uni0302.mathcap;
  sub uni0303 by uni0303.mathcap;
  sub uni0304 by uni0304.mathcap;
  sub uni0306 by uni0306.mathcap;
  sub uni0307 by uni0307.mathcap;
  sub uni0308 by uni0308.mathcap;
  sub uni030A by uni030A.mathcap;
  sub uni030C by uni030C.mathcap;
} flac;
`, state: null, status: null }, frac: { title: "Fractions", state: "discretionary", registered: "Microsoft/Adobe", description: "The feature is used to set fractions, both those fractions for which there is a precomposed glyph in the font (for example, `sub three slash four by threequarters;`) and those made up of numerator and denominator forms of numerals.", example: { font: "Recursive", text: "3/4 cup (145/793g)" }, fea: `feature frac {
  sub one slash four by onequarter;
  sub three slash four by threequarters;
  # ...

  # This implementation due to Tal Leming and Ben Kiel
  lookup FractionBar {
      ignore sub slash @figures @figures @figures @figures @figures @figures @figures @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures @figures @figures @figures slash;
      ignore sub slash @figures @figures @figures @figures @figures @figures @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures @figures @figures slash;
      ignore sub slash @figures @figures @figures @figures @figures @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures @figures slash;
      ignore sub slash @figures @figures @figures @figures @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures slash;
      ignore sub slash @figures @figures @figures @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures @figures @figures @figures slash;
      ignore sub slash @figures @figures @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures @figures @figures slash;
      ignore sub slash @figures @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures @figures slash;
      ignore sub slash @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures slash;
      ignore sub slash @figures @figures slash';
      ignore sub slash' @figures @figures slash;
      ignore sub slash @figures slash';
      ignore sub slash' @figures slash;
      ignore sub slash slash';
      ignore sub slash' slash;
      sub @figures slash' @figures by fraction;
  } FractionBar;

  lookup Numerator1 {
      sub @figures' fraction by @figuresNumerator;
  } Numerator1;

  lookup Numerator2 {
      sub @figures' @figuresNumerator fraction by @figuresNumerator;
  } Numerator2;

  lookup Numerator3 {
      sub @figures' @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator3;

  lookup Numerator4 {
      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator4;

  lookup Numerator5 {
      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator5;

  lookup Numerator6 {
      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator6;

  lookup Numerator7 {
      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator7;

  lookup Numerator8 {
      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator8;

  lookup Numerator9 {
      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator9;

  lookup Numerator10 {
      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator10;

  lookup Denominator {
      sub [fraction @figuresDenominator] @figures' by @figuresDenominator;
  } Denominator;

  sub @figures space' @figuresNumerator by space.frac;
} frac;
`, ui: `In the OS X Typography panel, this feature is accessed via "Contextual Fraction
Forms -> Diagonal."

In Adobe applications, this feature is accessed via "Fractions" in the OpenType
panel.
`, done: true, status: null }, fwid: { title: "Full Widths", automatic: true, state: "discretionary", registered: "Adobe", description: `This feature replaces glyphs with variants which fill the em square. This is
generally used with CJK fonts for setting text within an em-square grid (*hanmen*).
`, fea: `feature qwid {
  sub one by uniFF11;
  sub two by uniFF12;
  # ...
  sub a by uniFF41;
  sub b by uniFF42;
}
`, example: { font: "Shippori Mincho", text: "\u304B12\u304Bab" }, ui: 'In the OS X typography panel, this feature is accessed via "Text spacing > Full Width".', done: true, status: null }, half: { title: "Half Forms", registered: "Microsoft", group: "Orthographic", script: { INDIC: { order: 6 }, USE: { order: 0 } }, description: `This feature produces half forms of conjuncts. It is processed in the Indic
and USE complex shapers as part of the orthographic shaping group.


Half forms are used in scripts such as Devanagari to display dead (unvoiced)
consonants after a virama in conjuncts which do not have a predetermined
conjunct form. Half forms should be provided for all base consonants. These
half forms can then be substituted into conjuncts later using the \`pres\`
feature. For example:

\`\`\`
feature half {
  sub ka-deva halant-deva by k-deva;
  ...
} half;
feature pres {
  sub k-deva sa-deva by ksa-deva;
  ...
} pres;
\`\`\`
`, example: { font: "Hind", text: "\u0917\u094D\u0924" }, state: "required", done: true, fea: `feature half {
  sub ka-deva halant-deva by k-deva;
  sub kha-deva halant-deva by kh-deva;
  sub ga-deva halant-deva by g-deva;
  sub gha-deva halant-deva by gh-deva;
  ...
} half;
`, status: null }, haln: { title: "Halant Forms", registered: "Microsoft", state: "required", group: "Typographic", script: { INDIC: { order: 6 } }, description: 'This feature is applied by the Indic shaper during the typographic presentation\nphase, and is intended to "clean up" dead consonant sequences which have not\nbeen formed into conjuncts, by replacing them with correct dead consonant forms.\n\n\nFor example, consider the two sequences "tta nukta virama ra" and "tta nukta virama"\nwithout the final ra. In Noto Sans Devanagari, the "tta nukta virama" sequence is\nfirst composed into `ttanuktadeva` by the `nukt` feature, leaving\n`ttanuktadeva viramadeva radeva` and `ttanuktadeva viramadeva` respectively.\n\n\nWhen the final ra is present, the `rkrf` feature creates a conjunct form\n`ttanuktaradeva`. But without the final ra, we are left with `ttanuktadeva viramadeva`.\nIn this case, the default positioning of the nukta underneath the tta is\nincorrect, as it needs to move to the left to accommodate the virama. A\nprecomposed glyph `ttanuktaprehalfdeva` is substituted in the `haln`\nfeature to tidy up this dead consonant sequence.\n', example: { font: "Noto Sans Devanagari", text: "\u091F\u093C\u094D\u0930 \u091F\u093C\u094D" }, done: true, status: null }, halt: { title: "Alternate Half Widths", automatic: true, state: "discretionary", registered: "Adobe", description: `This feature is similar to the \`hwid\` feature, but instead of replacing half-width
glyphs with proportional equivalents, it re-spaces the glyphs using positioning
rules.
`, fea: `feature halt {
  pos [degree.full minute.full quotedblright.full quoteright.full second.full uni3001 uni3002 uni3009 uni300B uni300D uni300F uni3011 uni3015 uni301F uniFF09 uniFF0C uniFF0E uniFF3D uniFF5D] -500;
  pos [quotedblleft.full quoteleft.full uni3008 uni300A uni300C uni300E uni3010 uni3014 uni301D uniFF08 uniFF3B uniFF5B] <-500 0 -500 0>;
  pos [uni30FB uniFF01 uniFF1A uniFF1B] <-250 0 -500 0>;
} halt;
`, example: { font: "Reggae One", text: "\u304B\u3001\u304C\u3002\u3055" }, ui: 'In the OS X typography panel, this feature is accessed via "Text spacing > Alternative Half Width".', done: true, status: null }, hist: { title: "Historical Forms", registered: "Microsoft", state: "discretionary", description: 'Substitutes forms of letters which are no longer commonly used, or which\ngive the text a "historical" feel. See also the `hlig` feature.\n', fea: `feature hist {
  sub J by J.hist;
  sub s by longs;
} hist;
`, example: { font: "EB Garamond", text: "Justice" }, done: true, status: null }, hkna: { title: "Horizontal Kana Alternates", registered: "Adobe", state: "discretionary", description: `This feature replaces standard kana forms with glyphs which are designed
specifically for horizontal layout. For example, while "generic" kana may
have curving crossbars for characters such as \u3055 and \u305F, horizontal variants
may use straight crossbars.
`, example: { font: "Feature Sans", text: "\u304B12\u304B" }, fea: `feature hkna {
  sub ka-hira by ka-hira.vkna;
  sub sa-hira by sa-hira.vkna;
  sub ta-hira by ta-hira.vkna;
  # ...
} hkna;
`, ui: `In the Mac OS X typography panel, this feature is accessed via "Optimized
Kana Alternatives -> Horizontal Alternatives".
`, done: true, status: null }, hlig: { title: "Historical Ligatures", registered: "Microsoft", state: "discretionary", description: `Substitutes ligature forms which are no longer commonly used, or which
give the text a "historical" feel: for example, the "st" ligature. See
also the \`hist\` feature.
`, fea: `feature hlig {
  sub s t by s_t;
} hlig;
`, example: { font: "EB Garamond", text: "a\u017F\u017Fi\u017Ft" }, done: true, ui: `In the OS X typography panel, this feature is accessed via "Ligatures -> Historical
Ligatures."
`, status: null }, hngl: { status: "deprecated", title: "Hangul", registered: "Adobe", description: `This feature is deprecated and should not be used. The idea of this
feature was to replace hanja (Chinese Han characters) with hangul
syllables. But such semantic behavior should be processed at the
input method environment level, not at the font level, meaning this
feature was never a good idea.
`, done: true, state: null }, hojo: { title: "Hojo Kanji Forms (JIS X 0212-1990 Kanji Forms)", registered: "Adobe", description: `The expected form of Japanese kanji characters in an OpenType font are the
forms specified in JIS X 0213 (which replaces the older standard, JIS X
0208). As well as JIS X 0208, an additional standard, JIS X 0212, defined
supplementary characters, including 5,801 kanji characters. 2,743 of those
characters were included in the JIS X 0213 standard, but in some cases,
the representative forms are different between the 1990 revision of JIS X
0212 and the current revision (2004) of JIS X 0213. This feature is used to
select the JIS X 0212-1990 representative forms of these characters.


The best source of information about which glyph forms differ, and how this
feature should be implemented, is the
[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) repository.
`, fea: `feature hojo {
  sub uni7462 by uni7462.hojo;
  sub uni7626 by uni7626.hojo;
  # ...
} jp83;
`, done: true, example: { font: "Kiwi Maru", text: "\u7462\u7626" }, ui: `In the Mac OS X typography panel, this feature is accessed via the "character
shape" radio buttons.

In Adobe InDesign with CJK functionality, this feature can be accessed via
the "Alternate Glyphs" dropdown in the Advanced Character Formats panel of
the character style options dialog.
`, state: null, status: null }, hwid: { title: "Half Widths", automatic: true, state: "discretionary", registered: "Adobe", description: "This feature replaces glyphs (normally figures and punctuation) with variants\nwhich are one-half of the em square. This is generally used with CJK fonts\nand in the context of vertical typesetting. (For placing a sequence of two\nnumbers horizontally across an em-width vertical column.)\n\nSee also `fwid`, `qwid`, `twid`.\n", fea: `feature hwid {
  sub one by one.hwid;
  sub two by two.hwid;
  # ...
}
`, example: { font: "Feature Sans", text: "\u304B12\u304B" }, ui: 'In the OS X typography panel, this feature is accessed via "Text spacing > Half Width".', done: true, status: null }, init: { title: "Initial Forms", registered: "Microsoft/Adobe", group: "Topographical", state: "required", script: { arab: { order: 7 }, syrc: { order: 7 }, INDIC: { order: 0 }, USE: { order: 2 } }, description: `This feature is used by the Arabic, Indic, and USE complex shapers as part of topographic
shaping. It is *not* appropriate for general start-of-word detection, but is
designed to replace joining characters with initial forms. This means characters
which have the Unicode joining type \`Right_Joining\` or \`Dual_Joining\` in a
right-to-left script, and characters which have the Unicode joining type \`Left_Joining\`
or \`Dual_Joining\` in a left-to-right script. These joining type properties
can be found in [\`ArabicShaping.txt\`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)
in the Unicode Character Database.


In the Indic shaper, the feature is expected to apply in word-initial context
as identified by the shaping engine.
`, example: { font: "Aref Ruqaa", text: "\u062C\u0631" }, automatic: true, fea: `feature init {
  lookupflag RightToLeft IgnoreMarks;
  sub beh-ar by beh-ar.init;
  sub jeem-ar by jeem-ar.init;
  # ...
}
`, done: true, status: null }, isol: { title: "Isolated Forms", registered: "Microsoft/Adobe", group: "Topographical", state: "required", script: { arab: { order: 1 }, syrc: { order: 1 }, USE: { order: 1 } }, description: "This feature is used by the Arabic and USE complex shapers as part of topographic\nshaping. It is designed to replace joining characters with isolated forms. This means characters\nwhich have the Unicode joining type `Right_Joining` or `Dual_Joining` in a\nright-to-left script, and characters which have the Unicode joining type `Left_Joining`\nor `Dual_Joining` in a left-to-right script. These joining type properties\ncan be found in [`ArabicShaping.txt`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)\nin the Unicode Character Database.\n", example: { font: "Aref Ruqaa", text: "\u06CC\u06BD\u06C1" }, automatic: true, fea: `feature isol {
  sub yehHamzaabove-ar by CH_YEu1 HAMZA_ABOVE;
  sub tehMarbutagoal-ar by HAYCu1 dda;
  sub hah-ar by JIMu1;
  sub noon-ar by NUNu1 sdi;
} isol;
`, done: true, status: null }, ital: { title: "Italics", registered: "Adobe", state: "discretionary", description: `This feature is used in *very particular circumstances*. Despite its name, it
is not a general mechanism for activating italic glyphs.


Historically CJK fonts, particular Japanese fonts, shipped with a glyphset
which contained the Latin alphabet (usually full-width but sometimes proportional).
As will as upright forms, these fonts *also* included Latin italic glyphs.


CJK fonts with both upright and italic Latin glyphs in the same font should use
this feature to select the italic forms
`, fea: `feature ital {
  sub a by a.ital;
  sub b by b.ital;
  # ...
} ital;
`, ui: `In the OS X typography panel, this feature is accessed via "Italics -> On".
In Adobe applications, this feature is accessed via "Roman Italics" in the OpenType panel.
Note that in neither case can the italic feature be accessed from the "Italicise"
button or the "Font Style" menu.
`, example: { font: "Feature Sans", text: "\u304B123\u304B" }, done: true, status: null }, jalt: { title: "Justification Alternates", registered: "Microsoft", state: "discretionary", description: `This feature is intended to allow text layout engines to improve line justification
by selecting alternate glyphs. A layout engine can set a line of text, and then
try applying the \`jalt\` feature to the line to see if the resulting glyphs have
a better fit. It is rarely implemented in layout engines, with Adobe InDesign
and Photoshop being the only known implementations.
`, fea: `feature jalt {
  sub qaf-ar by qaf-ar.jalt;
  sub seen-ar by seen-ar.jalt;
  # ...
} jalt;
`, example: { font: "Aref Ruqaa", text: "\u0633\u0627\u0631\u0642 \u0627\u0644\u063A\u0646\u0645" }, done: true, ui: `In Adobe InDesign, this can be automatically applied at the paragraph level by choosing "Justification" from the paragraph panel menu and selecting "Justification Alternates (Naskh)" in the Justification dropdown. It can also be manually applied at the character level by choosing the Justification Alternate option from the character panel menu.
In Adobe Photoshop, it can be manually applied at the character level by choosing "Justification Alternates" from the character panel.`, status: null }, jp04: { title: "JIS04 Forms", registered: "Adobe", description: `The expected form of Japanese kanji characters in an OpenType font are the
forms specified in JIS X 0213 (which replaces the older standard, JIS X
0208). In the course of revision of this standard, the expected forms of a
number of kanji characters have changed over time.


Fonts should target the most recent revision of the standard (currently the
2004 revision). However, features may be used to access forms specified in
earlier revisions. If the \`jp04\` feature is applied, kanji should be
replaced by variant forms representing those specified in the 2004 revision
of the standard. As 2004 is the current revision, this feature should only
be implemented when providing updates to older fonts or to provide remappings
for glyphs where both older and newer forms are encoded in Unicode and provided
in the font (for example, \`sub uni5516 by uni555E;\`).


A historical comparison between different character forms in JIS revisions
can be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).
`, done: true, ui: `In the Mac OS X typography panel, this feature is accessed via the "character
shape" radio buttons.

In Adobe InDesign with CJK functionality, this feature can be accessed via
the "Alternate Glyphs" dropdown in the Advanced Character Formats panel of
the character style options dialog.
`, state: null, status: null }, jp78: { title: "JIS78 Forms", registered: "Adobe", description: `The expected form of Japanese kanji characters in an OpenType font are the
forms specified in JIS X 0213 (which replaces the older standard, JIS X
0208). In the course of revision of this standard, the expected forms of a
number of kanji characters have changed over time. For example, between
the 1978 and 1983 revisions, the "road" radical (*shinny\u014D*) changed form
in some characters, moving from two initial dots to one dot. (This change
was reversed in the 2004 revision.)


Fonts should target the most recent revision of the standard (currently the
2004 revision). However, features may be used to access forms specified in
earlier revisions.


A historical comparison between different character forms in JIS revisions
can be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).


If the \`jp78\` feature is applied, kanji should be replaced by variant forms
representing those specified in the 1978 revision of the standard.
`, fea: `feature jp78 {
  sub uni5049 by uni5049.jp78;
  sub uni5275 by uni5275.jp78;
  sub uni8328 by uni8328.jp78;
  # ...
} jp83;
`, done: true, example: { font: "Shippori Mincho", text: "\u5049\u8328\u5275" }, ui: `In the Mac OS X typography panel, this feature is accessed via the "character
shape" radio buttons.

In Adobe InDesign with CJK functionality, this feature can be accessed via
the "Alternate Glyphs" dropdown in the Advanced Character Formats panel of
the character style options dialog.
`, state: null, status: null }, jp83: { title: "JIS83 Forms", registered: "Adobe", description: `The expected form of Japanese kanji characters in an OpenType font are the
forms specified in JIS X 0213 (which replaces the older standard, JIS X
0208). In the course of revision of this standard, the expected forms of a
number of kanji characters have changed over time. For example, between
the 1983 and 1990 revisions, the "eight" radical (*hachigashira*) changed form,
losing its top horizontal line.


Fonts should target the most recent revision of the standard (currently the
2004 revision). However, features may be used to access forms specified in
earlier revisions.


A historical comparison between different character forms in JIS revisions
can be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).


If the \`jp83\` feature is applied, kanji should be replaced by variant forms
representing those specified in the 1983 revision of the standard.
`, fea: `feature jp83 {
  sub uni82A6 by uni82A6.jp83;
  sub uni9022 by uni9022.jp83;
  # ...
} jp83;
`, done: true, example: { font: "Shippori Mincho", text: "\u9022\u82A6\u6666" }, ui: `In the Mac OS X typography panel, this feature is accessed via the "character
shape" radio buttons.

In Adobe InDesign with CJK functionality, this feature can be accessed via
the "Alternate Glyphs" dropdown in the Advanced Character Formats panel of
the character style options dialog.
`, state: null, status: null }, jp90: { title: "JIS90 Forms", registered: "Adobe", description: `The expected form of Japanese kanji characters in an OpenType font are the
forms specified in JIS X 0213 (which replaces the older standard, JIS X
0208). In the course of revision of this standard, the expected forms of a
number of kanji characters have changed over time. For example, between
the 1983 and 1990 revisions, the "long stride" radical (*inny\u014D*) changed form
in some characters, losing the upstroke on the third stroke.


Fonts should target the most recent revision of the standard (currently the
2004 revision). However, features may be used to access forms specified in
earlier revisions.


A historical comparison between different character forms in JIS revisions
can be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).


If the \`jp90\` feature is applied, kanji should be replaced by variant forms
representing those specified in the 1990 revision of the standard.
`, fea: `feature jp90 {
  sub uni853D by uni853D.jp90;
  sub uni8AB9 by uni8AB9.jp90;
  sub uni990C by uni990C.jp90;
  # ...
} jp90;
`, ui: `In the Mac OS X typography panel, this feature is accessed via the "character
shape" radio buttons.

In Adobe InDesign with CJK functionality, this feature can be accessed via
the "Alternate Glyphs" dropdown in the Advanced Character Formats panel of
the character style options dialog.
`, done: true, example: { font: "Kiwi Maru", text: "\u990C\u8AB9\u853D" }, state: null, status: null }, kern: { title: "Kerning", registered: "Microsoft/Adobe", automatic: true, state: "default", group: "Positioning", description: `This feature is one of the two facilities for kerning within OpenType.
The original TrueType \`kern\` *table* in the font implements simple,
non-contextual pair-based and class-based kerning, and a pair-based (format 0)
\`kern\` table was historically required for kerning to function in applications
such as Microsoft PowerPoint.


However, modern fonts tend to implement kerning through the use of
this feature instead (see [discussion](https://typedrawers.com/discussion/comment/15218)).
The standard implementation is to use GPOS 2 pair positioning rules to adjustment
the X advance of the first glyph in the pair, although note that when
generating a \`kern\` feature for right-to-left text, the adjustment is
generally made to both advance *and* placement:

\`\`\`
pos period parentheses <-30 0 -30 0>;
\`\`\`


See also the \`vkrn\` feature for kerning in vertical settings. Kerning may
be disabled based on user preference; for mandatory adjustments, use the
\`dist\` feature instead.
`, example: { font: "Vollkorn", text: "AVATAR" }, ui: 'In the OS X typography panel, this feature is *disabled* via "Text Spacing > No Kerning".', done: true, status: null }, lfbd: { title: "Left Bounds", registered: "Adobe", status: "deprecated", description: `This feature was intended as part of the implementation of character
protrusion (see \`opbd\`); the idea being that it would be applied to the initial
character on a line to alter the bounds of that character allowing it to
protrude into the right margin. However, this would require an interaction
between the line breaking engine and the shaping engine which has only once
been implemented, in the LuaTeX layout system.

This feature should therefore be regarded as prematurely specified and
hence deprecated.
`, done: true, state: null }, liga: { title: "Standard Ligatures", registered: "Microsoft/Adobe", state: "default", description: "Ligatures provide typographic refinement by replacing multiple glyphs with a\nsingle, ligated form. This feature is used for standard ligatures, which are\nto be applied by default; in Latin text, this is generally sequences such as\n`f f`, `f f l`, `f f`, `f i`, and `f f i`.\n\nLigature code is often automatically generated by the font editor based on\ndetecting sequences of glyph names combined with underscores; note, however,\nthat the common ligature glyph `fi` does *not* contain an underscore.\n", automatic: true, fea: `feature liga {
  sub f f i by f_f_i;
  sub f f l by f_f_l;
  sub f f by f_f;
  sub f i by fi;
  sub f l by f_l;
}
`, example: { font: "EB Garamond", text: "Official" }, done: true, ui: `In the OS X typography panel, this feature is *disabled* via "Ligatures >
Common Ligatures".
`, status: null }, ljmo: { title: "Leading Jamo Forms", registered: "Microsoft", group: "Topographical", state: "required", script: { hang: 1 }, description: `The Korean Hangul script is encoded in Unicode in two ways: first, as a series
of precomposed syllable graphemes (encoded from U+AC00 to U+D7AF); second, as
a series of indivdual, conjoining *jamo*. Korean syllables form a LVT?
(leading consonant, vowel, optional trailing consonant) pattern; the leading consonant
(*choseong*) jamo are encoded between U+1100 and U+115F, the vowel (*jungseong*)
jamo are encoded between U+1160 and U+11A7, and the optional trailing consonant
(*jongseong*) jamo between U+11A8 and U+11FF. (At least in the primary Hangul
Jamo Unicode block; other jamo are encoded in extension blocks.)


The Hangul shaper will first attempt to compose any sequences of conjoining jamo
into an encoded form in the precomposed syllable block. But where this is not
successful - for example, in an Old Korean form which is not encoded in Unicode
as a precomposed syllable - then the shaper will instead *decompose* any LV
syllables to break the syllable into separate L, V, and T? characters, and then
apply the Korean shaping features (\`ljmo\`, \`vjmo\`, \`tjmo\`) to select forms of
the jamo which are appropriately positioned and sized to combine into the correct
grapheme-image.


For example, the Old Korean syllable \u1112\u119E\u11AF is not encoded in Unicode as a precomposed
syllable, and so must be encoded with the three individual jamo. The Hangul
shaper applies the \`ljmo\` feature to the *choseong*, the \`vjmo\` feature to the
*jungseong* and the \`tjmo\` feature to the *jongseong*. The resulting sequence
produces a glyph which renders the syllable correctly, with the \`vjmo\` and
\`tjmo\` generally producing zero-width mark glyphs positioned appropriately. An
alternative to this technique is to use the \`ccmp\` feature to turn decomposed
jamo into a precomposed glyph.


For further information, see sections 3.12 and 18.6 of the Unicode Standard.
`, done: true, status: null }, lnum: { automatic: true, state: "discretionary", title: "Lining Figures", registered: "Adobe", description: `This feature substitutes digits for lining forms. Lining figures are
designed to fit in all-capital settings.

In theory, this feature should not just substitute the default form
of figures (e.g. \`one\`, \`two\`) for lining forms, but also any alternate
non-lining forms (such as oldstyle figures) for lining forms. Where
lining forms are the default, implementing a substitution from oldstyle
figures to lining figures is not typographically necessary but will cause
the UI of layout programs to display lining figures as an option.

See also \`onum\`, \`pnum\`, \`tnum\`.
`, fea: `feature lnum {
  sub one by one.lf;
  sub two by two.lf;
  # ...
} lnum;
`, example: { font: "Baskervville", text: "ABC1234" }, ui: `In the OS X typography panel, this feature is accessed via "Number Case >
Lining Figures". In Adobe applications, selecting "Tabular lining" from the
OpenType panel will apply this feature and the \`tnum\` feature, while selecting
"Proportional lining" will apply this feature and the \`pnum\` feature.


In CSS, this feature can be accessed through the \`font-variant-numeric: lining-nums\` property.
`, done: true, status: null }, locl: { title: "Localized Forms", registered: "Tiro Typeworks", state: "required", group: "Common", order: 0, description: `This feature allows for localization of glyph forms by making substitutions
conditional on the script and language selected by the user. Typical uses
of this feature include:


* Substituting Cyrillic glyphs with Bulgarian and Serbian variants.

* In Turkish, Azeri, Kazakh, Tatar and Crimean Tartar, substituting the \`i\` by
an \`idotaccent\` glyph so that when uppercased through case conversion features
such as \`smcp\`, the dot can be preserved.
(See [this tutorial](https://glyphsapp.com/learn/localize-your-font-turkish).)

* In Romanian and Moldovan, substituting the \`scedilla\` (U+015E) with \`scommaaccent\`.

* Repositioning the ogonek to the center of the glyph in Navajo.

* In Dutch, substituting the j in an \`\xEDj\` pair with \`\xEDj\u0301\` (see [thread](https://typedrawers.com/discussion/1294/how-do-you-implement-ijacute-and-ijacute).)

* Substituting the Catalan "punt volat" for \`ldot\` ([tutorial](https://glyphsapp.com/learn/localize-your-font-catalan-punt-volat))

* In a font which has multiple scripts with different spacing conventions,
  such as Latin and Urdu, conditionally resizing the advance width of the
  space character to meet the expectations of the script in use.
`, fea: `feature locl {
  script latn;
  language ROM;
  sub Scedilla by Scommaaccent;
  sub scedilla by scommaaccent;
  language MOL;
  sub Scedilla by Scommaaccent;
  sub scedilla by scommaaccent;
  language CAT;
  sub l' periodcentered' l by ldot;
  sub L' periodcentered' L by Ldot;
} locl;
`, done: true, status: null }, ltra: { title: "Left-to-right alternate forms", registered: "Adobe", group: "Preprocessing", order: 2, description: `This feature - by analogy with the \`rtla\` feature - is intended for
right-to-left scripts which can also be expressed in a left-to-right line
layout, but which require glyph transformations such as mirroring when
written left-to-right. As detailed in the \`ltrm\` feature, such scripts
are extremely rare, and no implementations have been found.
`, done: true, state: null, status: null }, ltrm: { title: "Left-to-right mirrored forms", registered: "Adobe", group: "Preprocessing", order: 3, description: `This feature - by analogy with the \`rtlm\` feature - was intended for
right-to-left scripts which can also be expressed in a left-to-right line
layout, but which require glyph transformations such as mirroring when
written left-to-right.


Such scripts are exceptionally rare. Noto Sans Old Hungarian uses this
feature to horizontally mirror the glyphs when laying out Old Hungarian
left-to-right, although it is disputed that Old Hungarian was ever written
left-to-right. The Old South Arabian script is usually written RTL but
can also be laid out LTR; but Noto Sans Old South Arabian does not include
mirroring substitutions. Oh well.
`, done: true, state: null, status: null }, mark: { title: "Mark Positioning", registered: "Microsoft", group: "Positioning", state: "required", automatic: true, description: `This feature is used to position mark glyphs with respect to their base glyphs.


Generally speaking, this is automatically generated by font editing software
based on the positions of anchors in the base and mark glyphs. The editor will
emit mark-to-base (GPOS4) and mark-to-ligature (GPOS5) rules for this feature.
`, example: { font: "Markazi Text", text: "\u062A\u064E\u0634\u0652\u0643\u0650\u064A\u0644" }, done: true, status: null }, med2: { title: "Medial Forms #2", registered: "Microsoft", group: "Topographical", state: "required", script: { syrc: { order: 3 } }, description: `This feature is used by the Arabic complex shaper when processing the Syriac
script. The Syriac letter alaph (U+0710) is not normally a joining character
but can join to the right in the middle of a word if the preceding character
is right-joining.
`, example: { font: "Noto Sans Syriac", text: "\u0712\u0710\u072C\u072A\u0710" }, fea: `feature fin2 {
  lookupflag RightToLeft IgnoreMarks;
  sub uni0710 by uni0710.Medi2;
  } fin2;
`, done: true, status: null }, medi: { title: "Medial Forms", registered: "Microsoft/Adobe", group: "Topographical", state: "required", script: { arab: { order: 0 }, syrc: { order: 0 }, USE: { order: 0 } }, description: "This feature is used by the Arabic and USE complex shapers as part of topographic\nshaping. It is *not* appropriate for general middle-of-word detection, but is\ndesigned to replace joining characters with medial forms. This means characters\nwhich have the Unicode joining type `Right_Joining` or `Dual_Joining` in a\nright-to-left script, and characters which have the Unicode joining type `Left_Joining`\nor `Dual_Joining` in a left-to-right script. These joining type properties\ncan be found in [`ArabicShaping.txt`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)\nin the Unicode Character Database.\n", example: { font: "Aref Ruqaa", text: "\u062C\u0633\u0631" }, automatic: true, fea: `feature medi {
  lookupflag RightToLeft IgnoreMarks;
  sub beh-ar by beh-ar.medi;
  sub jeem-ar by jeem-ar.medi;
  # ...
}
`, done: true, status: null }, mgrk: { title: "Mathematical Greek", registered: "Adobe", state: "discretionary", description: "This feature replaces Greek glyphs with mathematical symbols: for example,\n`Sigma` is replaced by the `summation` glyph.\n", fea: `feature mgrk {
  sub uni0394 by uni2206;
  sub Pi by product;
  sub Sigma by summation;
  sub uni03A9 by uni2126;
  sub uni03BC by uni00B5;
  sub phi by uni03D5;
} mgrk;
`, ui: `In the OS X typography panel, this feature is accessed via "Mathematical Extras
-> Mathematical Greek Letter Forms".
`, example: { font: "Vollkorn", text: "\u03C6(n)=\u03A3 \u0394n" }, done: true, status: null }, mkmk: { title: "Mark-to-Mark Positioning", registered: "Microsoft", group: "Positioning", state: "required", automatic: true, description: `This feature is used to position mark glyphs with respect to other mark glyphs.
This can be used for example to position arbitrary combinations of marks used
in scholarly transliteration systems, as well as positioning
Arabic secondary marks relative to primary marks, such as *fathah* over *shadda*
and vice versa.


Generally speaking, this is automatically generated by font editing software
based on the positions of anchors in the mark glyphs, if the mark glyphs have
both a "mark anchor" (e.g. \`_bottom\`) *and* an "attachment anchor" (\`bottom\`).
The editor will then emit mark-to-mark (GPOS6) rules for this feature.
`, example: { font: "Work Sans", text: "e\u0301\u0303\u0303\u0324\u0324\u0331" }, done: true, status: null }, mset: { status: "deprecated", group: "Typographic", title: "Mark Positioning via substitution", script: { arab: { order: 4 } }, registered: "Microsoft", description: "This feature is used by the Arabic shaping as the final phase of the typographic\nshaping group. It was intended for substitutions which combine marks and bases\ninto precomposed forms as an alternative to using positioning rules in the `mark`\nfeature; however, it is possible to use *substitution* rules in the `mark`\nfeature, making the `mset` feature redundant.\n\nIt was used in Microsoft's Windows 95 Arabic fonts, and practically no other font.\nNew fonts should use `mark`, `ccmp`, `rlig` or other features instead.\n", done: true, state: null }, nalt: { state: "discretionary", title: "Alternate Annotation Forms", registered: "Adobe", description: `This feature replaces glyphs with "notational" forms - glyphs in boxes,
circles, etc. It is often used in CJK fonts to access characters in the Unicode
"Enclosed CJK Letters and Months" block (for example, \`sub uni3131 by uni3200;\`),
but may also be used to access other enclosed forms (\`sub one by uni2460;\`).


Note that although the OT Specification describes this as implementable via
alternate substitution lookups, no interface supports this, and single substitutions
should be used instead.
`, ui: `No user interface to this feature has been found.
`, done: true, example: { font: "Work Sans", text: 12345 }, status: null }, nlck: { title: "NLC Kanji Forms", registered: "Adobe", description: `In 2000, the Japanese National Language Council (now the Japanese language
division of the Agency for Cultural Affairs) prescribed new glyph forms for
Japanese kanji. In particular, the shape of the "father" and "long stride"
(*innyo*) radicals changed to remove a small stroke.


The expected substitutions of the \`nlck\` feature are defined in terms of the
[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) glyphset.
Engineers creating Japanese fonts according to that glyphset should read the
information at the Adobe-Japan1 repository, and use the latest version of the
feature code provided there to implement this feature.
`, example: { text: "\u54AC\u5EFB\u633A\u723A", font: "Shippori Mincho" }, done: true, state: null, status: null }, nukt: { group: "Preprocessing", state: "required", script: { INDIC: { order: 1 }, USE: { order: 0 } }, title: "Nukta Forms", description: `This feature is used to replace \`consonant + nukta\` with a precombined nukta
form glyph in Indic and USE scripts. It is called during the preprocessing
group - after initial reordering in Indic scripts, but before processing in the
USE.


While nukta marks may be positioned using the normal mark positioning functionality
(\`mark\`), the font designer may choose to create specific precomposed nukta glyphs,
either for ease of positioning or to facilitate later lookups.
`, fea: `feature nukt {
  sub ka-deva   nukta-deva by ka-deva.nukt;
  sub kha-deva  nukta-deva by kha-deva.nukt;
  sub ga-deva   nukta-deva by ga-deva.nukt;
  sub ja-deva   nukta-deva by ja-deva.nukt;
  sub dda-deva  nukta-deva by dda-deva.nukt;
  sub ddha-deva nukta-deva by ddha-deva.nukt;
  sub pha-deva  nukta-deva by pha-deva.nukt;
  sub ra-deva   nukta-deva by ra-deva.nukt;
} nukt;
`, done: true, status: null }, numr: { title: "Numerators", automatic: true, state: "discretionary", status: "deprecated", registered: "Adobe", description: 'This deprecated feature replaces numeric glyphs with numerator forms. See also `dnom`.\n\nNote that, despite the description of this feature in the OpenType specification,\nthe application of the `frac` feature is independent of this feature. It was\noriginally intended that applying the `frac` feature would "trigger" the\napplication of the `numr` feature for glyphs before the division slash and\nthe `dnom` feature for glyphs after it. This behavior was never implemented in\nOpenType shaping, and instead contextual rules are used within the `frac` feature\nto choose appropriate glyphs for numerator and denominator.\n\nNew fonts should use the `frac` feature in preference to this feature.\n', done: true }, onum: { automatic: true, state: "discretionary", title: "Oldstyle Figures", registered: "Adobe", description: `This feature substitutes digits for oldstyle forms. Oldstyle figures are
designed to fit in mixed case text settings.

In theory, this feature should not just substitute the default form
of figures (e.g. \`one\`, \`two\`) for oldstyle forms, but also any alternate
lining forms (such as lining figures) for oldstyle forms. Where
oldstyle forms are the default, implementing a substitution from lining
figures to oldstyle figures is not typographically necessary but will cause
the UI of layout programs to display oldstyle figures as an option.

See also \`onum\`, \`pnum\`, \`tnum\`.
`, fea: `feature lnum {
  sub one by one.osf;
  sub two by two.osf;
  # ...
} lnum;
`, example: { font: "Cardo", text: "ABC1234" }, ui: `In the OS X typography panel, this feature is accessed via "Number Case >
Old-Style Figures". In Adobe applications, selecting "Tabular oldstyle" from the
OpenType panel will apply this feature and the \`tnum\` feature, while selecting
"Proportional oldstyle" will apply this feature and the \`pnum\` feature.


In CSS, this feature can be accessed through the \`font-variant-numeric: oldstyle-nums\` property.
`, done: true, status: null }, opbd: { title: "Optical Bounds", registered: "Adobe", status: "deprecated", description: `This feature was intended for implementing what TeX users call "character
protrusion" or "margin kerning": improving the fit of lines in a paragraph by
altering the apparent advance width or positioning of certain characters
based on their optical edges rather than bounding boxes.


Consider, for example, a serif letter D appearing at the beginning of a line.
By altering the positioning of the glyph, the serifs can be protruded outside
the margin so that the stem aligns with the left edge of the text, to give a
more visually "tight" justification.


This feature was originally intended to automatically "call" the \`lfbd\` and
\`rtbd\` features to achieve margin kerning; however, the OpenType feature
model did not develop as planned, and so this feature was never implemented.
`, done: true, state: null }, ordn: { title: "Ordinals", registered: "Adobe", state: "discretionary", description: `In some languages, alphabetic glyphs are used to abbreviate ordinal numerals.
For example, in Italian, the word for "second" is written 2\xBA when referring
to a gramatically masculine noun and 2\xAA when referring to a gramatically
feminine noun. While this can be encoded with the Unicode FEMININE ORDINAL INDICATOR
(U+00AA) and MASCULINE ORDINAL INDICATOR (U+00BA) codepoints as in this
paragraph, it is more common to use the standard Latin \`a\` and \`o\` characters
and use a font feature to form the ordinal indicators.

Additionally, the numero sign (\u2116, U+2116) is more commonly written with the
Latin sequence \`No.\`. This feature is applied to convert it to the numero
glyph.

Some fonts also use this feature to place other Latin glyphs in "ordinal
position".
`, fea: `feature ordn {
  sub @numeral [A a] by ordfeminine;
  sub @numeral [o o] by ordmasculine;

  sub N o period by numero;
} ordn;
`, example: { font: "Alegreya Sans", text: "No. 2a" }, ui: `In the OS X typography panel, this feature is accessed via "Vertical Position
> Ordinals".
`, done: true, status: null }, ornm: { title: "Ornaments", description: `This feature has two uses, both of which are used to select ornament glyphs
from within the font's glyphset.


In the first use, all ornamental glyphs (fleurons, manicules, dingbats and
so on) are made available through a GSUB3 alternate substitution from the
bullet character (U+2022).


In the second use, ASCII characters are substituted for ornamental forms using
a GSUB1 substitution.
`, registered: "Adobe", state: "discretionary", fea: `feature ornm {
  sub bullet from @ornaments;


  sub less by arrowleft;
  sub greater by arrowright;
  sub plus by arrowup;
  # ...
} ornm;
`, example: { font: "Spectral", text: "+\xD7=<>" }, done: true, status: null }, palt: { title: "Proportional Alternate Widths", automatic: true, state: "discretionary", registered: "Adobe", description: `This feature is similar to the \`pwid\` feature, but instead of replaces full-width
glyphs with proportional equivalents, it re-spaces the glyphs using positioning
rules.
`, fea: `feature palt {
  pos uniFF41 <-186 0 -373 0>;
  pos uniFF42 <-148 0 -346 0>;
  pos uniFF43 <-220 0 -441 0>;
  pos uniFF44 <-176 0 -353 0>;
  # ...
} palt;
`, example: { font: "Shippori Mincho", text: "\u304B\uFF41\uFF42\uFF43\u304B" }, ui: 'In the OS X typography panel, this feature is accessed via "Text spacing > Alternative Proportional Widths".', done: true, status: null }, pcap: { title: "Petite Capitals", registered: "Tiro Typeworks / Emigre", state: "discretionary", automatic: true, description: 'Substitutes lowercase characters for petite capitals. Petite capitals are an additional set of capital letters found in some founds which are smaller than the "small caps" set, designed to harmonize better with the lowercase letters. (See, for example, [Mrs Eaves](https://fonts.adobe.com/fonts/mrs-eaves) and [Filosophia](https://fonts.adobe.com/fonts/filosofia).)\n\nCompare with `c2pc`, which substitutes uppercase letters for petite capitals.\n\nNote that as this feature changes the case of the glyph, font engineers should ensure that any language-specific localisations are taken into account during case conversion - for example, when applying this feature to the letter `i` in Turkish, the returned form should appear with a dot above. (This is often achieved by replacing i with `idotless dotaccent` or similar in the `locl` feature.)\n', fea: `feature pcap {
  sub a by A.pc;
  sub b by B.pc;
  # ...
} pcap;
`, example: { font: "EB Garamond", text: "This" }, ui: `In the OS X typography panel, this feature is accessed via "Lowercase ->
Petite Capitals."


In CSS, this feature can be set with \`font-variant-caps: petite-caps;\`
`, done: true, status: null }, pkna: { title: "Proportional Kana", registered: "Adobe", state: "discretionary", description: `Japanese characters are usually typeset on a fix-width em square grid. However,
for display purposes, it may be preferable to set the glyphs proportionally.
This feature either replaces the kana glyphs with alternate glyphs with reduced
sidebearings, or uses positioning rules to achieve the same effect. See also
\`pwid\`.
`, fea: `feature pkna {
  sub ka-hira by ka-hira.pkna;
  sub ki-hira by ki-hira.pkna;
  # ...
} pkna;

# OR

feature pkna {
  pos ka-hira <-75 0 -75 0>;
  pos ki-hira <-15 0 -35 0>;
  # ...
} pkna;
`, example: { font: "Feature Sans", text: "\u304B\u308A\u304B\u308A" }, done: true, status: null }, pnum: { title: "Proportional Figures", registered: "Microsoft/Adobe", automatic: true, description: "This feature replaces tabular (fixed-width) figures by proportional variants.\nSee also the `onum`, `lnum` and `tnum` features. Note that where the default\nform is proportional, this feature has no effect, although some font editors\nprovide rules for this feature in any case.\n", fea: `feature pnum {
  sub one.tf by one;
  sub two.tf by two;
  sub three.tf by three;
  #...
} pnum;
`, done: true, ui: `In the OS X typography panel, this feature is accessed via "Number Spacing >
Proportional Numbers".


In CSS, this feature can be accessed through the \`font-variant-numeric: proportional-nums\` property.
`, state: null, status: null }, pref: { title: "Pre-base Forms", registered: "Microsoft", group: "Orthographic", script: { INDIC: { order: 2 }, USE: { order: 2 }, mym2: { order: 1 }, khmer: { order: 0 } }, state: "required", description: `This feature is intended to form pre-base ligatures. In the Indic shaper, its
application is scoped to
the virama-consonant pair ordered before the base consonant. It is most often
used in Khmer fonts to replace the \`coeng ro\` sequence with a pre-base form
of the ra (see also \`cfar\`), or as a generic orthographic feature in Myanmar (Burmese).


Note that in the Indic shaper, this feature is also used as a "signal" to the shaping engine for reordering
purposes: that is, if a virama-consonant pair would be substituted by this feature,
then that consonant is placed in the *post*-base position when the syllable is reordered.
(Note: not the pre-base position, as one might expect!)
`, fea: `feature pref {
  sub coeng-khmer ro-khmer by coeng-ro;

  # This could alternately be in cfar
  sub coeng-ro @consonant @subjoined by coeng-ro.longer;
}
`, done: true, status: null }, pres: { title: "Pre-base Substitutions", registered: "Microsoft", state: "required", group: "Typographic", script: { INDIC: { order: 0 }, khmr: { order: 0 }, USE: { order: 0 }, mym2: { order: 0 } }, description: `This feature is used in Indic, Khmer, Myanmar and USE scripts to form pre-base
conjunct ligatures. For example, in Devanagari or Gujarati, the sequence
\`ka + virama + consonant\` is first substituted by the half form \`k + consonant\`
in the \`half\` feature, but then is further ligated to a conjunct form in this
feature.


The feature may also be used for other presentational adjustments
concerning pre-base forms, such as selecting the correct width of the i-matra.
`, fea: `feature pres {
    sub k-deva ka-deva by kka-deva;
    sub k-deva kha-deva by kkha-deva;
    # ...
    sub g-deva ga-deva by gga-deva;
    # ...
    sub iMatra-deva' @width1 by iMatra-deva.1;
    sub iMatra-deva' @width2 by iMatra-deva.2;
    # ...
} pres;
`, example: { font: "Hind", text: "\u0924\u094D\u0924\u093F" }, done: true, status: null }, pstf: { title: "Post-base Forms", registered: "Microsoft", group: "Orthographic", script: { INDIC: { order: 6 }, USE: { order: 3 }, mym2: { order: 3 }, khmer: { order: 0 } }, state: "required", description: `This feature is intended to replace glyphs by their post-base forms. For example,
in Bengali and Gurmukhi, the ya consonant has a post-base form when followed
by a virama.

Note that in the Indic shaper, this feature is also used as a "signal" to the shaping engine for reordering
purposes: that is, if a virama-consonant pair would be substituted by this feature,
then that consonant is placed in the post-base position when the syllable is reordered.
`, fea: `feature pstf {
    sub viramabeng yabeng by yabeng_viramabeng.pstf;
} pstf;
`, example: { font: "Lohit Bengali", text: "\u09AC\u09CD\u09AF\u09CD" }, done: true, status: null }, psts: { title: "Post-base Substitutions", registered: "Microsoft", state: "required", group: "Typographic", script: { INDIC: { order: 0 }, khmr: { order: 0 }, USE: { order: 0 }, mym2: { order: 0 } }, description: `This feature is intended to replace base + post-base sequences with a ligature
glyph. It can also be used to perform any contextual post-base substitution
required (for example, in Devanagari or Bengali, replacing the ii-matra (\u0940)
with appropriate width glyphs to point to the stem of the consonant).
`, fea: `feature psts {
  sub ka-javanese cakra by ka_cakra;
  sub ta-javanese cakra by ta_cakra;
  # ...
} psts;
`, example: { font: "Noto Sans Javanese", text: "\uA98F\uA9BF\uA99B\uA9BF" }, done: true, status: null }, pwid: { title: "Proportional Widths", automatic: true, state: "discretionary", registered: "Adobe", description: `This feature replaces glyphs (normally figures and punctuation) sized to
the em-square with variants which are proportionally spaced. This is generally
used with CJK fonts. It is the opposite of the \`fwid\` feature.
`, fea: `feature pwid {
  sub uniFF11 by one;
  sub uniFF12 by two;
  # ...
  sub uniFF41 by a;
  sub uniFF42 by b;
  # ...
} pwid;
`, example: { font: "Kiwi Maru", text: "\u304B\uFF41\uFF42\uFF43\u304B" }, ui: 'In the OS X typography panel, this feature is accessed via "Text spacing > Proportional Widths".', done: true, status: null }, qwid: { title: "Quarter Widths", automatic: true, state: "discretionary", registered: "Adobe", description: "This feature replaces glyphs (normally figures and punctuation) with variants\nwhich are one-quarter of the em square. This is generally used with CJK fonts\nand in the context of vertical typesetting. (For placing a sequence of four\nnumbers horizontally across an em-width vertical column.)\n\nSee also `fwid`, `hwid`, `twid`.\n", fea: `feature qwid {
  sub one by one.qwid;
  sub two by two.qwid;
  # ...
}
`, example: { font: "Feature Sans", text: "\u304B1231\u304B" }, ui: 'In the OS X typography panel, this feature is accessed via "Text spacing > Quarter Width".', done: true, status: null }, rand: { title: "Randomize", registered: "Adobe", state: "default", description: `The randomize feature, which is *currently only implemented in the Harfbuzz shaping engine*,
allows font designers to randomly replace glyphs with variants from a selection,
using a GSUB3 alternate substitution. This can be useful for handwriting or
display style fonts. This feature is applied by default (at least in Harfbuzz),
and there is no user interface to disabling it; use tastefully.


Note that because of the limited implementation of this feature, it is still
recommended to use one of the other deterministic alternate selection strategies
described in the [OpenType Cookbook](http://opentypecookbook.com/common-techniques/#randomization)
in a \`calt\` feature. Also note that to avoid problems with reflowing text,
the Harfbuzz shaping engine applies the same random seed to each shaping run.
This means that while the glyphs within a run are chosen (pseudo)randomly, the
results will be consistent each time the same text is shaped.
`, fea: `feature rand {
  # But you probably want to use one of the OpenType Cookbook recipes
  # in a calt feature instead
  sub A from [A a.rand1 A.rand2 A.rand3];
} rand;
`, example: { font: "Feature Sans", text: "AAAA" }, done: true, status: null }, rclt: { group: "Typographic", state: "required", script: { arab: { order: 2 }, syrc: { order: 2 } }, title: "Required Contextual Alternates", registered: "Microsoft", description: `This feature is intended for required contextual alternates (contextual
alternates which should not be subject to user control). Note that in the
Arabic shaper it is processed early in the typographic presentation phase;
in other shapers, it is processed along with the common feature group.


In the example, Reem Kufi uses the \`rclt\` feature to swap repeated *beh*
glyphs for glyphs with raised teeth.
`, fea: `feature rclt {
  lookupflag IgnoreMarks;
    sub [behDotless-ar.init behDotless-ar.medi]
         behDotless-ar.medi'
        [behDotless-ar.medi behDotless-ar.fina]
     by  behDotless-ar.medi.high;
    sub [seen-ar.init seen-ar.medi]
         behDotless-ar.medi'
     by  behDotless-ar.medi.high;
    sub  behDotless-ar.init
         behDotless-ar.medi'
         noonghunna-ar.fina
     by  behDotless-ar.medi.high;
} rclt;
`, example: { font: "Reem Kufi", text: "\u0628\u0628\u0628\u0628\u0628" }, done: true, status: null }, rkrf: { title: "Rakar Forms", registered: "Microsoft", group: "Orthographic", script: { INDIC: { order: 2 }, USE: { order: 3 } }, state: "required", description: 'This feature is used in the Indic and USE complex shapers to replace\nconsonant clusters involving "ra" with conjunct forms. For example, in Devanagari,\nthe sequence `ka virama ra` should be replaced by the conjunct form `kra`.\nWhile this substitution was previously achieved in the v1 shaper by the combination\nof the `bwlf` and `vatu` features, the v2 shaper allows for a simpler way to\nsubstitute the entire sequence.\n\n\nThe `half` feature is processed after this feature, so any conjuncts created\nin `rkrf` must also be included in the half-form rules in `half`.\n', fea: `sub rkrf {
    sub ka-deva   virama-deva ra-deva by   kra-deva;
    sub kha-deva  virama-deva ra-deva by  khra-deva;
    sub ga-deva   virama-deva ra-deva by   gra-deva;
    # ...
} rkrf;
`, done: true, status: null }, rlig: { group: "Typographic", state: "required", script: { arab: { order: 1 }, syrc: { order: 1 } }, title: "Required Ligatures", registered: "Microsoft", description: `This feature is intended for required ligatures (ligatures which should not
be subject to user control). Note that in the Arabic shaper it is processed
early in the typographic presentation phase; in other shapers, it is processed
along with the common feature group.
`, fea: `feature rlig {
  lookupflag IgnoreMarks RightToLeft;
  sub lam-ar.init alef-ar.fina by lam_alef-ar;
  sub lam-ar.medi alef-ar.fina by lam_alef-ar.fina;
  sub lam-ar.init alefHamzaabove-ar.fina by lam_alefHamzaabove-ar;
  sub lam-ar.medi alefHamzaabove-ar.fina by lam_alefHamzaabove-ar.fina;
  sub lam-ar.init alefHamzabelow-ar.fina by lam_alefHamzabelow-ar;
  sub lam-ar.medi alefHamzabelow-ar.fina by lam_alefHamzabelow-ar.fina;
  sub lam-ar.init alefMadda-ar.fina by lam_alefMadda-ar;
  sub lam-ar.medi alefMadda-ar.fina by lam_alefMadda-ar.fina;
  sub lam-ar.init alefWasla-ar.fina by lam_alefWasla-ar;
  sub lam-ar.medi alefWasla-ar.fina by lam_alefWasla-ar.fina;
} rlig;
`, example: { font: "El Messiri", text: "\u0644\u0627" }, done: true, status: null }, rphf: { title: "Reph Form", registered: "Microsoft", group: "Orthographic", script: { INDIC: { order: 8 }, USE: { order: 0 }, mym2: { order: 0 } }, state: "required", description: `This feature replaces consonant+virama with the reph form of the consonant.
In Devanagari, non-final ra+virama should be substituted by reph. The context
of application is restricted to a syllabic cluster.


Note that in the Universal Shaping Engine, this feature is also used as a
"signal" to the shaping engine for reordering purposes: after this feature
has been processed, any glyphs substituted in by this feature are considered
to have USE category \`R\`.
`, fea: `feature rphf {
  sub ra-deva halant-deva by reph-deva;
} rphf;
`, done: true, status: null }, rtbd: { title: "Right Bounds", registered: "Adobe", status: "deprecated", description: `This feature was intended as part of the implementation of character
protrusion (see \`opbd\`); the idea being that it would be applied to the final
character on a line to alter the bounds of that character allowing it to
protrude into the right margin. However, this would require an interaction
between the line breaking engine and the shaping engine which has only once
been implemented, in the LuaTeX layout system.


This feature should therefore be regarded as prematurely specified and
hence deprecated.
`, done: true, state: null }, rtla: { title: "Right-to-left alternates", registered: "Adobe", state: "required", group: "Preprocessing", order: 2, description: `This feature is applied to right-to-left texts as part of the glyph preprocessing
stage. It is intended for substituting variants which are appropriate for
right-to-left text, but which are not mirrored substitutions. (Mirrored forms
of glyphs should be handled by the \`rtlm\` feature.)


No examples of this feature being used as described have been found; Noto
Sans Tifinagh uses the feature to mirror glyphs when Tifinagh is being set
right-to-left (e.g. when used to write Tuareg).
`, done: true, example: { font: "Noto Sans Tifinagh", text: "\u2D4E\u2D49\u2D37\u2D37\u2D4F" }, status: null }, rtlm: { title: "Right-to-left mirrored forms", registered: "Adobe", group: "Preprocessing", order: 3, state: "required", description: `When a bidirectional text is being laid out, any characters which have the
\`Bidi_Mirrored\` Unicode property and whose directionality is resolved to RTL
will be replaced by their mirrored equivalents. This mirroring is specified
by the [Unicode Bidirectional Algorithm](https://unicode.org/reports/tr9/#L4),
and is performed by the layout engine prior to shaping.


However, a font may contain mirrored glyphs for characters which do *not* have
the \`Bidi_Mirrored\` property (and thus are not handled by the Unicode bidirectional
algorithm), but which are required to be mirrored when displayed in right-to-left settings.
For example, mathematical characters such as the square root sign (\u221A) and
intergral sign (\u222B) do not have mirrored forms encoded in Unicode, but should be
mirrored in right-to-left text.
`, done: true, example: { font: "Noto Sans Math", text: "\u222B\u221Ax" }, status: null }, ruby: { title: "Ruby Notation Forms", registered: "Adobe", description: `In Japanese typesetting, words written in kanji may be superscripted by
the kana transliteration of the words to aid with reading. (In vertical
settings, the transliteration is placed to the right.) These subscripted
kana, called *furigana* or ruby, are scaled down to a reduced size relative
to the main text. Scaling and positioning is applied by the typesetting
engine, but the font may wish to provide alternate forms of the kana
when they are being used in a ruby context - for example, slightly bolder
forms such that they will maintain the correct weight when scaled down to
ruby size, or different forms that are more legible when displayed at a
smaller size.
`, fea: `feature ruby {
  sub ka-hira by ka-hira.ruby;
  sub sa-hira by sa-hira.ruby;
  # ...
} ruby;
`, done: true, ui: `In the OS X typography panel, this feature is accessed via "Ruby Glyphs".
`, state: null, status: null }, rvrn: { title: "Required Variation Alternates", group: "Preprocessing", order: 0, registered: "Microsoft", state: "required", description: `OpenType Font Variations provides for the ability for different features to
apply at different point of the variation space. For example, consider a
font with a weight axis - when the weight is greater than 600, the designer
wants the \`dollar\` glyph to be substituted for a simplified form to avoid
crowding the internal counterspace. This facility is called "feature variation",
and because it is implemented by substitution, it allows for different portions
of the variation space to represent the same character using different glyphs
and therefore different outlines; this in turn means that designers can implement
variations without being forced to make the outlines compatible between
dramatically different forms.


According to the OpenType specification, feature variation can be applied to
*any* feature. However, Microsoft registered the \`rvrn\` feature specifically
for processing feature variations early in the shaping process. This may not
turn out to be the best approach, as future rules now need to take into account
not just the original glyph but any substitutions; it may be better to perform
design-specific substitutions *after* all orthographic substitutions have between
completed.


Both Harfbuzz and CoreText process feature variations in features other than
the \`rvrn\` feature. I have not been able to ascertain whether or not the Microsoft
shapers process feature variation tables in other features. If they do - and
if font creation tools allow for creating feature variation tables in other
features - then this feature could be considered technically redundant.
`, done: true, status: null }, salt: { title: "Stylistic Alternates", registered: "Adobe", state: "discretionary", status: "discouraged", automatic: true, description: "Prior to the introduction of multiple stylistic sets (see the `ss01` feature),\nthis feature was used to select alternate aesthetic forms of glyphs which do\nnot correspond to the descriptions of other features. Currently, this feature\nis generally implemented by font editors either by replicating the rules of `ss01`\nor by combining *all* stylistic alternate substitutions.\n\n\nStylistic sets (`ss01`...`ss20`) should be used in current fonts in preference\nto this feature, as UI support for the `salt` feature is not always available.\n", done: true }, sinf: { title: "Scientific Inferiors", registered: "Microsoft/Adobe", state: "discretionary", automatic: true, description: `This feature replaces glyphs with subscript forms, similar to the \`subs\` feature,
but in theory for a wider range of glyphs (including Latin letters),
generally for chemical or mathematical notation.


Also, in theory, subscript numerals should sit on the baseline, while scientific
inferiors should bisect the baseline

In practice, the same substitutions are often made as those in the \`subs\` feature.
`, example: { font: "Alegreya", text: "H2O" }, ui: 'In the OS X typography panel, this feature is accessed via "Vertical Position > Scientific Inferiors".', done: true, status: null }, size: { status: "deprecated", registered: "Adobe", title: "Optical size", description: `This feature was intended as a way to store information about the optical size of the font
and the font's relationship to other optical size variants in the same family. It has
been entirely superseded by the \`STAT\` table, and should not be used.
`, done: true, state: null }, smcp: { title: "Small Capitals", registered: "Adobe", state: "discretionary", automatic: true, description: "Substitutes lowercase characters for small capitals. Small capitals are often used to set acronyms. Compare with `c2sc`, which substitutes uppercase letters for small capitals.\n\nNote that as this feature changes the case of the glyph, font engineers should ensure that any language-specific localisations are taken into account during case conversion - for example, when applying this feature to the letter `i` in Turkish, the returned form should appear with a dot above. (This is often achieved by replacing i with `idotless dotaccent` or similar in the `locl` feature.)\n", fea: `feature smcp {
  sub a by A.sc;
  sub b by B.sc;
  # ...
} smcp;
`, example: { font: "EB Garamond", text: "This" }, ui: `In the OS X typography panel, this feature is accessed via "Lowercase ->
Small Capitals."


In CSS, this feature can be set with \`font-variant-caps: small-caps;\`
`, done: true, status: null }, smpl: { title: "Simplified Forms", registered: "Adobe", description: `This feature was intended for converting Chinese or Japanese glyphs to simplified forms.
No fonts implementing this feature have been identified and it is not
specified in the Adobe Japan1 glyph set. As with the \`hngl\` feature,
character semantics should be selected using the input method environment,
rather than the font, and hence this feature is discouraged.
`, status: "discouraged", done: true, state: null }, ss01: { title: "Stylistic Set 1 - Stylistic Set 20", registered: "Tiro Typeworks", state: "discretionary", automatic: true, description: `These features - ranging from \`ss01\` to \`ss20\` - allow for stylistic variations
of *sets* of characters to vary in a common way. This is distinct from the
\`cv01\`-\`cv99\` features which allow characters to vary arbitrarily with no
implication of any common variations across a range of glyphs.


For example, in the font Cormorant, stylistic set 01 changes the terminals
of capital letters; stylistic set 02 opens the counters of glyphs with
counters; stylistic set 03 replaces double-storey glyphs (\`g\`, \`a\`) with
single-storey forms, and so on.


When this feature is coded manually, stylistic sets may be given
identifying names to be displayed in the user interface. See the
[Adobe feature file specification](http://adobe-type-tools.github.io/afdko/OpenTypeFeatureFileSpecification.html#8.c)
for the format of these names.


These features are an extension to (and repacement for) the \`salt\` feature,
which only provides access to a single stylistic set.
`, fea: `feature ss01 {
  featureNames {
    name "Alternate terminals";
  }
  sub A by A.ss01;
  sub B by A.ss01;
} ss01;
`, example: { font: "Cormorant", text: "QUACK" }, done: true, ui: 'In the OS X typography panel, this feature is accessed via "Alternative Stylistic Sets".', status: null }, ssty: { title: "Math script style alternates", registered: "Microsoft", script: { math: null }, example: { math: "<msup> <mi>x</mi> <msup> <mi> x </mi> <mi>x</mi> </msup> </msup>" }, description: `This feature is used by the math layout engine to select glyph variants
used in subscripts and superscripts. When the engine lays out a glyph as
a superscript or subscript, it will first determine the script level: 1
for first-level sub-/superscripts and 2 for higher levels. It will then
supply the script level as a parameter to a GSUB3 alternate substitution
rule in this feature to obtain the correct glyph variant.


The glyph variant will then be scaled by the math layout engine based on
the factor specified in the MATH table (\`MATH.MathConstants.scriptPercentScaleDown\`
for first-level sub-/superscripts and \`MATH.MathConstants.scriptScriptPercentScaleDown\`
for higher level scripts). As the scaling will be performed by the layout
engine, the form of the glyphs substituted in this feature should not be
scaled or repositioned. For example, the STIX Math Two font shown in the
example uses slightly bolder script alternates so that the glyph weights
appear consistent when scaled down.
`, done: true, state: null, status: null }, stch: { title: "Stretching Glyph Decomposition", registered: "Microsoft", state: "required", group: "Common", script: { arab: { order: 0 }, syrc: { order: 0 } }, description: `Right.


The \`stch\` feature is part of the Arabic complex shaper. (It is the first
feature processed in the glyph preprocessing phase). It was designed to
implement the Syriac Abbreviation Mark (U+070F), which stretches to fill the
width of the enclosed text.


The feature should be implemented by the font engineer as a multiple substitution,
replacing the glyph mapped to U+070F with an *odd number of glyphs*. When applying
the feature, the shaper performs the following actions:


  * The substitution rules specified in the \`stch\` feature are applied, and the
  sequence of glyphs returned by the rule applications are collected.

  * The first glyph in the returned sequence is placed at the start of the glyph stream.

  * The final glyph in the returned sequence is placed at the end of the glyph stream.

  * At the end of processing, after positioning rules have been applied, the
    width of the whole glyph stream is calculated.

  * Next, odd-numbered glyphs inside the returned sequence other than the
    first and final glyph are positioned such that they are distributed
    evenly across the glyph stream. (For example, if there are five glyphs in the
    sequence returned from \`stch\`, the third glyph is positioned horizontally
    to appear in the middle of the glyph stream. If there are seven glyphs, the
    third glyph is positioned to appear one-third of the way along the glyph
    stream, and the fifth to appear two-thirds of the way along.)

  * Finally, even-numbered glyphs inside the returned sequence are positioned
    and *repeated* such that their widths completely fill the spaces between
    the odd-numbered glyphs.

Further: the first and last glyphs in the returned sequence may be base glyphs
or mark glyphs, and should have a non-zero horizontal advance. The
remaining glyphs must be set as mark glyphs, but should also have a non-zero
horizontal advance.


Note that although the OpenType specification describes this feature as having
no "script/language sensitivity", and in theory can be applied to any situation
where a glyph is decomposed and repeated to stretch over an enclosed sequence
of glyphs (for example, enclosed numbers, Arabic year or end-of-aya marks, etc.),
it is only processed as part of the Arabic complex shaper.


Note also that as of macOS 11.4, the CoreText shaper does not apply this feature,
and even if the feature is manually applied, the CoreText shaper does not implement
the distribution and stretching algorithm required to make the feature operated
as expected. This has led some font engineers to create their own, manual
implementation inside the font; while this is an interesting engineering exercise,
adding in the repeated glyphs manually inside the \`stch\` feature leads to
erroneous results when such a font is used with a shaping engine which *does*
implement \`stch\` as specified, and cannot be recommended.
`, fea: `feature stch {
  sub abbreviation-syriac by
    abbreviation-syriac.start
    abbreviation-syriac.line
    abbreviation-syriac.linedot
    abbreviation-syriac.line
    abbreviation-syriac.end;
} stch;
`, done: true, status: null }, subs: { title: "Subscript", registered: "Microsoft/Adobe", state: "discretionary", automatic: true, description: `This feature replaces glyphs, typically numerals, with subscript forms.
`, example: { font: "Alegreya", text: "H2O" }, ui: 'In the OS X typography panel, this feature is accessed via "Vertical Position > Inferiors/Subscripts".', done: true, status: null }, sups: { title: "Superscript", registered: "Microsoft/Adobe", state: "discretionary", automatic: true, description: `This feature replaces glyphs with superscript forms, typically for use as footnote
references.
`, example: { font: "Alegreya", text: "2 HI. a,b,c" }, ui: 'In the OS X typography panel, this feature is accessed via "Vertical Position > Superiors/Superscripts".', done: true, status: null }, swsh: { title: "Swash", registered: "Microsoft/Adobe", state: "discretionary", automatic: true, description: `This feature is used to replace glyphs with swash forms - typically, but not
exclusively, swash capitals. Although the OpenType standard suggests that
multiple swash alternates may be selected by providing a GSUB3 (\`sub ... from ...\`)
rule for this feature, in reality most implementations expect a single swash
alternate, and users may have difficulty accessing glyphs other than the first
alternate. For this reason, we recommend using GSUB1 (\`sub @chars by @chars.swsh\`)
rules for this feature.


See also the \`cswh\` feature for contextual swash forms.
`, example: { font: "Playball", text: "Fake It" }, ui: 'In the OS X typography panel, this feature is accessed via "Contextual Alternates > Swash Alternates".', done: true, status: null }, titl: { title: "Titling", registered: "Adobe", state: "discretionary", automatic: true, description: `This feature substitutes glyphs for alternate forms designed for titling,
typically some or all capital letters.
`, example: { font: "Work Sans", text: "P\xD6W" }, done: true, ui: `In the Mac OS X typography panel, this feature is accessed via "Style Options >
Titling Capitals".
`, status: null }, tjmo: { title: "Trailing Jamo Forms", registered: "Microsoft", group: "Topographical", state: "required", script: { hang: 3 }, description: `The Korean Hangul script is encoded in Unicode in two ways: first, as a series
of precomposed syllable graphemes (encoded from U+AC00 to U+D7AF); second, as
a series of indivdual, conjoining *jamo*. Korean syllables form a LVT?
(leading consonant, vowel, optional trailing consonant) pattern; the leading consonant
(*choseong*) jamo are encoded between U+1100 and U+115F, the vowel (*jungseong*)
jamo are encoded between U+1160 and U+11A7, and the optional trailing consonant
(*jongseong*) jamo between U+11A8 and U+11FF. (At least in the primary Hangul
Jamo Unicode block; other jamo are encoded in extension blocks.)


The Hangul shaper will first attempt to compose any sequences of conjoining jamo
into an encoded form in the precomposed syllable block. But where this is not
successful - for example, in an Old Korean form which is not encoded in Unicode
as a precomposed syllable - then the shaper will instead *decompose* any LV
syllables to break the syllable into separate L, V, and T? characters, and then
apply the Korean shaping features (\`ljmo\`, \`vjmo\`, \`tjmo\`) to select forms of
the jamo which are appropriately positioned and sized to combine into the correct
grapheme-image.


For example, the Old Korean syllable \u1112\u119E\u11AF is not encoded in Unicode as a precomposed
syllable, and so must be encoded with the three individual jamo. The Hangul
shaper applies the \`ljmo\` feature to the *choseong*, the \`vjmo\` feature to the
*jungseong* and the \`tjmo\` feature to the *jongseong*. The resulting sequence
produces a glyph which renders the syllable correctly, with the \`vjmo\` and
\`tjmo\` generally producing zero-width mark glyphs positioned appropriately. An
alternative to this technique is to use the \`ccmp\` feature to turn decomposed
jamo into a precomposed glyph.


For further information, see sections 3.12 and 18.6 of the Unicode Standard.
`, done: true, status: null }, tnam: { title: "Traditional Name Forms", registered: "Adobe", status: "discouraged", description: `This feature was intended for selecting traditional forms of kanji used in personal
names. No fonts implementing this feature have been identified and it is not
specified in the Adobe Japan1 glyph set; font developers should place any such
substitutions in the \`trad\` feature instead.
`, done: true, state: null }, tnum: { title: "Tabular Figures", registered: "Microsoft/Adobe", automatic: true, description: "This feature replaces proportional figures by tabular (fixed-width) variants.\nSee also the `onum`, `lnum` and `pnum` features. Note that where the default\nform is tabular, this feature has no effect, although some font editors\nprovide rules for this feature in any case.\n", fea: `feature tnum {
  sub one by one.tf;
  sub two by two.tf;
  sub three by three.tf;
  #...
} tnum;
`, done: true, example: { font: "Work Sans", text: "|1|2|3|4|" }, ui: `In the OS X typography panel, this feature is accessed via "Number Spacing >
Monospaced Numbers".


In CSS, this feature can be accessed through the \`font-variant-numeric: tabular-nums\` property.
`, state: null, status: null }, trad: { title: "Traditional Forms", registered: "Adobe", description: `The expected forms of Japanese kanji have evolved and simplified over time. However,
in particular situations - often in the display of personal names - older,
"traditional" forms (*kyujitai*) are still preferred. This feature allows a user to enter
text as normal (i.e. with the Unicode codepoint for a more common, simplified
form) but have it substituted typographically for the traditional glyph. For
example, to typeset the name Sakae as \u69AE (a variant found in south west Japan),
the user would enter the reading \u3055\u304B\u3048 in their input method environment, and
have it converted to \u6804, the usual kanji for this word. Applying the \`trad\`
feature would replace \u6804 with \u69AE.


Note that where traditional forms have their own Unicode codepoints, using these
codepoints directly is preferred, to avoid ambiguity and to preserve the distinction
in the source text. In some cases (for example, the traditional form of \u6717),
*kyujitai* were not separately encoded in Unicode due to Han unification, and
so the \`trad\` feature is necessary to access these glyphs.


The expected substitutions of the \`trad\` feature are defined in terms of the
[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) glyphset.
Engineers creating Japanese fonts according to that glyphset should read the
information at the Adobe-Japan1 repository, and use the latest version of the
feature code provided there to implement this feature.
`, fea: `feature trad {
  sub uni4E9C by uni4E9E;
  sub uni60AA by uni60E1;
  sub uni9BF5 by uni9C3A;
  sub uni5727 by uni58D3;
  sub uni56F2 by uni570D;
  sub uni7AC3 by uni7AC3.jp78;
  sub uni6717 by uni6717.trad;
  # ...
} trad;
`, example: { text: "\u6717\u6804\u5727", font: "Kiwi Maru" }, done: true, state: null, status: null }, twid: { title: "Third Widths", automatic: true, state: "discretionary", registered: "Adobe", description: "This feature replaces glyphs (normally figures and punctuation) with variants\nwhich are one-third of the em square. This is generally used with CJK fonts\nand in the context of vertical typesetting. (For placing a sequence of three\nnumbers horizontally across an em-width vertical column.)\n\nSee also `fwid`, `hwid`, `qwid`.\n", fea: `feature twid {
  sub one by one.twid;
  sub two by two.twid;
  # ...
}
`, example: { font: "Feature Sans", text: "\u304B123\u304B" }, ui: 'In the OS X typography panel, this feature is accessed via "Text spacing > Third Width".', done: true, status: null }, unic: { title: "Unicase", registered: "Tiro Typeworks", description: `This feature was intended for mapping both upper- and lowercase letters
to a "unicase" alphabet, a set of glyphs with a common glyph height using
a mix of upper- and lowercase glyph forms. (For example, a font may use
the lowercase style of \`a\` but the uppercase style of \`B\`, but both glyphs
will have the same height; see Bradbury Thompson's [Alphabet 26](https://en.wikipedia.org/wiki/Bradbury_Thompson#Alphabet_26)
or Zuzana Licko's [Filosofia Unicase](https://www.emigre.com/Fonts/Filosofia).)
`, ui: "This feature can be activated using the CSS rule `font-variant-caps: unicase`,\nsubject to browser support.\n", done: true, state: null, status: null }, valt: { title: "Alternate Vertical Metrics", registered: "Adobe", status: "discouraged", description: `The intention behind this feature was to reposition full-width glyphs
(e.g. U+FF01-U+FF60) so that they would be visually
centered inside the em-square in vertical typesetting context.


However, a more appropriate way to achieve this visual repositioning is to
supply alternate metrics for these glyphs in the \`vmtx\` and \`VORG\` tables.
As such, this feature has only been implemented extremely rarely, and,
despite the description in the OpenType standard, Harfbuzz does not apply
it by default in vertical layout.
`, done: true, state: null }, vatu: { title: "Vattu Variants", registered: "Microsoft", group: "Orthographic", script: { INDIC: { order: 8 }, USE: { order: 0 } }, state: "required", description: `This feature is intended to replace consonant + below-base (vattu) sequences
with ligature forms for fonts supporting the legacy (v1) shaping engine.


For example, in Devanagari, the \`<virama> <ra>\` sequence is normally replaced
by a below-base Ra by the \`blwf\` feature. However, "for certain consonants,
the mark RAsub may graphically combine with the consonant to form a conjunct
ligature form." (Unicode Standard, [section 12.1](https://www.unicode.org/versions/Unicode13.0.0/ch12.pdf), "Rendering Rules", R7.)
This combination is performed by the \`vatu\` feature in the v1 shaping engine
(e.g. \`deva\` script).


For fonts using the new shaper (\`dev2\`), the \`rkrf\` feature is used instead to
substitute the whole \`<consonant> <virama> <ra>\` sequence for a ligature in one rule.
Fonts which wish to support both v1 and v2 shapers should provide both \`rkrf\`
(in the \`dev2\` script) and \`blwf\`/\`vatu\` (in \`deva\` script).


As an orthographic feature, the scope of application of this feature is
scoped to each syllabic cluster.


Note that this feature is also used as a "signal" to the shaping engine for reordering
purposes: that is, if a virama-consonant pair would be substituted by this feature,
then that consonant is placed in the below-base position when the syllable is reordered.
`, fea: `feature vatu {
  script deva;
  sub Ka.dv Vattu.dv by KaRa.dv;
  sub Kha.dv Vattu.dv by KhaRa.dv;
  sub Ga.dv Vattu.dv by GaRa.dv;
  # ...
} vatu;
`, done: true, status: null }, vchw: { state: "discretionary", title: "Vertical Contextual Half-width Spacing", registered: "Adobe/W3C", description: `This feature is the vertical equivalent of \`chws\`; it is intended to improve
the appearance of text set with software which does *not* implement the full
JLREQ spacing rules, but does implement vertical typesetting.

This feature is relatively new as of 2021, no implementations have been
identified, and to be honest, any layout engine which bothers to support
vertical typesetting correctly is probably also going to implement JLREQ
spacing as well.
`, done: true, status: null }, vert: { title: "Vertical Alternates", registered: "Microsoft/Adobe", state: "required", group: "Typographic", description: "This feature is applied automatically by the shaping engine at the end of\nrequired processing and before discretionary processing when the script\ndirection is set to vertical; it replaces the horizontal positioning and\ntypographic presentation group (`calt`/`clig`/`curs`/`dist`/`kern`/`liga`/`rclt`).\n\n\nIt should be used to replace any glyphs with forms which are more appropriate\nto vertical presentation. For example, punctuation such as ellipses and parenthesis\nshould be replaced with rotated forms, Japanese small kana should be positioned in the\nupper right quadrant of the em square, and Japanese ligature forms (U+32FF-33FF) should\nbe replaced with versions which preserve reading order when read vertically.\n\n\nNote that, aside from supporting CJK vertical presentation, this feature\nshould also be used for typographic presentation rules for fonts supporting\nother vertical writing systems, such as Mongolian.\n\n\nNot also that if the `vrt2` feature is present, this feature will be used instead\nby Microsoft shaping engines. Indeed, Windows 2000 and NT4.1 *require* the use\nof a `vrt2` feature for CFF-outline fonts. However, Harfbuzz and Adobe shapers\nuse `vert` exclusively. See discussion in `vrt2`.\n", fea: `feature vert {
  sub ellipsis by uniFE19;
  sub twodotenleader by twodotenleader.vert;
  sub uniFF08 by uniFE35;
  sub uniFF09 by uniFE36;

  sub uni32FF by uni32FF.vert;
  # ...
} vert;
`, example: { font: "Reggae One", text: "\uFF08\u3300\uFF09" }, done: true, status: null }, vhal: { title: "Alternate Vertical Half Widths", automatic: true, state: "discretionary", registered: "Adobe", description: "This feature is similar to the `halt` feature, in that it re-spaces full-width\nglyphs to fit on a half-em, but `vhal` is used in vertical typesetting,\nre-spacing heights instead of widths.\n", fea: `feature vhal {
  pos [degree.full minute.full quotedblright.full quoteright.full second.full uni3001 uni3002 uni3009 uni300B uni300D uni300F uni3011 uni3015 uni301F uniFF09 uniFF0C uniFF0E uniFF3D uniFF5D] <0 -500 0 0>;
  pos [quotedblleft.full quoteleft.full uni3008 uni300A uni300C uni300E uni3010 uni3014 uni301D uniFF08 uniFF3B uniFF5B] <0 -500 0 -500>;
  pos [uni30FB uniFF01 uniFF1A uniFF1B] <0 -250 0 -500>;
} vhal;
`, done: true, ui: "Unknown. Contributions welcome.", status: null }, vjmo: { title: "Vowel Jamo Forms", registered: "Microsoft", group: "Topographical", state: "required", script: { hang: 2 }, description: `The Korean Hangul script is encoded in Unicode in two ways: first, as a series
of precomposed syllable graphemes (encoded from U+AC00 to U+D7AF); second, as
a series of indivdual, conjoining *jamo*. Korean syllables form a LVT?
(leading consonant, vowel, optional trailing consonant) pattern; the leading consonant
(*choseong*) jamo are encoded between U+1100 and U+115F, the vowel (*jungseong*)
jamo are encoded between U+1160 and U+11A7, and the optional trailing consonant
(*jongseong*) jamo between U+11A8 and U+11FF. (At least in the primary Hangul
Jamo Unicode block; other jamo are encoded in extension blocks.)


The Hangul shaper will first attempt to compose any sequences of conjoining jamo
into an encoded form in the precomposed syllable block. But where this is not
successful - for example, in an Old Korean form which is not encoded in Unicode
as a precomposed syllable - then the shaper will instead *decompose* any LV
syllables to break the syllable into separate L, V, and T? characters, and then
apply the Korean shaping features (\`ljmo\`, \`vjmo\`, \`tjmo\`) to select forms of
the jamo which are appropriately positioned and sized to combine into the correct
grapheme-image.


For example, the Old Korean syllable \u1112\u119E\u11AF is not encoded in Unicode as a precomposed
syllable, and so must be encoded with the three individual jamo. The Hangul
shaper applies the \`ljmo\` feature to the *choseong*, the \`vjmo\` feature to the
*jungseong* and the \`tjmo\` feature to the *jongseong*. The resulting sequence
produces a glyph which renders the syllable correctly, with the \`vjmo\` and
\`tjmo\` generally producing zero-width mark glyphs positioned appropriately. An
alternative to this technique is to use the \`ccmp\` feature to turn decomposed
jamo into a precomposed glyph.


For further information, see sections 3.12 and 18.6 of the Unicode Standard.
`, done: true, status: null }, vkna: { title: "Vertical Kana Alternates", registered: "Adobe", state: "discretionary", description: `This feature replaces standard kana forms with glyphs which are designed
specifically for vertical layout. This may take a variety of forms: fonts
designed with proportional kana might provide fixed-width em-square kana
glyphs; glyphs may be raised from the horizontal baseline and centered
within the em-square; or structural changes may be made analogous to the
\`hkna\` feature. In many fonts, vertical alternates are only provided for
the "small" kana.
`, example: { font: "Cherry Bomb One", text: "\u30B7\u30E3\u30C3\u30C8\u30A2\u30C3\u30D7" }, fea: `feature hkna {
  sub ka-hira by ka-hira.vkna;
  sub sa-hira by sa-hira.vkna;
  sub ta-hira by ta-hira.vkna;
  # ...
} hkna;
`, ui: `In the Mac OS X typography panel, this feature is accessed via "Optimized
Kana Alternatives -> Vertical Alternatives".
`, done: true, status: null }, vkrn: { title: "Vertical Kerning", registered: "Adobe", description: "This feature is the equivalent to kerning (see `kern`) for vertical layout, with\nthe exception of the fact that this is *not* necessarily applied by default.\nHarfbuzz and Adobe shapers do not apply it by default in vertical settings,\nand font designers should consider using the `vert` feature instead for maxium compatibility.\n", done: true, state: null, status: null }, vpal: { title: "Proportional Alternate Vertical Metrics", registered: "Adobe", description: `This feature is the vertical equivalent of the \`palt\` feature; it uses
positioning rules to convert full-em glyphs into proportional glyphs
by aftering their position and Y-advance.
`, fea: `feature vpal {
  pos uniFF41 <0 -186 0 -373>;
  pos uniFF42 <0 -148 0 -346>;
  pos uniFF43 <0 -220 0 -441>;
  pos uniFF44 <0 -176 0 -353>;
  # ...
} vpal;
`, done: true, state: null, status: null }, vrt2: { title: "Vertical Alternates and Rotation", status: "discouraged", registered: "Adobe", description: `This feature was intended as a replacement for the \`vert\` feature. The idea
was that this feature would contain rules for vertical alternates as per \`vert\`
and also rules which replace Latin glyphs by rotated forms; this would mean
that the layout process for vertical text would be greatly simplified:
the layout engine could simply apply the \`vrt2\` feature to both CJK and
Latin text, and not need to rotate any glyphs.


However, this model of layout [was not widely accepted](https://lists.freedesktop.org/archives/harfbuzz/2013-August/003490.html),
and the older \`vert\` feature continues to be the most compatible approach to
vertical typesetting. For that reason, the use of this feature is *discouraged*
in favour of \`vert\`.
`, done: true, state: null }, vrtr: { title: "Vertical Alternates for Rotation", registered: "Adobe/Microsoft/W3C", description: `This feature is intended to select alternate glyphs to be used in vertical
typesetting. When the \`writing-mode\` CSS property is set to \`vertical-lr\`
or \`vertical-rl\`, certain glyphs are rotated 90 degrees clockwise by the
rendering engine.

However, prior to rotation, the font may wish to substitute glyphs which
are designed for vertical settings. These glyphs will still be rotated by
the rendering engine, but will be visually distinct from the original forms.


This feature is relatively new as of 2021, and no implementations have been
identified.
`, done: true, state: null, status: null }, zero: { title: "Slashed Zero", registered: "Adobe", description: `This feature allows the user to change between the default form of zero
(without a slash) to a form with a slash through the counter.
`, automatic: true, fea: `feature zero {
  sub zero by zero.zero;
}
`, example: { font: "Work Sans", text: 2021 }, ui: `In the OS X typography panel, this feature is accessed via "Typographic
Extras > Slashed Zero".
`, done: true, state: null, status: null } }, gs = ["Thin", "Hairline", "Extra(?:\\s|-)?Light", "Ultra(?:\\s|-)?Light", "Light", "Normal", "Regular", "Book", "Medium", "Semi(?:\\s|-)?Bold", "Demi(?:\\s|-)?Bold", "Bold", "Extra(?:\\s|-)?Bold", "Ultra(?:\\s|-)?Bold", "Black", "Heavy", "Extra(?:\\s|-)?Black", "Ultra(?:\\s|-)?Black", "Italic", "Oblique", "Ultra(?:\\s|-)?(?:Condensed|Narrow)", "Extra(?:\\s|-)?(?:Condensed|Narrow)", "(?:Condensed|Narrow)", "Semi(?:\\s|-)?(?:Condensed|Narrow)", "Semi(?:\\s|-)?(?:Expanded|Narrow)", "Expanded", "Extra(?:\\s|-)?Expanded", "Ultra(?:\\s|-)?Expanded"], ms = new RegExp(`(?:${gs.join("|")}\\s*)+$`, "g"), ys = /* @__PURE__ */ new Map([[100, "Thin"], [200, "ExtraLight"], [300, "Light"], [400, "Regular"], [500, "Medium"], [600, "SemiBold"], [700, "Bold"], [800, "ExtraBold"], [900, "Black"], [950, "ExtraBlack"]]), bs = /* @__PURE__ */ new Map([[50, "UltraCondensed"], [62.5, "ExtraCondensed"], [75, "Condensed"], [87.5, "SemiCondensed"], [100, "Normal"], [112.5, "SemiExpanded"], [125, "Expanded"], [150, "ExtraExpanded"], [200, "UltraExpanded"]]), Tn = (e, t) => e.type === "single" && t.type === "single" ? e.value === t.value : e.type === "variable" && t.type === "variable" ? e.value.min === t.value.min && e.value.max === t.value.max && e.value.defaultValue === t.value.defaultValue : false, xa = (e) => {
  const t = {};
  for (const r of e) Object.prototype.hasOwnProperty.call(t, r.familyName) ? t[r.familyName].push(r) : t[r.familyName] = [r];
  const n = (r, s) => {
    if (r.tag !== s.tag) throw new Error(`Tried to union two different axes (${r.tag}, ${s.tag})`);
    return { tag: r.tag, name: r.name ?? s.name, min: Math.min(r.min, s.min), defaultValue: r.defaultValue, max: Math.max(r.max, s.max) };
  }, a = (r, s) => {
    const o = {};
    for (const [l, u] of Object.entries(r)) {
      if (!u) continue;
      let c;
      switch (u.type) {
        case "single": {
          c = { type: "single", value: u.value };
          break;
        }
        case "variable": {
          const h = { weight: "wght", width: "wdth", italic: "ital", slant: "slnt" }[l];
          c = { type: "variable", value: { min: u.value.min, defaultValue: u.value.defaultValue, max: u.value.max, curMin: U(u.value.min), curMax: U(u.value.max), curSingle: U(u.value.defaultValue), curMultiValue: U((h && s.get(h)) ?? ""), mode: U("range") } };
          break;
        }
      }
      o[l] = c;
    }
    return o;
  }, i = [];
  for (const [r, s] of Object.entries(t)) {
    const o = [];
    let l = null;
    const u = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map();
    for (const x of s) {
      const F = {};
      if (l === null) l = Object.assign({}, x.styleValues);
      else for (const w of ["weight", "width", "italic", "slant"]) if (Object.prototype.hasOwnProperty.call(l, w)) {
        if (!Tn(l[w], x.styleValues[w])) {
          for (const k of o) k.uniqueStyleValues[w] = l[w];
          delete l[w], F[w] = x.styleValues[w];
        }
      } else F[w] = x.styleValues[w];
      o.push({ font: x, uniqueStyleValues: F });
      for (const w of x.axes) {
        let k = c.get(w.tag);
        k ? c.set(w.tag, n(w, k)) : (k = w, c.set(w.tag, k));
      }
      for (const w of x.subsetCoverage) w.covered && h.add(w.name);
      for (const w of x.features) p.has(w.tag) || p.set(w.tag, w);
      for (const w of x.namedInstances) for (const [k, C] of Object.entries(w.coords)) {
        let I = u.get(k);
        I || (I = /* @__PURE__ */ new Set(), u.set(k, I)), I.add(C);
      }
    }
    const m = /* @__PURE__ */ new Map();
    for (const [x, F] of u.entries()) {
      const w = Array.from(F);
      x === "slnt" ? w.sort((k, C) => C - k) : w.sort((k, C) => k - C), m.set(x, w.join(", "));
    }
    const v = [];
    for (const x of c.values()) {
      let F = m.get(x.tag);
      F || (F = `${x.min}, ${x.max}`), v.push({ tag: x.tag, name: x.name ?? x.tag, range: { min: x.min, defaultValue: x.defaultValue, max: x.max, curMin: U(x.min), curMax: U(x.max), curSingle: U(x.defaultValue), curMultiValue: U(F), mode: U("range") } });
    }
    const d = [], y = Array.from(h.values());
    y.sort((x, F) => x.localeCompare(F));
    for (const x of y) d.push({ name: x, include: U(true) });
    const g = [], b = [], S = [];
    for (const x of p.values()) {
      if (Gt(x.tag).required) continue;
      const F = /(?:ss|cv)\d{2}/.test(x.tag);
      (F && x.tag.slice(0, 2) === "ss" ? b : F && x.tag.slice(0, 2) === "cv" ? S : g).push({ feature: x, include: U(x.keepByDefault) });
    }
    for (const x of [b, S]) x.sort((F, w) => Number(F.feature.tag.slice(2)) - Number(w.feature.tag.slice(2)));
    const _ = a(l, m), T = [];
    for (const x of o) T.push({ font: x.font, styleSettings: a(x.uniqueStyleValues, m) });
    T.sort((x, F) => {
      const w = (R) => {
        const D = x.styleSettings[R] ?? _[R], W = F.styleSettings[R] ?? _[R], Ue = D.type === "variable" ? D.value.defaultValue : D.value, ue = W.type === "variable" ? W.value.defaultValue : W.value;
        return [Ue, ue];
      }, [k, C] = w("width");
      if (k !== C) return k - C;
      const [I, j] = w("weight");
      if (I !== j) return I - j;
      const [V, E] = w("italic");
      if (V !== E) return V - E;
      const [z, $] = w("slant");
      return z !== $ ? $ - z : x.font.subfamilyName.localeCompare(F.font.subfamilyName);
    }), i.push({ name: r, fonts: T, settings: { styleSettings: _, axisSettings: v, includeFeatures: { features: g, stylisticSets: b, characterVariants: S }, includeCharacters: { includeNamedSubsets: d, includeUnicodeRanges: U(""), includeAllCharacters: U(d.length === 0) } }, enableSubsetting: U(true) });
  }
  return i;
}, vs = (e) => {
  if (e.length === 0) throw new Error("axisRangeProduct should be given at least one variable axis");
  const t = [], n = [];
  for (let a = 0; a < e.length; a++) t.push(0);
  e: for (; ; ) {
    const a = [];
    for (let i = 0; i < e.length; i++) {
      const r = e[i];
      switch (r.type) {
        case "single":
        case "variable": {
          a.push(r);
          break;
        }
        case "multiple": {
          const s = r.value.ranges[t[i]];
          typeof s == "number" ? a.push({ type: "single", tag: r.tag, value: s }) : a.push({ type: "variable", tag: r.tag, value: { min: s[0], defaultValue: r.value.defaultValue, max: s[1] } });
          break;
        }
      }
    }
    n.push(a);
    for (let i = 0; i < t.length; i++) {
      const r = e[i], s = r.type === "multiple" ? r.value.ranges.length : 1;
      if (t[i]++, t[i] >= s) {
        if (t[i] = 0, i === t.length - 1) break e;
      } else break;
    }
  }
  return n;
}, ws = (e) => {
  const t = /* @__PURE__ */ new Map(), n = (i) => {
    switch (i.range.mode.value) {
      case "single":
        return { type: "single", tag: i.tag, value: i.range.curSingle.value };
      case "range":
        return { type: "variable", tag: i.tag, value: { min: i.range.curMin.value, max: i.range.curMax.value, defaultValue: i.range.defaultValue } };
      case "multiple": {
        const r = Ti(i.range.curMultiValue.value);
        return r ? { type: "multiple", tag: i.tag, value: { ranges: r, defaultValue: i.range.defaultValue } } : { type: "single", tag: i.tag, value: i.range.defaultValue };
      }
    }
  }, a = (i, r) => {
    if (r.type !== "variable") return null;
    let s;
    switch (i) {
      case "weight": {
        s = "wght";
        break;
      }
      case "width": {
        s = "wdth";
        break;
      }
      case "italic": {
        s = "ital";
        break;
      }
      case "slant": {
        s = "slnt";
        break;
      }
      default:
        throw new Error(`Unhandled style setting name: ${i}`);
    }
    return n({ tag: s, range: r.value });
  };
  for (const i of e) for (const r of i.fonts) {
    if (!i.enableSubsetting.value) {
      t.set(r.font.id, [null]);
      continue;
    }
    const s = i.settings.axisSettings.map((h) => n(h));
    for (const [h, p] of Object.entries(i.settings.styleSettings)) {
      const m = a(h, p);
      m && s.push(m);
    }
    for (const [h, p] of Object.entries(r.styleSettings)) {
      const m = a(h, p);
      m && s.push(m);
    }
    const o = {};
    for (const h of [i.settings.includeFeatures.features, i.settings.includeFeatures.characterVariants, i.settings.includeFeatures.stylisticSets]) for (const p of h) Gt(p.feature.tag).required || (o[p.feature.tag] = p.include.value);
    let l;
    const u = i.settings.includeCharacters;
    if (u.includeAllCharacters.value) l = "all";
    else {
      const h = [];
      for (const p of u.includeNamedSubsets) p.include.value && h.push(p.name);
      l = { named: h, custom: ki(u.includeUnicodeRanges.value) ?? [] };
    }
    const c = s.length > 0 ? vs(s).map((h) => ({ axisValues: h, features: o, unicodeRanges: l })) : [{ axisValues: [], features: o, unicodeRanges: l }];
    t.set(r.font.id, c);
  }
  return t;
}, _s = (e) => {
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const a of e) {
    let i = n.get(a.familyName);
    i || (i = { axes: /* @__PURE__ */ new Map(), styleValues: {} }, n.set(a.familyName, i));
    const { axes: r, styleValues: s } = i;
    let o = t.get(a.familyName);
    o || (o = { varyingAxes: /* @__PURE__ */ new Set(), varyingStyleValues: { weight: false, width: false, italic: false, slant: false } }, t.set(a.familyName, o));
    const { varyingAxes: l } = o;
    for (const u of a.axes) {
      const c = r.get(u.tag);
      c ? Tn(c, u) || l.add(u.tag) : r.set(u.tag, u);
    }
    for (const u of ["italic", "slant", "weight", "width"]) {
      const c = a.styleValues[u];
      if (!((u === "italic" || u === "slant") && c.type === "single" && c.value === 0)) {
        if (!s[u]) {
          s[u] = c;
          continue;
        }
        Tn(s[u], c) || (o.varyingStyleValues[u] = true, s[u] = c);
      }
    }
  }
  return t;
}, xs = (e) => {
  const t = _s(e), n = /* @__PURE__ */ new Map();
  for (const a of e) {
    const i = t.get(a.familyName);
    n.set(a, Ss(a, i.varyingAxes, i.varyingStyleValues));
  }
  return n;
}, q = (e) => Math.round(e * 1e3) / 1e3, Ss = (e, t, n) => {
  const { weight: a, width: i, italic: r, slant: s } = e.styleValues;
  let l = e.familyName.replace(ms, "").replaceAll(" ", "").replaceAll(" ", "");
  if (e.namedInstance && e.namedInstance.subfamilyName) l += `-${e.namedInstance.subfamilyName}`;
  else {
    if (i.type === "single") {
      const c = Math.round(i.value * 2) / 2;
      c !== 100 && (l += `-${bs.get(c) ?? c}`);
    } else n.width && (l += `-wdth${q(i.value.min)}_${q(i.value.max)}`);
    a.type === "single" ? l += `-${ys.get(q(a.value)) ?? q(a.value)}` : n.weight && (l += `-wght${q(a.value.min)}_${q(a.value.max)}`);
    for (const c of e.axes) t.has(c.tag) && (c.type === "single" ? l += `-${c.tag}${q(c.value)}` : l += `-${c.tag}${q(c.value.min)}_${q(c.value.max)}`);
    let u = "";
    s.type === "variable" ? n.slant && (u = `slnt${q(s.value.min)}_${q(s.value.max)}`) : r.type === "variable" ? n.italic && (u = `ital${q(r.value.min)}_${q(r.value.max)}`) : n.italic || n.slant ? (n.italic && (u += `ital${q(r.value)}`), n.slant && (u += `slnt${q(s.value)}`)) : r.value !== 0 ? u = "Italic" : s.value !== 0 && (u = "Oblique"), u.length > 0 && (l += `-${u}`);
  }
  return l = l.replace(/[\x00-\x1f\x80-\x9f/\\?<>:*|"]/g, "_"), l;
}, Ln = (e, t, n) => {
  const a = new ps();
  t.length > 0 && !t.endsWith("/") && (t += "/");
  for (const { font: i, data: r, filename: s } of e) {
    a.atRule("@font-face"), a.declaration("font-family"), a.string(i.familyName), a.endDeclaration(), a.declaration("font-display"), a.keyword("swap"), a.endDeclaration(), a.declaration("font-style");
    const { width: o, weight: l, italic: u, slant: c } = i.styleValues;
    c.type === "variable" ? (a.keyword("oblique"), a.number(`${-q(c.value.min)}deg`), a.number(`${-q(c.value.max)}deg`)) : u.type === "variable" ? (a.keyword("oblique"), a.number("0deg"), a.number("14deg")) : u.value !== 0 && Math.abs(c.value + 9.4) < 1e-4 ? a.keyword("italic") : c.value !== 0 ? (a.keyword("oblique"), a.number(`${-q(c.value)}deg`)) : a.keyword("normal"), a.endDeclaration(), a.declaration("font-weight"), l.type === "variable" ? (a.number(q(l.value.min)), a.number(q(l.value.max))) : a.number(q(l.value)), a.endDeclaration(), a.declaration("font-stretch"), o.type === "variable" ? (a.number(q(o.value.min)), a.number(q(o.value.max))) : a.number(q(o.value)), a.endDeclaration(), a.declaration("src");
    for (const h of ["ttf", "woff", "woff2"]) h === "ttf" && !n || r[h] && (a.parenthesized("url"), a.string(t + s + "." + h), a.endParenthesized(), a.parenthesized("format"), a.string(h === "ttf" ? "opentype" : h), a.endParenthesized(), a.comma());
    a.spans.pop(), a.spans.pop(), a.endDeclaration(), a.endRule();
  }
  return a;
}, qn = (e) => ({ curMin: e.curMin.value, curMax: e.curMax.value, curSingle: e.curSingle.value, curMultiValue: e.curMultiValue.value, mode: e.mode.value }), ks = (e) => e.type === "single" ? e : { type: "variable", value: qn(e.value) }, zn = (e) => {
  const t = {};
  for (const n of ["weight", "width", "italic", "slant"]) e[n] && (t[n] = ks(e[n]));
  return t;
}, Ai = (e) => {
  const t = (n) => n.map(({ feature: a, include: i }) => ({ tag: a.tag, include: i.value }));
  return { styleSettings: zn(e.styleSettings), axisSettings: e.axisSettings.map(({ tag: n, name: a, range: i }) => ({ tag: n, name: a, range: qn(i) })), includeFeatures: { features: t(e.includeFeatures.features), stylisticSets: t(e.includeFeatures.stylisticSets), characterVariants: t(e.includeFeatures.characterVariants) }, includeCharacters: { includeNamedSubsets: e.includeCharacters.includeNamedSubsets.map(({ name: n, include: a }) => ({ name: n, include: a.value })), includeUnicodeRanges: e.includeCharacters.includeUnicodeRanges.value, includeAllCharacters: e.includeCharacters.includeAllCharacters.value } };
}, pn = (e) => {
  const t = [];
  for (const { font: n, styleSettings: a } of e.fonts) t.push({ fontUid: n.uid, styleSettings: zn(a) });
  return { name: e.name, fonts: t, settings: Ai(e.settings), enableSubsetting: e.enableSubsetting.value };
}, Ci = (e, t) => {
  e.curMin.value = Math.max(t.curMin, e.min), e.curMax.value = Math.min(t.curMax, e.max), e.curSingle.value = Math.max(e.min, Math.min(t.curSingle, e.max)), e.curMultiValue.value = t.curMultiValue, e.mode.value = t.mode;
}, Et = (e, t) => {
  for (const { tag: n, range: a } of t) {
    const i = e.find(({ tag: r }) => r === n);
    i && Ci(i.range, a);
  }
}, Ts = (e, t) => {
  e.type !== "single" && (t.type === "single" ? (e.value.curSingle.value = Math.max(e.value.min, Math.min(t.value, e.value.max)), e.value.mode.value = "single") : Ci(e.value, t.value));
}, De = (e, t) => {
  for (const n of ["weight", "width", "italic", "slant"]) !e[n] || !t[n] || Ts(e[n], t[n]);
}, he = (e, t) => {
  for (const { tag: n, include: a } of t) {
    const i = e.find(({ feature: r }) => r.tag === n);
    !i || Gt(i.feature.tag).required || (i.include.value = a);
  }
}, Fs = (e, t) => {
  for (const { name: n, include: a } of t) {
    const i = e.find(({ name: r }) => r === n);
    i && (i.include.value = a);
  }
}, Fn = (e, t) => {
  Fs(e.includeNamedSubsets, t.includeNamedSubsets), e.includeUnicodeRanges.value = t.includeUnicodeRanges, e.includeAllCharacters.value = t.includeAllCharacters;
}, Ni = (e, t) => {
  De(e.styleSettings, t.styleSettings), Et(e.axisSettings, t.axisSettings), he(e.includeFeatures.features, t.includeFeatures.features), he(e.includeFeatures.stylisticSets, t.includeFeatures.stylisticSets), he(e.includeFeatures.characterVariants, t.includeFeatures.characterVariants), Fn(e.includeCharacters, t.includeCharacters);
}, gn = (e, t) => {
  Ni(e.settings, t.settings);
  for (const { font: n, styleSettings: a } of e.fonts) {
    De(a, t.settings.styleSettings);
    const i = t.fonts.find(({ fontUid: r }) => r === n.uid);
    i && De(a, i.styleSettings);
  }
  e.enableSubsetting.value = t.enableSubsetting;
}, As = (e) => ({ settings: Ai(e.settings), type: "subsetSettingsV1" }), Cs = (e) => ({ settings: zn(e), type: "styleSettingsV1" }), Ns = (e) => ({ settings: e.map(({ tag: t, name: n, range: a }) => ({ tag: t, name: n, range: qn(a) })), type: "axisSettingsV1" }), Is = (e) => ({ settings: { features: e.features.map(({ feature: t, include: n }) => ({ tag: t.tag, include: n.value })), stylisticSets: e.stylisticSets.map(({ feature: t, include: n }) => ({ tag: t.tag, include: n.value })), characterVariants: e.characterVariants.map(({ feature: t, include: n }) => ({ tag: t.tag, include: n.value })) }, type: "featureSettingsV1" }), Ms = (e) => ({ settings: { includeNamedSubsets: e.includeNamedSubsets.map(({ name: t, include: n }) => ({ name: t, include: n.value })), includeUnicodeRanges: e.includeUnicodeRanges.value, includeAllCharacters: e.includeAllCharacters.value }, type: "includeCharactersSettingsV1" }), js = (e, t) => {
  switch (t.type) {
    case "subsetSettingsV1": {
      Ni(e.settings, t.settings);
      break;
    }
    case "styleSettingsV1": {
      De(e.settings.styleSettings, t.settings);
      for (const n of e.fonts) De(n.styleSettings, t.settings);
      break;
    }
    case "axisSettingsV1": {
      Et(e.settings.axisSettings, t.settings);
      break;
    }
    case "featureSettingsV1": {
      he(e.settings.includeFeatures.features, t.settings.features), he(e.settings.includeFeatures.stylisticSets, t.settings.stylisticSets), he(e.settings.includeFeatures.characterVariants, t.settings.characterVariants);
      break;
    }
  }
}, Os = (e, t) => {
  switch (t.type) {
    case "subsetSettingsV1": {
      De(e, t.settings.styleSettings);
      break;
    }
    case "styleSettingsV1": {
      De(e, t.settings);
      break;
    }
  }
}, Es = (e, t) => {
  switch (t.type) {
    case "subsetSettingsV1": {
      Et(e, t.settings.axisSettings);
      break;
    }
    case "axisSettingsV1": {
      Et(e, t.settings);
      break;
    }
  }
}, Rs = (e, t) => {
  switch (t.type) {
    case "subsetSettingsV1": {
      he(e.features, t.settings.includeFeatures.features), he(e.stylisticSets, t.settings.includeFeatures.stylisticSets), he(e.characterVariants, t.settings.includeFeatures.characterVariants);
      break;
    }
    case "featureSettingsV1": {
      he(e.features, t.settings.features), he(e.stylisticSets, t.settings.stylisticSets), he(e.characterVariants, t.settings.characterVariants);
      break;
    }
  }
}, Us = (e, t) => {
  switch (t.type) {
    case "subsetSettingsV1": {
      Fn(e, t.settings.includeCharacters);
      break;
    }
    case "includeCharactersSettingsV1": {
      Fn(e, t.settings);
      break;
    }
  }
}, Sa = /* @__PURE__ */ new Map(), Gt = (e) => {
  const t = Sa.get(e);
  if (t) return t;
  const n = Object.prototype.hasOwnProperty.call(_a, e) ? _a[e] : null;
  let a;
  switch (e.slice(0, 2)) {
    case "ss": {
      a = `Stylistic Set ${Number(e.slice(2))}`;
      break;
    }
    case "cv": {
      a = `Character Variant ${Number(e.slice(2))}`;
      break;
    }
    default:
      a = (n == null ? void 0 : n.title) ?? null;
  }
  const i = { name: a, description: (n == null ? void 0 : n.description) ?? "", required: (n == null ? void 0 : n.state) === "required" };
  return Sa.set(e, i), i;
};
let gt = 0;
const wt = (e, t, n) => {
  const a = gt++;
  return e.postMessage({ type: "update-fonts", message: { loadFonts: t, unloadFonts: n }, id: a }, t.map((i) => i.buffer)), new Promise((i, r) => {
    const s = new AbortController();
    e.addEventListener("message", (o) => {
      const l = o.data;
      l.originId === a && (l.type === "updated-fonts" ? (s.abort(), i(l.message.fonts)) : l.type === "error" && (s.abort(), r(l.message)));
    }, { signal: s.signal });
  });
}, Ps = (e, t, n) => {
  const a = gt++;
  return e.postMessage({ type: "subset-font", message: { font: t, settings: n }, id: a }), new Promise((i, r) => {
    const s = new AbortController();
    e.addEventListener("message", (o) => {
      const l = o.data;
      l.originId === a && (l.type === "subsetted-font" ? (s.abort(), i(l.message)) : l.type === "error" && (s.abort(), r(l.message)));
    }, { signal: s.signal });
  });
}, Ds = (e, t) => {
  const n = gt++;
  return e.postMessage({ type: "get-font-data", message: t, id: n }), new Promise((a, i) => {
    const r = new AbortController();
    e.addEventListener("message", (s) => {
      const o = s.data;
      o.originId === n && (o.type === "got-font-data" ? (r.abort(), a(o.message)) : o.type === "error" && (r.abort(), i(o.message)));
    }, { signal: r.signal });
  });
}, Bs = (e, t, n, a) => {
  const i = gt++;
  return e.postMessage({ type: "compress-font", message: { data: t, algorithm: n, quality: a }, id: i }), new Promise((r, s) => {
    const o = new AbortController();
    e.addEventListener("message", (l) => {
      const u = l.data;
      u.originId === i && (u.type === "compressed-font" ? (o.abort(), r(u.message)) : u.type === "error" && (o.abort(), s(u.message)));
    }, { signal: o.signal });
  });
}, Ls = (e, t, n) => {
  const a = gt++;
  return e.postMessage({ type: "decompress-font", message: { data: t, algorithm: n }, id: a }, [t.buffer]), new Promise((i, r) => {
    const s = new AbortController();
    e.addEventListener("message", (o) => {
      const l = o.data;
      l.originId === a && (l.type === "decompressed-font" ? (s.abort(), i(l.message)) : l.type === "error" && (s.abort(), r(l.message)));
    }, { signal: s.signal });
  });
}, qs = "/assets/woff1-BK2PTp19.wasm", zs = "/assets/woff2-CV_wJoR8.wasm", Ii = (async () => {
  const [e, t] = await Promise.all([qs, zs].map((a) => fetch(a).then((i) => i.blob()).then((i) => URL.createObjectURL(i)))), n = [];
  for (let a = 0; a < navigator.hardwareConcurrency; a++) {
    const i = new Worker(new URL("/assets/compression-worker-Dss6AJRm.js", import.meta.url), { type: "module" });
    i.postMessage({ type: "init-woff-wasm", message: { woff1: e, woff2: t }, id: -1 }), n.push(i);
  }
  return n;
})(), Rt = [], $n = (e) => {
  for (; e.length > 0 && Rt.length > 0; ) {
    const t = Rt.pop(), n = e.pop(), a = () => {
      e.push(n), queueMicrotask(() => {
        $n(e);
      });
    };
    t.fn(n).then((i) => {
      a(), t.resolve(i);
    }, (i) => {
      a(), t.reject(i);
    });
  }
}, ka = async (e, t, n) => {
  const a = await Ii;
  let i, r;
  const s = new Promise((o, l) => {
    i = o, r = l;
  });
  return Rt.push({ resolve: i, reject: r, fn: async (o) => await Bs(o, e, t, n) }), $n(a), s;
}, Ta = async (e, t) => {
  const n = await Ii;
  let a, i;
  const r = new Promise((s, o) => {
    a = s, i = o;
  });
  return Rt.push({ resolve: a, reject: i, fn: async (s) => await Ls(s, e, t) }), $n(n), r;
}, He = new Worker(new URL("/assets/font-worker-D3k6ecSo.js", import.meta.url), { type: "module" });
class $s {
  constructor() {
    this.fonts = U([]), this.fontsBeingLoaded = U(0), this._exportedFonts = U({ state: "not_loaded" }), this.exportedFonts = jt(() => this._exportedFonts.value), this.exportSettings = { formats: { ttf: U(true), woff: U(false), woff2: U(true) }, woffCompression: U(1), woff2Compression: U(11), includeTTFinCSS: U(true) }, this.cssPathPrefix = U("");
  }
  async removeFontFamily(t) {
    const n = [];
    for (const i of t.fonts) n.push(i.font);
    const a = wt(He, [], n);
    this.fonts.value = this.fonts.value.filter((i) => i !== t), await a;
  }
  async removeFont(t) {
    const n = this.fonts.peek().findIndex((o) => o.fonts.some((l) => l.font.id === t.id));
    if (n === -1) return;
    const a = this.fonts.peek()[n], i = [];
    for (const o of a.fonts) o.font.id !== t.id && i.push(o.font);
    if (i.length === 0) return await this.removeFontFamily(a);
    const r = this.fonts.peek().slice(0), s = xa(i);
    for (const o of s) gn(o, pn(a));
    return r.splice(n, 1, ...s), this.fonts.value = r, await wt(He, [], [t]);
  }
  async addFonts(t) {
    this.fontsBeingLoaded.value += t.length;
    try {
      const n = await Promise.all(t.map((c) => c.arrayBuffer().then((h) => new Uint8Array(h)))), a = [];
      for (let c = 0; c < n.length; c++) {
        if (n[c].length < 4) continue;
        const h = n[c][3] | n[c][2] << 8 | n[c][1] << 16 | n[c][0] << 24;
        h === 2001684038 ? a.push(Ta(n[c], "woff").then((p) => {
          n[c] = p;
        })) : h === 2001684018 && a.push(Ta(n[c], "woff2").then((p) => {
          n[c] = p;
        }));
      }
      a.length > 0 && await Promise.all(a);
      const i = await wt(He, n, []), r = this.fonts.peek().flatMap((c) => c.fonts.map((h) => h.font)), s = new Set(r.map((c) => c.uid)), o = [];
      for (const c of i) s.has(c.uid) ? o.push(c) : r.push(c);
      const l = /* @__PURE__ */ new Map();
      for (const c of this.fonts.peek()) l.set(c.name, pn(c));
      const u = xa(r);
      for (const c of u) {
        const h = l.get(c.name);
        h && gn(c, h);
      }
      this.fonts.value = u, o.length > 0 && await wt(He, [], o);
    } finally {
      this.fontsBeingLoaded.value -= t.length;
    }
  }
  exportFonts() {
    const t = { ttf: this.exportSettings.formats.ttf.peek(), woff: this.exportSettings.formats.woff.peek(), woff2: this.exportSettings.formats.woff2.peek() }, n = this.fonts.peek(), a = [], i = ws(n);
    for (const p of n) for (const m of p.fonts) {
      const v = i.get(m.font.id);
      for (const d of v) a.push({ font: m.font, settings: d });
    }
    const r = 1, s = 2 * this.exportSettings.woffCompression.value / Math.min(navigator.hardwareConcurrency, a.length), o = 32 / Math.min(navigator.hardwareConcurrency, a.length);
    let l = 0;
    for (const p of a) p.settings && (l += r);
    t.woff && (l += s * a.length), t.woff2 && (l += o * a.length);
    let u = 0;
    this._exportedFonts.value = { state: "loading", progress: 0 };
    let c = false;
    const h = a.map(async ({ font: p, settings: m }) => {
      let v;
      if (m) v = await Ps(He, p.id, m);
      else {
        const g = await Ds(He, p.id);
        v = { familyName: p.familyName, subfamilyName: p.subfamilyName, data: g, styleValues: p.styleValues, axes: p.axes.map((b) => ({ type: "variable", tag: b.tag, name: b.name, value: { min: b.min, max: b.max, defaultValue: b.defaultValue } })), namedInstance: null };
      }
      if (c) throw new Error("Aborted");
      const d = { ttf: t.ttf ? v.data : null, woff: null, woff2: null };
      u += r, this._exportedFonts.value = { state: "loading", progress: u / l };
      const y = [];
      return t.woff && y.push(ka(v.data, "woff", this.exportSettings.woffCompression.value).then((g) => {
        if (c) throw new Error("Aborted");
        u += s, this._exportedFonts.value = { state: "loading", progress: u / l }, d.woff = g;
      })), t.woff2 && y.push(ka(v.data, "woff2", this.exportSettings.woff2Compression.value).then((g) => {
        if (c) throw new Error("Aborted");
        u += o, this._exportedFonts.value = { state: "loading", progress: u / l }, d.woff2 = g;
      })), y.length > 0 && await Promise.all(y), { font: v, filename: "", data: d };
    });
    return Promise.all(h).then((p) => {
      const m = xs(p.map((v) => v.font));
      for (const v of p) {
        const d = m.get(v.font);
        v.filename = d;
      }
      this._exportedFonts.value = { state: "loaded", exportedFonts: p, exportedFormats: t };
    }, (p) => {
      throw c = true, console.error(p), this._exportedFonts.value = { state: "error", error: p }, p;
    });
  }
  saveAllSettings() {
    return { familySettings: this.fonts.value.map((n) => pn(n)), cssPathPrefix: this.cssPathPrefix.value, exportSettings: { formats: { ttf: this.exportSettings.formats.ttf.value, woff: this.exportSettings.formats.woff.value, woff2: this.exportSettings.formats.woff2.value }, woffCompression: this.exportSettings.woffCompression.value, woff2Compression: this.exportSettings.woff2Compression.value, includeTTFinCSS: this.exportSettings.includeTTFinCSS.value }, type: "AllSettingsV1" };
  }
  loadAllSettings(t) {
    var _a2, _b, _c, _d, _e2, _f;
    if (typeof t != "object" || t === null || !("type" in t) || t.type !== "AllSettingsV1") return;
    const n = t;
    if (n.familySettings) {
      const a = /* @__PURE__ */ new Map();
      for (const i of n.familySettings) a.set(i.name, i);
      for (const i of this.fonts.value) {
        const r = a.get(i.name);
        r && gn(i, r);
      }
    }
    n.cssPathPrefix && (this.cssPathPrefix.value = n.cssPathPrefix), ((_a2 = n.exportSettings) == null ? void 0 : _a2.formats.ttf) && (this.exportSettings.formats.ttf.value = n.exportSettings.formats.ttf), ((_b = n.exportSettings) == null ? void 0 : _b.formats.woff) && (this.exportSettings.formats.woff.value = n.exportSettings.formats.woff), ((_c = n.exportSettings) == null ? void 0 : _c.formats.woff2) && (this.exportSettings.formats.woff2.value = n.exportSettings.formats.woff2), ((_d = n.exportSettings) == null ? void 0 : _d.woffCompression) && (this.exportSettings.woffCompression.value = n.exportSettings.woffCompression), ((_e2 = n.exportSettings) == null ? void 0 : _e2.woff2Compression) && (this.exportSettings.woff2Compression.value = n.exportSettings.woff2Compression), ((_f = n.exportSettings) == null ? void 0 : _f.includeTTFinCSS) && (this.exportSettings.includeTTFinCSS.value = n.exportSettings.includeTTFinCSS);
  }
}
const Mi = Pn(void 0), Re = () => {
  const e = dt(Mi);
  if (!e) throw new Error("No AppState provided");
  return e;
}, Hs = () => new $s(), Vs = "_spinbox-wrapper_12yho_248", Ws = "_spinbox-display_12yho_275", Js = "_spinbox-field_12yho_275", Ks = "_spinbox-buttons_12yho_298", Xs = "_spinbox-button_12yho_298", Gs = "_spinbox-button-divider_12yho_319", Ys = "_spinbox-up_12yho_324", Zs = "_spinbox-down_12yho_324", Qs = "_icon-button_12yho_341", eo = "_toggle-icon_12yho_354", to = "_toggledOn_12yho_354", no = "_button-contents_12yho_358", ao = "_checkbox-toggle_12yho_365", io = "_disabled_12yho_369", ro = "_button_12yho_358", X = { spinboxWrapper: Vs, spinboxDisplay: Ws, spinboxField: Js, spinboxButtons: Ks, spinboxButton: Xs, spinboxButtonDivider: Gs, spinboxUp: Ys, spinboxDown: Zs, iconButton: Qs, toggleIcon: eo, toggledOn: to, buttonContents: no, checkboxToggle: ao, disabled: io, button: ro }, so = "_icon_1uezd_51", oo = "_motif-monochrome_1uezd_58", lo = "_motif-primary_1uezd_61", uo = "_motif-success_1uezd_64", co = "_motif-warning_1uezd_67", ho = "_motif-error_1uezd_70", fo = "_clickable_1uezd_73", po = "_disabled_1uezd_84", go = "_icon-button_1uezd_92", mo = "_no-pointer_1uezd_136", yo = "_arrow-right_1uezd_140", bo = "_arrow-down_1uezd_145", vo = "_check_1uezd_155", wo = "_close_1uezd_159", _o = "_copy_1uezd_163", xo = "_download_1uezd_167", So = "_error_1uezd_171", ko = "_gear_1uezd_175", To = "_github_1uezd_179", Fo = "_paste_1uezd_183", Ao = "_pin_1uezd_187", Co = "_range_1uezd_191", No = "_reset_1uezd_195", Io = "_stack_1uezd_199", Mo = "_upload_1uezd_203", jo = "_warning_1uezd_207", ae = { icon: so, "motif-monochrome": "_motif-monochrome_1uezd_58", motifMonochrome: oo, "motif-primary": "_motif-primary_1uezd_61", motifPrimary: lo, "motif-success": "_motif-success_1uezd_64", motifSuccess: uo, "motif-warning": "_motif-warning_1uezd_67", motifWarning: co, "motif-error": "_motif-error_1uezd_70", motifError: ho, clickable: fo, disabled: po, "icon-button": "_icon-button_1uezd_92", iconButton: go, "no-pointer": "_no-pointer_1uezd_136", noPointer: mo, "arrow-right": "_arrow-right_1uezd_140", arrowRight: yo, "arrow-down": "_arrow-down_1uezd_145", arrowDown: bo, check: vo, close: wo, copy: _o, download: xo, error: So, gear: ko, github: To, paste: Fo, pin: Ao, range: Co, reset: No, stack: Io, upload: Mo, warning: jo };
var H = ((e) => (e[e.PRIMARY = 0] = "PRIMARY", e[e.SUCCESS = 1] = "SUCCESS", e[e.WARNING = 2] = "WARNING", e[e.ERROR = 3] = "ERROR", e[e.MONOCHROME = 4] = "MONOCHROME", e))(H || {});
const fe = ({ type: e, title: t, size: n, motif: a, className: i, noPointer: r, clickableStyle: s }) => {
  const o = typeof n == "string" ? n : typeof n == "number" ? `${n}px` : void 0, l = o ? { width: o, height: o } : void 0;
  return f("div", { className: Z(ae.icon, ae[e], { [ae.motifPrimary]: a === H.PRIMARY, [ae.motifSuccess]: a === H.SUCCESS, [ae.motifWarning]: a === H.WARNING, [ae.motifError]: a === H.ERROR, [ae.motifMonochrome]: a === H.MONOCHROME, [ae.noPointer]: r, [ae.clickable]: s }, i), style: l, title: t ?? void 0 });
}, ve = ({ type: e, title: t, size: n, onClick: a, disabled: i, motif: r, className: s }) => f("button", { className: Z(ae.iconButton, { [ae.disabled]: i, [ae.motifPrimary]: r === H.PRIMARY, [ae.motifSuccess]: r === H.SUCCESS, [ae.motifWarning]: r === H.WARNING, [ae.motifError]: r === H.ERROR, [ae.motifMonochrome]: r === H.MONOCHROME }, s), onClick: i ? void 0 : a, title: t, disabled: i, tabIndex: 0, children: f(fe, { type: e, title: null, size: n, motif: r, noPointer: true }) }), lt = ({ value: e, min: t, max: n, step: a = 1, smartAim: i = 0, className: r }) => {
  const s = M((T) => {
    const x = Number(T.target.value);
    e.value = x;
  }, [e]), o = M((T) => {
    T.preventDefault();
  }, []), l = M(() => {
    e.value = Math.min(e.value + (a === "any" ? 1 : a), n);
  }, [e, a]), u = M(() => {
    e.value = Math.max(e.value - (a === "any" ? 1 : a), t);
  }, [e, a]), c = ui(), h = Ee(false), p = ee(null);
  It(() => () => {
    p.current && (window.removeEventListener("pointermove", p.current.move), window.removeEventListener("pointerup", p.current.up));
  }, []);
  const m = ee({ bottom: 0, top: 0 }), v = ee(0), d = ee(false), y = M((T) => {
    const F = T.currentTarget.getBoundingClientRect();
    m.current = { bottom: F.bottom, top: F.top }, v.current = e.value;
    const w = (C) => {
      var _a2;
      let I = 0;
      if (C.clientY < m.current.top ? I = C.clientY - m.current.top : C.clientY > m.current.bottom && (I = C.clientY - m.current.bottom), d.current = I !== 0, !d.current) return;
      (_a2 = document.getSelection()) == null ? void 0 : _a2.empty();
      const j = I * (n - t) / 200, V = v.current - j, E = Math.max(t, Math.min(V, n));
      let z = a === "any" ? E : Math.round(E / a) * a;
      if (i > 0) {
        const $ = Math.round(V / i) * i;
        Math.abs($ - V) < i / 4 && (z = Math.max(t, Math.min($, n)));
      }
      e.value = z;
    }, k = () => {
      window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", k);
    };
    p.current = { move: w, up: k }, window.addEventListener("pointermove", w), window.addEventListener("pointerup", k);
  }, []), g = M(() => {
    h.value = true;
  }, [h]), b = M(() => {
    h.value = false, e.value = Math.max(t, Math.min(e.value, n));
  }, [h, e, t, n]), S = M((T) => {
    T == null ? void 0 : T.focus();
  }, []), _ = Number(e.value.toFixed(12)).toString();
  return f("div", { className: Z(X.spinboxWrapper, r), children: [h.value ? f("input", { className: X.spinboxField, type: "number", min: t, max: n, step: a, value: Number(e.value.toFixed(12)), onInput: s, id: c, onBlur: b, ref: S }) : f("div", { className: Z(X.spinboxDisplay, "tabular-nums"), onInput: s, onDragCapture: o, id: c, onPointerDown: y, tabIndex: 0, onFocus: g, "aria-valuemin": t, "aria-valuemax": n, "aria-valuenow": e.value, "aria-valuetext": _, role: "spinbutton", children: _ }), f("div", { className: X.spinboxButtons, children: [f("div", { onClick: l, className: X.spinboxButton, role: "button", "aria-controls": c, "aria-label": "Increment", children: f("div", { className: X.spinboxUp }) }), f("div", { className: X.spinboxButtonDivider }), f("div", { onClick: u, className: X.spinboxButton, role: "button", "aria-controls": c, "aria-label": "Decrement", children: f("div", { className: X.spinboxDown }) })] })] });
}, Oo = ({ type: e, title: t, toggled: n, innerRef: a }) => {
  const i = M(() => {
    n.value = !n.value;
  }, [n]);
  return f("button", { className: Z(X.iconButton, X.toggleIcon, { [X.toggledOn]: n.value }), onClick: i, role: "checkbox", "aria-checked": n.value, title: t, ref: a, tabindex: 0, children: f(fe, { type: e, title: t }) });
}, mn = ({ type: e, title: t, currentValue: n, value: a }) => {
  const i = M(() => {
    n.value = a;
  }, [n]);
  return f("button", { className: Z(X.iconButton, X.toggleIcon, { [X.toggledOn]: n.value === a }), onClick: i, role: "radio", "aria-checked": n.value === a, title: t, tabindex: 0, children: f(fe, { type: e, title: t }) });
}, Ne = ({ label: e, title: t, checked: n, disabled: a, indeterminate: i }) => {
  const r = M((o) => {
    o.preventDefault(), n.value = o.currentTarget.checked;
  }, [n]), s = M((o) => {
    o.preventDefault(), o.stopPropagation();
  }, []);
  return f("label", { className: Z(X.checkboxToggle, { [X.disabled]: a }), title: t ?? void 0, "aria-disabled": a, children: [f("input", { type: "checkbox", checked: n.value, onInput: r, disabled: a, indeterminate: i }), f("span", { className: X.checkboxLabel, onMouseDown: s, children: e })] });
}, Hn = ({ value: e, ...t }) => {
  const n = M((a) => {
    e.value = a.currentTarget.value;
  }, [e]);
  return f("input", { type: "text", ...t, value: e, onInput: n });
}, it = ({ children: e, className: t, ...n }) => f("button", { ...n, className: Z(X.button, t), children: f("span", { className: X.buttonContents, children: e }) }), Fa = (e, t, n = false) => {
  let a, i = 0;
  const r = (...s) => {
    typeof a == "number" && window.clearTimeout(a);
    const o = Date.now(), l = () => {
      e(...s), i = o;
    };
    o - i >= t && !n ? l() : a = window.setTimeout(l, t);
  };
  return r.cancel = () => {
    typeof a == "number" && window.clearTimeout(a);
  }, r;
}, Vn = (e, t, n = false) => {
  const a = _e(() => U(e.peek()), [e]), i = ee();
  return It(() => {
    const r = Fa((s) => {
      a.value = s;
    }, t, n);
    return i.current = r, () => {
      r.cancel();
    };
  }, [e, t, n, Fa]), It(() => {
    i.current && a.peek() !== e.value && i.current(e.value);
  }, [e, e.value]), a;
};
let ji = "";
const Oi = (e) => (ji = e, navigator.clipboard.writeText(e)), Eo = async () => {
  try {
    return await navigator.clipboard.readText();
  } catch (e) {
    if (e instanceof Error && e.name === "NotAllowedError") return ji;
    throw e;
  }
}, Ro = "_toast-container_q9o7p_51", Uo = "_toast-wrapper_q9o7p_67", Po = "_toast_q9o7p_51", Do = "_success_q9o7p_94", Bo = "_warning_q9o7p_99", Lo = "_error_q9o7p_105", qo = "_toast-row_q9o7p_111", zo = "_toast-icon_q9o7p_119", $o = "_toast-contents_q9o7p_123", Ho = "_separate-contents_q9o7p_127", Vo = "_toast-title_q9o7p_131", Wo = "_plain_q9o7p_134", Jo = "_timeout-bar_q9o7p_138", Ko = "_toast-placeholder_q9o7p_153", Xo = "_error-message_q9o7p_158", Go = "_error-stack_q9o7p_163", Y = { toastContainer: Ro, toastWrapper: Uo, toast: Po, success: Do, warning: Bo, error: Lo, toastRow: qo, toastIcon: zo, toastContents: $o, separateContents: Ho, toastTitle: Vo, plain: Wo, timeoutBar: Jo, toastPlaceholder: Ko, errorMessage: Xo, errorStack: Go };
class Ut {
  constructor(t) {
    this.inner = t;
  }
  static create(t) {
    return new Ut(t);
  }
  update(t) {
    const n = t(this.inner);
    return typeof n > "u" ? this : new Ut(n);
  }
  get value() {
    return this.inner;
  }
}
const Wn = Pn(void 0), Ei = ({ children: e }) => {
  const t = dt(Wn);
  if (!t) return null;
  const n = ee(e);
  return n.current !== e && (n.current = e, t.generation.value++), Jt(() => (t.children.push(n), t.generation.value++, () => {
    const a = t.children.indexOf(n);
    a !== -1 && (t.children.splice(a, 1), t.generation.value++);
  }), []), null;
}, Yo = () => {
  const e = dt(Wn);
  return e ? (e.generation.value, f(ie, { children: e.children.map((t) => t.current) })) : null;
}, Zo = ({ children: e }) => {
  const t = ee();
  return t.current || (t.current = { children: [], generation: U(0) }), f(Wn.Provider, { value: t.current, children: [e, f(Yo, {})] });
}, Jn = Pn(void 0), Qo = ({ children: e, toastRef: t, closeToast: n, showCloseButton: a, timeout: i, motif: r = H.PRIMARY, title: s }) => {
  let o, l;
  switch (r) {
    case H.SUCCESS:
      o = "check", l = "Success";
      break;
    case H.WARNING:
      o = "warning", l = "Warning";
      break;
    case H.ERROR:
      o = "error", l = "Error";
      break;
  }
  return Jt(() => {
    if (typeof i == "number") {
      const u = setTimeout(n, i);
      return () => clearTimeout(u);
    }
  }, []), f("div", { className: Y.toastWrapper, ref: t, children: f("div", { className: Z(Y.toast, { [Y.primary]: r === H.PRIMARY, [Y.success]: r === H.SUCCESS, [Y.warning]: r === H.WARNING, [Y.error]: r === H.ERROR }), children: [f("div", { className: Y.toastRow, children: [r === H.PRIMARY ? null : f(fe, { type: o, title: l, className: Y.toastIcon }), typeof s > "u" || s === null ? f("div", { className: Y.toastContents, children: e }) : f("div", { className: Z(Y.toastTitle, typeof s != "object" && Y.plain), children: s }), a && f(ve, { type: "close", title: "Close", onClick: n, className: Y.toastIcon })] }), typeof s > "u" || s === "null" ? null : f("div", { className: Z(Y.toastContents, Y.separateContents), children: e }), typeof i == "number" && f("div", { className: Y.timeoutBar, style: { animationDuration: `${i}ms` } })] }) });
}, el = () => {
  const e = dt(Jn);
  if (!e) throw new Error("ToastDisplay must be placed under a ToastProvider");
  const t = _i(() => e.toasts.value.value.map((n) => n.inner));
  return f(Ei, { children: f("div", { className: Y.toastContainer, children: t }) });
}, tl = () => {
  const e = dt(Jn);
  if (!e) throw new Error("useAddToast requires a ToastProvider");
  return M((t) => {
    e.addToast(t);
  }, [e]);
}, Yt = () => {
  const e = tl();
  return M((t, n) => {
    e({ motif: H.ERROR, title: t, contents: f(ie, { children: [f("div", { className: Y.errorMessage, children: String(n) }), typeof n == "object" && n !== null && "stack" in n ? f("div", { className: Y.errorStack, children: n.stack }) : null] }) });
  }, []);
}, nl = ({ height: e, onTransitionEnd: t }) => {
  const [n, a] = li(`${e}px`), i = ee(null);
  return Jt(() => {
    var _a2;
    (_a2 = i.current) == null ? void 0 : _a2.scrollTop, a("0");
  }, []), f("div", { className: Y.toastPlaceholder, style: { minHeight: n }, onTransitionEnd: t, ref: i });
}, al = ({ children: e }) => {
  const t = Ee(Ut.create([])), n = ee(void 0), a = ee(0), i = M((r) => {
    let s = null;
    const o = a.current++, l = (v) => {
      s = v;
    }, u = U(0), c = () => {
      t.value = t.value.update((v) => {
        var _a2;
        const d = v.indexOf(m);
        if (d === -1) return;
        const y = ((_a2 = s == null ? void 0 : s.getBoundingClientRect()) == null ? void 0 : _a2.height) ?? 0, b = f(nl, { height: y, onTransitionEnd: () => {
          t.value = t.value.update((S) => {
            const _ = S.indexOf(m);
            if (_ !== -1) return S.splice(_, 1), S;
          });
        } }, o);
        return v[d].inner = b, v;
      });
    }, h = r.title, p = r.contents, m = { inner: f(Qo, { toastRef: l, motif: r.motif, showCloseButton: r.showCloseButton ?? true, timeout: r.timeout, closeToast: c, title: typeof h == "function" ? f(h, { closeToast: c }) : h, children: typeof p == "function" ? f(p, { closeToast: c }) : p }, o), transformOffset: u };
    t.value = t.value.update((v) => (v.push(m), v));
  }, []);
  return n.current || (n.current = { toasts: t, addToast: i }), f(Jn.Provider, { value: n.current, children: [f(el, {}), e] });
}, Pt = ({ progress: e, size: t = 100, className: n }) => {
  const a = Math.min(t / 10, 10), i = (t - a) * 0.5, r = 2 * Math.PI * i;
  let s, o;
  return typeof e == "number" ? (e = Math.max(0, Math.min(1, e)), s = r, o = r - e * r) : (s = r / 2, o = 0), f("svg", { xmlns: "http://www.w3.org/2000/svg", className: n, width: t, height: t, viewBox: `0 0 ${t} ${t}`, children: [typeof e == "number" && t >= 64 && f("text", { x: "50%", y: "50%", "text-anchor": "middle", dy: ".3em", "font-size": `${t * 0.2}px`, "font-weight": 600, fill: "currentColor", className: "tabular-nums", children: Math.round(e * 100).toString().padStart(2, "0") + "%" }), f("circle", { cx: "50%", cy: "50%", r: i, "stroke-width": a, stroke: "currentColor", fill: "none", "stroke-dasharray": s, "stroke-dashoffset": o, children: typeof e != "number" && f(ie, { children: f("animate", { attributeName: "stroke-dashoffset", from: r, to: "0", dur: "1.5s", repeatCount: "indefinite" }) }) })] });
}, Ri = async (e) => {
  const t = document.createElement("input");
  return t.type = "file", e.accept && (t.accept = e.accept), e.multiple && (t.multiple = true), new Promise((n) => {
    t.onchange = () => {
      n(t.files);
    }, t.oncancel = () => {
      n(null);
    }, t.click();
  });
}, Ui = () => Ri({ accept: ".ttf,.otf,.ttc,.otc,.woff,.woff2", multiple: true }), Aa = [" bytes", "KB", "MB", "GB"], Ca = 1e3, Ft = (e) => {
  let t = 0, n = e;
  for (; n > Ca && t < Aa.length; ) n /= Ca, t++;
  return `${t < 2 ? n.toFixed(0) : n.toFixed(2)} ${Aa[t]}`;
}, il = (e) => {
  const t = Ee(e);
  return t.peek() !== e && (t.value = e), t;
}, rl = ({ axis: e }) => {
  const t = e.max >= 100 ? 1 : 0.25, n = e.max >= 200 ? 25 : e.max >= 50 ? 12.5 : 0, a = M(() => {
    e.curSingle.value = e.defaultValue;
  }, [e.curSingle, e.defaultValue]);
  let i;
  switch (e.mode.value) {
    case "single": {
      i = f(ie, { children: [f(lt, { min: e.min, max: e.max, value: e.curSingle, step: t, smartAim: n }), f(ve, { type: "reset", title: "Reset to default value", onClick: a, disabled: e.curSingle.value === e.defaultValue })] });
      break;
    }
    case "range": {
      i = f("div", { className: N.spinboxRange, children: [f(lt, { min: e.min, max: e.max, value: e.curMin, step: t, smartAim: n }), f("span", { className: N.label, children: "to" }), f(lt, { min: e.min, max: e.max, value: e.curMax, step: t, smartAim: n })] });
      break;
    }
    case "multiple": {
      i = f(ll, { ranges: e.curMultiValue });
      break;
    }
  }
  return f("div", { className: N.axisSetting, children: [f("div", { className: N.axisSettingModes, role: "radiogroup", "aria-label": "Axis modes", children: [f(mn, { type: "range", title: "Limit range of values", currentValue: e.mode, value: "range" }), f(mn, { type: "pin", title: "Pin to single value", currentValue: e.mode, value: "single" }), f(mn, { type: "stack", title: "Instance into multiple font files", currentValue: e.mode, value: "multiple" })] }), i] });
}, ke = ({ styleSetting: e, name: t, tag: n }) => f("div", { className: N.styleSetting, children: [f("div", { className: N.styleSettingName, title: n, children: t }), e.type === "single" ? f("span", { className: N.staticSetting, children: (Math.round(e.value * 1e3) / 1e3).toString() }) : f(rl, { axis: e.value })] }), sl = ({ font: e, styleSettings: t, enableSubsetting: n }) => {
  const a = Re(), i = Yt(), r = M(() => {
    a.removeFont(e).catch((o) => {
      i("Failed to remove font", o);
    });
  }, [e]), s = t.weight && t.weight.type !== "single" || t.width && t.width.type !== "single" || t.italic && t.italic.type !== "single" || t.slant && t.slant.type !== "single";
  return f("div", { className: N.singleFontSettings, children: [f("div", { className: N.singleFontHeader, children: [f("div", { className: N.singleFontName, children: [f("span", { className: N.singleFontFamily, children: [e.familyName, " "] }), f("span", { className: N.singleFontSubfamily, children: [e.subfamilyName, " "] }), f("span", { className: N.singleFontFileSize, children: Ft(e.fileSize) })] }), f(ve, { onClick: r, type: "close", title: "Remove this font", className: N.removeFont })] }), n && (t.weight || t.width || t.italic || t.slant) ? f("div", { className: Z(N.singleFontSettingsBody, s && N.settingsGrid, !s && N.settingsList), children: [t.weight ? f(ke, { styleSetting: t.weight, name: "Weight" }) : null, t.width ? f(ke, { styleSetting: t.width, name: "Width" }) : null, t.italic ? f(ke, { styleSetting: t.italic, name: "Italic" }) : null, t.slant ? f(ke, { styleSetting: t.slant, name: "Slant" }) : null] }) : null] });
}, ol = ({ ranges: e, disabled: t }) => {
  const n = Vn(e, 500, true), a = _e(() => ki(n.value) !== null, [n, n.value]);
  return f(Hn, { value: e, placeholder: 'Enter Unicode code points or ranges to include (e.g. "U+0020", "U+0025-U+00FF", "U+0025-00FF, U+0020, U+FFFD")', className: Z(N.unicodeRangeTextbox, { [N.invalid]: !a }), disabled: t });
}, ll = ({ ranges: e, disabled: t }) => {
  const n = Vn(e, 500, true), a = _e(() => Ti(n.value) !== null, [n, n.value]);
  return f(Hn, { value: e, placeholder: "400, 500, 600-700", className: Z(N.axisRangeTextbox, { [N.invalid]: !a }), disabled: t });
}, yn = ({ settings: e, name: t, mapping: n, disabled: a }) => {
  const i = il(e), r = _i(() => i.value.reduce((o, l) => o + (n(l).checked.value ? 1 : 0), 0)), s = M(() => {
    const o = r.value === e.length;
    hi(() => {
      for (const l of e) n(l).checked.value = !o;
    });
  }, [e, r]);
  return f("div", { className: Z(N.settingsSubSection, N.checkboxSection, { [N.disabled]: a }), children: [f("header", { children: f("label", { children: [f("input", { type: "checkbox", checked: r.value === e.length, indeterminate: r.value > 0 && r.value < e.length, onInput: s, disabled: a }), " ", t] }) }), f("div", { className: N.checkboxes, children: e.map((o) => {
    const { label: l, checked: u, title: c } = n(o);
    return f(Ne, { label: l, checked: u, title: c, disabled: a });
  }) })] });
}, Pi = (e) => e.label ?? Gt(e.tag).name ?? e.tag, Na = (e) => ({ label: Pi(e.feature), checked: e.include, title: e.feature.tag }), ul = (e) => ({ label: e.name, checked: e.include }), Di = ({ settings: e, copyFunction: t, pasteFunction: n }) => {
  const a = M(() => {
    Oi(JSON.stringify(t(e)));
  }, [e]), i = M(() => {
    Eo().then((r) => {
      try {
        const s = JSON.parse(r);
        typeof s == "object" && n(e, s);
      } catch (s) {
        console.error("Failed to paste settings:", s);
      }
    });
  }, [e]);
  return f("div", { className: N.copyPasteButtons, children: [f(ve, { onClick: a, type: "copy", title: "Copy settings to clipboard" }), f(ve, { onClick: i, type: "paste", title: "Paste settings from clipboard" })] });
}, at = ({ title: e, children: t, copyPasteFns: n, startCollapsed: a = false }) => {
  const i = Ee(a), r = ui(), s = M(() => {
    i.value = !i.value;
  }, [i]);
  return f("section", { className: N.settingsSection, children: [f("header", { children: [f("button", { className: N.settingsSectionTitle, "aria-expanded": i.value ? "false" : "true", "aria-controls": r, onClick: s, children: [f(fe, { type: i.value ? "arrow-right" : "arrow-down", title: null, motif: H.MONOCHROME }), f("span", { className: N.settingsSectionTitleText, children: e })] }), n && f(Di, { settings: n.settings, copyFunction: n.copy, pasteFunction: n.paste })] }), f("div", { className: N.settingsSectionBody, id: r, hidden: i.value, children: t })] });
}, cl = ({ familySettings: e }) => {
  const t = Re(), { name: n, fonts: a, settings: i } = e, r = Yt(), s = M(() => {
    t.removeFontFamily(e).catch((o) => {
      r("Failed to remove font family", o);
    });
  }, [e]);
  return f("div", { className: N.familySettings, "aria-label": `Settings for ${n} font family`, children: [f("div", { className: N.familyHeader, children: [f("span", { className: N.familyName, children: n }), f(Ne, { label: "Subset", title: "Save space by reducing the number of glyphs, features, and variations in this font", checked: e.enableSubsetting }), f(Di, { settings: e, copyFunction: As, pasteFunction: js }), f(ve, { onClick: s, type: "close", title: "Remove this font family", className: N.removeFontFamily })] }), f("div", { className: N.familySettingsBody, children: [e.enableSubsetting.value && f(ie, { children: [i.styleSettings.weight || i.styleSettings.width || i.styleSettings.italic || i.styleSettings.slant ? f(at, { title: "Style settings", copyPasteFns: { settings: i.styleSettings, copy: Cs, paste: Os }, children: f("div", { className: N.settingsGrid, children: [i.styleSettings.weight ? f(ke, { styleSetting: i.styleSettings.weight, name: "Weight" }) : null, i.styleSettings.width ? f(ke, { styleSetting: i.styleSettings.width, name: "Width" }) : null, i.styleSettings.italic ? f(ke, { styleSetting: i.styleSettings.italic, name: "Italic" }) : null, i.styleSettings.slant ? f(ke, { styleSetting: i.styleSettings.slant, name: "Slant" }) : null] }) }) : null, i.axisSettings.length > 0 ? f(at, { title: "Variation axis settings", copyPasteFns: { settings: i.axisSettings, copy: Ns, paste: Es }, children: f("div", { className: N.settingsGrid, children: i.axisSettings.map(({ name: o, tag: l, range: u }) => f(ke, { styleSetting: { type: "variable", value: u }, name: o, tag: l })) }) }) : null, f(at, { title: "Character sets", copyPasteFns: { settings: i.includeCharacters, copy: Ms, paste: Us }, children: [f("div", { className: N.settingsSubSection, children: f(Ne, { label: "All characters", checked: i.includeCharacters.includeAllCharacters }) }), i.includeCharacters.includeNamedSubsets.length > 0 ? f(yn, { name: "Named subsets", settings: i.includeCharacters.includeNamedSubsets, mapping: ul, disabled: i.includeCharacters.includeAllCharacters.value }) : null, f("div", { className: N.settingsSubSection, children: f(ol, { ranges: i.includeCharacters.includeUnicodeRanges, disabled: i.includeCharacters.includeAllCharacters.value }) })] }), i.includeFeatures.features.length > 0 || i.includeFeatures.characterVariants.length > 0 || i.includeFeatures.stylisticSets.length > 0 ? f(at, { title: "Features", copyPasteFns: { settings: i.includeFeatures, copy: Is, paste: Rs }, children: [i.includeFeatures.features.length > 0 ? f("div", { className: N.settingsSubSection, children: f("div", { className: N.checkboxes, children: i.includeFeatures.features.map(({ feature: o, include: l }) => f(Ne, { label: Pi(o), checked: l, title: o.tag })) }) }) : null, i.includeFeatures.stylisticSets.length > 0 ? f(yn, { name: "Stylistic sets", settings: i.includeFeatures.stylisticSets, mapping: Na }) : null, i.includeFeatures.characterVariants.length > 0 ? f(yn, { name: "Character variants", settings: i.includeFeatures.characterVariants, mapping: Na }) : null] }) : null] }), f(at, { title: ["Fonts", f("span", { className: N.numFonts, children: a.length })], startCollapsed: a.length > 6, children: a.map(({ font: o, styleSettings: l }) => f(sl, { font: o, styleSettings: l, enableSubsetting: e.enableSubsetting.value })) })] })] });
}, _t = (e) => {
  var _a2;
  if (!((_a2 = e.dataTransfer) == null ? void 0 : _a2.items)) return false;
  for (const t of e.dataTransfer.items) if (t.kind === "file") return true;
  return false;
}, hl = () => {
  const e = Re(), { fonts: t, fontsBeingLoaded: n } = e, a = Yt(), i = M((u) => {
    _t(u) && (u.preventDefault(), u.stopPropagation());
  }, []), r = M((u) => {
    _t(u) && (u.preventDefault(), u.stopPropagation());
  }, []), s = M((u) => {
    if (!_t(u)) return;
    u.preventDefault(), u.stopPropagation();
    const c = Array.from(u.dataTransfer.files);
    c.length > 0 && e.addFonts(c.map((h) => h)).catch((h) => {
      a("Failed to add fonts", h);
    });
  }, []), o = M((u) => {
    _t(u) && (u.preventDefault(), u.stopPropagation());
  }, []), l = M(() => {
    Ui().then(async (u) => {
      u && await e.addFonts(Array.from(u));
    }).catch((u) => {
      a("Failed to upload fonts", u);
    });
  }, [e]);
  return t.value.length === 0 ? n.value > 0 ? f("div", { className: N.loading, children: f(Pt, { size: 320 }) }) : f("div", { className: N.noFonts, onDragEnter: i, onDragOver: r, onDrop: s, onDragLeave: o, onClick: l, children: [f(fe, { type: "upload", title: "", className: N.uploadIcon, size: "8rem" }), f("span", { className: N.uploadHeader, children: "Click to upload fonts" }), f("span", { className: N.uploadSub, children: "or drag and drop" })] }) : f("div", { className: N.families, onDragEnter: i, onDragOver: r, onDrop: s, onDragLeave: o, children: t.value.map((u) => f(cl, { familySettings: u })) });
}, fl = "_export-panel_a4pch_209", dl = "_horizontal_a4pch_216", pl = "_spacer_a4pch_220", gl = "_splitter_a4pch_224", ml = "_vertical_a4pch_238", yl = "_row_a4pch_283", bl = "_grow-button_a4pch_289", vl = "_css-path-prefix-bar_a4pch_293", wl = "_css-path-prefix_a4pch_293", _l = "_css-preview_a4pch_309", xl = "_export-buttons_a4pch_317", Sl = "_loader-wrapper_a4pch_325", kl = "_export-formats_a4pch_333", Tl = "_save-load-settings_a4pch_339", Fl = "_upload-more_a4pch_350", Al = "_export-results_a4pch_356", Cl = "_exported-fonts_a4pch_363", Nl = "_exported-css_a4pch_363", Il = "_exported-font-files_a4pch_377", Ml = "_font-file-table_a4pch_385", jl = "_font-name_a4pch_401", Ol = "_font-file-size_a4pch_404", El = "_more-settings_a4pch_435", Rl = "_setting_a4pch_451", Ul = "_spinbox-setting_a4pch_461", Pl = "_footer_a4pch_469", Dl = "_github-link_a4pch_477", O = { exportPanel: fl, horizontal: dl, spacer: pl, splitter: gl, vertical: ml, row: yl, growButton: bl, cssPathPrefixBar: vl, cssPathPrefix: wl, cssPreview: _l, exportButtons: xl, loaderWrapper: Sl, exportFormats: kl, saveLoadSettings: Tl, uploadMore: Fl, exportResults: Al, exportedFonts: Cl, exportedCss: Nl, exportedFontFiles: Il, fontFileTable: Ml, fontName: jl, fontFileSize: Ol, moreSettings: El, setting: Rl, spinboxSetting: Ul, footer: Pl, githubLink: Dl };
var Ia = {}, Bl = function(e, t, n, a, i) {
  var r = new Worker(Ia[t] || (Ia[t] = URL.createObjectURL(new Blob([e + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'], { type: "text/javascript" }))));
  return r.onmessage = function(s) {
    var o = s.data, l = o.$e$;
    if (l) {
      var u = new Error(l[0]);
      u.code = l[1], u.stack = l[2], i(u, null);
    } else i(null, o);
  }, r.postMessage(n, a), r;
}, Q = Uint8Array, re = Uint16Array, Zt = Int32Array, Qt = new Q([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), en = new Q([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), An = new Q([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Bi = function(e, t) {
  for (var n = new re(31), a = 0; a < 31; ++a) n[a] = t += 1 << e[a - 1];
  for (var i = new Zt(n[30]), a = 1; a < 30; ++a) for (var r = n[a]; r < n[a + 1]; ++r) i[r] = r - n[a] << 5 | a;
  return { b: n, r: i };
}, Li = Bi(Qt, 2), Ll = Li.b, Dt = Li.r;
Ll[28] = 258, Dt[258] = 28;
var ql = Bi(en, 0), Cn = ql.r, Bt = new re(32768);
for (var L = 0; L < 32768; ++L) {
  var Ae = (L & 43690) >> 1 | (L & 21845) << 1;
  Ae = (Ae & 52428) >> 2 | (Ae & 13107) << 2, Ae = (Ae & 61680) >> 4 | (Ae & 3855) << 4, Bt[L] = ((Ae & 65280) >> 8 | (Ae & 255) << 8) >> 1;
}
var Je = function(e, t, n) {
  for (var a = e.length, i = 0, r = new re(t); i < a; ++i) e[i] && ++r[e[i] - 1];
  var s = new re(t);
  for (i = 1; i < t; ++i) s[i] = s[i - 1] + r[i - 1] << 1;
  var o;
  if (n) {
    o = new re(1 << t);
    var l = 15 - t;
    for (i = 0; i < a; ++i) if (e[i]) for (var u = i << 4 | e[i], c = t - e[i], h = s[e[i] - 1]++ << c, p = h | (1 << c) - 1; h <= p; ++h) o[Bt[h] >> l] = u;
  } else for (o = new re(a), i = 0; i < a; ++i) e[i] && (o[i] = Bt[s[e[i] - 1]++] >> 15 - e[i]);
  return o;
}, Me = new Q(288);
for (var L = 0; L < 144; ++L) Me[L] = 8;
for (var L = 144; L < 256; ++L) Me[L] = 9;
for (var L = 256; L < 280; ++L) Me[L] = 7;
for (var L = 280; L < 288; ++L) Me[L] = 8;
var ht = new Q(32);
for (var L = 0; L < 32; ++L) ht[L] = 5;
var qi = Je(Me, 9, 0), zi = Je(ht, 5, 0), Kn = function(e) {
  return (e + 7) / 8 | 0;
}, Xn = function(e, t, n) {
  return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new Q(e.subarray(t, n));
}, zl = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"], se = function(e, t, n) {
  var a = new Error(t || zl[e]);
  if (a.code = e, Error.captureStackTrace && Error.captureStackTrace(a, se), !n) throw a;
  return a;
}, me = function(e, t, n) {
  n <<= t & 7;
  var a = t / 8 | 0;
  e[a] |= n, e[a + 1] |= n >> 8;
}, Ve = function(e, t, n) {
  n <<= t & 7;
  var a = t / 8 | 0;
  e[a] |= n, e[a + 1] |= n >> 8, e[a + 2] |= n >> 16;
}, At = function(e, t) {
  for (var n = [], a = 0; a < e.length; ++a) e[a] && n.push({ s: a, f: e[a] });
  var i = n.length, r = n.slice();
  if (!i) return { t: Yn, l: 0 };
  if (i == 1) {
    var s = new Q(n[0].s + 1);
    return s[n[0].s] = 1, { t: s, l: 1 };
  }
  n.sort(function(T, x) {
    return T.f - x.f;
  }), n.push({ s: -1, f: 25001 });
  var o = n[0], l = n[1], u = 0, c = 1, h = 2;
  for (n[0] = { s: -1, f: o.f + l.f, l: o, r: l }; c != i - 1; ) o = n[n[u].f < n[h].f ? u++ : h++], l = n[u != c && n[u].f < n[h].f ? u++ : h++], n[c++] = { s: -1, f: o.f + l.f, l: o, r: l };
  for (var p = r[0].s, a = 1; a < i; ++a) r[a].s > p && (p = r[a].s);
  var m = new re(p + 1), v = Lt(n[c - 1], m, 0);
  if (v > t) {
    var a = 0, d = 0, y = v - t, g = 1 << y;
    for (r.sort(function(x, F) {
      return m[F.s] - m[x.s] || x.f - F.f;
    }); a < i; ++a) {
      var b = r[a].s;
      if (m[b] > t) d += g - (1 << v - m[b]), m[b] = t;
      else break;
    }
    for (d >>= y; d > 0; ) {
      var S = r[a].s;
      m[S] < t ? d -= 1 << t - m[S]++ - 1 : ++a;
    }
    for (; a >= 0 && d; --a) {
      var _ = r[a].s;
      m[_] == t && (--m[_], ++d);
    }
    v = t;
  }
  return { t: new Q(m), l: v };
}, Lt = function(e, t, n) {
  return e.s == -1 ? Math.max(Lt(e.l, t, n + 1), Lt(e.r, t, n + 1)) : t[e.s] = n;
}, Nn = function(e) {
  for (var t = e.length; t && !e[--t]; ) ;
  for (var n = new re(++t), a = 0, i = e[0], r = 1, s = function(l) {
    n[a++] = l;
  }, o = 1; o <= t; ++o) if (e[o] == i && o != t) ++r;
  else {
    if (!i && r > 2) {
      for (; r > 138; r -= 138) s(32754);
      r > 2 && (s(r > 10 ? r - 11 << 5 | 28690 : r - 3 << 5 | 12305), r = 0);
    } else if (r > 3) {
      for (s(i), --r; r > 6; r -= 6) s(8304);
      r > 2 && (s(r - 3 << 5 | 8208), r = 0);
    }
    for (; r--; ) s(i);
    r = 1, i = e[o];
  }
  return { c: n.subarray(0, a), n: t };
}, We = function(e, t) {
  for (var n = 0, a = 0; a < t.length; ++a) n += e[a] * t[a];
  return n;
}, Gn = function(e, t, n) {
  var a = n.length, i = Kn(t + 2);
  e[i] = a & 255, e[i + 1] = a >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
  for (var r = 0; r < a; ++r) e[i + r + 4] = n[r];
  return (i + 4 + a) * 8;
}, In = function(e, t, n, a, i, r, s, o, l, u, c) {
  me(t, c++, n), ++i[256];
  for (var h = At(i, 15), p = h.t, m = h.l, v = At(r, 15), d = v.t, y = v.l, g = Nn(p), b = g.c, S = g.n, _ = Nn(d), T = _.c, x = _.n, F = new re(19), w = 0; w < b.length; ++w) ++F[b[w] & 31];
  for (var w = 0; w < T.length; ++w) ++F[T[w] & 31];
  for (var k = At(F, 7), C = k.t, I = k.l, j = 19; j > 4 && !C[An[j - 1]]; --j) ;
  var V = u + 5 << 3, E = We(i, Me) + We(r, ht) + s, z = We(i, p) + We(r, d) + s + 14 + 3 * j + We(F, C) + 2 * F[16] + 3 * F[17] + 7 * F[18];
  if (l >= 0 && V <= E && V <= z) return Gn(t, c, e.subarray(l, l + u));
  var $, R, D, W;
  if (me(t, c, 1 + (z < E)), c += 2, z < E) {
    $ = Je(p, m, 0), R = p, D = Je(d, y, 0), W = d;
    var Ue = Je(C, I, 0);
    me(t, c, S - 257), me(t, c + 5, x - 1), me(t, c + 10, j - 4), c += 14;
    for (var w = 0; w < j; ++w) me(t, c + 3 * w, C[An[w]]);
    c += 3 * j;
    for (var ue = [b, T], nt = 0; nt < 2; ++nt) for (var qe = ue[nt], w = 0; w < qe.length; ++w) {
      var ge = qe[w] & 31;
      me(t, c, Ue[ge]), c += C[ge], ge > 15 && (me(t, c, qe[w] >> 5 & 127), c += qe[w] >> 12);
    }
  } else $ = qi, R = Me, D = zi, W = ht;
  for (var w = 0; w < o; ++w) {
    var ne = a[w];
    if (ne > 255) {
      var ge = ne >> 18 & 31;
      Ve(t, c, $[ge + 257]), c += R[ge + 257], ge > 7 && (me(t, c, ne >> 23 & 31), c += Qt[ge]);
      var ze = ne & 31;
      Ve(t, c, D[ze]), c += W[ze], ze > 3 && (Ve(t, c, ne >> 5 & 8191), c += en[ze]);
    } else Ve(t, c, $[ne]), c += R[ne];
  }
  return Ve(t, c, $[256]), c + R[256];
}, $i = new Zt([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Yn = new Q(0), Hi = function(e, t, n, a, i, r) {
  var s = r.z || e.length, o = new Q(a + s + 5 * (1 + Math.ceil(s / 7e3)) + i), l = o.subarray(a, o.length - i), u = r.l, c = (r.r || 0) & 7;
  if (t) {
    c && (l[0] = r.r >> 3);
    for (var h = $i[t - 1], p = h >> 13, m = h & 8191, v = (1 << n) - 1, d = r.p || new re(32768), y = r.h || new re(v + 1), g = Math.ceil(n / 3), b = 2 * g, S = function(on) {
      return (e[on] ^ e[on + 1] << g ^ e[on + 2] << b) & v;
    }, _ = new Zt(25e3), T = new re(288), x = new re(32), F = 0, w = 0, k = r.i || 0, C = 0, I = r.w || 0, j = 0; k + 2 < s; ++k) {
      var V = S(k), E = k & 32767, z = y[V];
      if (d[E] = z, y[V] = E, I <= k) {
        var $ = s - k;
        if ((F > 7e3 || C > 24576) && ($ > 423 || !u)) {
          c = In(e, l, 0, _, T, x, w, C, j, k - j, c), C = F = w = 0, j = k;
          for (var R = 0; R < 286; ++R) T[R] = 0;
          for (var R = 0; R < 30; ++R) x[R] = 0;
        }
        var D = 2, W = 0, Ue = m, ue = E - z & 32767;
        if ($ > 2 && V == S(k - ue)) for (var nt = Math.min(p, $) - 1, qe = Math.min(32767, k), ge = Math.min(258, $); ue <= qe && --Ue && E != z; ) {
          if (e[k + D] == e[k + D - ue]) {
            for (var ne = 0; ne < ge && e[k + ne] == e[k + ne - ue]; ++ne) ;
            if (ne > D) {
              if (D = ne, W = ue, ne > nt) break;
              for (var ze = Math.min(ue, ne - 2), ia = 0, R = 0; R < ze; ++R) {
                var rn = k - ue + R & 32767, ar = d[rn], ra = rn - ar & 32767;
                ra > ia && (ia = ra, z = rn);
              }
            }
          }
          E = z, z = d[E], ue += E - z & 32767;
        }
        if (W) {
          _[C++] = 268435456 | Dt[D] << 18 | Cn[W];
          var sa = Dt[D] & 31, oa = Cn[W] & 31;
          w += Qt[sa] + en[oa], ++T[257 + sa], ++x[oa], I = k + D, ++F;
        } else _[C++] = e[k], ++T[e[k]];
      }
    }
    for (k = Math.max(k, I); k < s; ++k) _[C++] = e[k], ++T[e[k]];
    c = In(e, l, u, _, T, x, w, C, j, k - j, c), u || (r.r = c & 7 | l[c / 8 | 0] << 3, c -= 7, r.h = y, r.p = d, r.i = k, r.w = I);
  } else {
    for (var k = r.w || 0; k < s + u; k += 65535) {
      var sn = k + 65535;
      sn >= s && (l[c / 8 | 0] = u, sn = s), c = Gn(l, c + 1, e.subarray(k, sn));
    }
    r.i = s;
  }
  return Xn(o, 0, a + Kn(c) + i);
}, $l = function() {
  for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
    for (var n = t, a = 9; --a; ) n = (n & 1 && -306674912) ^ n >>> 1;
    e[t] = n;
  }
  return e;
}(), Hl = function() {
  var e = -1;
  return { p: function(t) {
    for (var n = e, a = 0; a < t.length; ++a) n = $l[n & 255 ^ t[a]] ^ n >>> 8;
    e = n;
  }, d: function() {
    return ~e;
  } };
}, Zn = function(e, t, n, a, i) {
  if (!i && (i = { l: 1 }, t.dictionary)) {
    var r = t.dictionary.subarray(-32768), s = new Q(r.length + e.length);
    s.set(r), s.set(e, r.length), e = s, i.w = r.length;
  }
  return Hi(e, t.level == null ? 6 : t.level, t.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, n, a, i);
}, Vi = function(e, t) {
  var n = {};
  for (var a in e) n[a] = e[a];
  for (var a in t) n[a] = t[a];
  return n;
}, Ma = function(e, t, n) {
  for (var a = e(), i = e.toString(), r = i.slice(i.indexOf("[") + 1, i.lastIndexOf("]")).replace(/\s+/g, "").split(","), s = 0; s < a.length; ++s) {
    var o = a[s], l = r[s];
    if (typeof o == "function") {
      t += ";" + l + "=";
      var u = o.toString();
      if (o.prototype) if (u.indexOf("[native code]") != -1) {
        var c = u.indexOf(" ", 8) + 1;
        t += u.slice(c, u.indexOf("(", c));
      } else {
        t += u;
        for (var h in o.prototype) t += ";" + l + ".prototype." + h + "=" + o.prototype[h].toString();
      }
      else t += u;
    } else n[l] = o;
  }
  return t;
}, xt = [], Vl = function(e) {
  var t = [];
  for (var n in e) e[n].buffer && t.push((e[n] = new e[n].constructor(e[n])).buffer);
  return t;
}, Wl = function(e, t, n, a) {
  if (!xt[n]) {
    for (var i = "", r = {}, s = e.length - 1, o = 0; o < s; ++o) i = Ma(e[o], i, r);
    xt[n] = { c: Ma(e[s], i, r), e: r };
  }
  var l = Vi({}, xt[n].e);
  return Bl(xt[n].c + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + t.toString() + "}", n, l, Vl(l), a);
}, Jl = function() {
  return [Q, re, Zt, Qt, en, An, Dt, Cn, qi, Me, zi, ht, Bt, $i, Yn, Je, me, Ve, At, Lt, Nn, We, Gn, In, Kn, Xn, Hi, Zn, Zl, Kl];
}, Kl = function(e) {
  return postMessage(e, [e.buffer]);
}, ja = function(e) {
  return e.ondata = function(t, n) {
    return postMessage([t, n], [t.buffer]);
  }, function(t) {
    t.data.length ? (e.push(t.data[0], t.data[1]), postMessage([t.data[0].length])) : e.flush();
  };
}, Xl = function(e, t, n, a, i, r, s) {
  var o, l = Wl(e, a, i, function(u, c) {
    u ? (l.terminate(), t.ondata.call(t, u)) : Array.isArray(c) ? c.length == 1 ? (t.queuedSize -= c[0], t.ondrain && t.ondrain(c[0])) : (c[1] && l.terminate(), t.ondata.call(t, u, c[0], c[1])) : s(c);
  });
  l.postMessage(n), t.queuedSize = 0, t.push = function(u, c) {
    t.ondata || se(5), o && t.ondata(se(4, 0, 1), null, !!c), t.queuedSize += u.length, l.postMessage([u, o = c], [u.buffer]);
  }, t.terminate = function() {
    l.terminate();
  }, t.flush = function() {
    l.postMessage([]);
  };
}, J = function(e, t, n) {
  for (; n; ++t) e[t] = n, n >>>= 8;
};
function Gl(e, t) {
  return typeof e == "function" && (t = e, e = {}), this.ondata = t, e;
}
var Oa = function() {
  function e(t, n) {
    if (typeof t == "function" && (n = t, t = {}), this.ondata = n, this.o = t || {}, this.s = { l: 0, i: 32768, w: 32768, z: 32768 }, this.b = new Q(98304), this.o.dictionary) {
      var a = this.o.dictionary.subarray(-32768);
      this.b.set(a, 32768 - a.length), this.s.i = 32768 - a.length;
    }
  }
  return e.prototype.p = function(t, n) {
    this.ondata(Zn(t, this.o, 0, 0, this.s), n);
  }, e.prototype.push = function(t, n) {
    this.ondata || se(5), this.s.l && se(4);
    var a = t.length + this.s.z;
    if (a > this.b.length) {
      if (a > 2 * this.b.length - 32768) {
        var i = new Q(a & -32768);
        i.set(this.b.subarray(0, this.s.z)), this.b = i;
      }
      var r = this.b.length - this.s.z;
      this.b.set(t.subarray(0, r), this.s.z), this.s.z = this.b.length, this.p(this.b, false), this.b.set(this.b.subarray(-32768)), this.b.set(t.subarray(r), 32768), this.s.z = t.length - r + 32768, this.s.i = 32766, this.s.w = 32768;
    } else this.b.set(t, this.s.z), this.s.z += t.length;
    this.s.l = n & 1, (this.s.z > this.s.w + 8191 || n) && (this.p(this.b, n || false), this.s.w = this.s.i, this.s.i -= 2);
  }, e.prototype.flush = function() {
    this.ondata || se(5), this.s.l && se(4), this.p(this.b, false), this.s.w = this.s.i, this.s.i -= 2;
  }, e;
}(), Yl = /* @__PURE__ */ function() {
  function e(t, n) {
    Xl([Jl, function() {
      return [ja, Oa];
    }], this, Gl.call(this, t, n), function(a) {
      var i = new Oa(a.data);
      onmessage = ja(i);
    }, 6);
  }
  return e;
}();
function Zl(e, t) {
  return Zn(e, t || {}, 0, 0);
}
var Ea = typeof TextEncoder < "u" && new TextEncoder(), Ql = typeof TextDecoder < "u" && new TextDecoder(), eu = 0;
try {
  Ql.decode(Yn, { stream: true }), eu = 1;
} catch {
}
function Ra(e, t) {
  var n;
  if (Ea) return Ea.encode(e);
  for (var a = e.length, i = new Q(e.length + (e.length >> 1)), r = 0, s = function(u) {
    i[r++] = u;
  }, n = 0; n < a; ++n) {
    if (r + 5 > i.length) {
      var o = new Q(r + 8 + (a - n << 1));
      o.set(i), i = o;
    }
    var l = e.charCodeAt(n);
    l < 128 || t ? s(l) : l < 2048 ? (s(192 | l >> 6), s(128 | l & 63)) : l > 55295 && l < 57344 ? (l = 65536 + (l & 1047552) | e.charCodeAt(++n) & 1023, s(240 | l >> 18), s(128 | l >> 12 & 63), s(128 | l >> 6 & 63), s(128 | l & 63)) : (s(224 | l >> 12), s(128 | l >> 6 & 63), s(128 | l & 63));
  }
  return Xn(i, 0, r);
}
var tu = function(e) {
  return e == 1 ? 3 : e < 6 ? 2 : e == 9 ? 1 : 0;
}, Ct = function(e) {
  var t = 0;
  if (e) for (var n in e) {
    var a = e[n].length;
    a > 65535 && se(9), t += a + 4;
  }
  return t;
}, Ua = function(e, t, n, a, i, r, s, o) {
  var l = a.length, u = n.extra, c = o && o.length, h = Ct(u);
  J(e, t, s != null ? 33639248 : 67324752), t += 4, s != null && (e[t++] = 20, e[t++] = n.os), e[t] = 20, t += 2, e[t++] = n.flag << 1 | (r < 0 && 8), e[t++] = i && 8, e[t++] = n.compression & 255, e[t++] = n.compression >> 8;
  var p = new Date(n.mtime == null ? Date.now() : n.mtime), m = p.getFullYear() - 1980;
  if ((m < 0 || m > 119) && se(10), J(e, t, m << 25 | p.getMonth() + 1 << 21 | p.getDate() << 16 | p.getHours() << 11 | p.getMinutes() << 5 | p.getSeconds() >> 1), t += 4, r != -1 && (J(e, t, n.crc), J(e, t + 4, r < 0 ? -r - 2 : r), J(e, t + 8, n.size)), J(e, t + 12, l), J(e, t + 14, h), t += 16, s != null && (J(e, t, c), J(e, t + 6, n.attrs), J(e, t + 10, s), t += 14), e.set(a, t), t += l, h) for (var v in u) {
    var d = u[v], y = d.length;
    J(e, t, +v), J(e, t + 2, y), e.set(d, t + 4), t += 4 + y;
  }
  return c && (e.set(o, t), t += c), t;
}, nu = function(e, t, n, a, i) {
  J(e, t, 101010256), J(e, t + 8, n), J(e, t + 10, n), J(e, t + 12, a), J(e, t + 16, i);
}, qt = function() {
  function e(t) {
    this.filename = t, this.c = Hl(), this.size = 0, this.compression = 0;
  }
  return e.prototype.process = function(t, n) {
    this.ondata(null, t, n);
  }, e.prototype.push = function(t, n) {
    this.ondata || se(5), this.c.p(t), this.size += t.length, n && (this.crc = this.c.d()), this.process(t, n || false);
  }, e;
}(), Pa = function() {
  function e(t, n) {
    var a = this;
    n || (n = {}), qt.call(this, t), this.d = new Yl(n, function(i, r, s) {
      a.ondata(i, r, s);
    }), this.compression = 8, this.flag = tu(n.level), this.terminate = this.d.terminate;
  }
  return e.prototype.process = function(t, n) {
    this.d.push(t, n);
  }, e.prototype.push = function(t, n) {
    qt.prototype.push.call(this, t, n);
  }, e;
}(), au = function() {
  function e(t) {
    this.ondata = t, this.u = [], this.d = 1;
  }
  return e.prototype.add = function(t) {
    var n = this;
    if (this.ondata || se(5), this.d & 2) this.ondata(se(4 + (this.d & 1) * 8, 0, 1), null, false);
    else {
      var a = Ra(t.filename), i = a.length, r = t.comment, s = r && Ra(r), o = i != t.filename.length || s && r.length != s.length, l = i + Ct(t.extra) + 30;
      i > 65535 && this.ondata(se(11, 0, 1), null, false);
      var u = new Q(l);
      Ua(u, 0, t, a, o, -1);
      var c = [u], h = function() {
        for (var y = 0, g = c; y < g.length; y++) {
          var b = g[y];
          n.ondata(null, b, false);
        }
        c = [];
      }, p = this.d;
      this.d = 0;
      var m = this.u.length, v = Vi(t, { f: a, u: o, o: s, t: function() {
        t.terminate && t.terminate();
      }, r: function() {
        if (h(), p) {
          var y = n.u[m + 1];
          y ? y.r() : n.d = 1;
        }
        p = 1;
      } }), d = 0;
      t.ondata = function(y, g, b) {
        if (y) n.ondata(y, g, b), n.terminate();
        else if (d += g.length, c.push(g), b) {
          var S = new Q(16);
          J(S, 0, 134695760), J(S, 4, t.crc), J(S, 8, d), J(S, 12, t.size), c.push(S), v.c = d, v.b = l + d + 16, v.crc = t.crc, v.size = t.size, p && v.r(), p = 1;
        } else p && h();
      }, this.u.push(v);
    }
  }, e.prototype.end = function() {
    var t = this;
    if (this.d & 2) {
      this.ondata(se(4 + (this.d & 1) * 8, 0, 1), null, true);
      return;
    }
    this.d ? this.e() : this.u.push({ r: function() {
      t.d & 1 && (t.u.splice(-1, 1), t.e());
    }, t: function() {
    } }), this.d = 3;
  }, e.prototype.e = function() {
    for (var t = 0, n = 0, a = 0, i = 0, r = this.u; i < r.length; i++) {
      var s = r[i];
      a += 46 + s.f.length + Ct(s.extra) + (s.o ? s.o.length : 0);
    }
    for (var o = new Q(a + 22), l = 0, u = this.u; l < u.length; l++) {
      var s = u[l];
      Ua(o, t, s, s.f, s.u, -s.c - 2, n, s.o), t += 46 + s.f.length + Ct(s.extra) + (s.o ? s.o.length : 0), n += s.b;
    }
    nu(o, t, this.u.length, a, n), this.ondata(null, o, true), this.d = 2;
  }, e.prototype.terminate = function() {
    for (var t = 0, n = this.u; t < n.length; t++) {
      var a = n[t];
      a.t();
    }
    this.d = 2;
  }, e;
}();
const iu = (e, t) => {
  const n = [];
  let a, i;
  const r = new Promise((l, u) => {
    a = l, i = u;
  }), s = new au((l, u, c) => {
    if (l) {
      s.terminate(), i(l);
      return;
    }
    if (n.push(u), c) {
      const h = new Blob(n, { type: "application/zip" });
      a(h);
    }
  }), o = new Pa("fonts.css");
  s.add(o), o.push(new TextEncoder().encode(t), true);
  for (const { filename: l, data: u } of e) {
    if (u.ttf) {
      const c = new Pa(l + ".ttf");
      s.add(c), c.push(u.ttf.slice(), true);
    }
    if (u.woff) {
      const c = new qt(l + ".woff");
      s.add(c), c.push(u.woff, true);
    }
    if (u.woff2) {
      const c = new qt(l + ".woff2");
      s.add(c), c.push(u.woff2, true);
    }
  }
  return s.end(), r;
}, rt = (e, t) => {
  const n = document.createElement("a"), a = URL.createObjectURL(t);
  n.href = a, n.download = e, n.click(), setTimeout(() => {
    window.URL.revokeObjectURL(a);
  }, 0);
}, Ge = Math.min, oe = Math.max, zt = Math.round, St = Math.floor, we = (e) => ({ x: e, y: e }), ru = { left: "right", right: "left", bottom: "top", top: "bottom" }, su = { start: "end", end: "start" };
function Da(e, t, n) {
  return oe(e, Ge(t, n));
}
function mt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function je(e) {
  return e.split("-")[0];
}
function yt(e) {
  return e.split("-")[1];
}
function Wi(e) {
  return e === "x" ? "y" : "x";
}
function Ji(e) {
  return e === "y" ? "height" : "width";
}
const ou = /* @__PURE__ */ new Set(["top", "bottom"]);
function Fe(e) {
  return ou.has(je(e)) ? "y" : "x";
}
function Ki(e) {
  return Wi(Fe(e));
}
function lu(e, t, n) {
  n === void 0 && (n = false);
  const a = yt(e), i = Ki(e), r = Ji(i);
  let s = i === "x" ? a === (n ? "end" : "start") ? "right" : "left" : a === "start" ? "bottom" : "top";
  return t.reference[r] > t.floating[r] && (s = $t(s)), [s, $t(s)];
}
function uu(e) {
  const t = $t(e);
  return [Mn(e), t, Mn(t)];
}
function Mn(e) {
  return e.replace(/start|end/g, (t) => su[t]);
}
const Ba = ["left", "right"], La = ["right", "left"], cu = ["top", "bottom"], hu = ["bottom", "top"];
function fu(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? La : Ba : t ? Ba : La;
    case "left":
    case "right":
      return t ? cu : hu;
    default:
      return [];
  }
}
function du(e, t, n, a) {
  const i = yt(e);
  let r = fu(je(e), n === "start", a);
  return i && (r = r.map((s) => s + "-" + i), t && (r = r.concat(r.map(Mn)))), r;
}
function $t(e) {
  return e.replace(/left|right|bottom|top/g, (t) => ru[t]);
}
function pu(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function gu(e) {
  return typeof e != "number" ? pu(e) : { top: e, right: e, bottom: e, left: e };
}
function Ht(e) {
  const { x: t, y: n, width: a, height: i } = e;
  return { width: a, height: i, top: n, left: t, right: t + a, bottom: n + i, x: t, y: n };
}
function qa(e, t, n) {
  let { reference: a, floating: i } = e;
  const r = Fe(t), s = Ki(t), o = Ji(s), l = je(t), u = r === "y", c = a.x + a.width / 2 - i.width / 2, h = a.y + a.height / 2 - i.height / 2, p = a[o] / 2 - i[o] / 2;
  let m;
  switch (l) {
    case "top":
      m = { x: c, y: a.y - i.height };
      break;
    case "bottom":
      m = { x: c, y: a.y + a.height };
      break;
    case "right":
      m = { x: a.x + a.width, y: h };
      break;
    case "left":
      m = { x: a.x - i.width, y: h };
      break;
    default:
      m = { x: a.x, y: a.y };
  }
  switch (yt(t)) {
    case "start":
      m[s] -= p * (n && u ? -1 : 1);
      break;
    case "end":
      m[s] += p * (n && u ? -1 : 1);
      break;
  }
  return m;
}
const mu = async (e, t, n) => {
  const { placement: a = "bottom", strategy: i = "absolute", middleware: r = [], platform: s } = n, o = r.filter(Boolean), l = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let u = await s.getElementRects({ reference: e, floating: t, strategy: i }), { x: c, y: h } = qa(u, a, l), p = a, m = {}, v = 0;
  for (let d = 0; d < o.length; d++) {
    const { name: y, fn: g } = o[d], { x: b, y: S, data: _, reset: T } = await g({ x: c, y: h, initialPlacement: a, placement: p, strategy: i, middlewareData: m, rects: u, platform: s, elements: { reference: e, floating: t } });
    c = b ?? c, h = S ?? h, m = { ...m, [y]: { ...m[y], ..._ } }, T && v <= 50 && (v++, typeof T == "object" && (T.placement && (p = T.placement), T.rects && (u = T.rects === true ? await s.getElementRects({ reference: e, floating: t, strategy: i }) : T.rects), { x: c, y: h } = qa(u, p, l)), d = -1);
  }
  return { x: c, y: h, placement: p, strategy: i, middlewareData: m };
};
async function Qn(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: a, y: i, platform: r, rects: s, elements: o, strategy: l } = e, { boundary: u = "clippingAncestors", rootBoundary: c = "viewport", elementContext: h = "floating", altBoundary: p = false, padding: m = 0 } = mt(t, e), v = gu(m), y = o[p ? h === "floating" ? "reference" : "floating" : h], g = Ht(await r.getClippingRect({ element: (n = await (r.isElement == null ? void 0 : r.isElement(y))) == null || n ? y : y.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(o.floating)), boundary: u, rootBoundary: c, strategy: l })), b = h === "floating" ? { x: a, y: i, width: s.floating.width, height: s.floating.height } : s.reference, S = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(o.floating)), _ = await (r.isElement == null ? void 0 : r.isElement(S)) ? await (r.getScale == null ? void 0 : r.getScale(S)) || { x: 1, y: 1 } : { x: 1, y: 1 }, T = Ht(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({ elements: o, rect: b, offsetParent: S, strategy: l }) : b);
  return { top: (g.top - T.top + v.top) / _.y, bottom: (T.bottom - g.bottom + v.bottom) / _.y, left: (g.left - T.left + v.left) / _.x, right: (T.right - g.right + v.right) / _.x };
}
const yu = function(e) {
  return e === void 0 && (e = {}), { name: "flip", options: e, async fn(t) {
    var n, a;
    const { placement: i, middlewareData: r, rects: s, initialPlacement: o, platform: l, elements: u } = t, { mainAxis: c = true, crossAxis: h = true, fallbackPlacements: p, fallbackStrategy: m = "bestFit", fallbackAxisSideDirection: v = "none", flipAlignment: d = true, ...y } = mt(e, t);
    if ((n = r.arrow) != null && n.alignmentOffset) return {};
    const g = je(i), b = Fe(o), S = je(o) === o, _ = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), T = p || (S || !d ? [$t(o)] : uu(o)), x = v !== "none";
    !p && x && T.push(...du(o, d, v, _));
    const F = [o, ...T], w = await Qn(t, y), k = [];
    let C = ((a = r.flip) == null ? void 0 : a.overflows) || [];
    if (c && k.push(w[g]), h) {
      const E = lu(i, s, _);
      k.push(w[E[0]], w[E[1]]);
    }
    if (C = [...C, { placement: i, overflows: k }], !k.every((E) => E <= 0)) {
      var I, j;
      const E = (((I = r.flip) == null ? void 0 : I.index) || 0) + 1, z = F[E];
      if (z && (!(h === "alignment" ? b !== Fe(z) : false) || C.every((D) => D.overflows[0] > 0 && Fe(D.placement) === b))) return { data: { index: E, overflows: C }, reset: { placement: z } };
      let $ = (j = C.filter((R) => R.overflows[0] <= 0).sort((R, D) => R.overflows[1] - D.overflows[1])[0]) == null ? void 0 : j.placement;
      if (!$) switch (m) {
        case "bestFit": {
          var V;
          const R = (V = C.filter((D) => {
            if (x) {
              const W = Fe(D.placement);
              return W === b || W === "y";
            }
            return true;
          }).map((D) => [D.placement, D.overflows.filter((W) => W > 0).reduce((W, Ue) => W + Ue, 0)]).sort((D, W) => D[1] - W[1])[0]) == null ? void 0 : V[0];
          R && ($ = R);
          break;
        }
        case "initialPlacement":
          $ = o;
          break;
      }
      if (i !== $) return { reset: { placement: $ } };
    }
    return {};
  } };
}, bu = /* @__PURE__ */ new Set(["left", "top"]);
async function vu(e, t) {
  const { placement: n, platform: a, elements: i } = e, r = await (a.isRTL == null ? void 0 : a.isRTL(i.floating)), s = je(n), o = yt(n), l = Fe(n) === "y", u = bu.has(s) ? -1 : 1, c = r && l ? -1 : 1, h = mt(t, e);
  let { mainAxis: p, crossAxis: m, alignmentAxis: v } = typeof h == "number" ? { mainAxis: h, crossAxis: 0, alignmentAxis: null } : { mainAxis: h.mainAxis || 0, crossAxis: h.crossAxis || 0, alignmentAxis: h.alignmentAxis };
  return o && typeof v == "number" && (m = o === "end" ? v * -1 : v), l ? { x: m * c, y: p * u } : { x: p * u, y: m * c };
}
const wu = function(e) {
  return e === void 0 && (e = 0), { name: "offset", options: e, async fn(t) {
    var n, a;
    const { x: i, y: r, placement: s, middlewareData: o } = t, l = await vu(t, e);
    return s === ((n = o.offset) == null ? void 0 : n.placement) && (a = o.arrow) != null && a.alignmentOffset ? {} : { x: i + l.x, y: r + l.y, data: { ...l, placement: s } };
  } };
}, _u = function(e) {
  return e === void 0 && (e = {}), { name: "shift", options: e, async fn(t) {
    const { x: n, y: a, placement: i } = t, { mainAxis: r = true, crossAxis: s = false, limiter: o = { fn: (y) => {
      let { x: g, y: b } = y;
      return { x: g, y: b };
    } }, ...l } = mt(e, t), u = { x: n, y: a }, c = await Qn(t, l), h = Fe(je(i)), p = Wi(h);
    let m = u[p], v = u[h];
    if (r) {
      const y = p === "y" ? "top" : "left", g = p === "y" ? "bottom" : "right", b = m + c[y], S = m - c[g];
      m = Da(b, m, S);
    }
    if (s) {
      const y = h === "y" ? "top" : "left", g = h === "y" ? "bottom" : "right", b = v + c[y], S = v - c[g];
      v = Da(b, v, S);
    }
    const d = o.fn({ ...t, [p]: m, [h]: v });
    return { ...d, data: { x: d.x - n, y: d.y - a, enabled: { [p]: r, [h]: s } } };
  } };
}, xu = function(e) {
  return e === void 0 && (e = {}), { name: "size", options: e, async fn(t) {
    var n, a;
    const { placement: i, rects: r, platform: s, elements: o } = t, { apply: l = () => {
    }, ...u } = mt(e, t), c = await Qn(t, u), h = je(i), p = yt(i), m = Fe(i) === "y", { width: v, height: d } = r.floating;
    let y, g;
    h === "top" || h === "bottom" ? (y = h, g = p === (await (s.isRTL == null ? void 0 : s.isRTL(o.floating)) ? "start" : "end") ? "left" : "right") : (g = h, y = p === "end" ? "top" : "bottom");
    const b = d - c.top - c.bottom, S = v - c.left - c.right, _ = Ge(d - c[y], b), T = Ge(v - c[g], S), x = !t.middlewareData.shift;
    let F = _, w = T;
    if ((n = t.middlewareData.shift) != null && n.enabled.x && (w = S), (a = t.middlewareData.shift) != null && a.enabled.y && (F = b), x && !p) {
      const C = oe(c.left, 0), I = oe(c.right, 0), j = oe(c.top, 0), V = oe(c.bottom, 0);
      m ? w = v - 2 * (C !== 0 || I !== 0 ? C + I : oe(c.left, c.right)) : F = d - 2 * (j !== 0 || V !== 0 ? j + V : oe(c.top, c.bottom));
    }
    await l({ ...t, availableWidth: w, availableHeight: F });
    const k = await s.getDimensions(o.floating);
    return v !== k.width || d !== k.height ? { reset: { rects: true } } : {};
  } };
};
function tn() {
  return typeof window < "u";
}
function tt(e) {
  return Xi(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function le(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Se(e) {
  var t;
  return (t = (Xi(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Xi(e) {
  return tn() ? e instanceof Node || e instanceof le(e).Node : false;
}
function de(e) {
  return tn() ? e instanceof Element || e instanceof le(e).Element : false;
}
function xe(e) {
  return tn() ? e instanceof HTMLElement || e instanceof le(e).HTMLElement : false;
}
function za(e) {
  return !tn() || typeof ShadowRoot > "u" ? false : e instanceof ShadowRoot || e instanceof le(e).ShadowRoot;
}
const Su = /* @__PURE__ */ new Set(["inline", "contents"]);
function bt(e) {
  const { overflow: t, overflowX: n, overflowY: a, display: i } = pe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + a + n) && !Su.has(i);
}
const ku = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Tu(e) {
  return ku.has(tt(e));
}
const Fu = [":popover-open", ":modal"];
function nn(e) {
  return Fu.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return false;
    }
  });
}
const Au = ["transform", "translate", "scale", "rotate", "perspective"], Cu = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Nu = ["paint", "layout", "strict", "content"];
function ea(e) {
  const t = ta(), n = de(e) ? pe(e) : e;
  return Au.some((a) => n[a] ? n[a] !== "none" : false) || (n.containerType ? n.containerType !== "normal" : false) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : false) || !t && (n.filter ? n.filter !== "none" : false) || Cu.some((a) => (n.willChange || "").includes(a)) || Nu.some((a) => (n.contain || "").includes(a));
}
function Iu(e) {
  let t = Oe(e);
  for (; xe(t) && !Ye(t); ) {
    if (ea(t)) return t;
    if (nn(t)) return null;
    t = Oe(t);
  }
  return null;
}
function ta() {
  return typeof CSS > "u" || !CSS.supports ? false : CSS.supports("-webkit-backdrop-filter", "none");
}
const Mu = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Ye(e) {
  return Mu.has(tt(e));
}
function pe(e) {
  return le(e).getComputedStyle(e);
}
function an(e) {
  return de(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Oe(e) {
  if (tt(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || za(e) && e.host || Se(e);
  return za(t) ? t.host : t;
}
function Gi(e) {
  const t = Oe(e);
  return Ye(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : xe(t) && bt(t) ? t : Gi(t);
}
function ft(e, t, n) {
  var a;
  t === void 0 && (t = []), n === void 0 && (n = true);
  const i = Gi(e), r = i === ((a = e.ownerDocument) == null ? void 0 : a.body), s = le(i);
  if (r) {
    const o = jn(s);
    return t.concat(s, s.visualViewport || [], bt(i) ? i : [], o && n ? ft(o) : []);
  }
  return t.concat(i, ft(i, [], n));
}
function jn(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Yi(e) {
  const t = pe(e);
  let n = parseFloat(t.width) || 0, a = parseFloat(t.height) || 0;
  const i = xe(e), r = i ? e.offsetWidth : n, s = i ? e.offsetHeight : a, o = zt(n) !== r || zt(a) !== s;
  return o && (n = r, a = s), { width: n, height: a, $: o };
}
function na(e) {
  return de(e) ? e : e.contextElement;
}
function Ke(e) {
  const t = na(e);
  if (!xe(t)) return we(1);
  const n = t.getBoundingClientRect(), { width: a, height: i, $: r } = Yi(t);
  let s = (r ? zt(n.width) : n.width) / a, o = (r ? zt(n.height) : n.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!o || !Number.isFinite(o)) && (o = 1), { x: s, y: o };
}
const ju = we(0);
function Zi(e) {
  const t = le(e);
  return !ta() || !t.visualViewport ? ju : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function Ou(e, t, n) {
  return t === void 0 && (t = false), !n || t && n !== le(e) ? false : t;
}
function Be(e, t, n, a) {
  t === void 0 && (t = false), n === void 0 && (n = false);
  const i = e.getBoundingClientRect(), r = na(e);
  let s = we(1);
  t && (a ? de(a) && (s = Ke(a)) : s = Ke(e));
  const o = Ou(r, n, a) ? Zi(r) : we(0);
  let l = (i.left + o.x) / s.x, u = (i.top + o.y) / s.y, c = i.width / s.x, h = i.height / s.y;
  if (r) {
    const p = le(r), m = a && de(a) ? le(a) : a;
    let v = p, d = jn(v);
    for (; d && a && m !== v; ) {
      const y = Ke(d), g = d.getBoundingClientRect(), b = pe(d), S = g.left + (d.clientLeft + parseFloat(b.paddingLeft)) * y.x, _ = g.top + (d.clientTop + parseFloat(b.paddingTop)) * y.y;
      l *= y.x, u *= y.y, c *= y.x, h *= y.y, l += S, u += _, v = le(d), d = jn(v);
    }
  }
  return Ht({ width: c, height: h, x: l, y: u });
}
function aa(e, t) {
  const n = an(e).scrollLeft;
  return t ? t.left + n : Be(Se(e)).left + n;
}
function Qi(e, t, n) {
  n === void 0 && (n = false);
  const a = e.getBoundingClientRect(), i = a.left + t.scrollLeft - (n ? 0 : aa(e, a)), r = a.top + t.scrollTop;
  return { x: i, y: r };
}
function Eu(e) {
  let { elements: t, rect: n, offsetParent: a, strategy: i } = e;
  const r = i === "fixed", s = Se(a), o = t ? nn(t.floating) : false;
  if (a === s || o && r) return n;
  let l = { scrollLeft: 0, scrollTop: 0 }, u = we(1);
  const c = we(0), h = xe(a);
  if ((h || !h && !r) && ((tt(a) !== "body" || bt(s)) && (l = an(a)), xe(a))) {
    const m = Be(a);
    u = Ke(a), c.x = m.x + a.clientLeft, c.y = m.y + a.clientTop;
  }
  const p = s && !h && !r ? Qi(s, l, true) : we(0);
  return { width: n.width * u.x, height: n.height * u.y, x: n.x * u.x - l.scrollLeft * u.x + c.x + p.x, y: n.y * u.y - l.scrollTop * u.y + c.y + p.y };
}
function Ru(e) {
  return Array.from(e.getClientRects());
}
function Uu(e) {
  const t = Se(e), n = an(e), a = e.ownerDocument.body, i = oe(t.scrollWidth, t.clientWidth, a.scrollWidth, a.clientWidth), r = oe(t.scrollHeight, t.clientHeight, a.scrollHeight, a.clientHeight);
  let s = -n.scrollLeft + aa(e);
  const o = -n.scrollTop;
  return pe(a).direction === "rtl" && (s += oe(t.clientWidth, a.clientWidth) - i), { width: i, height: r, x: s, y: o };
}
function Pu(e, t) {
  const n = le(e), a = Se(e), i = n.visualViewport;
  let r = a.clientWidth, s = a.clientHeight, o = 0, l = 0;
  if (i) {
    r = i.width, s = i.height;
    const u = ta();
    (!u || u && t === "fixed") && (o = i.offsetLeft, l = i.offsetTop);
  }
  return { width: r, height: s, x: o, y: l };
}
const Du = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Bu(e, t) {
  const n = Be(e, true, t === "fixed"), a = n.top + e.clientTop, i = n.left + e.clientLeft, r = xe(e) ? Ke(e) : we(1), s = e.clientWidth * r.x, o = e.clientHeight * r.y, l = i * r.x, u = a * r.y;
  return { width: s, height: o, x: l, y: u };
}
function $a(e, t, n) {
  let a;
  if (t === "viewport") a = Pu(e, n);
  else if (t === "document") a = Uu(Se(e));
  else if (de(t)) a = Bu(t, n);
  else {
    const i = Zi(e);
    a = { x: t.x - i.x, y: t.y - i.y, width: t.width, height: t.height };
  }
  return Ht(a);
}
function er(e, t) {
  const n = Oe(e);
  return n === t || !de(n) || Ye(n) ? false : pe(n).position === "fixed" || er(n, t);
}
function Lu(e, t) {
  const n = t.get(e);
  if (n) return n;
  let a = ft(e, [], false).filter((o) => de(o) && tt(o) !== "body"), i = null;
  const r = pe(e).position === "fixed";
  let s = r ? Oe(e) : e;
  for (; de(s) && !Ye(s); ) {
    const o = pe(s), l = ea(s);
    !l && o.position === "fixed" && (i = null), (r ? !l && !i : !l && o.position === "static" && !!i && Du.has(i.position) || bt(s) && !l && er(e, s)) ? a = a.filter((c) => c !== s) : i = o, s = Oe(s);
  }
  return t.set(e, a), a;
}
function qu(e) {
  let { element: t, boundary: n, rootBoundary: a, strategy: i } = e;
  const s = [...n === "clippingAncestors" ? nn(t) ? [] : Lu(t, this._c) : [].concat(n), a], o = s[0], l = s.reduce((u, c) => {
    const h = $a(t, c, i);
    return u.top = oe(h.top, u.top), u.right = Ge(h.right, u.right), u.bottom = Ge(h.bottom, u.bottom), u.left = oe(h.left, u.left), u;
  }, $a(t, o, i));
  return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
}
function zu(e) {
  const { width: t, height: n } = Yi(e);
  return { width: t, height: n };
}
function $u(e, t, n) {
  const a = xe(t), i = Se(t), r = n === "fixed", s = Be(e, true, r, t);
  let o = { scrollLeft: 0, scrollTop: 0 };
  const l = we(0);
  function u() {
    l.x = aa(i);
  }
  if (a || !a && !r) if ((tt(t) !== "body" || bt(i)) && (o = an(t)), a) {
    const m = Be(t, true, r, t);
    l.x = m.x + t.clientLeft, l.y = m.y + t.clientTop;
  } else i && u();
  r && !a && i && u();
  const c = i && !a && !r ? Qi(i, o) : we(0), h = s.left + o.scrollLeft - l.x - c.x, p = s.top + o.scrollTop - l.y - c.y;
  return { x: h, y: p, width: s.width, height: s.height };
}
function bn(e) {
  return pe(e).position === "static";
}
function Ha(e, t) {
  if (!xe(e) || pe(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return Se(e) === n && (n = n.ownerDocument.body), n;
}
function tr(e, t) {
  const n = le(e);
  if (nn(e)) return n;
  if (!xe(e)) {
    let i = Oe(e);
    for (; i && !Ye(i); ) {
      if (de(i) && !bn(i)) return i;
      i = Oe(i);
    }
    return n;
  }
  let a = Ha(e, t);
  for (; a && Tu(a) && bn(a); ) a = Ha(a, t);
  return a && Ye(a) && bn(a) && !ea(a) ? n : a || Iu(e) || n;
}
const Hu = async function(e) {
  const t = this.getOffsetParent || tr, n = this.getDimensions, a = await n(e.floating);
  return { reference: $u(e.reference, await t(e.floating), e.strategy), floating: { x: 0, y: 0, width: a.width, height: a.height } };
};
function Vu(e) {
  return pe(e).direction === "rtl";
}
const Wu = { convertOffsetParentRelativeRectToViewportRelativeRect: Eu, getDocumentElement: Se, getClippingRect: qu, getOffsetParent: tr, getElementRects: Hu, getClientRects: Ru, getDimensions: zu, getScale: Ke, isElement: de, isRTL: Vu };
function nr(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Ju(e, t) {
  let n = null, a;
  const i = Se(e);
  function r() {
    var o;
    clearTimeout(a), (o = n) == null || o.disconnect(), n = null;
  }
  function s(o, l) {
    o === void 0 && (o = false), l === void 0 && (l = 1), r();
    const u = e.getBoundingClientRect(), { left: c, top: h, width: p, height: m } = u;
    if (o || t(), !p || !m) return;
    const v = St(h), d = St(i.clientWidth - (c + p)), y = St(i.clientHeight - (h + m)), g = St(c), S = { rootMargin: -v + "px " + -d + "px " + -y + "px " + -g + "px", threshold: oe(0, Ge(1, l)) || 1 };
    let _ = true;
    function T(x) {
      const F = x[0].intersectionRatio;
      if (F !== l) {
        if (!_) return s();
        F ? s(false, F) : a = setTimeout(() => {
          s(false, 1e-7);
        }, 1e3);
      }
      F === 1 && !nr(u, e.getBoundingClientRect()) && s(), _ = false;
    }
    try {
      n = new IntersectionObserver(T, { ...S, root: i.ownerDocument });
    } catch {
      n = new IntersectionObserver(T, S);
    }
    n.observe(e);
  }
  return s(true), r;
}
function Va(e, t, n, a) {
  a === void 0 && (a = {});
  const { ancestorScroll: i = true, ancestorResize: r = true, elementResize: s = typeof ResizeObserver == "function", layoutShift: o = typeof IntersectionObserver == "function", animationFrame: l = false } = a, u = na(e), c = i || r ? [...u ? ft(u) : [], ...ft(t)] : [];
  c.forEach((g) => {
    i && g.addEventListener("scroll", n, { passive: true }), r && g.addEventListener("resize", n);
  });
  const h = u && o ? Ju(u, n) : null;
  let p = -1, m = null;
  s && (m = new ResizeObserver((g) => {
    let [b] = g;
    b && b.target === u && m && (m.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var S;
      (S = m) == null || S.observe(t);
    })), n();
  }), u && !l && m.observe(u), m.observe(t));
  let v, d = l ? Be(e) : null;
  l && y();
  function y() {
    const g = Be(e);
    d && !nr(d, g) && n(), d = g, v = requestAnimationFrame(y);
  }
  return n(), () => {
    var g;
    c.forEach((b) => {
      i && b.removeEventListener("scroll", n), r && b.removeEventListener("resize", n);
    }), h == null ? void 0 : h(), (g = m) == null || g.disconnect(), m = null, l && cancelAnimationFrame(v);
  };
}
const Ku = wu, Xu = _u, Gu = yu, Yu = xu, Zu = (e, t, n) => {
  const a = /* @__PURE__ */ new Map(), i = { platform: Wu, ...n }, r = { ...i.platform, _c: a };
  return mu(e, t, { ...i, platform: r });
}, Qu = (e) => {
  const t = ee(() => {
  }), n = ee(null), a = M((o) => {
    n.current = o, t.current(), i.current !== null && o !== null && (t.current = Va(o, i.current, s));
  }, []), i = ee(null), r = M((o) => {
    i.current = o, t.current(), o !== null && n.current !== null && (t.current = Va(n.current, o, s));
  }, []), s = M(() => {
    if (!n.current || !i.current) return;
    const o = i.current;
    Zu(n.current, i.current, e == null ? void 0 : e()).then(({ x: l, y: u }) => {
      o.style.left = `${l}px`, o.style.top = `${u}px`;
    });
  }, []);
  return Jt(() => () => t.current(), []), { reference: a, floating: r };
}, ec = (e, t, n, a) => {
  const i = Ee(e), r = ee(null), s = ee(null), o = M((u) => {
    s.current = u;
  }, [i]);
  return { resizerRef: M((u) => {
    if (r.current && (r.current.abort(), r.current = null), !u) return;
    const c = new AbortController();
    r.current = c;
    let h, p;
    const m = (v) => {
      var _a2;
      v.preventDefault(), v.stopPropagation();
      const d = a === "vertical" ? v.clientY : v.clientX, y = (_a2 = s.current) == null ? void 0 : _a2.getBoundingClientRect();
      if (!y) return;
      const g = a === "vertical" ? y.height : y.width;
      h = (b) => {
        b.preventDefault(), b.stopPropagation();
        const S = (a === "vertical" ? b.clientY : b.clientX) - d, _ = g - S;
        _ >= t && _ <= n && (i.value = _);
      }, p = () => {
        document.removeEventListener("pointermove", h), document.removeEventListener("pointerup", p), document.removeEventListener("pointerleave", p);
      }, document.addEventListener("pointermove", h, { signal: c.signal }), document.addEventListener("pointerup", p, { signal: c.signal }), document.addEventListener("pointerleave", p, { signal: c.signal });
    };
    u && u.addEventListener("pointerdown", m, { signal: c.signal });
  }, [t, n, i, a]), panelRef: o, panelSize: i };
}, tc = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xml:space='preserve'%20width='128'%20height='128'%3e%3cpath%20fill='%23fcc21b'%20d='M125.74%2074.99c7.79-29.66-8.507-56.66-38.005-62.083C24.313%201.249-3.8%2053.67.83%2094.54c0%2013.63%2028.17%2024.69%2062.93%2024.69%2032.58%200%2059.37-9.73%2062.59-22.17q.33-1.245.33-2.52c.01-6.48-4.12-7.46-.94-19.55'/%3e%3cpath%20fill='%232f2f2f'%20d='M28.073%2042.118c2.28-4.54%207.2-6.69%2010.99-4.84%203.78%201.86%205.01%207.03%202.74%2011.56s-7.18%206.69-10.97%204.83c-3.78-1.86-5.02-7.04-2.76-11.55M93.541%2053.449c-1.09%205.07-5.41%208.47-9.65%207.59-4.27-.89-6.84-5.72-5.77-10.79%201.09-5.08%205.41-8.48%209.67-7.59%204.25.87%206.83%205.69%205.75%2010.79'/%3e%3cpath%20fill='%23fcc21b'%20d='M10.415%2046.678c1.349-9.29%201.124-28.397%202.622-35.664C14.536%203.746%2017.721.823%2025.1%206.594c6.955%205.439%2012.337%2010.322%2014.386%2011.528M102.41%2018.649c5.563-3.656%2014.517-8%2018.119-8.636%203.548-.626%207.682-.212%207.1%205.404-.678%206.53-3.391%2020.132-3.286%2027.338'/%3e%3cpath%20fill='none'%20stroke='%232f2f2f'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='6'%20d='M38.677%2063.99c1.309%204.264%204.257%2011.373%206.04%2013.249%202.967-2.225%209.093-8.665%209.94-9.725%202.506%202.594%205.863%208.868%208.59%2012.043%203.39-2.119%209.473-7.929%2011.28-9.673'/%3e%3cpath%20fill='%232f2f2f'%20d='M28.621%2061.813c.317%203.329-20.531%202.594-20.455%201.124.08-1.53%2020.224-3.549%2020.455-1.124M25.699%2070.3c2.007%202.675-19.201%2012.794-20.05%2010.383-.706-2.005%2019.418-11.226%2020.05-10.383M89.517%2069.914c.45-3.314%2020.957%202.485%2020.548%203.9-.426%201.472-20.875-1.486-20.548-3.9M88.278%2079.466c.905-.914%2019.818%2010.186%2018.207%2011.94-2.587%202.817-19.439-10.697-18.207-11.94'/%3e%3c/svg%3e", nc = ({ fonts: e }) => {
  const { cssPathPrefix: t, exportSettings: n } = Re(), a = Vn(t, 500, true), i = _e(() => {
    const s = Ln(e, a.value, n.includeTTFinCSS.value);
    return s.spans.length > 0 && s.spans[s.spans.length - 1].type === Fi.Whitespace && s.spans.pop(), s;
  }, [e, a.value, n.includeTTFinCSS.value]), r = (s) => {
    s && s.replaceChildren(i.getNodes());
  };
  return _e(() => f("pre", { className: O.cssPreview, ref: r }), [i]);
}, ac = ({ fonts: e, exportedFormats: t }) => {
  const { cssPathPrefix: n, exportSettings: a } = Re(), i = Ee(false), r = M(async () => {
    i.value = true;
    const s = await iu(e, Ln(e, n.value, a.includeTTFinCSS.value).getString());
    rt("fonts.zip", s), i.value = false;
  }, [e, n, a.includeTTFinCSS]);
  return f("div", { className: O.exportedFonts, children: [f("div", { className: O.exportedFontFiles, children: f("table", { className: Z(O.fontFileTable, "fancy-table"), children: [f("thead", { children: f("tr", { children: [f("th", { scope: "col", children: "Filename" }), t.ttf && f("th", { scope: "col", children: "TTF" }), t.woff && f("th", { scope: "col", children: "WOFF" }), t.woff2 && f("th", { scope: "col", children: "WOFF2" })] }) }), f("tbody", { children: e.map(({ filename: s, data: o }) => f("tr", { children: [f("td", { className: O.fontName, children: s }), t.ttf && f("td", { className: O.fontFileSize, children: o.ttf ? f(ie, { children: [f("span", { children: [Ft(o.ttf.length), " "] }), f(ve, { type: "download", title: "Download", onClick: () => rt(s + ".ttf", new Blob([o.ttf], { type: "font/ttf" })) })] }) : null }), t.woff && f("td", { className: O.fontFileSize, children: o.woff ? f(ie, { children: [f("span", { children: [Ft(o.woff.length), " "] }), f(ve, { type: "download", title: "Download", onClick: () => rt(s + ".woff", new Blob([o.woff], { type: "font/woff" })) })] }) : null }), t.woff2 && f("td", { className: O.fontFileSize, children: o.woff2 ? f(ie, { children: [f("span", { children: [Ft(o.woff2.length), " "] }), f(ve, { type: "download", title: "Download", onClick: () => rt(s + ".woff2", new Blob([o.woff2], { type: "font/woff2" })) })] }) : null })] })) })] }) }), f(it, { onClick: r, disabled: i.value, children: [i.value ? f(Pt, { size: 24 }) : f(fe, { type: "download", title: "" }), f("span", { children: "Download .zip" })] })] });
}, ic = ({ fonts: e }) => {
  const { cssPathPrefix: t, exportSettings: n } = Re(), a = M(() => {
    Oi(Ln(e, t.value, n.includeTTFinCSS.value).getString());
  }, [e, t, n.includeTTFinCSS]);
  return f("div", { className: O.exportedCss, children: [f("div", { className: O.cssPathPrefixBar, children: [f("label", { children: "CSS path prefix:" }), f(Hn, { className: O.cssPathPrefix, value: t }), f(ve, { type: "copy", title: "Copy CSS to clipboard", onClick: a })] }), f(nc, { fonts: e })] });
}, rc = ({ relativeTo: e, active: t }) => {
  const { reference: n, floating: a } = Qu(() => ({ placement: "bottom", middleware: [Ku(4), Xu({ padding: 8 }), Yu({ apply({ availableWidth: o, availableHeight: l, elements: u }) {
    const { floating: c } = u;
    c.style.maxWidth = `${o}px`, c.style.maxHeight = `${l}px`;
  }, padding: 8 }), Gu()] }));
  n(e.current);
  const i = (o) => {
    a(o), o == null ? void 0 : o.focus();
  }, r = M((o) => {
    var _a2;
    (!o.relatedTarget || o.relatedTarget !== e.current && ((_a2 = o.currentTarget) == null ? void 0 : _a2.contains(o.relatedTarget)) === false) && (t.value = false);
  }, []), { exportSettings: s } = Re();
  return t.value ? f(Ei, { children: f("div", { className: O.moreSettings, tabIndex: 0, ref: i, onBlur: r, children: [f("div", { className: Z(O.setting, O.spinboxSetting), children: [f("label", { children: "WOFF compression level" }), f(lt, { min: 1, max: 100, step: 1, value: s.woffCompression })] }), f("div", { className: Z(O.setting, O.spinboxSetting), children: [f("label", { children: "WOFF2 compression level" }), f(lt, { min: 1, max: 11, step: 1, value: s.woff2Compression })] }), f("div", { className: O.setting, children: f(Ne, { label: "Include .ttf in CSS", checked: s.includeTTFinCSS }) })] }) }) : null;
}, sc = () => {
  const e = Re(), { fonts: t, fontsBeingLoaded: n, exportSettings: a } = e, i = Yt(), r = M(() => {
    e.exportFonts().catch((g) => {
      i("Failed to export fonts", g);
    });
  }, [e]), s = M(() => {
    Ui().then(async (g) => {
      g && await e.addFonts(Array.from(g));
    }).catch((g) => {
      i("Failed to upload fonts", g);
    });
  }, [e, i]), o = M(() => {
    const g = e.saveAllSettings(), b = new Blob([new TextEncoder().encode(JSON.stringify(g))], { type: "application/json" });
    rt("settings.json", b);
  }, [e]), l = M(() => {
    Ri({ accept: ".json" }).then(async (g) => {
      if (g && g.length > 0) {
        const S = await g[0].text(), _ = JSON.parse(S);
        e.loadAllSettings(_);
      }
    }).catch((g) => {
      i("Failed to load settings", g);
    });
  }, [e, i]), u = Ee(false), c = ee(null), [h, p] = li(() => window.matchMedia("(orientation: portrait)").matches);
  It(() => {
    const g = window.matchMedia("(orientation: portrait)"), b = (S) => {
      p(S.matches);
    };
    return g.addEventListener("change", b), () => {
      g.removeEventListener("change", b);
    };
  }, [h]);
  const { resizerRef: m, panelRef: v, panelSize: d } = ec(500, h ? 200 : 400, 1e4, h ? "vertical" : "horizontal");
  if (t.value.length === 0) return null;
  let y = null;
  if (e.exportedFonts.value.state === "loaded") {
    const { exportedFonts: g, exportedFormats: b } = e.exportedFonts.value;
    y = f("div", { className: O.exportResults, children: [f(ac, { fonts: g, exportedFormats: b }), f(ic, { fonts: g })] });
  } else if (e.exportedFonts.value.state === "loading") {
    const { progress: g } = e.exportedFonts.value;
    y = f("div", { className: O.loaderWrapper, children: f(Pt, { size: 128, className: O.exportLoader, progress: g }) });
  }
  return f("div", { className: Z(O.exportPanel, h ? O.vertical : O.horizontal), ref: v, style: { [h ? "height" : "width"]: `${d.value}px` }, children: [f("div", { className: O.splitter, ref: m }), f("div", { className: O.exportButtons, children: [f("div", { className: O.row, children: [f(it, { onClick: r, disabled: e.exportedFonts.value.state === "loading", className: O.growButton, children: "Export" }), f("div", { className: O.exportFormats, children: [f(Ne, { label: "TTF", checked: a.formats.ttf }), f(Ne, { label: "WOFF", checked: a.formats.woff }), f(Ne, { label: "WOFF2", checked: a.formats.woff2 }), f(Oo, { type: "gear", title: "More settings", toggled: u, innerRef: c })] })] }), f(rc, { relativeTo: c, active: u }), f("div", { className: O.saveLoadSettings, children: [f(it, { onClick: o, children: [f(fe, { type: "download", title: "" }), "Save settings"] }), f(it, { onClick: l, children: [f(fe, { type: "upload", title: "" }), "Load settings"] })] }), f("div", { className: O.uploadMore, children: f(it, { onClick: s, className: O.growButton, children: [n.value > 0 ? f(Pt, { size: 24 }) : f(fe, { type: "upload", title: "" }), "Upload more fonts"] }) })] }), y, f("div", { className: O.spacer }), f("div", { className: O.footer, children: [f("span", { children: ["Made with ", f("img", { src: tc, alt: "blobCat", width: "128", height: "128", style: "width: 1em; height: 1em; vertical-align: middle" }), " by ", f("a", { href: "https://github.com/valadaptive", children: "valadaptive" })] }), f("div", { className: O.spacer }), f("a", { href: "https://github.com/valadaptive/glypht", className: O.githubLink, children: f(fe, { type: "github", title: "View this project on GitHub", clickableStyle: true, size: "1rem" }) })] })] });
}, oc = () => f("div", { className: hn.app, children: f("div", { className: hn.displayPane, children: [f("div", { className: hn.mainPane, children: f(hl, {}) }), f(sc, {})] }) }), lc = Hs();
function uc() {
  return f(Mi.Provider, { value: lc, children: f(Zo, { children: f(al, { children: f(oc, {}) }) }) });
}
document.body.className = "";
cr(f(uc, {}), document.body);
