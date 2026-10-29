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
      var packLabel =
        pack === "lead"
          ? "Lead Pack ($497)"
          : pack === "meeting"
            ? "Meeting Pack ($1,500)"
            : "Not sure yet";
      var subject = encodeURIComponent("Guideily pack — " + packLabel);
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

  /*
   * Stripe Payment Links (paused — wire when Stripe account is ready):
   * Pack CTAs currently scroll to #contact form.
   */
})();
