import { useCallback, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = "d1c1e52469374514bedf6eb06e24f3ea";

const NETWORK_NAME = "mainnet";

function useWeb3Modal(config = {}) {
  const [provider, setProvider] = useState();
  const [address, setAddress] = useState();
  const [network, setNetwork] = useState();
  const [autoLoaded, setAutoLoaded] = useState(false);
  const {
    autoLoad = true,
    infuraId = INFURA_ID,
    NETWORK = NETWORK_NAME,
  } = config;

  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  const web3Modal = new Web3Modal({
    network: NETWORK,
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId,
        },
      },
    },
  });

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    const web3Provider = new providers.Web3Provider(newProvider);
    console.log("web3Provider", web3Provider);

    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    setAddress(address);

    const network = await web3Provider.getNetwork();
    setNetwork(network);
    console.log("network", network);
    setProvider(new Web3Provider(newProvider));
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(
    async function() {
      await web3Modal.clearCachedProvider();
      window.location.reload();
    },
    [web3Modal]
  );

  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }
  }, [
    autoLoad,
    autoLoaded,
    loadWeb3Modal,
    setAutoLoaded,
    web3Modal.cachedProvider,
  ]);
  return { provider, loadWeb3Modal, logoutOfWeb3Modal, address, network };
}

export default useWeb3Modal;
