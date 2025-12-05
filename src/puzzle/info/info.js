const board = document.getElementById('board');
const tooltip = document.getElementById('tooltip');
const hotspots = Array.from(document.querySelectorAll('.hotspot'));

const texts = {
  cpu: {
    title: 'CPU — le cerveau',
    desc: 'C’est lui qui “réfléchit”. Il exécute les instructions et coordonne les tâches. Il se clipse dans la carte mère.'
  },
  ram: {
    title: 'RAM — la mémoire rapide',
    desc: 'Mémoire de travail très rapide. Elle permet au CPU d’accéder aux données immédiatement pendant que tu utilises l’ordi.'
  },
  nvme: {
    title: 'NVMe — le disque ultra rapide',
    desc: 'Un SSD très rapide (format M.2). Les démarrages et les chargements sont bien plus rapides qu’avec un disque dur classique.'
  },
  bay: {
    title: 'Baie de disque dur — le gros stockage',
    desc: 'Emplacement pour mettre un disque (HDD ou SSD SATA). Pratique pour stocker beaucoup de fichiers: photos, vidéos, jeux.'
  },
  gpu: {
    title: 'GPU — la carte pour l’image',
    desc: 'Affiche les images sur l’écran et fait tourner les jeux. Elle calcule tout ce qui est graphique.'
  },
  psu: {
    title: 'Alimentation — l’énergie',
    desc: 'Apporte l’électricité à tous les composants. Elle transforme le courant de la prise en courant utilisable par l’ordinateur.'
  }
};

function positionTooltip(evt){
  const rect = board.getBoundingClientRect();
  const x = evt.clientX - rect.left;
  const y = evt.clientY - rect.top;

  let left = x;

  let top = y - 14;

  const tRect = tooltip.getBoundingClientRect();
  const halfW = tRect.width ? tRect.width / 2 : 140;
  const margin = 12;

  left = Math.max(halfW + margin, Math.min(rect.width - halfW - margin, left));
  top = Math.max(margin, Math.min(rect.height - margin, top));

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

function showTooltip(key, evt){
  const data = texts[key];
  if (!data) return;
  tooltip.innerHTML = `<div class="title">${data.title}</div><p class="desc">${data.desc}</p>`;
  tooltip.setAttribute('aria-hidden', 'false');
  tooltip.classList.add('show');
  if (evt) positionTooltip(evt);
}
function hideTooltip(){
  tooltip.classList.remove('show');
  tooltip.setAttribute('aria-hidden', 'true');
}


hotspots.forEach(h => {
  h.addEventListener('mouseenter', e => showTooltip(h.dataset.key, e));
  h.addEventListener('mousemove', e => positionTooltip(e));
  h.addEventListener('mouseleave', hideTooltip);
  h.addEventListener('focus', e => showTooltip(h.dataset.key, e));
  h.addEventListener('blur', hideTooltip);
});


hotspots.forEach(h => {
  h.addEventListener('click', (e) => {
    e.stopPropagation();
    if (tooltip.classList.contains('show')) hideTooltip(); else showTooltip(h.dataset.key, e);
  });
});