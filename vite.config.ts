import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async ({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Try to load the obfuscator plugin safely
    let obfuscatorPlugin: any = null;
    try {
      const pkg = await import('vite-plugin-javascript-obfuscator');
      obfuscatorPlugin = pkg.default || pkg;
    } catch (e) {
      console.warn('vite-plugin-javascript-obfuscator not found. Build will not be obfuscated. Run npm install -D to fix.');
    }

    const plugins = [react()];
    
    // Only add obfuscator if it successfully loaded
    if (obfuscatorPlugin) {
      plugins.push(
        obfuscatorPlugin({
          include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx', 'App.tsx', 'persona.ts'],
          exclude: [/node_modules/],
          apply: 'build', // Only obfuscate on production build
          options: {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            identifierNamesGenerator: 'hexadecimal',
            numbersToExpressions: true,
            selfDefending: true,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 5,
            stringArray: true,
            stringArrayEncoding: ['rc4'],
            stringArrayThreshold: 1,
            transformObjectKeys: true,
          }
        })
      );
    }

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        hmr: {
          overlay: false,
        },
      },
      plugins: plugins,
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GROQ_API_KEY': JSON.stringify(env.GROQ_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
