import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import wasm from 'vite-plugin-wasm';
import { readFileSync } from 'fs';

import packageJson from './package.json';

export default defineConfig({
  assetsInclude: ['**/*.d.ts'],
  plugins: [
    {
      name: 'dts-raw-embed',
      resolveId(source) {
        return source.endsWith('.d.ts?raw') ? source : null;
      },
      load(id) {
        const [filepath, query] = id.split('?');
        if (query === 'raw' && filepath.endsWith('.d.ts')) {
          const content = readFileSync(filepath, 'utf-8');
          return `export default ${JSON.stringify(content)}`;
        }
        return null;
      },
    },
    react(),
    wasm(),
    dts({ insertTypesEntry: true, rollupTypes: true }),
  ],
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
