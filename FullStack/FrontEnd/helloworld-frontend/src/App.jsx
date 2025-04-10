import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/messages')
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  return (
    <div>
      <h1>Messages from MySQL Database</h1>
      <ul>
        {messages.length > 0 ? messages.map(message => (
          <li key={message.id}>{message.text}</li>
        )) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
}
export default App;
