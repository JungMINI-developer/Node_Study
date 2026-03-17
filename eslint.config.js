import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
    // 무시할 디렉토리
    {
        ignores: ['dist/', 'node_modules/', 'src/generated/'],
    },

    // JavaScript 기본 권장 규칙
    js.configs.recommended,

    // TypeScript 권장 + 엄격 규칙
    ...tseslint.configs.recommended,
    ...tseslint.configs.strict,

    // 커스텀 규칙
    {
        rules: {
            // 사용하지 않는 변수 — _로 시작하면 허용
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_' },
            ],
            // type import 강제
            '@typescript-eslint/consistent-type-imports': 'error',
        },
    },

    // Prettier와 충돌하는 규칙 비활성화 (반드시 마지막!)
    prettier,
);
