import React, { useState } from 'react'
import Bookmark from './Bookmark/Bookmark'
import './UpdateWindow/UpdateWindow.module.scss'

// const modal = () => {
//     return (
//         <div>AuthModal</div>
//     )
// }

// export default modal

export default function UpdateWindow() {
    const bookmark = Bookmark.findOne({})
    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal)
    }
    return (
        <>
        <button onClick={toggleModal} className='update-button'>
            Update
        </button>
        </>
    )
}

{/* <div className="update__modal">
    <div onClick={toggleModal} className={StyleSheet.BookmarkList} id=`{bookmark.title}__close`>X</div>
    <div className="update__content">

    </div>
</div> */}
