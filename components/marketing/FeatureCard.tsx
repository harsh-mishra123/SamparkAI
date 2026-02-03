import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: boolean;
}

export default function FeatureCard({ icon: Icon, title, description, gradient = false }: FeatureCardProps) {
  return (
    <div className={`${gradient ? 'gradient-border' : 'glass-card'} p-8 hover-lift`}>
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center mb-4">
          <Icon className="text-white" size={28} />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
