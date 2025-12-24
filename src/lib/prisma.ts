import { PrismaClient } from '../../prisma/prisma/client'
import { Client } from '@clerk/nextjs/server'
import Prisma from 'prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

declare global {
  var prisma: PrismaClient | undefined
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

export const db = globalThis.prisma || new PrismaClient({ adapter })

if(process.env.NODE_ENV !== 'production') globalThis.prisma = db