# www.kredeum.com

Site vitrine statique de Kredeum — déployé sur Netlify à partir du dossier `www/`.

## Structure

- `www/` — contenu publié (HTML + assets compilés). C'est ce que sert Netlify.
  - `www/index.html` — page unique.
  - `www/assets/css/` — CSS compilé depuis `src/scss/`.
  - `www/assets/js/` — JS (minifié) issu de `src/js/`.
  - `www/assets/images/` — images optimisées issues de `src/images/`.
  - `www/assets/fonts/` — copie directe de `src/fonts/`.
- `src/` — sources (SCSS, JS, images, fonts) utilisées pour régénérer `www/assets/`.
- `gulpfile.js`, `package.json` — pipeline Gulp historique (Node 14 requis, voir ci-dessous).
- `netlify.toml` — configuration Netlify (publish = `www/`, pas de build en CI).

## Déploiement Netlify

Netlify sert le dossier `www/` tel quel — **aucune commande de build n'est exécutée
côté Netlify**. Pour mettre à jour le site en production, il suffit donc de committer
et pousser les fichiers finaux dans `www/` sur la branche suivie par Netlify.

## Modifier le site

### Petites retouches (texte, images, liens)
- Éditer directement `www/index.html`.
- Remplacer/ajouter des fichiers dans `www/assets/images/` ou `www/assets/fonts/`.
- Commit + push, Netlify redéploie automatiquement.

### Évolutions de design (SCSS / variables)
Il faut recompiler les assets localement avant de committer.

**Option A — Gulp historique (Node 14 uniquement, dépend de `node-sass`)**
```bash
nvm use 14
npm install
npx gulp
# Les fichiers sont régénérés dans www/assets/
```

**Option B — Dart Sass direct (Node ≥ 18)**
```bash
npx sass --load-path=src/scss src/scss/front.scss    www/assets/css/front.css    --style=compressed --no-source-map
npx sass --load-path=src/scss src/scss/front-xs.scss www/assets/css/front-xs.css --style=compressed --no-source-map
npx sass --load-path=src/scss src/scss/front-sm.scss www/assets/css/front-sm.css --style=compressed --no-source-map
npx sass --load-path=src/scss src/scss/front-md.scss www/assets/css/front-md.css --style=compressed --no-source-map
npx sass --load-path=src/scss src/scss/front-lg.scss www/assets/css/front-lg.css --style=compressed --no-source-map

cp -r src/js/.     www/assets/js/
cp -r src/images/. www/assets/images/
cp -r src/fonts/.  www/assets/fonts/
```

Puis commit + push.

## Prévisualiser en local

```bash
npx serve www
# ou
python3 -m http.server --directory www 8080
```

## Domaine

- `CNAME` contient `www.kredeum.com` (vestige GitHub Pages). Laissé en place,
  ignoré par Netlify.
- Le DNS `www.kredeum.com` pointera vers Netlify une fois la validation faite
  sur le sous-domaine `*.netlify.app`.
