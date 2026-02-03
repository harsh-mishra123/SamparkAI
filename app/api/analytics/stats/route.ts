import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Total conversations
    const totalConversations = await prisma.conversation.count()
    const newConversations = await prisma.conversation.count({
      where: { createdAt: { gte: startDate } }
    })

    // Conversations by status
    const conversationsByStatus = await prisma.conversation.groupBy({
      by: ['status'],
      _count: true,
    })

    // Conversations by channel
    const conversationsByChannel = await prisma.conversation.groupBy({
      by: ['channel'],
      _count: true,
    })

    // Conversations by priority
    const conversationsByPriority = await prisma.conversation.groupBy({
      by: ['priority'],
      _count: true,
    })

    // Total customers
    const totalCustomers = await prisma.customer.count()
    const newCustomers = await prisma.customer.count({
      where: { createdAt: { gte: startDate } }
    })

    // Total messages
    const totalMessages = await prisma.message.count()
    const aiMessages = await prisma.message.count({
      where: { senderType: 'AI' }
    })

    // Average messages per conversation
    const avgMessages = totalConversations > 0 
      ? (totalMessages / totalConversations).toFixed(1)
      : '0'

    // Response time calculation (mock for now - would need actual timestamp tracking)
    const avgResponseTime = '4.2m'

    // Customer satisfaction (mock - would need feedback tracking)
    const satisfaction = 94

    // Daily conversation trends (last 30 days)
    const dailyTrends = await prisma.$queryRaw<Array<{ date: Date; count: bigint }>>`
      SELECT 
        DATE_TRUNC('day', "createdAt")::date as date,
        COUNT(*)::int as count
      FROM "Conversation"
      WHERE "createdAt" >= ${startDate}
      GROUP BY DATE_TRUNC('day', "createdAt")
      ORDER BY date ASC
    `

    // Sentiment distribution (mock - would calculate from messages)
    const sentimentDistribution = {
      POSITIVE: 45,
      NEUTRAL: 35,
      NEGATIVE: 15,
      URGENT: 5
    }

    return NextResponse.json({
      overview: {
        totalConversations,
        newConversations,
        totalCustomers,
        newCustomers,
        totalMessages,
        aiMessages,
        avgMessages,
        avgResponseTime,
        satisfaction,
      },
      distribution: {
        byStatus: conversationsByStatus.map(s => ({
          status: s.status,
          count: s._count
        })),
        byChannel: conversationsByChannel.map(c => ({
          channel: c.channel,
          count: c._count
        })),
        byPriority: conversationsByPriority.map(p => ({
          priority: p.priority,
          count: p._count
        })),
        sentiment: sentimentDistribution,
      },
      trends: {
        daily: dailyTrends.map(d => ({
          date: d.date.toISOString().split('T')[0],
          count: Number(d.count)
        }))
      }
    })
  } catch (error) {
    console.error('Failed to fetch analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
