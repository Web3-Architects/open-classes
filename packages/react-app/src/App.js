import React from "react";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Lesson from "./pages/Lesson";

import { addresses, abis } from "@project/contracts";
import Header from "./components/Header";
import useWeb3Modal from "./hooks/useWeb3Modal";
import use3ID from "./hooks/use3ID";

async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  // A Web3Provider wraps a standard Web3 provider, which is
  // what Metamask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // Create an instance of an ethers.js Contract
  // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
  console.log("abi", abis.randomNumberConsumer);
  const RandomNumberConsumer = new Contract(
    addresses.rinkeby,
    abis.randomNumberConsumer.abi,
    provider
  );

  const address = RandomNumberConsumer.address;
  console.log({ address: address.toString() });
}

function App() {
  const { address } = useWeb3Modal();
  console.log("address App", address);
  const { authenticate, DID } = use3ID();
  return (
    <Router>
      <div>
        {/* <button onClick={() => readOnChainData()}>Read On-Chain Balance</button> */}

        <Header authenticate={authenticate} DID={DID} />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/lesson">
            <Lesson DID={DID} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
