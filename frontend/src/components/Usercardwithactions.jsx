import React from 'react'
import styles from "../componentscss/Adminuiusercard.module.css"

const Usercardwithactions = ({ user, onAccept, onReject }) => {
  return (
      <div className={styles.card}>
            <div className={styles.top}>
                <h2 className={styles.name}>Name:{user.username}</h2>
            </div>
            <div className={styles.bottom}>
                <p className={styles.info}>{user.email}</p>
                <div>
                    <button onClick={() => onAccept(user._id)} className={styles.acceptbtn}>Accept</button>
                    <button onClick={() => onReject(user._id)} className={styles.rejectbtn}>Reject</button>
                </div>
            </div>
        </div>
  )
}

export default Usercardwithactions
