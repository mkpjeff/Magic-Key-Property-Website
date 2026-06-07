import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

// When the frontend is hosted on a different origin than the API (e.g. the
// frontend on Vercel and the API on Replit), set VITE_API_BASE_URL to the
// API's absolute origin so requests reach it instead of the frontend host.
// On Replit (frontend + API share one origin via the proxy) leave it unset —
// requests then use relative /api paths.
const apiBaseUrl = (import.meta.env as Record<string, string | undefined>)
  .VITE_API_BASE_URL;
if (apiBaseUrl) {
  setBaseUrl(apiBaseUrl);
}

createRoot(document.getElementById("root")!).render(<App />);
