import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import { Sidebar } from "../layout/Sidebar";
import { Canvas } from "../../components/builder/Canvas";
import { PropertiesPanel } from "../../components/builder/PropertiesPanel";
import { useFormEditor } from "../../hooks/useFormEditor";
import { useFormStore } from "../../store/useFormStore";
import { Download, Eye, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { PreviewModal } from "../builder/PreviewModal";

export const BuilderPage = () => {
  const { sensors, handleDragStart, handleDragEnd, activeId } = useFormEditor();
  const { schema, organization, setPreviewOpen } = useFormStore();

  const handleExport = () => {
    const finalData = {
      exportDate: new Date().toLocaleString("tr-TR"),
      organization,
      form: schema,
    };

    const blob = new Blob([JSON.stringify(finalData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${organization.name.replace(/\s+/g, "-").toLowerCase()}-schema.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-50">
        <header className="h-16 border-b bg-white flex items-center justify-between px-8 shrink-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 hover:bg-slate-50 rounded-lg transition-colors group"
            >
              <LayoutDashboard
                size={20}
                className="text-slate-400 group-hover:text-blue-600"
              />
            </Link>
            <h1 className="font-bold text-xl tracking-tight text-slate-800">
              Craft<span className="text-blue-600">Form</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">
              {organization.name}
            </span>
            <button
              onClick={() => setPreviewOpen(true)}
              className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
            >
              <Eye size={16} />
              Önizleme
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
            >
              <Download size={16} />
              JSON Dışa Aktar
            </button>
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden">
          <Sidebar />
          <Canvas />
          <PropertiesPanel />
        </main>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeId ? (
          <div className="p-4 border-2 border-blue-500 bg-white shadow-2xl rounded-xl opacity-90 cursor-grabbing w-64 text-center ring-4 ring-blue-50">
            <span className="text-blue-600 font-bold">
              Bileşen Yerleştiriliyor...
            </span>
          </div>
        ) : null}
      </DragOverlay>
      <PreviewModal />
    </DndContext>
  );
};
