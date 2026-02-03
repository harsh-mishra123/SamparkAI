import { Bell, Search } from 'lucide-react'
import { SearchBar } from './SearchBar'
import { UserMenu } from './UserMenu'

export function Header() {
  return (
    <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SearchBar />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors border border-white/10">
            <Bell className="w-5 h-5 text-gray-300" />
          </button>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}