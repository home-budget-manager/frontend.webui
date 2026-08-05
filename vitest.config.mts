import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
        browser: {
            provider: playwright(),
            enabled: true,
            // at least one instance is required
            instances: [
                { browser: 'chromium' },
            ],
        }
    },
})