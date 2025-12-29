import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle, Eye, BookOpen, Image, RotateCcw, Award } from 'lucide-react';

// Base de données des incidences avec critères détaillés
const incidencesData = [
  {
    id: 'main-face',
    nom: 'MAIN - Face dorso-palmaire',
    indication: 'Traumatologie',
    parametres: {
      kV: '45-50',
      mAs: '2,5-3,2',
      foyer: 'PF',
      cassette: '24×30 portrait',
      dfd: '1-1,10 m'
    },
    positionnement: [
      'Patient assis latéralement, bras en abduction 90°',
      'Main en pronation à plat, doigts écartés',
      '3ème doigt dans l\'axe de l\'avant-bras'
    ],
    centrage: 'Articulation métacarpo-phalangienne du 3ème doigt',
    criteres: {
      champs: [
        'Main et poignet en entier',
        'Extrémité distale du 3ème doigt au quart inférieur du radius',
        'Intégralité des contours cutanés'
      ],
      positionnement: [
        'Interligne métacarpo-phalangiennes dégagé',
        '3ème doigt dans l\'axe du radius',
        'Bon dégagement interligne lunatum-triquetrum'
      ],
      exposition: [
        'Bon contraste osseux',
        'Visualisation contours parties molles',
        'Absence de flou cinétique'
      ]
    },
    reperes: [
      { nom: 'Extrémité distale 3ème doigt', type: 'champs' },
      { nom: 'Quart inférieur radius', type: 'champs' },
      { nom: 'Interligne MCP', type: 'positionnement' },
      { nom: 'Axe 3ème doigt-radius', type: 'positionnement' }
    ]
  },
  {
    id: 'main-oblique',
    nom: 'MAIN - Oblique dorso-palmaire',
    indication: 'Traumatologie, rhumatologie',
    parametres: {
      kV: '45-50',
      mAs: '2,5-3,2',
      foyer: 'PF',
      cassette: '24×30 portrait',
      dfd: '1-1,10 m'
    },
    positionnement: [
      'Patient assis latéralement, bras en abduction 90°',
      'Main en semi-pronation 45° (appui hypothénar)',
      'Doigts légèrement écartés'
    ],
    centrage: 'Entre têtes 2ème et 3ème métacarpiens',
    criteres: {
      champs: [
        'Main et poignet en entier',
        'Extrémité distale doigts au quart distal radius'
      ],
      positionnement: [
        'Interligne métacarpo-phalangiennes visible',
        'Absence de superposition des phalanges',
        'Diaphyses métacarpiennes libres'
      ],
      exposition: [
        'Bon contraste osseux',
        'Visualisation contours parties molles',
        'Absence de flou cinétique'
      ]
    },
    reperes: [
      { nom: 'Obliquité 45°', type: 'positionnement' },
      { nom: 'Interligne MCP', type: 'positionnement' },
      { nom: 'Diaphyses métacarpiennes', type: 'positionnement' }
    ]
  },
  {
    id: 'poignet-face',
    nom: 'POIGNET - Face dorso-palmaire',
    indication: 'Traumatologie, orthopédie, rhumatologie',
    parametres: {
      kV: '45-50',
      mAs: '2-3,2',
      foyer: 'PF',
      cassette: '18×24',
      dfd: '1-1,10 m'
    },
    positionnement: [
      'Patient assis latéralement, bras en abduction 90°',
      'Main en pronation, poignet à plat',
      '3ème doigt dans l\'axe de l\'avant-bras'
    ],
    centrage: 'Ligne bi-styloïdienne, axe 3ème métacarpien',
    criteres: {
      champs: [
        'Articulations MCP 2 à 5',
        'Tiers distal radius et ulna'
      ],
      positionnement: [
        '3ème métacarpien dans l\'axe du radius',
        'Processus styloïdes dégagés',
        'Interligne bases 3ème-4ème métacarpiens visible',
        'Articulations carpo-métacarpiennes visibles',
        'Têtes métacarpiennes de face, symétrie diaphyses',
        'Bon dégagement articulation radio-ulnaire distale'
      ],
      exposition: [
        'Bon contraste osseux',
        'Visualisation contours parties molles',
        'Absence de flou cinétique'
      ]
    },
    reperes: [
      { nom: 'Axe 3ème MC-radius', type: 'positionnement' },
      { nom: 'Processus styloïdes', type: 'positionnement' },
      { nom: 'Interligne 3-4 MC', type: 'positionnement' },
      { nom: 'Radio-ulnaire distale', type: 'positionnement' }
    ]
  },
  {
    id: 'poignet-profil',
    nom: 'POIGNET - Profil',
    indication: 'Traumatologie, orthopédie, rhumatologie',
    parametres: {
      kV: '50',
      mAs: '3-5',
      foyer: 'PF',
      cassette: '18×24',
      dfd: '1-1,10 m'
    },
    positionnement: [
      'Patient assis latéralement, bras en abduction 90°',
      'Main en appui ulnaire, doigts en extension',
      'Alignement avant-bras-main, pouce dégagé'
    ],
    centrage: 'Tabatière anatomique',
    criteres: {
      champs: [
        'Parties moyennes et proximales métacarpiens',
        'Carpe complet',
        'Radius et ulna distaux'
      ],
      positionnement: [
        'Superposition radius-ulna sur tout le quart inférieur',
        'Pisiforme derrière capitatum et en regard scaphoïde',
        'Superposition bases 2ème et 3ème métacarpiens',
        'Alignement radius-lunatum-capitatum-3ème MC'
      ],
      exposition: [
        'Bon contraste osseux',
        'Contours parties molles et bandes graisseuses',
        'Absence de flou cinétique'
      ]
    },
    reperes: [
      { nom: 'Superposition radius-ulna', type: 'positionnement' },
      { nom: 'Position pisiforme', type: 'positionnement' },
      { nom: 'Alignement RLCM', type: 'positionnement' }
    ]
  },
  {
    id: 'coude-face',
    nom: 'COUDE - Face',
    indication: 'Traumatologie, orthopédie, rhumatologie',
    parametres: {
      kV: '50',
      mAs: '3,2-5',
      foyer: 'PF',
      cassette: '18×24 portrait',
      dfd: '1-1,1 m'
    },
    positionnement: [
      'Patient assis, épaule-coude-poignet même horizontale',
      'Membre en extension et supination',
      'Avant-bras sur face dorsale'
    ],
    centrage: 'Ligne bi-épicondylienne, milieu',
    criteres: {
      champs: [
        'Quart distal humérus',
        'Quart proximal radius et ulna'
      ],
      positionnement: [
        'Interligne capitulo-radiale bien dégagé',
        'Interligne trochéo-ulnaire visible',
        'Épicondyles latéral et médial de face'
      ],
      exposition: [
        'Bon contraste osseux',
        'Visualisation contours parties molles',
        'Absence de flou cinétique'
      ]
    },
    reperes: [
      { nom: 'Interligne capitulo-radiale', type: 'positionnement' },
      { nom: 'Interligne trochéo-ulnaire', type: 'positionnement' },
      { nom: 'Épicondyles', type: 'positionnement' }
    ]
  },
  {
    id: 'coude-profil',
    nom: 'COUDE - Profil',
    indication: 'Traumatologie, orthopédie, rhumatologie',
    parametres: {
      kV: '50',
      mAs: '3,2-5',
      foyer: 'PF',
      cassette: '18×24 portrait',
      dfd: '1-1,1 m'
    },
    positionnement: [
      'Patient assis, épaule au-dessus du coude',
      'Coude fléchi 90°, appui bord ulnaire',
      'Poignet en profil strict'
    ],
    centrage: 'Épicondyle latéral',
    criteres: {
      champs: [
        'Quart distal humérus (≥5 cm)',
        'Quart proximal radius et ulna (≥5 cm)'
      ],
      positionnement: [
        'Articulations capitulo-radiale et trochéo-ulnaire de profil',
        'Superposition des épicondyles',
        'Fossettes olécranienne et coronoïdienne en contact',
        'Processus coronoïde superposé moitié post. tête radiale'
      ],
      exposition: [
        'Bon contraste osseux',
        'Visualisation contours parties molles',
        'Absence de flou cinétique'
      ]
    },
    reperes: [
      { nom: 'Superposition épicondyles', type: 'positionnement' },
      { nom: 'Fossettes de profil', type: 'positionnement' },
      { nom: 'Processus coronoïde', type: 'positionnement' }
    ]
  },
  {
    id: 'epaule-face',
    nom: 'ÉPAULE - Face rotation neutre',
    indication: 'Traumatologie, orthopédie, rhumatologie',
    parametres: {
      kV: '65-70',
      mAs: 'Cellule centrale',
      foyer: 'PF',
      cassette: '24×30 + Potter',
      dfd: '1-1,1 m'
    },
    positionnement: [
      'Patient debout/assis, oblique post. 35-45°',
      'Tête tournée côté opposé',
      'Coude fléchi, main en supination, ligne bi-épicondylienne // détecteur'
    ],
    centrage: 'Fossette sous-acromiale',
    rayonDirecteur: 'Inclinaison cranio-podale 20-30°',
    criteres: {
      champs: [
        'Humérus proximal',
        '2/3 externes clavicule',
        'Partie supérieure scapula'
      ],
      positionnement: [
        'Articulation gléno-humérale dégagée',
        'Superposition clavicule-épine scapula (espace sous-acromial)',
        'Processus coracoïde empiétant tête 5-10 mm',
        'Tubercule mineur de face au centre tête humérale',
        'Tubercule majeur de profil externe',
        'Col anatomique oblique 45°'
      ],
      exposition: [
        'Bon contraste osseux',
        'Parties molles visibles et délimitées (deltoïde)',
        'Absence de flou cinétique'
      ]
    },
    reperes: [
      { nom: 'Gléno-humérale', type: 'positionnement' },
      { nom: 'Clavicule-épine', type: 'positionnement' },
      { nom: 'Processus coracoïde', type: 'positionnement' },
      { nom: 'Tubercules', type: 'positionnement' }
    ]
  },
  {
    id: 'epaule-profil',
    nom: 'ÉPAULE - Profil coiffe (Neer/Lamy)',
    indication: 'Orthopédie, traumatologie, rhumatologie',
    parametres: {
      kV: '65-70',
      mAs: 'Cellule centrale',
      foyer: 'PF',
      cassette: '24×30 + Potter',
      dfd: '1-1,1 m'
    },
    positionnement: [
      'Patient assis/debout, oblique ant. 45-60° côté à explorer',
      'Bras en abduction 100-120°',
      'Coude fléchi reposant sur potter'
    ],
    centrage: 'Le long épine scapula, hauteur tête humérale',
    rayonDirecteur: 'Inclinaison cranio-podale 15-20°',
    criteres: {
      champs: [
        'Partie proximale humérus et scapula',
        '1/3 externe clavicule'
      ],
      positionnement: [
        'Glène projetée de face',
        'Scapula en Y, croisement centré tête humérale',
        'Cintre acromio-claviculaire harmonieux',
        'Espace sous-acromial dégagé',
        'Absence superposition côtes'
      ],
      exposition: [
        'Bon contraste osseux',
        'Contours parties molles visibles',
        'Absence de flou cinétique'
      ]
    },
    reperes: [
      { nom: 'Glène de face', type: 'positionnement' },
      { nom: 'Y scapulaire', type: 'positionnement' },
      { nom: 'Cintre AC', type: 'positionnement' },
      { nom: 'Espace sous-acromial', type: 'positionnement' }
    ]
  }
];

