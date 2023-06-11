import { defineConfig } from 'vite';
import postcssNesting from 'postcss-nesting';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  root: 'src',
  plugins: [injectHTML(), FullReload(['src/**/*.html'])],
  css: {
    postcss: { plugins: [postcssNesting()] },
  },
});
