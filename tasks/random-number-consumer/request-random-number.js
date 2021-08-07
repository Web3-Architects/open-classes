task(
  "request-random-number",
  "Requests a random number for a Chainlink VRF enabled smart contract"
)
  .addParam(
    "contract",
    "The address of the API Consumer contract that you want to call"
  )
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract;
    const networkId = network.name;
    console.log(
      "Requesting a random number using VRF consumer contract ",
      contractAddr,
      " on network ",
      networkId
    );
    const RandomNumberConsumer = await ethers.getContractFactory(
      "RandomNumberConsumer"
    );

    //Get signer information
    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];

    //Create connection to VRF Contract and call the requestRandom function
    const vrfConsumerContract = new ethers.Contract(
      contractAddr,
      RandomNumberConsumer.interface,
      signer
    );
    var result = await vrfConsumerContract.requestRandom(
      "0x04200D9D7504817EEFe51F4a5b2A44f26604dCCe"
    );
    console.log(
      "Contract ",
      contractAddr,
      " random number request successfully called. Transaction Hash: ",
      result.hash
    );
    console.log("Run the following to read the returned random number:");
    console.log(
      "npx hardhat read-random-number --contract " +
        contractAddr +
        " --network " +
        network.name
    );
  });

module.exports = {};
