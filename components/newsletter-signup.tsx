"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // Simulate API call
    setTimeout(() => {
      setStatus("success")
      setEmail("")
    }, 1000)
  }

  return (
    <div className="bg-card border border-primary/20 rounded-lg p-8 terminal-glow-box">
      <h3 className="text-2xl font-bold mb-2">Get Signal, Not Noise</h3>
      <p className="text-muted-foreground mb-6">
        Practical engineering leadership insights delivered to your inbox. No fluff, just actionable advice.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-background border-primary/30 focus:border-primary"
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold terminal-glow"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>

      {status === "success" && <p className="mt-4 text-primary text-sm">Thanks for subscribing!</p>}
    </div>
  )
}
