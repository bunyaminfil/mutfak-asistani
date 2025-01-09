import React, { createContext, useContext, useState } from "react";
import { Languages, Language } from "@/constants/Languages";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    const t = (path: string) => {
        const keys = path.split(".");
        let current: any = Languages[language];

        for (const key of keys) {
            if (current[key] === undefined) {
                return path;
            }
            current = current[key];
        }

        return current;
    };

    return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
