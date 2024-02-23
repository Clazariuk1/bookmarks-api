import { useState, useEffect } from 'react'
import BookmarkList from './components/BookmarkList/BookmarkList'
import styles from './App.module.scss'
import SearchBar from './components/Searchbar/Searchbar'
import Auth from './components/Auth/Auth'
import CreateBookmark from './components/CreateBookmark/CreateBookmark'

export default function App() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')
    const [searchInput, setSearchInput] = useState('')

    const [bookmarks, setBookmarks] = useState([])
    const [bookmark, setBookmark] = useState({
        title: '',
        url: ''
    })
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        name: ''
    })

    const isThereSearchTerm = function(searchTerm) {
        if (searchInput === '') {
            return false
        }
        return true
    }

    const handleChangeAuth = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleChange = (event) => {
        setBookmark({ ...bookmark, [event.target.name]: event.target.value })
    }


    const login = async () => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })
            const tokenResponse = await response.json()
            setToken(tokenResponse)
            localStorage.setItem('token', JSON.stringify(tokenResponse))
        } catch (error) {
            console.error(error)
        } finally {
            window.location.reload()
        }
    }

    // this seems off. you should consider redoing to model after blog demo

    const signUp = async (credentials) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ credentials })
            })
            const data = await response.json()
            setUser(data.user)
            setToken(data.token)
            localStorage.setItem('token', data.token)
        } catch (error) {
            console.error(error)
        } finally {
            window.location.reload()
        }
    }

    const createBookmark = async () => {
        try {
            const response = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ ...bookmark })
            })
            const data = await response.json()
            setBookmarks([data, ...bookmarks])
            setBookmark({
                title: '',
                url: ''
            })

        } catch (error) {
            console.error(error)
        } finally {
            setBookmark({
                title: '',
                url: ''
            })
        }
    }

    // must continue examining and link/referencing list all bookmarks.

    const listAllBookmarks = async () => {
        try {
            const response = await fetch('/api/bookmarks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            setBookmarks(data)
        } catch (error) {
            console.error(error)
        }
    }

    const listBookmarksByUser = async () => {
        try {
            const response = await fetch('/api/users/bookmarks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            const data = await response.json()
            setBookmarks(data)
        } catch (error) {
            console.error(error)
        }
    }

    const deleteBookmark = async (id) => {
        try {
            const response = await fetch(`api/bookmarks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer${token}`
                }
            })
            const data = await response.json()
            const bookmarksCopy = [...bookmarks]
            const index = bookmarksCopy.findIndex(bookmark => id === bookmark._id)
            bookmarksCopy.splice(index, 1)
            setBookmarks(bookmarksCopy)
        } catch (error) {
            console.error(error)
        }
    }

    const updateBookmark = async (id, updatedData) => {
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            })
            const data = await response.json()
            const bookmarksCopy = [...bookmarks]
            const index = bookmarks.findIndex((bookmark) => id === bookmark._id)
            bookmarksCopy[index] = { ...bookmarksCopy[index], ...updatedData }
            setBookmarks(bookmarksCopy)
        } catch (error) {
            console.error(error)
        }
    }

    const getBookmarks = async () => {
        try {
            const response = await fetch('/api/bookmarks')
            const foundBookmarks = await response.json()
            setBookmarks(foundBookmarks.reverse())
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const tokenData = localStorage.getItem('token')
        if (tokenData && tokenData !== 'null' && tokenData !== 'undefined') {
            listBookmarksByUser()
        }
    }, [token])

    useEffect(() => {
        const tokenData = localStorage.getItem('token')
        if (tokenData && tokenData !== 'null' && tokenData !== 'undefined') {
            setToken(JSON.parse(tokenData))
        }
    }, [])
    // const [searchInput, setSearchInput] = useState('') /* REFERENCE ONLY COMMENT, DO NOT PRESERVE */

    const handleSearch = (searchInput, bookmarks) => {
        if(!searchInput) {
            return bookmarks
        }
        return bookmarks.filter(bookmark => bookmark.title.includes(searchInput))
    }
    return (
        <>
            {
                token ?
                    <button onClick={() => {
                        localStorage.removeItem('token')
                        window.location.reload()
                    }}>

                    Logout
                    </button> :
                    ''
        }
            <Auth
                login={login}
                credentials={credentials}
                handleChangeAuth={handleChangeAuth}
                signUp={signUp}
                setToken={setToken}
                token={token}
            />
            <CreateBookmark
                createBookmark={createBookmark}
                bookmark={bookmark}
                handleChange={handleChange}
            />


            <BookmarkList
                bookmarks={bookmarks}
                deleteBookmark={deleteBookmark}
                updateBookmark={updateBookmark}
            />

            :

            <BookmarkList/>

            <SearchBar
                bookmarks={bookmarks}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                onKeyDown={handleSearch}
            />
            {/*{showUpdate? <UpdateForm/> : <Bookmark/>} THIS IS WHERE YOU MUST INSERT THE TERNARY. RETURN BOOKMARK LIST OR SEARCHBAR. */}
            {/* <BookmarkList
                bookmarks={bookmarks}
                deleteBookmark={deleteBookmark}
                updateBookmark={updateBookmark}
            /> */}
        </>
    )
}
