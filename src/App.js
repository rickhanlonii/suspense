import * as React from "react";
import { useLayoutEffect, useState, useEffect, createContext } from "react";
import "./styles.css";
import * as Cases from "./Cases";
import { resetCache } from "./components";

export const StartContext = createContext(0);

export default function App() {
  const [mountId, setMountId] = useState(0);
  const [caseId, setCaseId] = useState(0);
  const [start, setStart] = useState(new Date().getTime());
  const AllCases = Object.keys(Cases);
  const caseName = Object.keys(Cases)[caseId];
  const Module = Cases[caseName];
  console.log(caseId, caseName);
  useEffect(() => {
    window.parent.postMessage(
      JSON.stringify({
        type: "case",
        name: caseName,
        hasNext: caseId < AllCases.length - 1,
        hasPrev: caseId > 0,
      }),
      window.location.host.indexOf("vercel") > 0
        ? "https://suspense-tester.vercel.app"
        : "http://localhost:3000",
    );
  }, [caseName]);
  useEffect(() => {
    const handleEvent = function ({ data }) {
      console.log("data", data);
      if (typeof data === "string" && data[0] === "{") {
        const messageData = JSON.parse(data);
        if (messageData.type === "toggle") {
          resetCache();
          setMountId((c) => c + 1);
        } else if (messageData.type === "prev") {
          resetCache();
          setMountId((c) => c + 1);
          setCaseId((c) => (c === 0 ? 0 : c - 1));
        } else if (messageData.type === "next") {
          resetCache();
          setMountId((c) => c + 1);
          setCaseId((c) =>
            c === AllCases.length - 1 ? AllCases.length - 1 : c + 1,
          );
        }
      }
    };
    window.addEventListener("message", handleEvent);
    return () => window.removeEventListener("message", handleEvent);
  }, []);

  useLayoutEffect(() => {
    setStart(new Date().getTime());
  }, [mountId]);
  return (
    <div key={caseId} className="p-10">
      <StartContext.Provider value={start}>
        <div className="border-gray-200 border rounded p-2 pb-1" key={mountId}>
          <Module start={start} />
        </div>
      </StartContext.Provider>
    </div>
  );
}
