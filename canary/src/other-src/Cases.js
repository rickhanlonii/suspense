import { Await, Boundary, Fallback } from "./components";
import * as React from "react";

export const SingleBoundaryInstant = ({ start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id="parent" ms={100} />
    </Boundary>
  );
};

export const SingleBoundary100ms = ({ start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id="parent" ms={100} />
    </Boundary>
  );
};

export const ManyNestedBoundaries = ({ start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id="parent" ms={100}>
        <Await id="child" ms={100}>
          <Await id="child1" ms={100}>
            <Boundary fallback={<Fallback />}>
              <Await id="child2" ms={300}>
                <Await id="child3" ms={100}>
                  <Await id="child4" ms={100}>
                    <Await id="child5" ms={100}>
                      <Await id="child6" ms={800}>
                        <Boundary fallback={<Fallback />}>
                          <Await id="child7" ms={400} start={start}></Await>
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

export const ManyMixedBoundaries = ({ start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id="parent" ms={0}>
        <Await id="child" ms={100}>
          <Await id="child1" ms={100}></Await>
        </Await>
      </Await>
      <Boundary fallback={<Fallback />}>
        <Await id="child8" ms={1000}>
          <Await id="child9" ms={600}>
            <Await id="child10" ms={50}>
              <Boundary fallback={<Fallback />}>
                <Await id="child11" ms={500} start={start}></Await>
              </Boundary>
            </Await>
          </Await>
        </Await>
      </Boundary>
      <Boundary fallback={<Fallback />}>
        <Await id="child2" ms={300}>
          <Await id="child5" ms={100}>
            <Await id="child6" ms={800}>
              <Boundary fallback={<Fallback />}>
                <Await id="child7" ms={400} start={start}></Await>
              </Boundary>
            </Await>
          </Await>
        </Await>
      </Boundary>
    </Boundary>
  );
};

export const BetterCase = ({ start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id="child1" ms={600}>
        <Boundary fallback={<Fallback />}>
          <Await id="child2" ms={200}>
            <Boundary fallback={<Fallback />}>
              <Await id="child3" ms={600}>
                <Boundary fallback={<Fallback />}>
                  <Await id="child4" ms={50} start={start}></Await>
                </Boundary>
              </Await>
            </Boundary>
          </Await>
        </Boundary>
        <Boundary fallback={<Fallback />}>
          <Await id="child9" ms={50}>
            <Boundary fallback={<Fallback />}>
              <Await id="child10" ms={500}>
                <Boundary fallback={<Fallback />}>
                  <Await id="child11" ms={50} start={start}></Await>
                </Boundary>
              </Await>
            </Boundary>
          </Await>
        </Boundary>
      </Await>
    </Boundary>
  );
};

export const WorstCase = ({ start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id="child1" ms={0}>
        <Boundary fallback={<Fallback />}>
          <Await id="child8" ms={301} start={start}></Await>
        </Boundary>
        <Await id="child9" ms={100} start={start}></Await>
      </Await>
    </Boundary>
  );
};

export const Sibling = ({ start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id="child1" ms={400}>
        <Boundary fallback={<Fallback />}>
          <Await id="child8" ms={100} start={start}></Await>
        </Boundary>
        <Await id="child9" ms={100} start={start}></Await>
      </Await>
    </Boundary>
  );
};

export const SiblingWithBoundary = ({ start }) => {
  return (
    <Boundary fallback={<Fallback />}>
      <Await id="parent" ms={0} />
      <Boundary fallback={<Fallback />}>
        <Await id="sibling" ms={3000} />
      </Boundary>
    </Boundary>
  );
};
