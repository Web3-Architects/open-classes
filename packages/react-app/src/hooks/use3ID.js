import { useEffect } from 'react';
import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect';
import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { IDX } from '@ceramicstudio/idx';
import { DID } from 'dids';

const ceramicProvider = CeramicClient.default ? CeramicClient.default : CeramicClient;
// const threeIdProvider = ThreeIdResolver.default ? ThreeIdResolver.default : ThreeIdResolver;


const use3ID = () => {

  const requestAddress = async () => {
    const addresses = await window.ethereum.enable();
    const threeIdConnect = new ThreeIdConnect();
    const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0]);
    await threeIdConnect.connect(authProvider);
    const provider = await threeIdConnect.getDidProvider();

    const ceramic = new ceramicProvider("https://ceramic-clay.3boxlabs.com");

    ceramic.did.setProvider(provider);

   const auth = await ceramic.did.authenticate()

    console.log('auth', auth);
  }
  
  useEffect(() => {
    requestAddress();
  }, [])
}

export default use3ID;