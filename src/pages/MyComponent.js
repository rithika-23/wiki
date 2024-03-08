import React, { useEffect } from "react";

const MyComponent = () => {
  useEffect(() => {
    // Function to be called when the Google Translate script is loaded
    window.loadGoogleTranslate = () => {
      new window.google.translate.TranslateElement("myid");
    };

    // Create a script element
    const script = document.createElement('script');
    script.src = 'http://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate';
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
      // Ensure to clear the global function as well
      delete window.loadGoogleTranslate;
    };
  }, []);

  return (
    <div>
      {/* Your component's JSX content */}
      <div id="myid">This is the content to be translated.</div>
    </div>
  );
};

export default MyComponent;
