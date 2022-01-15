import React, { useEffect, useState } from "react";
import { render } from "react-dom";


function Board({ socket, username, room }) {
    const [board, setBoard] = useState([])
    //const [currentMove, setCurrentMove] = useState()
    const [playerSign, setPlayerSign] = useState('X')
    const [status, setStatus] = useState(true)
    const player = socket.id

    const onClickHandler = async (e) => {
        if (status) {
            //const boardValue = 'x';
            //setPlayerSign('x')
            //document.getElementById(e.target.id).classList.add("disable")

            document.getElementById(e.target.id).innerText = playerSign

            const boardId = e.target.id;
            const newBoard = board;
            console.log("board before setState: ", board)
            newBoard[boardId] = playerSign;
            setBoard(newBoard)
            console.log("board after setState: ", board)
            sendMove();

        }
    }
    const sendMove = async (e) => {
        const boardData = {
            room: room,
            author: username,
            board: board,
            sign: playerSign,

        };
        setStatus(false)
        await socket.emit("make_move", boardData);
        checkIfWin(board)

        //setBoard(boardData.board)

    }

    useEffect(() => {
        console.log("Player: ", player)
        socket.on("receive_move", (data) => {
            setStatus(true)
            console.log("inside useffect: ", data)
            setBoard(data.board)
            checkIfWin(data.board)
            if (data.sign === 'O') setPlayerSign('X')
            if (data.sign === 'X') setPlayerSign('O')

        })
        /*socket.on("make_move", (data) => {
            setStatus(true);
        })*/
    }, [socket]);

    function checkIfWin(board) {
        if (board) {
            // console.log(`0: ${board[0]} , 1: ${board[1]}, 2: ${board[2]}`)
            //console.log(board[0] === board[1])
            if (board[0] === board[1] && board[0] === board[2] && board[0]) {
                if (window.confirm(`${board[0]} is the Winner! 1`)) {
                    window.location.reload()
                }
            }
            if (board[0] === board[3] && board[0] === board[6] && board[0]) {
                if (window.confirm(`${board[0]} is the Winner! 2`)) {
                    window.location.reload()
                }
            }
            if (board[0] === board[4] && board[0] === board[8] && board[0]) {
                if (window.confirm(`${board[0]} is the Winner! 3`)) {
                    window.location.reload()
                }
            }
            if (board[1] === board[4] && board[1] === board[7] && board[1]) {
                if (window.confirm(`${board[1]} is the Winner! 4`)) {
                    window.location.reload()
                }
            }
            if (board[3] === board[4] && board[3] === board[5] && board[3]) {
                if (window.confirm(`${board[3]} is the Winner! 5`)) {
                    window.location.reload()
                }
            }
            if (board[2] === board[5] && board[2] === board[8] && board[2]) {
                if (window.confirm(`${board[2]} is the Winner! 6`)) {
                    window.location.reload()
                }
            }
            if (board[2] === board[4] && board[2] === board[6] && board[2]) {
                if (window.confirm(`${board[2]} is the Winner! 7`)) {
                    window.location.reload()
                }
            }
            if (board[6] === board[7] && board[6] === board[8] && board[6]) {
                if (window.confirm(`${board[6]} is the Winner! 8`)) {
                    window.location.reload()
                }
            }
            if (board[0] && board[1] && board[3] && board[4] && board[5] && board[6] && board[7] && board[8]) {
                if (window.confirm("It's a Draw ! press ok to restart")) {
                    window.location.reload()
                }
            }
        }
    }

    return (
        <div className="board-window">
            <h3>You are: {playerSign}</h3>
            <h6>The first to play will be 'X'</h6>
            <table id="table">
                <tbody>
                    <tr>
                        <td id="0" onClick={onClickHandler}><div className={board[0] !== '' ? 'disable' : "enable"}>{board[0]}</div></td>
                        <td id="1" onClick={onClickHandler}><div className={board[1] !== '' ? 'disable' : "enable"}>{board[1]}</div></td>
                        <td id="2" onClick={onClickHandler}><div className={board[2] !== '' ? 'disable' : "enable"}>{board[2]}</div></td>

                    </tr>
                    <tr>
                        <td id="3" onClick={onClickHandler}><div className={board[3] !== '' ? 'disable' : "enable"}>{board[3]}</div></td>
                        <td id="4" onClick={onClickHandler}><div className={board[4] !== '' ? 'disable' : "enable"}>{board[4]}</div></td>
                        <td id="5" onClick={onClickHandler}><div className={board[5] !== '' ? 'disable' : "enable"}>{board[5]}</div></td>
                    </tr>
                    <tr>
                        <td id="6" onClick={onClickHandler}><div className={board[6] !== '' ? 'disable' : "enable"}>{board[6]}</div></td>
                        <td id="7" onClick={onClickHandler}><div className={board[7] !== '' ? 'disable' : "enable"}>{board[7]}</div></td>
                        <td id="8" onClick={onClickHandler}><div className={board[8] !== '' ? 'disable' : "enable"}>{board[8]}</div></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default Board;
