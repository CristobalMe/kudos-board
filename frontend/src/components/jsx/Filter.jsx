

function Filter({setCategoryFilter}) {

    return (
      <div>
        <div className='filters'>
          <button type="button" onClick={() => setCategoryFilter("")}>All</button>
          <button type="button" onClick={() => setCategoryFilter("Recent")}>Recent</button>
          <button type="button" onClick={() => setCategoryFilter("Celebration")}>Celebration</button>
          <button type="button" onClick={() => setCategoryFilter("Thank you")}>Thank you</button>
          <button type="button" onClick={() => setCategoryFilter("Inspiration")}>Inspiration</button>
        </div>

      </div>
    );
  }
    
  export default Filter;