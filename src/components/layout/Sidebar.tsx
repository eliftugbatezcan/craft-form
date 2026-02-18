import { DraggableSidebarItem } from '../builder/DraggableSidebarItem';

export const Sidebar = () => {
  const fieldTypes = [
    { type: 'text', label: 'Yazı Alanı' },
    { type: 'email', label: 'E-posta' },
    { type: 'checkbox', label: 'Onay Kutusu' },
  ];

  return (
    <aside className="w-64 border-r bg-white p-4 hidden md:block shrink-0">
      <h2 className="text-sm font-semibold text-slate-500 uppercase mb-4 tracking-wider">
        Bileşenler
      </h2>
      <div className="flex flex-col gap-3">
        {fieldTypes.map((item) => (
          <DraggableSidebarItem key={item.type} {...item} />
        ))}
      </div>
    </aside>
  );
};