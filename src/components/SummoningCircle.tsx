export function SummoningCircle() {
  return (
    <div className="h-full flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-500 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Summoning circle */}
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        {/* Outer ring */}
        <div className="absolute inset-0 border-2 border-amber-600/60 rounded-full animate-spin-slow"></div>

        {/* Second ring with runes */}
        <div className="absolute inset-4 border border-amber-500/40 rounded-full animate-spin-reverse">
          <div className="absolute -top-1 left-1/2 w-2 h-2 bg-amber-500 rounded-full"></div>
          <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-amber-500 rounded-full"></div>
          <div className="absolute top-1/2 -left-1 w-2 h-2 bg-amber-500 rounded-full"></div>
          <div className="absolute top-1/2 -right-1 w-2 h-2 bg-amber-500 rounded-full"></div>
        </div>

        {/* Inner ring */}
        <div className="absolute inset-8 border border-cyan-400/30 rounded-full animate-pulse"></div>

        {/* Inner hexagon */}
        <div className="absolute inset-12 flex items-center justify-center">
          <svg className="w-full h-full animate-pulse" viewBox="0 0 100 100">
            <polygon
              points="50,10 90,30 90,70 50,90 10,70 10,30"
              fill="none"
              stroke="rgba(212, 165, 116, 0.4)"
              strokeWidth="1"
            />
            <polygon
              points="50,25 75,40 75,60 50,75 25,60 25,40"
              fill="none"
              stroke="rgba(125, 211, 252, 0.3)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Center glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute w-6 h-6 md:w-8 md:h-8 bg-amber-400/40 rounded-full blur-md animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Floating energy orbs */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 md:w-3 md:h-3 bg-amber-400 rounded-full animate-orbit"
              style={{
                animationDelay: `${i * 0.5}s`,
                transformOrigin: 'center center',
              }}
            />
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 text-center">
        <p className="font-['Cinzel_Decorative'] text-amber-500 text-sm md:text-base animate-pulse">
          Summoning from the Void...
        </p>
        <div className="flex justify-center gap-1 mt-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-orbit {
          animation: orbit 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
