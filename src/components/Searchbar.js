import React, { useState } from 'react'

// how do I specify where the search result will display? Suddenly my whole app is crashed.

const searchBar = () => {
    const [searchInput, setSearchInput] = useState('')

    const bookmarks = [...bookmarks]

    const handleChange = (e) => {
        e.preventDefault()
        setSearchInput(e.target.value)
    }
    if (searchInput.length > 0) {
        bookmarks.filter((bookmark) => {
            return bookmark.title.match(searchInput)
        })
    }
    return <div>
        <input type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput} />
    </div>
}

export default searchBar
