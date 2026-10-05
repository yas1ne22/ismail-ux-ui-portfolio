import { profile, experience, projects, products, strategyShowcases } from "./data.js";

// Begin loading the scanner immediately so the boarding pass appears without
// an additional wait when the welcome gate opens.
const scannerModulePromise = import("./scanner.js");


const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const store = {
  get(k) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch {}
  },
};
const plane =
  '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0c.8 0 1.3 1 1.3 2.4v2.2l6.1 3.5v1.7L9.3 8v3.6l2 1.4v1.4L8 13.5l-3.3.9V13l2-1.4V8L.6 9.8V8.1l6.1-3.5V2.4C6.7 1 7.2 0 8 0Z"/></svg>';
const shot = (name) => `/ismail-ux-ui-portfolio/assets/${name}.jpg`;
const projectIcons = {
  discount:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><circle cx="12" cy="12" r="3"/><path d="m14 10-4 4"/></svg>',
  knowledge:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M4 7l8-4 8 4M4 17l8 4 8-4M4 7v10M20 7v10"/><circle cx="12" cy="3" r="1.5" fill="currentColor"/><circle cx="4" cy="7" r="1.5" fill="currentColor"/><circle cx="20" cy="7" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="4" cy="17" r="1.5" fill="currentColor"/><circle cx="20" cy="17" r="1.5" fill="currentColor"/><circle cx="12" cy="21" r="1.5" fill="currentColor"/></svg>',
  seo:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/><path d="M8 12.5 10.5 10l2 2 3-3"/><path d="M13 9h2.5V11.5"/></svg>',
  paidmedia:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22"/></svg>',
  shopify:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5h12l1.2 11a2 2 0 0 1-2 2.1H6.8a2 2 0 0 1-2-2.1L6 8.5Z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/><path d="m10 14.5 1.5 1.5L14.5 13"/></svg>',
  email:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 7.2 5.4a1.3 1.3 0 0 0 1.6 0L20 7"/></svg>',
  analytics:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20.5h18"/><path d="M7 17v-4M12 17V9M17 17V6.5"/><path d="m5.5 11 4.5-4 4 3 5-5.5"/><circle cx="19" cy="4.5" r="1.3" fill="currentColor"/></svg>',
  aeo:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M5.6 18.4l2.2-2.2M16.2 7.8l2.2-2.2"/></svg>',
  nexus:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3.5"/><path d="M3 9.5h18"/><circle cx="6.8" cy="6.8" r="1" fill="currentColor"/><circle cx="10.2" cy="6.8" r="1" fill="currentColor"/><path d="m7.5 15.5 4.5-3.5 4.5 3.5M12 12v5.5"/></svg>',
  prepflow:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5h16a8 8 0 0 1-16 0Z"/><path d="M8 5c.5 1.2.5 2.2 0 3.5M12 4c.5 1.5.5 2.8 0 4.5M16 5c.5 1.2.5 2.2 0 3.5M3 19.5h18"/></svg>',
  promptilo:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2.5 2.6 6.2 6.4 2.3-6.4 2.3L12 19.5l-2.6-6.2L3 11l6.4-2.3L12 2.5Z"/><path d="M18.5 16.5l.8 1.8 1.7.7-1.7.8-.8 1.7-.7-1.7-1.8-.8 1.8-.7.7-1.8Z"/></svg>',
  skinny:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="4" width="13" height="16" rx="6.5"/><path d="M5.5 12h13"/><circle cx="12" cy="8" r="1.2" fill="currentColor"/><circle cx="12" cy="16" r="1.2" fill="currentColor"/></svg>',
  "timer-gym":
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.5 1.5M9.5 3.5h5M12 3.5v2.5M18 6.5l1.2 1.2"/></svg>',
  timergym:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.5 1.5M9.5 3.5h5M12 3.5v2.5M18 6.5l1.2 1.2"/></svg>',
  voicy:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8"/></svg>',
};
const caseRow = (key) => {
  const p = projects[key];
  if (!p) return "";
  const visual = p.icon
    ? `<span class="case-icon case-icon-${p.icon}" aria-hidden="true">${projectIcons[p.icon]}</span>`
    : "";
  return `<li><button class="case" type="button" data-strategy="${key}"><span class="tl-dot tl-dot-case"></span>${visual}<span class="case-text"><span class="case-title">${p.title}</span><span class="case-desc">${p.desc}</span></span><span class="case-arrow" aria-hidden="true">↗</span></button></li>`;
};
const highlightRow = (item) => {
  const content = `<span class="tl-dot tl-dot-case"></span><span class="case-text"><span class="case-title">${item.title}${item.confidential ? ' <span class="case-flagship-pill">Private work</span>' : ""}</span><span class="case-desc">${item.desc}</span></span><span class="case-arrow" aria-hidden="true">↗</span>`;
  return item.confidential
    ? `<li><button type="button" class="case private-work-trigger" data-private-title="${item.title}">${content}</button></li>`
    : `<li><a class="case" href="${item.href}" target="_blank" rel="noopener noreferrer">${content}</a></li>`;
};
const productCaseRow = (p) => {
  const visual = p.logo
    ? `<span class="case-icon case-icon-app case-icon-${p.key}" aria-hidden="true"><img src="${p.logo}" alt="${p.title}" class="case-badge-img" width="36" height="36" loading="lazy" /></span>`
    : `<span class="case-icon case-icon-${p.key}" aria-hidden="true">${projectIcons[p.icon] || projectIcons[p.key] || ""}</span>`;
  const badge = p.isFlagship ? `<span class="case-flagship-pill">Flagship</span>` : "";
  return `<li><a class="case" href="${p.href}" target="_blank" rel="noopener noreferrer"><span class="tl-dot tl-dot-case"></span>${visual}<span class="case-text"><span class="case-title">${p.title} ${badge}</span><span class="case-desc">${p.desc}</span></span><span class="case-arrow" aria-hidden="true">↗</span></a></li>`;
};
document.querySelector("#app").innerHTML = `
<a class="skip-content" href="#journey">Skip to experience</a>
<main class="folio booting" id="portfolio" tabindex="-1" inert>
<aside class="folio-sticky"><span class="fs-rail" aria-hidden="true"></span><div class="fs-lines"><h1 class="fs-name">${profile.name}</h1><p>${profile.location}</p><p><a href="mailto:${profile.email}" class="fs-phone">${profile.email}</a></p></div></aside>
<div class="folio-col">
<div class="folio-window reveal"><div class="plane-window"><div class="sky"><img class="cloud cloud-one" src="/ismail-ux-ui-portfolio/assets/cloud.png" alt=""><img class="cloud cloud-two" src="/ismail-ux-ui-portfolio/assets/cloud.png" alt=""><span class="sky-glow"></span></div><img class="window-layer back" src="/ismail-ux-ui-portfolio/assets/window-back.webp" alt=""><div class="shade-clip"><img class="window-shade" src="/ismail-ux-ui-portfolio/assets/window-shutter.webp" alt=""></div><img class="window-layer front" src="/ismail-ux-ui-portfolio/assets/window-front.webp" alt=""><button class="shade-control" type="button" aria-label="Close the window shade" aria-pressed="false" title="Drag the shade to switch between day and night"></button></div><p class="window-hint">Close the window for dark mode</p></div>
<div class="folio-intro reveal">
  <p class="portfolio-role">${profile.title}</p><h2 class="folio-tagline">${profile.tagline}</h2>
  <p class="folio-sub">${profile.intro}</p>
  <div class="intro-spot-row"><a href="/ismail-ux-ui-portfolio/cv.html" class="intro-spot-pill intro-cv-pill" title="Read Ismail's CV"><span class="spot-pill-txt">Resume</span></a><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" class="intro-spot-pill" title="Open Ismail's LinkedIn profile"><span class="spot-pill-txt">LinkedIn</span></a></div>
</div>

<section class="folio-track" id="journey" aria-label="Career flight plan">
<div class="plan-head reveal" aria-hidden="true"><span class="plan-label">Flight plan</span><span class="plan-plane">${plane}</span></div>
<div class="folio-path" aria-hidden="true"><svg class="path-curve" viewBox="0 0 44 110"><defs><clipPath id="flight-path-reveal" clipPathUnits="userSpaceOnUse"><rect class="path-reveal" x="-8" y="-8" width="60" height="0"/></clipPath></defs><path class="pc-dots" d="M44 0 V25 C44 65 0 40 0 80 V110" fill="none"/><path class="pc-lit" d="M44 0 V25 C44 65 0 40 0 80 V110" fill="none" clip-path="url(#flight-path-reveal)"/></svg><div class="path-rail"><div class="path-lit"></div><span class="path-glow"></span><svg class="path-tip" viewBox="0 0 8 4"><path d="m1 1 3 2 3-2"/></svg></div></div>
<div class="selected-work"><p class="plan-label">Selected work</p><ul class="tl-cases">${Object.keys(projects).map(caseRow).join("")}</ul></div><ol class="folio-timeline">${experience.map((e) => `<li class="tl-entry"><div class="tl-head"><span class="tl-year">${e.route ? `<span class="tl-route">${e.route}</span>` : ""}<span class="tl-yearnum">${e.year}</span></span><span class="tl-dot tl-dot-${e.current ? "now" : "past"}" aria-hidden="true"></span>${e.logo ? `<img class="tl-brand-logo" src="${e.logo}" alt="" loading="lazy">` : ""}<h2 class="tl-company">${e.href ? `<a href="${e.href}" target="_blank" rel="noopener noreferrer">${e.company}</a>` : e.company}</h2>${e.current ? '<span class="tl-badge">Current</span>' : ""}</div><div class="tl-body"><h3 class="tl-role">${e.role}</h3><p class="tl-desc">${e.desc}</p>${e.dates ? `<p class="tl-dates">${e.dates}</p>` : ""}${e.impact ? `<div class="role-impact" aria-label="Experience highlights">${e.impact.map((point) => `<div><strong>${point.value}</strong><span>${point.label}</span></div>`).join("")}</div>` : ""}</div>${e.highlights ? `<ul class="tl-cases">${e.highlights.map(highlightRow).join("")}</ul>` : e.projects ? `<ul class="tl-cases">${e.projects.map(caseRow).join("")}</ul>` : ""}</li>`).join("")}



</ol>
<div class="folio-outro reveal">
  <div class="outro-text">
    <p class="outro-title">Thank you for visiting. Let’s build something together.</p>
    <a href="https://wa.me/${profile.whatsapp}?text=${encodeURIComponent("Hi Ismail, I found your portfolio and would like to get in touch.")}" target="_blank" rel="noopener noreferrer" class="outro-whatsapp-cta">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.69 19.74L5.52 16.7L5.33 16.39C4.54 15.14 4.12 13.68 4.12 12.18C4.12 7.64 7.82 3.67 12.05 3.67M9.04 7.67C8.88 7.67 8.63 7.73 8.42 7.96C8.21 8.19 7.62 8.74 7.62 9.87C7.62 11 8.44 12.09 8.56 12.24C8.67 12.4 10.18 14.72 12.49 15.72C13.04 15.96 13.47 16.1 13.8 16.21C14.36 16.39 14.86 16.36 15.26 16.3C15.71 16.23 16.64 15.74 16.83 15.2C17.03 14.67 17.03 14.21 16.97 14.12C16.91 14.03 16.76 13.97 16.53 13.86C16.3 13.74 15.18 13.19 14.97 13.11C14.76 13.04 14.61 13 14.45 13.23C14.3 13.46 13.87 13.97 13.74 14.12C13.61 14.28 13.48 14.3 13.25 14.18C13.02 14.07 12.28 13.83 11.41 13.05C10.73 12.44 10.27 11.69 10.14 11.47C10.01 11.24 10.13 11.11 10.24 11C10.35 10.89 10.48 10.72 10.6 10.59C10.71 10.45 10.76 10.35 10.83 10.2C10.91 10.05 10.87 9.92 10.81 9.8C10.76 9.69 10.3 8.56 10.11 8.11C9.92 7.67 9.73 7.73 9.58 7.72C9.44 7.71 9.28 7.71 9.12 7.71L9.04 7.67Z"/></svg>
      <span>Get in touch</span>
      <span aria-hidden="true" style="font-size: 11px;">↗</span>
    </a>
  </div>
</div>
</section>
</div>
<div class="folio-footer-fx" aria-hidden="true"><div class="pb pb1"></div><div class="pb pb2"></div><div class="pb pb3"></div><div class="pb pb4"></div><div class="pb pb5"></div><div class="folio-footer-tint"></div></div>
<footer class="folio-footer"><nav class="ff-links" aria-label="Portfolio links"><button class="ff-link" id="return-gate"><span class="ff-link-label">Return to gate</span></button><a class="ff-link" href="/ismail-ux-ui-portfolio/cv.html"><span class="ff-link-label">Resume</span></a><a class="ff-link" href="mailto:${profile.email}"><span class="ff-link-label">Email</span></a><a class="ff-link" href="${profile.linkedin}" target="_blank" rel="noopener noreferrer"><span class="ff-link-label">LinkedIn</span></a></nav></footer>
</main>
<div class="pass-stage" id="gate" tabindex="-1" role="dialog" aria-modal="true" aria-label="Welcome aboard Ismail's portfolio">
  <div class="pass-canvas" id="scanner"></div>
  <button class="scan-keyboard" id="scan-pass">Scan Boarding Pass</button>
  <div class="gate-actions-wrap">
    <p class="pass-hint shimmer" id="pass-status" role="status" aria-live="polite">Swipe boarding pass to enter</p>
    <button class="quick-scan-pill" id="quick-scan-btn" type="button" aria-label="Scan boarding pass and enter portfolio">
      <span class="qsp-icon" aria-hidden="true">
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
          <path d="M17 7V5a2 2 0 0 0-2-2h-2"/>
          <path d="M3 13v2a2 2 0 0 0 2 2h2"/>
          <path d="M17 13v2a2 2 0 0 1-2 2h-2"/>
          <line x1="3" y1="10" x2="17" y2="10"/>
        </svg>
      </span>
      <span class="qsp-label">Tap to Scan</span>
    </button>
  </div>
  <button class="skip-link" id="skip-intro">Skip</button>
</div>
<dialog class="memory-dialog"><button class="close-dialog" aria-label="Close image"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg></button><img alt=""><p></p></dialog>
<dialog class="strategy-modal-dialog" id="strategy-dialog" aria-labelledby="strategy-modal-title">
  <div class="strategy-modal-box">
    <button class="strategy-close-btn" id="close-strategy-btn" aria-label="Close dialog">
      <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg>
    </button>
    <div class="strategy-modal-content" id="strategy-modal-content"></div>
  </div>
</dialog>`;
const privateDialog = document.createElement("dialog");
privateDialog.className = "private-work-dialog";
privateDialog.setAttribute("aria-labelledby", "private-work-title");
privateDialog.innerHTML = `<div class="private-work-card"><button type="button" class="private-work-close" aria-label="Close">×</button><p class="private-work-eyebrow">SANITIZED CASE SUMMARY</p><h2 id="private-work-title"></h2><p class="private-work-note">The work can be discussed at a high level; sensitive implementation details and exact results remain protected.</p><dl class="private-work-facts"><div><dt>Problem</dt><dd data-private-field="problem"></dd></div><div><dt>My ownership</dt><dd data-private-field="role"></dd></div><div><dt>Process</dt><dd data-private-field="process"></dd></div><div><dt>Constraints</dt><dd data-private-field="constraints"></dd></div><div><dt>Outcome</dt><dd data-private-field="outcome"></dd></div></dl><p class="private-work-nda">Exact numbers are protected under NDA and cannot be revealed publicly. Contact Ismail for more detail.</p><a class="private-work-contact" href="mailto:${profile.email}">Contact me for details <span aria-hidden="true">↗</span></a></div>`;
document.body.append(privateDialog);
const privateItems = experience.flatMap((entry) => entry.highlights || []).filter((item) => item.confidential);
document.querySelectorAll(".private-work-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    const item = privateItems.find((candidate) => candidate.title === button.dataset.privateTitle);
    privateDialog.querySelector("#private-work-title").textContent = button.dataset.privateTitle;
    privateDialog.querySelectorAll("[data-private-field]").forEach((field) => {
      field.textContent = item?.privateDetails?.[field.dataset.privateField] || "Available in a confidential conversation.";
    });
    privateDialog.querySelector(".private-work-contact").href = `mailto:${profile.email}?subject=${encodeURIComponent(`About ${button.dataset.privateTitle}`)}`;
    privateDialog.showModal();
  });
});
privateDialog.querySelector(".private-work-close").addEventListener("click", () => privateDialog.close());
privateDialog.addEventListener("click", (event) => { if (event.target === privateDialog) privateDialog.close(); });
const folio = document.querySelector("#portfolio"),
  gate = document.querySelector("#gate");
