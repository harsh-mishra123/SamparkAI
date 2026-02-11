import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.message.deleteMany()
  await prisma.conversationTag.deleteMany()
  await prisma.customerTag.deleteMany()
  await prisma.customerNote.deleteMany()
  await prisma.conversation.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.user.deleteMany()

  console.log('Cleared existing data')

  // Create Users (Agents)
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'sarah.wilson@samparkAI.com',
        name: 'Sarah Wilson',
        role: 'ADMIN',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      },
    }),
    prisma.user.create({
      data: {
        email: 'mike.chen@samparkAI.com',
        name: 'Mike Chen',
        role: 'AGENT',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      },
    }),
    prisma.user.create({
      data: {
        email: 'emma.rodriguez@samparkAI.com',
        name: 'Emma Rodriguez',
        role: 'AGENT',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      },
    }),
  ])

  console.log(`✅ Created ${users.length} users`)

  // Create Customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        email: 'john.doe@techcorp.com',
        name: 'John Doe',
        phone: '+1-555-0101',
        company: 'TechCorp Inc',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      },
    }),
    prisma.customer.create({
      data: {
        email: 'jane.smith@startup.io',
        name: 'Jane Smith',
        phone: '+1-555-0102',
        company: 'Startup.io',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      },
    }),
    prisma.customer.create({
      data: {
        email: 'bob.johnson@enterprise.com',
        name: 'Bob Johnson',
        phone: '+1-555-0103',
        company: 'Enterprise Solutions',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      },
    }),
    prisma.customer.create({
      data: {
        email: 'alice.williams@business.net',
        name: 'Alice Williams',
        phone: '+1-555-0104',
        company: 'Business Networks',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      },
    }),
    prisma.customer.create({
      data: {
        email: 'charlie.brown@digital.com',
        name: 'Charlie Brown',
        phone: '+1-555-0105',
        company: 'Digital Agency',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      },
    }),
  ])

  console.log(`✅ Created ${customers.length} customers`)

  // Create Conversations with Messages
  const conversation1 = await prisma.conversation.create({
    data: {
      customerId: customers[0].id,
      channel: 'CHAT',
      status: 'OPEN',
      priority: 'HIGH',
      subject: 'Unable to access dashboard',
      assignedTo: users[0].id,
      messages: {
        create: [
          {
            content: "Hi, I'm having trouble accessing my dashboard. It keeps showing a 404 error.",
            senderType: 'CUSTOMER',
            metadata: { sentiment: 'NEGATIVE' },
          },
          {
            content: "Hello John! I'm sorry to hear you're experiencing issues. Let me help you resolve this right away. Can you tell me what browser you're using?",
            senderType: 'AGENT',
            userId: users[0].id,
          },
          {
            content: "I'm using Chrome, version 120. The error started appearing this morning.",
            senderType: 'CUSTOMER',
            metadata: { sentiment: 'NEUTRAL' },
          },
          {
            content: "Thank you for that information. I've found the issue - there was a recent update that affected some Chrome users. I'm applying a fix to your account now. Please try clearing your cache and refreshing the page.",
            senderType: 'AGENT',
            userId: users[0].id,
          },
        ],
      },
    },
  })

  const conversation2 = await prisma.conversation.create({
    data: {
      customerId: customers[1].id,
      channel: 'EMAIL',
      status: 'RESOLVED',
      priority: 'MEDIUM',
      subject: 'Question about pricing plans',
      assignedTo: users[1].id,
      resolvedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      messages: {
        create: [
          {
            content: "I'm interested in upgrading to the Pro plan. Can you explain the differences between Pro and Enterprise?",
            senderType: 'CUSTOMER',
            metadata: { sentiment: 'POSITIVE' },
          },
          {
            content: "Absolutely! I'd be happy to help. The Pro plan includes up to 10 team members and 50GB storage, while Enterprise offers unlimited team members, 500GB storage, and priority support. Would you like me to send you a detailed comparison?",
            senderType: 'AGENT',
            userId: users[1].id,
          },
          {
            content: "Yes please! Also, is there a discount for annual billing?",
            senderType: 'CUSTOMER',
            metadata: { sentiment: 'POSITIVE' },
          },
          {
            content: "Great question! Yes, we offer 20% off with annual billing. I've sent the detailed comparison to your email. Let me know if you have any other questions!",
            senderType: 'AGENT',
            userId: users[1].id,
          },
          {
            content: "Perfect, thank you so much for your help!",
            senderType: 'CUSTOMER',
            metadata: { sentiment: 'POSITIVE' },
          },
        ],
      },
    },
  })

  const conversation3 = await prisma.conversation.create({
    data: {
      customerId: customers[2].id,
      channel: 'WHATSAPP',
      status: 'PENDING',
      priority: 'URGENT',
      subject: 'Payment failed - urgent',
      assignedTo: users[2].id,
      messages: {
        create: [
          {
            content: "URGENT: My payment just failed and now I can't access any features. This is affecting my entire team!",
            senderType: 'CUSTOMER',
            metadata: { sentiment: 'URGENT' },
          },
          {
            content: "I understand how critical this is, Bob. I'm escalating this to our billing team right now. Can you confirm the last 4 digits of the card you used?",
            senderType: 'AGENT',
            userId: users[2].id,
          },
          {
            content: "It ends in 4532. We need this resolved ASAP - we have a client presentation in 30 minutes!",
            senderType: 'CUSTOMER',
            metadata: { sentiment: 'URGENT' },
          },
        ],
      },
    },
  })

  const conversation4 = await prisma.conversation.create({
    data: {
      customerId: customers[3].id,
      channel: 'CHAT',
      status: 'OPEN',
      priority: 'LOW',
      subject: 'Feature request',
      assignedTo: users[0].id,
      messages: {
        create: [
          {
            content: "Hi! I was wondering if you could add dark mode to the mobile app? It would be really helpful for late-night work sessions.",
            senderType: 'CUSTOMER',
            metadata: { sentiment: 'POSITIVE' },
          },
          {
            content: "That's a great suggestion, Alice! Dark mode is actually on our roadmap for Q2 2026. I'll add your vote to the feature request. Is there anything else I can help you with today?",
            senderType: 'AGENT',
            userId: users[0].id,
          },
        ],
      },
    },
  })

  const conversation5 = await prisma.conversation.create({
    data: {
      customerId: customers[4].id,
      channel: 'EMAIL',
      status: 'CLOSED',
      priority: 'MEDIUM',
      subject: 'Integration with Slack',
      assignedTo: users[1].id,
      resolvedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      messages: {
        create: [
          {
            content: "How do I set up the Slack integration? I can't find the documentation.",
            senderType: 'CUSTOMER',
            metadata: { sentiment: 'NEUTRAL' },
          },
          {
            content: "I can help with that! Go to Settings > Integrations > Slack, then click 'Connect'. You'll need admin permissions in your Slack workspace. Here's a step-by-step guide: [link]",
            senderType: 'AGENT',
            userId: users[1].id,
          },
          {
            content: "Got it working! Thanks for the quick help!",
            senderType: 'CUSTOMER',
            metadata: { sentiment: 'POSITIVE' },
          },
        ],
      },
    },
  })

  const conversation6 = await prisma.conversation.create({
    data: {
      customerId: customers[0].id,
      channel: 'CHAT',
      status: 'OPEN',
      priority: 'MEDIUM',
      subject: 'Export data question',
      assignedTo: users[2].id,
      messages: {
        create: [
          {
            content: "Can I export all my data to CSV? I need it for a quarterly report.",
            senderType: 'CUSTOMER',
            metadata: { sentiment: 'NEUTRAL' },
          },
        ],
      },
    },
  })

  console.log('✅ Created 6 conversations with messages')

  // Create Customer Notes
  await prisma.customerNote.create({
    data: {
      customerId: customers[0].id,
      content: 'VIP customer - handles billing for entire TechCorp organization. Very technical, prefers detailed explanations.',
      createdBy: users[0].id,
    },
  })

  await prisma.customerNote.create({
    data: {
      customerId: customers[2].id,
      content: 'Enterprise client with 50+ seats. Renewal coming up in March 2026.',
      createdBy: users[1].id,
    },
  })

  console.log('✅ Created customer notes')

  // Create Tags first
  const vipTag = await prisma.tag.create({ data: { name: 'VIP', color: '#f59e0b' } })
  const upgradeTag = await prisma.tag.create({ data: { name: 'Potential Upgrade', color: '#3b82f6' } })
  const enterpriseTag = await prisma.tag.create({ data: { name: 'Enterprise', color: '#8b5cf6' } })
  const billingTag = await prisma.tag.create({ data: { name: 'Billing Issue', color: '#ef4444' } })
  const featureTag = await prisma.tag.create({ data: { name: 'Feature Request', color: '#10b981' } })

  // Create Customer Tags
  await prisma.customerTag.create({
    data: {
      customerId: customers[0].id,
      tagId: vipTag.id,
    },
  })

  await prisma.customerTag.create({
    data: {
      customerId: customers[1].id,
      tagId: upgradeTag.id,
    },
  })

  await prisma.customerTag.create({
    data: {
      customerId: customers[2].id,
      tagId: enterpriseTag.id,
    },
  })

  await prisma.conversationTag.create({
    data: {
      conversationId: conversation3.id,
      tagId: billingTag.id,
    },
  })

  await prisma.conversationTag.create({
    data: {
      conversationId: conversation4.id,
      tagId: featureTag.id,
    },
  })

  console.log('✅ Created tags')

  console.log('🎉 Database seeded successfully!')
  console.log('\n📊 Summary:')
  console.log(`   - ${users.length} users (agents)`)
  console.log(`   - ${customers.length} customers`)
  console.log(`   - 6 conversations`)
  console.log(`   - Multiple messages with sentiment analysis`)
  console.log(`   - Customer notes and tags`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
