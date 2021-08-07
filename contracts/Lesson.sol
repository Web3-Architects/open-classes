//SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

// create a mew contract that juste gets the random number ?
contract Lesson is VRFConsumerBase {
    //event SetPurpose(address sender, string purpose);
    uint256 private constant REQUEST_IN_PROGRESS = 42;

    bytes32 private s_keyHash;
    uint256 private s_fee;

    event RNRequested(bytes32 indexed requestId, address indexed user);
    event RNReceived(bytes32 indexed requestId, uint256 indexed result);

    // stores a mapping between the requestID (returned when a request is made), and the address of the user.
    // This is so the contract can keep track of who to assign the result to when it comes back.
    mapping(bytes32 => address) private s_users;
    // stores the user, and the result of the random number
    mapping(address => uint256) private s_results;

    /**
     * @notice Constructor inherits VRFConsumerBase
     *
     * @dev NETWORK: KOVAN
     * @dev   Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * @dev   LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * @dev   Key Hash:   0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     * @dev   Fee:        0.1 LINK (100000000000000000)
     *
     * @param vrfCoordinator address of the VRF Coordinator
     * @param link address of the LINK token
     * @param keyHash bytes32 representing the hash of the VRF job
     * @param fee uint256 fee to pay the VRF oracle
     */

    constructor(
        address vrfCoordinator,
        address link,
        bytes32 keyHash,
        uint256 fee
    )
        public
        VRFConsumerBase(
            vrfCoordinator,
            link // link Token
        )
    {
        s_keyHash = keyHash;
        s_fee = fee;
    }

    // function hashSeriesNumber(string calldata series, uint256 number) external pure returns (bytes32) {
    //     return keccak256(abi.encode(number, series));
    // }

    function requestRandom(address user) public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= s_fee, "Not enough LINK to pay fee");
        require(s_results[user] == 0, "Already requested");
        requestId = requestRandomness(s_keyHash, s_fee);
        s_users[requestId] = user;
        s_results[user] = REQUEST_IN_PROGRESS;
        emit RNRequested(requestId, user);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        s_results[s_users[requestId]] = randomness;
        emit RNReceived(requestId, randomness);
    }

    function validateChallenge(address user, uint256 randomNumber) public returns (bool) {
        require(s_results[user] != 0, "No result");
        require(s_results[user] != REQUEST_IN_PROGRESS, "Request in progress");
        return s_results[user] == randomNumber;
    }
}
