pragma solidity ^0.8.9;

contract MessageVoting {
    struct Message {
        string content;
        uint256 votes;
    }

    Message[] public messages;

    function postMessage(string memory _content) public {
        Message memory newMessage = Message({
            content: _content,
            votes: 0
        });
        messages.push(newMessage);
    }

    function upvote(uint256 _messageIndex) public {
        require(_messageIndex < messages.length, "Invalid message index");
        messages[_messageIndex].votes++;
    }

    function downvote(uint256 _messageIndex) public {
        require(_messageIndex < messages.length, "Invalid message index");
        messages[_messageIndex].votes--;
    }

    function getMessagesByVotes() public view returns (Message[] memory) {
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
}
