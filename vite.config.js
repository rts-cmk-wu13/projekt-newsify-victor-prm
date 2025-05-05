import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    base: "./",
    css: {
        devSourcemap: true
    },
    build: {
        outDir: 'docs',
        rollupOptions: {
            input: {
                //Names of keys here dont really matter/aren't really used. Only paths are important
                main: resolve(__dirname, 'index.html'),
                saved: resolve(__dirname, 'saved.html'),
                popular: resolve(__dirname, 'popular.html'),
                login: resolve(__dirname, 'login.html'),
                onboarding: resolve(__dirname, 'onboarding/index.html')
            },
        },
    },
})