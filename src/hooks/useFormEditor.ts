import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import type { FormField } from "../types/form";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import { useFormStore } from "../store/useFormStore";

export const useFormEditor = () => {
  const { addField, moveField } = useFormStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const isSidebarItem = active.id.toString().includes("draggable-");

    if (isSidebarItem) {
      const type = active.data.current?.type as FormField["type"];
      if (type) {
        addField(type);
      }
      return;
    }

    if (active.id !== over.id) {
      moveField(active.id as string, over.id as string);
    }
  };

  return {
    sensors,
    activeId,
    handleDragStart,
    handleDragEnd,
  };
};
