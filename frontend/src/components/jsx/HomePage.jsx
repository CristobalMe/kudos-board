import React, { useState, useEffect } from "react";
import Filter from './Filter'
import axios from "axios";
import HandleNewBoard from './HandleNewBoard'

function HomePage() {
    const [boards, setBoards] = useState([]);
    const [CategoryFilter, setCategoryFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [Form, setForm] = useState(false);

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = () => {
        fetch('http://localhost:3000/boards')
            .then(response => response.json())
            .then(data => setBoards(data))
            .catch(error => console.error('Error fetching:', error))
    }
    


    const renderBoards = () => {
        let filteredBoards = boards;

        if (searchQuery) {
            filteredBoards = filteredBoards.filter((board) =>
              board.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (CategoryFilter) {
            filteredBoards = filteredBoards.filter(
              (board) => board.type == CategoryFilter
            );
        }
    
        return filteredBoards.map((board) => (
          <div key={board.id} className="board">
            <img src={`https://picsum.photos/id/${board.id + 10}/200/300`} alt={board.name}/>
            <h3>{board.name}</h3>
            <p>{board.type}</p>
            <button className="delete-board" onClick={() => deleteBoard(board.id)}>
              Delete Board
            </button>
          </div>
        ));
    };

    const deleteBoard = async (boardId) => {
        try {
          const response = await fetch(`http://localhost:3000/boards/${boardId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (response.ok) {
            setBoards((prevBoards) =>
              prevBoards.filter((board) => board.board_id !== boardId)
            );
          }
        } catch (error) {
          console.error("Error:", error);
        }
    };

    const createBoard = () => {
        fetchBoards();
        setForm(false);
    };

    const toggleForm = () => {
        setForm(!Form);
    };

    

    

    // --------------------------------------------------------------------------------------------------------

    return(
        <div>
            <header className='App-header'>
                <h2 className='Title'>KudoBoard</h2>

                
                <div className="topnav">
                    <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                </div>

            </header>

            <Filter setCategoryFilter={setCategoryFilter} />


            <div>
                <button onClick={toggleForm}>
                    Create a New Board
                </button>
                {Form && (<HandleNewBoard onSuccess={createBoard} onClose={toggleForm} />)}
            </div>            

            <section className="board-grid">{renderBoards()}</section>
        </div>
    )
}

export default HomePage;