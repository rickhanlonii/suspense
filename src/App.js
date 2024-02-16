import * as React from "react";
import { useLayoutEffect, useState, useEffect } from "react";
import "./styles.css";
import * as Cases from "./Cases";

import { Await, Fallback, Boundary } from "./components";

// export default function App() {
//   const [mountId, setMountId] = useState(0);
//   return (
//     <div className="p-10">
//       <button
//         className="mb-8 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 color-white py-1 px-2 rounded"
//         onClick={() => setMountId((m) => m + 1)}
//       >
//         Toggle
//       </button>
//       <div className="border-gray-200 border rounded p-2" key={mountId}>
//         <Suspense fallback={<Fallback />}>
//           <Await id={`parent-${mountId}`} ms={3000} />
//           <Suspense fallback={<Fallback />}>
//             <Await id={`sibling-${mountId}`} ms={0} />
//           </Suspense>
//         </Suspense>
//       </div>

//     </div>
//   );
// }

// export default function App() {
//   const [mountId, setMountId] = useState(0);
//   return (
//     <div className="p-10">
//       <button
//         className="mb-8 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 color-white py-1 px-2 rounded"
//         onClick={() => setMountId((m) => m + 1)}
//       >
//         Toggle
//       </button>
//       <div className="border-gray-200 border rounded p-2" key={mountId}>
//
//       </div>
//     </div>
//   );
// }

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
        ? "https://suspense-henna.vercel.app"
        : "https://localhost:3000",
    );
  }, [caseName]);
  useEffect(() => {
    const handleEvent = function ({ data }) {
      console.log("data", data);
      if (typeof data === "string" && data[0] === "{") {
        const messageData = JSON.parse(data);
        if (messageData.type === "toggle") {
          setMountId((c) => c + 1);
        } else if (messageData.type === "prev") {
          setMountId((c) => c + 1);
          setCaseId((c) => (c === 0 ? 0 : c - 1));
        } else if (messageData.type === "next") {
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
      <div className="border-gray-200 border rounded p-2 pb-1" key={mountId}>
        <Module mountId={`${mountId}-${caseId}`} start={start} />
      </div>
    </div>
  );
}
