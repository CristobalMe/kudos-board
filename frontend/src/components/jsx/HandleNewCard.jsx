import React, { useState } from "react";
import axios from "axios";
import '../css/HandleNewCard.css'

const NewCardForm = ({ onSuccess, onClose, path }) => {
  const [newCardMessage, setNewCardMessage] = useState("");
  const [newCardAuthor, setNewCardAuthor] = useState("");
  const [newCardTitle, setNewCardTitle] = useState("");
  const [gif, setGif] = useState("");
  const [gifOptions, setGifOptions] = useState([]);

  const apiKey = "EmBirGHuFtC0BpEYiq10HgseSHxAXC1s";

    const searchGifs = async () => {
      try {
        const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
          params: {
            api_key: apiKey,
            q: gif,
            limit: 4,
          },
        });
  
        const gifData = response.data.data;
        const gifUrls = gifData.map((gif) => gif.images.original.url);
        setGifOptions(gifUrls);
      } catch (error) {
        console.error("Error searching for GIFs:", error);
      }
    };

    const handleSelectGif = (gifUrl) => {
      setGif(gifUrl);
      setGifOptions([]);
    };
  
  

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
        gif: gif,
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

        <input
          type="text"
          placeholder="Search GIFs"
          value={gif}
          onChange={(e) => setGif(e.target.value)}
        />
        <button className="search-button" type="search" onClick={searchGifs}>
          Search
        </button>
        {gifOptions.length > 0 && (
          <div className="gif-options">
            {gifOptions.map((gifUrl) => (
              <div className="gif-container">
                <img
                  className="gif"
                  key={gifUrl}
                  src={gifUrl}
                  alt="GIF"
                  onClick={() => handleSelectGif(gifUrl)}
                />
              </div>
            ))}
          </div>
        )}
        
        

        
        <button className="submit" onClick={createNewCard}>
          Create Card
        </button>
      </div>
    </div>
  );
};

export default NewCardForm;