const interviewCard = document.querySelector(".interview-card");
const interviewWidget = interviewCard?.querySelector("elevenlabs-convai");
if (interviewCard && interviewWidget) customElements.whenDefined("elevenlabs-convai").then(() => {
  const shadow = interviewWidget.shadowRoot;
  if (!shadow) return;
  const syncOpenState = () => {
    interviewCard.classList.toggle(
      "agent-open",
      Boolean(shadow.querySelector('button[aria-label="Collapse"]')),
    );
  };
  new MutationObserver(syncOpenState).observe(shadow, {
    childList: true,
    subtree: true,
  });
  syncOpenState();
});
const detail = document.createElement("main");
detail.className = "case-page";
detail.hidden = true;
detail.tabIndex = -1;
document.querySelector("#app").append(detail);
let scanner = null,
  entered = false;
function enter() {
  if (entered) return;
  entered = true;
  sessionStorage.setItem("ismail-ux-ui-portfolio:entered", "1");
  store.set("ismail-ux-ui-portfolio:boarded", "1");
  gate.classList.add("leaving");
  folio.inert = false;
  detail.inert = false;
  document.documentElement.classList.remove("is-covered");
  folio.classList.remove("booting");
  folio.classList.add("entering");
  if (!detail.hidden) detail.classList.add("entering");
  requestPathMeasure();
  setTimeout(
    () => {
      gate.hidden = true;
      scanner?.dispose();
      scanner = null;
      folio.classList.remove("entering");
      detail.classList.remove("entering");
      (detail.hidden ? folio : detail).focus({ preventScroll: true });
    },
    reduced.matches ? 0 : 600,
  );
}
async function showGate() {
  entered = false;
  gate.hidden = false;
  gate.classList.remove("leaving");
  folio.inert = true;
  folio.classList.add("booting");
  folio.classList.remove("entering");
  detail.classList.remove("entering");
  document.documentElement.classList.add("is-covered");
  window.scrollTo(0, 0);
  const passStatus = document.querySelector("#pass-status");
  passStatus.textContent = "Swipe boarding pass to enter";
  passStatus.classList.remove("granted");
  try {
    const { mountScanner } = await scannerModulePromise;
    if (entered) return;
    scanner = mountScanner(document.querySelector("#scanner"), {
      onSuccess() {
        passStatus.classList.remove("shimmer");
        passStatus.classList.add("granted");
        passStatus.innerHTML =
          '<span class="status-check" aria-hidden="true">✓</span> Access granted';
        setTimeout(enter, reduced.matches ? 0 : 650);
      },
      onStatus(text) {
        passStatus.textContent = text;
      },
      reduced: reduced.matches,
    });
    const scanBtn = document.querySelector("#scan-pass");
    if (scanBtn) scanBtn.onclick = () => scanner.scan();
  } catch (e) {
    passStatus.textContent =
      "Welcome aboard. Enter to explore.";
    document.querySelector("#scan-pass").classList.add("fallback");
    document.querySelector("#scan-pass").onclick = enter;
    console.warn("3D scanner unavailable; accessible entry enabled.", e);
  }
  gate.focus({ preventScroll: true });
}
document.querySelector("#skip-intro").onclick = enter;
const passStatusEl = document.querySelector("#pass-status");
if (passStatusEl) {
  passStatusEl.onclick = (e) => {
    e.stopPropagation();
    scanner ? scanner.scan() : enter();
  };
}
const scanPassBtn = document.querySelector("#scan-pass");
if (scanPassBtn) {
  scanPassBtn.onclick = (e) => {
    e.stopPropagation();
    scanner ? scanner.scan() : enter();
  };
}
const quickScanBtn = document.querySelector("#quick-scan-btn");
if (quickScanBtn) {
  quickScanBtn.onclick = (e) => {
    e.stopPropagation();
    scanner ? scanner.scan() : enter();
  };
}

