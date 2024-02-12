import { useState, useEffect } from 'react'
import BookmarkList from './components/BookmarkList/BookmarkList'
import styles from './App.module.scss'
import SearchBar from './components/Searchbar'



// BELOW : Algorithm to sort alphabetically. I'm using quick sort just to get on with my life.

// FOR SOME REASON the quick sort algorithm below was breaking the web app; unsure why.

function quickSort(array) {
    if (array.length < 2) {
        return array
    }
    const pivot = array[array.length - 1]
    const leftPart = []
    const rightPart = []

    for (let i = 0; i < array.length; i++) {
        if (array[i] < pivot) {
            leftPart.push(array[i])
        } else if (array[i] > pivot) {
            rightPart.push(array[i])
        }
    }
    const sortedLeft = quickSort(leftPart)
    const sortedRight = quickSort(rightPart)
    return sortedLeft.concat(pivot, sortedRight)
}

export default function App(){
    const [bookmarks, setBookmarks] = useState([])
    const [newBookmark, setNewBookmark] = useState({
        title: '',
        url: ''
    })

    // search bar
    const search = async () => {
        return (
            <div classname='App'>
                <SearchBar/>
            </div>
        )
    }

    //createBookmarks
    const createBookmark = async () => {
        const body = {...newBookmark}
        try {
            const response = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const createdBookmark = await response.json()
            const bookmarksCopy = [createdBookmark,...bookmarks]
            setBookmarks(bookmarksCopy)
            setNewBookmark({
                title: '',
                url: ''
            })
        } catch (error) {
            console.error(error)
        }
    }

    const updateBookmark = async (id) => {
        try {
            const index = bookmarks.findIndex((bookmark) => bookmark._id === id)
            const bookmarksCopy = [...bookmarks]
            const subject = bookmarksCopy[index]
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subject)
            })
            const updatedBookmark = await response.json()
            bookmarksCopy.splice(index, 1)
            setBookmarks(updatedBookmark, ...bookmarksCopy)
        } catch (error) {
            console.error(error)
        }
    }

    //deleteBookmarks
    const deleteBookmark = async (id) => {
        try {
            const index = bookmarks.findIndex((bookmark) => bookmark._id === id)
            const bookmarksCopy = [...bookmarks]
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            await response.json()
            bookmarksCopy.splice(index, 1)
            setBookmarks(bookmarksCopy)
        } catch (error) {
            console.error(error)
        }
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

    //getBookmarks
    const getBookmarks = async () => {
        try{
            const response = await fetch('/api/bookmarks')
            const foundBookmarks = await response.json()
            setBookmarks(foundBookmarks.reverse())
            console.log('hey-yo!')
        } catch(error){
            console.error(error)
        }
    }
    useEffect(() => {
        quickSort(getBookmarks())

    }, [])
    return(
        <>

            <div className={styles.banner}>
                <h1>Bookmarks Application Laz Edition</h1>
              <img src='https://i.redd.it/46yihi74emdc1.jpeg'/>
            </div>
            {/* <SearchBar/> */}
            <BookmarkList
            newBookmark={newBookmark}
            setNewBookmark={setNewBookmark}
            createBookmark={createBookmark}
            updateBookmark={updateBookmark}
            bookmarks={bookmarks}
            deleteBookmark={deleteBookmark}
            />
        </>
    )
}
