import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Homedatacard from './homecard'

const Mailsentmsg = () => {
  return (
    <div>
      <Header/>
      <Homedatacard  title="Password Reset Link Sent" midcontent="The reset link has been emailed to your email provided.If the mail-id is 
      valid." endcontent="Thank You !!!" />
      <Footer/>
    </div>
  )
}

export default Mailsentmsg;
