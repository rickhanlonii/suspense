import { createRoot } from "react-dom";

import App from "./other-src/App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
