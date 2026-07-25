/*
  AFTER -- the same tag work, moved off the critical path.
  Nothing analytics or ad-related needs to run before first paint, so the
  identical ~900 ms of work is deferred to browser idle time and sliced into
  chunks small enough that no single task crosses the 50 ms "long task"
  threshold, even on a throttled mid-range phone. Result: the work still
  happens, but it never blocks paint or input.
*/
(function () {
  var idle = window.requestIdleCallback || function (cb) { return setTimeout(cb, 60); };
  var remaining = 900;
  var SLICE = 8; // 8 ms unthrottled ~ 32 ms on a 4x-slower mobile CPU

  function step() {
    var end = Date.now() + SLICE, x = 0;
    while (Date.now() < end) { x += Math.sqrt(x + 1) * Math.sin(x); }
    window.__dsBurn = x;
    remaining -= SLICE;
    if (remaining > 0) idle(step);
  }
  idle(step);
})();
