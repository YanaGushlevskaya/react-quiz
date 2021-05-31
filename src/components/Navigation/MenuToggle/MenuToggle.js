import React from 'react';
import style from './MenuToggle.module.css';

const MenuToggle = props => {
    const classes = [
        style.MenuToggle,
        'fa',
    ]

    if(props.isOpen) {
        classes.push('fa-times');
        classes.push(style.open);
    } else {
        classes.push('fa-bars')
    }
    return (
        <i className={classes.join(' ')} onClick={props.onToggle}/>
    )
}

export default MenuToggle;