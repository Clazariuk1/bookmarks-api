import styles from './BookmarkList.module.scss'
import Bookmark from '../Bookmark/Bookmark'
import { update } from 'immutable'

export default function BookmarkList ({
    newBookmark,
    createBookmark,
    setNewBookmark,
    bookmarks,
    deleteBookmark
}){
    return(
        <div className={styles.BookmarkList}>
            Bookmark Nick Name:
            <input
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
            <br></br>
            Url Address:
            <input
            className={styles.input}
            type="text"
            value={newBookmark.url}
            onChange={(e) => {
                setNewBookmark({...newBookmark, title: e.target.value})
            }}
            onKeyDown={(e) => {
                e.key === 'Enter' && createBookmark()
            }}
            />
             <h3>Bookmarks</h3>

        {
        bookmarks.map(bookmark => (
            <Bookmark
                name={bookmark.title}
                key={bookmark._id}
                bookmark={bookmark}
                buttonAction={update}
                buttonText={'Update'}
            />
        ))}
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
