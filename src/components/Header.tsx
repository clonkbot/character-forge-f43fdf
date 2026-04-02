interface HeaderProps {
  onSignOut: () => void;
  showGallery: boolean;
  onToggleGallery: () => void;
}

export function Header({ onSignOut, showGallery, onToggleGallery }: HeaderProps) {
  return (
    <header className="relative z-20 px-4 md:px-8 py-4 md:py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#0a0a0f]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="absolute -inset-1 rounded-full bg-amber-500/30 blur animate-pulse"></div>
          </div>
          <div>
            <h1 className="font-['Cinzel_Decorative'] text-lg md:text-xl text-amber-500">
              Character Forge
            </h1>
            <p className="font-['Cormorant_Garamond'] text-xs text-[#f5f0e8]/40 hidden sm:block">
              AI Character Generator
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onToggleGallery}
            className={`px-3 md:px-5 py-2 md:py-2.5 rounded-lg font-['Cormorant_Garamond'] text-sm md:text-base transition-all ${
              showGallery
                ? 'bg-amber-600/20 text-amber-500 border border-amber-600/40'
                : 'text-[#f5f0e8]/70 hover:text-amber-500 hover:bg-amber-600/10'
            }`}
          >
            <span className="hidden sm:inline">{showGallery ? 'Create New' : 'My Collection'}</span>
            <span className="sm:hidden">{showGallery ? 'Create' : 'Gallery'}</span>
          </button>

          <button
            onClick={onSignOut}
            className="px-3 md:px-5 py-2 md:py-2.5 rounded-lg font-['Cormorant_Garamond'] text-sm md:text-base text-[#f5f0e8]/50 hover:text-red-400 hover:bg-red-900/20 transition-all"
          >
            <span className="hidden sm:inline">Sign Out</span>
            <span className="sm:hidden">Exit</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
