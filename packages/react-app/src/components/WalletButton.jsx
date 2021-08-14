import { Button } from ".";

export default function WalletButton({
  provider,
  loadWeb3Modal,
  logoutOfWeb3Modal,
}) {
  console.log("provider wallet", provider);
  return (
    <Button
      className="wallet-button"
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}
