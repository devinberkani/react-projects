import React from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();

  //search ref
  const searchValue = React.useRef('');

  //onChange function for input
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
  };

  //focus search field
  React.useEffect(() => {
    searchValue.current.focus();
  }, []);

  //prevent refresh when user presses enter
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>search your favorite cocktail</label>
          <input
            type='text'
            id='name'
            ref={searchValue}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
