// All enums
export enum Channel {
  EMAIL = 'EMAIL',
  CHAT = 'CHAT',
  WHATSAPP = 'WHATSAPP',
  PHONE = 'PHONE',
  SOCIAL = 'SOCIAL'
}

export enum ConversationStatus {
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum SenderType {
  CUSTOMER = 'CUSTOMER',
  AGENT = 'AGENT',
  AI = 'AI',
  SYSTEM = 'SYSTEM'
}