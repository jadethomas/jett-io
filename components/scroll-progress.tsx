"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-primary-container z-[100] transition-[width] duration-100 ease-out"
      style={{
        width: `${progress}%`,
        boxShadow: "0 0 3px #36D336, 0 0 6px #36D336",
      }}
    />
  )
}
