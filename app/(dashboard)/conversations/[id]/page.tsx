export default async function ConversationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Conversation Details</h1>
      <p>Conversation ID: {id}</p>
    </div>
  )
}