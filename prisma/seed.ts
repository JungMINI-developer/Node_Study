import dotenv from 'dotenv';
dotenv.config();

import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { PrismaClient } from '../generated/prisma/client/client'; 
// Prisma 버전 7.x의 새로운 생성기는 예전과 달리 폴더 안에 index.ts를 만들지 않고 client.ts라는 이름으로 메인 파일을 생성.

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 기존 데이터 삭제 (순서 중요: 자식 → 부모)
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  // 사용자 생성
  const user = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin',
      password: '$2b$12$hashedpassword', // 실제로는 bcryptjs로 해싱
      todos: {
        create: [
          { title: '첫 번째 할 일', description: 'Prisma 배우기' },
          { title: '두 번째 할 일', completed: true },
        ],
      },
    },
    include: { todos: true },
  });

  console.log('Seed 완료:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());