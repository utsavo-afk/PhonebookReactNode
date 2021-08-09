import React from 'react';

const SearchBar = (props) => {
    const {
        searchString,
        setSearchString
    } = props

    const newSearch = (e) => setSearchString(e.target.value)

    return (
        <div>
            <form>
                <label htmlFor="search">search </label>
                <input type="search" id="search" name="searchBar" value={searchString} onChange={newSearch} />
            </form>
        </div>
    );
}

export default SearchBar;
