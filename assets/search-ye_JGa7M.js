(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var n$1, l$3, u$3, t$2, i$2, r$2, o$2, e$2, f$3, c$2, s$3, a$2, h$3, p$3 = {}, y$3 = [], v$2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, w$3 = Array.isArray;
function d$3(n2, l2) {
  for (var u2 in l2) n2[u2] = l2[u2];
  return n2;
}
function g$3(n2) {
  n2 && n2.parentNode && n2.parentNode.removeChild(n2);
}
function _$3(l2, u2, t2) {
  var i2, r2, o2, e2 = {};
  for (o2 in u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : e2[o2] = u2[o2];
  if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n$1.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) null == e2[o2] && (e2[o2] = l2.defaultProps[o2]);
  return m$2(l2, e2, i2, r2, null);
}
function m$2(n2, t2, i2, r2, o2) {
  var e2 = { type: n2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u$3 : o2, __i: -1, __u: 0 };
  return null == o2 && null != l$3.vnode && l$3.vnode(e2), e2;
}
function k$2(n2) {
  return n2.children;
}
function x$1(n2, l2) {
  this.props = n2, this.context = l2;
}
function S(n2, l2) {
  if (null == l2) return n2.__ ? S(n2.__, n2.__i + 1) : null;
  for (var u2; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) return u2.__e;
  return "function" == typeof n2.type ? S(n2) : null;
}
function C$1(n2) {
  var l2, u2;
  if (null != (n2 = n2.__) && null != n2.__c) {
    for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) {
      n2.__e = n2.__c.base = u2.__e;
      break;
    }
    return C$1(n2);
  }
}
function M(n2) {
  (!n2.__d && (n2.__d = true) && i$2.push(n2) && !$.__r++ || r$2 != l$3.debounceRendering) && ((r$2 = l$3.debounceRendering) || o$2)($);
}
function $() {
  for (var n2, u2, t2, r2, o2, f2, c2, s2 = 1; i$2.length; ) i$2.length > s2 && i$2.sort(e$2), n2 = i$2.shift(), s2 = i$2.length, n2.__d && (t2 = void 0, o2 = (r2 = (u2 = n2).__v).__e, f2 = [], c2 = [], u2.__P && ((t2 = d$3({}, r2)).__v = r2.__v + 1, l$3.vnode && l$3.vnode(t2), O(u2.__P, t2, r2, u2.__n, u2.__P.namespaceURI, 32 & r2.__u ? [o2] : null, f2, null == o2 ? S(r2) : o2, !!(32 & r2.__u), c2), t2.__v = r2.__v, t2.__.__k[t2.__i] = t2, z$1(f2, t2, c2), t2.__e != o2 && C$1(t2)));
  $.__r = 0;
}
function I(n2, l2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
  var a2, h2, v2, w2, d2, g2, _2 = t2 && t2.__k || y$3, m2 = l2.length;
  for (f2 = P(u2, l2, _2, f2, m2), a2 = 0; a2 < m2; a2++) null != (v2 = u2.__k[a2]) && (h2 = -1 == v2.__i ? p$3 : _2[v2.__i] || p$3, v2.__i = a2, g2 = O(n2, v2, h2, i2, r2, o2, e2, f2, c2, s2), w2 = v2.__e, v2.ref && h2.ref != v2.ref && (h2.ref && q$2(h2.ref, null, v2), s2.push(v2.ref, v2.__c || w2, v2)), null == d2 && null != w2 && (d2 = w2), 4 & v2.__u || h2.__k === v2.__k ? f2 = A$2(v2, f2, n2) : "function" == typeof v2.type && void 0 !== g2 ? f2 = g2 : w2 && (f2 = w2.nextSibling), v2.__u &= -7);
  return u2.__e = d2, f2;
}
function P(n2, l2, u2, t2, i2) {
  var r2, o2, e2, f2, c2, s2 = u2.length, a2 = s2, h2 = 0;
  for (n2.__k = new Array(i2), r2 = 0; r2 < i2; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? (f2 = r2 + h2, (o2 = n2.__k[r2] = "string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? m$2(null, o2, null, null, null) : w$3(o2) ? m$2(k$2, { children: o2 }, null, null, null) : null == o2.constructor && o2.__b > 0 ? m$2(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : o2).__ = n2, o2.__b = n2.__b + 1, e2 = null, -1 != (c2 = o2.__i = L(o2, u2, f2, a2)) && (a2--, (e2 = u2[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i2 > s2 ? h2-- : i2 < s2 && h2++), "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f2 && (c2 == f2 - 1 ? h2-- : c2 == f2 + 1 ? h2++ : (c2 > f2 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
  if (a2) for (r2 = 0; r2 < s2; r2++) null != (e2 = u2[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = S(e2)), B$1(e2, e2));
  return t2;
}
function A$2(n2, l2, u2) {
  var t2, i2;
  if ("function" == typeof n2.type) {
    for (t2 = n2.__k, i2 = 0; t2 && i2 < t2.length; i2++) t2[i2] && (t2[i2].__ = n2, l2 = A$2(t2[i2], l2, u2));
    return l2;
  }
  n2.__e != l2 && (l2 && n2.type && !u2.contains(l2) && (l2 = S(n2)), u2.insertBefore(n2.__e, l2 || null), l2 = n2.__e);
  do {
    l2 = l2 && l2.nextSibling;
  } while (null != l2 && 8 == l2.nodeType);
  return l2;
}
function L(n2, l2, u2, t2) {
  var i2, r2, o2 = n2.key, e2 = n2.type, f2 = l2[u2];
  if (null === f2 && null == n2.key || f2 && o2 == f2.key && e2 == f2.type && 0 == (2 & f2.__u)) return u2;
  if (t2 > (null != f2 && 0 == (2 & f2.__u) ? 1 : 0)) for (i2 = u2 - 1, r2 = u2 + 1; i2 >= 0 || r2 < l2.length; ) {
    if (i2 >= 0) {
      if ((f2 = l2[i2]) && 0 == (2 & f2.__u) && o2 == f2.key && e2 == f2.type) return i2;
      i2--;
    }
    if (r2 < l2.length) {
      if ((f2 = l2[r2]) && 0 == (2 & f2.__u) && o2 == f2.key && e2 == f2.type) return r2;
      r2++;
    }
  }
  return -1;
}
function T$1(n2, l2, u2) {
  "-" == l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || v$2.test(l2) ? u2 : u2 + "px";
}
function j$1(n2, l2, u2, t2, i2) {
  var r2;
  n: if ("style" == l2) if ("string" == typeof u2) n2.style.cssText = u2;
  else {
    if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u2 && l2 in u2 || T$1(n2.style, l2, "");
    if (u2) for (l2 in u2) t2 && u2[l2] == t2[l2] || T$1(n2.style, l2, u2[l2]);
  }
  else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(f$3, "$1")), l2 = l2.toLowerCase() in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? l2.toLowerCase().slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u2, u2 ? t2 ? u2.u = t2.u : (u2.u = c$2, n2.addEventListener(l2, r2 ? a$2 : s$3, r2)) : n2.removeEventListener(l2, r2 ? a$2 : s$3, r2);
  else {
    if ("http://www.w3.org/2000/svg" == i2) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
      n2[l2] = null == u2 ? "" : u2;
      break n;
    } catch (n3) {
    }
    "function" == typeof u2 || (null == u2 || false === u2 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u2 ? "" : u2));
  }
}
function F$1(n2) {
  return function(u2) {
    if (this.l) {
      var t2 = this.l[u2.type + n2];
      if (null == u2.t) u2.t = c$2++;
      else if (u2.t < t2.u) return;
      return t2(l$3.event ? l$3.event(u2) : u2);
    }
  };
}
function O(n2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
  var a2, h2, p2, y2, v2, _2, m2, b2, S2, C2, M2, $2, P2, A2, H, L2, T2, j2 = u2.type;
  if (null != u2.constructor) return null;
  128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f2 = u2.__e = t2.__e]), (a2 = l$3.__b) && a2(u2);
  n: if ("function" == typeof j2) try {
    if (b2 = u2.props, S2 = "prototype" in j2 && j2.prototype.render, C2 = (a2 = j2.contextType) && i2[a2.__c], M2 = a2 ? C2 ? C2.props.value : a2.__ : i2, t2.__c ? m2 = (h2 = u2.__c = t2.__c).__ = h2.__E : (S2 ? u2.__c = h2 = new j2(b2, M2) : (u2.__c = h2 = new x$1(b2, M2), h2.constructor = j2, h2.render = D$1), C2 && C2.sub(h2), h2.props = b2, h2.state || (h2.state = {}), h2.context = M2, h2.__n = i2, p2 = h2.__d = true, h2.__h = [], h2._sb = []), S2 && null == h2.__s && (h2.__s = h2.state), S2 && null != j2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = d$3({}, h2.__s)), d$3(h2.__s, j2.getDerivedStateFromProps(b2, h2.__s))), y2 = h2.props, v2 = h2.state, h2.__v = u2, p2) S2 && null == j2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), S2 && null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
    else {
      if (S2 && null == j2.getDerivedStateFromProps && b2 !== y2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(b2, M2), !h2.__e && null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(b2, h2.__s, M2) || u2.__v == t2.__v) {
        for (u2.__v != t2.__v && (h2.props = b2, h2.state = h2.__s, h2.__d = false), u2.__e = t2.__e, u2.__k = t2.__k, u2.__k.some(function(n3) {
          n3 && (n3.__ = u2);
        }), $2 = 0; $2 < h2._sb.length; $2++) h2.__h.push(h2._sb[$2]);
        h2._sb = [], h2.__h.length && e2.push(h2);
        break n;
      }
      null != h2.componentWillUpdate && h2.componentWillUpdate(b2, h2.__s, M2), S2 && null != h2.componentDidUpdate && h2.__h.push(function() {
        h2.componentDidUpdate(y2, v2, _2);
      });
    }
    if (h2.context = M2, h2.props = b2, h2.__P = n2, h2.__e = false, P2 = l$3.__r, A2 = 0, S2) {
      for (h2.state = h2.__s, h2.__d = false, P2 && P2(u2), a2 = h2.render(h2.props, h2.state, h2.context), H = 0; H < h2._sb.length; H++) h2.__h.push(h2._sb[H]);
      h2._sb = [];
    } else do {
      h2.__d = false, P2 && P2(u2), a2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
    } while (h2.__d && ++A2 < 25);
    h2.state = h2.__s, null != h2.getChildContext && (i2 = d$3(d$3({}, i2), h2.getChildContext())), S2 && !p2 && null != h2.getSnapshotBeforeUpdate && (_2 = h2.getSnapshotBeforeUpdate(y2, v2)), L2 = a2, null != a2 && a2.type === k$2 && null == a2.key && (L2 = N(a2.props.children)), f2 = I(n2, w$3(L2) ? L2 : [L2], u2, t2, i2, r2, o2, e2, f2, c2, s2), h2.base = u2.__e, u2.__u &= -161, h2.__h.length && e2.push(h2), m2 && (h2.__E = h2.__ = null);
  } catch (n3) {
    if (u2.__v = null, c2 || null != o2) if (n3.then) {
      for (u2.__u |= c2 ? 160 : 128; f2 && 8 == f2.nodeType && f2.nextSibling; ) f2 = f2.nextSibling;
      o2[o2.indexOf(f2)] = null, u2.__e = f2;
    } else for (T2 = o2.length; T2--; ) g$3(o2[T2]);
    else u2.__e = t2.__e, u2.__k = t2.__k;
    l$3.__e(n3, u2, t2);
  }
  else null == o2 && u2.__v == t2.__v ? (u2.__k = t2.__k, u2.__e = t2.__e) : f2 = u2.__e = V(t2.__e, u2, t2, i2, r2, o2, e2, c2, s2);
  return (a2 = l$3.diffed) && a2(u2), 128 & u2.__u ? void 0 : f2;
}
function z$1(n2, u2, t2) {
  for (var i2 = 0; i2 < t2.length; i2++) q$2(t2[i2], t2[++i2], t2[++i2]);
  l$3.__c && l$3.__c(u2, n2), n2.some(function(u3) {
    try {
      n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
        n3.call(u3);
      });
    } catch (n3) {
      l$3.__e(n3, u3.__v);
    }
  });
}
function N(n2) {
  return "object" != typeof n2 || null == n2 || n2.__b && n2.__b > 0 ? n2 : w$3(n2) ? n2.map(N) : d$3({}, n2);
}
function V(u2, t2, i2, r2, o2, e2, f2, c2, s2) {
  var a2, h2, y2, v2, d2, _2, m2, b2 = i2.props, k2 = t2.props, x2 = t2.type;
  if ("svg" == x2 ? o2 = "http://www.w3.org/2000/svg" : "math" == x2 ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
    for (a2 = 0; a2 < e2.length; a2++) if ((d2 = e2[a2]) && "setAttribute" in d2 == !!x2 && (x2 ? d2.localName == x2 : 3 == d2.nodeType)) {
      u2 = d2, e2[a2] = null;
      break;
    }
  }
  if (null == u2) {
    if (null == x2) return document.createTextNode(k2);
    u2 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l$3.__m && l$3.__m(t2, e2), c2 = false), e2 = null;
  }
  if (null == x2) b2 === k2 || c2 && u2.data == k2 || (u2.data = k2);
  else {
    if (e2 = e2 && n$1.call(u2.childNodes), b2 = i2.props || p$3, !c2 && null != e2) for (b2 = {}, a2 = 0; a2 < u2.attributes.length; a2++) b2[(d2 = u2.attributes[a2]).name] = d2.value;
    for (a2 in b2) if (d2 = b2[a2], "children" == a2) ;
    else if ("dangerouslySetInnerHTML" == a2) y2 = d2;
    else if (!(a2 in k2)) {
      if ("value" == a2 && "defaultValue" in k2 || "checked" == a2 && "defaultChecked" in k2) continue;
      j$1(u2, a2, null, d2, o2);
    }
    for (a2 in k2) d2 = k2[a2], "children" == a2 ? v2 = d2 : "dangerouslySetInnerHTML" == a2 ? h2 = d2 : "value" == a2 ? _2 = d2 : "checked" == a2 ? m2 = d2 : c2 && "function" != typeof d2 || b2[a2] === d2 || j$1(u2, a2, d2, b2[a2], o2);
    if (h2) c2 || y2 && (h2.__html == y2.__html || h2.__html == u2.innerHTML) || (u2.innerHTML = h2.__html), t2.__k = [];
    else if (y2 && (u2.innerHTML = ""), I("template" == t2.type ? u2.content : u2, w$3(v2) ? v2 : [v2], t2, i2, r2, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o2, e2, f2, e2 ? e2[0] : i2.__k && S(i2, 0), c2, s2), null != e2) for (a2 = e2.length; a2--; ) g$3(e2[a2]);
    c2 || (a2 = "value", "progress" == x2 && null == _2 ? u2.removeAttribute("value") : null != _2 && (_2 !== u2[a2] || "progress" == x2 && !_2 || "option" == x2 && _2 != b2[a2]) && j$1(u2, a2, _2, b2[a2], o2), a2 = "checked", null != m2 && m2 != u2[a2] && j$1(u2, a2, m2, b2[a2], o2));
  }
  return u2;
}
function q$2(n2, u2, t2) {
  try {
    if ("function" == typeof n2) {
      var i2 = "function" == typeof n2.__u;
      i2 && n2.__u(), i2 && null == u2 || (n2.__u = n2(u2));
    } else n2.current = u2;
  } catch (n3) {
    l$3.__e(n3, t2);
  }
}
function B$1(n2, u2, t2) {
  var i2, r2;
  if (l$3.unmount && l$3.unmount(n2), (i2 = n2.ref) && (i2.current && i2.current != n2.__e || q$2(i2, null, u2)), null != (i2 = n2.__c)) {
    if (i2.componentWillUnmount) try {
      i2.componentWillUnmount();
    } catch (n3) {
      l$3.__e(n3, u2);
    }
    i2.base = i2.__P = null;
  }
  if (i2 = n2.__k) for (r2 = 0; r2 < i2.length; r2++) i2[r2] && B$1(i2[r2], u2, t2 || "function" != typeof n2.type);
  t2 || g$3(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
}
function D$1(n2, l2, u2) {
  return this.constructor(n2, u2);
}
function E$1(u2, t2, i2) {
  var r2, o2, e2, f2;
  t2 == document && (t2 = document.documentElement), l$3.__ && l$3.__(u2, t2), o2 = (r2 = false) ? null : t2.__k, e2 = [], f2 = [], O(t2, u2 = t2.__k = _$3(k$2, null, [u2]), o2 || p$3, p$3, t2.namespaceURI, o2 ? null : t2.firstChild ? n$1.call(t2.childNodes) : null, e2, o2 ? o2.__e : t2.firstChild, r2, f2), z$1(e2, u2, f2);
}
function K(n2) {
  function l2(n3) {
    var u2, t2;
    return this.getChildContext || (u2 = /* @__PURE__ */ new Set(), (t2 = {})[l2.__c] = this, this.getChildContext = function() {
      return t2;
    }, this.componentWillUnmount = function() {
      u2 = null;
    }, this.shouldComponentUpdate = function(n4) {
      this.props.value != n4.value && u2.forEach(function(n5) {
        n5.__e = true, M(n5);
      });
    }, this.sub = function(n4) {
      u2.add(n4);
      var l3 = n4.componentWillUnmount;
      n4.componentWillUnmount = function() {
        u2 && u2.delete(n4), l3 && l3.call(n4);
      };
    }), n3.children;
  }
  return l2.__c = "__cC" + h$3++, l2.__ = n2, l2.Provider = l2.__l = (l2.Consumer = function(n3, l3) {
    return n3.children(l3);
  }).contextType = l2, l2;
}
n$1 = y$3.slice, l$3 = { __e: function(n2, l2, u2, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, u$3 = 0, t$2 = function(n2) {
  return null != n2 && null == n2.constructor;
}, x$1.prototype.setState = function(n2, l2) {
  var u2;
  u2 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d$3({}, this.state), "function" == typeof n2 && (n2 = n2(d$3({}, u2), this.props)), n2 && d$3(u2, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), M(this));
}, x$1.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
}, x$1.prototype.render = k$2, i$2 = [], o$2 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$2 = function(n2, l2) {
  return n2.__v.__b - l2.__v.__b;
}, $.__r = 0, f$3 = /(PointerCapture)$|Capture$/i, c$2 = 0, s$3 = F$1(false), a$2 = F$1(true), h$3 = 0;
var f$2 = 0;
function u$2(e2, t2, n2, o2, i2, u2) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f$2, __i: -1, __u: 0, __source: i2, __self: u2 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l$3.vnode && l$3.vnode(l2), l2;
}
var t$1, r$1, u$1, i$1, o$1 = 0, f$1 = [], c$1 = l$3, e$1 = c$1.__b, a$1 = c$1.__r, v$1 = c$1.diffed, l$2 = c$1.__c, m$1 = c$1.unmount, s$2 = c$1.__;
function p$2(n2, t2) {
  c$1.__h && c$1.__h(r$1, n2, o$1 || t2), o$1 = 0;
  var u2 = r$1.__H || (r$1.__H = { __: [], __h: [] });
  return n2 >= u2.__.length && u2.__.push({}), u2.__[n2];
}
function d$2(n2) {
  return o$1 = 1, h$2(D, n2);
}
function h$2(n2, u2, i2) {
  var o2 = p$2(t$1++, 2);
  if (o2.t = n2, !o2.__c && (o2.__ = [D(void 0, u2), function(n3) {
    var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n3);
    t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
  }], o2.__c = r$1, !r$1.__f)) {
    var f2 = function(n3, t2, r2) {
      if (!o2.__c.__H) return true;
      var u3 = o2.__c.__H.__.filter(function(n4) {
        return !!n4.__c;
      });
      if (u3.every(function(n4) {
        return !n4.__N;
      })) return !c2 || c2.call(this, n3, t2, r2);
      var i3 = o2.__c.props !== n3;
      return u3.forEach(function(n4) {
        if (n4.__N) {
          var t3 = n4.__[0];
          n4.__ = n4.__N, n4.__N = void 0, t3 !== n4.__[0] && (i3 = true);
        }
      }), c2 && c2.call(this, n3, t2, r2) || i3;
    };
    r$1.__f = true;
    var c2 = r$1.shouldComponentUpdate, e2 = r$1.componentWillUpdate;
    r$1.componentWillUpdate = function(n3, t2, r2) {
      if (this.__e) {
        var u3 = c2;
        c2 = void 0, f2(n3, t2, r2), c2 = u3;
      }
      e2 && e2.call(this, n3, t2, r2);
    }, r$1.shouldComponentUpdate = f2;
  }
  return o2.__N || o2.__;
}
function y$2(n2, u2) {
  var i2 = p$2(t$1++, 3);
  !c$1.__s && C(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r$1.__H.__h.push(i2));
}
function _$2(n2, u2) {
  var i2 = p$2(t$1++, 4);
  !c$1.__s && C(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r$1.__h.push(i2));
}
function A$1(n2) {
  return o$1 = 5, T(function() {
    return { current: n2 };
  }, []);
}
function T(n2, r2) {
  var u2 = p$2(t$1++, 7);
  return C(u2.__H, r2) && (u2.__ = n2(), u2.__H = r2, u2.__h = n2), u2.__;
}
function q$1(n2, t2) {
  return o$1 = 8, T(function() {
    return n2;
  }, t2);
}
function x(n2) {
  var u2 = r$1.context[n2.__c], i2 = p$2(t$1++, 9);
  return i2.c = n2, u2 ? (null == i2.__ && (i2.__ = true, u2.sub(r$1)), u2.props.value) : n2.__;
}
function g$2() {
  var n2 = p$2(t$1++, 11);
  if (!n2.__) {
    for (var u2 = r$1.__v; null !== u2 && !u2.__m && null !== u2.__; ) u2 = u2.__;
    var i2 = u2.__m || (u2.__m = [0, 0]);
    n2.__ = "P" + i2[0] + "-" + i2[1]++;
  }
  return n2.__;
}
function j() {
  for (var n2; n2 = f$1.shift(); ) if (n2.__P && n2.__H) try {
    n2.__H.__h.forEach(z), n2.__H.__h.forEach(B), n2.__H.__h = [];
  } catch (t2) {
    n2.__H.__h = [], c$1.__e(t2, n2.__v);
  }
}
c$1.__b = function(n2) {
  r$1 = null, e$1 && e$1(n2);
}, c$1.__ = function(n2, t2) {
  n2 && t2.__k && t2.__k.__m && (n2.__m = t2.__k.__m), s$2 && s$2(n2, t2);
}, c$1.__r = function(n2) {
  a$1 && a$1(n2), t$1 = 0;
  var i2 = (r$1 = n2.__c).__H;
  i2 && (u$1 === r$1 ? (i2.__h = [], r$1.__h = [], i2.__.forEach(function(n3) {
    n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
  })) : (i2.__h.forEach(z), i2.__h.forEach(B), i2.__h = [], t$1 = 0)), u$1 = r$1;
}, c$1.diffed = function(n2) {
  v$1 && v$1(n2);
  var t2 = n2.__c;
  t2 && t2.__H && (t2.__H.__h.length && (1 !== f$1.push(t2) && i$1 === c$1.requestAnimationFrame || ((i$1 = c$1.requestAnimationFrame) || w$2)(j)), t2.__H.__.forEach(function(n3) {
    n3.u && (n3.__H = n3.u), n3.u = void 0;
  })), u$1 = r$1 = null;
}, c$1.__c = function(n2, t2) {
  t2.some(function(n3) {
    try {
      n3.__h.forEach(z), n3.__h = n3.__h.filter(function(n4) {
        return !n4.__ || B(n4);
      });
    } catch (r2) {
      t2.some(function(n4) {
        n4.__h && (n4.__h = []);
      }), t2 = [], c$1.__e(r2, n3.__v);
    }
  }), l$2 && l$2(n2, t2);
}, c$1.unmount = function(n2) {
  m$1 && m$1(n2);
  var t2, r2 = n2.__c;
  r2 && r2.__H && (r2.__H.__.forEach(function(n3) {
    try {
      z(n3);
    } catch (n4) {
      t2 = n4;
    }
  }), r2.__H = void 0, t2 && c$1.__e(t2, r2.__v));
};
var k$1 = "function" == typeof requestAnimationFrame;
function w$2(n2) {
  var t2, r2 = function() {
    clearTimeout(u2), k$1 && cancelAnimationFrame(t2), setTimeout(n2);
  }, u2 = setTimeout(r2, 100);
  k$1 && (t2 = requestAnimationFrame(r2));
}
function z(n2) {
  var t2 = r$1, u2 = n2.__c;
  "function" == typeof u2 && (n2.__c = void 0, u2()), r$1 = t2;
}
function B(n2) {
  var t2 = r$1;
  n2.__c = n2.__(), r$1 = t2;
}
function C(n2, t2) {
  return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
    return t3 !== n2[r2];
  });
}
function D(n2, t2) {
  return "function" == typeof t2 ? t2(n2) : t2;
}
var i = Symbol.for("preact-signals");
function t() {
  if (!(s$1 > 1)) {
    var i2, t2 = false;
    while (void 0 !== h$1) {
      var r2 = h$1;
      h$1 = void 0;
      f++;
      while (void 0 !== r2) {
        var o2 = r2.o;
        r2.o = void 0;
        r2.f &= -3;
        if (!(8 & r2.f) && c(r2)) try {
          r2.c();
        } catch (r3) {
          if (!t2) {
            i2 = r3;
            t2 = true;
          }
        }
        r2 = o2;
      }
    }
    f = 0;
    s$1--;
    if (t2) throw i2;
  } else s$1--;
}
function r(i2) {
  if (s$1 > 0) return i2();
  s$1++;
  try {
    return i2();
  } finally {
    t();
  }
}
var o = void 0;
function n(i2) {
  var t2 = o;
  o = void 0;
  try {
    return i2();
  } finally {
    o = t2;
  }
}
var h$1 = void 0, s$1 = 0, f = 0, v = 0;
function e(i2) {
  if (void 0 !== o) {
    var t2 = i2.n;
    if (void 0 === t2 || t2.t !== o) {
      t2 = { i: 0, S: i2, p: o.s, n: void 0, t: o, e: void 0, x: void 0, r: t2 };
      if (void 0 !== o.s) o.s.n = t2;
      o.s = t2;
      i2.n = t2;
      if (32 & o.f) i2.S(t2);
      return t2;
    } else if (-1 === t2.i) {
      t2.i = 0;
      if (void 0 !== t2.n) {
        t2.n.p = t2.p;
        if (void 0 !== t2.p) t2.p.n = t2.n;
        t2.p = o.s;
        t2.n = void 0;
        o.s.n = t2;
        o.s = t2;
      }
      return t2;
    }
  }
}
function u(i2) {
  this.v = i2;
  this.i = 0;
  this.n = void 0;
  this.t = void 0;
}
u.prototype.brand = i;
u.prototype.h = function() {
  return true;
};
u.prototype.S = function(i2) {
  if (this.t !== i2 && void 0 === i2.e) {
    i2.x = this.t;
    if (void 0 !== this.t) this.t.e = i2;
    this.t = i2;
  }
};
u.prototype.U = function(i2) {
  if (void 0 !== this.t) {
    var t2 = i2.e, r2 = i2.x;
    if (void 0 !== t2) {
      t2.x = r2;
      i2.e = void 0;
    }
    if (void 0 !== r2) {
      r2.e = t2;
      i2.x = void 0;
    }
    if (i2 === this.t) this.t = r2;
  }
};
u.prototype.subscribe = function(i2) {
  var t2 = this;
  return E(function() {
    var r2 = t2.value, n2 = o;
    o = void 0;
    try {
      i2(r2);
    } finally {
      o = n2;
    }
  });
};
u.prototype.valueOf = function() {
  return this.value;
};
u.prototype.toString = function() {
  return this.value + "";
};
u.prototype.toJSON = function() {
  return this.value;
};
u.prototype.peek = function() {
  var i2 = o;
  o = void 0;
  try {
    return this.value;
  } finally {
    o = i2;
  }
};
Object.defineProperty(u.prototype, "value", { get: function() {
  var i2 = e(this);
  if (void 0 !== i2) i2.i = this.i;
  return this.v;
}, set: function(i2) {
  if (i2 !== this.v) {
    if (f > 100) throw new Error("Cycle detected");
    this.v = i2;
    this.i++;
    v++;
    s$1++;
    try {
      for (var r2 = this.t; void 0 !== r2; r2 = r2.x) r2.t.N();
    } finally {
      t();
    }
  }
} });
function d$1(i2) {
  return new u(i2);
}
function c(i2) {
  for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) if (t2.S.i !== t2.i || !t2.S.h() || t2.S.i !== t2.i) return true;
  return false;
}
function a(i2) {
  for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) {
    var r2 = t2.S.n;
    if (void 0 !== r2) t2.r = r2;
    t2.S.n = t2;
    t2.i = -1;
    if (void 0 === t2.n) {
      i2.s = t2;
      break;
    }
  }
}
function l$1(i2) {
  var t2 = i2.s, r2 = void 0;
  while (void 0 !== t2) {
    var o2 = t2.p;
    if (-1 === t2.i) {
      t2.S.U(t2);
      if (void 0 !== o2) o2.n = t2.n;
      if (void 0 !== t2.n) t2.n.p = o2;
    } else r2 = t2;
    t2.S.n = t2.r;
    if (void 0 !== t2.r) t2.r = void 0;
    t2 = o2;
  }
  i2.s = r2;
}
function y$1(i2) {
  u.call(this, void 0);
  this.x = i2;
  this.s = void 0;
  this.g = v - 1;
  this.f = 4;
}
(y$1.prototype = new u()).h = function() {
  this.f &= -3;
  if (1 & this.f) return false;
  if (32 == (36 & this.f)) return true;
  this.f &= -5;
  if (this.g === v) return true;
  this.g = v;
  this.f |= 1;
  if (this.i > 0 && !c(this)) {
    this.f &= -2;
    return true;
  }
  var i2 = o;
  try {
    a(this);
    o = this;
    var t2 = this.x();
    if (16 & this.f || this.v !== t2 || 0 === this.i) {
      this.v = t2;
      this.f &= -17;
      this.i++;
    }
  } catch (i3) {
    this.v = i3;
    this.f |= 16;
    this.i++;
  }
  o = i2;
  l$1(this);
  this.f &= -2;
  return true;
};
y$1.prototype.S = function(i2) {
  if (void 0 === this.t) {
    this.f |= 36;
    for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.S(t2);
  }
  u.prototype.S.call(this, i2);
};
y$1.prototype.U = function(i2) {
  if (void 0 !== this.t) {
    u.prototype.U.call(this, i2);
    if (void 0 === this.t) {
      this.f &= -33;
      for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
    }
  }
};
y$1.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (var i2 = this.t; void 0 !== i2; i2 = i2.x) i2.t.N();
  }
};
Object.defineProperty(y$1.prototype, "value", { get: function() {
  if (1 & this.f) throw new Error("Cycle detected");
  var i2 = e(this);
  this.h();
  if (void 0 !== i2) i2.i = this.i;
  if (16 & this.f) throw this.v;
  return this.v;
} });
function w$1(i2) {
  return new y$1(i2);
}
function _$1(i2) {
  var r2 = i2.u;
  i2.u = void 0;
  if ("function" == typeof r2) {
    s$1++;
    var n2 = o;
    o = void 0;
    try {
      r2();
    } catch (t2) {
      i2.f &= -2;
      i2.f |= 8;
      g$1(i2);
      throw t2;
    } finally {
      o = n2;
      t();
    }
  }
}
function g$1(i2) {
  for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
  i2.x = void 0;
  i2.s = void 0;
  _$1(i2);
}
function p$1(i2) {
  if (o !== this) throw new Error("Out-of-order effect");
  l$1(this);
  o = i2;
  this.f &= -2;
  if (8 & this.f) g$1(this);
  t();
}
function b$1(i2) {
  this.x = i2;
  this.u = void 0;
  this.s = void 0;
  this.o = void 0;
  this.f = 32;
}
b$1.prototype.c = function() {
  var i2 = this.S();
  try {
    if (8 & this.f) return;
    if (void 0 === this.x) return;
    var t2 = this.x();
    if ("function" == typeof t2) this.u = t2;
  } finally {
    i2();
  }
};
b$1.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1;
  this.f &= -9;
  _$1(this);
  a(this);
  s$1++;
  var i2 = o;
  o = this;
  return p$1.bind(this, i2);
};
b$1.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 2;
    this.o = h$1;
    h$1 = this;
  }
};
b$1.prototype.d = function() {
  this.f |= 8;
  if (!(1 & this.f)) g$1(this);
};
function E(i2) {
  var t2 = new b$1(i2);
  try {
    t2.c();
  } catch (i3) {
    t2.d();
    throw i3;
  }
  return t2.d.bind(t2);
}
var s, h, l, d = [], p = [];
E(function() {
  s = this.N;
})();
function m(i2, r2) {
  l$3[i2] = r2.bind(null, l$3[i2] || function() {
  });
}
function _(i2) {
  if (l) l();
  l = i2 && i2.S();
}
function g(i2) {
  var n2 = this, f2 = i2.data, o2 = useSignal(f2);
  o2.value = f2;
  var u2 = T(function() {
    var i3 = n2, t2 = n2.__v;
    while (t2 = t2.__) if (t2.__c) {
      t2.__c.__$f |= 4;
      break;
    }
    var f3 = w$1(function() {
      var i4 = o2.value.value;
      return 0 === i4 ? 0 : true === i4 ? "" : i4 || "";
    }), u3 = w$1(function() {
      return !Array.isArray(f3.value) && !t$2(f3.value);
    }), c3 = E(function() {
      this.N = F;
      if (u3.value) {
        var n3 = f3.value;
        if (i3.__v && i3.__v.__e && 3 === i3.__v.__e.nodeType) i3.__v.__e.data = n3;
      }
    }), v3 = n2.__$u.d;
    n2.__$u.d = function() {
      c3();
      v3.call(this);
    };
    return [u3, f3];
  }, []), c2 = u2[0], v2 = u2[1];
  return c2.value ? v2.peek() : v2.value;
}
g.displayName = "_st";
Object.defineProperties(u.prototype, { constructor: { configurable: true, value: void 0 }, type: { configurable: true, value: g }, props: { configurable: true, get: function() {
  return { data: this };
} }, __b: { configurable: true, value: 1 } });
m("__b", function(i2, n2) {
  if ("string" == typeof n2.type) {
    var r2, t2 = n2.props;
    for (var f2 in t2) if ("children" !== f2) {
      var o2 = t2[f2];
      if (o2 instanceof u) {
        if (!r2) n2.__np = r2 = {};
        r2[f2] = o2;
        t2[f2] = o2.peek();
      }
    }
  }
  i2(n2);
});
m("__r", function(i2, n2) {
  _();
  var r2, t2 = n2.__c;
  if (t2) {
    t2.__$f &= -2;
    if (void 0 === (r2 = t2.__$u)) t2.__$u = r2 = function(i3) {
      var n3;
      E(function() {
        n3 = this;
      });
      n3.c = function() {
        t2.__$f |= 1;
        t2.setState({});
      };
      return n3;
    }();
  }
  h = t2;
  _(r2);
  i2(n2);
});
m("__e", function(i2, n2, r2, t2) {
  _();
  h = void 0;
  i2(n2, r2, t2);
});
m("diffed", function(i2, n2) {
  _();
  h = void 0;
  var r2;
  if ("string" == typeof n2.type && (r2 = n2.__e)) {
    var t2 = n2.__np, f2 = n2.props;
    if (t2) {
      var o2 = r2.U;
      if (o2) for (var e2 in o2) {
        var u2 = o2[e2];
        if (void 0 !== u2 && !(e2 in t2)) {
          u2.d();
          o2[e2] = void 0;
        }
      }
      else {
        o2 = {};
        r2.U = o2;
      }
      for (var a2 in t2) {
        var c2 = o2[a2], v2 = t2[a2];
        if (void 0 === c2) {
          c2 = b(r2, a2, v2, f2);
          o2[a2] = c2;
        } else c2.o(v2, f2);
      }
    }
  }
  i2(n2);
});
function b(i2, n2, r2, t2) {
  var f2 = n2 in i2 && void 0 === i2.ownerSVGElement, o2 = d$1(r2);
  return { o: function(i3, n3) {
    o2.value = i3;
    t2 = n3;
  }, d: E(function() {
    this.N = F;
    var r3 = o2.value.value;
    if (t2[n2] !== r3) {
      t2[n2] = r3;
      if (f2) i2[n2] = r3;
      else if (r3) i2.setAttribute(n2, r3);
      else i2.removeAttribute(n2);
    }
  }) };
}
m("unmount", function(i2, n2) {
  if ("string" == typeof n2.type) {
    var r2 = n2.__e;
    if (r2) {
      var t2 = r2.U;
      if (t2) {
        r2.U = void 0;
        for (var f2 in t2) {
          var o2 = t2[f2];
          if (o2) o2.d();
        }
      }
    }
  } else {
    var e2 = n2.__c;
    if (e2) {
      var u2 = e2.__$u;
      if (u2) {
        e2.__$u = void 0;
        u2.d();
      }
    }
  }
  i2(n2);
});
m("__h", function(i2, n2, r2, t2) {
  if (t2 < 3 || 9 === t2) n2.__$f |= 2;
  i2(n2, r2, t2);
});
x$1.prototype.shouldComponentUpdate = function(i2, n2) {
  var r2 = this.__$u, t2 = r2 && void 0 !== r2.s;
  for (var f2 in n2) return true;
  if (this.__f || "boolean" == typeof this.u && true === this.u) {
    var o2 = 2 & this.__$f;
    if (!(t2 || o2 || 4 & this.__$f)) return true;
    if (1 & this.__$f) return true;
  } else {
    if (!(t2 || 4 & this.__$f)) return true;
    if (3 & this.__$f) return true;
  }
  for (var e2 in i2) if ("__source" !== e2 && i2[e2] !== this.props[e2]) return true;
  for (var u2 in this.props) if (!(u2 in i2)) return true;
  return false;
};
function useSignal(i2) {
  return T(function() {
    return d$1(i2);
  }, []);
}
function useComputed(i2) {
  var n2 = A$1(i2);
  n2.current = i2;
  h.__$f |= 4;
  return T(function() {
    return w$1(function() {
      return n2.current();
    });
  }, []);
}
var y = "undefined" == typeof requestAnimationFrame ? setTimeout : function(i2) {
  var n2 = function() {
    clearTimeout(r2);
    cancelAnimationFrame(t2);
    i2();
  }, r2 = setTimeout(n2, 100), t2 = requestAnimationFrame(n2);
}, k = function(i2) {
  queueMicrotask(function() {
    queueMicrotask(i2);
  });
};
function q() {
  r(function() {
    var i2;
    while (i2 = d.shift()) s.call(i2);
  });
}
function A() {
  if (1 === d.push(this)) (l$3.requestAnimationFrame || y)(q);
}
function w() {
  r(function() {
    var i2;
    while (i2 = p.shift()) s.call(i2);
  });
}
function F() {
  if (1 === p.push(this)) (l$3.requestAnimationFrame || k)(w);
}
function useSignalEffect(i2) {
  var n2 = A$1(i2);
  n2.current = i2;
  y$2(function() {
    return E(function() {
      this.N = A;
      return n2.current();
    });
  }, []);
}
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises$2) {
      return Promise.all(promises$2.map((p2) => Promise.resolve(p2).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled(deps.map((dep) => {
      dep = assetsURL(dep);
      if (dep in seen) return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$12 = new Event("vite:preloadError", { cancelable: true });
    e$12.payload = err$2;
    window.dispatchEvent(e$12);
    if (!e$12.defaultPrevented) throw err$2;
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const SearchResults = ({ results, resultsPerPage }) => {
  const page = useSignal(1);
  const prevResults = A$1(null);
  const renderedResults = useSignal(null);
  useSignalEffect(() => {
    if (!results.value) return;
    const resetPage = prevResults.current !== results.value;
    prevResults.current = results.value;
    void page.value;
    const curPage = resetPage ? 1 : page.value;
    const rangeStart = (curPage - 1) * resultsPerPage;
    const rangeEnd = curPage * resultsPerPage;
    const searchFragments = Promise.all(
      results.value.results.slice(rangeStart, rangeEnd).map((result) => result.data().then((data) => ({ result, data })))
    );
    void searchFragments.then((searchFragments2) => {
      if (searchFragments2.length === 0) {
        renderedResults.value = /* @__PURE__ */ u$2("div", { class: "search-no-results", children: "No results" });
        if (resetPage) page.value = 0;
        return;
      }
      if (resetPage) {
        page.value = 1;
      }
      renderedResults.value = searchFragments2.map(({ result, data }) => {
        const hasRootSubResult = data.sub_results[0]?.url === (data.meta?.url || data.url);
        const subResults = hasRootSubResult ? data.sub_results.slice(1, 4) : data.sub_results.slice(0, 3);
        return /* @__PURE__ */ u$2("a", { class: "search-result", href: data.url, children: [
          /* @__PURE__ */ u$2("header", { class: "result-title", children: data.meta.title ?? "No Title" }),
          /* @__PURE__ */ u$2("div", { class: "result-excerpt", dangerouslySetInnerHTML: { __html: data.excerpt } }),
          subResults.map((subResult) => {
            return /* @__PURE__ */ u$2("a", { className: "search-sub-result", href: subResult.url, children: [
              /* @__PURE__ */ u$2("header", { class: "sub-result-title", children: subResult.title }),
              /* @__PURE__ */ u$2(
                "div",
                {
                  class: "sub-result-excerpt",
                  dangerouslySetInnerHTML: { __html: subResult.excerpt }
                }
              )
            ] });
          })
        ] }, result.id);
      });
    });
  });
  const numPages = results.value ? Math.ceil(results.value.results.length / resultsPerPage) : 0;
  const prevPage = useComputed(() => () => {
    if (page.value > 1) page.value--;
  });
  const nextPage = useComputed(() => () => {
    if (page.value < numPages) page.value++;
  });
  const setPageFromEvent = useComputed(() => (event) => {
    const numValue = Number(event.currentTarget.value);
    if (!Number.isFinite(numValue)) {
      return;
    }
    page.value = Math.max(1, Math.min(numValue, numPages));
  });
  if (!results.value) return null;
  return /* @__PURE__ */ u$2("div", { class: "search-results", children: [
    /* @__PURE__ */ u$2("div", { class: "pagination", children: [
      /* @__PURE__ */ u$2(
        "button",
        {
          class: "icon-button arrow-left",
          onClick: prevPage.value,
          disabled: page.value <= 1,
          title: "Previous page"
        }
      ),
      /* @__PURE__ */ u$2(
        "input",
        {
          type: "number",
          class: "search-results-page-input",
          value: page.value,
          onChange: setPageFromEvent.value,
          disabled: numPages === 0
        }
      ),
      /* @__PURE__ */ u$2("span", { children: [
        " of ",
        numPages
      ] }),
      /* @__PURE__ */ u$2(
        "button",
        {
          class: "icon-button arrow-right",
          onClick: nextPage.value,
          disabled: page.value >= numPages,
          title: "Next page"
        }
      )
    ] }),
    /* @__PURE__ */ u$2("div", { class: "search-results-list", children: renderedResults.value })
  ] });
};
function main() {
  const searchInput = document.getElementById("search-input");
  let initializing = false;
  let initialized = false;
  let pagefindPromise;
  const getAndInitPagefind = async () => {
    if (initializing) return pagefindPromise;
    initializing = true;
    const oldPlaceholder = searchInput.getAttribute("placeholder");
    setTimeout(() => {
      if (initialized) return;
      searchInput.setAttribute("placeholder", "Loading...");
      searchInput.classList.add("loading");
    }, 100);
    pagefindPromise = __vitePreload(() => import("./pagefind-yfo5X-UC.js"), true ? [] : void 0).then(async (pagefind) => {
      await pagefind.init();
      void pagefind.preload("").then(() => {
        searchInput.setAttribute("placeholder", oldPlaceholder);
        searchInput.classList.remove("loading");
      });
      initialized = true;
      return pagefind;
    });
    return pagefindPromise;
  };
  const searchResultsContainer = document.getElementById("search-results-container");
  const observer = new ResizeObserver(([navbar]) => {
    searchResultsContainer.style.top = `${navbar.borderBoxSize[0].blockSize}px`;
  });
  observer.observe(document.getElementById("navigation-bar"));
  const resultsSignal = d$1(null);
  searchInput.addEventListener("input", (event) => {
    updateSearchClear();
    const text = event.currentTarget.value;
    if (!text) {
      resultsSignal.value = null;
      return;
    }
    void getAndInitPagefind().then((pagefind) => pagefind.debouncedSearch(text)).then((results) => {
      if (results) {
        resultsSignal.value = results;
      }
    });
  });
  searchInput.addEventListener("focus", () => {
    void getAndInitPagefind();
  }, { once: true });
  searchInput.removeAttribute("disabled");
  searchInput.value = "";
  const searchOpenButton = document.getElementById("search-open");
  const searchArea = document.getElementById("search-area");
  searchOpenButton.addEventListener("click", () => {
    if (searchArea.classList.contains("open")) {
      searchArea.classList.remove("open");
    } else {
      searchArea.classList.add("open");
      searchInput.focus();
    }
    updateSearchClear();
  });
  const searchClearButton = document.getElementById("search-clear");
  searchClearButton.addEventListener("click", () => {
    searchInput.value = "";
    resultsSignal.value = null;
    searchArea.classList.remove("open");
    updateSearchClear();
  });
  const updateSearchClear = () => {
    if (searchArea.classList.contains("open") || searchInput.value.length > 0) {
      searchClearButton.classList.add("active");
    } else {
      searchClearButton.classList.remove("active");
    }
  };
  updateSearchClear();
  E$1(
    /* @__PURE__ */ u$2(SearchResults, { results: resultsSignal, resultsPerPage: 5 }),
    searchResultsContainer
  );
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
export {
  A$1 as A,
  E,
  K,
  T,
  __vitePreload as _,
  _$2 as a,
  useSignal as b,
  useComputed as c,
  d$1 as d,
  d$2 as e,
  E$1 as f,
  g$2 as g,
  k$2 as k,
  n,
  q$1 as q,
  r,
  u$2 as u,
  w$1 as w,
  x,
  y$2 as y
};
