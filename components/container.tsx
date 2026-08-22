import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Page gutter primitive. The design pins content to a 1240px column with 56px
 * gutters; `px-14` is exactly 56px, with a narrower fallback on small screens.
 */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-6 md:px-14", className)}>{children}</div>
}
