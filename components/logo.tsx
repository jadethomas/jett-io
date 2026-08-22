import { cn } from "@/lib/utils"

/**
 * Circular monogram mark. Decorative by default — every usage pairs it with a
 * visible "jett.io" wordmark, so it is hidden from assistive tech to avoid a
 * duplicate announcement.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-10 shrink-0", className)}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18.4" stroke="var(--cyan)" strokeWidth="1.6" />
      <g transform="translate(8.6 8.4)">
        <path
          d="M3 4.4 H19.8 M15.7 4.4 V18.6 M7.9 4.4 V13 a5.1 5.1 0 0 1 -5.1 5.1"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
