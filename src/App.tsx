import { useConvexAuth } from "convex/react";
import { AuthScreen } from "./components/AuthScreen";
import { CharacterGenerator } from "./components/CharacterGenerator";
import { CharacterGallery } from "./components/CharacterGallery";
import { Header } from "./components/Header";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

export default function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();
  const [showGallery, setShowGallery] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-amber-600/30 rounded-full animate-spin border-t-amber-500"></div>
          <div className="absolute inset-0 w-16 h-16 border-2 border-cyan-400/20 rounded-full animate-spin animation-delay-150 border-b-cyan-400/50" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f5f0e8] relative overflow-x-hidden">
      {/* Mystical background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          onSignOut={signOut}
          showGallery={showGallery}
          onToggleGallery={() => setShowGallery(!showGallery)}
        />

        <main className="flex-1 px-4 md:px-8 py-6 md:py-10">
          {showGallery ? (
            <CharacterGallery onBack={() => setShowGallery(false)} />
          ) : (
            <CharacterGenerator />
          )}
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-4 text-center">
          <p className="text-xs text-[#f5f0e8]/30 font-['Cormorant_Garamond']">
            Requested by <a href="https://twitter.com/PauliusX" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500/50 transition-colors">@PauliusX</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500/50 transition-colors">@clonkbot</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
