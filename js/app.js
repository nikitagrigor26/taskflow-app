document.addEventListener('DOMContentLoaded', () => {
  // 1. Навигация между логическими экранами
  const triggerElements = document.querySelectorAll('[data-target]');
  const screens = document.querySelectorAll('.screen');
  const navButtons = document.querySelectorAll('.nav-tab-btn, .desktop-nav-item');

  function switchScreen(targetId) {
    if (!targetId) return;

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

  triggerElements.forEach(element => {
    element.addEventListener('click', (e) => {
      const target = element.getAttribute('data-target');
      if (target) {
        switchScreen(target);
      }
    });
  });

  // 2. Обработка чекбоксов задач и пересчет счетчика
  const taskCheckboxes = document.querySelectorAll('.task-checkbox-wrap input');
  const counterText = document.getElementById('task-counter-text');
  const badge = document.getElementById('task-badge');

  function updateTaskStats() {
    const total = taskCheckboxes.length;
    let completedCount = 0;

    taskCheckboxes.forEach((checkbox, index) => {
      const card = checkbox.closest('.task-item-card');
      if (checkbox.checked) {
        completedCount++;
        if (card) card.classList.add('completed');
      } else {
        if (card) card.classList.remove('completed');
      }
      // Сохраняем состояние чекбокса в LocalStorage
      localStorage.setItem(`taskflow_task_${index}`, checkbox.checked ? 'true' : 'false');
    });

    if (counterText) {
      counterText.textContent = `Выполнено ${completedCount} из ${total} задач`;
    }
    if (badge) {
      badge.textContent = `${completedCount} / ${total}`;
    }
  }

  // Восстановление состояния чекбоксов из LocalStorage
  taskCheckboxes.forEach((checkbox, index) => {
    const savedState = localStorage.getItem(`taskflow_task_${index}`);
    if (savedState !== null) {
      checkbox.checked = savedState === 'true';
    }
    checkbox.addEventListener('change', updateTaskStats);
  });

  updateTaskStats();

  // 3. Интерактивные чипы-фильтры категорий
  const chips = document.querySelectorAll('.chip-item');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterCategory = chip.textContent.trim().toLowerCase();
      const taskCards = document.querySelectorAll('.task-item-card');

      taskCards.forEach(card => {
        const tagElement = card.querySelector('.category-tag');
        const tagText = tagElement ? tagElement.textContent.trim().toLowerCase() : '';

        if (filterCategory === 'все дела' || filterCategory === 'все' || tagText.includes(filterCategory)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Переключатель приоритетов в экране детализации
  const priorityPills = document.querySelectorAll('.priority-pill');
  priorityPills.forEach(pill => {
    pill.addEventListener('click', () => {
      priorityPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
});