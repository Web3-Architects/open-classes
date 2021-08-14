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
                      If a smart contract emits an event with one or several indexed arguments, it's possible to filter logs to
                      retrieve events that only match these arguments. Here's how to do it with ethers.
                    </p>
                    <p className="text-xl mb-4">
                     We first create an EventFilter:
                    </p>
                    <pre>
                      <code class="language-javascript">
                        {`const eventFilter = {
  address: "0x57b...",
  topics,
  fromBlock: 9109186,
  toBlock: "latest",
}`}
                      </code>
                    </pre>

                    <p className="text-xl mb-4">
                      In it, we specify the target contract's address and the range of blocks to query,
                      often we want to query up to the latest block but I recommend adjusting the fromBlock
                      value. For example, it can be a few blocks before the one that included the contract creation.
                      <br/><br/>But where do <i>topics</i> come from? Ethers provides a convenient way to match the topics we want.
                      Here's an example, for a standard ERC-20 Transfer event:
                    </p>
                    <pre>
                      <code class="language-javascript">
                        {`// Topics for all token transfers *from* myAddress *to* otherAddress:
const topics = contract.filters.Transfer(myAddress, otherAddress)?.topics;`}
                      </code>
                    </pre>
                    <p className="text-xl mb-4">
                      For more examples and an explanation about what topics are, please visit <u><a href="https://docs.ethers.io/v5/concepts/events/#events--filters">this section of ethers' docs</a></u>
                      <br/><br/>
                      By passing our event filter we can now get the logs we're looking for:
                    </p>
                     <pre>
                      <code class="language-javascript">
                        {`let logs;
 try {
    logs = await provider.getLogs(eventFilter);
  } catch (err) {
    console.error(\`Error getting logs:\`, err);
  }`}
                      </code>
                    </pre>
                    <br/>
                    <p className="text-xl mb-4">
                      Now, if we want to get the values of the input parameters of the events,
                      we need to parse these logs. For that, we can use <i>interface.parseLogs</i>,
                      a method available on a contract interface.
                    </p>
                     <pre>
                      <code class="language-javascript">
                        {`// Instantiate the contract interface from its abi
const Interface = new ethers.utils.Interface(abi);

// Parse the logs
const parsedLogs = logs.map((log) => contractInterface.parseLog(log));
// Print the parsed logs
parsedLogs.forEach(parsedLog => console.log(parsedLog));`}
                      </code>
                    </pre>
                    <p className="text-xl mb-4">
                    Finally you should see the values emitted with the events in the <i>args</i> property of a parsed log!
                    </p>
                     <p className="text-xl font-bold mb-10">
                      Challenge
                    </p>
                    <p className="text-xl mb-4">We already deployed a smart contract that will emit an event with a random number and the ethereum address you
                      are connected with. This event has the following signature, where <i>to</i> is your address:
                    </p>
                     <pre>
                      <code class="language-javascript">
                        {`event RandomNumberReceived(address indexed to, uint256 indexed randomNumber);`}
                      </code>
                    </pre>
                    <p className="text-xl mb-4">
                      The goal for you is to find out what that random number is! And for that, you will have to retrieve the events from that contract, filtered by your address. 
                    </p>
                      <ol className="list-decimal mx-4">
                        <li>Make sure you are connected with an Ethereum account which has some Rinkeby ETH</li>
                        <li>Click on "Emit event"</li>
                        <li>Confirm the transaction</li>
                        <li>Complete the code in the CodeSandbox to the right to print the value of the random number in the sandbox's console</li>
                        <li>Finally, submit the number and confirm the transaction to validate this challenge and get your credentials!</li>
                      </ol>
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
                      src="https://codesandbox.io/embed/ethers-events-query-forked-ixsmu?fontsize=14&hidenavigation=1&theme=dark"
                      // style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
                      style={{
                        width: "100%",
                        height: "100%",
                        border: 0,
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                      title="ethers-test (forked)"
                      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
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
