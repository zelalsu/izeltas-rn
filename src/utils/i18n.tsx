import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Constant
import en from "../constants/translations/en";
import tr from "../constants/translations/tr";

// Multi language handler
i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "tr",
  fallbackLng: ["tr", "en"],
  resources: {
    tr: tr,
    en: en,
  },
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
