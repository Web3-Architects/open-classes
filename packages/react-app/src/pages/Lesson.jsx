import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const codeExample = `const { providers } = require('ethers');

const provider = new providers.Web3Provider(ganacheProvider);
`;

export default function Example() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <>
      {/* Background color split screen for large screens */}
      <div className="relative min-h-screen flex flex-col">
        {/* 3 column wrapper */}
        <div className="flex-grow w-full max-w-full  mx-auto xl:px-5 lg:flex">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 min-w-0 bg-white xl:flex">
            <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-4/12 xl:border-r xl:border-gray-200 bg-white">
              <div className="h-full pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0 overflow-y-auto">
                {/* Start left column area */}
                <div className="h-full relative" style={{ minHeight: "12rem" }}>
                  <div className="absolute inset-0 border-2 border-gray-200 border-dashed rounded-lg p-5">
                    <h2 className="text-4xl mb-4">Lesson 1</h2>
                    <p className="text-xl font-bold mb-10">
                      Querying events with ethers.js
                    </p>
                    <p className="text-xl mb-4">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Molestias sit non iure quasi esse in mollitia magnam quos
                      aliquid quas, assumenda quidem ea illo consequatur rerum
                      labore temporibus necessitatibus amet!
                    </p>
                    <pre>
                      <code class="language-solidity">
                        {`const {providers} = require('ethers'); 
                        const provider = new 
                        providers.Web3Provider(ganacheProvider); `}
                      </code>
                    </pre>

                    <p className="text-xl mb-4">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit
                      cum quisquam consequuntur animi culpa.
                    </p>
                    <p className="text-xl mb-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Modi incidunt accusantium et minus suscipit aut dolorem
                      aliquid cum? Ratione totam cupiditate ea adipisci corporis
                      in architecto rem illo ab mollitia!
                    </p>
                  </div>
                </div>
                {/* End left column area */}
              </div>
            </div>

            <div className="bg-white lg:min-w-0 lg:flex-1">
              <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                {/* Start main area*/}
                <div className="relative h-full" style={{ minHeight: "36rem" }}>
                  <div className="absolute inset-0 border-2 border-gray-200 border-dashed rounded-lg">
                    <iframe
                      title="CodeSandbox"
                      src="https://codesandbox.io/embed/new?codemirror=1&highlights=6,7,8,9"
                      style={{
                        width: "100%",
                        height: "100%",
                        border: 0,
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                      view="split"
                      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                    ></iframe>
                  </div>
                </div>
                {/* End main area */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
