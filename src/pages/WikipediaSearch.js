import React, { useEffect } from "react";

const MyComponent = () => {
  useEffect(() => {
    // Check if the Google Translate script is already loaded
    if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) {
      console.log("Loading Google Translate script...");

      // Create a script element
      const script = document.createElement('script');
      script.src = 'http://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate';
      script.async = true;

      // Append the script to the document body
      document.body.appendChild(script);

      // Function to be called when the Google Translate script is loaded
      window.loadGoogleTranslate = () => {
        console.log("Google Translate script loaded.");
        // Additional logic if needed
        new window.google.translate.TranslateElement("myid");
      };

      // Clean up the script when the component unmounts
      return () => {
        document.body.removeChild(script);
        // Ensure to clear the global function as well
        delete window.loadGoogleTranslate;
        console.log("Google Translate script unloaded.");
      };
    } else {
      // If the script is already loaded, just call the function
      console.log("Google Translate script is already loaded.");
      window.loadGoogleTranslate();
    }
  }, []);

  return (
    <div>
      {/* Your component's JSX content */}
      <div id="myid">This is the content to be translated.</div>
      <MyComponent />
    </div>
  );
};

export default MyComponent;
