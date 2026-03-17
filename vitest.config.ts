// vitest.config.ts
import dotenv from 'dotenv';
import { defineConfig } from 'vitest/config';

dotenv.config({ path: '.env.test' });

export default defineConfig({
    test: {
        globals: true,              // describe, it, expect 글로벌 사용
        environment: 'node',        // Node.js 환경
        include: ['tests/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            include: ['src/**/*.ts'],
            exclude: ['src/generated/**', 'src/server.ts'],
        },
        setupFiles: ['tests/setup.ts'],
        testTimeout: 10000,         // DB 연결 등을 위해 넉넉하게
        fileParallelism: false,     // 테스트 파일 순차 실행 (공유 DB)
    },
});
