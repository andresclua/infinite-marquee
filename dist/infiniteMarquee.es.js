import g, { gsap as x } from "gsap";
function $(n, s) {
  n = x.utils.toArray(n), s = s || {};
  let i = x.timeline({ repeat: s.repeat, paused: s.paused, defaults: { ease: "none" }, onReverseComplete: () => i.totalTime(i.rawTime() + i.duration() * 100) }), y = n.length, M = n[0].offsetLeft, e = [], c = [], b = [], l = 0, P = (s.speed || 1) * 100, C = s.snap === !1 ? (p) => p : x.utils.snap(s.snap || 1), I, d, v, R, T, m;
  for (x.set(n, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (p, f) => {
      let A = c[p] = parseFloat(x.getProperty(f, "width", "px"));
      return b[p] = C(parseFloat(x.getProperty(f, "x", "px")) / A * 100 + x.getProperty(f, "xPercent")), b[p];
    }
  }), x.set(n, { x: 0 }), I = n[y - 1].offsetLeft + b[y - 1] / 100 * c[y - 1] - M + n[y - 1].offsetWidth * x.getProperty(n[y - 1], "scaleX") + (parseFloat(s.paddingRight) || 0), m = 0; m < y; m++)
    T = n[m], d = b[m] / 100 * c[m], v = T.offsetLeft + d - M, R = v + c[m] * x.getProperty(T, "scaleX"), i.to(T, { xPercent: C((d - R) / c[m] * 100), duration: R / P }, 0).fromTo(T, { xPercent: C((d - R + I) / c[m] * 100) }, { xPercent: b[m], duration: (d - R + I - d) / P, immediateRender: !1 }, R / P).add("label" + m, v / P), e[m] = v / P;
  function L(p, f) {
    f = f || {}, Math.abs(p - l) > y / 2 && (p += p > l ? -y : y);
    let A = x.utils.wrap(0, y, p), E = e[A];
    return E > i.time() != p > l && (f.modifiers = { time: x.utils.wrap(0, i.duration()) }, E += i.duration() * (p > l ? 1 : -1)), l = A, f.overwrite = !0, i.tweenTo(E, f);
  }
  return i.next = (p) => L(l + 1, p), i.previous = (p) => L(l - 1, p), i.current = () => l, i.toIndex = (p, f) => L(p, f), i.times = e, i.progress(1, !0).progress(0, !0), s.reversed && (i.vars.onReverseComplete(), i.reverse()), i;
}
function G(n, s) {
  let i;
  return n = g.utils.toArray(n), s = s || {}, g.context(() => {
    let y = s.onChange, M = 0, e = g.timeline({ repeat: s.repeat, onUpdate: y && function() {
      let t = e.closestIndex();
      M !== t && (M = t, y(n[t], t));
    }, paused: s.paused, defaults: { ease: "none" }, onReverseComplete: () => e.totalTime(e.rawTime() + e.duration() * 100) }), c = n.length, b = n[0].offsetTop, l = [], P = [], C = [], I = [], d = 0, v = s.center, R = (t) => {
      let r = {}, o;
      for (o in t)
        r[o] = t[o];
      return r;
    }, T = (s.speed || 1) * 100, m = s.snap === !1 ? (t) => t : g.utils.snap(s.snap || 1), L = 0, p = v === !0 ? n[0].parentNode : g.utils.toArray(v)[0] || n[0].parentNode, f, A = () => n[c - 1].offsetTop + I[c - 1] / 100 * P[c - 1] - b + C[0] + n[c - 1].offsetHeight * g.getProperty(n[c - 1], "scaleY") + (parseFloat(s.paddingBottom) || 0), E = () => {
      let t = p.getBoundingClientRect(), r;
      b = n[0].offsetTop, n.forEach((o, a) => {
        P[a] = parseFloat(g.getProperty(o, "height", "px")), I[a] = m(parseFloat(g.getProperty(o, "y", "px")) / P[a] * 100 + g.getProperty(o, "yPercent")), r = o.getBoundingClientRect(), C[a] = r.top - (a ? t.bottom : t.top), t = r;
      }), g.set(n, {
        // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        yPercent: (o) => I[o]
      }), f = A();
    }, F, D = () => {
      L = v ? e.duration() * (p.offsetWidth / 2) / f : 0, v && l.forEach((t, r) => {
        l[r] = F(e.labels["label" + r] + e.duration() * P[r] / 2 / f - L);
      });
    }, H = (t, r, o) => {
      let a = t.length, u = 1e10, h = 0, w;
      for (; a--; )
        w = Math.abs(t[a] - r), w > o / 2 && (w = o - w), w < u && (u = w, h = a);
      return h;
    }, O = () => {
      let t, r, o, a, u;
      for (e.clear(), t = 0; t < c; t++)
        r = n[t], o = I[t] / 100 * P[t], a = r.offsetTop + o - b + C[0], u = a + P[t] * g.getProperty(r, "scaleY"), e.to(r, { yPercent: m((o - u) / P[t] * 100), duration: u / T }, 0).fromTo(r, { yPercent: m((o - u + f) / P[t] * 100) }, { yPercent: I[t], duration: (o - u + f - o) / T, immediateRender: !1 }, u / T).add("label" + t, a / T), l[t] = a / T;
      F = g.utils.wrap(0, e.duration());
    }, S = () => {
      let { enterAnimation: t, leaveAnimation: r } = s, o = e.duration() / n.length;
      n.forEach((a, u) => {
        let h = t && t(a, o, u), w = h && e.duration() - F(l[u] - Math.min(o, h.duration())) < o - 0.05;
        h && e.add(h, w ? 0 : F(l[u] - h.duration())), h = r && r(a, o, u), w = l[u] === e.duration(), h && h.duration() > o && h.duration(o), h && e.add(h, w ? 0 : l[u]);
      });
    }, W = (t) => {
      let r = e.progress();
      e.progress(0, !0), E(), t && O(), D(), S(), t && e.draggable ? e.time(l[d], !0) : e.progress(r, !0);
    }, X = () => W(!0), Y;
    g.set(n, { y: 0 }), E(), O(), D(), S(), window.addEventListener("resize", X);
    function B(t, r) {
      r = R(r), Math.abs(t - d) > c / 2 && (t += t > d ? -c : c);
      let o = g.utils.wrap(0, c, t), a = l[o];
      return a > e.time() != t > d && (a += e.duration() * (t > d ? 1 : -1)), r.revolutions && (a += e.duration() * Math.round(r.revolutions), delete r.revolutions), (a < 0 || a > e.duration()) && (r.modifiers = { time: F }), d = o, r.overwrite = !0, g.killTweensOf(Y), e.tweenTo(a, r);
    }
    if (e.elements = n, e.next = (t) => B(d + 1, t), e.previous = (t) => B(d - 1, t), e.current = () => d, e.toIndex = (t, r) => B(t, r), e.closestIndex = (t) => {
      let r = H(l, e.time(), e.duration());
      return t && (d = r), r;
    }, e.times = l, e.progress(1, !0).progress(0, !0), s.reversed && (e.vars.onReverseComplete(), e.reverse()), s.draggable && typeof Draggable == "function") {
      Y = document.createElement("div");
      let t = g.utils.wrap(0, 1), r, o, a, u = () => e.progress(t(o + (a.startY - a.y) * r)), h = () => e.closestIndex(!0);
      typeof InertiaPlugin > "u" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://gsap.com/pricing"), a = Draggable.create(Y, {
        trigger: n[0].parentNode,
        type: "y",
        onPressInit() {
          g.killTweensOf(e), o = e.progress(), W(), r = 1 / f, g.set(Y, { y: o / -r });
        },
        onDrag: u,
        onThrowUpdate: u,
        inertia: !0,
        snap: (w) => {
          let N = -(w * r) * e.duration(), k = F(N), U = l[H(l, k, e.duration())], z = U - k;
          return Math.abs(z) > e.duration() / 2 && (z += z < 0 ? e.duration() : -e.duration()), (N + z) / e.duration() / -r;
        },
        onRelease: h,
        onThrowComplete: h
      })[0], e.draggable = a;
    }
    return e.closestIndex(!0), y && y(n[d], d), i = e, () => window.removeEventListener("resize", X);
  }), i;
}
export {
  $ as horizontalLoop,
  G as verticalLoop
};
