import React, { useState, useEffect } from "react";

const Board = () => {
    const protocol = window.location.pathname;
    
    useEffect(() => {
      fetchCards();
    }, []);


    const fetchCards = () => {
        fetch(`http://localhost:3000${protocol}`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error fetching:', error))
    }
    

    return (
      <div>
        <p>hi </p>
      </div>
    );
  };
  
  export default Board;
  