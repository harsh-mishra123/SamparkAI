import { SignUp } from '@clerk/nextjs'

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
            card: 'bg-white/10 backdrop-blur-lg border border-white/20',
            headerTitle: 'text-white',
            headerSubtitle: 'text-gray-300',
            socialButtonsBlockButton: 'bg-white/10 border border-white/20 text-white hover:bg-white/20',
            formFieldLabel: 'text-gray-300',
            formFieldInput: 'bg-white/10 border-white/20 text-white',
            footerActionLink: 'text-blue-400 hover:text-blue-300',
            identityPreviewText: 'text-white',
            formFieldInputShowPasswordButton: 'text-gray-300',
          }
        }}
        fallbackRedirectUrl="/dashboard"
        signInUrl="/login"
      />
    </div>
  )
}