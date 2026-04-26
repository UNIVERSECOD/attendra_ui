import { LANGUAGES } from "../../constants/languages";
import { useI18n } from "../../hooks/useI18n";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="rounded-xl bg-white/5 p-3">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {t("common.language", "Language")}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {LANGUAGES.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setLanguage(item.value)}
            className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
              language === item.value
                ? "bg-purple text-white shadow-purple"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
