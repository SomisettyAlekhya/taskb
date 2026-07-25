/*
  BEFORE replica -- emulated third-party tag cost.
  The live thedailystar.net homepage loads 52 scripts (1,448 KiB). Lighthouse
  measured 3,890 ms of main-thread blocking from third-party code alone
  (Google/Doubleclick Ads 1,651 ms + GTM 1,188 ms + Facebook 753 ms +
  Clarity 201 ms + others) and 2,827 ms Total Blocking Time.

  We do NOT load real ad or analytics tags in this demo. Instead we reproduce a
  deliberately CONSERVATIVE portion of that cost -- ~900 ms of unthrottled CPU
  work -- executed the way tags execute today: on the main thread, in a few
  large uninterruptible tasks, while the page is trying to become interactive.
*/
(function () {
  function burn(ms) {
    var end = Date.now() + ms, x = 0;
    while (Date.now() < end) { x += Math.sqrt(x + 1) * Math.sin(x); }
    window.__dsBurn = x;
  }
  function run() {
    // 3 x 300 ms long tasks, one after the other -- classic tag-manager profile.
    burn(300);
    setTimeout(function () { burn(300); }, 0);
    setTimeout(function () { burn(300); }, 0);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else { run(); }
})();
