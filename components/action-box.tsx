import type { ReactNode } from "react"

interface ActionBoxProps {
  title?: string
  children: ReactNode
}

export function ActionBox({ title = "What You Should Do Monday Morning", children }: ActionBoxProps) {
  return (
    <div className="my-8 border-2 border-primary/40 bg-card rounded-lg p-6 terminal-glow-box">
      <h3 className="text-xl font-bold text-primary mb-4 terminal-glow">{title}</h3>
      <div className="text-card-foreground space-y-3">{children}</div>
    </div>
  )
}
