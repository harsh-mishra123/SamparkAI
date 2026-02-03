interface ConversationItemProps {
  Conversations: {
    id: string
    customerName: string
    lastMessage: string
    time: string
    unread: boolean
    priority: string
    channel: string
    status: string
  }
  isSelected: boolean
  onClick: () => void
}

export function ConversationItem({ Conversations, isSelected, onClick }: ConversationItemProps) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="font-semibold">{Conversations.customerName}</span>
        <span className="text-xs text-gray-500">{Conversations.time}</span>
      </div>
      <p className="text-sm text-gray-600 truncate">{Conversations.lastMessage}</p>
      <div className="flex gap-2 mt-2">
        <span className="text-xs px-2 py-1 bg-gray-100 rounded">{Conversations.channel}</span>
        <span className="text-xs px-2 py-1 bg-gray-100 rounded">{Conversations.status}</span>
        {Conversations.unread && <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">Unread</span>}
      </div>
    </div>
  )
}
