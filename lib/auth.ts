import { auth } from '@clerk/nextjs/server'

export const getAuth = () => {
  return auth()
}

export const requireAuth = async () => {
  const { userId } = await getAuth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }
  
  return userId
}
