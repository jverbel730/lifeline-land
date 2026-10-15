/* LIFELINE — page behaviour: nav state, scroll reveals, canopy compare,
   hotspots and the image lightbox. Everything works without it; this only adds. */
(function () {
  document.documentElement.classList.add("js");

  // Nav turns solid once the hero has scrolled away.
  var nav = document.querySelector("[data-nav]");
  var hero = document.querySelector(".hero");
  if (nav && hero) {
    var ticking = false;
    var update = function () {
      nav.classList.toggle("is-solid", hero.getBoundingClientRect().bottom <= nav.offsetHeight);
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // Reveal on scroll.
  var items = document.querySelectorAll("[data-rv]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Canopy open / closed compare.
  document.querySelectorAll("[data-compare]").forEach(function (c) {
    var r = c.querySelector(".compare-range");
    var set = function () { c.style.setProperty("--pos", r.value + "%"); };
    r.addEventListener("input", set);
    set();
  });

  // Hotspots: position each tip next to its dot, keep it inside the image.
  var spots = document.querySelectorAll(".hs");
  function closeAll(except) {
    spots.forEach(function (b) {
      if (b === except) return;
      delete b.dataset.pinned;
      b.classList.remove("is-open");
      b.setAttribute("aria-expanded", "false");
      var t = document.getElementById(b.getAttribute("aria-describedby"));
      if (t) t.classList.remove("is-open");
    });
  }
  function place(b, tip) {
    var box = b.parentElement.getBoundingClientRect();
    var x = b.offsetLeft, y = b.offsetTop;
    var w = tip.offsetWidth, h = tip.offsetHeight;
    var left = x + 26, top = y - h / 2;
    if (left + w > box.width - 8) left = x - 26 - w;
    if (left < 8) left = Math.max(8, Math.min(box.width - w - 8, x - w / 2));
    top = Math.max(8, Math.min(top, box.height - h - 8));
    if (left === Math.max(8, Math.min(box.width - w - 8, x - w / 2))) top = Math.min(box.height - h - 8, y + 26);
    tip.style.setProperty("--tx", left + "px");
    tip.style.setProperty("--ty", top + "px");
  }
  spots.forEach(function (b) {
    var tip = document.getElementById(b.getAttribute("aria-describedby"));
    b.setAttribute("aria-expanded", "false");
    var open = function () { closeAll(b); place(b, tip); b.classList.add("is-open"); b.setAttribute("aria-expanded", "true"); tip.classList.add("is-open"); };
    var shut = function () { delete b.dataset.pinned; b.classList.remove("is-open"); b.setAttribute("aria-expanded", "false"); tip.classList.remove("is-open"); };
    // Hover previews a tip; a click (or tap) pins it until clicked again or elsewhere.
    b.addEventListener("mouseenter", open);
    b.addEventListener("mouseleave", function () { if (!b.dataset.pinned) shut(); });
    b.addEventListener("focus", open);
    b.addEventListener("blur", function () { if (!b.dataset.pinned) shut(); });
    b.addEventListener("click", function (ev) {
      ev.stopPropagation();
      if (b.dataset.pinned) { shut(); return; }
      open();
      b.dataset.pinned = "1";
    });
  });
  document.addEventListener("click", function () { spots.forEach(function (b) { delete b.dataset.pinned; }); closeAll(null); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(null); });

  // Lightbox: click any zoomable image to see the largest version.
  var lb = document.querySelector("[data-lightbox]");
  if (lb && typeof lb.showModal === "function") {
    var big = lb.querySelector("img");
    document.querySelectorAll("img.zoom").forEach(function (img) {
      img.addEventListener("click", function () {
        var set = (img.getAttribute("srcset") || "").split(",").map(function (s) { return s.trim().split(" ")[0]; });
        big.src = set[set.length - 1] || img.currentSrc || img.src;
        big.alt = img.alt;
        lb.showModal();
      });
    });
    lb.addEventListener("click", function () { lb.close(); });
    lb.addEventListener("close", function () { big.removeAttribute("src"); });
  }
})();
