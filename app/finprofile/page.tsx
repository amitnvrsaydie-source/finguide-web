'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const questions = [
  {
    id: 1,
    question: "What is your primary financial goal right now?",
    options: [
      { text: "Build an emergency fund", type: "conservative" },
      { text: "Grow my wealth steadily", type: "moderate" },
      { text: "Maximize returns aggressively", type: "aggressive" },
      { text: "Plan for retirement", type: "conservative" },
    ]
  },
  {
    id: 2,
    question: "If your investment drops 20% in a month, what do you do?",
    options: [
      { text: "Sell everything immediately", type: "conservative" },
      { text: "Wait and watch", type: "moderate" },
      { text: "Buy more at lower price", type: "aggressive" },
      { text: "Consult an advisor first", type: "moderate" },
    ]
  },
  {
    id: 3,
    question: "What is your monthly investment budget?",
    options: [
      { text: "Under ₹5,000", type: "conservative" },
      { text: "₹5,000 – ₹25,000", type: "moderate" },
      { text: "₹25,000 – ₹1 Lakh", type: "aggressive" },
      { text: "Above ₹1 Lakh", type: "aggressive" },
    ]
  },
  {
    id: 4,
    question: "How long can you stay invested without needing the money?",
    options: [
      { text: "Less than 1 year", type: "conservative" },
      { text: "1–3 years", type: "moderate" },
      { text: "3–7 years", type: "moderate" },
      { text: "7+ years", type: "aggressive" },
    ]
  },
  {
    id: 5,
    question: "What best describes your investment experience?",
    options: [
      { text: "Complete beginner", type: "conservative" },
      { text: "I have FDs and mutual funds", type: "moderate" },
      { text: "I trade stocks regularly", type: "aggressive" },
      { text: "I invest in multiple asset classes", type: "aggressive" },
    ]
  },
]

const personalities = {
  conservative: {
    type: "Conservative Guardian",
    emoji: "🛡️",
    color: "blue",
    tagline: "Safety first, always.",
    description: "You prioritize capital protection over high returns. You prefer stable, low-risk investments and sleep better knowing your money is safe.",
    strengths: ["Disciplined saver", "Risk-aware", "Long-term stability"],
    bestFor: ["Fixed Deposits", "Debt Mutual Funds", "Government Bonds", "EPF/PPF"],
    advisorFocus: "EPF Guidance, Bonds & FDs, Insurance",
  },
  moderate: {
    type: "Balanced Strategist",
    emoji: "⚖️",
    color: "emerald",
    tagline: "Smart balance of growth and safety.",
    description: "You seek a healthy balance between risk and reward. You're comfortable with some market volatility as long as you have a solid plan.",
    strengths: ["Strategic thinker", "Diversified approach", "Goal-oriented"],
    bestFor: ["Hybrid Mutual Funds", "Blue-chip Stocks", "NPS", "Index Funds"],
    advisorFocus: "Mutual Funds, Global Investments, NRI Services",
  },
  aggressive: {
    type: "Growth Hunter",
    emoji: "🚀",
    color: "orange",
    tagline: "High risk, high reward mindset.",
    description: "You're willing to take calculated risks for potentially higher returns. Market volatility doesn't scare you — it excites you.",
    strengths: ["High risk tolerance", "Long investment horizon", "Return-focused"],
    bestFor: ["Direct Equities", "Small-cap Funds", "International Stocks", "REITs"],
    advisorFocus: "Global Investments, Mutual Funds, Inheritance Planning",
  },
}

export default function FinProfilePage() {
  const router = useRouter()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<keyof typeof personalities | null>(null)

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type]
    setAnswers(newAnswers)

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      const counts = { conservative: 0, moderate: 0, aggressive: 0 }
      newAnswers.forEach(a => {
        counts[a as keyof typeof counts]++
      })
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
      setResult(winner as keyof typeof personalities)
    }
  }

  const reset = () => {
    setCurrentQ(0)
    setAnswers([])
    setResult(null)
  }

  if (result) {
    const p = personalities[result]
    return (
      <div className="min-h-screen bg-[#0a0a0f] py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 animate-fade-up">
            <p className="text-emerald-400 text-xs uppercase tracking-widest mb-2">Your FinProfile</p>
            <div className="text-6xl mb-4">{p.emoji}</div>
            <h1 className="text-3xl font-bold text-white mb-2">{p.type}</h1>
            <p className="text-gray-400 italic">"{p.tagline}"</p>
          </div>

          <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 mb-6 animate-fade-up stagger-1">
            <h2 className="text-white font-semibold mb-3">About You</h2>
            <p className="text-gray-400 leading-relaxed">{p.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-up stagger-2">
            <div className="bg-[#111118] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-white font-semibold text-sm mb-3">Your Strengths</h3>
              <div className="space-y-2">
                {p.strengths.map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-gray-400 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#111118] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-white font-semibold text-sm mb-3">Best Investments</h3>
              <div className="space-y-2">
                {p.bestFor.map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-gray-400 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-8">
            <p className="text-emerald-400 text-sm font-semibold mb-1">Recommended Advisory Focus</p>
            <p className="text-gray-400 text-sm">{p.advisorFocus}</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={reset}
              className="flex-1 border border-gray-800 text-gray-400 py-3 rounded-lg text-sm hover:border-gray-600"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => router.push('/advisors')}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg text-sm"
            >
              Find My Advisor →
            </button>
          </div>
        </div>
      </div>
    )
  }

  const q = questions[currentQ]
  const progress = ((currentQ) / questions.length) * 100

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-16 px-4">
      <div className="max-w-xl mx-auto">

        <div className="text-center mb-10 animate-fade-up">
          <p className="text-emerald-400 text-xs uppercase tracking-widest mb-2">FinProfile Quiz</p>
          <h1 className="text-2xl font-bold text-white">Discover your investor personality</h1>
          <p className="text-gray-500 text-sm mt-1">5 questions · Takes 2 minutes</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Question {currentQ + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1">
            <div
              className="bg-emerald-500 h-1 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8 animate-fade-up stagger-2">
          <h2 className="text-white text-lg font-semibold mb-6">{q.question}</h2>
          <div className="space-y-3">
            {q.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option.type)}
                className="w-full text-left px-5 py-4 rounded-xl border border-gray-800 text-gray-300 text-sm hover:border-emerald-500 hover:bg-emerald-500/5 hover:text-white transition-all"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}