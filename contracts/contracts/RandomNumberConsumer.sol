pragma solidity 0.6.6;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
contract RandomNumberConsumer is VRFConsumerBase {
 uint256 private constant REQUEST_IN_PROGRESS = 42;

    bytes32 private keyHash;
    uint256 private fee;
    uint256 public randomResult;

    event RandomNumberRequested(bytes32 indexed requestId, address indexed user);
    event RandomNumberReceived(bytes32 indexed requestId, uint256 indexed result);

    // stores a mapping between the requestID (returned when a request is made), and the address of the user.
    // This is so the contract can keep track of who to assign the result to when it comes back.
    mapping(bytes32 => address) private users;
    // stores the user, and the result of the random number
    mapping(address => uint256) public results;

    /**
     * @notice Constructor inherits VRFConsumerBase
     *
     * @dev NETWORK: Rinkeby
     * @dev   Chainlink VRF Coordinator address: 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
     * @dev   LINK token address:                0x01BE23585060835E02B77ef475b0Cc51aA1e0709
     * @dev   Key Hash:   0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311
     * @dev   Fee:        0.1 LINK (100000000000000000)
     *
     * @param vrfCoordinator address of the VRF Coordinator
     * @param link address of the LINK token
     * @param _keyHash bytes32 representing the hash of the VRF job
     * @param _fee uint256 fee to pay the VRF oracle
     */

    constructor(
        address vrfCoordinator,
        address link,
        bytes32 _keyHash,
        uint256 _fee
    )
        public
        VRFConsumerBase(
            vrfCoordinator,
            link // link Token
        )
    {
        keyHash = _keyHash;
        fee = _fee;
    }

    // function hashSeriesNumber(string calldata series, uint256 number) external pure returns (bytes32) {
    //     return keccak256(abi.encode(number, series));
    // }

    function requestRandom(address user) public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK to pay fee");
        require(results[user] == 0, "Already requested");
        requestId = requestRandomness(keyHash, fee);
        users[requestId] = user;
        results[user] = REQUEST_IN_PROGRESS;
        emit RandomNumberRequested(requestId, user);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        results[users[requestId]] = randomness;
        emit RandomNumberReceived(requestId, randomness);
    }

    function validateChallenge(uint256 randomNumber) public view returns (bool) {
        require(results[msg.sender] != 0, "No result");
        require(results[msg.sender] != REQUEST_IN_PROGRESS, "Request in progress");
        return results[msg.sender] == randomNumber;
    }

    /**
     * Withdraw LINK from this contract
     *
     * DO NOT USE THIS IN PRODUCTION AS IT CAN BE CALLED BY ANY ADDRESS.
     * THIS IS PURELY FOR EXAMPLE PURPOSES.
     */
    function withdrawLink() external {
        require(LINK.transfer(msg.sender, LINK.balanceOf(address(this))), "Unable to transfer");
    }
}
