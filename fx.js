/* ZayyStore — efek animasi (aman dihapus). */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  document.documentElement.classList.add("fx");

  /* muncul saat discroll */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    e.target.classList.remove("fx-pre"); e.target.classList.add("fx-in");
  }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  const watch = (el, i = 0) => {
    if (!el || el.dataset.fx) return;
    el.dataset.fx = "1"; el.style.setProperty("--fxd", Math.min(i, 8) * 0.07 + "s");
    el.classList.add("fx-pre"); io.observe(el);
  };
  const scan = () => {
    document.querySelectorAll(".collab-banner,.sv-head,.sv-hot-head,.sv-tabs,.how-card,.newsletter").forEach((el, i) => watch(el, 0));
    document.querySelectorAll(".product-grid").forEach((g) => [...g.children].forEach((c, i) => watch(c, i % 4)));
  };
  scan();
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });

  /* miring 3D halus + posisi kilau mengikuti kursor (mouse saja) */
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const c = e.target.closest && e.target.closest(".sv-card.product-card");
    if (!c) return;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    c.style.setProperty("--ry", (x * 7).toFixed(2) + "deg");
    c.style.setProperty("--rx", (-y * 7).toFixed(2) + "deg");
  }, { passive: true });
  document.addEventListener("pointerout", (e) => {
    const c = e.target.closest && e.target.closest(".sv-card.product-card");
    if (c && !c.contains(e.relatedTarget)) { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); }
  }, { passive: true });

  /* partikel pixel melayang */
  const bits = document.createElement("div"); bits.className = "fx-bits"; bits.setAttribute("aria-hidden", "true");
  const n = innerWidth < 700 ? 9 : 18;
  for (let i = 0; i < n; i++) {
    const b = document.createElement("i");
    b.style.cssText = `--x:${Math.random() * 100}%;--s:${5 + Math.random() * 7}px;--t:${12 + Math.random() * 14}s;--d:${-Math.random() * 20}s`;
    bits.appendChild(b);
  }
  document.body.appendChild(bits);
})();
