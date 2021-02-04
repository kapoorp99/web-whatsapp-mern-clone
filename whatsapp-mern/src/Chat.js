import React from 'react';
import './Chat.css';
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import { Avatar, IconButton } from "@material-ui/core";
import AttachFile from "@material-ui/icons/AttachFile";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import MoreVert from "@material-ui/icons/MoreVert";
import { useState } from 'react';
import axios from "./axios"

function Chat({messages}) {

    const [input,setInput] = useState("");

    const sendMessage = async (e)=>{
        e.preventDefault();
        await axios.post('/messages/new/',{
            "message":input,
            "name":"DEMO APP",
            "timestamp": "Just now",
            "received":false,
        });
        setInput('');
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h2>Room Name</h2>
                    <p>Last seen at ......</p>
                </div>
                <div className="chat__headerRight">
                   <IconButton>
                       <SearchOutlined />
                   </IconButton>
                   <IconButton>
                       <AttachFile />
                   </IconButton>
                   <IconButton>
                       <MoreVert />
                    </IconButton> 
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => {
                    return (
                    <p className={`chat__message ${message.received && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                        {message.message}
                    <span className="chat__timestamp">
                    {message.timestamp}
                    </span>
                    </p>
                    )
                })}
            </div>


            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input placeholder="Type a message" type="text" value={input} onChange={e => setInput(e.target.value)} />
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
