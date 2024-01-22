// // client/src/main.jsx
// // import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';  // Update the path based on your project structure
// // import <App></App>
// import './index.css';
// import { createRoot } from 'react-dom';
// import { persistor, store } from './redux/store.js';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <App />
//       {/* <App /> */}
//     </PersistGate>
//   </Provider>
// );
// client/src/main.jsx
import { createRoot } from 'react-dom';
import App from './App.jsx';
import './index.css';
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

