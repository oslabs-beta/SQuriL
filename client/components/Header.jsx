import React from 'react';
import styles from '../Styles/Header.css'
import Logo from './Logo';
import OAuth from './OAuth';
import URIInput from './URIInput'

function Header(props) {
  return (
    <div className='Header'>
    <Logo />
    <URIInput />
    </div>
  )
}



export default Header;