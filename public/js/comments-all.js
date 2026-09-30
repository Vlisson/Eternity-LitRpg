// Eternity Wiki All Comments Viewer
// Zeigt alle Kommentare von allen Seiten an

document.addEventListener('DOMContentLoaded', function() {
  renderAllComments();
  
  // Clear all comments button
  const clearBtn = document.getElementById('clear-comments');
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      if (confirm('Alle Kommentare wirklich löschen?')) {
        localStorage.removeItem('eternity_comments');
        renderAllComments();
      }
    });
  }
});

function renderAllComments() {
  const container = document.getElementById('comments-list');
  if (!container) return;
  
  let comments = JSON.parse(localStorage.getItem('eternity_comments') || '[]');
  
  if (comments.length === 0) {
    container.innerHTML = '<p class="no-comments">Noch keine Kommentare vorhanden.</p>';
    return;
  }
  
  // Sort by timestamp descending
  comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  // Group by page
  const byPage = {};
  comments.forEach(c => {
    if (!byPage[c.pageId]) byPage[c.pageId] = [];
    byPage[c.pageId].push(c);
  });
  
  let html = '';
  Object.keys(byPage).forEach(pageId => {
    const pageComments = byPage[pageId];
    const pageName = getPageName(pageId);
    
    html += `<section class="comments-page">
      <h2 class="page-title">${pageName}</h2>
      ${renderCommentGroup(pageComments)}
    </section>`;
  });
  
  container.innerHTML = html;
}

function renderCommentGroup(comments) {
  return comments.map(c => {
    const date = new Date(c.timestamp).toLocaleString('de-DE', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    
    return `<article class="comment-entry">
      <div class="comment-header">
        <span class="comment-name">${escapeHtml(c.name)}</span>
        <span class="comment-date">${date}</span>
      </div>
      <div class="comment-message">${escapeHtml(c.message)}</div>
    </article>`;
  }).join('');
}

function getPageName(pageId) {
  // Extract page name from path
  const parts = pageId.split('/');
  const filename = parts[parts.length - 1];
  const name = filename.replace('.html', '').replace('.html', '');
  return name.charAt(0).toUpperCase() + name.slice(1) || 'Wiki-Seite';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}