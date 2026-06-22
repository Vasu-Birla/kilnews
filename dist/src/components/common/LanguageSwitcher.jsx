//  // src/components/common/LanguageSwitcher.jsx
// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { Dropdown } from 'react-bootstrap';

// const LanguageSwitcher = () => {
//   const { i18n, t } = useTranslation();

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   // ड्रॉपडाउन के लिए कस्टम टॉगल ताकि रंग सही दिखे
//   const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
//     <a
//       href=""
//       ref={ref}
//       onClick={(e) => {
//         e.preventDefault();
//         onClick(e);
//       }}
//       className="text-white text-decoration-none"
//     >
//       {children}
//     </a>
//   ));


//   return (
//     <Dropdown>
//       <Dropdown.Toggle as={CustomToggle} id="language-switcher">
//         {/* वर्तमान भाषा का नाम दिखाएं */}
//         <i className="bi bi-translate me-1"></i>
//         {i18n.language === 'hi' ? t('language_hindi') : t('language_english')}
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//         <Dropdown.Item onClick={() => changeLanguage('hi')}>{t('language_hindi')}</Dropdown.Item>
//         <Dropdown.Item onClick={() => changeLanguage('en')}>{t('language_english')}</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// };

// // ✅✅✅ सबसे ज़रूरी लाइन यह है ✅✅✅
// export default LanguageSwitcher;
// src/components/LanguageSwitcher.js

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const LanguageSwitcher = () => {
    // i18n इंस्टैंस को useTranslation हुक से प्राप्त करें
    const { i18n } = useTranslation();

    // भाषा बदलने के लिए फंक्शन
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="d-flex align-items-center">
            {/* इंग्लिश बटन */}
            <Button 
                variant="light" 
                size="sm" 
                className="me-2"
                onClick={() => changeLanguage('en')}
                // अगर भाषा पहले से इंग्लिश है तो बटन को डिसेबल करें
                disabled={i18n.language === 'en'} 
            >
                English
            </Button>
            
            {/* हिंदी बटन */}
            <Button 
                variant="light" 
                size="sm"
                onClick={() => changeLanguage('hi')}
                // अगर भाषा पहले से हिंदी है तो बटन को डिसेबल करें
                disabled={i18n.language === 'hi'}
            >
                हिन्दी
            </Button>
        </div>
    );
};

export default LanguageSwitcher;