// Questions pour le mode quiz
const quizQuestions = [
  {
    id: 1,
    incidence: 'main-face',
    question: 'Quels sont les kV utilisés pour une main de face ?',
    options: ['40-45', '45-50', '50-55', '55-60'],
    correct: 1,
    explication: 'Pour la main de face, on utilise 45-50 kV avec un petit foyer.'
  },
  {
    id: 2,
    incidence: 'main-face',
    question: 'Quel critère de positionnement est ESSENTIEL pour la main de face ?',
    options: [
      'Le pouce doit être en abduction',
      'Le 3ème doigt doit être dans l\'axe du radius',
      'Les doigts doivent être fléchis',
      'La main doit être en supination'
    ],
    correct: 1,
    explication: 'Le 3ème doigt dans l\'axe du radius est un critère fondamental de positionnement.'
  },
  {
    id: 3,
    incidence: 'poignet-face',
    question: 'Combien d\'articulations MCP doivent être visibles sur un poignet de face ?',
    options: ['2 à 3', '2 à 5', '1 à 5', 'Toutes'],
    correct: 1,
    explication: 'Les articulations métacarpo-phalangiennes 2 à 5 doivent être visibles.'
  },
  {
    id: 4,
    incidence: 'poignet-profil',
    question: 'Sur un poignet de profil, où doit se situer le pisiforme ?',
    options: [
      'Devant le capitatum',
      'Derrière le capitatum et en regard du scaphoïde',
      'Au-dessus du lunatum',
      'En regard du triquetrum'
    ],
    correct: 1,
    explication: 'Le pisiforme doit se situer derrière le capitatum et en regard du scaphoïde - c\'est un élément indispensable avant mesure.'
  },
  {
    id: 5,
    incidence: 'coude-face',
    question: 'Quel foyer est utilisé pour un coude de face ?',
    options: ['Grand foyer', 'Petit foyer', 'Indifférent', 'Les deux'],
    correct: 1,
    explication: 'On utilise le petit foyer (PF) pour toutes les incidences du coude.'
  },
  {
    id: 6,
    incidence: 'coude-profil',
    question: 'À quel angle doit être fléchi le coude pour un profil ?',
    options: ['45°', '60°', '90°', '120°'],
    correct: 2,
    explication: 'Le coude doit être fléchi à 90° pour l\'incidence de profil.'
  },
  {
    id: 7,
    incidence: 'epaule-face',
    question: 'Quels sont les kV recommandés pour une épaule de face ?',
    options: ['50-55', '55-60', '60-65', '65-70'],
    correct: 3,
    explication: 'Pour l\'épaule, on utilise 65-70 kV avec un potter (cassette).'
  },
  {
    id: 8,
    incidence: 'epaule-face',
    question: 'Quelle inclinaison du rayon directeur pour l\'épaule de face ?',
    options: [
      'Vertical',
      'Cranio-podale 10-15°',
      'Cranio-podale 20-30°',
      'Podal-cranial 15°'
    ],
    correct: 2,
    explication: 'Le rayon directeur a une inclinaison cranio-podale de 20-30° pour dégager l\'espace sous-acromial.'
  },
  {
    id: 9,
    incidence: 'epaule-profil',
    question: 'Pour l\'épaule profil coiffe, la scapula doit apparaître sous quelle forme ?',
    options: ['Ovale', 'Y', 'T', 'L'],
    correct: 1,
    explication: 'La scapula doit être visible en Y dont le croisement est centré au milieu de la tête humérale.'
  },
  {
    id: 10,
    incidence: 'main-oblique',
    question: 'Quelle obliquité pour la main oblique dorso-palmaire ?',
    options: ['30°', '45°', '60°', '90°'],
    correct: 1,
    explication: 'La main doit être en semi-pronation de 45° (appui sur l\'éminence hypothénar).'
  },
  {
    id: 11,
    incidence: 'poignet-face',
    question: 'Quel critère indique une bonne rotation pour le poignet de face ?',
    options: [
      'Processus styloïdes superposés',
      'Processus styloïdes dégagés',
      'Ulna non visible',
      'Radius raccourci'
    ],
    correct: 1,
    explication: 'Les processus styloïdes doivent être dégagés, prouvant une bonne rotation en pronation.'
  },
  {
    id: 12,
    incidence: 'coude-profil',
    question: 'Que doit-on visualiser sur un coude de profil bien positionné ?',
    options: [
      'Épicondyles séparés',
      'Superposition des épicondyles',
      'Un seul épicondyle',
      'Épicondyles en oblique'
    ],
    correct: 1,
    explication: 'La superposition des épicondyles est un critère majeur du coude de profil.'
  }
];

