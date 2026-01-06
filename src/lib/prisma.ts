import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

// Use PrismaPg adapter for PostgreSQL
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

const prisma = globalThis.prisma || new PrismaClient({ adapter })
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export const db = prisma