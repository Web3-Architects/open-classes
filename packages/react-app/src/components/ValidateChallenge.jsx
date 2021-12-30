import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { abis } from "@project/contracts";

import useWeb3Modal from "../hooks/useWeb3Modal";

const CHALLENGE_CONTRACT_ADDRESS = "0x34BaB47Ce1ce166C20cC19a3Db98dc16518E13da";

const ValidateChallenge = () => {
  const { address, signer } = useWeb3Modal();
  const [challengeContract, setChallengeContract] = useState(null);

  useEffect(() => {
    if (!signer) return;
    const contract = new ethers.Contract(
      CHALLENGE_CONTRACT_ADDRESS,
      abis.randomNumberConsumer.abi,
      signer
    );
    setChallengeContract(contract);
  }, [signer]);

  const callToValidateChallenge = useCallback(
    async ({ randomNumber }) => {
      // TODO: pass DID subject generated from 3ID Connect
      const DIDSubject = "did:subject";
      await challengeContract.validateChallenge(randomNumber, DIDSubject);
    },
    [challengeContract]
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let randomNumber = e.target.elements.randomNumber?.value;

    callToValidateChallenge({ randomNumber });
  };

  const callToEmitEvent = useCallback(async () => {
    if (!signer || !challengeContract || !address) {
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
          type="button"
          className="shadow bg-yellow hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-black-300 font-bold py-2 px-4 mx-auto rounded"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default ValidateChallenge;
