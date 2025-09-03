import { createRoot } from "react-dom/client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { HistoricalPeriods } from "./HistoricalPeriods";

import "./reset.css";
import "./tokens.css";
import "./global.css";

gsap.registerPlugin(useGSAP);

import highlights from "./highlights.json";

function App() {
  return <HistoricalPeriods periods={highlights} />;
}

const container = document.getElementById("root");

if (container !== null) {
  const root = createRoot(container);
  root.render(<App />);
}