// Give mobile visitors a light tactile cue as each role reaches the reading line.
// The switch control supplies a WebKit fallback where navigator.vibrate is absent.
const hapticSwitch = document.createElement("input");
hapticSwitch.type = "checkbox";
hapticSwitch.setAttribute("switch", "");
hapticSwitch.setAttribute("aria-hidden", "true");
hapticSwitch.tabIndex = -1;
Object.assign(hapticSwitch.style, {
  position: "fixed",
  width: "1px",
  height: "1px",
  opacity: "0",
  pointerEvents: "none",
});
document.body.append(hapticSwitch);

function pulseExperienceHaptic() {
  if (typeof navigator.vibrate === "function") {
    navigator.vibrate(14);
  } else {
    hapticSwitch.click();
  }
}

let lastHapticEntry = null;
const experienceHaptics = new IntersectionObserver(
  (entries) => {
    const active = entries
      .filter((entry) => entry.isIntersecting)
      .sort(
        (a, b) =>
          Math.abs(a.boundingClientRect.top - innerHeight * 0.5) -
          Math.abs(b.boundingClientRect.top - innerHeight * 0.5),
      )[0];
    if (!active || !entered || active.target === lastHapticEntry) return;
    lastHapticEntry = active.target;
    pulseExperienceHaptic();
  },
  { rootMargin: "-44% 0px -44% 0px", threshold: 0 },
);
document.querySelectorAll(".tl-entry .tl-head").forEach((entry) => experienceHaptics.observe(entry));
const returnGateBtn = document.querySelector("#return-gate");
if (returnGateBtn) {
  returnGateBtn.onclick = () => {
    sessionStorage.removeItem("ismail-ux-ui-portfolio:entered");
    store.set("ismail-ux-ui-portfolio:boarded", "0");
    showGate();
  };
}
gate.onclick = (e) => {
  if (e.target === gate) {
    scanner ? scanner.scan() : enter();
  }
};
gate.addEventListener("wheel", (e) => {
  if (Math.abs(e.deltaY) > 30) enter();
}, { passive: true });
gate.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Enter" || e.key === " ") enter();
  if (e.key === "Tab") {
    const a = document.querySelector("#scan-pass"),
      b = document.querySelector("#skip-intro");
    if (e.shiftKey && document.activeElement === a) {
      e.preventDefault();
      b.focus();
    } else if (!e.shiftKey && document.activeElement === b) {
      e.preventDefault();
      a.focus();
    }
  }
});

