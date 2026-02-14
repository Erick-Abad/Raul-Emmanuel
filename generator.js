(function () {
  const form = document.getElementById("genForm");
  const qtySelect = document.getElementById("qtySelect");
  const phoneInput = document.getElementById("phoneInput");
  const errBox = document.getElementById("errBox");

  const previewFrame = document.getElementById("previewFrame");
  const previewBadge = document.getElementById("previewBadge");

  const copyBtn = document.getElementById("copyBtn");
  const openBtn = document.getElementById("openBtn");

  const toastEl = document.getElementById("copyToast");
  const toastText = document.getElementById("copyToastText");
  const toast = new bootstrap.Toast(toastEl, { delay: 1600 });

  function showErr(msg) {
    errBox.textContent = msg;
    errBox.classList.remove("d-none");
  }
  function clearErr() {
    errBox.textContent = "";
    errBox.classList.add("d-none");
  }
  function showToast(msg) {
    toastText.textContent = msg;
    toast.show();
  }

  function normalizeEcuadorPhone(input) {
    if (!input) return null;
    let s = String(input).trim();
    s = s.replaceAll(" ", "").replaceAll("-", "").replaceAll("(", "").replaceAll(")", "");

    if (s.startsWith("+")) s = s.slice(1);

    if (/^09\d{8}$/.test(s)) return "593" + s.slice(1);
    if (/^5939\d{8}$/.test(s)) return s;

    return null;
  }

  function inviteLink(qty) {
    const q = Math.min(3, Math.max(1, parseInt(qty, 10) || 1));
    return `invitacion.html?qty=${q}`;
  }

  function absoluteInviteLink(qty) {
    const rel = inviteLink(qty);
    try {
      return new URL(rel, window.location.href).toString();
    } catch {
      return rel;
    }
  }

  function updatePreview() {
    const qty = parseInt(qtySelect.value, 10) || 1;
    previewBadge.textContent = `Reservado para ${qty} persona${qty > 1 ? "s" : ""}`;
    previewFrame.src = inviteLink(qty);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copiado ✅");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      showToast("Copiado ✅");
    }
  }

  qtySelect.addEventListener("change", function() {
    clearErr();
    updatePreview();
  });

  copyBtn.addEventListener("click", async function() {
    clearErr();
    const qty = parseInt(qtySelect.value, 10) || 1;
    await copyText(absoluteInviteLink(qty));
  });

  openBtn.addEventListener("click", function() {
    clearErr();
    const qty = parseInt(qtySelect.value, 10) || 1;
    window.open(inviteLink(qty), "_blank", "noopener");
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    clearErr();

    const qty = parseInt(qtySelect.value, 10) || 1;
    const phone = normalizeEcuadorPhone(phoneInput.value);

    if (!phone) {
      showErr("Número inválido. Usa 09xxxxxxxx o +593xxxxxxxxx");
      return;
    }

    const urlToSend = absoluteInviteLink(qty);
    const msg = CONFIG.WA_MESSAGE_PREFIX + urlToSend;
    const wa = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

    window.open(wa, "_blank", "noopener");
  });

  updatePreview();
})();