/* qcm.js — UE 2.4 (modes, tips, mélange questions & réponses) */

/* ========= QUESTIONS (20 items) =========
   3–4 choix par question; nombre de bonnes réponses variable.
   « Aucune » / « Toutes » présentes de façon non systématique. */
const QUESTIONS = [
  {id:'q1',diff:1,stem:'Éléments majeurs de la matière vivante',choices:['Carbone (C)','Sodium (Na)','Oxygène (O)','Azote (N)'],correct:[0,2,3],explain:'Les 4 éléments majeurs = C, H, O, N (≈96% de la masse corporelle).'},
  {id:'q2',diff:1,stem:'Liaison hydrogène — propriétés',choices:['Basée sur charges partielles δ+ / δ−','Plus énergétique que la covalente','Stabilise structures protéiques et ADN','Nécessite un métal'],correct:[0,2],explain:'Liaison H: faible, due à des charges partielles; stabilise hélices α/feuillets β et ADN.'},
  {id:'q3',diff:2,stem:'Fonctions de l’eau dans l’organisme',choices:['Solvant des solutés polaires/ioniques','Lubrification (salive, séreuses, synovial)','Régulation thermique (capacité calorifique)','Transport direct de l’oxygène comme Hb'],correct:[0,1,2],explain:'L’eau ne transporte pas directement O₂; c’est l’hémoglobine.'},
  {id:'q4',diff:2,stem:'Glucides — généralités',choices:['Motif élémentaire ~ (CH₂O)n','Pentoses: ribose et désoxyribose','Hexoses: glucose, galactose, fructose','Toutes les propositions ci-dessus'],correct:[3],explain:'Les trois premières affirmations sont vraies; si « Toutes » est présente, elle seule est la bonne réponse.'},
  {id:'q5',diff:2,stem:'Lipides — catégories',choices:['Phospholipides (phosphoglycérides, sphingomyéline)','Stéroïdes (cholestérol, hormones, vitamine D)','Glycolipides (cérébrosides, gangliosides)','Aucune des propositions'],correct:[0,1,2],explain:'Les trois premières sont correctes; « Aucune » est fausse ici.'},

  /* Q6 corrigée : 9 AA essentiels conforme à ton cours */
  {id:'q6',diff:2,stem:'Acides aminés essentiels (adulte)',choices:['Valine, Leucine, Lysine','Glycine, Alanine, Sérine','Isoleucine, Méthionine, Phénylalanine','Thréonine, Tryptophane, Histidine'],correct:[0,2,3],explain:'Essentiels chez l’adulte (9): His, Ile, Leu, Lys, Met, Phe, Thr, Trp, Val.'},

  {id:'q7',diff:3,stem:'Membrane plasmique — asymétrie/glycocalyx',choices:['Glucides toujours versant extracellulaire','Radeaux lipidiques = microdomaines enrichis en cholestérol et sphingolipides','Flip-flop fréquent des protéines transmembranaires','Aucune des propositions'],correct:[0,1],explain:'Flip-flop des protéines est rare; flippases/floppases pour lipides surtout.'},
  {id:'q8',diff:2,stem:'Transports membranaires',choices:['Diffusion simple: pas d’énergie ni perméase','Symport: deux solutés même sens','Antiport: deux solutés sens opposés','Toutes les propositions ci-dessus'],correct:[3],explain:'Les trois définitions sont justes; « Toutes » résume la bonne réponse.'},
  {id:'q9',diff:3,stem:'Mitochondrie — respiration',choices:['Chaîne respiratoire crée gradient H+','ATP synthase utilise gradient H+','Carrefour via Acétyl-CoA','Aucune des propositions'],correct:[0,1,2],explain:'Les trois premières sont correctes.'},
  {id:'q10',diff:2,stem:'Peroxysome — fonctions',choices:['β-oxydation AG très longues chaînes','Détox par catalase (H₂O₂)','Synthèse protéines ribosomales','Participation immunité innée'],correct:[0,1,3],explain:'Pas de synthèse protéique ribosomale dans le peroxysome.'},

  {id:'q11',diff:2,stem:'Liaisons faibles — lesquelles ?',choices:['Hydrogène','Van der Waals','Ionique','Hydrophobe (effet)'],correct:[0,1,3],explain:'Liaisons faibles: H, Van der Waals, interactions hydrophobes.'},
  {id:'q12',diff:3,stem:'Covalent vs ionique — exact',choices:['Covalent = partage d’électrons','Ionique = transfert d’électrons','Covalent polaire si Δχ ≠ 0','Toutes les propositions ci-dessus'],correct:[3],explain:'Les trois affirmations sont justes ici.'},
  {id:'q13',diff:1,stem:'Sels minéraux — rôles',choices:['Équilibre osmotique et pH','Cofacteurs enzymatiques (Mg²⁺, Zn²⁺)','Conduction nerveuse (Na⁺, K⁺)','Aucune des propositions'],correct:[0,1,2],explain:'Les trois premières sont vraies.'},
  {id:'q14',diff:2,stem:'Oligo-éléments — exemples',choices:['Fer (Fe), Iode (I), Zinc (Zn)','Cuivre (Cu), Sélénium (Se)','Carbone (C), Oxygène (O)','Aucune des propositions'],correct:[0,1],explain:'C, O sont macro-éléments, pas oligo-éléments.'},
  {id:'q15',diff:2,stem:'Cytosquelette — microtubules',choices:['Polymère tubuline α/β; extrémité + plus dynamique','Axonème ciliaire = 9 doublets + 2 microtubules centraux','Kinesine/dynéine = moteurs associés','Toutes les propositions ci-dessus'],correct:[3],explain:'Tout est exact ici.'},
  {id:'q16',diff:2,stem:'Cytosquelette — actine',choices:['F-actine issue de G-actine; myosine = moteur','Rôle microvillosités, cortex cellulaire','Dynéine = moteur de l’actine','Aucune des propositions'],correct:[0,1],explain:'Dynéine est moteur des microtubules, pas de l’actine.'},
  {id:'q17',diff:2,stem:'Filaments intermédiaires',choices:['Kératines (épithéliums)','Vimentine (mésenchyme)','Neurofilaments (neurones)','Toutes les propositions ci-dessus'],correct:[3],explain:'Les trois sont des familles de filaments intermédiaires.'},
  {id:'q18',diff:2,stem:'Noyau — organisation',choices:['Nucléole: ARNr + assemblage sous-unités ribosomiques','Pores nucléaires: transport bidirectionnel sélectif','Euchromatine = moins condensée (active)','Aucune des propositions'],correct:[0,1,2],explain:'Les trois premières sont justes.'},
  {id:'q19',diff:3,stem:'Réticulum endoplasmique (RE)',choices:['Rugueux: protéines sécrétées/membranaires','Lisse: synthèse lipides, détox (CYP450)','RE lisse: stockage Ca²⁺ (RS musculaire)','Toutes les propositions ci-dessus'],correct:[3],explain:'Tout est exact ici.'},
  {id:'q20',diff:3,stem:'Appareil de Golgi / trafic',choices:['Cis-Golgi reçoit du RE; trans-Golgi trie','COPII (RE→Golgi), COPI (Golgi→RE), clathrine (endocytose/TGN)','SNAREs: arrimage/fusion vésicules spécifiques','Aucune des propositions'],correct:[0,1,2],explain:'Les trois premières sont justes.'}
];

