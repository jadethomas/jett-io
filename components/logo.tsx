export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-end gap-1">
        <span className="text-4xl font-bold text-primary">J</span>
        {/* Signal bars with increasing height and opacity */}
        <div className="flex items-end gap-0.5 pb-1">
          <div className="w-1 h-2 bg-primary rounded-sm" style={{ opacity: 0.4 }} />
          <div className="w-1 h-3 bg-primary rounded-sm" style={{ opacity: 0.6 }} />
          <div className="w-1 h-4 bg-primary rounded-sm" style={{ opacity: 0.8 }} />
          <div className="w-1 h-5 bg-primary rounded-sm terminal-glow-box" />
        </div>
      </div>
    </div>
  )
}
