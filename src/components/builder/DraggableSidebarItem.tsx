import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  type: string;
  label: string;
}

export const DraggableSidebarItem = ({ type, label }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${type}`,
    data: { type },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 border rounded-lg bg-white cursor-grab hover:border-blue-400 
                 hover:shadow-md transition-all text-sm font-medium text-slate-700 
                 active:cursor-grabbing active:scale-95 touch-none"
    >
      {label}
    </div>
  );
};
