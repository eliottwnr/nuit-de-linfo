// app.js — logique drag & drop (déplacement réel de l'élément, pas de clone)
const items = document.querySelectorAll('.item');
const zones = document.querySelectorAll('.dropzone');
const scoreEl = document.getElementById('score');
const resetBtn = document.getElementById('reset');
const palette = document.getElementById('items'); // conteneur des composants

let score = 0;
let draggingId = null;

// Helper
function updateScore(){ scoreEl.textContent = score; }

// DRAG START: cacher l'élément source (pour simuler prise réelle)
items.forEach(it => {
  it.addEventListener('dragstart', e => {
    draggingId = it.id;
    // stocker l'id dans dataTransfer
    e.dataTransfer.setData('text/plain', it.id);
    e.dataTransfer.effectAllowed = 'move';
    // cacher l'élément juste après le début du drag pour éviter flicker
    setTimeout(()=> {
      const el = document.getElementById(draggingId);
      if (el) el.style.visibility = 'hidden';
    }, 0);
  });

  // Si le drag se termine (avec ou sans drop), on restore si l'élément n'a pas été placé
  it.addEventListener('dragend', e => {
    const el = document.getElementById(draggingId);
    if (!el) { draggingId = null; return; }
    // si pas placé (toujours dans palette), restaurer visibilité
    if (!el.classList.contains('placed') && !el.parentElement.classList.contains('dropzone')) {
      el.style.visibility = 'visible';
    }
    draggingId = null;
  });
});

// DROP ZONES: dragover / drop logic
zones.forEach(z => {
  z.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    z.classList.remove('bad');
    z.classList.add('ok');
  });

  z.addEventListener('dragleave', e => {
    z.classList.remove('ok');
  });

  z.addEventListener('drop', e => {
    e.preventDefault();
    z.classList.remove('ok');
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;

    // si emplacment déjà occupé
    if (z.querySelector('.item.placed')) {
      // renvoyer l'élément à la palette
      el.style.visibility = 'visible';
      z.classList.add('bad');
      setTimeout(()=> z.classList.remove('bad'), 400);
      return;
    }

    // check type accepté
    if (z.dataset.accept === el.dataset.type) {
      // déplace réellement l'élément dans la dropzone
      z.appendChild(el);
      el.classList.add('placed');
      el.setAttribute('draggable', 'false');
      el.style.visibility = 'visible';
      score += 100;
      updateScore();

      // ajouter bouton retirer (si pas déjà présent)
      if (!z.querySelector('.remove-btn')) {
        const btn = document.createElement('button');
        btn.textContent = 'Retirer';
        btn.className = 'remove-btn';
        btn.addEventListener('click', e => {
          e.stopPropagation();
          // retirer et remettre dans la palette
          el.classList.remove('placed');
          el.setAttribute('draggable','true');
          // remettre visibilité et enlever bouton
          el.style.visibility = 'visible';
          palette.appendChild(el);
          btn.remove();
          // pénalité légère pour retirer
          score -= 50; if (score < 0) score = 0;
          updateScore();
        });
        z.appendChild(btn);
      }

      // feedback visuel bref
      z.classList.add('ok');
      setTimeout(()=> z.classList.remove('ok'), 450);
      checkWin();
    } else {
      // mauvais emplacement : remettre l'élément visible dans la palette et pénalité
      el.style.visibility = 'visible';
      score -= 20; if (score < 0) score = 0; updateScore();
      z.classList.add('bad');
      setTimeout(()=> z.classList.remove('bad'), 600);
    }
  });
});

// RESET bouton : vider toutes les dropzones et remettre les items dans la palette
resetBtn.addEventListener('click', () => {
  zones.forEach(z => {
    // enlever enfants .item et .remove-btn
    Array.from(z.querySelectorAll('.item')).forEach(item => {
      item.classList.remove('placed');
      item.setAttribute('draggable','true');
      item.style.visibility = 'visible';
      palette.appendChild(item);
    });
    Array.from(z.querySelectorAll('.remove-btn')).forEach(b => b.remove());
  });
  score = 0;
  updateScore();
});

// Vérification de la victoire : toutes les zones remplies par un item placé
function checkWin(){
  const allFilled = Array.from(zones).every(z => z.querySelector('.item.placed'));
  if (allFilled){
    setTimeout(()=> alert('Bravo ! Tu as monté la carte mère. Score final: ' + score), 200);
  }
}

// CLICK-TO-PICK pour mobile/tactile (optionnel) : on prend l'élément au clic puis on clique sur une zone pour le déposer
let pickedId = null;
items.forEach(it => {
  it.addEventListener('click', () => {
    // toggle sélection
    if (pickedId === it.id) {
      // désélection
      it.style.outline = '';
      pickedId = null;
      return;
    }
    // clear outlines
    items.forEach(i => i.style.outline = '');
    it.style.outline = '2px solid rgba(255,255,255,0.12)';
    pickedId = it.id;
  });
});

zones.forEach(z => {
  z.addEventListener('click', () => {
    if (!pickedId) return;
    const el = document.getElementById(pickedId);
    if (!el) return;
    // if zone occupied => ignore
    if (z.querySelector('.item.placed')) return;
    if (z.dataset.accept === el.dataset.type) {
      z.appendChild(el);
      el.classList.add('placed');
      el.setAttribute('draggable','false');
      el.style.visibility = 'visible';
      // add remove button
      if (!z.querySelector('.remove-btn')) {
        const btn = document.createElement('button');
        btn.textContent = 'Retirer';
        btn.className = 'remove-btn';
        btn.addEventListener('click', e => {
          e.stopPropagation();
          el.classList.remove('placed');
          el.setAttribute('draggable','true');
          el.style.visibility = 'visible';
          palette.appendChild(el);
          btn.remove();
          score -= 50; if (score<0) score=0; updateScore();
        });
        z.appendChild(btn);
      }
      score += 100; updateScore();
      items.forEach(i => i.style.outline = '');
      pickedId = null;
      checkWin();
    } else {
      // mauvais emplacement
      score -= 20; if (score<0) score = 0; updateScore();
      items.forEach(i => i.style.outline = '');
      pickedId = null;
    }
  });
});
=======
export const points = {
    pointsSnake: 0
};
