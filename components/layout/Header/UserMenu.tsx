import { UserButton } from '@clerk/nextjs'

export function UserMenu() {
  return (
    <div className="flex items-center">
      <UserButton 
        appearance={{
          elements: {
            avatarBox: 'w-10 h-10 border-2 border-purple-400/30',
            userButtonPopoverCard: 'bg-slate-900 border border-white/10',
            userButtonPopoverActionButton: 'hover:bg-white/10 text-white',
            userButtonPopoverActionButtonText: 'text-gray-300',
            userButtonPopoverFooter: 'hidden',
          }
        }}
        afterSignOutUrl="/"
      />
    </div>
  )
}
