import { FaHome, FaUserCircle } from 'react-icons/fa';
import { IoNotificationsSharp } from "react-icons/io5";
import React, { useState } from 'react';
import './Header.css';
import { BurgerButton } from './BurgerButton';


function Header({ title, logo, user }){

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  }
  return (
    <header 
      className={`header ${clicked ? 'clicked' : '' }`}
    >
      <img id="logo" src={logo} alt="Prospect company logo" /> 
      <h1 className="title">{title}</h1>
      <div className='burger'>
        <BurgerButton
          clicked={clicked}
          handleClick={handleClick}
        />
      </div>
      <div className={`user-container ${clicked? 'active' : ''}`}>
        <FaHome className='header-icon' />
        <IoNotificationsSharp className='header-icon' />
        <FaUserCircle className='header-icon'/>
        <span className='header-icon user-email'>{user.email}</span>
      </div>
      
    </header>
  );
};

export { Header };
