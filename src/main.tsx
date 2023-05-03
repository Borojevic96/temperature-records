import ReactDOM from "react-dom/client";
import { store } from "./store";
import { Provider } from "react-redux";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
