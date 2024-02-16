import { Await, Boundary, Fallback } from "./components";
import * as React from "react";

export const Fallbacks = ({ mountId, start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Fallback />
    </Boundary>
  );
};

export const SingleBoundaryInstant = ({ mountId, start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id={`parent-${mountId}`} ms={100} />
    </Boundary>
  );
};

export const SingleBoundary100ms = ({ mountId, start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id={`parent-${mountId}`} ms={100} />
    </Boundary>
  );
};

export const ManyNestedBoundaries = ({ mountId, start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id={`parent-${mountId}`} ms={100}>
        <Await id={`child-${mountId}`} ms={100}>
          <Await id={`child1-${mountId}`} ms={100}>
            <Boundary fallback={<Fallback />}>
              <Await id={`child2-${mountId}`} ms={300}>
                <Await id={`child3-${mountId}`} ms={100}>
                  <Await id={`child4-${mountId}`} ms={100}>
                    <Await id={`child5-${mountId}`} ms={100}>
                      <Await id={`child6-${mountId}`} ms={800}>
                        <Boundary fallback={<Fallback />}>
                          <Await
                            id={`child7-${mountId}`}
                            ms={400}
                            start={start}
                          ></Await>
                        </Boundary>
                      </Await>
                    </Await>
                  </Await>
                </Await>
              </Await>
            </Boundary>
          </Await>
        </Await>
      </Await>
    </Boundary>
  );
};

export const ManyMixedBoundaries = ({ mountId, start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id={`parent-${mountId}`} ms={0}>
        <Await id={`child-${mountId}`} ms={100}>
          <Await id={`child1-${mountId}`} ms={100}></Await>
        </Await>
      </Await>
      <Boundary fallback={<Fallback />}>
        <Await id={`child8-${mountId}`} ms={1000}>
          <Await id={`child9-${mountId}`} ms={600}>
            <Await id={`child10-${mountId}`} ms={50}>
              <Boundary fallback={<Fallback />}>
                <Await id={`child11-${mountId}`} ms={500} start={start}></Await>
              </Boundary>
            </Await>
          </Await>
        </Await>
      </Boundary>
      <Boundary fallback={<Fallback />}>
        <Await id={`child2-${mountId}`} ms={300}>
          <Await id={`child5-${mountId}`} ms={100}>
            <Await id={`child6-${mountId}`} ms={800}>
              <Boundary fallback={<Fallback />}>
                <Await id={`child7-${mountId}`} ms={400} start={start}></Await>
              </Boundary>
            </Await>
          </Await>
        </Await>
      </Boundary>
    </Boundary>
  );
};

export const BetterCase = ({ mountId, start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id={`child1-${mountId}`} ms={600}>
        <Boundary fallback={<Fallback />}>
          <Await id={`child2-${mountId}`} ms={200}>
            <Boundary fallback={<Fallback />}>
              <Await id={`child3-${mountId}`} ms={600}>
                <Boundary fallback={<Fallback />}>
                  <Await id={`child4-${mountId}`} ms={50} start={start}></Await>
                </Boundary>
              </Await>
            </Boundary>
          </Await>
        </Boundary>
        <Boundary fallback={<Fallback />}>
          <Await id={`child9-${mountId}`} ms={50}>
            <Boundary fallback={<Fallback />}>
              <Await id={`child10-${mountId}`} ms={500}>
                <Boundary fallback={<Fallback />}>
                  <Await
                    id={`child11-${mountId}`}
                    ms={50}
                    start={start}
                  ></Await>
                </Boundary>
              </Await>
            </Boundary>
          </Await>
        </Boundary>
      </Await>
    </Boundary>
  );
};

export const Sibling = ({ mountId, start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id={`child1-${mountId}`} ms={400}>
        <Boundary fallback={<Fallback />}>
          <Await id={`child8-${mountId}`} ms={100} start={start}></Await>
        </Boundary>
        <Await id={`child9-${mountId}`} ms={100} start={start}></Await>
      </Await>
    </Boundary>
  );
};

export const SiblingWithBoundary = ({ mountId, start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id={`parent-${mountId}`} ms={0} />
      <Boundary fallback={<Fallback />}>
        <Await id={`sibling-${mountId}`} ms={3000} />
      </Boundary>
    </Boundary>
  );
};
