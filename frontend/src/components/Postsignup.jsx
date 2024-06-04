import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Homedatacard from './homecard'

const Postsignup = () => {
  return (
    <div>
      <Header />
      <Homedatacard  
            title="All India Institute of Medical Sciences, Nagpur"
            midcontent="Sign up Process is successful,although the admin will review you before permitting you to enter the data entry form."
            endcontent="Please,Be Patient while the admin panel reviews your profile and permits you for data entry.We'll notify you via email once you are permitted to enter the data entry form"
            />
      <Footer />
    </div>
  )
}

export default Postsignup
