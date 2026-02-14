(function () {
  const params = new URLSearchParams(window.location.search);
  const qty = Math.min(3, Math.max(1, parseInt(params.get("qty") || "1", 10) || 1));

  // ===== HEADER =====
  document.getElementById("qtyBadgeTop").textContent = `Reservado para ${qty} persona${qty > 1 ? "s" : ""}`;
  document.getElementById("welcomeLine").innerHTML = `<span class="highlight">MARIUXI Y RAUL</span> tienen el honor de invitarte al Baby Shower de`;
  document.getElementById("babyName").textContent = CONFIG.BABY_NAME;
  document.getElementById("eventTitle").textContent = `${CONFIG.EVENT_TITLE} - ${CONFIG.BABY_NAME}`;

  // ===== FECHA =====
  const eventDate = new Date(CONFIG.EVENT_DATETIME);
  
  function fmt2(n) { return String(n).padStart(2, "0"); }
  
  const monthsShort = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
  document.getElementById("dateDayDisplay").textContent = fmt2(eventDate.getDate());
  document.getElementById("dateMonthDisplay").textContent = monthsShort[eventDate.getMonth()];
  document.getElementById("dateYearDisplay").textContent = eventDate.getFullYear();

  // ===== UBICACIÓN =====
  document.getElementById("locTitle").textContent = CONFIG.LOCATION_TITLE;
  document.getElementById("locLine").textContent = CONFIG.LOCATION_LINE;
  
  const mapFrame = document.getElementById("mapFrame");
  if (mapFrame) mapFrame.src = CONFIG.MAP_EMBED_URL;

  const mapsBtn = document.getElementById("mapsBtn");
  mapsBtn.href = CONFIG.MAPS_OPEN_URL;

  // ===== OBSEQUIO =====
  document.getElementById("giftNote").innerHTML = `"${CONFIG.GIFT_NOTE}"`;

  // ===== RSVP =====
  const rsvpBtn = document.getElementById("rsvpBtn");
  const rsvpMessage = encodeURIComponent(CONFIG.RSVP_MESSAGE);
  rsvpBtn.href = `https://wa.me/${CONFIG.ORGANIZER_PHONE}?text=${rsvpMessage}`;
  
  const previewEl = document.getElementById("rsvpMessagePreview");
  if (previewEl) previewEl.textContent = `"${CONFIG.RSVP_MESSAGE}"`;

  // ===== FECHA Y HORA =====
  const weekdays = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  document.getElementById("dateLine").textContent =
    `${weekdays[eventDate.getDay()]}, ${eventDate.getDate()} de ${months[eventDate.getMonth()]} · ${fmt2(eventDate.getHours())}:${fmt2(eventDate.getMinutes())}`;

  document.getElementById("eventTimeText").textContent = `${fmt2(eventDate.getHours())}:${fmt2(eventDate.getMinutes())}`;

  // ===== COUNTDOWN =====
  const cdDays = document.getElementById("cdDays");
  const cdHours = document.getElementById("cdHours");
  const cdMinutes = document.getElementById("cdMinutes");

  function tickCountdown() {
    const now = new Date();
    let diff = eventDate - now;
    if (diff < 0) diff = 0;

    const totalMin = Math.floor(diff / 60000);
    const days = Math.floor(totalMin / (60 * 24));
    const hours = Math.floor((totalMin % (60 * 24)) / 60);
    const mins = totalMin % 60;

    cdDays.textContent = fmt2(days);
    cdHours.textContent = fmt2(hours);
    cdMinutes.textContent = fmt2(mins);
  }
  
  tickCountdown();
  setInterval(tickCountdown, 1000);

  // ===== PROGRESS BAR =====
  function updateProgress() {
    const now = new Date();
    const start = new Date(eventDate.getFullYear(), 0, 1);
    const total = eventDate - start;
    const left = eventDate - now;
    const pct = total > 0 ? Math.max(0, Math.min(100, 100 - (left / total) * 100)) : 0;
    const bar = document.getElementById("countProgress");
    if (bar) bar.style.width = pct.toFixed(1) + "%";
  }
  updateProgress();
  setInterval(updateProgress, 60000);

  // ===== MODAL RELOJ =====
  const timeBtn = document.getElementById("timeBtn");
  const modal = document.getElementById("clockModal");
  const digital = document.getElementById("digitalClock");
  
  const handHour = document.getElementById("handHour");
  const handMin = document.getElementById("handMin");
  const handSec = document.getElementById("handSec");

  let clockInt = null;

  function openModal() {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");

    function updateClock() {
      const n = new Date();
      const h = n.getHours();
      const m = n.getMinutes();
      const s = n.getSeconds();

      digital.textContent = `${fmt2(h)}:${fmt2(m)}:${fmt2(s)}`;

      const secDeg = s * 6;
      const minDeg = (m + s / 60) * 6;
      const hourDeg = ((h % 12) + m / 60) * 30;

      if (handSec) handSec.style.transform = `translate(-50%, -100%) rotate(${secDeg}deg)`;
      if (handMin) handMin.style.transform = `translate(-50%, -100%) rotate(${minDeg}deg)`;
      if (handHour) handHour.style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
    }

    updateClock();
    clockInt = setInterval(updateClock, 250);
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    if (clockInt) clearInterval(clockInt);
    clockInt = null;
  }

  timeBtn.addEventListener("click", openModal);
  
  modal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close) closeModal();
  });
})();