import React from 'react';
import style from './Button.module.css';

const Button = props => {
  const classes = [
    style.Button,
    style[props.type]
  ]
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes.join(' ')}
      >
        {props.children}
    </button>
  )
}

export default Button;