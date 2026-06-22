// // src/App.jsx

// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import HomePage1 from './pages/Home/HomePage1';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import './App.css';
// const App = () => {
//     return (
//         <BrowserRouter>
//             <HomePage1 />
//         </BrowserRouter>
//     );
// };

// export default App;

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomePage1 from './pages/Home/HomePage1';
import { NewsProvider } from './context/NewsContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    return (
        <BrowserRouter>
            {/* ✅ NewsProvider yahan — BrowserRouter ke andar, sab kuch ke upar */}
            {/* Ab page change hone par Provider kabhi unmount nahi hoga */}
            <NewsProvider>
                <HomePage1 />
            </NewsProvider>
        </BrowserRouter>
    );
};

export default App;