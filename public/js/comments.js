// Firebase-enabled Comment System for Eternity Wiki
// Cloud-basierte Speicherung via Firebase Firestore
// Ersetze firebase-config.js durch deine echte Firebase-Konfiguration

import { db, collection, addDoc, getDocs, query, orderBy, onSnapshot } from "./firebase-config.js";
import { COMMENTS_COLLECTION } from "./firebase-config.js";

// DOM-Elemente
const commentForm = document.getElementById('comment-form');
const commentsContainer = document.getElementById('comments-list');

// Aktuelle Seite-ID
function getPageId() {
  return window.location.pathname.replace(/\.html$/, '') || '/index';
}

// Echtzeit-Listener für Kommentare der aktuellen Seite
function initCommentListener() {
  if (!commentsContainer) return;

  const q = query(
    collection(db, COMMENTS_COLLECTION),
    orderBy("timestamp", "desc")
  );

  onSnapshot(q, (snapshot) => {
    const pageId = getPageId();
    let html = "";

    snapshot.forEach((doc) => {
      const comment = doc.data();
      // Nur Kommentare für die aktuelle Seite anzeigen
      if (comment.pageId !== pageId) return;

      const date = new Date(comment.timestamp).toLocaleString('de-DE', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });

      html += `<article class="comment-entry">
        <div class="comment-header">
          <span class="comment-name">${escapeHtml(comment.name)}</span>
          <span class="comment-date">${date}</span>
        </div>
        <div class="comment-message">${escapeHtml(comment.message)}</div>
      </article>`;
    });

    if (html === "") {
      commentsContainer.innerHTML = '<p class="no-comments">Noch keine Kommentare. Sei der erste!</p>';
    } else {
      commentsContainer.innerHTML = html;
    }
  });
}

// Kommentar absenden
function handleCommentSubmit(e) {
  e.preventDefault();
  const name = (document.getElementById('comment-name') || {}).value?.trim() || 'Anonym';
  const message = (document.getElementById('comment-message') || {}).value?.trim();

  if (!message || message.length === 0) return;
  if (message.length > 500) return;

  const comment = {
    id: Date.now().toString(),
    pageId: getPageId(),
    name: name,
    message: message,
    timestamp: new Date().toISOString()
  };

  addDoc(collection(db, COMMENTS_COLLECTION), comment)
    .then(() => {
      commentForm.reset();
    })
    .catch((error) => {
      console.error("Fehler beim Speichern des Kommentars:", error);
      alert("Fehler beim Speichern. Bitte erneut versuchen.");
    });
}

// Initialisierung bei Seite Laden
document.addEventListener('DOMContentLoaded', function() {
  if (commentForm) {
    commentForm.addEventListener('submit', handleCommentSubmit);
  }

  initCommentListener();
});

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
