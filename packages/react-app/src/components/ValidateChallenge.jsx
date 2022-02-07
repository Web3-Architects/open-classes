import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { addresses, abis } from "@project/contracts";

import useWeb3Modal from "../hooks/useWeb3Modal";

const CHALLENGE_CONTRACT_ADDRESS_RINKEBY = addresses.rinkeby;

const ValidateChallenge = ({ DID }) => {
  const { address, signer } = useWeb3Modal();
  const [challengeContract, setChallengeContract] = useState(null);

  useEffect(() => {
    if (!signer) return;
    const contract = new ethers.Contract(
      CHALLENGE_CONTRACT_ADDRESS_RINKEBY,
      abis.randomNumberConsumer.abi,
      signer
    );
    setChallengeContract(contract);
  }, [signer]);

  const callToValidateChallenge = useCallback(
    async ({ randomNumber }) => {
      console.log("in validate");
      await challengeContract.validateChallenge(randomNumber, DID);
    },
    [challengeContract, DID]
  );

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      let randomNumber = e.target.elements.randomNumber?.value;
      if (!challengeContract) {
        console.error("Error: contract is not instantiated");
      }
      console.log(`DID`, DID);
      if (DID) {
        callToValidateChallenge({ randomNumber });
      } else {
        alert("Please login with 3ID");
      }
    },
    [DID, callToValidateChallenge, challengeContract]
  );

  const callToEmitEvent = useCallback(async () => {
    if (!challengeContract) {
      console.error("Error: contract is not instantiated");
      return;
    }
    if (!signer || !address) {
      alert("You must be connected with your wallet first");
    }
    await challengeContract.requestRandom(address);
  }, [signer, challengeContract, address]);

  return (
    <div className="h-28 my-6 flex flex-col items-center justify-center">
      <button
        type="button"
        className="shadow bg-yellow hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-black-300 font-bold mt-2 mb-8 py-2 px-4 mx-auto rounded"
        onClick={callToEmitEvent}
      >
        EMIT EVENT
      </button>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div
          className={`w-96 mb-4 border transition duration-150 ease-in-out focus-within:border-primary border-gray-500`}
        >
          <label
            htmlFor="validate"
            className={`text-xs text-primary font-light placeholder-gray-gray4 px-2 pt-1.5`}
          >
            Random Number
          </label>
          <input
            type="text"
            className={`w-full px-2 pb-1.5 text-primary outline-none text-base font-light rounded-md`}
            id="randomNumber"
            placeholder={"28933480438792750..."}
          />
        </div>
        <button
          type="submit"
          className="shadow bg-yellow hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-black-300 font-bold py-2 px-4 mx-auto rounded"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default ValidateChallenge;
