import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, PluginOption } from "vite";

import sparkPlugin from "@github/spark/spark-vite-plugin";
import createIconImportProxy from "@github/spark/vitePhosphorIconProxyPlugin";
import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // DO NOT REMOVE
    createIconImportProxy() as PluginOption,
    sparkPlugin() as PluginOption,
  ],
  css: {
    lightningcss: {
      drafts: {
        mediaQueries: true,
        nesting: true,
        customMedia: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separar React y librerías principales
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/scheduler')) {
            return 'react-vendor'
          }
          
          // Separar UI components grandes de Radix
          if (id.includes('@radix-ui')) {
            return 'ui-vendor'
          }
          
          // Separar utilities y helpers
          if (id.includes('clsx') || 
              id.includes('tailwind-merge') || 
              id.includes('class-variance-authority')) {
            return 'utils'
          }
          
          // Separar date-fns si se usa mucho
          if (id.includes('date-fns')) {
            return 'date-utils'
          }
          
          // Importante: NO agrupar todos los iconos en un solo chunk
          // Dejar que Vite los divida automáticamente por uso
          // esto permitirá tree-shaking efectivo
        }
      }
    },
    chunkSizeWarningLimit: 2000, // Aumentar límite considerando el proxy de iconos de Spark
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2015'
  }
});
