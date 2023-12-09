import { fileURLToPath, URL } from 'node:url';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import inject from "@rollup/plugin-inject";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tailwindcss from 'tailwindcss';
import tailwindConfig from './tailwind.config';
import postcss from 'rollup-plugin-postcss';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    build: {
      // https://rollupjs.org/configuration-options/
      rollupOptions: {
        output: {
          strict: false,
        },
      },
    },
    define: {
      'process.env': env,
    },
    plugins: [
      nodePolyfills(),
      // postcss({
      //   config: {
      //     path: './postcss.config.js',
      //   },
      //   extensions: ['.css'],
      //   minimize: true,
      //   inject: {
      //     insertAt: 'top',
      //   },
      //   plugins: [tailwindcss(tailwindConfig)],
      // }),
      vue({
        template: {
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      }),
      // inject({
      //   'c': resolve('./src/Helpers'),
      //   '_': resolve('./src/Helpers'),
      //   '$': "jquery",
      // }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
      }
    },
    // server: {
    //   host: 'app.local.ccert.cc',
    //   port: 8080,
    //   https: {
    //     key: readFileSync('./certs/key.pem'),
    //     cert: readFileSync('./certs/cert.pem'),
    //   },
    // },
  })
}
