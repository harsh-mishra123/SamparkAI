import { redirect } from 'next/navigation'

export default async function Home() {
  // Always redirect to home page
  redirect('/home')
}
