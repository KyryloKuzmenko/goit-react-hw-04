import { useState } from 'react';
import style from './SearchBar.module.css';
import toast from 'react-hot-toast';


const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.error("Can't be empty", {
        duration: 3000,
        position: "top"
      });
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={style.header}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
        <button className={style.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
