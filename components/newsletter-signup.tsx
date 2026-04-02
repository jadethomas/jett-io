"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    timerRef.current = setTimeout(() => {
      setStatus("success")
      setEmail("")
    }, 1000)
  }

  return (
    <div className="bg-surface-container-low p-12 border-l-4 border-primary-container">
      <h3 className="font-headline text-2xl font-bold mb-6">THE TRANSMISSION</h3>
      <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
        Periodic insights on technical design and systemic engineering delivered directly to your node. No fluff. Just blueprints.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="EMAIL_ADDRESS"
            className="w-full bg-surface-container-highest border-0 border-b border-outline-variant/30 px-4 py-4 focus:border-primary-container focus:outline-none focus:ring-0 font-label text-xs transition-all text-on-surface placeholder:text-muted-foreground"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-primary-container text-on-primary-container py-4 font-label font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "loading" ? "JOINING..." : "JOIN NETWORK"}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-4 text-primary-container text-sm font-label tracking-wide">
          TRANSMISSION CONFIRMED. WELCOME TO THE NETWORK.
        </p>
      )}
    </div>
  )
}
