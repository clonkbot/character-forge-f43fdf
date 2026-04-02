import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

interface Character {
  _id: Id<"characters">;
  _creationTime: number;
  userId: Id<"users">;
  prompt: string;
  imageBase64: string;
  createdAt: number;
  name?: string;
}

interface CharacterGalleryProps {
  onBack: () => void;
}

export function CharacterGallery({ onBack }: CharacterGalleryProps) {
  const characters = useQuery(api.characters.list);
  const deleteCharacter = useMutation(api.characters.remove);
  const updateName = useMutation(api.characters.updateName);

  const [selectedCharacter, setSelectedCharacter] = useState<Id<"characters"> | null>(null);
  const [editingName, setEditingName] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const selected = characters?.find((c: Character) => c._id === selectedCharacter);

  const handleDelete = async (id: Id<"characters">) => {
    try {
      await deleteCharacter({ id });
      if (selectedCharacter === id) {
        setSelectedCharacter(null);
      }
    } catch (err) {
      console.error("Failed to delete character:", err);
    }
  };

  const handleUpdateName = async () => {
    if (!selectedCharacter || !editingName.trim()) return;
    try {
      await updateName({ id: selectedCharacter, name: editingName.trim() });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update name:", err);
    }
  };

  if (characters === undefined) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-2 border-amber-600/30 rounded-full animate-spin border-t-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h2 className="font-['Cinzel_Decorative'] text-xl md:text-2xl text-amber-500 mb-1">
            Your Collection
          </h2>
          <p className="font-['Cormorant_Garamond'] text-[#f5f0e8]/60 text-base md:text-lg">
            {characters.length} character{characters.length !== 1 ? 's' : ''} summoned
          </p>
        </div>
        <button
          onClick={onBack}
          className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-amber-700 to-amber-600 text-[#0a0a0f] font-['Cormorant_Garamond'] font-semibold rounded-lg hover:from-amber-600 hover:to-amber-500 transition-all text-sm md:text-base"
        >
          <span className="hidden sm:inline">+ Summon New</span>
          <span className="sm:hidden">+ New</span>
        </button>
      </div>

      {characters.length === 0 ? (
        <div className="text-center py-16 md:py-20">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full border-2 border-dashed border-amber-600/30 flex items-center justify-center">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-amber-600/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="font-['Cinzel_Decorative'] text-lg md:text-xl text-amber-600/50 mb-2">
            Your Collection is Empty
          </p>
          <p className="font-['Cormorant_Garamond'] text-[#f5f0e8]/40 text-base md:text-lg mb-6">
            Begin summoning characters to build your collection
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-600 text-[#0a0a0f] font-['Cinzel_Decorative'] text-sm uppercase tracking-wider rounded-lg hover:from-amber-600 hover:to-amber-500 transition-all"
          >
            Begin Summoning
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gallery Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {characters.map((character: Character) => (
                <div
                  key={character._id}
                  onClick={() => {
                    setSelectedCharacter(character._id);
                    setEditingName(character.name || "");
                    setIsEditing(false);
                  }}
                  className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer group transition-all ${
                    selectedCharacter === character._id
                      ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-[#0a0a0f]'
                      : 'hover:ring-1 hover:ring-amber-600/50'
                  }`}
                >
                  <img
                    src={`data:image/png;base64,${character.imageBase64}`}
                    alt={character.name || "Character"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="font-['Cormorant_Garamond'] text-[#f5f0e8] text-sm truncate">
                        {character.name || "Unnamed"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selected ? (
              <div className="sticky top-6">
                <div className="relative rounded-xl overflow-hidden border border-amber-600/30 bg-[#0f0f15]/80">
                  <img
                    src={`data:image/png;base64,${selected.imageBase64}`}
                    alt={selected.name || "Character"}
                    className="w-full aspect-square object-cover"
                  />

                  <div className="p-4 md:p-5 space-y-4">
                    {/* Name */}
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="flex-1 px-3 py-2 bg-[#0a0a0f]/80 border border-amber-600/30 rounded-lg text-[#f5f0e8] focus:outline-none focus:border-amber-500 font-['Cormorant_Garamond']"
                          placeholder="Enter name..."
                          autoFocus
                        />
                        <button
                          onClick={handleUpdateName}
                          className="px-3 py-2 bg-amber-600 text-[#0a0a0f] rounded-lg hover:bg-amber-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <h3 className="font-['Cinzel_Decorative'] text-lg text-amber-500">
                          {selected.name || "Unnamed Character"}
                        </h3>
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setEditingName(selected.name || "");
                          }}
                          className="p-2 text-[#f5f0e8]/50 hover:text-amber-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>
                    )}

                    {/* Prompt */}
                    <div>
                      <p className="font-['Cormorant_Garamond'] text-[#f5f0e8]/50 text-xs uppercase tracking-wider mb-1">
                        Original Prompt
                      </p>
                      <p className="font-['Cormorant_Garamond'] text-[#f5f0e8]/80 text-sm leading-relaxed">
                        {selected.prompt}
                      </p>
                    </div>

                    {/* Created Date */}
                    <div>
                      <p className="font-['Cormorant_Garamond'] text-[#f5f0e8]/50 text-xs uppercase tracking-wider mb-1">
                        Summoned
                      </p>
                      <p className="font-['Cormorant_Garamond'] text-[#f5f0e8]/80 text-sm">
                        {new Date(selected.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(selected._id)}
                      className="w-full py-2.5 border border-red-500/40 text-red-400 font-['Cormorant_Garamond'] rounded-lg hover:bg-red-900/30 hover:border-red-500/60 transition-all"
                    >
                      Banish Character
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="sticky top-6 rounded-xl border border-amber-600/20 bg-[#0f0f15]/50 p-6 md:p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-dashed border-amber-600/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <p className="font-['Cormorant_Garamond'] text-[#f5f0e8]/50 text-base">
                  Select a character to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
