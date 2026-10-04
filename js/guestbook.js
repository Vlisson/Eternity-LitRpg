// Firebase-enabled Guestbook for Eternity Wiki
// Cloud-basierte Speicherung via Firebase Firestore
// Ersetze firebase-config.js durch deine echte Firebase-Konfiguration

import { db, collection, addDoc, getDocs, query, orderBy, onSnapshot } from "./firebase-config.js";
import { GUESTBOOK_COLLECTION } from "./firebase-config.js";

// DOM-Elemente
const form = document.getElementById('guestbook-form');
const entriesContainer = document.getElementById('entries-list');
const nameInput = document.getElementById('guest-name');

// Echtzeit-Listener für Guestbook-Einträge
function initGuestbookListener() {
  if (!entriesContainer) return;

  const q = query(collection(db, GUESTBOOK_COLLECTION), orderBy("timestamp", "desc"));

  onSnapshot(q, (snapshot) => {
    let html = "";
    snapshot.forEach((doc) => {
      const entry = doc.data();
      const date = new Date(entry.timestamp).toLocaleString('de-DE', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });

      html += `<article class="guestbook-entry">
        <div class="entry-header">
          <span class="entry-name">${escapeHtml(entry.name)}</span>
          <span class="entry-date">${date}</span>
        </div>
        <div class="entry-message">${escapeHtml(entry.message)}</div>
      </article>`;
    });

    if (html === "") {
      entriesContainer.innerHTML = '<p class="no-entries">Noch keine Einträge. Sei der erste!</p>';
    } else {
      entriesContainer.innerHTML = html;
    }
  });
}

// Gästebuch-Eintrag absenden
function handleGuestbookSubmit(e) {
  e.preventDefault();
  const name = (nameInput.value || 'Anonym').trim();
  const message = (document.getElementById('guest-message') || {}).value?.trim();

  if (!message || message.length === 0) return;
  if (message.length > 500) return;

  const entry = {
    id: Date.now().toString(),
    name: name,
    message: message,
    timestamp: new Date().toISOString()
  };

  addDoc(collection(db, GUESTBOOK_COLLECTION), entry)
    .then(() => {
      form.reset();
      // Listener aktualisiert die Anzeige automatisch
    })
    .catch((error) => {
      console.error("Fehler beim Speichern des Gastbucheintrags:", error);
      alert("Fehler beim Speichern. Bitte erneut versuchen.");
    });
}

// Initialisierung bei Seite Laden
document.addEventListener('DOMContentLoaded', function() {
  // Formular-Event-Listener
  if (form) {
    form.addEventListener('submit', handleGuestbookSubmit);
  }

  // Echtzeit-Listener starten
  initGuestbookListener();
});

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
