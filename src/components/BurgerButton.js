import React from 'react';
import './BurgerButton.css';

function BurgerButton(props) {
  return (
    <div 
      className={`icon nav-icon-2 ${props.clicked ? 'open' : ''}`}
      onClick={props.handleClick}
    >
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
}

export { BurgerButton }