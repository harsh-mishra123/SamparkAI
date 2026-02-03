'use client'

import { useState } from 'react'
import InboxView from '@/components/inbox/InboxView'
import { ConversationList } from '@/components/inbox/ConversationList'

export default function ConversationsPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>()

  return (
    <div className="flex h-[calc(100vh-9rem)] -mx-6 -my-6">
      <div className="w-96 flex-shrink-0">
        <ConversationList onSelectConversation={setSelectedConversationId} />
      </div>
      <div className="flex-1">
        <InboxView conversationId={selectedConversationId} />
      </div>
    </div>
  )
}