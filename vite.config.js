import { defineConfig } from 'vite';
import path from 'path';

function rewriteCleanUrls() {
  return {
    name: 'rewrite-clean-urls',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const map = {
          '/': '/pages/home.html',
          '/categorias': '/pages/categories.html',
        };

        if (map[req.url]) {
          req.url = map[req.url];
        }

        next();
      });
    }
  };
}

export default defineConfig({
  root: 'src',
  plugins: [rewriteCleanUrls()],
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/pages/home.html'),
        categorias: path.resolve(__dirname, 'src/pages/categories.html'),
      }
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@controllers': path.resolve(__dirname, 'src/controllers'),
      '@scripts': path.resolve(__dirname, 'src/scripts'),
      '@stories': path.resolve(__dirname, 'src/stories'),
      '@tests': path.resolve(__dirname, 'src/tests'),
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
  }
});
