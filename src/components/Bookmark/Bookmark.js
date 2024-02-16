import styles from './Bookmark.module.scss'
// import './UpdateWindow.js'

// Am I supposed to be playing with the state values? I'm getting stuck in the weeds.


export default function Bookmark({ bookmark, buttonAction, inputAction, buttonText }) {
    return (
        <div className={styles.bookmark}>
            <a href={bookmark.url} className="link">{bookmark.title}</a>
            <button
                className={styles.button}
                onClick={() => buttonAction(bookmark._id)}
            >
                {buttonText}
            </button>
            <input type="submit" className={styles.button} value={`Delete ${bookmark.title}`}
            onClick={() => inputAction(bookmark._id)}
            />
            <label>Chosen Tags: {`${[bookmark.tags[0]]}`}</label>
            <div className="bookmark__title">
            </div>
        </div>
    )
}
