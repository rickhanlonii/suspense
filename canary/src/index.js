import * as ReactDOM from "react-dom";

import App from "./other-src/App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);

window.addEventListener("message", ({ data }) => {
  if (typeof data === "string" && data[0] === "{") {
    console.log("data", data);
    const messageData = JSON.parse(data);
    if (messageData.type === "throttle") {
      window.FALLBACK_THROTTLE_MS = parseInt(messageData.value, 10);
    } else if (messageData.type === "revert") {
      window.REVERT_SIBLING_RENDER = !!messageData.value;
    }
  }
});
