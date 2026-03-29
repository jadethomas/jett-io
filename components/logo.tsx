export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="flex items-end gap-1">
        <span className="text-4xl font-bold text-foreground">J</span>
        {/* Signal bars with increasing height and opacity */}
        <div className="flex items-end gap-0.5 pb-1">
          <div className="w-1 h-2 bg-primary" style={{ opacity: 0.4 }} />
          <div className="w-1 h-3 bg-primary" style={{ opacity: 0.6 }} />
          <div className="w-1 h-4 bg-primary" style={{ opacity: 0.8 }} />
          <div className="w-1 h-5 bg-primary" />
        </div>
      </div>
      <span className="text-sm font-bold text-foreground tracking-wider">JETT.IO</span>
    </div>
  )
}
