// Eternity Wiki Comment System
// LocalStorage-basiert für Static-Site-Speicherung

document.addEventListener('DOMContentLoaded', function() {
  // Comment submission
  const commentForm = document.getElementById('comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('comment-name').value.trim() || 'Anonym';
      const message = document.getElementById('comment-message').value.trim();
      
      if (message.length === 0) return;
      if (message.length > 500) return;
      
      const comment = {
        id: Date.now().toString(),
        pageId: window.location.pathname,
        name: name,
        message: message,
        timestamp: new Date().toISOString()
      };
      
      saveComment(comment);
      commentForm.reset();
      renderComments();
    });
  }
  
  // Render comments for current page
  const commentsContainer = document.getElementById('comments-list');
  if (commentsContainer) {
    renderComments();
  }
});

function saveComment(comment) {
  let comments = JSON.parse(localStorage.getItem('eternity_comments') || '[]');
  comments.unshift(comment); // prepend newest
  localStorage.setItem('eternity_comments', JSON.stringify(comments));
}

function getComments() {
  let comments = JSON.parse(localStorage.getItem('eternity_comments') || '[]');
  // Filter comments for current page
  return comments.filter(c => c.pageId === window.location.pathname);
}

function renderComments() {
  const container = document.getElementById('comments-list');
  if (!container) return;
  
  const comments = getComments();
  
  if (comments.length === 0) {
    container.innerHTML = '<p class="no-comments">Noch keine Kommentare. Sei der erste!</p>';
    return;
  }
  
  const html = comments.map(comment => {
    const date = new Date(comment.timestamp).toLocaleString('de-DE', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    
    return `<article class="comment-entry">
      <div class="comment-header">
        <span class="comment-name">${escapeHtml(comment.name)}</span>
        <span class="comment-date">${date}</span>
      </div>
      <div class="comment-message">${escapeHtml(comment.message)}</div>
    </article>`;
  }).join('');
  
  container.innerHTML = html;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Check if comment section exists on page
const commentSection = document.getElementById('comment-section');
if (commentSection) {
  const count = getComments().length;
  const counter = document.getElementById('comment-count');
  if (counter && count > 0) {
    counter.textContent = `${count} Kommentar${count !== 1 ? 'e' : ''}`;
  }
}