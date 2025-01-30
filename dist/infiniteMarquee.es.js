import $, { gsap as i } from "gsap";
function J(n, s) {
  let h;
  return n = i.utils.toArray(n), s = s || {}, i.context(() => {
    let x = s.onChange, P = 0, e = i.timeline({ repeat: s.repeat, onUpdate: x && function() {
      let t = e.closestIndex();
      P !== t && (P = t, x(n[t], t));
    }, paused: s.paused, defaults: { ease: "none" }, onReverseComplete: () => e.totalTime(e.rawTime() + e.duration() * 100) }), u = n.length, b = n[0].offsetLeft, d = [], g = [], y = [], w = [], l = 0, T = !1, f = s.center, I = (s.speed || 1) * 100, v = s.snap === !1 ? (t) => t : i.utils.snap(s.snap || 1), W = 0, X = f === !0 ? n[0].parentNode : i.utils.toArray(f)[0] || n[0].parentNode, m, j = () => n[u - 1].offsetLeft + w[u - 1] / 100 * g[u - 1] - b + y[0] + n[u - 1].offsetWidth * i.getProperty(n[u - 1], "scaleX") + (parseFloat(s.paddingRight) || 0), A = () => {
      let t = X.getBoundingClientRect(), r;
      n.forEach((o, a) => {
        g[a] = parseFloat(i.getProperty(o, "width", "px")), w[a] = v(parseFloat(i.getProperty(o, "x", "px")) / g[a] * 100 + i.getProperty(o, "xPercent")), r = o.getBoundingClientRect(), y[a] = r.left - (a ? t.right : t.left), t = r;
      }), i.set(n, {
        // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (o) => w[o]
      }), m = j();
    }, C, z = () => {
      W = f ? e.duration() * (X.offsetWidth / 2) / m : 0, f && d.forEach((t, r) => {
        d[r] = C(e.labels["label" + r] + e.duration() * g[r] / 2 / m - W);
      });
    }, D = (t, r, o) => {
      let a = t.length, p = 1e10, R = 0, c;
      for (; a--; )
        c = Math.abs(t[a] - r), c > o / 2 && (c = o - c), c < p && (p = c, R = a);
      return R;
    }, O = () => {
      let t, r, o, a, p;
      for (e.clear(), t = 0; t < u; t++)
        r = n[t], o = w[t] / 100 * g[t], a = r.offsetLeft + o - b + y[0], p = a + g[t] * i.getProperty(r, "scaleX"), e.to(r, { xPercent: v((o - p) / g[t] * 100), duration: p / I }, 0).fromTo(r, { xPercent: v((o - p + m) / g[t] * 100) }, { xPercent: w[t], duration: (o - p + m - o) / I, immediateRender: !1 }, p / I).add("label" + t, a / I), d[t] = a / I;
      C = i.utils.wrap(0, e.duration());
    }, k = (t) => {
      let r = e.progress();
      e.progress(0, !0), A(), t && O(), z(), t && e.draggable ? e.time(d[l], !0) : e.progress(r, !0);
    }, F = () => k(!0), B;
    i.set(n, { x: 0 }), A(), O(), z(), window.addEventListener("resize", F);
    function M(t, r) {
      r = r || {}, Math.abs(t - l) > u / 2 && (t += t > l ? -u : u);
      let o = i.utils.wrap(0, u, t), a = d[o];
      return a > e.time() != t > l && t !== l && (a += e.duration() * (t > l ? 1 : -1)), (a < 0 || a > e.duration()) && (r.modifiers = { time: C }), l = o, r.overwrite = !0, i.killTweensOf(B), r.duration === 0 ? e.time(C(a)) : e.tweenTo(a, r);
    }
    if (e.toIndex = (t, r) => M(t, r), e.closestIndex = (t) => {
      let r = D(d, e.time(), e.duration());
      return t && (l = r, T = !1), r;
    }, e.current = () => T ? e.closestIndex(!0) : l, e.next = (t) => M(e.current() + 1, t), e.previous = (t) => M(e.current() - 1, t), e.times = d, e.progress(1, !0).progress(0, !0), s.reversed && (e.vars.onReverseComplete(), e.reverse()), s.draggable && typeof Draggable == "function") {
      B = document.createElement("div");
      let t = i.utils.wrap(0, 1), r, o, a, p, R, c, N = () => e.progress(t(o + (a.startX - a.x) * r)), S = () => e.closestIndex(!0);
      typeof InertiaPlugin > "u" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club"), a = Draggable.create(B, {
        trigger: n[0].parentNode,
        type: "x",
        onPressInit() {
          let E = this.x;
          i.killTweensOf(e), c = !e.paused(), e.pause(), o = e.progress(), k(), r = 1 / m, R = o / -r - E, i.set(B, { x: o / -r });
        },
        onDrag: N,
        onThrowUpdate: N,
        overshootTolerance: 0,
        inertia: !0,
        snap(E) {
          if (Math.abs(o / -r - this.x) < 10)
            return p + R;
          let U = -(E * r) * e.duration(), q = C(U), G = d[D(d, q, e.duration())], L = G - q;
          return Math.abs(L) > e.duration() / 2 && (L += L < 0 ? e.duration() : -e.duration()), p = (U + L) / e.duration() / -r, p;
        },
        onRelease() {
          S(), a.isThrowing && (T = !0);
        },
        onThrowComplete: () => {
          S(), c && e.play();
        }
      })[0], e.draggable = a;
    }
    return e.closestIndex(!0), P = l, x && x(n[l], l), h = e, () => window.removeEventListener("resize", F);
  }), h;
}
function K(n, s) {
  if (n = $.utils.toArray(n), !Array.isArray(n) || n.length === 0)
    return null;
  s = s || {};
  let h = n[0].getBoundingClientRect(), x = n[n.length - 1].getBoundingClientRect();
  if (!h || !x)
    return null;
  let P = h.top - h.height - Math.abs(n[1].getBoundingClientRect().top - h.bottom), e = x.top, u = e - P, b = s.speed * 100 || 1, d = Math.abs(u / b), g = $.timeline({ repeat: s.repeat || -1, paused: s.paused || !1 }), y = b < 0 ? "-=" : "+=", w = b < 0 ? "+=" : "-=";
  return n.forEach((l) => {
    if (l) {
      let T = l.getBoundingClientRect(), f = Math.abs((e - T.top) / u);
      b < 0 && (f = 1 - f), g.to(
        l,
        {
          y: y + u * f,
          duration: d * f,
          ease: "none"
        },
        0
      ), g.fromTo(
        l,
        {
          y: w + u
        },
        {
          y: y + (1 - f) * u,
          ease: "none",
          duration: (1 - f) * d,
          immediateRender: !1
        },
        d * f
      );
    }
  }), g;
}
export {
  J as horizontalLoop,
  K as verticalLoop
};
