import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: 'jsdom',
        globals: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'json', 'lcov'],
            exclude: [
                'node_modules/**',
                'coverage/**',
                '**/*.d.ts',
                '**/*.test.{ts,tsx}',
                '**/*.config.{ts,js}',
                '**/types/**',
                'src/app/layout.tsx',
                'src/middleware.ts',
                'src/app/providers.tsx',
                'src/store/**',
                'src/lib/**',
                'src/components/ui/**', // Exclude shadcn components
                'src/app/api/**',
            ],
            include: ['src/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', 'app/**/*.{ts,tsx}'],
            all: true,
            clean: true,
        },
    },
});