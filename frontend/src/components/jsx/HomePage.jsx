import React, { useState, useEffect } from "react";
import Filter from './Filter'

function HomePage() {
    const [boards, setBoards] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = () => {
        fetch('http://localhost:3000/boards')
            .then(response => response.json())
            .then(data => setBoards(data))
            .catch(error => console.error('Error fetching posts:', error))
    }


    const renderBoards = () => {
        let filteredBoards = boards;
    
        return filteredBoards.map((board) => (
          <div key={board.id} className="board-preview">
            <img
              src={`https://picsum.photos/id/${board.id + 10}/200/300`}
              alt={board.name}
            />
            <h3>{board.name}</h3>
            <p>{board.category}</p>
            <button className="button-common delete-board" onClick={() => deleteBoard(board.id)}>
              Delete Board
            </button>
          </div>
        ));
    };

    return(
        <div>
            <header className='App-header'>
                <h2 className='Title'>KudoBoard</h2>

                <div className="topnav">
                    <input type="text" placeholder="Search.." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                </div>

            </header>

            <Filter />

            <section className="board-grid">{renderBoards()}</section>
        </div>
    )
}

export default HomePage;