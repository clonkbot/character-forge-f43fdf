import { useState } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { SummoningCircle } from "./SummoningCircle";

interface Character {
  _id: Id<"characters">;
  _creationTime: number;
  userId: Id<"users">;
  prompt: string;
  imageBase64: string;
  createdAt: number;
  name?: string;
}

export function CharacterGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [characterName, setCharacterName] = useState("");

  const generateImage = useAction(api.ai.generateImage);
  const saveCharacter = useMutation(api.characters.create);
  const recentCharacters = useQuery(api.characters.getRecent, { limit: 4 });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const enhancedPrompt = `Character portrait, fantasy style: ${prompt}. Detailed, high quality, dramatic lighting, painterly style, character concept art.`;
      const result = await generateImage({ prompt: enhancedPrompt });

      if (result) {
        setGeneratedImage(result);
      } else {
        setError("Failed to generate image. Please try a different prompt.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedImage || !prompt) return;

    try {
      await saveCharacter({
        prompt,
        imageBase64: generatedImage,
        name: characterName || undefined,
      });
      setGeneratedImage(null);
      setPrompt("");
      setCharacterName("");
    } catch (err) {
      setError("Failed to save character. Please try again.");
    }
  };

  const handleDiscard = () => {
    setGeneratedImage(null);
    setCharacterName("");
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Main Generator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
        {/* Left: Input & Controls */}
        <div className="order-2 lg:order-1 space-y-6">
          <div>
            <h2 className="font-['Cinzel_Decorative'] text-xl md:text-2xl text-amber-500 mb-2">
              Summon a Character
            </h2>
            <p className="font-['Cormorant_Garamond'] text-[#f5f0e8]/60 text-base md:text-lg">
              Describe your character and watch them emerge from the void
            </p>
          </div>

          {/* Prompt Input */}
          <div className="relative">
            <div className="absolute -inset-px bg-gradient-to-r from-amber-600/30 via-amber-600/10 to-amber-600/30 rounded-xl"></div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A fierce elven warrior with silver hair, glowing blue eyes, wearing ornate mithril armor..."
              className="relative w-full h-32 md:h-40 px-4 md:px-5 py-4 bg-[#0f0f15]/90 border border-amber-600/30 rounded-xl text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-amber-500 resize-none font-['Cormorant_Garamond'] text-base md:text-lg"
              disabled={isGenerating}
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-4 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-[#0a0a0f] font-['Cinzel_Decorative'] text-sm uppercase tracking-widest rounded-xl hover:from-amber-600 hover:via-amber-500 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full animate-spin"></div>
                  Channeling the Arcane...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Begin Summoning
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-900/30 border border-red-600/30 rounded-xl text-red-300 font-['Cormorant_Garamond'] text-center">
              {error}
            </div>
          )}

          {/* Recent Characters Preview */}
          {recentCharacters && recentCharacters.length > 0 && !generatedImage && (
            <div className="pt-6">
              <h3 className="font-['Cormorant_Garamond'] text-[#f5f0e8]/50 text-sm uppercase tracking-widest mb-4">
                Recent Summonings
              </h3>
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {recentCharacters.map((char: Character) => (
                  <div
                    key={char._id}
                    className="aspect-square rounded-lg overflow-hidden border border-amber-600/20 hover:border-amber-500/50 transition-all cursor-pointer group"
                    onClick={() => {
                      setPrompt(char.prompt);
                    }}
                  >
                    <img
                      src={`data:image/png;base64,${char.imageBase64}`}
                      alt={char.name || "Character"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Preview Area */}
        <div className="order-1 lg:order-2">
          <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
            {/* Outer glow */}
            <div className="absolute -inset-4 bg-gradient-to-b from-amber-600/10 via-transparent to-cyan-500/10 rounded-3xl blur-xl"></div>

            {/* Frame */}
            <div className="relative h-full border-2 border-amber-600/30 rounded-2xl overflow-hidden bg-[#0a0a0f]/80 backdrop-blur">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-600/60 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-600/60 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-600/60 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-600/60 rounded-br-2xl"></div>

              {isGenerating ? (
                <SummoningCircle />
              ) : generatedImage ? (
                <div className="relative h-full flex flex-col">
                  <img
                    src={`data:image/png;base64,${generatedImage}`}
                    alt="Generated character"
                    className="w-full h-full object-cover"
                  />

                  {/* Save/Discard Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/90 to-transparent p-4 md:p-6">
                    <input
                      type="text"
                      value={characterName}
                      onChange={(e) => setCharacterName(e.target.value)}
                      placeholder="Name this character..."
                      className="w-full px-4 py-2.5 bg-[#0f0f15]/80 border border-amber-600/30 rounded-lg text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-amber-500 font-['Cormorant_Garamond'] text-base md:text-lg mb-3"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={handleDiscard}
                        className="flex-1 py-2.5 border border-red-500/50 text-red-400 font-['Cormorant_Garamond'] rounded-lg hover:bg-red-900/30 transition-all"
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex-1 py-2.5 bg-gradient-to-r from-amber-700 to-amber-600 text-[#0a0a0f] font-['Cormorant_Garamond'] font-semibold rounded-lg hover:from-amber-600 hover:to-amber-500 transition-all"
                      >
                        Add to Collection
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-6 md:p-8 text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mb-6 rounded-full border-2 border-dashed border-amber-600/30 flex items-center justify-center">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-amber-600/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-['Cinzel_Decorative'] text-lg md:text-xl text-amber-600/50 mb-2">
                    The Portal Awaits
                  </p>
                  <p className="font-['Cormorant_Garamond'] text-[#f5f0e8]/40 text-base md:text-lg max-w-xs">
                    Describe your character above and begin the summoning ritual
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
