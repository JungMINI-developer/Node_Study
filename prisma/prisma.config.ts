// prisma/prisma.config.ts
import path from 'node:path';
import dotenv from 'dotenv';
import { defineConfig } from 'prisma/config';

// NODE_ENV에 따라 .env.test 또는 .env 로드
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

export default defineConfig({
  schema: path.join(import.meta.dirname, 'schema.prisma'),

  datasource: {
    url: process.env['DATABASE_URL'] ?? '',
  },
});