(function () {
  function getDeviceOS() {
    const platform =
      (navigator.userAgentData && navigator.userAgentData.platform) ||
      navigator.platform ||
      "";
    const value = platform.toLowerCase();

    if (value.includes("mac") || value.includes("iphone") || value.includes("ipad")) {
      return "macos";
    }
    if (value.includes("win")) {
      return "windows";
    }
    if (value.includes("linux") || value.includes("cros")) {
      return "linux";
    }
    return null;
  }

  const userOS = getDeviceOS();
  if (!userOS) return;

  function activate(tab) {
    const opts = { bubbles: true, cancelable: true, view: window, button: 0 };
    tab.dispatchEvent(new MouseEvent("mousedown", { ...opts, buttons: 1 }));
    tab.dispatchEvent(new MouseEvent("mouseup", opts));
  }

  let done = false;
  function applyOnLoad() {
    if (done) return;
    let switched = false;
    document.querySelectorAll("button[role='tab']").forEach((tab) => {
      if (
        tab.textContent.trim().toLowerCase().startsWith(userOS) &&
        tab.getAttribute("aria-selected") !== "true"
      ) {
        activate(tab);
        switched = true;
      }
    });
    if (switched) done = true;
  }

  function start() {
    [0, 120, 400, 900].forEach((delay) => setTimeout(applyOnLoad, delay));
  }

  if (document.body) {
    start();
  } else {
    document.addEventListener("DOMContentLoaded", start);
  }
})();
