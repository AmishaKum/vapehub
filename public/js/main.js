const { animate, inView, stagger } = window.Motion;
const { gsap, ScrollTrigger } = window;
gsap.registerPlugin(ScrollTrigger);
const ease = [0.22, 1, 0.36, 1];
document.getElementById("year").textContent = new Date().getFullYear();

/* Nav */
const menu = document.getElementById("menu");
document.getElementById("burger").addEventListener("click", () => menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));
const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("slim", scrollY > 40), { passive: true });

/* Hero intro */
animate(".hero h1 .line > span", { y: ["110%", "0%"] }, { delay: stagger(0.12), duration: 1.1, easing: ease });
animate(".punch, .lead, .hero-actions, .hero-stats", { y: [24, 0], opacity: [0, 1] }, { delay: stagger(0.1, { start: 0.35 }), duration: 0.9, easing: ease });

/* Film: video scrubbed by scroll, eased so the playhead glides instead of jumping */
const video = document.getElementById("filmVideo");
const bar = document.getElementById("filmBar");
const caps = [...document.querySelectorAll(".cap")];
let target = 0, current = 0;
const finale = document.getElementById("finale"), fxBg = finale.querySelector(".fx-bg"), puffNum = document.getElementById("puffNum");
ScrollTrigger.create({
  trigger: "#film", start: "top top", end: "+=4200", pin: true, anticipatePin: 1,
  onUpdate: self => { target = self.progress; },
});
function tick() {
  current += (target - current) * 0.08;
  const vp = Math.min(current / 0.85, 1);
  const fp = Math.max(0, (current - 0.85) / 0.15);
  finale.style.opacity = Math.min(fp * 2.2, 1);
  fxBg.style.transform = `scale(${1.2 - fp * 0.15})`;
  puffNum.textContent = Math.round(Math.min(fp * 1.4, 1) * 50000).toLocaleString();
  if (video.duration) {
    const t = vp * (video.duration - 0.05);
    if (Math.abs(video.currentTime - t) > 0.015) video.currentTime = t;
  }
  bar.style.width = (current * 100).toFixed(2) + "%";
  caps.forEach(c => c.classList.toggle("on", current >= +c.dataset.start && current < +c.dataset.end));
  requestAnimationFrame(tick);
}
video.addEventListener("loadedmetadata", () => video.pause());
requestAnimationFrame(tick);

/* Products (from the Express API) */
async function loadProducts() {
  const grid = document.getElementById("productGrid");
  try {
    const res = await fetch("/api/products");
    const items = await res.json();
    grid.innerHTML = items.map(p => `
      <article class="card">
        <div class="ph"><img src="${p.image}" alt="${p.flavor} ${p.name}" loading="lazy" /><span class="tag">${p.tag}</span></div>
        <div class="body">
          <p class="sub">${p.name}</p>
          <h3>${p.flavor}</h3>
          <p class="note">${p.note}</p>
          <div class="meta"><span>${p.puffs.toLocaleString()} puffs</span><span class="price">$${p.price.toFixed(2)}</span></div>
        </div>
      </article>`).join("");
    inView(".card", el => { animate(el, { opacity: [0.001, 1], y: [50, 0] }, { duration: 0.9, easing: ease }); }, { margin: "0px 0px -10% 0px" });
  } catch {
    grid.innerHTML = "<p>Products are taking a quick break. Visit us in store!</p>";
  }
}
loadProducts();
inView(".why-card, .offer-card, .cta", el => { animate(el, { opacity: [0.001, 1], y: [40, 0] }, { duration: 0.9, easing: ease }); });

/* Newsletter */
document.getElementById("newsForm").addEventListener("submit", async e => {
  e.preventDefault();
  const msg = document.getElementById("formMsg");
  const email = new FormData(e.target).get("email");
  try {
    const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const data = await res.json();
    msg.textContent = data.message;
    if (data.ok) e.target.reset();
  } catch { msg.textContent = "Network hiccup. Please try again."; }
});
