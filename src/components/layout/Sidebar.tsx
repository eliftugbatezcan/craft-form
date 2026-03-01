import { DraggableSidebarItem } from "../builder/DraggableSidebarItem";

export const Sidebar = () => {
  const basicFields = [
    { type: "text", label: "Kısa Metin" },
    { type: "email", label: "E-posta" },
  ];

  const advancedFields = [
    { type: "date", label: "Tarih Seçici" },
    { type: "phone", label: "Telefon" },
    { type: "address", label: "Adres" },
    { type: "header", label: "Bölüm Başlığı" },
    { type: "full_name", label: "Ad Soyad" },
    { type: "textarea", label: "Uzun Metin (Paragraf)" },
  ];

  return (
    <aside className="w-72 border-r bg-white p-4 flex flex-col gap-6 overflow-y-auto">
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">
          Temel Alanlar
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {basicFields.map((item) => (
            <DraggableSidebarItem key={item.type} {...item} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">
          Gelişmiş Alanlar
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {advancedFields.map((item) => (
            <DraggableSidebarItem key={item.type} {...item} />
          ))}
        </div>
      </div>
    </aside>
  );
};
