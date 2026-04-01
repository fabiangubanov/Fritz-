const STORAGE_KEY = "fritzpass.entries.fritz.box";
const FRITZ_HOST = "fritz.box";

const panel = document.querySelector("#panel");
const closePanelButton = document.querySelector("#close-panel");
const domainWarning = document.querySelector("#domain-warning");
const form = document.querySelector("#entry-form");
const entriesList = document.querySelector("#entries");
const emptyState = document.querySelector("#empty-state");
const clearAllButton = document.querySelector("#clear-all");
const template = document.querySelector("#entry-template");
const generateButton = document.querySelector("#generate");

function isFritzDomain() {
  return window.location.hostname === FRITZ_HOST;
}

function readEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function generatePassword(length = 20) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*-_";
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => alphabet[b % alphabet.length]).join("");
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

async function copyToClipboard(value) {
  await navigator.clipboard.writeText(value);
}

function renderEntries() {
  const entries = readEntries();
  entriesList.innerHTML = "";
  emptyState.hidden = entries.length > 0;

  for (const entry of entries) {
    const node = template.content.firstElementChild.cloneNode(true);
    node.dataset.id = entry.id;
    node.querySelector(".username").textContent = entry.username;
    node.querySelector(".password").textContent = entry.password;
    node.querySelector(".note").textContent = entry.note || "-";
    node.querySelector(".timestamp").textContent = `Gespeichert: ${formatDate(entry.createdAt)}`;

    node.querySelector(".copy").addEventListener("click", async () => {
      try {
        await copyToClipboard(entry.password);
        node.querySelector(".copy").textContent = "Kopiert!";
        setTimeout(() => {
          node.querySelector(".copy").textContent = "Kopieren";
        }, 1000);
      } catch {
        alert("Kopieren fehlgeschlagen.");
      }
    });

    node.querySelector(".delete").addEventListener("click", () => {
      writeEntries(readEntries().filter((item) => item.id !== entry.id));
      renderEntries();
    });

    entriesList.append(node);
  }
}

function togglePanel(force) {
  const shouldOpen = typeof force === "boolean" ? force : panel.hidden;
  panel.hidden = !shouldOpen;
}

function setDomainLockState() {
  const allowed = isFritzDomain();
  domainWarning.hidden = allowed;
  for (const element of form.elements) {
    element.disabled = !allowed;
  }
  clearAllButton.disabled = !allowed;
}

document.addEventListener("keydown", (event) => {
  if (event.key === "F9") {
    event.preventDefault();
    togglePanel();
  }
});

closePanelButton.addEventListener("click", () => togglePanel(false));

generateButton.addEventListener("click", () => {
  document.querySelector("#password").value = generatePassword();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isFritzDomain()) {
    alert("Nur auf fritz.box erlaubt.");
    return;
  }

  const formData = new FormData(form);
  const entry = {
    id: crypto.randomUUID(),
    username: String(formData.get("username") ?? "").trim(),
    password: String(formData.get("password") ?? "").trim(),
    note: String(formData.get("note") ?? "").trim(),
    createdAt: new Date().toISOString(),
  };

  if (!entry.username || !entry.password) {
    alert("Bitte Benutzername und Passwort ausfüllen.");
    return;
  }

  const entries = readEntries();
  entries.unshift(entry);
  writeEntries(entries);
  form.reset();
  renderEntries();
});

clearAllButton.addEventListener("click", () => {
  if (!isFritzDomain()) {
    return;
  }
  if (!confirm("Wirklich alle Einträge löschen?")) {
    return;
  }
  writeEntries([]);
  renderEntries();
});

setDomainLockState();
renderEntries();
