'use client'

import { useEffect, useState } from 'react'
import {
  Book,
  Plus,
  Search,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Trash2,
  X,
  FolderOpen,
  Tag as TagIcon,
  FileText,
  Globe,
  Lock
} from 'lucide-react'

interface Article {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  published: boolean
  views: number
  helpful: number
  notHelpful: number
  createdAt: string
  updatedAt: string
}

const CATEGORIES = [
  'Getting Started',
  'Features',
  'Troubleshooting',
  'Billing',
  'Integrations',
  'API',
  'Security',
  'Other'
]

export default function KnowledgeBasePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchArticles()
  }, [searchQuery, selectedCategory])

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set('search', searchQuery)
      if (selectedCategory) params.set('category', selectedCategory)

      const res = await fetch(`/api/knowledge-base?${params}`)
      const data = await res.json()
      setArticles(data.articles || [])
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const createArticle = async (articleData: any) => {
    try {
      await fetch('/api/knowledge-base', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData)
      })
      fetchArticles()
      setShowCreateModal(false)
    } catch (error) {
      console.error('Failed to create article:', error)
    }
  }

  const togglePublish = async (id: string, published: boolean) => {
    try {
      await fetch(`/api/knowledge-base/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !published })
      })
      fetchArticles()
    } catch (error) {
      console.error('Failed to toggle publish:', error)
    }
  }

  const deleteArticle = async (id: string) => {
    try {
      await fetch(`/api/knowledge-base/${id}`, {
        method: 'DELETE'
      })
      fetchArticles()
      setShowDeleteConfirm(null)
      setSelectedArticle(null)
    } catch (error) {
      console.error('Failed to delete article:', error)
    }
  }

  const categoryCounts = CATEGORIES.map(cat => ({
    name: cat,
    count: articles.filter(a => a.category === cat).length
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Knowledge Base</h1>
          <p className="text-gray-400">{articles.length} articles total</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          New Article
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Articles</span>
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{articles.length}</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Published</span>
            <Globe className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {articles.filter(a => a.published).length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Views</span>
            <Eye className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {articles.reduce((acc, a) => acc + a.views, 0)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Helpful Votes</span>
            <ThumbsUp className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {articles.reduce((acc, a) => acc + a.helpful, 0)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Categories */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Categories
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === null
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                All Articles
              </button>
              {categoryCounts.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === cat.name
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : articles.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
              <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery || selectedCategory
                  ? 'Try a different search or category'
                  : 'Create your first knowledge base article'}
              </p>
              {!searchQuery && !selectedCategory && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium"
                >
                  Create First Article
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">{article.title}</h3>
                        {article.published ? (
                          <Globe className="w-4 h-4 text-green-400" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {article.content.substring(0, 150)}...
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg">
                      {article.category}
                    </span>
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {article.helpful}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsDown className="w-4 h-4" />
                      {article.notHelpful}
                    </div>
                    <div className="ml-auto">
                      Updated {new Date(article.updatedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        togglePublish(article.id, article.published)
                      }}
                      className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                        article.published
                          ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
                          : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      }`}
                    >
                      {article.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowDeleteConfirm(article.id)
                      }}
                      className="px-3 py-1 text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Article Modal */}
      {showCreateModal && (
        <CreateArticleModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={createArticle}
        />
      )}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-red-500/20 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Delete Article?</h3>
            <p className="text-gray-400 mb-6">
              This will permanently delete this article. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteArticle(showDeleteConfirm)}
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

function CreateArticleModal({
  onClose,
  onSubmit
}: {
  onClose: () => void
  onSubmit: (data: any) => void
}) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: CATEGORIES[0],
    tags: '',
    published: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-purple-500/20 rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Create Article</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="How to get started with..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Content *</label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={10}
              placeholder="Write your article content here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="setup, beginner, tutorial"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 rounded border-white/10 bg-white/5 text-purple-600 focus:ring-2 focus:ring-purple-500"
            />
            <label htmlFor="published" className="text-sm text-gray-300">
              Publish immediately
            </label>
          </div>

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
              Create Article
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ArticleDetailModal({ article, onClose }: { article: Article; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-purple-500/20 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-white">{article.title}</h3>
            {article.published ? (
              <Globe className="w-5 h-5 text-green-400" />
            ) : (
              <Lock className="w-5 h-5 text-gray-500" />
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">
              {article.category}
            </span>
            {article.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm">
                #{tag}
              </span>
            ))}
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 whitespace-pre-wrap">{article.content}</div>
          </div>

          <div className="flex items-center gap-6 pt-6 border-t border-white/10 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {article.views} views
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              {article.helpful} helpful
            </div>
            <div className="flex items-center gap-2">
              <ThumbsDown className="w-4 h-4" />
              {article.notHelpful} not helpful
            </div>
            <div className="ml-auto">
              Last updated: {new Date(article.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}