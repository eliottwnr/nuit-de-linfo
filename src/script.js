// DnD logique (version 1) + mode calibration interactif

const statusText = document.getElementById('status-text');
const resetBtn = document.getElementById('reset-btn');
const components = Array.from(document.querySelectorAll('.component'));
const zones = Array.from(document.querySelectorAll('.drop-zone'));
const board = document.querySelector('.board');

let placedCount = 0;

function updateStatus() {
  statusText.textContent = `${placedCount} / 6 placés`;
}
function resetGame() {
  placedCount = 0;
  zones.forEach(z => { z.classList.remove('filled'); z.innerHTML = ''; });
  components.forEach(c => {
    c.draggable = true; c.style.opacity = '1'; c.style.pointerEvents = ''; c.dataset.placed = 'false';
    document.querySelector('.tray').appendChild(c);
  });
  updateStatus();
}
resetBtn.addEventListener('click', resetGame);

// Toast
let toastTimer = null;
const toast = document.createElement('div');
toast.className = 'toast';
document.body.appendChild(toast);
function showToast(msg, type = 'ok') {
  toast.textContent = msg;
  toast.className = 'toast ' + (type === 'ok' ? 'ok' : 'err');
  void toast.offsetWidth;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1200);
}

// DnD
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
      showToast(`Composant ${draggedId} placé ✅`, 'ok');

      if (placedCount === 6) showToast('Bravo ! Tous les composants sont placés 🎉', 'ok');
    } else {
      showToast('Mauvais emplacement ❌', 'err');
    }
  });
});

updateStatus();

/* === Mode calibration === */
const toggleCalibBtn = document.getElementById('toggle-calib');
const copyZonesBtn = document.getElementById('copy-zones');
const toggleGrid = document.getElementById('toggle-grid');
const gridCanvas = document.getElementById('grid');
let calibActive = false;
let activeZone = null;
let dragState = null;

function pxToPercent(px, total) { return (px / total) * 100; }
function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

// Ajouter les handles
function addHandles(zone) {
  const handles = ['n','s','w','e','nw','ne','sw','se'];
  handles.forEach(h => {
    const el = document.createElement('div');
    el.className = 'handle ' + h;
    el.dataset.handle = h;
    zone.appendChild(el);
  });
}

// Activer/désactiver calibration
toggleCalibBtn.addEventListener('click', () => {
  calibActive = !calibActive;
  document.body.classList.toggle('calib-active', calibActive);
  toggleCalibBtn.textContent = calibActive ? 'Quitter calibration' : 'Mode calibration';

  zones.forEach(z => {
    if (calibActive) {
      if (!z.querySelector('.handle')) addHandles(z);
      // Drag zone surface
      z.style.cursor = 'move';
      z.addEventListener('mousedown', onZoneMouseDown);
      // Drag handles
      z.querySelectorAll('.handle').forEach(h => h.addEventListener('mousedown', onHandleMouseDown));
      // Focus pour nudge
      z.setAttribute('tabindex', '0');
      z.addEventListener('focus', () => activeZone = z);
    } else {
      // Clean handles & events
      z.querySelectorAll('.handle').forEach(h => h.remove());
      z.style.cursor = '';
      z.removeEventListener('mousedown', onZoneMouseDown);
      z.removeEventListener('focus', () => activeZone = z);
      z.removeAttribute('tabindex');
    }
  });
});

// Déplacements à la souris (zone)
function onZoneMouseDown(e) {
  if (e.target.classList.contains('handle')) return; // géré ailleurs
  activeZone = e.currentTarget;
  const rect = board.getBoundingClientRect();
  const zr = activeZone.getBoundingClientRect();
  dragState = {
    type: 'move',
    startX: e.clientX,
    startY: e.clientY,
    leftPct: parseFloat(activeZone.style.left),
    topPct: parseFloat(activeZone.style.top),
    widthPct: parseFloat(activeZone.style.width),
    heightPct: parseFloat(activeZone.style.height),
    boardW: rect.width,
    boardH: rect.height,
    zoneW: zr.width,
    zoneH: zr.height
  };
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
}

