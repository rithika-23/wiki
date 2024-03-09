import React, { useEffect, useState } from 'react';

const GoogleTranslateComponent = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById('google-translate-script');

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'http://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate';
      script.async = true;
      script.onerror = () => setError(true);

      document.body.appendChild(script);

      window.loadGoogleTranslate = () => {
        if (!window.google || !window.google.translate) {
          setError(true);
          return;
        }
        new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
      };
    } else {
      window.loadGoogleTranslate();
    }

    return () => {
      if (existingScript) {
        document.body.removeChild(existingScript);
        delete window.loadGoogleTranslate;
      }
    };
  }, []);

  return (
    <div id="google_translate_element">
      {error && <p className='text-white' style={{fontSize:'1px'}}>Failed to load Google Translate. Please try again later.</p>}
    </div>
  );
};

export default GoogleTranslateComponent;