import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.ts";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAoyC08R7sI61a1-xvOO8uG3ffjdf2OztE",
  authDomain: "porfolio-delux.firebaseapp.com",
  projectId: "porfolio-delux",
  storageBucket: "porfolio-delux.firebasestorage.app",
  messagingSenderId: "972723532696",
  appId: "1:972723532696:web:56c6e0b0f62c51af1df1ed",
  measurementId: "G-052CCNCJTB",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
