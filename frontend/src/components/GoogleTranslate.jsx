import { useEffect } from "react";

function GoogleTranslate() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi",
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      const scripts = document.querySelectorAll(
        'script[src*="translate.google.com"]',
      );

      scripts.forEach((script) => script.remove());

      delete window.googleTranslateElementInit;
    };
  }, []);

  return <div id="google_translate_element" style={{ display: "none" }} />;
}

export default GoogleTranslate;
