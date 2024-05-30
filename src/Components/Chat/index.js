import React, { Component, createRef } from 'react';
import {TailSpin} from "react-loader-spinner"

class Chat extends Component {
  state = {
    ws: null,
    messages: [],
    inp: "",
    loading: false 
  };

  messageListRef = createRef(); // Ref for the message list container

  inpChange = (e) => {
    this.setState({ inp: e.target.value });
  }

  componentDidMount() {
    const ws = new WebSocket('wss://rt-ws.abhiramreddy.shop');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');

      ws.send(JSON.stringify({ type: 'history' }));
      this.setState({ loading: true });
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'history') {
        
        this.setState({ messages: message.data, loading: false });
      } else {
        
        this.setState(prevState => ({
          messages: [...prevState.messages, message]
        }), this.scrollToBottom); 
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    this.setState({ ws });
    this.scrollToBottom()
  }

  sendMessage = (text) => {
    const { ws } = this.state;
    const name = localStorage.getItem('chatUserName') || 'User';

    const message = { name, text };

    if (ws && ws.readyState === WebSocket.OPEN) {
        this.setState({ loading: true });
      ws.send(JSON.stringify(message));
    }
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    if (this.messageListRef.current) {
      this.messageListRef.current.scrollTop = this.messageListRef.current.scrollHeight;
    }
  };

  render() {
    const { messages, inp ,loading} = this.state;

    return (
      <div className="w-screen h-screen bg-zinc-800 flex flex-row items-center justify-center font-['Poppins']">
        <div className='max-w-full max-h-full flex flex-col items-center justify-center'>
          <img className='w-56' src='https://res.cloudinary.com/dbs6hvga4/image/upload/v1713625410/svgviewer-png-output_5_k1azha.png'/>
          {loading?<div ref={this.messageListRef} className="min-h-80 mt-8 w-96 flex flex-row justify-center items-center border border-gray-300 rounded-md p-4">
          <TailSpin 
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
          </div>:
          <div ref={this.messageListRef}   className="max-h-80 mt-8 w-96 overflow-y-auto rounded-bl-none bg-gray-300 rounded-md p-4">
            <ul>
                {messages.map((message, index) => (
                <li key={index} className="mb-2">
                    <div className='w-min bg-teal-700 rounded-2xl text-white rounded-bl-none px-4 p-2'>{message.text}</div>
                    <p className=' text-xs mt-1'>{message.name}</p>
                </li>
                ))}
            </ul>
          </div>}
          <form className='w-96 flex'>
            <input className='h-auto p-2 grow rounded-bl-md' type="text" value={inp} onChange={this.inpChange} />
            <button className='bg-teal-700 text-white w-36 py-2 rounded-br-md hover:bg-teal-800' onClick={() => {
              this.sendMessage(inp);
              this.setState({ inp: "" });
            }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
