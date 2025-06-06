import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import wasm from 'vite-plugin-wasm';

import packageJson from './package.json';

export default defineConfig({
  assetsInclude: ['**/*.d.ts'],
  plugins: [react(), wasm(), dts({ insertTypesEntry: true, rollupTypes: true })],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.d.ts', '.jsx', '.tsx', '.json'],
    dedupe: ['@lezer/common', '@lezer/lr', '@lezer/highlight'],
  },
  build: {
    target: 'esnext',
    sourcemap: true,
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src', 'index.ts'),
        schema: path.resolve(__dirname, 'src', 'helpers', 'schema.ts'),
      },
      name: 'JDM Editor',
      formats: ['es'],
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['react/jsx-runtime', 'react', 'react-dom', ...Object.keys(packageJson.dependencies)],
      output: {
        globals: {
          'react-dom': 'ReactDOM',
          'react': 'React',
        },
      },
    },
  },
});
