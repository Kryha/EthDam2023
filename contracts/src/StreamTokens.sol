pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract StreamTokens is ERC1155 {

    uint256 public constant CHITCHAT = 1;

    constructor() public ERC1155("") {
        _mint(msg.sender, CHITCHAT, 10**18, "");
    }
}
