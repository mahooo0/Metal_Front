import React from "react";

import { Plus } from "lucide-react";

export default function EmptyCellButton() {
  return (
    <button className="flex flex-col items-center gap-3 p-6 text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">
      <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <Plus className="w-6 h-6" />
      </div>
      <span className="text-sm font-medium">Додати віджет</span>
    </button>
  );
}
