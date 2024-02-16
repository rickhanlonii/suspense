import { createRoot } from "./lib/react-dom.development";

import App from "./other-src/App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
