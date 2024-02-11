import styles from './BookmarkList.module.scss'
import Bookmark from '../Bookmark/Bookmark'

export default function BookmarkList ({
    newBookmark,
    createBookmark,
    setNewBookmark,
    bookmarks,
    deleteBookmark
}){
    return(
        <div className={styles.BookmarkList}>
            Add New Bookmark:<input
            className={styles.input}
            type="text"
            value={newBookmark.title}
            onChange={(e) => {
                setNewBookmark({...newBookmark, title: e.target.value})
            }}
            onKeyDown={(e) => {
                e.key === 'Enter' && createBookmark()
            }}
            />
             <h3>Bookmarks</h3>

        {/*
        EXAMINE EDIT AND OR DELETE THIS BUTTON ROUTE -> NO NEED TO COMPLETE. ELECT TO UPDATE OR ELSE REMOVE.
        bookmarks.map(bookmark => (
            <Bookmark
                key={bookmark._id}
                bookmark={bookmark}
                buttonAction={moveToCompleted}
                buttonText={'Complete'}
            />
        ))*/}
        <h3>Bookmarks</h3>
        {bookmarks.map(bookmark =>(
            <Bookmark
                key={bookmark._id}
                bookmark={bookmark}
                buttonAction={deleteBookmark}
                buttonText={'Delete'}
            />
        ))}
        </div>
    )
}
