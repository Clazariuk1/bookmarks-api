import { useState, useEffect } from 'react'
import BookmarkList from './components/BookmarkList/BookmarkList'
import styles from './App.module.scss'
import SearchBar from './components/Searchbar'
import Auth from './components/Auth/Auth'
import CreateBookmark from './components/CreateBookmark/CreateBookmark'

// // BELOW : Algorithm to sort alphabetically. I'm using quick sort just to get on with my life.

// // FOR SOME REASON the quick sort algorithm below was breaking the web app; unsure why.

// function quickSort(array) {
//     if (array.length < 2) {
//         return array
//     }
//     const pivot = array[array.length - 1]
//     const leftPart = []
//     const rightPart = []

//     for (let i = 0; i < array.length; i++) {
//         if (array[i] < pivot) {
//             leftPart.push(array[i])
//         } else if (array[i] > pivot) {
//             rightPart.push(array[i])
//         }
//     }
//     const sortedLeft = quickSort(leftPart)
//     const sortedRight = quickSort(rightPart)
//     return sortedLeft.concat(pivot, sortedRight)
// }

export default function App() {
    const [searchResults, setSearchResults] = useState([])

    const handleChangeAuth = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleChange = (event) => {
        setBookmark({ ...bookmark, [event.target.name]: event.target.value })
    }

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        name: ''
    })

    const [bookmarks, setBookmarks] = useState([])
    const [bookmark, setBookmark] = useState({
        title: '',
        url: ''
    })

    const [token, setToken] = useState('')

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

    const signUp = async () => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...credentials })
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

    const handleSearch = (searchInput) => {
        if (searchInput.length > 0) {
            bookmarks.filter((bookmark) => {
                if (bookmark.title.toUpperCase() === searchInput.toUpperCase()) {
                    return alert('got it')
                }
                else {
                    alert('nada.')
                }
            })
        }
        console.log('Test me search params.')
    }

    // trying to apply quicksort here is not working; commented out are edit attempts, original not commented below
    /*
    const getBookmarks = async () => {
            try{
                const response = await fetch('/api/bookmarks')
                const foundBookmarks = await response.json()
                setBookmarks(quickSort(foundBookmarks).reverse())
                console.log('hey-yo!')
            } catch(error){
                console.error(error)
            }
        }
        useEffect(() => {
            getBookmarks()
        }, [])
    */

    // useEffect(() => {
    //     quickSort(getBookmarks())

    // }, [])
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
        </>
    )
}
