// Eternity Wiki Guestbook System
// LocalStorage-basiert für Static-Site-Speicherung

document.addEventListener('DOMContentLoaded', function() {
  // Guestbook entry submission
  const form = document.getElementById('guestbook-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('guest-name').value.trim() || 'Anonym';
      const message = document.getElementById('guest-message').value.trim();
      
      if (message.length === 0) return;
      if (message.length > 500) return;
      
      const entry = {
        id: Date.now().toString(),
        name: name,
        message: message,
        timestamp: new Date().toISOString()
      };
      
      saveGuestbookEntry(entry);
      form.reset();
      renderEntries();
    });
  }
  
  // Render guestbook entries
  const entriesContainer = document.getElementById('entries-list');
  if (entriesContainer) {
    renderEntries();
  }
});

function saveGuestbookEntry(entry) {
  let entries = JSON.parse(localStorage.getItem('eternity_guestbook') || '[]');
  entries.unshift(entry); // prepend newest
  localStorage.setItem('eternity_guestbook', JSON.stringify(entries));
}

function renderEntries() {
  const container = document.getElementById('entries-list');
  if (!container) return;
  
  let entries = JSON.parse(localStorage.getItem('eternity_guestbook') || '[]');
  
  if (entries.length === 0) {
    container.innerHTML = '<p class="no-entries">Noch keine Einträge. Sei der erste!</p>';
    return;
  }
  
  const html = entries.map(entry => {
    const date = new Date(entry.timestamp).toLocaleString('de-DE', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    
    return `<article class="guestbook-entry">
      <div class="entry-header">
        <span class="entry-name">${escapeHtml(entry.name)}</span>
        <span class="entry-date">${date}</span>
      </div>
      <div class="entry-message">${escapeHtml(entry.message)}</div>
    </article>`;
  }).join('');
  
  container.innerHTML = html;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}