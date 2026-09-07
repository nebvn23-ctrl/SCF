# Smoking Chicken Fish — $SCF

Single-page site. React 19 + TypeScript + Vite, GSAP/ScrollTrigger loaded lazily
for one scroll sequence, fonts self-hosted (Anton + Space Mono, from npm).

## Run

```bash
npm install
npm run dev      # dev server
npm run build    # typecheck + production build to dist/
npm run preview  # serve the built site
npm run lint
```

## Where you enter your details

Everything you need to change lives in **`src/config.ts`**:

```ts
contractAddress: '',   // <- paste the contract address here
xUrl: '',              // <- paste your X profile URL here
```

Leave either as `''` and the site shows an honest state: "CA coming soon" with
copying disabled, and clearly disabled X controls (no fake links, no fake
address). Fill them in and both CA blocks and every X control update at once.

## Assets

The supplied files sit in `public/media/` under their original names.
`src/assets.ts` maps each one to its role and its real intrinsic size.
`scf-video-poster.webp` was generated from the supplied clip with ffmpeg.

## Notes

- The torn paper in chapter 2 is part of the photograph. What animates is two
  paper-coloured CSS panels laid over it, plus the scale of the whole still.
- The clip is a normal opaque 960x960 H.264 file. Its loop is not seamless:
  the first and last frames differ by roughly 6.6/255 on average.

## Putting it on GitHub

```bash
git init
git add .
git commit -m "Smoking Chicken Fish"
git branch -M main
git remote add origin https://github.com/YOUR-NAME/YOUR-REPO.git
git push -u origin main
```

`node_modules/` and `dist/` are already ignored.

### GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
Turn it on once under **Settings → Pages → Source: GitHub Actions**.

If the site lives at `https://yourname.github.io/repo-name/` rather than on a
custom domain, set `base: '/repo-name/'` in `vite.config.ts` first, otherwise
the images and the clip will 404.
