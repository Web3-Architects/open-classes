import { useState } from "react";
import { ThreeIdConnect, EthereumAuthProvider } from "@3id/connect";
import CeramicClient from "@ceramicnetwork/http-client";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import { DID } from "dids";
// import { IDX } from '@ceramicstudio/idx';

const ceramicProvider = CeramicClient.default
  ? CeramicClient.default
  : CeramicClient;
// const threeIdProvider = ThreeIdResolver.default
//   ? ThreeIdResolver.default
//   : ThreeIdResolver;

const ceramic = new ceramicProvider("https://ceramic-clay.3boxlabs.com");

const resolver = ThreeIdResolver.getResolver(ceramic);
const did = new DID({ resolver });

ceramic.did = did;

const use3ID = () => {
  const [DID, setDID] = useState(null);
  const authenticate = async () => {
    const addresses = await window.ethereum.enable();
    const threeIdConnect = new ThreeIdConnect();
    const authProvider = new EthereumAuthProvider(
      window.ethereum,
      addresses[0]
    );
    await threeIdConnect.connect(authProvider);
    const provider = await threeIdConnect.getDidProvider();

    if (!ceramic.did.authenticated) {
      ceramic.did.setProvider(provider);
      const auth = await ceramic.did.authenticate();

      console.log("authenticated with 3ID: ", auth);
      setDID(ceramic.did.id);
    }
  };

  return { authenticate, DID };
};

export default use3ID;
