import { create } from 'zustand';
import type { FormSchema, FormField } from '../types/form';
import { arrayMove } from '@dnd-kit/sortable';

interface FormState {
  schema: FormSchema;
  addField: (type: FormField['type']) => void;
  removeField: (id: string) => void;
  updateTitle: (title: string) => void;
  moveField: (activeId: string, overId: string) => void;
}

export const useFormStore = create<FormState>((set) => ({
  // Başlangıç Durumu
  schema: {
    title: 'Yeni Form',
    fields: [],
  },

  // Yeni alan ekleme
  addField: (type: FormField['type']) =>
    set((state: FormState) => ({
      schema: {
        ...state.schema,
        fields: [
          ...state.schema.fields,
          {
            id: crypto.randomUUID(),
            type,
            label: type.charAt(0).toUpperCase() + type.slice(1),
            required: false,
          } as FormField,
        ],
      },
    })),

  // ID üzerinden silme
  removeField: (id) =>
    set((state) => ({
      schema: {
        ...state.schema,
        fields: state.schema.fields.filter((field) => field.id !== id),
      },
    })),

  // Sıralama Değiştirme (Reordering)
  moveField: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.schema.fields.findIndex((f) => f.id === activeId);
      const newIndex = state.schema.fields.findIndex((f) => f.id === overId);

      // Eğer elemanlar listede bulunamazsa state'i değiştirme
      if (oldIndex === -1 || newIndex === -1) return state;

      return {
        schema: {
          ...state.schema,
          fields: arrayMove(state.schema.fields, oldIndex, newIndex),
        },
      };
    }),

  // Başlık güncelleme
  updateTitle: (title) =>
    set((state) => ({
      schema: { ...state.schema, title },
    })),
}));