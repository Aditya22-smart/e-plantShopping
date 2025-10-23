import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "|https://github.com/Aditya22-smart/e-plantShopping",
  plugins: [react()],
})
