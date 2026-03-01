import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FieldRenderer } from "./FieldRenderer";
import type { FormField } from "../../types/form";
import { useFormStore } from "../../store/useFormStore";

interface Props {
  field: FormField;
}

export const SortableField = ({ field }: Props) => {
  const { removeField } = useFormStore();
  const { selectField, selectedFieldId } = useFormStore();
  const isSelected = selectedFieldId === field.id;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => selectField(field.id)}
      className="group relative p-5 border rounded-xl bg-white hover:border-blue-400 
                 transition-all duration-200 shadow-sm mb-4"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 
                   cursor-grab active:cursor-grabbing p-1 hover:bg-slate-100 rounded"
      >
        <span className="text-slate-400 text-xl">⋮⋮</span>
      </div>

      <button
        onClick={() => removeField(field.id)}
        className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-white border border-slate-200
                   text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex 
                   items-center justify-center shadow-sm hover:text-red-500 z-10"
      >
        ×
      </button>

      <div className="ml-6">
        <FieldRenderer field={field} />
      </div>
    </div>
  );
};
