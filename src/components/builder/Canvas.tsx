import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useFormStore } from '../../store/useFormStore'; 
import { SortableField } from './SortableField';

export const Canvas = () => {
  const { schema } = useFormStore();
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-area' });

  return (
    <section className="flex-1 bg-slate-50 p-8 overflow-y-auto flex flex-col items-center">
      <div
        ref={setNodeRef}
        className={`w-full max-w-2xl min-h-[600px] bg-white rounded-2xl shadow-sm 
                    border-2 border-dashed p-8 transition-all
                    ${isOver ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200'}`}
      >
        <SortableContext 
          items={schema.fields.map(f => f.id)} 
          strategy={verticalListSortingStrategy}
        >
          {schema.fields.length === 0 ? (
            <div className="text-center mt-20 text-slate-400">
              <p>Bileşenleri buraya sürükleyin</p>
            </div>
          ) : (
            schema.fields.map((field) => (
              <SortableField key={field.id} field={field} />
            ))
          )}
        </SortableContext>
      </div>
    </section>
  );
};