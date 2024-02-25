import React from 'react';

export type Language = "ar" | "de" | "en" | "es" | "fr" | "he" | "it" | "nl" | "no" | "pt" | "ru" | "sv" | "ud" | "zh";

interface LanguageSelectorProps {
  setLanguage: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ setLanguage }) => {
  return <span>
        Language:     
        <select value="en" onChange={(e) => setLanguage(e.target.value as Language)}>
        <option value="ar">Arabic</option>
        <option value="de">German</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="he">Hebrew</option>
        <option value="it">Italian</option>
        <option value="nl">Dutch</option>
        <option value="no">Norwegian</option>
        <option value="pt">Portuguese</option>
        <option value="ru">Russian</option>
        <option value="sv">Swedish</option>
        <option value="ud">Urdu</option>
        <option value="zh">Chinese</option>
        </select>
    </span>;
};

export default LanguageSelector;
