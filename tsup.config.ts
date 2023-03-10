import { defineConfig } from 'tsup'
import { name } from './package.json'

export default defineConfig({
    name,
    entry: ['src/index.ts'],
    target: "es2018",
    dts: true,
    clean: true,
    outDir: 'dist',
    external: ['react', 'react-dom']
})