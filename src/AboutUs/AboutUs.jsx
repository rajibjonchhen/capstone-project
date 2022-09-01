import { useEffect } from 'react'
import OurValue from '../home/OurValue'

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  return (
    <div>
        <OurValue/>
       
    </div>
  )
}

export default AboutUs