// Shade position and theme share one progress value, including during a drag.
let shade = store.get("ismail-ux-ui-portfolio:theme") === "dark" ? 1 : 0,
  drag = null;
const windowEl = document.querySelector(".plane-window"),
  shadeButton = document.querySelector(".shade-control");
function applyShade(value, settle = false) {
  shade = Math.max(0, Math.min(1, value));
  windowEl.style.setProperty("--shade", shade);
  document.documentElement.dataset.theme = shade > 0.52 ? "dark" : "light";
  shadeButton.setAttribute("aria-pressed", String(shade > 0.5));
  shadeButton.setAttribute(
    "aria-label",
    shade > 0.5 ? "Open the window shade" : "Close the window shade",
  );
  if (settle) store.set("ismail-ux-ui-portfolio:theme", shade > 0.5 ? "dark" : "light");
}
applyShade(shade);
shadeButton.addEventListener("pointerdown", (e) => {
  drag = { y: e.clientY, start: shade, moved: false };
  shadeButton.setPointerCapture(e.pointerId);
  windowEl.classList.add("dragging");
});
shadeButton.addEventListener("pointermove", (e) => {
  if (!drag) return;
  const dy = e.clientY - drag.y;
  if (Math.abs(dy) > 4) drag.moved = true;
  applyShade(drag.start + dy / 171);
});
function releaseShade() {
  if (!drag) return;
  const moved = drag.moved;
  drag = null;
  windowEl.classList.remove("dragging");
  applyShade(moved ? (shade > 0.5 ? 1 : 0) : shade > 0.5 ? 0 : 1, true);
}
shadeButton.addEventListener("pointerup", releaseShade);
shadeButton.addEventListener("pointercancel", () => {
  drag = null;
  windowEl.classList.remove("dragging");
  applyShade(shade > 0.5 ? 1 : 0, true);
});
shadeButton.addEventListener("click", (e) => {
  if (e.detail === 0) applyShade(shade > 0.5 ? 0 : 1, true);
});
const path = document.querySelector(".folio-path"),
  rail = document.querySelector(".path-rail"),
  track = document.querySelector(".folio-track"),
  curve = document.querySelector(".path-curve"),
  curvePaths = curve.querySelectorAll("path"),
  curveReveal = curve.querySelector(".path-reveal"),
  timelineDots = [...document.querySelectorAll(".tl-dot")];
