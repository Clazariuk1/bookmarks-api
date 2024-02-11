import styles from './Bookmark.module.scss'


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
