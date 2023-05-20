pragma solidity ^0.8.9;

contract MessageVoting {
    mapping(bytes32 => int) public voteCount;

    function upvote(string memory _messageId, int _voteCount) public {
        bytes32 messageIdHash = keccak256(abi.encodePacked(_messageId));
        voteCount[messageIdHash] += _voteCount;
    }

    function downvote(string memory _messageId, int _voteCount) public {
        bytes32 messageIdHash = keccak256(abi.encodePacked(_messageId));
        voteCount[messageIdHash] -= _voteCount;
    }

    function getMessageById(
        string memory _messageId
    ) public view returns (int) {
        bytes32 messageIdHash = keccak256(abi.encodePacked(_messageId));
        return voteCount[messageIdHash];
    }
}
