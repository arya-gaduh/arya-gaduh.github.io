const field = document.getElementById('paper-search');

function filterPapers() {
  const query = field.value.trim().toLowerCase();

  document.querySelectorAll('.compact-research .research-group')
    .forEach(group => {
      let count = 0;

      group.querySelectorAll('.compact-paper').forEach(paper => {

	const terms = query.split(/\s+OR\s+/i)
  	.map(term => term.trim())
  	.filter(Boolean);

	const text = paper.textContent.toLowerCase();
	paper.hidden = terms.length > 0 &&
  		!terms.some(term => text.includes(term));
        if (!paper.hidden) count++;
      });

      group.hidden = count === 0;
    });
}

// Restore the search from a shared URL.
field.value = new URL(location.href).searchParams.get('q') || '';
filterPapers();

// Keep the address bar synchronized so its URL can be copied.
field.addEventListener('input', () => {
  filterPapers();

  const url = new URL(location.href);
  const query = field.value.trim();

  if (query) {
    url.searchParams.set('q', query);
  } else {
    url.searchParams.delete('q');
  }

  history.replaceState(null, '', url);
});