import React from "react";
import { useFormStore } from "../../store/useFormStore";
import { FieldRenderer } from "./FieldRenderer";
import {
  X,
  Eye,
  Send,
  CheckCircle2,
  Copy,
  Download,
  Terminal,
} from "lucide-react";

export const PreviewModal = () => {
  const {
    schema,
    organization,
    isPreviewOpen,
    setPreviewOpen,
    isPublished,
    setPublished,
  } = useFormStore();

  if (!isPreviewOpen) return null;

  const handlePublish = () => {
    setPublished(true);
  };

  const handleCopyJSON = () => {
    const data = JSON.stringify({ organization, schema }, null, 2);
    navigator.clipboard.writeText(data);
    alert("JSON panoya kopyalandı!");
  };

  const handleDownloadJSON = () => {
    const data = JSON.stringify({ organization, schema }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${organization.name.replace(/\s+/g, "-").toLowerCase()}-config.json`;
    link.click();
  };

  const closeAll = () => {
    setPreviewOpen(false);
    setTimeout(() => setPublished(false), 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-600">
            {isPublished ? (
              <CheckCircle2 size={20} className="text-green-500" />
            ) : (
              <Eye size={20} />
            )}
            <span className="font-bold text-sm uppercase tracking-wider">
              {isPublished ? "Yayınlama Başarılı" : "Form Önizleme"}
            </span>
          </div>
          <button
            onClick={closeAll}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-white relative">
          {!isPublished ? (
            <div className="p-10 animate-in fade-in slide-in-from-bottom-4">
              <div className="max-w-2xl mx-auto">
                <div className="flex flex-col items-center border-b border-slate-100 pb-8 mb-8 text-center">
                  {organization.logoUrl && (
                    <img
                      src={organization.logoUrl}
                      alt="Logo"
                      className="h-16 mb-4 object-contain"
                    />
                  )}
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
                    {organization.name}
                  </h2>
                </div>

                <div className="space-y-8">
                  {schema.fields.map((field) => (
                    <div
                      key={field.id}
                      className="pointer-events-none opacity-90"
                    >
                      <FieldRenderer field={field} />
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex justify-center">
                  <button
                    onClick={handlePublish}
                    className="flex items-center gap-3 bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 transition-all"
                  >
                    <Send size={18} />
                    FORMU TAMAMLA VE YAYINLA
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 flex flex-col items-center justify-center text-center animate-in zoom-in-90">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-3">
                Tebrikler!
              </h2>
              <p className="text-slate-500 max-w-sm mb-10 font-medium">
                Formunuz hazır. Artık JSON şemasını projelerinize entegre
                edebilirsiniz.
              </p>

              <div className="w-full bg-slate-900 rounded-2xl p-6 text-left shadow-xl relative group">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-white/50 text-[10px] font-mono">
                    <Terminal size={14} />
                    schema-config.json
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyJSON}
                      className="p-1.5 hover:bg-white/10 rounded text-white/70 transition-colors"
                      title="Kopyala"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      onClick={handleDownloadJSON}
                      className="p-1.5 hover:bg-white/10 rounded text-white/70 transition-colors"
                      title="İndir"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
                <pre className="text-blue-300 text-[10px] font-mono overflow-x-auto max-h-48 custom-scrollbar">
                  {JSON.stringify({ organization, schema }, null, 2)}
                </pre>
              </div>

              <button
                onClick={closeAll}
                className="mt-8 text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-widest transition-colors"
              >
                Düzenleyiciye Geri Dön
              </button>
            </div>
          )}
        </div>

        {!isPublished && (
          <div className="p-4 bg-slate-50 border-t text-center text-[10px] text-slate-400 font-medium tracking-wide">
            BU BİR ÖNİZLEMEDİR • ETKİLEŞİM KAPALIDIR
          </div>
        )}
      </div>
    </div>
  );
};
