import f, { gsap as c } from "gsap";
function J(s, i) {
  let O;
  return s = c.utils.toArray(s), i = i || {}, c.context(() => {
    let P = i.onChange, L = 0, e = c.timeline({ repeat: i.repeat, onUpdate: P && function() {
      let o = e.closestIndex();
      L !== o && (L = o, P(s[o], o));
    }, paused: i.paused, defaults: { ease: "none" }, onReverseComplete: () => e.totalTime(e.rawTime() + e.duration() * 100) }), g = s.length, M = s[0].offsetLeft, p = [], h = [], C = [], y = [], d = 0, b = !1, A = i.center, T = (i.speed || 1) * 100, R = i.snap === !1 ? (o) => o : c.utils.snap(i.snap || 1), W = 0, z = A === !0 ? s[0].parentNode : c.utils.toArray(A)[0] || s[0].parentNode, m, q = () => s[g - 1].offsetLeft + y[g - 1] / 100 * h[g - 1] - M + C[0] + s[g - 1].offsetWidth * c.getProperty(s[g - 1], "scaleX") + (parseFloat(i.paddingRight) || 0), B = () => {
      let o = z.getBoundingClientRect(), t;
      s.forEach((r, n) => {
        h[n] = parseFloat(c.getProperty(r, "width", "px")), y[n] = R(parseFloat(c.getProperty(r, "x", "px")) / h[n] * 100 + c.getProperty(r, "xPercent")), t = r.getBoundingClientRect(), C[n] = t.left - (n ? o.right : o.left), o = t;
      }), c.set(s, {
        // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (r) => y[r]
      }), m = q();
    }, w, F = () => {
      W = A ? e.duration() * (z.offsetWidth / 2) / m : 0, A && p.forEach((o, t) => {
        p[t] = w(e.labels["label" + t] + e.duration() * h[t] / 2 / m - W);
      });
    }, N = (o, t, r) => {
      let n = o.length, a = 1e10, u = 0, l;
      for (; n--; )
        l = Math.abs(o[n] - t), l > r / 2 && (l = r - l), l < a && (a = l, u = n);
      return u;
    }, X = () => {
      let o, t, r, n, a;
      for (e.clear(), o = 0; o < g; o++)
        t = s[o], r = y[o] / 100 * h[o], n = t.offsetLeft + r - M + C[0], a = n + h[o] * c.getProperty(t, "scaleX"), e.to(t, { xPercent: R((r - a) / h[o] * 100), duration: a / T }, 0).fromTo(t, { xPercent: R((r - a + m) / h[o] * 100) }, { xPercent: y[o], duration: (r - a + m - r) / T, immediateRender: !1 }, a / T).add("label" + o, n / T), p[o] = n / T;
      w = c.utils.wrap(0, e.duration());
    }, k = (o) => {
      let t = e.progress();
      e.progress(0, !0), B(), o && X(), F(), o && e.draggable ? e.time(p[d], !0) : e.progress(t, !0);
    }, S = () => k(!0), v;
    c.set(s, { x: 0 }), B(), X(), F(), window.addEventListener("resize", S);
    function I(o, t) {
      t = t || {}, Math.abs(o - d) > g / 2 && (o += o > d ? -g : g);
      let r = c.utils.wrap(0, g, o), n = p[r];
      return n > e.time() != o > d && o !== d && (n += e.duration() * (o > d ? 1 : -1)), (n < 0 || n > e.duration()) && (t.modifiers = { time: w }), d = r, t.overwrite = !0, c.killTweensOf(v), t.duration === 0 ? e.time(w(n)) : e.tweenTo(n, t);
    }
    if (e.toIndex = (o, t) => I(o, t), e.closestIndex = (o) => {
      let t = N(p, e.time(), e.duration());
      return o && (d = t, b = !1), t;
    }, e.current = () => b ? e.closestIndex(!0) : d, e.next = (o) => I(e.current() + 1, o), e.previous = (o) => I(e.current() - 1, o), e.times = p, e.progress(1, !0).progress(0, !0), i.reversed && (e.vars.onReverseComplete(), e.reverse()), i.draggable && typeof Draggable == "function") {
      v = document.createElement("div");
      let o = c.utils.wrap(0, 1), t, r, n, a, u, l, x = () => e.progress(o(r + (n.startX - n.x) * t)), Y = () => e.closestIndex(!0);
      typeof InertiaPlugin > "u" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club"), n = Draggable.create(v, {
        trigger: s[0].parentNode,
        type: "x",
        onPressInit() {
          let D = this.x;
          c.killTweensOf(e), l = !e.paused(), e.pause(), r = e.progress(), k(), t = 1 / m, u = r / -t - D, c.set(v, { x: r / -t });
        },
        onDrag: x,
        onThrowUpdate: x,
        overshootTolerance: 0,
        inertia: !0,
        snap(D) {
          if (Math.abs(r / -t - this.x) < 10)
            return a + u;
          let H = -(D * t) * e.duration(), E = w(H), $ = p[N(p, E, e.duration())], U = $ - E;
          return Math.abs(U) > e.duration() / 2 && (U += U < 0 ? e.duration() : -e.duration()), a = (H + U) / e.duration() / -t, a;
        },
        onRelease() {
          Y(), n.isThrowing && (b = !0);
        },
        onThrowComplete: () => {
          Y(), l && e.play();
        }
      })[0], e.draggable = n;
    }
    return e.closestIndex(!0), L = d, P && P(s[d], d), O = e, () => window.removeEventListener("resize", S);
  }), O;
}
function K(s, i) {
  let O;
  return s = f.utils.toArray(s), i = i || {}, f.context(() => {
    let P = i.onChange, L = 0, e = f.timeline({ repeat: i.repeat, onUpdate: P && function() {
      let t = e.closestIndex();
      L !== t && (L = t, P(s[t], t));
    }, paused: i.paused, defaults: { ease: "none" }, onReverseComplete: () => e.totalTime(e.rawTime() + e.duration() * 100) }), g = s.length, M = s[0].offsetTop, p = [], h = [], C = [], y = [], d = 0, b = i.center, A = (t) => {
      let r = {}, n;
      for (n in t)
        r[n] = t[n];
      return r;
    }, T = (i.speed || 1) * 100, R = i.snap === !1 ? (t) => t : f.utils.snap(i.snap || 1), W = 0, z = b === !0 ? s[0].parentNode : f.utils.toArray(b)[0] || s[0].parentNode, m, q = () => s[g - 1].offsetTop + y[g - 1] / 100 * h[g - 1] - M + C[0] + s[g - 1].offsetHeight * f.getProperty(s[g - 1], "scaleY") + (parseFloat(i.paddingBottom) || 0), B = () => {
      let t = z.getBoundingClientRect(), r;
      M = s[0].offsetTop, s.forEach((n, a) => {
        h[a] = parseFloat(f.getProperty(n, "height", "px")), y[a] = R(parseFloat(f.getProperty(n, "y", "px")) / h[a] * 100 + f.getProperty(n, "yPercent")), r = n.getBoundingClientRect(), C[a] = r.top - (a ? t.bottom : t.top), t = r;
      }), f.set(s, {
        // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        yPercent: (n) => y[n]
      }), m = q();
    }, w, F = () => {
      W = b ? e.duration() * (z.offsetWidth / 2) / m : 0, b && p.forEach((t, r) => {
        p[r] = w(e.labels["label" + r] + e.duration() * h[r] / 2 / m - W);
      });
    }, N = (t, r, n) => {
      let a = t.length, u = 1e10, l = 0, x;
      for (; a--; )
        x = Math.abs(t[a] - r), x > n / 2 && (x = n - x), x < u && (u = x, l = a);
      return l;
    }, X = () => {
      let t, r, n, a, u;
      for (e.clear(), t = 0; t < g; t++)
        r = s[t], n = y[t] / 100 * h[t], a = r.offsetTop + n - M + C[0], u = a + h[t] * f.getProperty(r, "scaleY"), e.to(r, { yPercent: R((n - u) / h[t] * 100), duration: u / T }, 0).fromTo(r, { yPercent: R((n - u + m) / h[t] * 100) }, { yPercent: y[t], duration: (n - u + m - n) / T, immediateRender: !1 }, u / T).add("label" + t, a / T), p[t] = a / T;
      w = f.utils.wrap(0, e.duration());
    }, k = () => {
      let { enterAnimation: t, leaveAnimation: r } = i, n = e.duration() / s.length;
      s.forEach((a, u) => {
        let l = t && t(a, n, u), x = l && e.duration() - w(p[u] - Math.min(n, l.duration())) < n - 0.05;
        l && e.add(l, x ? 0 : w(p[u] - l.duration())), l = r && r(a, n, u), x = p[u] === e.duration(), l && l.duration() > n && l.duration(n), l && e.add(l, x ? 0 : p[u]);
      });
    }, S = (t) => {
      let r = e.progress();
      e.progress(0, !0), B(), t && X(), F(), k(), t && e.draggable ? e.time(p[d], !0) : e.progress(r, !0);
    }, v = () => S(!0), I;
    f.set(s, { y: 0 }), B(), X(), F(), k(), window.addEventListener("resize", v);
    function o(t, r) {
      r = A(r), Math.abs(t - d) > g / 2 && (t += t > d ? -g : g);
      let n = f.utils.wrap(0, g, t), a = p[n];
      return a > e.time() != t > d && (a += e.duration() * (t > d ? 1 : -1)), r.revolutions && (a += e.duration() * Math.round(r.revolutions), delete r.revolutions), (a < 0 || a > e.duration()) && (r.modifiers = { time: w }), d = n, r.overwrite = !0, f.killTweensOf(I), e.tweenTo(a, r);
    }
    if (e.elements = s, e.next = (t) => o(d + 1, t), e.previous = (t) => o(d - 1, t), e.current = () => d, e.toIndex = (t, r) => o(t, r), e.closestIndex = (t) => {
      let r = N(p, e.time(), e.duration());
      return t && (d = r), r;
    }, e.times = p, e.progress(1, !0).progress(0, !0), i.reversed && (e.vars.onReverseComplete(), e.reverse()), i.draggable && typeof Draggable == "function") {
      I = document.createElement("div");
      let t = f.utils.wrap(0, 1), r, n, a, u = () => e.progress(t(n + (a.startY - a.y) * r)), l = () => e.closestIndex(!0);
      typeof InertiaPlugin > "u" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://gsap.com/pricing"), a = Draggable.create(I, {
        trigger: s[0].parentNode,
        type: "y",
        onPressInit() {
          f.killTweensOf(e), n = e.progress(), S(), r = 1 / m, f.set(I, { y: n / -r });
        },
        onDrag: u,
        onThrowUpdate: u,
        inertia: !0,
        snap: (x) => {
          let Y = -(x * r) * e.duration(), D = w(Y), H = p[N(p, D, e.duration())], E = H - D;
          return Math.abs(E) > e.duration() / 2 && (E += E < 0 ? e.duration() : -e.duration()), (Y + E) / e.duration() / -r;
        },
        onRelease: l,
        onThrowComplete: l
      })[0], e.draggable = a;
    }
    return e.closestIndex(!0), P && P(s[d], d), O = e, () => window.removeEventListener("resize", v);
  }), O;
}
export {
  J as horizontalLoop,
  K as verticalLoop
};
