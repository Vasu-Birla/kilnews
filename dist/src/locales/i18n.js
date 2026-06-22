// // src/i18n.js
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// i18n
//   .use(LanguageDetector) // Detect user language
//   .use(initReactI18next) // Pass i18n instance to react-i18next
//   .init({
//     debug: true,
//     fallbackLng: 'hi', // अगर कोई भाषा नहीं मिलती तो हिंदी इस्तेमाल करें
//     interpolation: {
//       escapeValue: false, // React already safes from xss
//     },
//     resources: {
//       en: {
//         translation: {
//           // Header
//           search: "Search",
//           web_story: "Web Story",
//           youtube: "YouTube",
//           login_signup: "Login/Signup",
//           live_news: "Live News",
//           // Sidebar
//           home: "Home",
//           bharat: "Bharat",
//           videsh: "Videsh",
//           rajya: "State +",
//           manoranjan: "Entertainment",
//           jyotish: "Astrology",
//           khel: "Sports",
//           vichar: "Views",
//           karobar: "Business",
//           yuvaam: "Youth",
//           directory: "Directory",
//         }
//       },
//       hi: {
//         translation: {
//           // Header
//           search: "खोजें",
//           web_story: "वेब स्टोरी",
//           youtube: "यूट्यूब",
//           login_signup: "लॉगिन/साइनअप",
//           live_news: "लाइव न्यूज़",
//           // Sidebar
//           home: "होम",
//           bharat: "भारत",
//           videsh: "विदेश",
//           rajya: "राज्य +",
//           manoranjan: "मनोरंजन",
//           jyotish: "ज्योतिष",
//           khel: "खेल",
//           vichar: "विचार",
//           karobar: "कारोबार",
//           yuvaam: "युवाम",
//           directory: "डायरेक्ट्री",
//         }
//       }
//     }
//   });

// export default i18n;
// src/i18n.js
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// // अपनी JSON फाइलों को इम्पोर्ट करें
// import translationEN from './en/translation.json';
// import translationHI from './hi/translation.json';
// const resources = {
//   en: {
//     translation: translationEN
//   },
//   hi: {
//     translation: translationHI
//   }
// };

// i18n
//   .use(initReactI18next) // i18next को react-i18next के साथ जोड़ता है
//   .init({
//     resources,
//     lng: 'hi', // डिफ़ॉल्ट भाषा हिंदी सेट करें
//     fallbackLng: 'hi', // अगर कोई भाषा नहीं मिलती है तो हिंदी का प्रयोग करें
//     interpolation: {
//       escapeValue: false // React XSS से बचाता है, इसलिए यह जरूरी नहीं
//     },
//     debug: true // डेवलपमेंट के दौरान डिबगिंग के लिए इसे true रखें
//   });

// export default i18n;
// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // यूजर की भाषा का पता लगाएगा
  .use(LanguageDetector)
  // i18n को react-i18next के साथ जोड़ेगा
  .use(initReactI18next)
  .init({
    debug: true, // डेवेलपमेंट के दौरान कंसोल में जानकारी देखने के लिए
    fallbackLng: 'en', // अगर किसी भाषा में ट्रांसलेशन नहीं मिलता है, तो इंग्लिश दिखाएगा
    interpolation: {
      escapeValue: false, // React पहले से ही XSS से बचाता है
    },
    resources: {
      // इंग्लिश भाषा के ट्रांसलेशन
      en: {
        translation: {
          // यहाँ key: value के रूप में ट्रांसलेशन लिखें
          welcomeMessage: 'Welcome to our Website',
          home: 'Home',
          about: 'About Us',
          contact: 'Contact Us',
          topBarMessage: 'This is a sample top bar text.'
        }
      },
      // हिंदी भाषा के ट्रांसलेशन
      hi: {
        translation: {
          // ऊपर दी गई keys के लिए हिंदी में ट्रांसलेशन
          welcomeMessage: 'हमारी वेबसाइट पर आपका स्वागत है',
          home: 'होम',
          about: 'हमारे बारे में',
          contact: 'संपर्क करें',
          topBarMessage: 'यह एक सैंपल टॉप बार टेक्स्ट है।'
        }
      }
    }
  });

export default i18n;