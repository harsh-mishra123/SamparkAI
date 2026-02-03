import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rules = await prisma.automationRule.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ rules })
  } catch (error) {
    console.error('Failed to fetch automation rules:', error)
    return NextResponse.json(
      { error: 'Failed to fetch automation rules' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, description, trigger, actions, enabled } = body

    if (!name || !trigger || !actions) {
      return NextResponse.json(
        { error: 'Name, trigger, and actions are required' },
        { status: 400 }
      )
    }

    const rule = await prisma.automationRule.create({
      data: {
        name,
        description,
        trigger,
        actions,
        enabled: enabled ?? true
      }
    })

    return NextResponse.json({ rule }, { status: 201 })
  } catch (error) {
    console.error('Failed to create automation rule:', error)
    return NextResponse.json(
      { error: 'Failed to create automation rule' },
      { status: 500 }
    )
  }
}
