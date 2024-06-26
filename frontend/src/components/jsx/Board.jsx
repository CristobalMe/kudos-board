import React, { useState, useEffect } from "react";
import HandleNewCard from './HandleNewCard'
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/Board.css'

const Board = () => {
    const current_link = window.location.pathname;
    const [Form, setForm] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
      fetchCards();
    }, [cards]);


    const fetchCards = () => {
        fetch(`https://kudos-board-68oe.onrender.com${current_link}`)
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.error('Error fetching:', error))
    }
    
    const toggleForm = () => {
      setForm(!Form);
    };

    const createCard = () => {
      fetchCards();
      setForm(false);
    };


    const renderCards = () => {
      let filteredBoards = cards;
  
      return filteredBoards.map((board) => (
        <div key={board.card_id} className="card">

          <div className="img">
            <img className="img" src={board.gif} alt={board.name}/>
          </div>
          

          <div className="text-div">
            <h3 className="text" >{board.title}</h3>
            <p className="text">{board.message}</p>
            <p className="text">{board.author}</p>
          </div>

          <div>
            <button className="button-card" onClick={() => likeCard(board.card_id, board.votes)}>
              Like Card: {board.votes}
            </button>
            <button className="button-card" onClick={() => deleteCard(board.card_id)}>
              Delete Card
            </button>
          </div>
        </div>
      ));
  };

  const deleteCard = async (cardId) => {
    try {
      const response = await fetch(`https://kudos-board-68oe.onrender.com${current_link}/${cardId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setCards((prevBoards) =>
          prevBoards.filter((board) => board.card_id !== cardId)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };  


  const likeCard = async (cardId, votes) => {
    
    votes = parseInt(votes)
    try {
      await axios.patch(`https://kudos-board-68oe.onrender.com${current_link}/${cardId}`, {
        votes: votes
      });

      renderCards();

    } catch (error) {
      console.error("Error:", error);
    }
  };

    return (
      <div>
        <header className='App-header'>
                <h2 className='Title'>KudoBoard</h2>
                <Link to={`/`} className="enter-board">
                View Boards
                </Link>
        </header>

        <div className="New-Card">
          <button onClick={toggleForm} className="button">
              Create a New Card
          </button>
        </div>
        {Form && (<HandleNewCard onSuccess={createCard} onClose={toggleForm} path={current_link}/>)}
        

        <section className="board-grid">{renderCards()}</section>

        <footer>
          <p>Author: Cristobal Medina Meza</p>
          <p>About: Meta U week 2 project</p>
          <p><a href="cristobalmedina2004@gmail.com" className="mail">cristobalmedina2004@gmail.com</a></p>
        </footer>
      </div>
    );
  };
  
  export default Board;
  
