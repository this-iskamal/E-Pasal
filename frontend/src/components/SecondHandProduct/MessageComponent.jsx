import React, { useEffect, useState, useRef } from "react";
import { Box, Text, Flex, Input, Button,Image } from "@chakra-ui/react";
import { useAuth } from "../../utils/JWT";
import server from "../../utils/server";
import axios from "axios";

function MessageComponent() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const currentUser = useAuth();
  const chatMessagesContainerRef = useRef(null);

  useEffect(() => {
    if (currentUser && currentUser.email) {
      axios
        .get(`${server}/get-user-contact/${currentUser.email}`)
        .then((res) => {
          setContacts(res.data.contacts);
        })
        .catch((error) => {
          console.error("Error fetching contacts:", error);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    // Polling interval (fetch messages every 5 seconds, for example)
    const interval = setInterval(() => {
      if (chatOpen && selectedContact) {
        axios
          .get(`${server}/messages/${selectedContact.email}/`)
          .then((res) => {
            setChatMessages(res.data.messages);
            // Scroll to the bottom when new messages arrive
            scrollToBottom();
          })
          .catch((error) => {
            console.error("Error fetching chat messages:", error);
          });
      }
    }, 2500); // Adjust the interval as needed (in milliseconds)

    return () => clearInterval(interval); // Cleanup the interval on component unmount

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatOpen, selectedContact]);

  useEffect(() => {
    // Scroll to the bottom when component mounts or when new messages arrive
    scrollToBottom();
  }, [chatMessages]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    

    // Fetch chat messages for the selected contact
    axios
      .get(`${server}/messages/${contact.email}/`)
      .then((res) => {
        setChatMessages(res.data.messages);
      })
      .catch((error) => {
        console.error("Error fetching chat messages:", error);
      });

    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async (email) => {
    try {
      const response = await axios.post(`${server}/${email}/send/`, {
        content: message,
      });

      console.log("Message sent successfully:", response.data);

      // Reset the message input after sending
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to scroll the chat messages container to the bottom
  const scrollToBottom = () => {
    if (chatMessagesContainerRef.current) {
      chatMessagesContainerRef.current.scrollTop =
        chatMessagesContainerRef.current.scrollHeight;
    }
  };

  return (
    <div
      className="bg-gray-200 p-1 relative"
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      {contacts.map((contact) => (
        <Box
          key={contact.id}
          p={2}
          mb={2}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          bg={
            selectedContact && selectedContact.id === contact.id
              ? "blue.100"
              : "white"
          }
          cursor="pointer"
          onClick={() => handleContactClick(contact)}
        >
          
          <Text fontSize="xl">{contact.username}</Text>
          <Text fontSize="sm">{contact.email}</Text>
        </Box>
      ))}

      {chatOpen && selectedContact && (
        <Flex
          position="fixed"
          top="0"
          right="0"
          p={4}
          bg="white"
          boxShadow="md"
          borderRadius="md"
          flexDirection="column"
          width="400px"
        >
          <Text fontSize="xl">{selectedContact.username}</Text>
          <Box
            ref={chatMessagesContainerRef}
            flex="1"
            minHeight="300px"
            maxHeight="400px"
            overflowY="auto"
            mt={2}
            p={2}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
          >
            {chatMessages.map((message) => (
              <Box
                key={message.id}
                p={1}
                mb={1}
                borderRadius="md"
                boxShadow="md"
                textAlign={message.sender === currentUser.id ? "right" : "left"}
                bg={
                  message.sender === currentUser.id ? "blue.100" : "green.100"
                }
              >
                <Text fontSize="sm" fontWeight="bold" mb={1}>
                  {message.sender === currentUser.id
                    ? "You"
                    : selectedContact.username}
                </Text>
                <Text fontSize="sm">{message.content}</Text>
              </Box>
            ))}
          </Box>
          <Flex mt={2}>
            <Input
              placeholder="Type a message..."
              onChange={handleInputChange}
              value={message}
            />
            <Button
              ml={2}
              colorScheme="blue"
              onClick={() => handleSend(selectedContact.email)}
            >
              Send
            </Button>
          </Flex>
          <Button mt={2} onClick={handleCloseChat} colorScheme="red">
            Close Chat
          </Button>
        </Flex>
      )}
    </div>
  );
}

export default MessageComponent;
