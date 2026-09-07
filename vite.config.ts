import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  /**
   * Leave as '/' for a custom domain or a user site (yourname.github.io).
   *
   * For a GitHub Pages PROJECT site served from
   * https://yourname.github.io/repo-name/ you must set:
   *   base: '/repo-name/',
   * Every media path is built from this value, so that one line is all it takes.
   */
  base: '/smoking-chicken-fish/',
})
