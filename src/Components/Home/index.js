import { Component } from "react";
import { withRouter } from 'react-router-dom';

class Home extends Component{
    state = {
        name: localStorage.getItem('chatUserName') || '',
      };
    
      handleSubmit = (event) => {
        event.preventDefault();
        const { name } = this.state;
        
        localStorage.setItem('chatUserName', name);
        this.props.history.push('/chat');
        // Your logic to handle form submission
        // For example, establish a WebSocket connection and navigate to the chat interface
      }
    
      handleChange = (event) => {
        this.setState({ name: event.target.value });
      }
    render(){
        return(
            <div className="w-screen h-screen bg-zinc-800 flex flex-row justify-center items-center font-['Poppins']">
                <div className="flex flex-col items-center">
                    <img className="w-56" src="https://res.cloudinary.com/dbs6hvga4/image/upload/v1713625410/svgviewer-png-output_5_k1azha.png"/>
                    <div className="mt-8 flex flex-col items-center">
                        <input type="text"id="nameInput"value={this.state.name}
                            onChange={this.handleChange}
                            required className="p-2 px-4 w-96 mt-8 rounded-lg" placeholder="Enter Name"/>
                        <button onClick={this.handleSubmit} className="bg-teal-700 mt-6 text-white w-36 py-2">Join Chat</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);