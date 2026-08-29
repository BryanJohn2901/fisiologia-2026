# Pós-Graduação em Fisiologia do Exercício — Landing Page

Landing page de captação de leads para a pós-graduação em Fisiologia do Exercício da Personal Trainer Academy.

**Deploy:** https://fisiologia-2026.vercel.app

## Stack

- HTML5 + CSS3 + Tailwind CSS + JavaScript vanilla
- Build de produção em Node.js (`build.js`): minifica HTML (html-minifier-terser), CSS (clean-css) e JS (terser), manipula markup com cheerio, otimiza imagens (sharp)
- Sem framework em runtime — o site final é HTML/CSS/JS estático

## Rodar localmente

```bash
npm install
npm run build:css   # compila o Tailwind (src/input.css -> dist/css/style.css)
npm run build        # gera a versão de produção em dist/
```

Abra `index.html` diretamente para editar/testar em modo fonte, sem build.
