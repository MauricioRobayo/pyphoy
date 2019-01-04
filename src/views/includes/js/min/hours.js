"use strict";
function timeString(a) {
  var b = Math.floor;
  const c = b(a / 3600000),
    d = b((a % 3600000) / 60000);
  return `${c ? `${c}h` : ""}${d ? ` ${d}m` : ""}`;
}
const uls = document.getElementsByClassName("hours-interactive");
for (let a = 0; a < uls.length; a += 1) {
  const b = uls[a],
    c = b.getElementsByTagName("li"),
    d = b.dataset.comment,
    e = b.dataset.days;
  for (let a = 0; a < c.length; a += 1) {
    const b = c[a],
      f = b.dataset.start,
      g = b.dataset.end,
      h = new Date(),
      i = h.toDateString(),
      j = h.getTime(),
      k = new Date(`${i} ${"Todo el d\xEDa" === d ? "0:00" : f}`),
      l = new Date(`${i} ${"Todo el d\xEDa" === d ? "0:00" : g}`);
    l <= k && l.setDate(l.getDate() + 1);
    const m = j >= k && j <= l;
    if ((m || j < k) && (0 === e.length || e.includes(h.getDay()))) {
      const a = document.createElement("span"),
        c = document.createTextNode(m ? timeString(l - j) : timeString(k - j));
      a.classList.add("lapse"),
        a.appendChild(c),
        b.classList.add(`hour-${m ? "active" : "warning"}`),
        b.appendChild(a);
      break;
    }
  }
}
