import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFormStore } from "../../store/useFormStore";
import { SortableField } from "./SortableField";

export const Canvas = () => {
  const { schema, organization } = useFormStore();
  const { setNodeRef, isOver } = useDroppable({ id: "canvas-area" });

  return (
    <section className="flex-1 bg-slate-50 overflow-y-auto w-full">
      <div className="w-full flex flex-col items-center py-20 px-4 min-h-full">
        <div
          ref={setNodeRef}
          className={`
            w-full max-w-2xl transition-all duration-300
            h-fit min-h-[700px] flex flex-col
            bg-white rounded-3xl shadow-sm border-2 border-dashed p-10
            ${isOver ? "border-blue-500 bg-blue-50/30 scale-[1.01]" : "border-slate-200"}
          `}
        >
          <div className="flex flex-col items-center border-b border-slate-100 pb-8 mb-8 text-center">
            {organization.logoUrl ? (
              <img
                src={organization.logoUrl}
                alt="Şirket Logosu"
                className="h-16 w-auto mb-4 object-contain animate-in fade-in zoom-in duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4 border border-slate-100">
                🏢
              </div>
            )}

            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] px-2">
              {organization.name || "ORGANİZASYON ADI"}
            </h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full mt-4 opacity-20" />
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <SortableContext
              items={schema.fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              {schema.fields.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-400">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-2xl">
                    ✨
                  </div>
                  <p className="font-medium text-lg">
                    Bileşenleri buraya sürükleyin
                  </p>
                  <p className="text-sm opacity-70 mt-1">
                    Formunuzu tasarlamaya başlamak için sol paneli kullanın.
                  </p>
                </div>
              ) : (
                schema.fields.map((field) => (
                  <SortableField key={field.id} field={field} />
                ))
              )}
            </SortableContext>
          </div>
        </div>

        <div className="h-20 w-full shrink-0" />
      </div>
    </section>
  );
};