const CriteresRadio = () => {
  const [mode, setMode] = useState('menu'); // menu, quiz, revision, images
  const [selectedIncidence, setSelectedIncidence] = useState(null);
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    score: 0,
    answers: [],
    finished: false
  });
  const [revisionIndex, setRevisionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Initialiser le quiz
  const startQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: [],
      finished: false
    });
    setMode('quiz');
  };

  // Répondre à une question
  const answerQuestion = (answerIndex) => {
    const currentQ = quizQuestions[quizState.currentQuestion];
    const isCorrect = answerIndex === currentQ.correct;
    
    const newAnswers = [...quizState.answers, {
      questionId: currentQ.id,
      correct: isCorrect,
      selected: answerIndex
    }];
    
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;
    
    if (quizState.currentQuestion < quizQuestions.length - 1) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        score: newScore,
        answers: newAnswers
      });
    } else {
      setQuizState({
        ...quizState,
        score: newScore,
        answers: newAnswers,
        finished: true
      });
    }
  };

  // Rendu du menu principal
  const renderMenu = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-center text-indigo-900 mb-2">
            📻 Critères de Réussite Radiologique
          </h1>
          <p className="text-center text-gray-600 mb-6">Membre Supérieur - UE 4.4 S1</p>
          <p className="text-center text-sm text-gray-500">IFPVPS - Formation MER</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={startQuiz}
            className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Mode Quiz</h2>
            <p className="text-green-100">Testez vos connaissances sur les critères</p>
            <div className="mt-4 text-sm bg-white/20 rounded-lg p-2">
              {quizQuestions.length} questions
            </div>
          </button>

          <button
            onClick={() => {
              setRevisionIndex(0);
              setShowAnswer(false);
              setMode('revision');
            }}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Mode Révision</h2>
            <p className="text-blue-100">Révisez toutes les incidences</p>
            <div className="mt-4 text-sm bg-white/20 rounded-lg p-2">
              {incidencesData.length} incidences
            </div>
          </button>

          <button
            onClick={() => setMode('images')}
            className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Image className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Mode Images</h2>
            <p className="text-purple-100">Identification visuelle des critères</p>
            <div className="mt-4 text-sm bg-white/20 rounded-lg p-2">
              Apprentissage visuel
            </div>
          </button>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📚 Liste des incidences</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {incidencesData.map((inc) => (
              <div key={inc.id} className="border-l-4 border-indigo-500 pl-3 py-2 bg-gray-50 rounded">
                <div className="font-semibold text-gray-800">{inc.nom}</div>
                <div className="text-sm text-gray-600">{inc.indication}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Rendu du mode quiz
  const renderQuiz = () => {
    if (quizState.finished) {
      const percentage = Math.round((quizState.score / quizQuestions.length) * 100);
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
            <div className="text-center">
              <Award className="w-24 h-24 mx-auto mb-6 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Terminé !</h2>
              
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 mb-6">
                <div className="text-5xl font-bold mb-2">{percentage}%</div>
                <div className="text-xl">{quizState.score} / {quizQuestions.length} correct</div>
              </div>

              {percentage >= 80 && (
                <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
                  <p className="text-green-800 font-semibold">🎉 Excellent ! Vous maîtrisez bien les critères !</p>
                </div>
              )}
              {percentage >= 60 && percentage < 80 && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                  <p className="text-yellow-800 font-semibold">👍 Bon travail ! Continuez à réviser.</p>
                </div>
              )}
              {percentage < 60 && (
                <div className="bg-orange-100 border-l-4 border-orange-500 p-4 mb-4">
                  <p className="text-orange-800 font-semibold">💪 Révisez les fiches et retentez le quiz !</p>
                </div>
              )}

              <div className="space-y-2 mb-6">
                {quizQuestions.map((q, idx) => {
                  const answer = quizState.answers[idx];
                  return (
                    <div key={q.id} className={`p-3 rounded-lg ${answer.correct ? 'bg-green-100' : 'bg-red-100'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Question {idx + 1}</span>
                        {answer.correct ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      {!answer.correct && (
                        <div className="text-sm text-gray-700 mt-2">{q.explication}</div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={startQuiz}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  <RotateCcw className="inline w-5 h-5 mr-2" />
                  Recommencer
                </button>
                <button
                  onClick={() => setMode('menu')}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Menu Principal
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const currentQ = quizQuestions[quizState.currentQuestion];
    const progress = ((quizState.currentQuestion + 1) / quizQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {quizState.currentQuestion + 1} / {quizQuestions.length}</span>
              <span>Score: {quizState.score}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-4 inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg text-sm font-semibold">
              {incidencesData.find(i => i.id === currentQ.incidence)?.nom}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>

            <div className="space-y-3">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => answerQuestion(idx)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 font-medium"
                >
                  <span className="inline-block w-8 h-8 bg-indigo-100 text-indigo-800 rounded-full text-center leading-8 mr-3 font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setMode('menu')}
            className="mt-6 w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Retour au menu
          </button>
        </div>
      </div>
    );
  };

  // Rendu du mode révision
  const renderRevision = () => {
    const currentInc = incidencesData[revisionIndex];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Incidence {revisionIndex + 1} / {incidencesData.length}
            </div>
            <button
              onClick={() => setMode('menu')}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Retour au menu
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* En-tête */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
              <h2 className="text-3xl font-bold mb-2">{currentInc.nom}</h2>
              <div className="flex items-center gap-4 text-indigo-100">
                <span>📋 {currentInc.indication}</span>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="p-6 space-y-6">
              {/* Paramètres techniques */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  ⚙️ Paramètres Techniques
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <span className="font-semibold text-blue-900">kV:</span>
                    <span className="ml-2 text-blue-700">{currentInc.parametres.kV}</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <span className="font-semibold text-blue-900">mAs:</span>
                    <span className="ml-2 text-blue-700">{currentInc.parametres.mAs}</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <span className="font-semibold text-blue-900">Foyer:</span>
                    <span className="ml-2 text-blue-700">{currentInc.parametres.foyer}</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <span className="font-semibold text-blue-900">Cassette:</span>
                    <span className="ml-2 text-blue-700">{currentInc.parametres.cassette}</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg md:col-span-2">
                    <span className="font-semibold text-blue-900">DFD:</span>
                    <span className="ml-2 text-blue-700">{currentInc.parametres.dfd}</span>
                  </div>
                </div>
              </div>

              {/* Positionnement */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  🎯 Positionnement Patient
                </h3>
                <div className="space-y-2">
                  {currentInc.positionnement.map((pos, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span className="text-gray-700">{pos}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                  <span className="font-semibold text-yellow-900">Centrage:</span>
                  <span className="ml-2 text-yellow-800">{currentInc.centrage}</span>
                </div>
                {currentInc.rayonDirecteur && (
                  <div className="mt-2 bg-orange-50 border-l-4 border-orange-400 p-3 rounded">
                    <span className="font-semibold text-orange-900">Rayon directeur:</span>
                    <span className="ml-2 text-orange-800">{currentInc.rayonDirecteur}</span>
                  </div>
                )}
              </div>

              {/* Critères de réussite */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  ✅ Critères de Réussite
                </h3>
                
                {/* De champs */}
                <div className="mb-4">
                  <h4 className="font-bold text-green-800 mb-2 bg-green-100 inline-block px-3 py-1 rounded">
                    📏 De champs
                  </h4>
                  <div className="space-y-2 mt-2">
                    {currentInc.criteres.champs.map((crit, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{crit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* De positionnement */}
                <div className="mb-4">
                  <h4 className="font-bold text-blue-800 mb-2 bg-blue-100 inline-block px-3 py-1 rounded">
                    🎯 De positionnement
                  </h4>
                  <div className="space-y-2 mt-2">
                    {currentInc.criteres.positionnement.map((crit, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{crit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* D'exposition */}
                <div>
                  <h4 className="font-bold text-purple-800 mb-2 bg-purple-100 inline-block px-3 py-1 rounded">
                    💡 D'exposition
                  </h4>
                  <div className="space-y-2 mt-2">
                    {currentInc.criteres.exposition.map((crit, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
                        <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{crit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Repères anatomiques */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  🔍 Repères Anatomiques Clés
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {currentInc.reperes.map((rep, idx) => (
                    <div key={idx} className={`p-3 rounded-lg ${
                      rep.type === 'champs' ? 'bg-green-50 border-l-4 border-green-400' :
                      'bg-blue-50 border-l-4 border-blue-400'
                    }`}>
                      <span className="text-gray-700">{rep.nom}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setRevisionIndex(Math.max(0, revisionIndex - 1))}
              disabled={revisionIndex === 0}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Précédent
            </button>
            <button
              onClick={() => setRevisionIndex(Math.min(incidencesData.length - 1, revisionIndex + 1))}
              disabled={revisionIndex === incidencesData.length - 1}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Suivant
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Rendu du mode images (identification visuelle)
  const renderImages = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🖼️ Mode Images</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
              <p className="text-blue-900 mb-4">
                <strong>Instructions:</strong> Dans ce mode, vous pourrez identifier visuellement les critères de réussite sur des radiographies.
              </p>
              <p className="text-blue-800">
                Cette fonctionnalité sera complétée avec des images interactives permettant de cliquer sur les repères anatomiques et les critères à vérifier.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {incidencesData.map((inc) => (
                <div key={inc.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition-colors">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{inc.nom}</h3>
                  <div className="text-sm text-gray-600 mb-4">{inc.indication}</div>
                  
                  <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="w-16 h-16 text-gray-400" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-700">Points clés:</div>
                    {inc.reperes.slice(0, 3).map((rep, idx) => (
                      <div key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        {rep.nom}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setMode('menu')}
              className="mt-6 w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Retour au menu
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Rendu principal
  return (
    <div className="min-h-screen">
      {mode === 'menu' && renderMenu()}
      {mode === 'quiz' && renderQuiz()}
      {mode === 'revision' && renderRevision()}
      {mode === 'images' && renderImages()}
    </div>
  );
};

export default CriteresRadio;