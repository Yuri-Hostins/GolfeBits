// src/i18n/I18nProvider.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DICTS, AVAILABLE_LANGS } from "./langs";

const I18nContext = createContext(null);

function getDefaultLang() {
    const saved = localStorage.getItem("lang");
    if (saved && DICTS[saved]) return saved;
    const nav = (navigator.language || "pt").toLowerCase();
    return nav.startsWith("es") ? "es" : "pt";
}

function getByPath(obj, path) {
    return path.split(".").reduce((acc, k) => (acc && acc[k] != null ? acc[k] : undefined), obj);
}

export default function I18nProvider({ children }) {
    const [lang, setLang] = useState(getDefaultLang);

    useEffect(() => {
        localStorage.setItem("lang", lang);
        // atualiza atributo lang do <html> para acessibilidade/SEO
        document.documentElement.lang = lang === "pt" ? "pt-BR" : "es";
    }, [lang]);

    const t = useMemo(() => {
        return (key, fallback = key) => {
            const val = getByPath(DICTS[lang], key);
            return val == null ? fallback : val;
        };
    }, [lang]);

    const value = useMemo(
        () => ({ lang, setLang, t, available: AVAILABLE_LANGS }),
        [lang, t]
    );

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
    return ctx;
}
