import React, { Component } from 'react';
import styles from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

const links = [
  { to:'/', label: 'Quiz List', exact: true },
  { to:'/auth', label: 'Authorization', exact: false },
  { to:'/quiz-creator', label: 'Create a quiz', exact: false },
];

class Drawer extends Component {

  renderNavLinks = (links) => {
    return (
      links.map((link, index) => {
        return (
          <li key={index}>
            <NavLink
              to={link.to}
              exact={link.exact}
              onClick={this.props.onClick}
              activeClassName={styles.active}
              >
              {link.label}
            </NavLink>
          </li>
        )
      })
    )
  }

  render() {
    const classes = [
      styles.Drawer,
    ]

    if(this.props.isOpen) {
      classes.push(styles.isOpen);
    }

    return (
      <React.Fragment>
        <nav className={classes.join(' ')}>
          <ul>
            {this.renderNavLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen && <Backdrop onClick={this.props.onClick}/>}
      </React.Fragment>
    )
  }
}

export default Drawer;