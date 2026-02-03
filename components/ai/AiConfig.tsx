'use client'

import { useState } from 'react'
import { Settings, Sparkles, Brain, Zap } from 'lucide-react'

export default function AiConfig() {
  const [model, setModel] = useState('gemini-2.0-flash-exp')
  const [temperature, setTemperature] = useState(0.5)
  const [autoSuggest, setAutoSuggest] = useState(true)
  const [sentimentAnalysis, setSentimentAnalysis] = useState(true)

  return (
    <div className="space-y-6 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600">
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">AI Configuration</h3>
          <p className="text-sm text-gray-400">Customize AI behavior and responses</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Model Selection */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Brain className="w-4 h-4 text-purple-400" />
            AI Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash (Experimental)</option>
          </select>
        </div>

        {/* Temperature */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Zap className="w-4 h-4 text-purple-400" />
            Creativity Level: {temperature.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-purple-600"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Precise</span>
            <span>Balanced</span>
            <span>Creative</span>
          </div>
        </div>

        {/* Auto Suggest */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-sm font-medium text-white">Auto Suggestions</div>
              <div className="text-xs text-gray-400">
                Automatically generate response suggestions
              </div>
            </div>
          </div>
          <button
            onClick={() => setAutoSuggest(!autoSuggest)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              autoSuggest ? 'bg-purple-600' : 'bg-gray-600'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                autoSuggest ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Sentiment Analysis */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-sm font-medium text-white">Sentiment Analysis</div>
              <div className="text-xs text-gray-400">
                Analyze customer message sentiment
              </div>
            </div>
          </div>
          <button
            onClick={() => setSentimentAnalysis(!sentimentAnalysis)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              sentimentAnalysis ? 'bg-purple-600' : 'bg-gray-600'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                sentimentAnalysis ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
