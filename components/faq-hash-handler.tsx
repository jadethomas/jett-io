"use client"

import { useEffect } from "react"

export function FaqHashHandler() {
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.slice(1)
      if (!hash) return
      const el = document.getElementById(hash)
      if (el instanceof HTMLDetailsElement && !el.open) {
        el.open = true
        el.scrollIntoView({ block: "start" })
      }
    }
    openFromHash()
    window.addEventListener("hashchange", openFromHash)
    return () => window.removeEventListener("hashchange", openFromHash)
  }, [])

  return null
}
