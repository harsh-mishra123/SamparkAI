'use client'

import { useEffect, useState } from 'react'
import {
  Zap,
  Plus,
  Play,
  Pause,
  Trash2,
  Edit,
  X,
  ChevronDown,
  ChevronUp,
  Filter,
  Tag,
  MessageSquare,
  Bell,
  Mail,
  UserPlus
} from 'lucide-react'

interface AutomationRule {
  id: string
  name: string
  description: string | null
  trigger: {
    type: string
    conditions: Array<{
      field: string
      operator: string
      value: string
    }>
  }
  actions: Array<{
    type: string
    params: Record<string, any>
  }>
  enabled: boolean
  createdAt: string
  updatedAt: string
}

const TRIGGER_TYPES = [
  { value: 'message_received', label: 'Message Received', icon: MessageSquare },
  { value: 'sentiment_detected', label: 'Sentiment Detected', icon: Tag },
  { value: 'keyword_found', label: 'Keyword Found', icon: Filter },
  { value: 'customer_created', label: 'New Customer', icon: UserPlus }
]

const ACTION_TYPES = [
  { value: 'assign_conversation', label: 'Assign Conversation', icon: UserPlus },
  { value: 'add_tag', label: 'Add Tag', icon: Tag },
  { value: 'send_email', label: 'Send Email', icon: Mail },
  { value: 'send_notification', label: 'Send Notification', icon: Bell },
  { value: 'set_priority', label: 'Set Priority', icon: Zap }
]

export default function AutomationsPage() {
  const [rules, setRules] = useState<AutomationRule[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [expandedRule, setExpandedRule] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchRules()
  }, [])

  const fetchRules = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/automations')
      const data = await res.json()
      setRules(data.rules || [])
    } catch (error) {
      console.error('Failed to fetch rules:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleRule = async (id: string, enabled: boolean) => {
    try {
      await fetch(`/api/automations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !enabled })
      })
      fetchRules()
    } catch (error) {
      console.error('Failed to toggle rule:', error)
    }
  }

  const deleteRule = async (id: string) => {
    try {
      await fetch(`/api/automations/${id}`, {
        method: 'DELETE'
      })
      fetchRules()
      setDeleteConfirm(null)
    } catch (error) {
      console.error('Failed to delete rule:', error)
    }
  }

  const createRule = async (ruleData: any) => {
    try {
      await fetch('/api/automations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ruleData)
      })
      fetchRules()
      setShowCreateModal(false)
    } catch (error) {
      console.error('Failed to create rule:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Automations</h1>
          <p className="text-gray-400">
            {rules.length} automation {rules.length === 1 ? 'rule' : 'rules'} configured
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Rule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Active Rules</span>
            <Play className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {rules.filter(r => r.enabled).length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Paused Rules</span>
            <Pause className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {rules.filter(r => !r.enabled).length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Rules</span>
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{rules.length}</div>
        </div>
      </div>

      {/* Rules List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : rules.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No automation rules yet</h3>
          <p className="text-gray-400 mb-6">
            Create your first automation rule to streamline your workflow
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium"
          >
            Create First Rule
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{rule.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          rule.enabled
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {rule.enabled ? 'Active' : 'Paused'}
                      </span>
                    </div>
                    {rule.description && (
                      <p className="text-sm text-gray-400">{rule.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRule(rule.id, rule.enabled)}
                      className={`p-2 rounded-lg transition-colors ${
                        rule.enabled
                          ? 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-400'
                          : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                      }`}
                    >
                      {rule.enabled ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(rule.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                    <button
                      onClick={() =>
                        setExpandedRule(expandedRule === rule.id ? null : rule.id)
                      }
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {expandedRule === rule.id ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Quick Summary */}
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm text-blue-300">
                    When: {rule.trigger.type.replace(/_/g, ' ')}
                  </div>
                  <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm text-purple-300">
                    Then: {rule.actions.length} action{rule.actions.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedRule === rule.id && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Trigger Conditions</h4>
                      <div className="space-y-2">
                        {rule.trigger.conditions?.map((condition, idx) => (
                          <div key={idx} className="px-4 py-2 bg-white/5 rounded-lg text-sm text-gray-300">
                            <span className="text-purple-400">{condition.field}</span>
                            {' '}<span className="text-gray-500">{condition.operator}</span>{' '}
                            <span className="text-blue-400">{condition.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Actions</h4>
                      <div className="space-y-2">
                        {rule.actions.map((action, idx) => (
                          <div key={idx} className="px-4 py-2 bg-white/5 rounded-lg text-sm text-gray-300">
                            <span className="text-green-400">{action.type.replace(/_/g, ' ')}</span>
                            {Object.keys(action.params).length > 0 && (
                              <span className="text-gray-500 ml-2">
                                ({JSON.stringify(action.params)})
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      Created: {new Date(rule.createdAt).toLocaleString()}
                      {' • '}
                      Updated: {new Date(rule.updatedAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Rule Modal */}
      {showCreateModal && (
        <CreateRuleModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={createRule}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-red-500/20 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Delete Rule?</h3>
            <p className="text-gray-400 mb-6">
              This will permanently delete this automation rule. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteRule(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CreateRuleModal({
  onClose,
  onSubmit
}: {
  onClose: () => void
  onSubmit: (data: any) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    triggerType: 'message_received',
    conditions: [{ field: 'content', operator: 'contains', value: '' }],
    actions: [{ type: 'add_tag', params: { tag: '' } }]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      description: formData.description,
      trigger: {
        type: formData.triggerType,
        conditions: formData.conditions
      },
      actions: formData.actions,
      enabled: true
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-purple-500/20 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Create Automation Rule</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Rule Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Tag urgent messages"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={2}
              placeholder="Describe what this rule does"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Trigger Type *</label>
            <select
              value={formData.triggerType}
              onChange={(e) => setFormData({ ...formData, triggerType: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {TRIGGER_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Condition (Keyword to match)
            </label>
            <input
              type="text"
              value={formData.conditions[0].value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  conditions: [{ ...formData.conditions[0], value: e.target.value }]
                })
              }
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., urgent, help, error"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Action Type *</label>
            <select
              value={formData.actions[0].type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  actions: [{ ...formData.actions[0], type: e.target.value }]
                })
              }
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {ACTION_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {formData.actions[0].type === 'add_tag' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tag Name *</label>
              <input
                type="text"
                required
                value={formData.actions[0].params.tag}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    actions: [{
                      ...formData.actions[0],
                      params: { tag: e.target.value }
                    }]
                  })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., urgent, vip"
              />
            </div>
          )}

          {formData.actions[0].type === 'set_priority' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Priority *</label>
              <select
                value={formData.actions[0].params.priority || 'HIGH'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    actions: [{
                      ...formData.actions[0],
                      params: { priority: e.target.value }
                    }]
                  })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all"
            >
              Create Rule
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}