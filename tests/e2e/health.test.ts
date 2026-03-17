import request from 'supertest';
import app from '../../src/app.js';

describe('GET /health', () => {
    it('200과 { status: "ok" }를 반환한다', async () => {
        const response = await request(app)
            .get('/health')
            .expect(200);

        expect(response.body).toEqual({ status: 'ok' });
    });
    
    it('Content-Type이 JSON이다', async () => {
        await request(app)
            .get('/health')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});

describe('404 처리', () => {
    it('존재하지 않는 경로에 404를 반환한다', async () => {
        const response = await request(app)
            .get('/nonexistent')
            .expect(404);

        expect(response.body).toEqual({ status: 'error', message: 'Not Found' });
    });
});
