import React from 'react'
import "../componentscss/homecard.css"

const Homedatacard = (props) => {
    return (
        <div>
            <section className="card-container">
                <div className="card">
                    <img src="/img/kidney.png" className="card-img"/>
                        <div className="card-content">
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
