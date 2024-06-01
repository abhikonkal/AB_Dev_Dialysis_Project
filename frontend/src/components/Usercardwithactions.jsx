import React from 'react'
import "../componentscss/Adminuiusercard.css"

const Usercardwithactions = ({ user, onAccept, onReject }) => {
  return (
      <div className='card'>
            <div className="top">
                <h2 className="name">Name:{user.username}</h2>
            </div>
            <div className="bottom">
                <p className="info">{user.email}</p>
                <div>
                    <button onClick={() => onAccept(user._id)} className="accept-btn">Accept</button>
                    <button onClick={() => onReject(user._id)} className="reject-btn">Reject</button>
                </div>
            </div>
        </div>
  )
}

export default Usercardwithactions
