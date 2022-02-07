import { Button } from ".";

export default function DIDButton({ authenticate, DID }) {
  return (
    <Button
      className="wallet-button"
      onClick={() => {
        if (!DID) {
          authenticate();
        }
      }}
    >
      {!DID ? "Authenticate with 3ID" : `${DID.substring(0, 16)}...`}
    </Button>
  );
}
