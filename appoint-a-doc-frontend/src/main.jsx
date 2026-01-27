import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppContextProvider from "./services/context/AppContext.jsx";
import { BrowserRouter } from "react-router-dom";
// import { StrictMode } from "react";
// import { store } from "./services/store/store.js";
// import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
  <AppContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContextProvider>,
  // </Provider>
);
