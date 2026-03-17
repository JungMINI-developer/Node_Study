// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';

const app = express();

// 글로벌 미들웨어
app.use(helmet());
app.use(cors());
if (env.NODE_ENV !== 'test') {
    app.use(morgan('dev')); // 테스트 중에는 로그 끄기
}
app.use(express.json());

// Health Check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});

// 404 핸들러
app.use((_req, res) => {
    res.status(404).json({ status: 'error', message: 'Not Found' });
});

export default app;
