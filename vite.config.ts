import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import BASE_PATH from './src/constants/BASE_PATH'

// https://vite.dev/config/
export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
})
