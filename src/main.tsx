import { createRoot } from "react-dom/client";
import { HistoricalDates } from "./HistoricalDates/HistoricalDates";

import "./reset.css";
import "./tokens.css";
import "./global.css";

import highlights from "./highlights.json";

function App() {
  return <HistoricalDates highlights={highlights} />;
}

const container = document.getElementById("root");

if (container !== null) {
  const root = createRoot(container);
  root.render(<App />);
}
