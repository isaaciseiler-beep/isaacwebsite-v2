# isaac one-page site (next.js)

## run locally
```bash
npm install
npm run dev
```
open http://localhost:3000

## customize
- logo: edit `components/BrandMark.tsx` (swap the svg for your real logo)
- resume: replace `public/resume.pdf` with your real pdf
- copy: edit `components/Menu.tsx` (bio/link/email)

## deploy (github + vercel)
1. create a new repo on github
2. push this project
```bash
git init
git add -A
git commit -m "init"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
3. vercel:
   - new project → import your github repo
   - framework preset: next.js (auto-detected)
   - deploy
