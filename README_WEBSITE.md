# SamparkAI - Customer Intelligence Platform

> **Customer Intelligence That Actually Understands You**

AI-powered customer support platform that comprehends context, emotions, and intent. Deliver exceptional experiences at scale with our intelligent platform.

## ✨ Features

### 🎯 Core Capabilities

- **Unified Inbox** - Manage all customer conversations from email, chat, SMS, and social media in one centralized dashboard
- **AI Suggestions** - Get intelligent response suggestions powered by advanced AI that understands context and customer intent
- **Sentiment Analysis** - Automatically detect customer emotions and prioritize urgent or negative interactions
- **Smart Automation** - Automate repetitive tasks and responses while maintaining a personal touch
- **Advanced Analytics** - Track performance metrics, customer satisfaction, and team productivity with real-time dashboards
- **Multi-channel Support** - Connect with customers wherever they are - email, chat, SMS, WhatsApp, and social platforms

### 🤖 5-Stage AI Pipeline

1. **Message Ingestion** - Capture and normalize incoming messages from all channels
2. **Context Analysis** - Deep analysis of message content, customer history, and conversation context
3. **Sentiment Detection** - Identify emotional tone and urgency levels
4. **Response Generation** - AI generates contextually relevant response suggestions
5. **Learning & Optimization** - Continuous learning from agent feedback and outcomes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/samparkai.git

# Navigate to project directory
cd customer-support-suite

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 🎨 Design System

### Color Palette

- **Background**: Dark gradient from `#0a0a0f` to `#1a1a2e`
- **Primary Gradient**: Purple (`#9333ea`) to Blue (`#3b82f6`)
- **Glass Effect**: `rgba(255, 255, 255, 0.05)` with backdrop blur

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Design Patterns

- **Glassmorphism Cards** - Frosted glass effect with subtle borders
- **Gradient Borders** - Purple to blue gradient borders
- **Hover Effects** - Smooth lift and shadow transitions
- **Responsive Layout** - Mobile-first design approach

## 📁 Project Structure

```
customer-support-suite/
├── app/
│   ├── (auth)/           # Authentication pages
│   ├── (dashboard)/      # Dashboard pages
│   ├── (marketing)/      # Marketing website pages
│   │   ├── home/         # Homepage
│   │   ├── features/     # Features page
│   │   ├── documentation/ # Documentation
│   │   └── support/      # Support & FAQ
│   └── api/              # API routes
├── components/
│   ├── marketing/        # Marketing components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── StatsCard.tsx
│   │   └── FeatureCard.tsx
│   ├── dashboard/        # Dashboard components
│   └── ui/               # Shared UI components
├── lib/                  # Utilities and configs
└── prisma/               # Database schema
```

## 🌐 Pages

### Marketing Pages

- **Homepage** (`/home`) - Hero section with metrics and CTA
- **Features** (`/features`) - Detailed feature showcase with AI pipeline
- **Documentation** (`/documentation`) - API docs and integration guides
- **Support** (`/support`) - FAQ and contact information

### Dashboard Pages

- **Dashboard** (`/dashboard`) - Analytics and overview
- **Conversations** - Unified inbox
- **Customers** - Customer management
- **Analytics** - Detailed reports
- **Settings** - Configuration

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma
- **Authentication**: Clerk
- **Icons**: Lucide React

## 📊 Key Metrics

- **10K+** Active Users
- **2.5M** Messages Handled Monthly
- **< 2s** Average Response Time
- **98%** Customer Satisfaction Rate

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

# API Keys
OPENAI_API_KEY=""
```

### Tailwind Configuration

Custom utilities are defined in `globals.css`:

- `.glass-card` - Glassmorphism effect
- `.gradient-border` - Gradient border effect
- `.gradient-btn` - Gradient button style
- `.gradient-text` - Gradient text color
- `.hover-lift` - Hover lift animation
- `.animated-bg` - Animated background gradient

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
vercel deploy
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

- **Email**: support@samparkai.com
- **Phone**: +1 (555) 123-4567
- **Live Chat**: Available 24/7 on our website

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Font by [Google Fonts](https://fonts.google.com/)

---

Made with ❤️ by the SamparkAI Team
