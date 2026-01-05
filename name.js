document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('username');
  const btn = document.getElementById('mysubmit');
  const clearBtn = document.getElementById('clearname');
  const out = document.getElementById('myhello');
  const playerName = document.getElementById('playerName');
  const playerGreeting = document.getElementById('playerGreeting');

  if (input) input.value = '';
  if (out) out.textContent = '';
  if (playerName) playerName.textContent = '';
  if (playerGreeting) playerGreeting.textContent = '';

  function setName(name) {
    if (!name) return;
    out.textContent = `Hallo ${name}!`;
    if (playerGreeting) playerGreeting.textContent = `Lykke til, ${name}!`;
    try { localStorage.setItem('username', name); } catch (e) { }
  }

  btn.addEventListener('click', () => {
    const name = input.value.trim();
    if (!name) return;
    setName(name);
    input.value = '';
    input.focus();
  });

  if (clearBtn) clearBtn.addEventListener('click', () => {
    try { localStorage.removeItem('username'); } catch (e) { }
    if (out) out.textContent = '';
    if (playerName) playerName.textContent = '';
    if (playerGreeting) playerGreeting.textContent = '';
    if (input) { input.value = ''; input.focus(); }
  });
});
