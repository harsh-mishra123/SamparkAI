export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Customer Details</h1>
      <p>Customer ID: {id}</p>
    </div>
  )
}