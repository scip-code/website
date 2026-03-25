(function () {
  /** Replace with the live external blog post URL when published. */
  var PROMO_BLOG_URL = "https://sourcegraph.com/blog/the-future-of-scip";

  var COOKIE_NAME = "scip_promo_future_scip_dismissed";
  var MAX_AGE_SEC = 365 * 24 * 60 * 60;

  function isDismissed() {
    return document.cookie.split(";").some(function (chunk) {
      return chunk.trim().indexOf(COOKIE_NAME + "=1") === 0;
    });
  }

  function setDismissed() {
    document.cookie =
      COOKIE_NAME +
      "=1; path=/; max-age=" +
      MAX_AGE_SEC +
      "; SameSite=Lax";
  }

  function syncPromoHeight(bar) {
    var h = bar.offsetHeight;
    document.documentElement.style.setProperty(
      "--promo-bar-height",
      h ? h + "px" : "0px"
    );
  }

  var bar = document.getElementById("promo-bar");
  if (!bar || isDismissed()) return;

  var link = bar.querySelector(".promo-bar__link");
  if (link) link.href = PROMO_BLOG_URL;

  bar.removeAttribute("hidden");
  syncPromoHeight(bar);

  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(function () {
      syncPromoHeight(bar);
    }).observe(bar);
  } else {
    window.addEventListener("resize", function () {
      syncPromoHeight(bar);
    });
  }

  var closeBtn = bar.querySelector(".promo-bar__close");
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      setDismissed();
      bar.setAttribute("hidden", "");
      document.documentElement.style.setProperty("--promo-bar-height", "0px");
    });
  }
})();
