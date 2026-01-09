# Instructions pour compléter biomecanique-kine.html

## Corrections apportées
✅ Les 3 types de leviers fonctionnent maintenant dans l'onglet Outils

## Contenu à ajouter

### 1. COURS (onglet "📚 Cours")
Remplacer la section #cours par le contenu des 3 niveaux :

**NIVEAU VULGARISATION :**
- Introduction à la biomécanique
- Les leviers du corps (exemples concrets)
- Centre de gravité et équilibre
- Force, moment et mouvement  
- Applications pratiques en kinésithérapie

**NIVEAU BASE :**
- Grandeurs et unités (scalaires/vectorielles)
- Systèmes de leviers détaillés
- Moment de force et bras de levier
- Cinématique (position, vitesse, accélération)
- Cinétique (lois de Newton)
- Travail, puissance, énergie
- Propriétés mécaniques des tissus
- Centre de gravité et stabilité

**NIVEAU AVANCÉ :**
- Analyse 3D du mouvement
- Dynamique inverse
- Biomécanique osseuse (loi de Wolff)
- Biomécanique articulaire avancée
- Modèle Hill du muscle
- Cycle étirement-raccourcissement
- Analyse de la marche approfondie
- Modélisation musculo-squelettique

### 2. QUIZ (onglet "❓ Quiz")
Ajouter 15-20 questions ouvertes avec réponses détaillées :
```javascript
const quizData = [
    {
        q: "Un patient tient 5 kg à 30 cm du coude. Le biceps s'insère à 4 cm. Quelle force doit-il produire ?",
        a: "M_charge = 5 × 9.81 × 0.3 = 14.7 N·m. F_biceps = 14.7 / 0.04 = 367.5 N"
    },
    // ... etc
];
```

### 3. QCM (onglet "☑️ QCM")
Ajouter 30-40 QCM avec 4 options :
```javascript
const qcmData = [
    {
        q: "Quel type de levier est le plus fréquent dans le corps ?",
        options: ["1er genre", "2e genre", "3e genre", "Tous également"],
        correct: 2
    },
    // ... etc
];
```

### 4. VRAI/FAUX (onglet "✓✗ Vrai/Faux")
Ajouter 40-50 affirmations :
```javascript
const vraiFauxData = [
    {q: "Le levier de 3e genre a un avantage mécanique >1", a: false},
    {q: "La formule du moment est M = F × d⊥", a: true},
    // ... etc
];
```

### 5. EXERCICES (onglet "✍️ Exercices")
Ajouter 6-8 exercices complets avec :
- Énoncé détaillé
- Zone de texte pour la réponse
- Bouton "Aide" (sans donner la réponse)
- Bouton "Correction" (solution détaillée)

Exemple d'exercice complet déjà fait dans le fichier :
- Exercice 1 : Calcul moment au coude
- À ajouter : Exercices sur équilibre, marche, chute, squat, propriétés tissus, etc.

## Structure JavaScript à utiliser

Pour Quiz :
```javascript
function startQuiz() {
    // Mélanger questions
    // Afficher première question
}
function showQuizAnswer() {
    // Afficher la réponse
}
function nextQuizQuestion() {
    // Question suivante
}
```

Pour QCM :
```javascript
function startQCM() {
    // Initialiser QCM
}
function submitQCM() {
    // Vérifier réponses
    // Afficher correct/incorrect
}
function nextQCM() {
    // QCM suivant
}
```

Pour Vrai/Faux :
```javascript
function startVraiFaux() {
    // Afficher question
}
function checkVraiFaux() {
    // Vérifier réponse
}
function nextVraiFaux() {
    // Question suivante
}
```

## Références programmatiques Belgique

Programme de 1ère année kinésithérapie :

1. **Statique et dynamique**
- Forces et vecteurs
- Équilibre du corps rigide
- Centre de masse
- Leviers et moments

2. **Cinématique**
- Mouvement rectiligne et curviligne
- Vitesse et accélération
- Analyse des mouvements articulaires

3. **Cinétique**
- Lois de Newton
- Travail et énergie
- Quantité de mouvement et impulsion

4. **Biomécanique des tissus**
- Propriétés mécaniques os, cartilage, muscle, tendon, ligament
- Contrainte et déformation
- Loi de Hooke, module d'élasticité

5. **Biomécanique fonctionnelle**
- Analyse de la marche
- Posture et équilibre
- Mouvements sportifs

6. **Applications cliniques**
- Analyse du geste
- Prévention des blessures
- Compréhension des pathologies

Bon travail !
