import React, { useState } from 'react'

// how do I specify where the search result will display?
// WHY can't I place my searchbar anywhere?

const SearchBar = ({onSearch}) => {
    const [searchInput, setSearchInput] = useState('')

    // const bookmarks = [...bookmarks]

    const handleChange = (e) => {
        e.preventDefault()
        setSearchInput(e.target.value)
    }
    const handleSearch = (searchInput) => {
        onSearch(searchInput)
    }

    return <div>
        <input type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={searchInput} />
        <button onClick={handleSearch}>Search</button>
    </div>
}

export default SearchBar

// I have no idea why but trying to move searchbar file into its own folder broke the whole thing
