import React, { useState, useEffect } from "react";
import HandleNewCard from './HandleNewCard'

const Board = () => {
    const protocol = window.location.pathname;
    const [Form, setForm] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
      fetchCards();
    }, []);


    const fetchCards = () => {
        fetch(`http://localhost:3000${protocol}`)
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
        <div key={board.card_id} className="board">
          <img src={board.gif} alt={board.name}/>
          <h3>{board.title}</h3>
          <p>{board.message}</p>
          <p>{board.author}</p>

          <button className="delete-card" onClick={() => deleteCard(board.id)}>
            Delete Card
          </button>
        </div>
      ));
  };

    return (
      <div>
        <header className='App-header'>
                <h2 className='Title'>KudoBoard</h2>
        </header>

        <div>
          <button onClick={toggleForm}>
              Create a New Card
          </button>
          {Form && (<HandleNewCard onSuccess={createCard} onClose={toggleForm} path={protocol}/>)}
        </div>

        <section className="board-grid">{renderCards()}</section>
      </div>
    );
  };
  
  export default Board;
  