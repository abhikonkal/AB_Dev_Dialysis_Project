import React from 'react'
import "../componentscss/homecard.css"

const Homedatacard = (props) => {
    return (
        <div>
            <section className="homecard-card-container">
                <div className="homecard-card">
                    <img src="/img/kidney.png" className="homecard-card-img"/>
                        <div className="homecard-card-content">
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