/* ========= Sélecteurs ========= */
const elQuiz       = document.getElementById('quiz');
const elScore      = document.getElementById('score');
const elCounter    = document.getElementById('counter');
const elTotal      = document.getElementById('total');
const elBar        = document.getElementById('bar');
const elModeAppr   = document.getElementById('mode-appr');
const elModePart   = document.getElementById('mode-part');
const elModeBadge  = document.getElementById('modeBadge');

/* ========= État ========= */
let state = {
  order: QUESTIONS.map((_, i) => i),
  answers: {},
  locked: false,
  mode: 'apprentissage' // 'apprentissage' | 'partiel'
};

/* ========= Utilitaires ========= */
function shuffleInPlace(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
function stars(n){
  const s = Array.from({length:3},(_,i)=>`<span class="star ${i<n?'filled':'unfilled'}" aria-hidden="true">★</span>`).join('');
  return `<span class="stars">${s}</span><span class="sr-only">${n} sur 3</span>`;
}

/* ========= Rendu ========= */
function render(){
  elTotal.textContent = QUESTIONS.length;
  let html = '';

  state.order.forEach((qi, idx) => {
    const q = QUESTIONS[qi];
    const chosen = state.answers[q.id] ? Array.from(state.answers[q.id]) : [];
    const perQBtn = state.mode === 'apprentissage'
      ? `<button class="btn per-check" data-qid="${q.id}">✅ Corriger cette question</button>` : '';
    const tipsBtn = state.mode === 'apprentissage'
      ? `<button class="btn tip-btn" data-tip="${q.correct.length}" aria-expanded="false" aria-controls="tip-${q.id}" title="Indice">💡 Tips</button>` : '';
    const tipBox  = state.mode === 'apprentissage'
      ? `<div id="tip-${q.id}" class="tipbox" data-tipbox hidden aria-live="polite" aria-atomic="true"></div>` : '';

    // Mélange l’affichage des réponses (on conserve l’index original)
    const choices = q.choices.map((label, i) => ({label, idx: i}));
    shuffleInPlace(choices);

    html += `
    <div class="card q" data-qid="${q.id}">
      <div class="row" style="justify-content:space-between;align-items:flex-start">
        <div class="q-title">${idx+1}. <span class="diff"><span class="muted" style="font-weight:700">Difficulté</span> ${stars(q.diff)}</span> — ${q.stem}</div>
        <div class="q-tools">${perQBtn}${tipsBtn}</div>
      </div>
      ${tipBox}
      <div class="q-choices">
        ${choices.map(({label, idx:i})=>{
          const checked = chosen.includes(i) ? 'checked' : '';
          return `<label class="ans"><input type="checkbox" ${checked} data-ans-index="${i}"/> <span>${label}</span></label>`;
        }).join('')}
      </div>
      <details class="explain" data-explain hidden>
        <summary>Explication</summary>
        <div>${q.explain}</div>
      </details>
    </div>`;
  });

  elQuiz.innerHTML = html;
  attachHandlers();
  updateProgress();
  updateModeUI();
}

/* ========= Interactions ========= */
function attachHandlers(){
  // Sélection des réponses
  document.querySelectorAll('.q').forEach(card => {
    card.addEventListener('change', e => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      const qid = card.dataset.qid;
      const idx = Number(target.getAttribute('data-ans-index'));
      if (!state.answers[qid]) state.answers[qid] = new Set();
      if (target.checked) state.answers[qid].add(idx); else state.answers[qid].delete(idx);
      updateProgress();
    });
  });

  // Tips inline (uniquement en mode apprentissage)
  document.querySelectorAll('.tip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.q');
      const tipBox = card.querySelector('[data-tipbox]');
      const n = Number(btn.dataset.tip);
      tipBox.textContent = `Astuce : ${n} réponse${n>1?'s':''} attendue${n>1?'s':''}.`;
      tipBox.hidden = false;
      btn.setAttribute('aria-expanded','true');
      clearTimeout(tipBox._t);
      tipBox._t = setTimeout(() => { tipBox.hidden = true; btn.setAttribute('aria-expanded','false'); }, 4000);
    });
  });

  // Correction par question (mode apprentissage)
  document.querySelectorAll('.per-check').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.q');
      const qid  = card.dataset.qid;
      const q    = QUESTIONS.find(qq => qq.id === qid);
      const chosen = state.answers[qid] ? Array.from(state.answers[qid]) : [];

      card.querySelectorAll('.ans').forEach(ansEl => {
        const input = ansEl.querySelector('input');
        const originalIndex = Number(input.getAttribute('data-ans-index'));
        ansEl.classList.remove('correct','incorrect');
        if (q.correct.includes(originalIndex)) ansEl.classList.add('correct');
        if (chosen.includes(originalIndex) && !q.correct.includes(originalIndex)) ansEl.classList.add('incorrect');
        input.disabled = true;
      });

      const det = card.querySelector('[data-explain]');
      if (det){ det.hidden = false; det.open = true; }
      btn.disabled = true;
    });
  });
}

