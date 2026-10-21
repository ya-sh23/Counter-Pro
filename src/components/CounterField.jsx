import React from 'react';
import { 
  Plus, Trash2, RotateCcw, CheckSquare, Square, GripVertical 
} from 'lucide-react';
import { useCounter } from '../context/CounterContext';

export default function CounterField({ field }) {
  const { 
    setDraggedId, draggedId, updateFieldTitle, toggleSelectionType,
    resetFieldCounts, removeField, updateButtonLabel, removeButton,
    handleIncrement, updateButtonColor, addButton
  } = useCounter();

  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  const getColorClasses = (colorName) => {
    const map = {
      yellow: 'bg-[#EAB308] hover:bg-[#CA8A04] text-black font-bold shadow-sm',
      white: 'bg-white hover:bg-[#F4F4F5] text-black font-bold border border-[#E4E4E7]',
      grey: 'bg-[#3F3F46] hover:bg-[#52525B] text-white font-bold',
      black: 'bg-[#18181B] hover:bg-[#27272A] text-white font-bold border border-[#3F3F46]'
    };
    return map[colorName] || map.yellow;
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, field.id)}
      onDragOver={(e) => handleDragOver(e, field.id)}
      onDragEnd={handleDragEnd}
      className={`bg-[#18181B] backdrop-blur-md rounded-2xl border border-[#27272A] shadow-xl transition-all overflow-hidden ${
        draggedId === field.id ? 'opacity-40 border-[#EAB308] border-dashed' : 'hover:border-[#3F3F46]'
      }`}
    >
      {/* Field Header */}
      <div className="bg-[#09090B] px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-[#27272A] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-1 min-w-[160px]">
          <div className="cursor-grab text-[#71717A] hover:text-[#EAB308] active:cursor-grabbing p-0.5" title="Drag to reorder">
            <GripVertical className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={field.title}
            onChange={(e) => updateFieldTitle(field.id, e.target.value)}
            className="font-bold text-white placeholder-[#71717A] bg-transparent border-b border-transparent hover:border-[#27272A] focus:border-[#EAB308] focus:outline-none px-1 py-0.5 text-xs sm:text-sm w-full sm:w-64"
            placeholder="Enter group title..."
          />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => toggleSelectionType(field.id)}
            className={`text-[10px] sm:text-xs font-semibold px-2 py-1.5 rounded-lg border transition-all flex items-center gap-1 ${
              field.selectionType === 'single'
                ? 'bg-[#27272A] border-[#3F3F46] text-[#EAB308]'
                : 'bg-[#EAB308] border-[#EAB308] text-black font-bold'
            }`}
          >
            {field.selectionType === 'single' ? (
              <>
                <CheckSquare className="w-3 h-3" />
                <span>Single</span>
              </>
            ) : (
              <>
                <Square className="w-3 h-3" />
                <span>Multiple</span>
              </>
            )}
          </button>

          <button
            onClick={() => resetFieldCounts(field.id)}
            className="p-1.5 text-[#A1A1AA] hover:text-white hover:bg-[#27272A] rounded-lg transition-all"
            title="Reset group counts"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => removeField(field.id)}
            className="p-1.5 text-[#A1A1AA] hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-all"
            title="Delete group"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Field Body */}
      <div className="p-3 sm:p-4 space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
          {field.buttons.map((btn) => (
            <div 
              key={btn.id}
              className="bg-[#09090B] border border-[#27272A] rounded-xl p-2.5 sm:p-3 flex flex-col justify-between gap-2 relative group"
            >
              <div className="flex items-center justify-between gap-1">
                <input
                  type="text"
                  value={btn.label}
                  onChange={(e) => updateButtonLabel(field.id, btn.id, e.target.value)}
                  className="font-medium text-white text-xs bg-transparent border-b border-transparent hover:border-[#27272A] focus:border-[#EAB308] focus:outline-none w-full placeholder-[#71717A]"
                  placeholder="Label..."
                />
                {field.buttons.length > 1 && (
                  <button
                    onClick={() => removeButton(field.id, btn.id)}
                    className="text-[#71717A] hover:text-rose-400 p-1 rounded-md transition-all"
                    title="Delete option"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="text-center py-0.5 sm:py-1">
                <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {btn.count}
                </span>
              </div>

              <div className="space-y-1.5">
                <button
                  onClick={() => handleIncrement(field.id, btn.id)}
                  className={`w-full py-2 px-2 rounded-lg text-xs transition-all active:scale-95 flex items-center justify-center gap-1 ${getColorClasses(btn.color)}`}
                >
                  <span>Count</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 pt-0.5">
                  {['yellow', 'white', 'grey', 'black'].map((col) => (
                    <button
                      key={col}
                      onClick={() => updateButtonColor(field.id, btn.id, col)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        btn.color === col ? 'ring-2 ring-offset-1 ring-[#EAB308] scale-110' : 'opacity-50 hover:opacity-100'
                      } ${
                        col === 'yellow' ? 'bg-[#EAB308]' : col === 'white' ? 'bg-white' : col === 'grey' ? 'bg-[#52525B]' : 'bg-black border border-[#3F3F46]'
                      }`}
                      title={`Set color to ${col}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => addButton(field.id)}
            className="border border-dashed border-[#27272A] hover:border-[#EAB308] hover:bg-[#18181B]/50 rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 text-[#A1A1AA] hover:text-[#EAB308] transition-all min-h-[110px] sm:min-h-[130px]"
          >
            <div className="w-7 h-7 rounded-lg bg-[#09090B] border border-[#27272A] flex items-center justify-center">
              <Plus className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-medium">Add Option</span>
          </button>
        </div>
      </div>
    </div>
  );
}
