pragma solidity ^0.8.9;

contract MessageVoting {
    mapping(string => int) public voteCount;

    function upvote(string memory _messageId, int _voteCount) public {
        voteCount[_messageId] += _voteCount;
    }

    function downvote(string memory _messageId, int _voteCount) public {
        voteCount[_messageId] -= _voteCount;
    }

    function getMessageById(
        string memory _messageId
    ) public view returns (int) {
        return voteCount[_messageId];
    }
}
