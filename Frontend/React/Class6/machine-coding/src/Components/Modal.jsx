import React from 'react'
import "../Modal.css"
function Modal({isVisible, hide}) {
    if(!isVisible) return;
  return (
    <div className='modal-overlay'>
        <div className="modal">
            <h2>Modal Title</h2>
            <p>This is is a modal.</p>
            <button onClick={hide}>Close</button>
        </div>
    </div>
  )
}

export default Modal