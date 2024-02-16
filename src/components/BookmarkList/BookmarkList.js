import styles from './BookmarkList.module.scss'
import Bookmark from '../Bookmark/Bookmark'
import { update } from 'immutable'

export default function BookmarkList({
    newBookmark,
    createBookmark,
    setNewBookmark,
    bookmarks,
    deleteBookmark,
    updateBookmark
}) {
    return (
        <>
            <div className={styles.BookmarkList}>
                <label>Bookmark Nick Name:</label>
                <input
                    className={styles.input}
                    type="text"
                    value={newBookmark.title}
                    onChange={(e) => {
                        setNewBookmark({ ...newBookmark, title: e.target.value })
                    }}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && createBookmark()
                    }}
                />
                <br></br>
                <label>Url Address:</label>
                <input
                    className={styles.input}
                    type="text"
                    value={newBookmark.url}
                    onChange={(e) => {
                        setNewBookmark({ ...newBookmark, url: e.target.value })
                    }}
                    onKeyDown={(e) => {
                        const doesntExist = bookmarks.forEach((bookmark) => bookmark.title !== e.target.value)

                       {/* if (e.key === 'Enter' && doesntExist) {
                            setNewBookmark({ ...newBookmark,
                                url: e.target.value })
                            createBookmark()
                        }
                        else {
                            alert('error, bookmark already exists')
                        } */}
                        e.key === 'Enter' && createBookmark()

                    }
                    }
                />
                <br></br>
                <label>Tags:</label>
                <select className={styles.input}
                    onChange={(e) => {
                        setNewBookmark({ ...newBookmark, tags: e.target.value })
                    }}
                >
                    <option value="">Tag?</option>
                    <option value="Favorite">Favorite</option>
                    <option value="Work">Work</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Movies">Movies</option>
                </select>
                <h3>Bookmarks</h3>

                {
                    bookmarks.map(bookmark => (
                        <div className={styles.bookmarkButtonSection}>
                            <Bookmark
                                name={bookmark.title}
                                key={bookmark._id}
                                bookmark={bookmark}
                                buttonAction={update}
                                buttonText={'Update'}
                                inputAction={deleteBookmark}
                                inputText={`Delete ${bookmark.title}`}
                            />

                        </div>
                    ))}
            </div>
        </>
    )
}
