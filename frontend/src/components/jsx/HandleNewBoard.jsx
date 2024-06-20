import React, { useState } from "react";
import axios from "axios";

const NewBoardForm = ({ onSuccess, onClose }) => {
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardType, setNewBoardType] = useState("");
  const types = ["Celebration", "Thank you", "Inspiration"];

  const createNewBoard = async () => {
    try {
      if (!newBoardName || !newBoardType ) {
        alert("Fill out all fields");
        return; 
      }
      await axios.post("http://localhost:3000/boards", {
        name: newBoardName,
        type: newBoardType,
      });

      onSuccess();

      setNewBoardName("");
      setNewBoardType("");

      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="new-board">
        <button className="close" onClick={onClose}>
          x
        </button>
        <h2>Create a New Board</h2>
        <label>Title:</label>
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          required
        />
        <label>Category:</label>
        <select
          value={newBoardType}
          onChange={(e) => setNewBoardType(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        
        <button className="submit" onClick={createNewBoard}>
          Create Board
        </button>
      </div>
    </div>
  );
};

export default NewBoardForm;
