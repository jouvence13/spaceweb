#  Portfolio Moderne — Développeur Web & Data Engineer

Un portfolio professionnel conçu pour séduire les recruteurs et mettre en avant vos compétences en développement web et data engineering.

## ✨ Caractéristiques

- 🎨 **Interface moderne et responsive** — Mobile-first design
- 🌓 **Mode sombre/clair** — Avec persistance localStorage
- ⚡ **Animations fluides** — Scroll parallax, typing effect, fade-up animations
- 📱 **Navbar sticky** — Avec scrollspy et menu burger mobile
- 🔗 **Chargement dynamique** — Projets GitHub intégrés automatiquement
- 🎯 **Filtrage des projets** — Frontend / Backend / Fullstack
- ✅ **Accessibilité WCAG 2.1 AA** — aria-labels, navigation clavier, focus states
- 🚀 **Performance Lighthouse 90+** — Images lazy-loading, CSS optimisé
- 📊 **Sections complètes** — Hero, À propos, Compétences, Projets, Expérience, Services, Contact

## 🛠️ Stack Technique

- **HTML5** — Markup sémantique et accessible
- **CSS3** — Variables, Gradients, Animations, Glassmorphism, Backdrop-filter
- **JavaScript Vanilla** — ES6+, pas de framework
- **GitHub API** — Chargement dynamique des repos
- **Responsive Design** — 4 breakpoints (768px, 1024px, 1200px)

## 📋 Sections du Portfolio

### Hero
- Typing effect animé
- Stats (Projets, Technologies, Expérience)
- Badges (Open to work, Alternance, Remote)
- CTA buttons
- Parallax orb et grid

### À Propos
- Photo de profil
- Description personnelle
- Info cards (Recherche, Localisation)

### Compétences
- **Frontend** — HTML5, CSS3, JavaScript, TypeScript, React
- **Backend** — Python, Node.js, Symfony, Laravel, API REST
- **Data & IA** — Python, Pandas, NumPy, ML, Data Analysis
- **Database** — MySQL, PostgreSQL, MongoDB, Supabase
- **Tools** — Git, Figma, Docker, CI/CD
- Barres de progression animées

### Projets
- Chargement dynamique depuis GitHub
- Filtrage par catégorie
- Cartes avec images, description, stack
- Modal détails projet
- Boutons Demo & Code

### Expérience & Formation
- Timeline interactive
- 4 entrées (Freelance, Stage, Master 1 Data & IA, Licence Web & Mobile)
- Badges, descriptions, skills par entrée

### Services
- APIs & Data
- Front UI/UX
- Performance & Qualité

### Contact
- Formulaire avec validation
- Copier email
- Télécharger CV
- Liens sociaux

## 🚀 Installation & Déploiement

### En Local
```bash
# 1. Clone ou télécharge le repository
git clone <ton-repo>
cd portfolio

# 2. Ouvre index.html dans le navigateur
# Ou utilise un serveur local (VS Code Live Server, Python, Node.js)
python -m http.server 8000
```

### Configuration GitHub
Modifie dans `script.js` :
```javascript
window.GITHUB_USERNAME = 'jouvence13'; // Remplace par ton username
```

### Déploiement
- **Vercel** — Connecte ton repo, configure les redirects
- **Netlify** — Drag & drop ou connecte ton repo
- **GitHub Pages** — Push sur `gh-pages` branch
- **Ton serveur** — FTP/SSH sur ton hosting

## 📝 Fichiers

```
portfolio/
├── index.html          # Structure HTML
├── style.css           # Styles CSS complets
├── script.js           # Interactivité & GitHub API
├── images/
│   └── jouv.jpg       # Photo de profil
├── cv.pdf              # Ton CV
├── README.md           # Cette doc
└── .gitignore          # Fichiers à ignorer
```

## 🔧 Personnalisation

### Changer les couleurs
Dans `style.css`, modifie les variables CSS :
```css
:root {
  --accent: #3b82f6;        /* Couleur principale */
  --accent-2: #60a5fa;      /* Couleur secondaire */
  /* ... autres variables */
}
```

### Ajouter tes infos
- Email : `spaceweb1997@gmail.com` → remplace dans tout le code
- LinkedIn : `https://www.linkedin.com/in/jouvence-noriak-akode-6b9825384/`
- GitHub : `jouvence13`
- Photo : Place ta photo dans `images/jouv.jpg`
- CV : Remplace `cv.pdf`

### Modifier les textes
Tous les textes sont dans `index.html` (sections, descriptions, etc.)

## 📱 Responsive Breakpoints

- **Mobile** (< 768px) — 1 colonne
- **Tablet** (768px - 1023px) — 2 colonnes pour skills/projects
- **Desktop** (1024px - 1199px) — 3 colonnes pour projects
- **Large** (1200px+) — 4 colonnes pour skills

## ⚡ Performance Tips

- Images en WebP/lazy-loading
- CSS minifiée
- JavaScript sans dépendances externes
- Lighthouse score : 90+

## 📊 Statistiques

- **Lignes HTML** : ~450
- **Lignes CSS** : ~1200
- **Lignes JS** : ~400
- **Taille totale** : < 100KB (non compressé)

## 🔐 Sécurité & Accessibilité

✅ WCAG 2.1 AA compliant
✅ Aria-labels et role attributes
✅ Navigation au clavier complète
✅ Contraste des couleurs 4.5:1+
✅ Focus visible sur tous les éléments interactifs

## 📞 Support

Des questions ? Contacte-moi :
- Email : spaceweb1997@gmail.com
- GitHub : https://github.com/jouvence13
- LinkedIn : https://www.linkedin.com/in/jouvence-noriak-akode-6b9825384/

## 📄 Licence

MIT — Libre d'utilisation et modification

---

**Fait avec ❤️ en HTML, CSS et JavaScript vanilla** | © 2026
