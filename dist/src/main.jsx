// // src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import './locales/i18n.js';
// // ... अन्य इंपोर्ट्स
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import { BrowserRouter } from 'react-router-dom'; // सही ढंग से इम्पोर्ट किया गया
// import { AuthProvider } from './context/AuthContext.jsx'; // सही ढंग से इम्पोर्ट किया गया

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter> {/* यह सबसे बाहरी राउटर होना चाहिए */}
//       <AuthProvider> {/* AuthProvider App को रैप करता है ताकि Auth context प्रोवाइड कर सके */}
//         <App />
//       </AuthProvider>
//     </BrowserRouter>
//   <0React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

// 1. i18n कॉन्फ़िगरेशन को इम्पोर्ट करें
import './locales/i18n.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    {/* 2. Suspense जोड़ना बहुत ज़रूरी है */}
    {/* यह तब तक "Loading..." दिखाएगा जब तक Tolgee से ट्रांसलेशन लोड नहीं हो जाते */}
    <React.Suspense fallback={<div>Loading...</div>}>
    
        <App />
      
    </React.Suspense>
  </React.StrictMode>
);
