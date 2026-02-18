import { DndContext, closestCorners, DragOverlay } from '@dnd-kit/core';
import { Sidebar } from './components/layout/Sidebar';
import { Canvas } from './components/builder/Canvas';
import { useFormEditor } from './hooks/useFormEditor';

function App() {
  // Mantığı hook'tan çekiyoruz (Decoupling)
  const { sensors, handleDragStart, handleDragEnd, activeId } = useFormEditor();

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCorners} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-50">
        <header className="h-14 border-b bg-white flex items-center px-6 shrink-0 z-10 shadow-sm">
           <h1 className="font-bold text-xl tracking-tight text-slate-800">
             Craft<span className="text-blue-600">Form</span>
           </h1>
        </header>

        <main className="flex-1 flex overflow-hidden">
          <Sidebar />
          <Canvas />
        </main>
      </div>

      {/* Sürükleme anındaki görsel akıcılık buraya taşındı */}
      <DragOverlay dropAnimation={null}>
        {activeId ? (
          <div className="p-4 border-2 border-blue-500 bg-white shadow-2xl rounded-xl opacity-90 cursor-grabbing w-64 text-center">
            Bileşen Yerleştiriliyor...
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;