/* ========= Logique ========= */
function updateProgress(){
  const answered = Object.values(state.answers).filter(s => s && s.size > 0).length;
  const total    = QUESTIONS.length;
  elCounter.textContent = answered.toString();
  elBar.style.width = `${Math.round(100*answered/total)}%`;
}
function grade(){
  let good = 0;
  QUESTIONS.forEach(q => {
    const user = state.answers[q.id] ? Array.from(state.answers[q.id]).sort((a,b)=>a-b) : [];
    const sol  = [...q.correct].sort((a,b)=>a-b);
    const ok   = user.length === sol.length && user.every((v,i)=>v===sol[i]);
    if (ok) good++;
  });
  return { good, total: QUESTIONS.length, percent: Math.round(100*good/QUESTIONS.length) };
}
function visualCorrectionAll(showExplanations=true){
  document.querySelectorAll('.q').forEach(card => {
    const qid = card.dataset.qid;
    const q   = QUESTIONS.find(qq => qq.id === qid);
    const chosen = state.answers[qid] ? Array.from(state.answers[qid]) : [];
    card.querySelectorAll('.ans').forEach(ansEl => {
      const input = ansEl.querySelector('input');
      const originalIndex = Number(input.getAttribute('data-ans-index'));
      ansEl.classList.remove('correct','incorrect');
      if (q.correct.includes(originalIndex)) ansEl.classList.add('correct');
      if (chosen.includes(originalIndex) && !q.correct.includes(originalIndex)) ansEl.classList.add('incorrect');
      input.disabled = true;
    });
    const det = card.querySelector('[data-explain]');
    if (det){ det.hidden = !showExplanations; if (showExplanations) det.open = true; }
  });
  state.locked = true;
}
function unlock(){
  state.locked = false;
  document.querySelectorAll('.q .ans').forEach(ans => {
    ans.classList.remove('correct','incorrect');
    const input = ans.querySelector('input');
    if (input) input.disabled = false;
  });
  document.querySelectorAll('[data-explain]').forEach(d => d.hidden = true);
}

