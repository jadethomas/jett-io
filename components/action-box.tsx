import type { ReactNode } from "react"

interface ActionBoxProps {
  title?: string
  children: ReactNode
}

export function ActionBox({ title = "What You Should Do Monday Morning", children }: ActionBoxProps) {
  return (
    <div className="my-8 border border-border bg-card p-6">
      <h3 className="text-xl font-bold text-primary mb-4">{title}</h3>
      <div className="text-card-foreground space-y-3">{children}</div>
    </div>
  )
}
