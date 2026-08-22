"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface NewsletterSignupProps {
  /**
   * "card" brings its own surface and border. "bare" drops both so a caller can
   * compose its own chrome — the homepage sits this form on a photo panel.
   */
  variant?: "card" | "bare"
  className?: string
}

export function NewsletterSignup({ variant = "card", className }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // No backend on a static export — the form is presentational for now.
    setTimeout(() => {
      setStatus("success")
      setEmail("")
    }, 1000)
  }

  return (
    <div className={cn(variant === "card" && "rounded-sm border border-border bg-card p-8", className)}>
      <h2 className="mb-3 text-[34px] font-extrabold leading-tight tracking-tight">Get signal, not noise</h2>
      <p className="mb-7 text-[17px] leading-relaxed text-foreground/80">
        Practical engineering leadership insights in your inbox. No fluff, just actionable advice.
      </p>

      <form onSubmit={handleSubmit} className="flex max-w-[480px] flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-auto flex-1 border-input bg-navy-deep/60 px-[22px] py-3.5 text-base"
        />
        <Button type="submit" size="lg" disabled={status === "loading"} className="px-7 font-bold">
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>

      <p aria-live="polite" className="mt-4 text-sm text-primary empty:mt-0">
        {status === "success" ? "Thanks for subscribing!" : ""}
      </p>
    </div>
  )
}
