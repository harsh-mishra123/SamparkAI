import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
}

export default function StatsCard({ icon: Icon, label, value, change, trend }: StatsCardProps) {
  return (
    <div className="glass-card p-6 hover-lift">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold mb-2">{value}</p>
          {change && (
            <p className={`text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {change}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-500/20 flex items-center justify-center">
          <Icon className="text-purple-400" size={24} />
        </div>
      </div>
    </div>
  );
}
