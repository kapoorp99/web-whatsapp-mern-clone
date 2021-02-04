import React, { useEffect,useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';


function App() {

  const [messages,setMessages] = useState([]);

  useEffect(()=>{
    axios.get('/messages/sync')
    .then(response=>{
      setMessages(response.data);
    })
  },[]);


  useEffect(()=>{
    const pusher = new Pusher('740bb1331b43980037b6', {
      cluster: 'ap2'
    });


    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages,newMessage]);
    });
    console.log(messages);
    return () => {
      channel.unsubscribe();
      channel.unbind_all();
    };
  }, [messages]);


  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
