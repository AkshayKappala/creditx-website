
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

// Keep the global page background consistent during overscroll.
document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(<App />);
  