import styles from './BookmarkList.module.scss'
import Bookmark from '../Bookmark/Bookmark'
import SearchBar from '../Searchbar'
import { update } from 'immutable'

export default function BookmarkList({
    newBookmark,
    createBookmark,
    setNewBookmark,
    bookmarks,
    deleteBookmark
}) {
    return (
        <>
        {/*<SearchBar>rtyrt</SearchBar> */}
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
                    // my doesnt exist stuff isn't working right now. What am I missing
                    const doesntExist = bookmarks.forEach((bookmark) => bookmark.title !== e.target.value)

                    // if (e.key === 'Enter' && doesntExist) {
                    //     setNewBookmark({ ...newBookmark,
                    //         url: e.target.value })
                    //     createBookmark()
                    // }
                    // else {
                    //     alert('error, bookmark already exists')
                    // }
                    e.key === 'Enter' && (doesntExist) && createBookmark()

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
                            buttonAction={update} // toggleBookmark.updateWindow
                            buttonText={'Update'}
                        />
                        <Bookmark
                            key={bookmark._id}
                            bookmark={bookmark}
                            buttonAction={deleteBookmark}
                            buttonText={'Delete'}
                        />
                    </div>
                ))}
        </div>
        </>
    )
}
