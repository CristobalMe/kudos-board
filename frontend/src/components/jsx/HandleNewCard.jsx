import React, { useState } from "react";
import axios from "axios";

const NewCardForm = ({ onSuccess, onClose, path }) => {
  const [newCardMessage, setNewCardMessage] = useState("");
  const [newCardAuthor, setNewCardAuthor] = useState("");
  const [newCardTitle, setNewCardTitle] = useState("");
  
  

  const createNewCard = async () => {
    try {
      if (!newCardMessage || !newCardAuthor || !newCardTitle) {
        alert("Fill out all fields");
        return; 
      }

      var path2 = path.slice(1);
      var cardId = path2.substring(path2.indexOf('/') + 1);
      console.log(cardId)


      await axios.post(`http://localhost:3000${path}`, {
        message: newCardMessage,
        author: newCardAuthor,
        gif: "https://media0.giphy.com/media/aoxmfNwLnMNr7C0wEE/giphy-downsized.gif?cid=72ae070ckfn1zyn2fi35os1aiqrgpu022y7qvg5efsnh9n9g&ep=v1_gifs_search&rid=giphy-downsized.gif&ct=g",
        votes: 0,
        board_id: cardId,
        title: newCardTitle
      });

      onSuccess();

      setNewCardMessage("");
      setNewCardAuthor("");

      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="new-card">
        <button className="close" onClick={onClose}>
          x
        </button>
        <h2>Create a New Card</h2>
        <label>Title:</label>
        <input
          type="text"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          required
        />

        <label>Message:</label>
        <input
          type="text"
          value={newCardMessage}
          onChange={(e) => setNewCardMessage(e.target.value)}
          required
        />

        <label>Author:</label>
        <input
          type="text"
          value={newCardAuthor}
          onChange={(e) => setNewCardAuthor(e.target.value)}
          required
        />
        

        
        <button className="submit" onClick={createNewCard}>
          Create Card
        </button>
      </div>
    </div>
  );
};

export default NewCardForm;
