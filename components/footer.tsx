import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#080808] border-t border-white/5 py-20 mt-40">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 w-full gap-8">
        <div className="font-label text-xs tracking-widest uppercase text-slate-500">
          &copy; {currentYear} JETT.IO PRECISION ENGINEERING
        </div>
        <div className="flex gap-12">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-xs tracking-widest uppercase text-slate-500 hover:text-primary-container transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-xs tracking-widest uppercase text-slate-500 hover:text-primary-container transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
