import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

export function AuthScreen() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      await signIn("password", formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnonymous = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("anonymous");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to continue as guest");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Arcane border frame */}
        <div className="absolute -inset-px bg-gradient-to-b from-amber-600/50 via-amber-600/20 to-amber-600/50 rounded-2xl"></div>
        <div className="absolute -inset-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent rounded-2xl"></div>

        <div className="relative bg-[#0f0f15]/95 backdrop-blur-xl rounded-2xl p-6 md:p-10 border border-amber-600/20">
          {/* Decorative corner runes */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-amber-600/40"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-amber-600/40"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-amber-600/40"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-amber-600/40"></div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-['Cinzel_Decorative'] text-2xl md:text-3xl text-amber-500 mb-2">
              Character Forge
            </h1>
            <p className="font-['Cormorant_Garamond'] text-[#f5f0e8]/60 text-lg">
              Summon beings from the void
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-600/30 rounded-lg text-red-300 text-sm text-center font-['Cormorant_Garamond']">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-['Cormorant_Garamond'] text-[#f5f0e8]/70 mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-[#0a0a0f]/80 border border-amber-600/30 rounded-lg text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all font-['Cormorant_Garamond'] text-lg"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-['Cormorant_Garaform'] text-[#f5f0e8]/70 mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-[#0a0a0f]/80 border border-amber-600/30 rounded-lg text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all font-['Cormorant_Garamond'] text-lg"
                placeholder="Enter your password"
              />
            </div>

            <input name="flow" type="hidden" value={flow} />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-[#0a0a0f] font-['Cinzel_Decorative'] text-sm uppercase tracking-widest rounded-lg hover:from-amber-600 hover:via-amber-500 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10">
                {isLoading ? "Channeling..." : flow === "signIn" ? "Enter the Realm" : "Join the Order"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
              className="font-['Cormorant_Garamond'] text-[#f5f0e8]/50 hover:text-amber-500 transition-colors text-lg"
            >
              {flow === "signIn" ? "Need to create an account?" : "Already have an account?"}
            </button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-600/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-[#0f0f15] font-['Cormorant_Garamond'] text-[#f5f0e8]/40 text-sm uppercase tracking-widest">
                or
              </span>
            </div>
          </div>

          <button
            onClick={handleAnonymous}
            disabled={isLoading}
            className="w-full py-3.5 bg-transparent border border-cyan-400/40 text-cyan-400 font-['Cormorant_Garamond'] text-lg rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Opening portal..." : "Continue as Guest"}
          </button>
        </div>
      </div>
    </div>
  );
}
