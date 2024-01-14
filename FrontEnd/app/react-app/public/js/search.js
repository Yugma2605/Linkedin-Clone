const searchInput = document.getElementById('searchInput');
  const searchIcon = document.getElementById('searchIcon');

  searchInput.addEventListener('focus', () => {
    searchIcon.classList.add('active');
  });

  searchInput.addEventListener('blur', () => {
    if (!searchInput.value.trim()) {
      searchIcon.classList.remove('active');
    }
  });