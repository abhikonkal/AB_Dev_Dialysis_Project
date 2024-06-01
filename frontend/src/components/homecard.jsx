import React from 'react'
import styles from "../componentscss/homecard.module.css"

const Homedatacard = (props) => {
    return (
        <div>
            <section className={styles.homecardcardcontainer}>
                <div className={styles.homecardcard}>
                    <img src="/img/kidney.png" className={styles.homecardcardimg} alt='kidney'/>
                        <div className={styles.homecardcardcontent}>
                            <h2>{props.title}</h2>
                            <p>{props.midcontent}</p>
                            <p>{props.endcontent}</p>
                        </div>
                </div>
            </section>
        
        </div>
    )
}

export default Homedatacard
