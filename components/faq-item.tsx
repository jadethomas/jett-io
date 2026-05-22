import { ChevronDown, Link as LinkIcon } from "lucide-react"
import type { FaqItem as FaqItemType } from "@/lib/faq"

export function FaqItem({ item }: { item: FaqItemType }) {
  return (
    <details
      id={item.id}
      className="group bg-surface-container border border-outline-variant/15 scroll-mt-24 target:border-primary/60"
    >
      <summary className="flex items-start justify-between gap-4 p-6 cursor-pointer list-none select-none hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[-2px] [&::-webkit-details-marker]:hidden">
        <span className="flex-1 text-lg md:text-xl font-bold text-on-surface group-open:text-primary">
          {item.question}
        </span>
        <ChevronDown
          className="w-5 h-5 mt-1 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 group-open:text-primary"
          aria-hidden="true"
        />
      </summary>
      <div className="px-6 pb-6 -mt-2 space-y-4 text-base md:text-lg text-card-foreground leading-relaxed">
        <p>{item.answer}</p>
        <a
          href={`#${item.id}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          aria-label={`Permalink to: ${item.question}`}
        >
          <LinkIcon className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Link to this question</span>
        </a>
      </div>
    </details>
  )
}
