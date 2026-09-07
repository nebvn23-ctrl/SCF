/* Real supplied files, kept under their original names in /public/media.
 * Intrinsic dimensions were read from the actual files with `file` / PIL /
 * ffprobe and are used to reserve layout space (no CLS). */

/** Vite's configured base ('/' by default, '/repo-name/' on GitHub Pages). */
const B = import.meta.env.BASE_URL

export const MEDIA = {
  /** A — character on a stainless-steel counter, dark negative space left. */
  counter: {
    src: `${B}media/3f167cbb-f591-491a-b4fd-47d0a778d836.webp`,
    w: 2048,
    h: 1152,
    alt: 'Smoking Chicken Fish sitting on a stainless-steel kitchen counter in a dark professional kitchen, a lit cigarette in its mouth.',
  },
  /** B — character emerging through torn off-white paper. */
  tear: {
    src: `${B}media/4e64493c-2a34-45da-a42d-d785f13127c0.webp`,
    w: 2048,
    h: 1152,
    alt: 'Smoking Chicken Fish bursting head-first through a ragged hole torn in a sheet of off-white paper, smoke rising from its cigarette.',
  },
  /** C — extreme close-up of the fish face and cigarette. */
  closeup: {
    src: `${B}media/bdefab00-84a1-4eb1-91e3-68b9e152de3f.webp`,
    w: 2048,
    h: 1152,
    alt: 'Extreme close-up of the fish head, one wide unblinking eye, holding a burning cigarette in its mouth.',
  },
  /** D — square isolated character, verified clean alpha channel. */
  cutout: {
    src: `${B}media/b87eadb0-26ca-4285-bd9d-7f82e79a8105.webp`,
    w: 1024,
    h: 1024,
    alt: 'Smoking Chicken Fish seated and facing forward, cut out against nothing, cigarette angled from its mouth.',
  },
  /** E — vertical, character inside an open industrial refrigerator. */
  fridge: {
    src: `${B}media/a67c04ce-3756-4a49-9490-107ed2dc7aa7.webp`,
    w: 1024,
    h: 1280,
    alt: 'Smoking Chicken Fish perched on a wire shelf inside an open industrial refrigerator, lit from above, smoke drifting.',
  },
  /** F — counter with scattered utensils, flour and a red-lit background. */
  chaos: {
    src: `${B}media/ff077de0-00a7-4b93-83d9-8f7500378fec.webp`,
    w: 2048,
    h: 1152,
    alt: 'Smoking Chicken Fish on a steel counter surrounded by spilled flour, a toppled mixing bowl, a whisk and a spatula.',
  },
  /** G — 960x960, 8.04s, 24fps, H.264, no audio track. */
  video: {
    src: `${B}media/video__4_.mp4`,
    poster: `${B}media/scf-video-poster.webp`,
    w: 960,
    h: 960,
  },
} as const
