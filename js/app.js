document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('[data-target]');
  const screens = document.querySelectorAll('.screen');

  function switchScreen(targetId) {
    screens.forEach(screen => {
      screen.classList.remove('active');
    });

    const activeScreen = document.getElementById(targetId);
    if (activeScreen) {
      activeScreen.classList.add('active');
    }

    navButtons.forEach(btn => {
      if (btn.getAttribute('data-target') === targetId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      switchScreen(target);
    });
  });

  // Интерактив чекбоксов списка
  const taskCheckboxes = document.querySelectorAll('.task-checkbox-wrap input');
  taskCheckboxes.forEach(ch => {
    ch.addEventListener('change', (e) => {
      const card = e.target.closest('.task-item-card');
      if (card) {
        card.classList.toggle('completed', e.target.checked);
      }
    });
  });
});