// Redimensionnement (handles)
function onHandleMouseDown(e) {
  e.stopPropagation();
  activeZone = e.currentTarget.parentElement;
  const rect = board.getBoundingClientRect();
  dragState = {
    type: 'resize',
    handle: e.currentTarget.dataset.handle,
    startX: e.clientX,
    startY: e.clientY,
    leftPct: parseFloat(activeZone.style.left),
    topPct: parseFloat(activeZone.style.top),
    widthPct: parseFloat(activeZone.style.width),
    heightPct: parseFloat(activeZone.style.height),
    boardW: rect.width,
    boardH: rect.height
  };
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(e) {
  if (!dragState || !activeZone) return;
  const dx = e.clientX - dragState.startX;
  const dy = e.clientY - dragState.startY;

  if (dragState.type === 'move') {
    const dLeft = pxToPercent(dx, dragState.boardW);
    const dTop = pxToPercent(dy, dragState.boardH);
    const newLeft = clamp(dragState.leftPct + dLeft, 0, 100 - dragState.widthPct);
    const newTop = clamp(dragState.topPct + dTop, 0, 100 - dragState.heightPct);
    activeZone.style.left = `${newLeft}%`;
    activeZone.style.top = `${newTop}%`;
  } else if (dragState.type === 'resize') {
    let { leftPct, topPct, widthPct, heightPct } = dragState;
    const dW = pxToPercent(dx, dragState.boardW);
    const dH = pxToPercent(dy, dragState.boardH);

    switch (dragState.handle) {
      case 'e': widthPct = clamp(widthPct + dW, 1, 100 - leftPct); break;
      case 'w': {
        const newLeft = clamp(leftPct + dW, 0, leftPct + widthPct - 1);
        widthPct = widthPct - (newLeft - leftPct);
        leftPct = newLeft;
        break;
      }
      case 's': heightPct = clamp(heightPct + dH, 1, 100 - topPct); break;
      case 'n': {
        const newTop = clamp(topPct + dH, 0, topPct + heightPct - 1);
        heightPct = heightPct - (newTop - topPct);
        topPct = newTop;
        break;
      }
      case 'se': widthPct = clamp(widthPct + dW, 1, 100 - leftPct);
                 heightPct = clamp(heightPct + dH, 1, 100 - topPct); break;
      case 'ne': widthPct = clamp(widthPct + dW, 1, 100 - leftPct);
                 const newTopNE = clamp(topPct + dH, 0, topPct + heightPct - 1);
                 heightPct = heightPct - (newTopNE - topPct);
                 topPct = newTopNE; break;
      case 'sw': {
        const newLeftSW = clamp(leftPct + dW, 0, leftPct + widthPct - 1);
        widthPct = widthPct - (newLeftSW - leftPct);
        leftPct = newLeftSW;
        heightPct = clamp(heightPct + dH, 1, 100 - topPct);
        break;
      }
      case 'nw': {
        const newLeftNW = clamp(leftPct + dW, 0, leftPct + widthPct - 1);
        const newTopNW = clamp(topPct + dH, 0, topPct + heightPct - 1);
        widthPct = widthPct - (newLeftNW - leftPct);
        heightPct = heightPct - (newTopNW - topPct);
        leftPct = newLeftNW; topPct = newTopNW;
        break;
      }
    }
    activeZone.style.left = `${leftPct}%`;
    activeZone.style.top = `${topPct}%`;
    activeZone.style.width = `${widthPct}%`;
    activeZone.style.height = `${heightPct}%`;
  }
}

function onMouseUp() {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
  dragState = null;
}

// Nudges au clavier
document.addEventListener('keydown', (e) => {
  if (!calibActive || !activeZone) return;
  const base = e.altKey ? 0.1 : (e.shiftKey ? 2 : 0.5);
  let left = parseFloat(activeZone.style.left);
  let top = parseFloat(activeZone.style.top);
  let width = parseFloat(activeZone.style.width);
  let height = parseFloat(activeZone.style.height);

  switch (e.key) {
    case 'ArrowLeft': left = clamp(left - base, 0, 100 - width); break;
    case 'ArrowRight': left = clamp(left + base, 0, 100 - width); break;
    case 'ArrowUp': top = clamp(top - base, 0, 100 - height); break;
    case 'ArrowDown': top = clamp(top + base, 0, 100 - height); break;
    default: return;
  }
  activeZone.style.left = `${left}%`;
  activeZone.style.top = `${top}%`;
  e.preventDefault();
});

// Copier zones
copyZonesBtn.addEventListener('click', () => {
  const data = zones.map(z => {
    const s = z.style;
    return {
      slot: z.dataset.slot,
      left: s.left, top: s.top, width: s.width, height: s.height
    };
  });
  const lines = data.map(d =>
    `<div class="drop-zone" data-slot="${d.slot}" style="left: ${d.left}; top: ${d.top}; width: ${d.width}; height: ${d.height};"></div>`
  ).join('\n');
  navigator.clipboard.writeText(lines).then(() => showToast('Zones copiées dans le presse-papiers ✅', 'ok'));
});

// Grille (8×8 pixels)
function drawGrid() {
  const ctx = gridCanvas.getContext('2d');
  const { width, height } = board.getBoundingClientRect();
  gridCanvas.width = Math.round(width);
  gridCanvas.height = Math.round(height);

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;

  // Taille de cellule proportionnée: 8 px "logiques" à l’échelle de la board
  // Comme on ne connaît pas l’échelle exacte, on trace une grille fixe visuelle
  const step = Math.max(8, Math.round(width / 64)); // approx ~64 colonnes
  for (let x = 0; x < width; x += step) {
    ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, height); ctx.stroke();
  }
  for (let y = 0; y < height; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(width, y + 0.5); ctx.stroke();
  }
}
toggleGrid.addEventListener('change', () => {
  if (toggleGrid.checked) {
    gridCanvas.classList.add('show');
    drawGrid();
  } else {
    gridCanvas.classList.remove('show');
  }
});
window.addEventListener('resize', () => { if (gridCanvas.classList.contains('show')) drawGrid(); });

// Fin