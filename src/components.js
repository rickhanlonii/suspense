import { Suspense, useContext, useLayoutEffect, useRef, useState } from "react";
import * as React from "react";
import { StartContext } from "./App";

let cache = new Map();
export const resetCache = () => {
  cache = new Map();
};
function suspend(id, ms) {
  const record = cache.get(id);
  if (record) {
    if (record.status === "pending") {
      throw record.promise;
    }
    return record.value;
  }

  const newRecord = { status: "pending" };
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      newRecord.status = "resolved";
      resolve();
    }, ms);
  });

  newRecord.promise = promise;
  cache.set(id, newRecord);

  throw promise;
}

export function Await({ id, ms, children }) {
  const start = useContext(StartContext);
  const [end, setEnd] = useState(0);
  useLayoutEffect(() => {
    setEnd(new Date().getTime());
  }, []);
  suspend(id, ms);

  return (
    <div className="flex min-w-48 bg-wash-dark text-primary-dark flex-col min-h-24 border border-solid border-gray-70 rounded pb-1 p-2 mb-1">
      <div className="flex justify-between">
        <span>Suspend for {ms}ms</span>
        <span className="text-gray-600">Shown after {end - start} ms</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

export function Fallback({ onStart, onEnd }) {
  console.log("fallback");
  useLayoutEffect(() => {
    console.log("fb shown");
    onStart(new Date().getTime());

    return () => {
      console.log("fb hide");
      onEnd(new Date().getTime());
    };
  }, []);
  return (
    <div className="flex bg-wash-dark w-full flex-col h-auto border border-solid border-gray-70 rounded p-2">
      <div>
        <div
          className="bg-gradient-to-r relative
    before:absolute before:inset-0
    before:-translate-x-full
    before:animate-[shimmer_2s_infinite]
    before:bg-gradient-to-r
    before:from-transparent before:via-rose-100/10 before:to-transparent  isolate
    overflow-hidden
    shadow-xl shadow-black/5
    before:border-t before:border-rose-100/10"
        >
          <div className="flex flex-col">
            <span className="bg-gray-80 rounded h-4 w-1/3 mb-1"></span>
            <span className="bg-gray-80 rounded h-4 w-1/2 mb-1"></span>
            <span className="bg-gray-80 rounded h-4 w-2/3 mb-1"></span>
            <span className="bg-gray-80 rounded h-4 w-2/3"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Boundary({ fallback, children }) {
  const mountStart = useContext(StartContext);
  const start = useRef();
  if (!start.current) {
    start.current = new Date().getTime();
  }
  const [end, setEnd] = useState(new Date().getTime());
  const [fallbackStart, setFallbackStart] = useState(null);
  const [fallbackEnd, setFallbackEnd] = useState(null);
  useLayoutEffect(() => {
    setEnd(new Date().getTime());
  }, []);

  const fallbackShown = fallbackStart && fallbackStart > 0;
  const bgColor = fallbackShown ? "bg-red-30" : "bg-gray-600";
  const textColor = fallbackShown ? "text-primary-dark" : "text-primary-dark";
  return (
    <div className={`pb-1 p-1 mb-2 last:mb-0 rounded ${bgColor}`}>
      <div className="flex justify-between">
        <span className={textColor}>
          Boundary{" "}
          <span>
            {start.current
              ? `@ ${start.current - mountStart > 0 ? start.current - mountStart : 0}ms`
              : "not shown"}
          </span>
        </span>
        <div>
          <span className="text-gray-20 mr-2">
            {!fallbackShown && end - start.current > 10
              ? `Delay commit: ${end - start.current}ms`
              : ""}
          </span>
          <span className="text-gray-20 mr-2">
            {fallbackStart ? `Fallback @ ${fallbackStart - mountStart}ms` : ""}
          </span>

          <span className="text-gray-20">
            {fallbackEnd ? `${fallbackEnd - fallbackStart}ms` : ""}
          </span>
        </div>
      </div>
      <Suspense
        fallback={
          <Fallback
            onStart={(time) => setFallbackStart(time)}
            onEnd={(time) => setFallbackEnd(time)}
          />
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
