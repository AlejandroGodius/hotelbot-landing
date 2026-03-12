export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/[0.03]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            HotelBot
          </span>
          <span className="text-xs text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
            AI Concierge for Luxury Hospitality
          </span>
        </div>
        <div className="flex items-center gap-8 text-xs text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="text-xs text-gray-700" style={{ fontFamily: "'Inter', sans-serif" }}>
          &copy; {new Date().getFullYear()} HotelBot
        </div>
      </div>
    </footer>
  )
}
