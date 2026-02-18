import { 
  useSensor, 
  useSensors, 
  PointerSensor, 
  KeyboardSensor,
} from '@dnd-kit/core';
// 1. Tipleri 'import type' olarak almalıyız
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import type { FormField } from '../types/form';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { useFormStore } from '../store/useFormStore';

export const useFormEditor = () => {
  const { addField, moveField } = useFormStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  // 2. Sensör Konfigürasyonu
  const sensors = useSensors(
    useSensor(PointerSensor, { 
      activationConstraint: { distance: 5 } 
    }),
    useSensor(KeyboardSensor, { 
      coordinateGetter: sortableKeyboardCoordinates 
    })
  );

  // 3. DragStartEvent tipini ekledik
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // 4. DragEndEvent tipini ekledik
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    
    if (!over) return;

    const isSidebarItem = active.id.toString().includes('draggable-');

    // Yeni Eleman Ekleme Mantığı
    if (isSidebarItem) {
      // active.data içindeki tip bilgisini güvenli bir şekilde alıyoruz
      const type = active.data.current?.type as FormField['type'];
      if (type) {
        addField(type);
      }
      return;
    }

    // Sıralama (Sorting) Mantığı
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