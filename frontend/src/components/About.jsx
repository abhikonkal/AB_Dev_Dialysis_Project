import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Homedatacard from './homecard'

const About = () => {
  return (
    <div>
      <Header />
      <Homedatacard
        title="All India Institute of Medical Sciences, Nagpur"
        midcontent="Lorem Ipsum pe specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
        endcontent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the"
        />
        <Footer/>
    </div>
  )
}

export default About
