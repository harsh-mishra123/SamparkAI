'use client'

import { useState } from 'react'
import { ConversationItem } from './ConversationItem'
import { Filters } from './Filters'

const mockConversations = [
  {
    id: '1',
    customerName: 'John Doe',
    lastMessage: 'Need help with my order',
    time: '2 min ago',
    unread: true,
    priority: 'HIGH',
    channel: 'EMAIL',
    status: 'OPEN'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    lastMessage: 'Thanks for the quick response!',
    time: '1 hour ago',
    unread: false,
    priority: 'MEDIUM',
    channel: 'CHAT',
    status: 'PENDING'
  }
]

export function ConversationList() {
  const [selectedId, setSelectedId] = useState<string>('1')

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Conversations</h2>
        <p className="text-sm text-gray-500">12 unread • 45 total</p>
      </div>
      
      <Filters />
      
      <div className="flex-1 overflow-y-auto">
        {mockConversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            Conversations={conv}
            isSelected={selectedId === conv.id}
            onClick={() => setSelectedId(conv.id)}
          />
        ))}
      </div>
    </div>
  )
}