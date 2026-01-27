import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q') ?? ''

    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ status: 404, data: [] }, { status: 404 })
    }

    if (!q.trim()) {
      return NextResponse.json({ status: 200, data: [] })
    }

    const users = await db.user.findMany({
      where: {
        OR: [
          { firstname: { contains: q, mode: 'insensitive' } },
          { email: { contains: q, mode: 'insensitive' } },
          { lastname: { contains: q, mode: 'insensitive' } },
        ],
        NOT: [{ clerkid: user.id }],
      },
      select: {
        id: true,
        subscription: { select: { plan: true } },
        firstname: true,
        lastname: true,
        image: true,
        email: true,
      },
    })

    return NextResponse.json({ status: users.length ? 200 : 404, data: users })
  } catch (error) {
    return NextResponse.json({ status: 500, data: [] }, { status: 500 })
  }
}
