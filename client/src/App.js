import './App.css';
import io from "socket.io-client"; //io use to establish the connection
import { useState } from 'react';
import Board from './board';


const socket = io.connect("http://localhost:3001") //here we put the path where we run the socket.io server

function App() {
  const [userName, setUserName] = useState("")
  const [room, setRoom] = useState("");
  const [showBoard, setShowBoard] = useState(false);

  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      socket.emit("join_room", room)
      setShowBoard(true);
    }
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div>
        {userName && <h3>Hey {userName}</h3>}
        {room && <h3>{room}</h3>}
      </div>
      {!showBoard ? (
        <div className="joinGameContainer">
          <input type="text" placeholder="Sahar..." onChange={(event) => { setUserName(event.target.value) }}></input>
          <input type="text" placeholder="Room ID..." onChange={(event) => { setRoom(event.target.value) }}></input>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        //elsewhere
        <Board socket={socket} username={userName} room={room} ></Board>
      )
      }
    </div>
  );
}

export default App;