const clamp01 = (value) => Math.max(0, Math.min(1, value));
let pathFrame = 0,
  measureFrame = 0,
  pathMetrics;

function measurePath() {
  measureFrame = 0;
  const width = curve.clientWidth || 44,
    height = curve.clientHeight || 110,
    bend = `M ${width} 0 V ${height * 0.23} C ${width} ${height * 0.58} 0 ${height * 0.42} 0 ${height * 0.78} V ${height}`;

  curve.setAttribute("viewBox", `0 0 ${width} ${height}`);
  curvePaths.forEach((curvePath) => curvePath.setAttribute("d", bend));
  curveReveal.setAttribute("width", width + 16);

  const scrollTop = window.scrollY,
    curveRect = curve.getBoundingClientRect(),
    railRect = rail.getBoundingClientRect();
  pathMetrics = {
    curveTop: curveRect.top + scrollTop,
    curveHeight: curveRect.height,
    railTop: railRect.top + scrollTop,
    railHeight: railRect.height,
    dotY: timelineDots.map((dot) => {
      const rect = dot.getBoundingClientRect();
      return rect.top + scrollTop + rect.height / 2;
    }),
  };
  requestPath();
}

function updatePath() {
  pathFrame = 0;
  if (!pathMetrics || folio.hidden || !entered) return;

  const viewportEdge = window.scrollY + innerHeight * 0.52,
    bottom =
      window.scrollY + innerHeight >= document.documentElement.scrollHeight - 3,
    complete = reduced.matches || bottom,
    curveProgress = complete
      ? 1
      : clamp01(
          (viewportEdge - pathMetrics.curveTop) / pathMetrics.curveHeight,
        ),
    railProgress = complete
      ? 1
      : clamp01(
          (viewportEdge - pathMetrics.railTop) / pathMetrics.railHeight,
        );

  curveReveal.setAttribute(
    "height",
    Math.max(0, curveProgress * pathMetrics.curveHeight + 8),
  );
  path.style.setProperty("--rail-p", railProgress);
  path.style.setProperty("--rail-y", railProgress * pathMetrics.railHeight);
  timelineDots.forEach((dot, index) => {
    const lit = complete || pathMetrics.dotY[index] <= viewportEdge;
    if (dot.classList.contains("is-lit") !== lit) {
      dot.classList.toggle("is-lit", lit);
    }
  });
}
function requestPath() {
  if (!pathFrame) {
    pathFrame = requestAnimationFrame(updatePath);
  }
}
function requestPathMeasure() {
  if (!measureFrame) {
    measureFrame = requestAnimationFrame(measurePath);
  }
}
window.addEventListener("scroll", requestPath, { passive: true });
window.addEventListener("resize", requestPathMeasure, { passive: true });
window.addEventListener("load", requestPathMeasure, { once: true });
new ResizeObserver(requestPathMeasure).observe(track);
document.fonts?.ready.then(requestPathMeasure);
const strategyDialog = document.querySelector("#strategy-dialog");
const strategyContent = document.querySelector("#strategy-modal-content");
const closeStrategyBtn = document.querySelector("#close-strategy-btn");

