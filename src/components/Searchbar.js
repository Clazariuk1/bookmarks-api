import React, { useState, useEffect } from 'react'

// how do I specify where the search result will display? Need functioning search bar at top of bookmarks index only.
// useEffect to manipulate data, useState to grab it


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
