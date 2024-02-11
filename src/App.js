import { useState, useEffect } from 'react'
import BookmarkList from './components/BookmarkList/BookmarkList'
import styles from './App.module.scss'


export default function App(){
    const [bookmarks, setBookmarks] = useState([])
    const [newBookmark, setNewBookmark] = useState({
        title: '',
        url: ''
    })

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

    //updateBookmark
    // const updateBookmark = async () => {
    //     const body = {...newBookmark}
    //     try {
    //         const response = await put('/api/bookmarks', {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(body)
    //         })
    //         const updatedBookmark = await response.json()
    //         setBookmark(updatedBookmark)
    //         setNewBookmark({
    //             title: '',
    //             url: ''
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // //moveToCompleted
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
        getBookmarks()
    }, [])
    return(
        <>

            <div className={styles.banner}>
                <h1>Bookmarks Application Laz Edition</h1>
              <img src='https://i.redd.it/46yihi74emdc1.jpeg'/>
            </div>
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
