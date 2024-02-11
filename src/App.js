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
    // // below is unnecessary. Refactor for an update of some kind or delete. UPDATE!!!
    // //moveToCompleted
    // const moveToCompleted = async (id) => {
    //     try {
    //         const index = todos.findIndex((todo) => todo._id === id)
    //         const todosCopy = [...todos]
    //         const subject = todosCopy[index]
    //         subject.completed = true
    //         const response = await fetch(`/api/todos/${id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(subject)
    //         })
    //         const updatedTodo = await response.json()
    //         const completedTDsCopy = [updatedTodo, ...completedTodos]
    //         setCompletedTodos(completedTDsCopy)
    //         todosCopy.splice(index, 1)
    //         setTodos(todosCopy)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    //getBookmarks
    const getBookmarks = async () => {
        try{
            const response = await fetch('/api/bookmarks')
            const foundBookmarks = await response.json()
            setBookmarks(foundBookmarks.reverse())
            console.log('hey-yo!')
            // const responseTwo = await fetch('/api/todos/completed')
            // const foundCompletedTodos = await responseTwo.json()
            // setCompletedTodos(foundCompletedTodos.reverse())
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
            bookmarks={bookmarks}
            deleteBookmark={deleteBookmark}
            />
        </>
    )
}
