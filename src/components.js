import { Suspense, useLayoutEffect, useState } from "react";
import * as React from "react";

const cache = new Map();

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

export function Await({ id, ms, start, children }) {
  const [end, setEnd] = useState(0);
  useLayoutEffect(() => {
    setEnd(new Date().getTime());
  }, []);
  suspend(id, ms);

  return (
    <div className="flex min-w-48 bg-wash-dark text-primary-dark flex-col min-h-24 border border-solid border-gray-70 rounded pb-1 p-2 mb-1">
      <span>Resolved after {ms}ms</span>
      {start && <span> Took {end - start} ms</span>}
      <div>{children}</div>
    </div>
  );
}

export function Fallback() {
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
  return (
    <div className="bg-red-30 pb-1 p-1 rounded">
      <span className="text-primary-dark">Boundary</span>
      <Suspense fallback={fallback}>{children}</Suspense>
    </div>
  );
}