/* ========= Mode ========= */
function setMode(mode){
  state.mode = mode;
  randomizeQuestions();
  render();
}
function updateModeUI(){
  if (state.mode === 'apprentissage'){
    elModeAppr.classList.add('active'); elModeAppr.setAttribute('aria-selected','true');
    elModePart.classList.remove('active'); elModePart.setAttribute('aria-selected','false');
    elModeBadge.textContent = 'Mode : Apprentissage';
  } else {
    elModePart.classList.add('active'); elModePart.setAttribute('aria-selected','true');
    elModeAppr.classList.remove('active'); elModeAppr.setAttribute('aria-selected','false');
    elModeBadge.textContent = 'Mode : Partiel';
  }
}

/* ========= Mélange des questions ========= */
function randomizeQuestions(){
  state.order = QUESTIONS.map((_, i) => i);
  shuffleInPlace(state.order);
}

/* ========= Boutons globaux ========= */
document.getElementById('check').addEventListener('click', () => {
  const {good, total, percent} = grade();
  elScore.textContent = `${good}/${total} (${percent}%)`;
  visualCorrectionAll(true);
});
document.getElementById('showAnswers').addEventListener('click', () => visualCorrectionAll(true));
document.getElementById('reset').addEventListener('click', () => {
  state.answers = {};
  randomizeQuestions();
  render();
  elScore.textContent = '—';
});
document.getElementById('shuffle').addEventListener('click', () => {
  randomizeQuestions();
  render();
});

/* ========= Switch mode ========= */
elModeAppr.addEventListener('click', () => { setMode('apprentissage'); });
elModePart.addEventListener('click', () => { setMode('partiel'); });

/* ========= Raccourcis ========= */
window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (k === 'c') document.getElementById('check').click();
  if (k === 'n') document.getElementById('reset').click();
  if (k === 'r') document.getElementById('shuffle').click();
});

/* ========= Init ========= */
randomizeQuestions();
render();
