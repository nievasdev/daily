// @ts-check
import { defineConfig } from 'astro/config';
import compress from 'vite-plugin-compression';

export default defineConfig({
  output: 'static',
  build: {
    inlineStylesheets: 'always',
    assets: '_',
  },
  compressHTML: true,
  vite: {
    build: {
      minify: 'terser',
      assetsInlineLimit: 2048,
      terserOptions: {
        compress: {
          drop_console: true,
          passes: 3,
          pure_funcs: ['console.log'],
          dead_code: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
        mangle: {
          toplevel: true,
        },
      },
      cssMinify: 'lightningcss',
      reportCompressedSize: false,
    },
    css: {
      transformer: 'lightningcss',
    },
    plugins: [
      compress({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 512,
        deleteOriginFile: false,
      }),
      compress({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 512,
        deleteOriginFile: false,
      }),
    ],
  },
});
