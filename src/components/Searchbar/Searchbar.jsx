import {  useState } from 'react';

const Searchbar = ({onSubmit}) => {
  const [state, setState] = useState({
    search:'',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ 
      ...state,
      [name]:value,
     });
  };


 const handleSubmit = (e) => {
    e.preventDefault();
   onSubmit(state.search); 
   reset();
  };


  const reset = () => {
    setState({
    search:'',
  })
}


  return (
          <header className="Searchbar">
            <form className="SearchForm" onSubmit={handleSubmit}>
              <button type="submit" className="SearchForm-button">
                <span className="SearchForm-button-label">Search</span>
              </button>
    
              <input
                className="SearchForm-input"
                type="text"
                name="search"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={state.search}
                onChange={handleChange}
              />
            </form>
          </header>
        );
}


export default Searchbar;
