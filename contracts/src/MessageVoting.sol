pragma solidity ^0.8.9;

contract MessageVoting {
    struct Message {
        string content;
        uint256 votes;
        string messageId;
    }

    Message[] public messages;

    function postMessage(string memory _content, string memory _messageId) public {
        Message memory newMessage = Message({
            content: _content,
            votes: 0,
            messageId: _messageId
        });
        messages.push(newMessage);
    }

    function upvote(string memory _messageId) public {
        uint256 messageIndex = _findMessageIndex(_messageId);
        messages[messageIndex].votes++;
    }

    function downvote(string memory _messageId) public {
        uint256 messageIndex = _findMessageIndex(_messageId);
        messages[messageIndex].votes--;
    }

    function getMessageById(string memory _messageId) public view returns (Message memory) {
        uint256 messageIndex = _findMessageIndex(_messageId);
        return messages[messageIndex];
    }

    function getSortedMessagesByVotes() public view returns (Message[] memory) {
        uint256 length = messages.length;
        Message[] memory sortedMessages = new Message[](length);
        for (uint256 i = 0; i < length; i++) {
            sortedMessages[i] = messages[i];
        }

        for (uint256 i = 0; i < length - 1; i++) {
            for (uint256 j = 0; j < length - i - 1; j++) {
                if (sortedMessages[j].votes < sortedMessages[j + 1].votes) {
                    Message memory temp = sortedMessages[j];
                    sortedMessages[j] = sortedMessages[j + 1];
                    sortedMessages[j + 1] = temp;
                }
            }
        }

        return sortedMessages;
    }

    function _findMessageIndex(string memory _messageId) private view returns (uint256) {
        bytes32 messageIdHash = keccak256(abi.encodePacked(_messageId));
        for (uint256 i = 0; i < messages.length; i++) {
            if (keccak256(abi.encodePacked(messages[i].messageId)) == messageIdHash) {
                return i;
            }
        }
        revert("Message not found");
    }
}
