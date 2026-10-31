(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      if (open) mobileNav.setAttribute("hidden", "");
      else mobileNav.removeAttribute("hidden");
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("hidden", "");
      });
    });
  }

  /*
   * TODO(stripe): paste each Stripe Payment Link below (e.g. "https://buy.stripe.com/xxxx").
   * When a link is set, the matching pack button goes straight to Stripe checkout.
   * While a link is empty, the button scrolls to the request form (mailto hello@guideily.com).
   */
  var STRIPE_LINKS = {
    sample: "",  // $149 Sample — 20 verified ICP leads
    lead: "",    // $497 Lead Pack — 100 verified leads + first lines
    meeting: ""  // $899 Outbound Pack — done-for-you outbound
  };

  var PACK_LABELS = {
    sample: "Sample ($149, 20 leads)",
    lead: "Lead Pack ($497)",
    meeting: "Outbound Pack ($899)",
    unsure: "Not sure yet"
  };

  document.querySelectorAll("[data-stripe]").forEach(function (btn) {
    var link = STRIPE_LINKS[btn.getAttribute("data-stripe")];
    if (link) {
      btn.setAttribute("href", link);
      btn.removeAttribute("data-pack");
      btn.setAttribute("rel", "noopener");
    }
  });

  document.querySelectorAll("[data-pack]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pack = btn.getAttribute("data-pack");
      var select = document.querySelector('#contact-form select[name="pack"]');
      if (select && pack) select.value = pack;
    });
  });

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.elements.namedItem("name") || {}).value || "";
      var email = (form.elements.namedItem("email") || {}).value || "";
      var company = (form.elements.namedItem("company") || {}).value || "";
      var pack = (form.elements.namedItem("pack") || {}).value || "";
      var icp = (form.elements.namedItem("icp") || {}).value || "";
      var packLabel = PACK_LABELS[pack] || "Not sure yet";
      var subject = encodeURIComponent("Guideily request — " + packLabel);
      var body = encodeURIComponent(
        [
          "Name: " + name,
          "Email: " + email,
          "Company: " + company,
          "Pack: " + packLabel,
          "",
          "Rough ICP:",
          icp,
          "",
          "(Sent from guideily.com)"
        ].join("\n")
      );
      window.location.href =
        "mailto:hello@guideily.com?subject=" + subject + "&body=" + body;
    });
  }

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealEls = document.querySelectorAll("[data-reveal]");
  if (reduceMotion) {
    revealEls.forEach(function (el) {
      el.classList.add("is-inview");
    });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-inview");
    });
  }


  /* ---------- v7: sticky header shadow ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var ticking = false;
    var onScroll = function () {
      header.classList.toggle("scrolled", (window.scrollY || window.pageYOffset) > 8);
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }

  /* ---------- v7: hero example card (counter + typing) ---------- */
  var counter = document.querySelector(".hero-card .counter");
  var fill = document.querySelector(".hero-card .hc-fill");
  var typed = document.querySelector(".hero-card .typed");
  var total = counter ? parseInt(counter.getAttribute("data-to"), 10) || 20 : 20;
  var fullText = typed ? typed.getAttribute("data-text") || "" : "";
  var setCount = function (n) {
    if (counter) counter.textContent = String(n);
    if (fill) fill.style.setProperty("--w", Math.round((n / total) * 100) + "%");
  };
  if (reduceMotion) {
    setCount(total);
    if (typed) typed.textContent = fullText;
  } else if (counter || typed) {
    var runCard = function () {
      var n = 0, i = 0;
      setCount(0);
      if (typed) typed.textContent = "";
      var t = setInterval(function () {
        n += 1; setCount(n);
        if (n >= total) clearInterval(t);
      }, 75);
      setTimeout(function typeNext() {
        if (!typed) return;
        i += 1;
        typed.textContent = fullText.slice(0, i);
        if (i < fullText.length) setTimeout(typeNext, 24 + Math.random() * 36);
        else setTimeout(runCard, 6000);
      }, 1000);
    };
    setTimeout(runCard, 700);
  }

  /* ---------- v7: FAQ open/close animation ---------- */
  if (!reduceMotion && Element.prototype.animate) {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var summary = item.querySelector("summary");
      if (!summary) return;
      var anim = null;
      summary.addEventListener("click", function (e) {
        e.preventDefault();
        if (anim) anim.cancel();
        var startH = item.offsetHeight;
        var closing = item.open;
        if (!closing) item.open = true;
        var endH = closing ? summary.offsetHeight + 2 : item.scrollHeight + 2;
        if (!closing) endH = item.offsetHeight;
        item.style.overflow = "hidden";
        anim = item.animate({ height: [startH + "px", endH + "px"] }, { duration: 320, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
        anim.onfinish = function () {
          if (closing) item.open = false;
          item.style.overflow = "";
          anim = null;
        };
        anim.oncancel = function () { anim = null; };
      });
    });
  }

  /* ---------- v7: simple form validation before mailto ---------- */
  var cf = document.getElementById("contact-form");
  if (cf) {
    cf.addEventListener("submit", function (e) {
      var bad = null;
      ["name", "email", "company", "icp"].forEach(function (n) {
        var el = cf.elements.namedItem(n);
        if (!el) return;
        var v = el.value.trim();
        var isBad = !v || (n === "email" && !/^\S+@\S+\.\S+$/.test(v));
        el.classList.toggle("invalid", isBad);
        if (isBad && !bad) bad = el;
      });
      if (bad) { e.stopImmediatePropagation(); e.preventDefault(); bad.focus(); }
    }, true);
    cf.addEventListener("input", function (e) { e.target.classList && e.target.classList.remove("invalid"); });
  }

})();
