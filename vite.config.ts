import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/InterviewPrep/', // Must match GitHub repo name exactly (case-sensitive)
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],

          // Question data chunks (loaded on-demand)
          'questions-java': [
            './src/data/questions/javaCoreQuestions',
            './src/data/questions/javaCollectionsQuestions',
            './src/data/questions/javaQuestions',
          ],
          'questions-spring': [
            './src/data/questions/springQuestions',
          ],
          'questions-other': [
            './src/data/questions/microservicesQuestions',
            './src/data/questions/angularQuestions',
            './src/data/questions/kafkaQuestions',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600, // Increase limit slightly for vendor chunks
  },
})
