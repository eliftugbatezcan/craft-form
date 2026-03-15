import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useFormStore } from "../../store/useFormStore";
import type { FormField, DateFormat } from "../../types/form";
import { Trash2, Building2, Settings2 } from "lucide-react";

export const PropertiesPanel = () => {
  const {
    schema,
    selectedFieldId,
    selectField,
    updateField,
    removeField,
    organization,
    setOrganization,
  } = useFormStore();

  const field = schema.fields.find((f: FormField) => f.id === selectedFieldId);

  return (
    <aside className="w-80 border-l bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
      <div className="p-4 border-b bg-slate-50/50 flex gap-2 shrink-0">
        <button
          onClick={() => selectField(null)}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            !selectedFieldId
              ? "bg-white shadow-sm text-blue-600 border border-blue-100"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <Building2 size={14} />
          Kurumsal
        </button>
        <button
          disabled={!selectedFieldId}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            selectedFieldId
              ? "bg-white shadow-sm text-blue-600 border border-blue-100"
              : "text-slate-300 cursor-not-allowed"
          }`}
        >
          <Settings2 size={14} />
          Bileşen
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {!selectedFieldId ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-4">
              <span className="p-1.5 bg-amber-50 text-amber-600 rounded">
                🏢
              </span>
              Organizasyon Ayarları
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Firma Adı
                </Label>
                <Input
                  value={organization.name}
                  placeholder="Örn: Acme Corp"
                  onChange={(e) => setOrganization({ name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Logo URL
                </Label>
                <Input
                  value={organization.logoUrl || ""}
                  placeholder="https://logo-linki.com/logo.png"
                  onChange={(e) => setOrganization({ logoUrl: e.target.value })}
                />
                <p className="text-[10px] text-slate-400 italic leading-relaxed">
                  Formun en üstünde görünecek marka logosu.
                </p>
              </div>
            </div>

            <div className="p-4 bg-blue-50/30 rounded-2xl border border-dashed border-blue-100 text-center">
              <p className="text-[11px] text-blue-600 font-medium">
                Düzenlemek için formdan bir bileşen seçebilirsiniz.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="text-blue-500 text-lg">⚙️</span>
                {field?.type.toUpperCase()} Ayarları
              </h3>
              <button
                onClick={() => removeField(field!.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Bileşeni Sil"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-slate-500">
                  Alan Başlığı
                </Label>
                <Input
                  value={field?.label}
                  onChange={(e) =>
                    updateField(field!.id, { label: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-bold uppercase text-slate-500">
                    Yer Tutucu
                  </Label>
                  <button
                    onClick={() => updateField(field!.id, { placeholder: "" })}
                    className="text-[10px] text-red-500 hover:underline"
                  >
                    Temizle
                  </button>
                </div>
                <Input
                  value={field?.placeholder || ""}
                  placeholder="Kutu içindeki yazı..."
                  onChange={(e) =>
                    updateField(field!.id, { placeholder: e.target.value })
                  }
                />
              </div>
            </div>

            {field?.type === "date" && (
              <div className="space-y-6 pt-4 border-t border-slate-100">
                <div className="space-y-3">
                  <Label className="text-xs font-bold uppercase text-slate-500">
                    Tarih Biçimi
                  </Label>
                  <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-md">
                    {(
                      ["AA-GG-YYYY", "GG-AA-YYYY", "YYYY-AA-GG"] as DateFormat[]
                    ).map((format) => (
                      <button
                        key={format}
                        onClick={() =>
                          updateField(field.id, { dateFormat: format })
                        }
                        className={`text-[10px] py-2 rounded-lg font-medium transition-all ${
                          (field as any).dateFormat === format
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold text-slate-700">
                      Takvim Penceresi
                    </Label>
                    <p className="text-[10px] text-slate-500">
                      Tıklandığında takvimi göster
                    </p>
                  </div>
                  <Switch
                    checked={(field as any).showCalendar ?? true}
                    onCheckedChange={(val) =>
                      updateField(field.id, { showCalendar: val })
                    }
                  />
                </div>
              </div>
            )}

            {field?.type === "phone" && (
              <div className="space-y-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <Label className="text-blue-700 font-bold text-[11px] uppercase tracking-wider">
                  Ülke Kodu Ayarı
                </Label>
                <Input
                  className="bg-white"
                  value={(field as any).countryCode || "+90"}
                  onChange={(e) =>
                    updateField(field.id, { countryCode: e.target.value })
                  }
                />
              </div>
            )}

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
              <div className="space-y-0.5">
                <Label className="font-bold text-slate-700 text-sm">
                  Zorunlu Alan
                </Label>
                <p className="text-[10px] text-slate-500">Boş bırakılamaz</p>
              </div>
              <Switch
                checked={field?.required}
                onCheckedChange={(val) =>
                  updateField(field!.id, { required: val })
                }
              />
            </div>
          </div>
        )}
      </div>

      {selectedFieldId && (
        <div className="p-4 border-t bg-slate-50/30">
          <button
            onClick={() => removeField(field!.id)}
            className="w-full py-3 px-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <Trash2 size={14} />
            Bileşeni Formdan Kaldır
          </button>
        </div>
      )}
    </aside>
  );
};
