const statusText = document.getElementById('status-text');
const resetBtn = document.getElementById('reset-btn');
const components = Array.from(document.querySelectorAll('.component'));
const zones = Array.from(document.querySelectorAll('.drop-zone'));

let placedCount = 0;

pts.puzzle = 0;

let toastTimer = null;
const toast = document.createElement('div');
toast.className = 'toast';
document.body.appendChild(toast);

function showToast(msg, type = 'ok', duration = 1600) {
  toast.textContent = msg;
  toast.classList.remove('ok', 'err', 'show');
  toast.classList.add(type);
  void toast.offsetWidth;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

function updateStatus() {
  statusText.textContent = `${placedCount} / 6 placés`;
  pts.puzzle += 50;
}

function resetGame() {
  placedCount = 0;
  zones.forEach(z => { z.classList.remove('filled'); z.innerHTML = ''; });
  components.forEach(c => {
    c.draggable = true;
    c.style.opacity = '1';
    c.style.pointerEvents = '';
    c.dataset.placed = 'false';
    document.querySelector('.tray').appendChild(c);
  });
  updateStatus();
  showToast('Réinitialisé 🔄', 'ok', 1000);
}

resetBtn.addEventListener('click', resetGame);

components.forEach(comp => {
  comp.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', comp.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
    zones.forEach(z => z.classList.add('highlight'));
  });
  comp.addEventListener('dragend', () => {
    zones.forEach(z => z.classList.remove('highlight'));
  });
});

zones.forEach(zone => {
  zone.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const slot = zone.dataset.slot;
    const comp = components.find(c => c.dataset.id === draggedId);
    if (!draggedId || !comp) return;

    if (slot === draggedId && zone.children.length === 0) {
      const clone = comp.querySelector('img').cloneNode(true);
      clone.style.width = '100%';
      clone.style.height = '100%';
      clone.style.objectFit = 'contain';
      clone.style.imageRendering = 'pixelated';
      zone.appendChild(clone);

      zone.classList.add('filled');
      comp.draggable = false;
      comp.style.opacity = '0.45';
      comp.style.pointerEvents = 'none';
      comp.dataset.placed = 'true';
      placedCount += 1;
      updateStatus();
        showToast(`Composant ${draggedId} placé ✅ (${pts.puzzle} points récupérés)`, 'ok', 1200);

      if (placedCount === 6) showToast('Bravo ! Tous les composants sont placés 🎉', 'ok', 1800);
    } else {
      const msg = slot !== draggedId
        ? `Composant ${draggedId} ➜ mauvaise zone (attendu: ${slot}) ❌`
        : `Cette zone est déjà occupée ❌`;
      showToast(msg, 'err', 2000);
    }
  });
});
sessionStorage.setItem('puzzle', pts.puzzle);
updateStatus();
