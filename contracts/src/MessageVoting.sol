pragma solidity ^0.8.9;

contract MessageVoting {
    mapping(bytes32 => int) public voteCount;

    function upvote(bytes32 _messageId, int _voteCount) public {
        voteCount[_messageId] += _voteCount;
    }

    function downvote(bytes32 _messageId, int _voteCount) public {
        voteCount[_messageId] -= _voteCount;
    }

    function getMessageById(bytes32 _messageId) public view returns (int) {
        return voteCount[_messageId];
    }
}
