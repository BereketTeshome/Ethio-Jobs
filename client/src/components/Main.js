import {React, lazy} from 'react'


const Navbar = lazy(()=> import('./Navbar'))
const Header = lazy(()=> import('./Header'))
const Section = lazy(()=> import('./Section'))
const Footer = lazy(()=> import('./Footer'))

const Main = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Section/>
      <Footer />
    </div>
  )
}

export default Main
