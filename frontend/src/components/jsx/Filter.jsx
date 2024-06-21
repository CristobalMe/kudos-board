import '../css/Filter.css'

function Filter({setCategoryFilter}) {

    return (
      <div>
        <div className='filters'>
          <button type="button" className="button" onClick={() => setCategoryFilter("")}>All</button>
          <button type="button" className="button" onClick={() => setCategoryFilter("Recent")}>Recent</button>
          <button type="button" className="button" onClick={() => setCategoryFilter("Celebration")}>Celebration</button>
          <button type="button" className="button" onClick={() => setCategoryFilter("Thank you")}>Thank you</button>
          <button type="button" className="button" onClick={() => setCategoryFilter("Inspiration")}>Inspiration</button>
        </div>

      </div>
    );
  }
    
  export default Filter;