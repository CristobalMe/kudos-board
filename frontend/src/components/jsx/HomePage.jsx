import React, { useState, useEffect } from "react";
import Filter from './Filter'
import { Link } from "react-router-dom";
import HandleNewBoard from './HandleNewBoard'
import '../css/HomePage.css'

function HomePage() {
    const [boards, setBoards] = useState([]);
    const [CategoryFilter, setCategoryFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [Form, setForm] = useState(false);

    useEffect(() => {
        fetchBoards();
    }, [boards]);

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
            if (CategoryFilter != "Recent"){
              filteredBoards = filteredBoards.filter(
                (board) => board.type == CategoryFilter
              )} else {
                filteredBoards.sort((a,b)=>a.date-b.date);
              }
        }
    
        return filteredBoards.map((board) => (
          <div key={board.id} className="board">
            <img src={`https://picsum.photos/id/${board.id + 10}/200/300`} alt={board.name}/>
            <div className="text">
              <h3>{board.name}</h3>
              <p>{board.type}</p>
            </div>
            <Link to={`/boards/${board.id}/cards`} className="enter-board">
                View Board
            </Link>
            <button className="enter-board" onClick={() => deleteBoard(board.id)}>
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
            <div className="New_Board">
              <button onClick={toggleForm} className="button">
                  Create a New Board
              </button>
            </div>
            <div className="New_Board">
              {Form && (<HandleNewBoard onSuccess={createBoard} onClose={toggleForm} />)}
            </div>
                   

            <div className="grid">
              <section className="board-grid">{renderBoards()}</section>
            </div>

            <footer>
              <p>Author: Cristobal Medina Meza</p>
              <p>About: Meta U week 2 project</p>
              <p><a href="cristobalmedina2004@gmail.com" className="mail">cristobalmedina2004@gmail.com</a></p>
            </footer>
        </div>
    )
}

export default HomePage;