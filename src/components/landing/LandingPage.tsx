import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Layout, Code, Zap } from "lucide-react";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
            C
          </div>
          <span className="text-xl font-bold tracking-tight">CraftForm</span>
        </div>
        <Link
          to="/builder"
          className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-slate-800 transition-all active:scale-95"
        >
          Hemen Başla
        </Link>
      </nav>

      <section className="max-w-7xl mx-auto px-8 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 animate-bounce">
          <Sparkles size={16} />
          <span>Yeni Nesil Form Oluşturucu</span>
        </div>

        <h1 className="text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          Saniyeler İçinde <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            Mükemmel Formlar
          </span>{" "}
          Tasarlayın
        </h1>

        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          Sürükle-bırak arayüzü, özelleştirilebilir tarih formatları ve anlık
          JSON çıktısı ile form tasarım süreçlerinizi profesyonelleştirin.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/builder"
            className="bg-blue-600 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
          >
            Form Oluşturmaya Başla
          </Link>
        </div>
      </section>

      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-12">
          <FeatureCard
            icon={<Layout className="text-blue-600" />}
            title="Sürükle & Bırak"
            desc="Kod yazmadan, sadece sürükleyerek karmaşık form hiyerarşileri oluşturun."
          />
          <FeatureCard
            icon={<Zap className="text-orange-500" />}
            title="Akıllı Tarih Ayarları"
            desc="Tarayıcı engellerine takılmadan dilediğiniz tarih formatını (GG-AA-YYYY) belirleyin."
          />
          <FeatureCard
            icon={<Code className="text-indigo-600" />}
            title="Anlık JSON Çıktısı"
            desc="Tasarladığınız formu tek tıkla JSON olarak dışarı aktarın ve sisteminize entegre edin."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </div>
);
