import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.ts";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBzt0r2F3JmjADfOu2HFkahn9dhnD-JY2U",
  authDomain: "portfolio-marcodeluca.firebaseapp.com",
  projectId: "portfolio-marcodeluca",
  storageBucket: "portfolio-marcodeluca.firebasestorage.app",
  messagingSenderId: "209172079851",
  appId: "1:209172079851:web:348a05a8b5d788f41e0aae",
  measurementId: "G-1R9X4X864X",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
