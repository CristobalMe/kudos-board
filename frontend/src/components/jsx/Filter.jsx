

function Filter() {
    return (
      <div>
        <div className='filters'>
          <button type="button">All</button>
          <button type="button">Recent</button>
          <button type="button">Celebration</button>
          <button type="button">Thank you</button>
          <button type="button">Inspiration</button>
        </div>

        <div className='new'>
          <button type="button">Create a new board</button>
        </div>

      </div>
    );
  }
    
  export default Filter;