import React from "react";
import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Lesson from "./pages/Lesson";
import useWeb3Modal from "./hooks/useWeb3Modal";

import { addresses, abis } from "@project/contracts";
import GET_TRANSFERS from "./graphql/subgraph";
import LandingPage from "./components/LandingPage";
import ColumnsSections from "./components/ColumnsSections";
import Header from "./components/Header";
import Cta from "./components/Cta";

async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = getDefaultProvider();
  // Create an instance of an ethers.js Contract
  // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
  const ceaErc20 = new Contract(
    addresses.ceaErc20,
    abis.erc20,
    defaultProvider
  );
  // A pre-defined address that owns some CEAERC20 tokens
  const tokenBalance = await ceaErc20.balanceOf(
    "0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C"
  );
  console.log({ tokenBalance: tokenBalance.toString() });
}

function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, error, data]);

  return (
    <Router>
      <div>
        <Header />
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/lesson">
            <Lesson />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
  // <div>
  //   <Header
  //     provider={provider}
  //     loadWeb3Modal={loadWeb3Modal}
  //     logoutOfWeb3Modal={logoutOfWeb3Modal}
  //   />
  //   <Body>
  //     <ColumnsSections />
  //   </Body>
  // </div>
}

export default App;
