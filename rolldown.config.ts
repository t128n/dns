// rolldown.config.js
import { defineConfig } from 'rolldown';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  input: 'src/dnsconfig.ts',
  output: {
    file: 'dist/dnsconfig.js',
    format: 'iife',
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts'],
      presets: [
        ['@babel/preset-env', { targets: "ie 11" }],
        '@babel/preset-typescript'
      ]
    })
  ]
});
