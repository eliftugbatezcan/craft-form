import { create } from "zustand";
import type { FormSchema, FormField } from "../types/form";
import { arrayMove } from "@dnd-kit/sortable";

interface OrganizationSettings {
  name: string;
  logoUrl?: string;
  website?: string;
}

interface FormState {
  schema: FormSchema;
  organization: OrganizationSettings;
  selectedFieldId: string | null;
  isPreviewOpen: boolean;
  isPublished: boolean;
  setPublished: (published: boolean) => void;

  // Aksiyonlar
  setOrganization: (org: Partial<OrganizationSettings>) => void;
  addField: (type: FormField["type"]) => void;
  removeField: (id: string) => void;
  updateTitle: (title: string) => void;
  moveField: (activeId: string, overId: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  selectField: (id: string | null) => void;
  setPreviewOpen: (open: boolean) => void;
}

export const useFormStore = create<FormState>((set) => ({
  schema: {
    title: "Yeni Form",
    fields: [],
  },
  organization: {
    name: "Şirket Adı",
    logoUrl: "",
    website: "",
  },
  selectedFieldId: null,
  isPreviewOpen: false,
  isPublished: false,
  setPublished: (published) => set({ isPublished: published }),

  setOrganization: (org) =>
    set((state) => ({
      organization: { ...state.organization, ...org },
    })),

  setPreviewOpen: (open) => set({ isPreviewOpen: open }),

  addField: (type) => {
    const newId = crypto.randomUUID();
    const defaultLabels: Record<string, string> = {
      header: "Başlık Alanı",
      text: "Kısa Metin",
      textarea: "Uzun Metin",
      full_name: "Ad Soyad",
      email: "E-posta",
      phone: "Telefon Numarası",
      address: "Adres",
      date: "Tarih",
      dropdown: "Seçenek Kutusu",
    };

    set((state) => ({
      selectedFieldId: newId,
      schema: {
        ...state.schema,
        fields: [
          ...state.schema.fields,
          {
            id: newId,
            type,
            label: defaultLabels[type] || "Yeni Alan",
            placeholder: "",
            required: false,
          } as FormField,
        ],
      },
    }));
  },

  removeField: (id) =>
    set((state) => ({
      selectedFieldId:
        state.selectedFieldId === id ? null : state.selectedFieldId,
      schema: {
        ...state.schema,
        fields: state.schema.fields.filter((field) => field.id !== id),
      },
    })),

  moveField: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.schema.fields.findIndex((f) => f.id === activeId);
      const newIndex = state.schema.fields.findIndex((f) => f.id === overId);

      if (oldIndex === -1 || newIndex === -1) return state;

      return {
        schema: {
          ...state.schema,
          fields: arrayMove(state.schema.fields, oldIndex, newIndex),
        },
      };
    }),

  updateField: (id, updates) =>
    set((state) => ({
      schema: {
        ...state.schema,
        fields: state.schema.fields.map((field) =>
          field.id === id ? { ...field, ...updates } : field,
        ) as FormField[],
      },
    })),

  selectField: (id) => set({ selectedFieldId: id }),

  updateTitle: (title) =>
    set((state) => ({
      schema: { ...state.schema, title },
    })),
}));
