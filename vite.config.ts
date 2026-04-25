import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/InterviewPrep/', // Must match GitHub repo name exactly (case-sensitive)
})
