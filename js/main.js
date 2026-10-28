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
      if (open) {
        mobileNav.setAttribute("hidden", "");
      } else {
        mobileNav.removeAttribute("hidden");
      }
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("hidden", "");
      });
    });
  }

  // Contact form → mailto with structured body (no backend required)
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
      var subject = encodeURIComponent("Guideily pack interest — " + packLabel);
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
          "(Sent from guideily.com contact form)"
        ].join("\n")
      );
      window.location.href = "mailto:hello@guideily.com?subject=" + subject + "&body=" + body;
    });
  }

  /*
   * Stripe Payment Links (paused — wire when Stripe account is ready):
   *   #pay-lead    → Lead Pack $497 Payment Link URL
   *   #pay-meeting → Meeting Pack $1,500 Payment Link URL
   *
   * Example when ready:
   *   document.getElementById("pay-lead").href = "https://buy.stripe.com/...";
   *   document.getElementById("pay-meeting").href = "https://buy.stripe.com/...";
   */
})();
