import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// PORT is only used by the dev/preview server — not needed during `vite build`.
// Default to 3000 so Vercel / CI builds don't throw.
const port = Number(process.env.PORT ?? "3000");

// BASE_PATH is the Vite `base` option.
// Replit mounts under a sub-path; Vercel serves from root "/".
const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    // Replit-only dev plugins — excluded from production builds (e.g. Vercel).
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          runtimeErrorOverlay(),
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      // Radix UI ships files with a "use client" directive. Rollup strips it
      // when bundling and emits a benign warning that can't be mapped to a
      // source location. Suppress it to keep the build log clean.
      onwarn(warning, defaultHandler) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" ||
          warning.code === "SOURCEMAP_ERROR"
        ) {
          return;
        }
        defaultHandler(warning);
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
