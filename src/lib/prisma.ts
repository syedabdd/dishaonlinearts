import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 2,
  connectTimeout: 20000,
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ 
  adapter: new PrismaMariaDb(poolConfig) 
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
