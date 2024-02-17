
import { useRef, useState } from 'react'
import styles from './Bookmark.module.scss'
export default function Bookmark({
    bookmark,
    updateBookmark,
    deleteBookmark
}) {
    const [showInput, setShowInput] = useState(false)
    const inputRef = useRef(null)
    return(
        <>
            <li>
                <h4 onClick={() => setShowInput(!showInput)}>{bookmark.title}</h4>
                <input
                    ref={inputRef}
                    style={{ display: showInput ? 'block' : 'none' }}
                    type="text"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const title = inputRef.current.value
                            updateBookmark(bookmark._id, { title })
                            setShowInput(false)
                        }
                    }}
                    defaultValue={bookmark.title}
                />
                <a href={bookmark.url} target="_blank" rel="noreferrer">{bookmark.url}</a>
                <button
                    onClick={() => deleteBookmark(bookmark._id)}
                >Delete Me
                </button>
            </li>
        </>
    )
}




// import { useRef, useState } from 'react'
// import styles from './Bookmark.module.scss'
// // import './UpdateWindow.js'

// // Am I supposed to be playing with the state values? I'm getting stuck in the weeds.


// export default function Bookmark({
//     bookmark,
//     updateBookmark,
//     deleteBookmark
//     // buttonAction,
//     // inputAction,
//     // buttonText
// }) {
//     const [showInput, setShowInput] = useState(false)
//     const inputRef = useRef(null)

//     return (
//         <>
//             <li>
//                 <h4 onClick={() => setShowInput(!showInput)}>{bookmark.title}</h4>
//                 <input
//                     ref={inputRef}
//                     style={{ display: showInput ? 'block' : 'none' }}
//                     type='text'
//                     onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                             const title = inputRef.current.value
//                             updateBookmark(bookmark._id, { title })
//                             setShowInput(false)
//                         }
//                     }}
//                     defaultValue={bookmark.title}
//                 />
//                 <a href={bookmark.url} target='_blank' rel='noreferrer'> {bookmark.url}</a>
//                 <button
//                     onClick={() => deleteBookmark(bookmark._id)}
//                 >
//                     Delete Me
//                 </button>
//             </li>
//         </>
//     )
// }
// //     return (
// //         <div className={styles.bookmark}>
// //             <a href={bookmark.url} className="link">{bookmark.title}</a>
// //             <button
// //                 className={styles.button}
// //                 onClick={() => buttonAction(bookmark._id)}
// //             >
// //                 {buttonText}
// //             </button>
// //             <input type="submit" className={styles.button} value={`Delete ${bookmark.title}`}
// //             onClick={() => inputAction(bookmark._id)}
// //             />
// //             <label>Chosen Tags: {`${[bookmark.tags[0]]}`}</label>
// //             <div className="bookmark__title">
// //             </div>
// //         </div>
// //     )
// // }
