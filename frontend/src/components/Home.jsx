import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Homedatacard from './homecard'

const Home = () => {
    return (
        <div>
            <Header />
            <Homedatacard  
            title="All India Institute of Medical Sciences, Nagpur"
            midcontent="AIIMS Nagpur is a premier medical institute offering high-quality healthcare and medical education. Our state-of-the-art facilities and experienced medical professionals ensure the best care for our patients."
            endcontent="We specialize in hemodialysis treatment, providing comprehensive services to patients with kidney ailments."
            />
            <Footer />
        </div>
    )
}

export default Home
