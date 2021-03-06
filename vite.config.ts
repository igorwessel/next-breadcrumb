import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

import packageJson from './package.json'

const getPackageName = () => {
  return packageJson.name
}

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, char => char[1].toUpperCase())
  } catch (err) {
    throw new Error('Name property in package.json is missing.')
  }
}

const getOutputFileName = (extension: string) => (module: string) =>
  module.includes('.client')
    ? `${getPackageName()}.client.${extension}`
    : `${getPackageName()}.server.${extension}`

const getESMOutputFileName = getOutputFileName('mjs')
const getCJSOutputFileName = getOutputFileName('cjs')

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: getPackageNameCamelCase(),
      formats: ['es', 'cjs'],
      fileName: format => fileName[format],
    },
    rollupOptions: {
      external: ['react', 'next/router', 'next/link'],
    },
  },
})
