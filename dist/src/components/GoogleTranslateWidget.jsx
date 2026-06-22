import React, { useEffect } from 'react';

export const useGoogleTranslate = () => {
    
    useEffect(() => {
       
        const addScript = () => {
            const script = document.createElement('script');
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        };
       
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    
                    pageLanguage: 'hi', 
                },
                'google_translate_element' 
            );
        };

        
        if (!document.querySelector('script[src*="translate.google.com"]')) {
            addScript();
        }

    
        return () => {
            delete window.googleTranslateElementInit;
        };
    }, []);

   
    const changeLanguage = (langCode) => {
        const googleTranslateElement = document.getElementById('google_translate_element');
        if (googleTranslateElement) {
            const select = googleTranslateElement.querySelector('select.goog-te-combo');
            if (select) {
                select.value = langCode;
                select.dispatchEvent(new Event('change'));
            }
        }
    };

   
    return { changeLanguage };
};


const GoogleTranslateWidget = () => {
   
    useGoogleTranslate();

    
    return (
        <div id="google_translate_element" style={{ display: 'none' }}></div>
    );
};

export default GoogleTranslateWidget;