const memoryStrategyMap = {
  "placeholder-seo": "seo",
  "placeholder-media": "paidmedia",
  "placeholder-shopify": "shopify",
};

const dialog = document.querySelector(".memory-dialog");
document.querySelectorAll("[data-memory]").forEach(
  (button) =>
    (button.onclick = () => {
      const stratKey = memoryStrategyMap[button.dataset.memory];
      if (stratKey && strategyShowcases[stratKey]) {
        openStrategyModal(stratKey);
      } else {
        dialog.querySelector("img").src = shot(button.dataset.memory);
        dialog.querySelector("img").alt = button.querySelector("img").alt;
        dialog.querySelector("p").textContent = button.querySelector("img").alt;
        dialog.showModal();
      }
    }),
);
dialog.querySelector("button").onclick = () => dialog.close();
dialog.onclick = (e) => {
  if (e.target === dialog) dialog.close();
};

const strategyKeys = ["aeocase", "seocase", "paidmediacase"];

function renderStrategyModalContent(key) {
  const s = strategyShowcases[key];
  if (!s) return "";

  const waMsg = s.ctaMessage
    ? encodeURIComponent(s.ctaMessage)
    : s.ctaLabel
      ? encodeURIComponent(`Hi Ismail, ${s.ctaLabel.toLowerCase().startsWith("let's talk") ? s.ctaLabel : `let's talk about ${s.ctaLabel}`}.`)
      : encodeURIComponent(`Hi Ismail, I would like to discuss your ${s.ctaSubject || s.title} strategy.`);
  const waUrl = `https://wa.me/${profile.whatsapp}?text=${waMsg}`;
  const linkedinUrl = profile.linkedin;
  const cleanCategory = s.category ? s.category.replace(/^CASE\s*\/\/\s*/i, "") : "";

  return `
    <div class="dash-modal">
      
      <div class="dash-header-bar">
        <div class="dash-pills-row">
          <span class="dash-pill-tag">${s.tag}</span>
          ${cleanCategory ? `<span class="dash-category-meta">${cleanCategory}</span>` : ""}
        </div>
        ${
          s.verifiedBadge
            ? `
          <div class="dash-verified-tag">
            <svg class="dash-verified-icon" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3.5 8.5 6.5 11.5 12.5 4.5"/></svg>
            <span>${s.verifiedBadge}</span>
          </div>
        `
            : ""
        }
      </div>

      
      <div class="dash-title-wrap">
        <h2 class="dash-main-heading" id="strategy-modal-title">${s.title}</h2>
        <p class="dash-main-sub">${s.subtitle}</p>
        ${s.metaLine ? `<p class="dash-meta-line">${s.metaLine}</p>` : ""}
      </div>

      
      <div class="dash-section-block">
        <div class="dash-section-header">
          <span class="dash-section-eyebrow">Impact</span>
          <h3 class="dash-section-title">Project overview</h3>
        </div>
        <div class="dash-kpi-grid">
          ${s.topKpis
            .map(
              (kpi) => `
            <div class="dash-kpi-tile">
              <div class="dash-kpi-val">${kpi.value}</div>
              <div class="dash-kpi-label">${kpi.label}</div>
              <div class="dash-kpi-note">${kpi.sub}</div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      
      <div class="dash-section-block">
        <div class="dash-section-header">
          <span class="dash-section-eyebrow">Strategy</span>
          <h3 class="dash-section-title">Approach</h3>
        </div>
        <div class="dash-pillars-2x2">
          ${s.pillars
            .map(
              (p) => `
            <div class="dash-pillar-cell">
              <div class="dash-pillar-topline">
                <span class="dash-pillar-num">${p.num ? p.num.replace(/^PILLAR\s*/i, "") : ""}</span>
                <span class="dash-pillar-chip">${p.badge}</span>
              </div>
              <h4 class="dash-pillar-title">${p.title}</h4>
              <p class="dash-pillar-desc">${p.desc}</p>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      
      <div class="dash-action-bar">
        ${
          s.singleCta
            ? `
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="dash-cta-btn dash-cta-whatsapp dash-cta-single">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.69 19.74L5.52 16.7L5.33 16.39C4.54 15.14 4.12 13.68 4.12 12.18C4.12 7.64 7.82 3.67 12.05 3.67M9.04 7.67C8.88 7.67 8.63 7.73 8.42 7.96C8.21 8.19 7.62 8.74 7.62 9.87C7.62 11 8.44 12.09 8.56 12.24C8.67 12.4 10.18 14.72 12.49 15.72C13.04 15.96 13.47 16.1 13.8 16.21C14.36 16.39 14.86 16.36 15.26 16.3C15.71 16.23 16.64 15.74 16.83 15.2C17.03 14.67 17.03 14.21 16.97 14.12C16.91 14.03 16.76 13.97 16.53 13.86C16.3 13.74 15.18 13.19 14.97 13.11C14.76 13.04 14.61 13 14.45 13.23C14.3 13.46 13.87 13.97 13.74 14.12C13.61 14.28 13.48 14.3 13.25 14.18C13.02 14.07 12.28 13.83 11.41 13.05C10.73 12.44 10.27 11.69 10.14 11.47C10.01 11.24 10.13 11.11 10.24 11C10.35 10.89 10.48 10.72 10.6 10.59C10.71 10.45 10.76 10.35 10.83 10.2C10.91 10.05 10.87 9.92 10.81 9.8C10.76 9.69 10.3 8.56 10.11 8.11C9.92 7.67 9.73 7.73 9.58 7.72C9.44 7.71 9.28 7.71 9.12 7.71L9.04 7.67Z"/></svg>
            <span>${s.ctaLabel || "Let's talk about Aevis"}</span>
            <span aria-hidden="true" style="font-size: 11px;">↗</span>
          </a>
        `
            : `
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="dash-cta-btn dash-cta-whatsapp">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.69 19.74L5.52 16.7L5.33 16.39C4.54 15.14 4.12 13.68 4.12 12.18C4.12 7.64 7.82 3.67 12.05 3.67M9.04 7.67C8.88 7.67 8.63 7.73 8.42 7.96C8.21 8.19 7.62 8.74 7.62 9.87C7.62 11 8.44 12.09 8.56 12.24C8.67 12.4 10.18 14.72 12.49 15.72C13.04 15.96 13.47 16.1 13.8 16.21C14.36 16.39 14.86 16.36 15.26 16.3C15.71 16.23 16.64 15.74 16.83 15.2C17.03 14.67 17.03 14.21 16.97 14.12C16.91 14.03 16.76 13.97 16.53 13.86C16.3 13.74 15.18 13.19 14.97 13.11C14.76 13.04 14.61 13 14.45 13.23C14.3 13.46 13.87 13.97 13.74 14.12C13.61 14.28 13.48 14.3 13.25 14.18C13.02 14.07 12.28 13.83 11.41 13.05C10.73 12.44 10.27 11.69 10.14 11.47C10.01 11.24 10.13 11.11 10.24 11C10.35 10.89 10.48 10.72 10.6 10.59C10.71 10.45 10.76 10.35 10.83 10.2C10.91 10.05 10.87 9.92 10.81 9.8C10.76 9.69 10.3 8.56 10.11 8.11C9.92 7.67 9.73 7.73 9.58 7.72C9.44 7.71 9.28 7.71 9.12 7.71L9.04 7.67Z"/></svg>
            <span>WhatsApp</span>
          </a>
          <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer" class="dash-cta-btn dash-cta-linkedin">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.55a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z"/></svg>
            <span>LinkedIn Profile</span>
          </a>
          ${
            s.externalHref
              ? `
            <a href="${s.externalHref}" target="_blank" rel="noopener noreferrer" class="dash-cta-btn dash-cta-platform">
              <span>${s.externalLabel || "Launch Aevis Platform ↗"}</span>
            </a>
          `
              : ""
          }
        `
        }
      </div>
    </div>
  `;
}

function openStrategyModal(key) {
  if (!strategyDialog || !strategyShowcases[key]) return;
  strategyContent.innerHTML = renderStrategyModalContent(key);
  strategyDialog.showModal();
}

if (closeStrategyBtn && strategyDialog) {
  closeStrategyBtn.addEventListener("click", () => strategyDialog.close());
}
if (strategyDialog) {
  strategyDialog.addEventListener("click", (e) => {
    if (e.target === strategyDialog) {
      strategyDialog.close();
    }
  });
  strategyDialog.addEventListener("close", () => {
    if (
      location.pathname.includes("/case-studies/aeo-citation-growth") ||
      location.pathname.includes("/case-studies/seo-organic-growth") ||
      location.pathname.includes("/case-studies/paid-advertising")
    ) {
      history.replaceState(null, "", "/");
    }
  });
}

document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-strategy]");
  if (trigger) {
    e.preventDefault();
    const strat = trigger.dataset.strategy;
    openStrategyModal(strat);
    return;
  }
});

// Show Boarding Pass on initial load unless already boarded in session
if (store.get("ismail-ux-ui-portfolio:boarded") === "1" && sessionStorage.getItem("ismail-ux-ui-portfolio:entered") === "1") {
  gate.hidden = true;
  entered = true;
  folio.inert = false;
  folio.classList.remove("booting");
  document.documentElement.classList.remove("is-covered");
  requestPathMeasure();
} else {
  showGate();
}

import("./sky.js").then(({ mountSky }) => mountSky(document.querySelector(".sky"), windowEl)).catch(() => {});
