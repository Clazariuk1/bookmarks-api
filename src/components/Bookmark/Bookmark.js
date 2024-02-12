import styles from './Bookmark.module.scss'
// import './UpdateWindow.js'

// Am I supposed to be playing with the state values? I'm getting stuck in the weeds.


export default function Bookmark({ bookmark, buttonAction, buttonText}){
    return(
        <div className={styles.bookmark}>
        <a href={bookmark.url}>{bookmark.title}</a>
        <button
                className={styles.button}
                onClick={() => buttonAction(bookmark._id)}
            >
                {buttonText}
            </button>
            <button
                className={styles.button}
                onClick={() => buttonAction(bookmark._id)}
            >
                {buttonText}
            </button>
            <label>Chosen Tags: </label>
            <div className={bookmark.title}>
                {/* {bookmark.tags} */}
            </div>
        </div>
    )
}


{/* <div className={styles.bookmark}> {bookmark.title}
            <button
                className={styles.button}
                onClick={() => buttonAction(bookmark._id)}
            >
                {buttonText}
            </button>
        </div> */}
